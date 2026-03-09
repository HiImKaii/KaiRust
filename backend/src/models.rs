// =====================================================
// Models — Request/Response types for API
// =====================================================

use serde::{Deserialize, Serialize};

/// Request body for POST /api/run
#[derive(Debug, Deserialize)]
pub struct RunRequest {
    /// Rust source code to compile and run
    pub code: String,
    /// Optional stdin input to feed to the program
    pub stdin: Option<String>,
    /// Optional flag to compile with --test. Defaults to false.
    pub is_test: Option<bool>,
    /// Optional ID of the lesson to load test cases from backend/exercises/
    #[allow(dead_code)]
    pub lesson_id: Option<String>,
}

/// Response body for POST /api/run
#[derive(Debug, Serialize)]
pub struct RunResponse {
    pub success: bool,
    pub stdout: String,
    pub stderr: String,
    /// Compilation + execution time in milliseconds
    pub execution_time_ms: u64,
    /// Memory usage in KB
    pub memory_usage_kb: u64,
}

/// WebSocket message from client
#[derive(Debug, Deserialize)]
#[serde(tag = "type")]
pub enum WsClientMessage {
    /// Submit code to compile and run
    #[serde(rename = "run")]
    Run {
        code: String,
        /// Optional flag to compile with --test. Defaults to false.
        is_test: Option<bool>,
        /// Optional ID of the lesson to load test cases from backend/exercises/
        lesson_id: Option<String>,
        /// Optional stdin input
        stdin: Option<String>,
    },
    /// Send stdin input to running process
    #[serde(rename = "stdin")]
    Stdin { data: String },
    /// Kill the running process
    #[serde(rename = "kill")]
    Kill,
}

/// WebSocket message to client
#[derive(Debug, Serialize)]
#[serde(tag = "type")]
pub enum WsServerMessage {
    /// Compilation started
    #[serde(rename = "compiling")]
    Compiling,
    /// Compilation error
    #[serde(rename = "compile_error")]
    CompileError { stderr: String },
    /// Program started running
    #[serde(rename = "running")]
    Running,
    /// stdout output from program
    #[serde(rename = "stdout")]
    Stdout { data: String },
    /// stderr output from program
    #[serde(rename = "stderr")]
    Stderr { data: String },
    /// Program exited
    #[serde(rename = "exit")]
    Exit { code: i32, execution_time_ms: u64, memory_usage_kb: u64 },
    /// Error occurred
    #[serde(rename = "error")]
    Error { message: String },
}
