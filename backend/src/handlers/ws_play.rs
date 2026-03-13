// =====================================================
// WebSocket Handler — Play Mode (Free Run, No Test Cases)
// Used by Theory page's inline code runners
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
const DEFAULT_TIMEOUT: u64 = 10;

/// Compute SHA256 hash of code for cache key
fn compute_code_hash(code: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(code.as_bytes());
    format!("{:x}", hasher.finalize())
}

/// Check if cached binary exists and is valid
async fn get_cached_binary(code_hash: &str) -> Option<PathBuf> {
    let cache_binary = PathBuf::from(CACHE_DIR).join(format!("{}.bin", code_hash));
    if cache_binary.exists() {
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

/// Clean old cache entries
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
    files.sort_by_key(|(t, _)| *t);
    if files.len() > max_entries {
        for (_, path) in files.iter().take(files.len() - max_entries) {
            let _ = tokio::fs::remove_file(path).await;
        }
    }
    Ok(())
}

/// Upgrade HTTP request to WebSocket (Play mode)
pub async fn handle_ws_play_upgrade(ws: WebSocketUpgrade) -> impl IntoResponse {
    ws.on_upgrade(handle_ws_play_connection)
}

/// Handle a single WebSocket connection (Play mode - no test cases)
async fn handle_ws_play_connection(socket: WebSocket) {
    let (mut sender, mut receiver) = socket.split();

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
            WsClientMessage::Run { code, .. } => {
                // Play mode: ignore is_test, lesson_id — just run the code freely
                if let Some(kill_tx) = child_kill.take() {
                    let _ = kill_tx.send(());
                }

                let tx_clone = tx.clone();
                let (kill_sender, kill_receiver) = tokio::sync::oneshot::channel::<()>();
                child_kill = Some(kill_sender);

                let (stdin_tx, stdin_rx) = tokio::sync::mpsc::channel::<String>(32);
                stdin_tx_opt = Some(stdin_tx);

                tokio::spawn(async move {
                    run_play(code, tx_clone, kill_receiver, stdin_rx).await;
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

    if let Some(kill_tx) = child_kill.take() {
        let _ = kill_tx.send(());
    }
    send_task.abort();
}

/// Compile and run code freely (no test cases, no lesson_id)
async fn run_play(
    code: String,
    tx: tokio::sync::mpsc::Sender<WsServerMessage>,
    mut kill_rx: tokio::sync::oneshot::Receiver<()>,
    mut stdin_rx: tokio::sync::mpsc::Receiver<String>,
) {
    let session_id = Uuid::new_v4().to_string();
    let work_dir = PathBuf::from(SANDBOX_DIR).join(&session_id);
    let timeout_secs = DEFAULT_TIMEOUT;

    // Clone template
    let template_dir = "/tmp/kairust_template";
    let status = Command::new("cp")
        .arg("-a")
        .arg(format!("{}/.", template_dir))
        .arg(&work_dir)
        .status()
        .await;

    if status.is_err() || !status.unwrap().success() {
        let _ = tx.send(WsServerMessage::Error {
            message: "Lỗi khởi tạo workspace".to_string(),
        }).await;
        return;
    }

    let src_dir = work_dir.join("src");
    let cache_key = compute_code_hash(&code);
    let _ = tokio::fs::write(src_dir.join("main.rs"), &code).await;

    let start = Instant::now();

    // Check cache
    let mut use_cache = false;
    if let Some(cached_path) = get_cached_binary(&cache_key).await {
        let target_binary = work_dir.join("target").join("release").join("user_code");
        let _ = tokio::fs::create_dir_all(work_dir.join("target").join("release")).await;
        if tokio::fs::copy(&cached_path, &target_binary).await.is_ok() {
            use_cache = true;
        }
    }

    // Compile if cache miss
    if !use_cache {
        let _ = tx.send(WsServerMessage::Compiling).await;
        let mut cmd_compile = Command::new("cargo");
        cmd_compile.arg("build").arg("--release").current_dir(&work_dir);
        let compile_result = cmd_compile.output().await;

        match compile_result {
            Ok(output) if !output.status.success() => {
                let stderr = String::from_utf8_lossy(&output.stderr).to_string();
                let _ = tx.send(WsServerMessage::CompileError { stderr }).await;
                let _ = tokio::fs::remove_dir_all(&work_dir).await;
                return;
            }
            Err(e) => {
                let _ = tx.send(WsServerMessage::Error {
                    message: format!("Lỗi rustc: {}", e),
                }).await;
                let _ = tokio::fs::remove_dir_all(&work_dir).await;
                return;
            }
            _ => {
                let compiled_binary = work_dir.join("target").join("release").join("user_code");
                if compiled_binary.exists() {
                    let _ = save_to_cache(&cache_key, &compiled_binary).await;
                    let _ = clean_old_cache(100).await;
                }
            }
        }
    }

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
        .arg("--rm")
        .arg("-i")
        .arg("--read-only")
        .arg("--tmpfs").arg("/tmp:size=16m")
        .arg("--network").arg("none")
        .arg("--memory").arg("128m")
        .arg("--cpus").arg("0.5")
        .arg("--pids-limit").arg("64")
        .arg("-v").arg(&volume_arg)
        .arg("debian:bookworm-slim")
        .arg(&binary_in_sandbox)
        .stdin(std::process::Stdio::piped())
        .stdout(std::process::Stdio::piped())
        .stderr(std::process::Stdio::piped())
        .spawn()
    {
        Ok(c) => c,
        Err(e) => {
            let _ = tx.send(WsServerMessage::Error {
                message: format!("Lỗi khởi tạo sandbox: {}", e),
            }).await;
            let _ = tokio::fs::remove_dir_all(&work_dir).await;
            return;
        }
    };

    let child_stdin = child.stdin.take();
    let stdout = child.stdout.take();
    let stderr = child.stderr.take();

    // Stream stdin from WebSocket
    let stdin_task = tokio::spawn(async move {
        if let Some(mut stdin) = child_stdin {
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
                let _ = tx_stdout.send(WsServerMessage::Stdout {
                    data: format!("{}\n", line),
                }).await;
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
                let _ = tx_stderr.send(WsServerMessage::Stderr {
                    data: format!("{}\n", line),
                }).await;
            }
        }
    });

    // Wait for process
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

    let _ = stdout_task.await;
    let _ = stderr_task.await;
    stdin_task.abort();

    let elapsed = start.elapsed().as_millis() as u64;

    let _ = tx.send(WsServerMessage::Exit {
        code: exit_code,
        execution_time_ms: elapsed,
        memory_usage_kb: 0,
    }).await;

    let _ = tokio::fs::remove_dir_all(&work_dir).await;
}
