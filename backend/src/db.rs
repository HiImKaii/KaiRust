// =====================================================
// Database Module — SQLite with sqlx
// =====================================================

use sqlx::sqlite::{SqlitePool, SqlitePoolOptions};
use std::path::PathBuf;
use std::sync::Arc;

pub type DbPool = Arc<SqlitePool>;

/// Initialize database and run migrations
pub async fn init_database() -> Result<DbPool, Box<dyn std::error::Error + Send + Sync>> {
    // Get database path
    let db_path = get_db_path();

    // Ensure parent directory exists
    if let Some(parent) = db_path.parent() {
        std::fs::create_dir_all(parent)?;
    }

    let database_url = format!("sqlite:{}", db_path.display());

    tracing::info!("Initializing database at: {}", database_url);

    // Create connection pool
    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await?;

    // Run migrations
    run_migrations(&pool).await?;

    tracing::info!("Database initialized successfully");

    Ok(Arc::new(pool))
}

/// Get database file path
fn get_db_path() -> PathBuf {
    // Use /data directory in container or local path
    if let Ok(data_dir) = std::env::var("DATA_DIR") {
        return PathBuf::from(data_dir).join("kairust.db");
    }

    // Try to use a data directory in common locations
    let possible_paths = vec![
        PathBuf::from("/data/kairust.db"),
        PathBuf::from("./data/kairust.db"),
        PathBuf::from("./kairust.db"),
    ];

    for path in &possible_paths {
        if let Some(parent) = path.parent() {
            if std::fs::create_dir_all(parent).is_ok() {
                return path.clone();
            }
        }
    }

    // Fallback to current directory
    PathBuf::from("kairust.db")
}

/// Run database migrations
async fn run_migrations(pool: &SqlitePool) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    // Create users table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        "#,
    )
    .execute(pool)
    .await?;

    // Create user_sessions table for tracking login sessions
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS user_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            token TEXT NOT NULL UNIQUE,
            expires_at DATETIME NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
        "#,
    )
    .execute(pool)
    .await?;

    // Create user_progress table for tracking lesson progress
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS user_progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            lesson_id TEXT NOT NULL,
            completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            time_spent_seconds INTEGER DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            UNIQUE(user_id, lesson_id)
        )
        "#,
    )
    .execute(pool)
    .await?;

    tracing::info!("Database migrations completed");

    Ok(())
}
