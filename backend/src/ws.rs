// =====================================================
// WebSocket Handler — Interactive Code Runner
// Supports: compile, run, stdin streaming, kill
// =====================================================

use axum::{
    extract::ws::{Message, WebSocket, WebSocketUpgrade},
    response::IntoResponse,
};
use futures::{SinkExt, StreamExt};
use std::path::PathBuf;
use std::time::Instant;
use tokio::io::AsyncWriteExt;
use tokio::process::Command;
use uuid::Uuid;

use crate::models::{WsClientMessage, WsServerMessage};

const SANDBOX_DIR: &str = "/tmp/kairust_sandbox";
const TIMEOUT_SECS: u64 = 10;

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
            WsClientMessage::Run { code, is_test } => {
                // Kill previous process if any
                if let Some(kill_tx) = child_kill.take() {
                    let _ = kill_tx.send(());
                }

                let tx_clone = tx.clone();
                let (kill_sender, kill_receiver) = tokio::sync::oneshot::channel::<()>();
                child_kill = Some(kill_sender);

                let (stdin_tx, stdin_rx) = tokio::sync::mpsc::channel::<String>(32);
                stdin_tx_opt = Some(stdin_tx);

                let is_test = is_test.unwrap_or(false);

                // Spawn execution task
                tokio::spawn(async move {
                    run_interactive(code, is_test, tx_clone, kill_receiver, stdin_rx).await;
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
    code: String,
    is_test: bool,
    tx: tokio::sync::mpsc::Sender<WsServerMessage>,
    mut kill_rx: tokio::sync::oneshot::Receiver<()>,
    mut stdin_rx: tokio::sync::mpsc::Receiver<String>,
) {
    let session_id = Uuid::new_v4().to_string();
    let work_dir = PathBuf::from(SANDBOX_DIR).join(&session_id);

    // Setup workspace
    if let Err(e) = tokio::fs::create_dir_all(&work_dir).await {
        let _ = tx
            .send(WsServerMessage::Error {
                message: format!("Lỗi tạo workspace: {}", e),
            })
            .await;
        return;
    }
    let _ = tokio::fs::write(work_dir.join("main.rs"), &code).await;

    let start = Instant::now();

    // Step 1: Compile
    let _ = tx.send(WsServerMessage::Compiling).await;

    let mut cmd_compile = Command::new("rustc");
    cmd_compile.arg(work_dir.join("main.rs"))
        .arg("-o")
        .arg(work_dir.join("main"))
        .arg("--edition")
        .arg("2021");

    if is_test {
        cmd_compile.arg("--test");
    }

    // Lệnh build + test 
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
        _ => {}
    }

    // Lệnh rustc --test chỉ mới biên dịch thành ứng dụng kiểm thử độc lập có tên là main (chứa mọi Unit Tests). 
    // Chúng ta vẫn phải chạy file main để tiến hành Unit Test.

    // Step 2: Run with streaming output
    let _ = tx.send(WsServerMessage::Running).await;

    let mut child = match Command::new(work_dir.join("main"))
        .current_dir(&work_dir)
        .stdin(std::process::Stdio::piped())
        .stdout(std::process::Stdio::piped())
        .stderr(std::process::Stdio::piped())
        .spawn()
    {
        Ok(c) => c,
        Err(e) => {
            let _ = tx
                .send(WsServerMessage::Error {
                    message: format!("Lỗi chạy binary: {}", e),
                })
                .await;
            let _ = tokio::fs::remove_dir_all(&work_dir).await;
            return;
        }
    };

    let mut child_stdin = child.stdin.take();
    let stdout = child.stdout.take();
    let stderr = child.stderr.take();

    // Stream stdin
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
        _ = tokio::time::sleep(std::time::Duration::from_secs(TIMEOUT_SECS)) => {
            let _ = child.kill().await;
            let _ = tx.send(WsServerMessage::Error {
                message: "Chương trình chạy quá thời gian (timeout 10s)".to_string(),
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
        })
        .await;

    // Cleanup
    let _ = tokio::fs::remove_dir_all(&work_dir).await;
}
