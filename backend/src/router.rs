// =====================================================
// Router — API routes definition
// =====================================================

use axum::{Router, routing::{get, post}};
use crate::db::DbPool;
use crate::handlers::executor;
use crate::handlers::ws;
use crate::handlers::ws_play;
use crate::handlers::code;

pub fn create_router(db: DbPool) -> Router {
    let api_router = Router::new()
        // Health check
        .route("/health", get(health))
        // REST endpoint: compile & run (simple, no stdin streaming)
        .route("/run", post(executor::handle_run))
        // Code save/load endpoints
        .route("/code/save", post(code::save_code))
        .route("/code/:lesson_id", get(code::get_code))
        .with_state(db);

    Router::new()
        .nest("/api", api_router)
        // WebSocket endpoint: interactive run WITH test cases (Practice/Luyện tập)
        .route("/ws/run", get(ws::handle_ws_upgrade))
        // WebSocket endpoint: free run WITHOUT test cases (Theory/Lý thuyết)
        .route("/ws/play", get(ws_play::handle_ws_play_upgrade))
}

async fn health() -> &'static str {
    "KaiRust Backend OK"
}
