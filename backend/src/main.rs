// =====================================================
// KaiRust Backend — Main Entry Point
// Architecture: Modular (router → executor → sandbox)
// =====================================================

mod auth;
mod db;
mod handlers;
mod models;
mod router;
mod exercises;

use auth::{create_auth_router, AuthState, JwtSecret};
use tower_http::cors::{Any, CorsLayer};
use tracing_subscriber;

#[tokio::main]
async fn main() {
    // Initialize logging
    tracing_subscriber::fmt()
        .with_target(false)
        .compact()
        .init();

    tracing::info!("KaiRust Backend starting...");

    // Initialize database
    let db = match db::init_database().await {
        Ok(pool) => pool,
        Err(e) => {
            tracing::error!("Failed to initialize database: {}", e);
            std::process::exit(1);
        }
    };

    // Initialize JWT secret
    let jwt_secret = std::env::var("JWT_SECRET")
        .unwrap_or_else(|_| "kairust-default-secret-change-in-production".to_string());
    let jwt_secret = JwtSecret::new(jwt_secret);

    // Create auth state
    let auth_state = AuthState {
        db: db.clone(),
        jwt_secret: jwt_secret.clone(),
    };

    // CORS — allow frontend from any origin (dev mode)
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    // Build router with auth
    let app = router::create_router(db)
        .merge(create_auth_router(auth_state))
        .layer(cors);

    // Start server
    let addr = "0.0.0.0:3001";
    tracing::info!("Listening on {}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
