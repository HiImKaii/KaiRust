// =====================================================
// Router — API routes definition
// =====================================================

use axum::{Router, routing::{get, post}};
use crate::db::DbPool;
use crate::handlers::executor;
use crate::handlers::ws;

pub fn create_router(_db: DbPool) -> Router {
    Router::new()
        // Health check
        .route("/api/health", get(health))
        // REST endpoint: compile & run (simple, no stdin streaming)
        .route("/api/run", post(executor::handle_run))
        // WebSocket endpoint: interactive run with stdin streaming
        .route("/ws/run", get(ws::handle_ws_upgrade))
        // Auth endpoints (will be merged in main.rs)
        // .route("/api/auth/register", post(auth::register))
        // .route("/api/auth/login", post(auth::login))
        // .route("/api/auth/forgot-password", post(auth::forgot_password))
        // .route("/api/auth/me", get(auth::get_current_user))
}

async fn health() -> &'static str {
    "KaiRust Backend OK"
}
