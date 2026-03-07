// =====================================================
// Database Module — SQLite with rusqlite
// =====================================================

use rusqlite::{Connection, Result as SqliteResult};
use std::path::PathBuf;
use std::sync::Arc;
use tokio::sync::RwLock;

pub type DbPool = Arc<RwLock<Connection>>;

/// Initialize database and run migrations
pub async fn init_database() -> Result<DbPool, Box<dyn std::error::Error + Send + Sync>> {
    // Get database path
    let db_path = get_db_path();

    // Ensure parent directory exists
    if let Some(parent) = db_path.parent() {
        std::fs::create_dir_all(parent)?;
    }

    tracing::info!("Initializing database at: {:?}", db_path);

    // Open connection with rusqlite (synchronous)
    let conn = Connection::open(&db_path)?;

    // Run migrations
    run_migrations(&conn)?;

    tracing::info!("Database initialized successfully");

    Ok(Arc::new(RwLock::new(conn)))
}

/// Get database file path
fn get_db_path() -> PathBuf {
    // Get absolute path to current directory
    let current_dir = std::env::current_dir()
        .unwrap_or_else(|_| PathBuf::from("."));
    current_dir.join("data").join("kairust.db")
}

/// Run database migrations
fn run_migrations(conn: &Connection) -> SqliteResult<()> {
    // Create users table
    conn.execute(
        "CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )",
        [],
    )?;

    // Create user_sessions table
    conn.execute(
        "CREATE TABLE IF NOT EXISTS user_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            token TEXT NOT NULL UNIQUE,
            expires_at DATETIME NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )",
        [],
    )?;

    // Create user_progress table
    conn.execute(
        "CREATE TABLE IF NOT EXISTS user_progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            lesson_id TEXT NOT NULL,
            completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            time_spent_seconds INTEGER DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            UNIQUE(user_id, lesson_id)
        )",
        [],
    )?;

    tracing::info!("Database migrations completed");

    Ok(())
}
