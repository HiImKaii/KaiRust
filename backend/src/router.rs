// =====================================================
// Router — API routes definition
// =====================================================

use axum::{Router, routing::{get, post}};
use crate::db::DbPool;
use crate::handlers::executor;
use crate::handlers::ws;
use crate::handlers::ws_play;

pub fn create_router(_db: DbPool) -> Router {
    Router::new()
        // Health check
        .route("/api/health", get(health))
        // REST endpoint: compile & run (simple, no stdin streaming)
        .route("/api/run", post(executor::handle_run))
        // WebSocket endpoint: interactive run WITH test cases (Practice/Luyện tập)
        .route("/ws/run", get(ws::handle_ws_upgrade))
        // WebSocket endpoint: free run WITHOUT test cases (Theory/Lý thuyết)
        .route("/ws/play", get(ws_play::handle_ws_play_upgrade))
}

async fn health() -> &'static str {
    "KaiRust Backend OK"
}
