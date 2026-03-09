// =====================================================
// Executor — Compile & Run Rust code in a sandbox
// Handles both REST API and reusable compile/run logic
// =====================================================

use axum::Json;
use std::path::PathBuf;
use std::time::Instant;
use tokio::process::Command;
use uuid::Uuid;

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
    axum::extract::State(_state): axum::extract::State<()>,
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
    tokio::fs::create_dir_all(work_dir)
        .await
        .map_err(|e| e.to_string())?;

    // Tạo src directory nếu chưa có (cho cargo)
    let src_dir = work_dir.join("src");
    tokio::fs::create_dir_all(&src_dir)
        .await
        .map_err(|e| e.to_string())?;

    // Viết main.rs vào src/
    let source_file = src_dir.join("main.rs");
    tokio::fs::write(&source_file, code)
        .await
        .map_err(|e| e.to_string())?;

    // Tạo Cargo.toml
    let cargo_toml = r#"
[package]
name = "user_code"
version = "0.1.0"
edition = "2021"

[dependencies]
rand = "0.8"
"#;
    let cargo_file = work_dir.join("Cargo.toml");
    tokio::fs::write(&cargo_file, cargo_toml)
        .await
        .map_err(|e| e.to_string())?;

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
    // Chạy binary trực tiếp
    let binary_path = work_dir.join("target").join("release").join("user_code");

    let mut cmd = Command::new(&binary_path);
    cmd.current_dir(work_dir);

    let result = tokio::time::timeout(
        std::time::Duration::from_secs(timeout_secs),
        async {
            let mut child = cmd.spawn().map_err(|e| format!("Lỗi chạy binary: {}", e))?;

            // Lấy PID để theo dõi memory
            let pid = child.id().unwrap_or(0);

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

            // Lấy memory usage sau khi process kết thúc
            let memory_kb = get_memory_usage(pid);

            let stdout = String::from_utf8_lossy(&output.stdout).to_string();
            let stderr = String::from_utf8_lossy(&output.stderr).to_string();
            Ok((stdout, stderr, memory_kb))
        },
    )
    .await;

    match result {
        Ok(inner) => inner,
        Err(_) => Err("Chương trình chạy quá thời gian (timeout 10s)".to_string()),
    }
}

/// Lấy memory usage (RSS - Resident Set Size) của process
/// Trả về memory tính theo KB
fn get_memory_usage(pid: u32) -> u64 {
    if pid == 0 {
        return 0;
    }

    let status_path = format!("/proc/{}/status", pid);

    match std::fs::read_to_string(&status_path) {
        Ok(content) => {
            for line in content.lines() {
                if line.starts_with("VmRSS:") {
                    let parts: Vec<&str> = line.split_whitespace().collect();
                    if parts.len() >= 2 {
                        if let Ok(kb) = parts[1].parse::<u64>() {
                            return kb;
                        }
                    }
                }
            }
            for line in content.lines() {
                if line.starts_with("VmSize:") {
                    let parts: Vec<&str> = line.split_whitespace().collect();
                    if parts.len() >= 2 {
                        if let Ok(kb) = parts[1].parse::<u64>() {
                            return kb;
                        }
                    }
                }
            }
            0
        }
        Err(_) => 0,
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
