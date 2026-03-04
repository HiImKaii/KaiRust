// =====================================================
// KaiRust Backend — Main Entry Point
// Architecture: Modular (router → executor → sandbox)
// =====================================================

mod executor;
mod models;
mod router;
mod ws;

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

    // CORS — allow frontend from any origin (dev mode)
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    // Build router
    let app = router::create_router().layer(cors);

    // Start server
    let addr = "0.0.0.0:3001";
    tracing::info!("Listening on {}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
