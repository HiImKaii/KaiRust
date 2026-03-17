// =====================================================
// Router — API routes definition
// =====================================================

use axum::{Router, routing::{get, post, delete}};
use crate::db::DbPool;
use crate::handlers::executor;
use crate::handlers::ws;
use crate::handlers::ws_play;
use crate::handlers::code;
use crate::handlers::admin;

pub fn create_router(db: DbPool) -> Router {
    // Admin path configurable via env var
    let admin_path = std::env::var("ADMIN_PATH").unwrap_or_else(|_| "admin".to_string());

    let api_router = Router::new()
        // Health check
        .route("/health", get(health))
        // REST endpoint: compile & run (simple, no stdin streaming)
        .route("/run", post(executor::handle_run))
        // Code save/load endpoints
        .route("/code/save", post(code::save_code))
        .route("/code/{lesson_id}", get(code::get_code))
        // Admin Auth API
        .route("/admin/login", post(admin::admin_login))
        .route("/admin/logout", post(admin::admin_logout))
        .route("/admin/verify", get(admin::admin_verify))
        // Admin User Management API
        .route("/admin/users", get(admin::list_users))
        .route("/admin/users/{user_id}", get(admin::get_user_detail))
        .route("/admin/users/{user_id}", delete(admin::delete_user))
        // Admin Stats API
        .route("/admin/stats", get(admin::get_stats))
        .with_state(db);

    Router::new()
        .nest("/api", api_router)
        // Admin SPA (server-gated)
        .route(&format!("/{}", admin_path), get(admin::serve_admin_page))
        .route(&format!("/{}/assets/{{*path}}", admin_path), get(admin::serve_admin_asset))
        // WebSocket endpoint: interactive run WITH test cases (Practice/Luyện tập)
        .route("/ws/run", get(ws::handle_ws_upgrade))
        // WebSocket endpoint: free run WITHOUT test cases (Theory/Lý thuyết)
        .route("/ws/play", get(ws_play::handle_ws_play_upgrade))
}

async fn health() -> &'static str {
    "KaiRust Backend OK"
}
