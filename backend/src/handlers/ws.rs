// =====================================================
// WebSocket Handler — Interactive Code Runner
// Supports: compile, run, stdin streaming, kill
// =====================================================

use axum::{
    extract::ws::{Message, WebSocket, WebSocketUpgrade},
    response::IntoResponse,
};
use futures::{SinkExt, StreamExt};
use sha2::{Sha256, Digest};
use std::path::PathBuf;
use std::time::Instant;
use tokio::process::Command;
use uuid::Uuid;

use crate::models::{WsClientMessage, WsServerMessage};

const SANDBOX_DIR: &str = "/tmp/kairust_sandbox";
const CACHE_DIR: &str = "/tmp/kairust_cache";

/// Compute SHA256 hash of code for cache key
fn compute_code_hash(code: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(code.as_bytes());
    format!("{:x}", hasher.finalize())
}

/// Check if cached binary exists and is valid
/// Returns the path to cached binary if hit, None if miss
async fn get_cached_binary(code_hash: &str) -> Option<PathBuf> {
    let cache_binary = PathBuf::from(CACHE_DIR).join(format!("{}.bin", code_hash));

    if cache_binary.exists() {
        // Verify it's a valid executable
        if let Ok(metadata) = tokio::fs::metadata(&cache_binary).await {
            if metadata.len() > 0 {
                return Some(cache_binary);
            }
        }
    }
    None
}

/// Save compiled binary to cache
async fn save_to_cache(code_hash: &str, binary_path: &PathBuf) -> Result<(), String> {
    let cache_dir = PathBuf::from(CACHE_DIR);
    tokio::fs::create_dir_all(&cache_dir)
        .await
        .map_err(|e| e.to_string())?;

    let cache_binary = cache_dir.join(format!("{}.bin", code_hash));
    tokio::fs::copy(binary_path, &cache_binary)
        .await
        .map_err(|e| e.to_string())?;

    Ok(())
}

/// Clean old cache entries (keep only last N entries)
async fn clean_old_cache(max_entries: usize) -> Result<(), String> {
    let cache_dir = PathBuf::from(CACHE_DIR);

    let mut entries = tokio::fs::read_dir(&cache_dir)
        .await
        .map_err(|e| e.to_string())?;

    let mut files: Vec<(u64, PathBuf)> = Vec::new();

    while let Some(entry) = entries.next_entry().await.map_err(|e| e.to_string())? {
        if let Ok(metadata) = entry.metadata().await {
            if let Ok(modified) = metadata.modified() {
                let timestamp = modified
                    .duration_since(std::time::UNIX_EPOCH)
                    .map(|d| d.as_secs())
                    .unwrap_or(0);
                files.push((timestamp, entry.path()));
            }
        }
    }

    // Sort by timestamp (oldest first)
    files.sort_by_key(|(t, _)| *t);

    // Delete oldest entries if over limit
    if files.len() > max_entries {
        for (_, path) in files.iter().take(files.len() - max_entries) {
            let _ = tokio::fs::remove_file(path).await;
        }
    }

    Ok(())
}

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

/// Upgrade HTTP request to WebSocket
pub async fn handle_ws_upgrade(ws: WebSocketUpgrade) -> impl IntoResponse {
    ws.on_upgrade(handle_ws_connection)
}

/// Handle a single WebSocket connection
async fn handle_ws_connection(socket: WebSocket) {
    let (mut sender, mut receiver) = socket.split();

    // Channel for sending messages to the client
    let (tx, mut rx) = tokio::sync::mpsc::channel::<WsServerMessage>(32);

    // Task: forward messages from channel to WebSocket
    let send_task = tokio::spawn(async move {
        while let Some(msg) = rx.recv().await {
            let json = serde_json::to_string(&msg).unwrap_or_default();
            if sender.send(Message::Text(json.into())).await.is_err() {
                break;
            }
        }
    });

    // Process incoming messages
    let mut stdin_tx_opt: Option<tokio::sync::mpsc::Sender<String>> = None;
    let mut child_kill: Option<tokio::sync::oneshot::Sender<()>> = None;

    while let Some(Ok(msg)) = receiver.next().await {
        let text = match msg {
            Message::Text(t) => t.to_string(),
            Message::Close(_) => break,
            _ => continue,
        };

        let client_msg: WsClientMessage = match serde_json::from_str(&text) {
            Ok(m) => m,
            Err(_) => {
                let _ = tx
                    .send(WsServerMessage::Error {
                        message: "Invalid message format".to_string(),
                    })
                    .await;
                continue;
            }
        };

        match client_msg {
            WsClientMessage::Run { code, is_test, lesson_id, stdin } => {
                // Kill previous process if any
                if let Some(kill_tx) = child_kill.take() {
                    let _ = kill_tx.send(());
                }

                let tx_clone = tx.clone();
                let (kill_sender, kill_receiver) = tokio::sync::oneshot::channel::<()>();
                child_kill = Some(kill_sender);

                let (stdin_tx, stdin_rx) = tokio::sync::mpsc::channel::<String>(32);
                stdin_tx_opt = Some(stdin_tx);

                // Spawn execution task
                tokio::spawn(async move {
                    run_interactive(code, is_test.unwrap_or(false), lesson_id, stdin, tx_clone, kill_receiver, stdin_rx).await;
                });
            }
            WsClientMessage::Stdin { data } => {
                if let Some(tx) = &stdin_tx_opt {
                    let _ = tx.send(data).await;
                }
            }
            WsClientMessage::Kill => {
                if let Some(kill_tx) = child_kill.take() {
                    let _ = kill_tx.send(());
                }
            }
        }
    }

    // Cleanup
    if let Some(kill_tx) = child_kill.take() {
        let _ = kill_tx.send(());
    }
    send_task.abort();
}

/// Compile and run code interactively, streaming output via channel
async fn run_interactive(
    mut code: String,
    is_test: bool,
    lesson_id: Option<String>,
    initial_stdin: Option<String>,
    tx: tokio::sync::mpsc::Sender<WsServerMessage>,
    mut kill_rx: tokio::sync::oneshot::Receiver<()>,
    mut stdin_rx: tokio::sync::mpsc::Receiver<String>,
) {
    let session_id = Uuid::new_v4().to_string();
    let work_dir = PathBuf::from(SANDBOX_DIR).join(&session_id);

    // Lấy timeout từ giới hạn bài tập
    let timeout_secs = get_timeout_secs(&lesson_id);

    // Setup workspace bằng cách clone từ template đã compile sẵn
    let template_dir = "/tmp/kairust_template";
    eprintln!("[DEBUG] Copying from {} to {:?}", template_dir, work_dir);
    let status = Command::new("cp")
        .arg("-a")
        .arg(format!("{}/.", template_dir))
        .arg(&work_dir)
        .status()
        .await;

    // Debug: list files in work_dir
    let _ = Command::new("ls")
        .arg("-la")
        .arg(&work_dir)
        .output()
        .await;

    if status.is_err() || !status.unwrap().success() {
        let _ = tx
            .send(WsServerMessage::Error {
                message: "Lỗi chạy lệnh cp clone template".to_string(),
            })
            .await;
        return;
    }

    let src_dir = work_dir.join("src");

    // Nếu là bài kiểm tra và có lesson_id và có stdin từ frontend,
    // KHÔNG cần test code từ backend (dùng stdin từ frontend)
    let has_frontend_stdin = initial_stdin.is_some();

    // Nếu là bài kiểm tra và có lesson_id, tự động nối thêm test case từ backend
    if is_test && !has_frontend_stdin {
        eprintln!("[DEBUG] is_test=true, lesson_id={:?}", lesson_id);
        if let Some(ref lid) = lesson_id {
            eprintln!("[DEBUG] Looking for test code: {}", lid);
            match crate::exercises::get_test_code(lid) {
                Some(test_code) => {
                    eprintln!("[DEBUG] Found test code, appending...");
                    code.push_str("\n");
                    code.push_str(test_code);
                }
                None => {
                    eprintln!("[DEBUG] No test code found for: {}", lid);
                    let _ = tx.send(WsServerMessage::Error {
                        message: format!("Lỗi: Bài tập '{}' không tồn tại test case trên hệ thống.", lid),
                    }).await;
                    let _ = tokio::fs::remove_dir_all(&work_dir).await;
                    return;
                }
            }
        } else {
            eprintln!("[DEBUG] No lesson_id provided");
        }
    } else if is_test && has_frontend_stdin {
        eprintln!("[DEBUG] is_test=true with stdin from frontend, skipping backend test code");
    }

    // Compute hash for caching (use original code without test for cache key)
    let cache_key = compute_code_hash(&code);

    let _ = tokio::fs::write(src_dir.join("main.rs"), &code).await;

    let start = Instant::now();

    // Step 1: Check cache first
    let mut use_cache = false;

    if let Some(cached_path) = get_cached_binary(&cache_key).await {
        // Cache hit - copy cached binary to work dir
        let target_binary = work_dir.join("target").join("release").join("user_code");

        // Create target directory
        let _ = tokio::fs::create_dir_all(work_dir.join("target").join("release")).await;

        if tokio::fs::copy(&cached_path, &target_binary).await.is_ok() {
            use_cache = true;
            eprintln!("[CACHE] Cache HIT - using cached binary");
        } else {
            use_cache = false;
        }
    } else {
        // Cache miss - need to compile
    }

    // Step 1b: Compile if cache miss
    if !use_cache {
        let _ = tx.send(WsServerMessage::Compiling).await;

        let mut cmd_compile = Command::new("cargo");
        cmd_compile.arg("build")
            .arg("--release")
            .current_dir(&work_dir);

        let compile_result = cmd_compile.output().await;

        match compile_result {
            Ok(output) if !output.status.success() => {
                let stderr = String::from_utf8_lossy(&output.stderr).to_string();
                let _ = tx.send(WsServerMessage::CompileError { stderr }).await;
                let _ = tokio::fs::remove_dir_all(&work_dir).await;
                return;
            }
            Err(e) => {
                let _ = tx
                    .send(WsServerMessage::Error {
                        message: format!("Lỗi rustc: {}", e),
                    })
                    .await;
                let _ = tokio::fs::remove_dir_all(&work_dir).await;
                return;
            }
            _ => {
                // Save successful compile to cache
                let compiled_binary = work_dir.join("target").join("release").join("user_code");
                if compiled_binary.exists() {
                    let _ = save_to_cache(&cache_key, &compiled_binary).await;
                    // Clean old cache entries periodically
                    let _ = clean_old_cache(100).await;
                }
            }
        }
    }

    // Step 2: Run with streaming output inside Docker Sandbox
    let _ = tx.send(WsServerMessage::Running).await;

    // Cấu hình linh hoạt Docker Volume Mount
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

    let mut child = match Command::new("docker")
        .arg("run")
        .arg("--rm")                           // Tự hủy container khi xong
        .arg("-i")                             // Cho phép stdin pipe
        .arg("--read-only")                    // Cấm ghi filesystem
        .arg("--tmpfs").arg("/tmp:size=16m")   // /tmp nhỏ cho chương trình
        .arg("--network").arg("none")          // Cấm truy cập mạng
        .arg("--memory").arg("128m")           // Giới hạn RAM
        .arg("--cpus").arg("0.5")              // Giới hạn CPU
        .arg("--pids-limit").arg("64")         // Chặn fork bomb
        .arg("-v").arg(&volume_arg)            // Bind mount volume
        .arg("debian:bookworm-slim")
        .arg(&binary_in_sandbox)
        .stdin(std::process::Stdio::piped())
        .stdout(std::process::Stdio::piped())
        .stderr(std::process::Stdio::piped())
        .spawn()
    {
        Ok(c) => c,
        Err(e) => {
            let _ = tx
                .send(WsServerMessage::Error {
                    message: format!("Lỗi khởi tạo sandbox: {}", e),
                })
                .await;
            let _ = tokio::fs::remove_dir_all(&work_dir).await;
            return;
        }
    };

    let mut child_stdin = child.stdin.take();
    let stdout = child.stdout.take();
    let stderr = child.stderr.take();

    // Gửi stdin ban đầu (từ test case)
    if let Some(initial) = initial_stdin {
        if let Some(ref mut stdin) = child_stdin {
            use tokio::io::AsyncWriteExt;
            let _ = stdin.write_all(initial.as_bytes()).await;
            let _ = stdin.shutdown().await;
        }
    }

    // Stream stdin (từ WebSocket)
    let stdin_task = tokio::spawn(async move {
        if let Some(ref mut stdin) = child_stdin {
            use tokio::io::AsyncWriteExt;
            while let Some(data) = stdin_rx.recv().await {
                let _ = stdin.write_all(data.as_bytes()).await;
                let _ = stdin.flush().await;
            }
        }
    });

    // Stream stdout
    let tx_stdout = tx.clone();
    let stdout_task = tokio::spawn(async move {
        if let Some(stdout) = stdout {
            use tokio::io::{AsyncBufReadExt, BufReader};
            let mut reader = BufReader::new(stdout).lines();
            while let Ok(Some(line)) = reader.next_line().await {
                let _ = tx_stdout
                    .send(WsServerMessage::Stdout {
                        data: format!("{}\n", line),
                    })
                    .await;
            }
        }
    });

    // Stream stderr
    let tx_stderr = tx.clone();
    let stderr_task = tokio::spawn(async move {
        if let Some(stderr) = stderr {
            use tokio::io::{AsyncBufReadExt, BufReader};
            let mut reader = BufReader::new(stderr).lines();
            while let Ok(Some(line)) = reader.next_line().await {
                let _ = tx_stderr
                    .send(WsServerMessage::Stderr {
                        data: format!("{}\n", line),
                    })
                    .await;
            }
        }
    });

    // Wait for process to finish or timeout/kill
    let exit_code = tokio::select! {
        result = child.wait() => {
            match result {
                Ok(status) => status.code().unwrap_or(-1),
                Err(_) => -1,
            }
        }
        _ = tokio::time::sleep(std::time::Duration::from_secs(timeout_secs + 2)) => {
            let _ = child.kill().await;
            let _ = tx.send(WsServerMessage::Error {
                message: format!("Chương trình chạy quá thời gian (timeout {}s)", timeout_secs),
            }).await;
            -1
        }
        _ = &mut kill_rx => {
            let _ = child.kill().await;
            -1
        }
    };

    // Wait for output tasks to finish
    let _ = stdout_task.await;
    let _ = stderr_task.await;
    stdin_task.abort();

    let elapsed = start.elapsed().as_millis() as u64;

    let _ = tx
        .send(WsServerMessage::Exit {
            code: exit_code,
            execution_time_ms: elapsed,
            memory_usage_kb: 0, // Docker giới hạn memory 128m, tracking riêng nếu cần
        })
        .await;

    // Cleanup
    let _ = tokio::fs::remove_dir_all(&work_dir).await;
}
