// =====================================================
// Executor — Compile & Run Rust code in a sandbox
// Handles both REST API and reusable compile/run logic
// =====================================================

use axum::Json;
use std::path::PathBuf;
use std::time::Instant;
use tokio::process::Command;
use uuid::Uuid;

use crate::db::DbPool;
use crate::models::{RunRequest, RunResponse};

/// Sandbox directory for temporary code files
const SANDBOX_DIR: &str = "/tmp/kairust_sandbox";

/// Get timeout in seconds based on exercise limits
fn get_timeout_secs(lesson_id: &Option<String>) -> u64 {
    match lesson_id {
        Some(id) => {
            let limits = crate::exercises::get_exercise_limits(id);
            limits.time_limit_secs.ceil() as u64
        }
        None => 10, // Default timeout
    }
}

/// Maximum output size in bytes (prevent memory bomb)
const MAX_OUTPUT_BYTES: usize = 1024 * 64; // 64KB

// ---- REST API Handler ----

pub async fn handle_run(
    axum::extract::State(_state): axum::extract::State<DbPool>,
    Json(req): Json<RunRequest>,
) -> Json<RunResponse> {
    let is_test = req.is_test.unwrap_or(false);
    let lesson_id = req.lesson_id.clone();

    // Nếu là bài kiểm tra và có lesson_id, tự động nối thêm test case
    let mut code = req.code.clone();
    if is_test {
        if let Some(ref lid) = lesson_id {
            if let Some(test_code) = crate::exercises::get_test_code(lid) {
                // IMPORTANT: Thêm newline để tránh user code và test code bị dính liền
                code.push_str("\n\n");
                code.push_str(test_code);
            }
        }
    }

    let result = compile_and_run(&code, req.stdin.as_deref(), is_test, lesson_id).await;
    Json(result)
}

// ---- Core Logic (reused by both REST and WebSocket) ----

/// Compile and run Rust code, returns structured result
pub async fn compile_and_run(code: &str, stdin_input: Option<&str>, is_test: bool, lesson_id: Option<String>) -> RunResponse {
    let session_id = Uuid::new_v4().to_string();
    let work_dir = PathBuf::from(SANDBOX_DIR).join(&session_id);

    // Lấy timeout từ giới hạn bài tập
    let timeout_secs = get_timeout_secs(&lesson_id);

    // Setup workspace
    if let Err(e) = setup_workspace(&work_dir, code).await {
        return RunResponse {
            success: false,
            stdout: String::new(),
            stderr: format!("Lỗi tạo workspace: {}", e),
            execution_time_ms: 0,
            memory_usage_kb: 0,
        };
    }

    let start = Instant::now();

    // Step 1: Compile
    let compile_result = compile(&work_dir, timeout_secs).await;
    match compile_result {
        Err(stderr) => {
            cleanup(&work_dir).await;
            return RunResponse {
                success: false,
                stdout: String::new(),
                stderr,
                execution_time_ms: start.elapsed().as_millis() as u64,
                memory_usage_kb: 0,
            };
        }
        Ok(_) => {}
    }

    // Step 2: Run
    let run_result = run_binary(&work_dir, stdin_input, is_test, timeout_secs).await;
    let elapsed = start.elapsed().as_millis() as u64;

    // Cleanup
    cleanup(&work_dir).await;

    match run_result {
        Ok((stdout, stderr, memory_kb)) => RunResponse {
            success: true,
            stdout: truncate_output(&stdout),
            stderr: truncate_output(&stderr),
            execution_time_ms: elapsed,
            memory_usage_kb: memory_kb,
        },
        Err(err_msg) => RunResponse {
            success: false,
            stdout: String::new(),
            stderr: err_msg,
            execution_time_ms: elapsed,
            memory_usage_kb: 0,
        },
    }
}

// ---- Internal Functions ----

async fn setup_workspace(work_dir: &PathBuf, code: &str) -> Result<(), String> {
    // Chép toàn bộ project mẫu (đã biên dịch sẵn) sang thư mục làm việc mới bằng lệnh hệ thống
    let template_dir = "/tmp/kairust_template";
    let status = Command::new("cp")
        .arg("-a")
        .arg(format!("{}/.", template_dir))
        .arg(work_dir)
        .status()
        .await
        .map_err(|e| format!("Lỗi gọi lệnh cp clone template: {}", e))?;

    if !status.success() {
        return Err("Copy template project thất bại".to_string());
    }

    // Ghi đè mã nguồn của người dùng vào file main.rs
    let source_file = work_dir.join("src").join("main.rs");
    tokio::fs::write(&source_file, code)
        .await
        .map_err(|e| format!("Lỗi ghi mã nguồn: {}", e))?;

    Ok(())
}

async fn compile(work_dir: &PathBuf, timeout_secs: u64) -> Result<(), String> {
    // Luôn dùng cargo build - đơn giản và hiệu quả
    let mut cmd = Command::new("cargo");
    cmd.arg("build");
    cmd.arg("--release")
       .current_dir(work_dir);

    let result = tokio::time::timeout(
        std::time::Duration::from_secs(timeout_secs),
        cmd.output(),
    )
    .await;

    match result {
        Ok(Ok(output)) => {
            if output.status.success() {
                Ok(())
            } else {
                let stderr = String::from_utf8_lossy(&output.stderr).to_string();
                Err(stderr)
            }
        }
        Ok(Err(e)) => Err(format!("Lỗi chạy cargo: {}", e)),
        Err(_) => Err("Biên dịch quá thời gian (timeout)".to_string()),
    }
}

async fn run_binary(
    work_dir: &PathBuf,
    stdin_input: Option<&str>,
    _is_test: bool,
    timeout_secs: u64,
) -> Result<(String, String, u64), String> {
    // Cấu hình linh hoạt Docker Volume Mount (Cho cả Local và DooD)
    let session_id = work_dir
        .file_name()
        .unwrap_or_default()
        .to_string_lossy()
        .to_string();

    let is_dood = std::env::var("SANDBOX_VOLUME_NAME").is_ok();
    
    let volume_arg = if let Ok(vol_name) = std::env::var("SANDBOX_VOLUME_NAME") {
        format!("{}:/tmp/kairust_sandbox:ro", vol_name)
    } else {
        format!("{}:/sandbox:ro", work_dir.to_string_lossy())
    };

    let binary_in_sandbox = if is_dood {
        format!("/tmp/kairust_sandbox/{}/target/release/user_code", session_id)
    } else {
        "/sandbox/target/release/user_code".to_string()
    };

    // Chạy binary trong Docker container cô lập (Sandbox Isolation)
    let mut cmd = Command::new("docker");
    cmd.arg("run")
        .arg("--rm")                           // Tự hủy container khi chạy xong
        .arg("-i")                             // Cho phép stdin pipe
        .arg("--read-only")                    // Cấm ghi filesystem
        .arg("--tmpfs").arg("/tmp:size=16m")   // Cấp /tmp nhỏ cho chương trình nếu cần
        .arg("--network").arg("none")          // Cấm truy cập mạng
        .arg("--memory").arg("128m")           // Giới hạn RAM 128MB
        .arg("--cpus").arg("0.5")              // Giới hạn 0.5 CPU core
        .arg("--pids-limit").arg("64")         // Chặn fork bomb
        .arg("-v").arg(&volume_arg)            // Bind mount volume
        .arg("debian:bookworm-slim")           // Image gọn nhẹ
        .arg(&binary_in_sandbox);              // Chạy binary

    // Cấu hình stdin/stdout/stderr pipe
    cmd.stdin(std::process::Stdio::piped());
    cmd.stdout(std::process::Stdio::piped());
    cmd.stderr(std::process::Stdio::piped());

    let result = tokio::time::timeout(
        std::time::Duration::from_secs(timeout_secs + 2), // +2s cho Docker overhead
        async {
            let mut child = cmd.spawn().map_err(|e| format!("Lỗi khởi tạo sandbox: {}", e))?;

            // Write stdin if provided
            if let Some(input) = stdin_input {
                use tokio::io::AsyncWriteExt;
                if let Some(mut stdin) = child.stdin.take() {
                    let _ = stdin.write_all(input.as_bytes()).await;
                    let _ = stdin.shutdown().await;
                }
            }

            let output = child
                .wait_with_output()
                .await
                .map_err(|e| format!("Lỗi đọc output: {}", e))?;

            let stdout = String::from_utf8_lossy(&output.stdout).to_string();
            let stderr = String::from_utf8_lossy(&output.stderr).to_string();
            // Docker container đã bị giới hạn memory 128m, sử dụng giá trị cố định
            let memory_kb = 0_u64; // Memory tracking qua Docker stats nếu cần sau này
            Ok((stdout, stderr, memory_kb))
        },
    )
    .await;

    match result {
        Ok(inner) => inner,
        Err(_) => Err(format!("Chương trình chạy quá thời gian (timeout {}s)", timeout_secs)),
    }
}


async fn cleanup(work_dir: &PathBuf) {
    let _ = tokio::fs::remove_dir_all(work_dir).await;
}

fn truncate_output(s: &str) -> String {
    if s.len() > MAX_OUTPUT_BYTES {
        let truncated = &s[..MAX_OUTPUT_BYTES];
        format!("{}...\n[Output truncated at 64KB]", truncated)
    } else {
        s.to_string()
    }
}
