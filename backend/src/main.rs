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

async fn init_template_project() {
    tracing::info!("Khởi tạo bản mẫu Sandbox Base Template (Cold Start Optimization)...");
    let template_dir = std::path::PathBuf::from("/tmp/kairust_template");
    let _ = tokio::fs::create_dir_all(&template_dir).await;

    let src_dir = template_dir.join("src");
    let _ = tokio::fs::create_dir_all(&src_dir).await;

    let cargo_toml = r#"
[package]
name = "user_code"
version = "0.1.0"
edition = "2021"

[dependencies]
rand = "0.8"
"#;
    let _ = tokio::fs::write(template_dir.join("Cargo.toml"), cargo_toml).await;
    let _ = tokio::fs::write(src_dir.join("main.rs"), "fn main() {}").await;

    tracing::info!("Pre-compiling base template dependencies...");
    let result = tokio::process::Command::new("cargo")
        .arg("build")
        .arg("--release")
        .current_dir(&template_dir)
        .output()
        .await;

    match result {
        Ok(out) if out.status.success() => {
            tracing::info!("Base template compiled successfully.");
        }
        Ok(out) => {
            tracing::warn!("Failed to compile base template: {}", String::from_utf8_lossy(&out.stderr));
        }
        Err(e) => {
            tracing::error!("Failed to run cargo build on template: {}", e);
        }
    }

    tracing::info!("Pre-pulling Docker sandbox image...");
    let result = tokio::process::Command::new("docker")
        .arg("pull")
        .arg("debian:bookworm-slim")
        .output()
        .await;

    if let Err(e) = result {
        tracing::error!("Failed to pull docker image: {}", e);
    } else {
        tracing::info!("Docker sandbox image pulled successfully.");
    }
}

#[tokio::main]
async fn main() {
    // Initialize logging
    tracing_subscriber::fmt()
        .with_target(false)
        .compact()
        .init();

    tracing::info!("KaiRust Backend starting...");
    init_template_project().await;

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
