// =====================================================
// Router — API routes definition
// =====================================================

use axum::{Router, routing::{get, post}};
use crate::executor;
use crate::ws;

pub fn create_router() -> Router {
    Router::new()
        // Health check
        .route("/api/health", get(health))
        // REST endpoint: compile & run (simple, no stdin streaming)
        .route("/api/run", post(executor::handle_run))
        // WebSocket endpoint: interactive run with stdin streaming
        .route("/ws/run", get(ws::handle_ws_upgrade))
}

async fn health() -> &'static str {
    "KaiRust Backend OK"
}
