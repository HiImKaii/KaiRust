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

/// Maximum execution time in seconds
const TIMEOUT_SECS: u64 = 10;

/// Maximum output size in bytes (prevent memory bomb)
const MAX_OUTPUT_BYTES: usize = 1024 * 64; // 64KB

// ---- REST API Handler ----

pub async fn handle_run(Json(req): Json<RunRequest>) -> Json<RunResponse> {
    let is_test = req.is_test.unwrap_or(false);
    let result = compile_and_run(&req.code, req.stdin.as_deref(), is_test).await;
    Json(result)
}

// ---- Core Logic (reused by both REST and WebSocket) ----

/// Compile and run Rust code, returns structured result
pub async fn compile_and_run(code: &str, stdin_input: Option<&str>, is_test: bool) -> RunResponse {
    let session_id = Uuid::new_v4().to_string();
    let work_dir = PathBuf::from(SANDBOX_DIR).join(&session_id);

    // Setup workspace
    if let Err(e) = setup_workspace(&work_dir, code).await {
        return RunResponse {
            success: false,
            stdout: String::new(),
            stderr: format!("Lỗi tạo workspace: {}", e),
            execution_time_ms: 0,
        };
    }

    let start = Instant::now();

    // Step 1: Compile
    let compile_result = compile(&work_dir, is_test).await;
    match compile_result {
        Err(stderr) => {
            cleanup(&work_dir).await;
            return RunResponse {
                success: false,
                stdout: String::new(),
                stderr,
                execution_time_ms: start.elapsed().as_millis() as u64,
            };
        }
        Ok(_) => {}
    }

    // Step 2: Run
    let run_result = run_binary(&work_dir, stdin_input).await;
    let elapsed = start.elapsed().as_millis() as u64;

    // Cleanup
    cleanup(&work_dir).await;

    match run_result {
        Ok((stdout, stderr)) => RunResponse {
            success: true,
            stdout: truncate_output(&stdout),
            stderr: truncate_output(&stderr),
            execution_time_ms: elapsed,
        },
        Err(err_msg) => RunResponse {
            success: false,
            stdout: String::new(),
            stderr: err_msg,
            execution_time_ms: elapsed,
        },
    }
}

// ---- Internal Functions ----

async fn setup_workspace(work_dir: &PathBuf, code: &str) -> Result<(), String> {
    tokio::fs::create_dir_all(work_dir)
        .await
        .map_err(|e| e.to_string())?;

    let source_file = work_dir.join("main.rs");
    tokio::fs::write(&source_file, code)
        .await
        .map_err(|e| e.to_string())?;

    Ok(())
}

async fn compile(work_dir: &PathBuf, is_test: bool) -> Result<(), String> {
    let source = work_dir.join("main.rs");
    let output = work_dir.join("main");

    let mut cmd = Command::new("rustc");
    cmd.arg(&source)
       .arg("-o")
       .arg(&output)
       .arg("--edition")
       .arg("2021");

    if is_test {
        cmd.arg("--test");
    }

    let result = tokio::time::timeout(
        std::time::Duration::from_secs(TIMEOUT_SECS),
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
        Ok(Err(e)) => Err(format!("Lỗi chạy rustc: {}", e)),
        Err(_) => Err("Biên dịch quá thời gian (timeout)".to_string()),
    }
}

async fn run_binary(
    work_dir: &PathBuf,
    stdin_input: Option<&str>,
) -> Result<(String, String), String> {
    let binary = work_dir.join("main");

    let mut cmd = Command::new(&binary);
    cmd.current_dir(work_dir);

    if stdin_input.is_some() {
        cmd.stdin(std::process::Stdio::piped());
    }
    cmd.stdout(std::process::Stdio::piped());
    cmd.stderr(std::process::Stdio::piped());

    let result = tokio::time::timeout(
        std::time::Duration::from_secs(TIMEOUT_SECS),
        async {
            let mut child = cmd.spawn().map_err(|e| format!("Lỗi chạy binary: {}", e))?;

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
            Ok((stdout, stderr))
        },
    )
    .await;

    match result {
        Ok(inner) => inner,
        Err(_) => Err("Chương trình chạy quá thời gian (timeout 10s)".to_string()),
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
