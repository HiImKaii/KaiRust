// =====================================================
// Database Module — SQLite with rusqlite (bundled)
// DbPool = Arc<PathBuf> → Send + Sync, safe for async Axum
// Each handler opens its own connection inside spawn_blocking
// =====================================================

use rusqlite::{params, Connection, Result as SqliteResult};
use std::path::PathBuf;
use std::sync::Arc;

// Arc<PathBuf> is Send + Sync — no RefCell involved
pub type DbPool = Arc<PathBuf>;

/// Initialize database, run migrations, return the db path wrapped in Arc
pub async fn init_database() -> Result<DbPool, Box<dyn std::error::Error + Send + Sync>> {
    let db_path = get_db_path();

    // Ensure parent directory exists
    if let Some(parent) = db_path.parent() {
        std::fs::create_dir_all(parent)?;
    }

    tracing::info!("Initializing database at: {:?}", db_path);

    // Run migrations in a blocking thread (rusqlite is synchronous)
    let path_clone = db_path.clone();
    tokio::task::spawn_blocking(move || {
        let conn = Connection::open(&path_clone)?;
        run_migrations(&conn)
    })
    .await??;

    tracing::info!("Database initialized successfully");

    Ok(Arc::new(db_path))
}

/// Get database file path
fn get_db_path() -> PathBuf {
    let db_dir = std::env::var("DATA_DIR").unwrap_or_else(|_| "data".to_string());
    PathBuf::from(db_dir).join("kairust.db")
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

    // Create user_code_saves table
    conn.execute(
        "CREATE TABLE IF NOT EXISTS user_code_saves (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            lesson_id TEXT NOT NULL,
            code TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            UNIQUE(user_id, lesson_id)
        )",
        [],
    )?;

    tracing::info!("Database migrations completed");

    Ok(())
}

/// Save or update user code for a lesson
pub fn save_user_code(conn: &Connection, user_id: i64, lesson_id: &str, code: &str) -> SqliteResult<()> {
    conn.execute(
        "INSERT INTO user_code_saves (user_id, lesson_id, code, updated_at)
         VALUES (?1, ?2, ?3, CURRENT_TIMESTAMP)
         ON CONFLICT(user_id, lesson_id) DO UPDATE SET
         code = excluded.code,
         updated_at = CURRENT_TIMESTAMP",
        [user_id.to_string(), lesson_id.to_string(), code.to_string()],
    )?;
    Ok(())
}

/// Get saved code for a user and lesson
pub fn get_user_code(conn: &Connection, user_id: i64, lesson_id: &str) -> SqliteResult<Option<String>> {
    let mut stmt = conn.prepare(
        "SELECT code FROM user_code_saves WHERE user_id = ?1 AND lesson_id = ?2"
    )?;

    let mut rows = stmt.query(params![user_id, lesson_id])?;

    if let Some(row) = rows.next()? {
        let code: String = row.get(0)?;
        Ok(Some(code))
    } else {
        Ok(None)
    }
}

// =====================================================
// Admin User Management
// =====================================================

#[derive(Debug, serde::Serialize)]
pub struct UserRow {
    pub id: i64,
    pub username: String,
    pub email: String,
    pub password_hash: String,
    pub created_at: String,
    pub completed_lessons: i64,
    pub total_time_spent: i64,
}

/// Get all users with progress stats
pub fn get_all_users(conn: &Connection, search: Option<&str>, limit: i64, offset: i64) -> SqliteResult<Vec<UserRow>> {
    let search_pattern = search.map(|s| format!("%{}%", s));

    let users: Vec<UserRow> = if let Some(ref sp) = search_pattern {
        let mut stmt = conn.prepare(
            "SELECT u.id, u.username, u.email, u.password_hash, u.created_at,
                    COALESCE(COUNT(DISTINCT up.lesson_id), 0) as completed_lessons,
                    COALESCE(SUM(up.time_spent_seconds), 0) as total_time_spent
             FROM users u
             LEFT JOIN user_progress up ON u.id = up.user_id
             WHERE u.username LIKE ?1 OR u.email LIKE ?1
             GROUP BY u.id, u.username, u.email, u.password_hash, u.created_at
             ORDER BY u.created_at DESC LIMIT ?2 OFFSET ?3"
        )?;
        let rows = stmt.query_map(params![sp, limit, offset], |row| {
            Ok(UserRow {
                id: row.get(0)?,
                username: row.get(1)?,
                email: row.get(2)?,
                password_hash: row.get(3)?,
                created_at: row.get(4)?,
                completed_lessons: row.get(5)?,
                total_time_spent: row.get(6)?,
            })
        })?;
        rows.filter_map(|r| r.ok()).collect()
    } else {
        let mut stmt = conn.prepare(
            "SELECT u.id, u.username, u.email, u.password_hash, u.created_at,
                    COALESCE(COUNT(DISTINCT up.lesson_id), 0) as completed_lessons,
                    COALESCE(SUM(up.time_spent_seconds), 0) as total_time_spent
             FROM users u
             LEFT JOIN user_progress up ON u.id = up.user_id
             GROUP BY u.id, u.username, u.email, u.password_hash, u.created_at
             ORDER BY u.created_at DESC LIMIT ?1 OFFSET ?2"
        )?;
        let rows = stmt.query_map(params![limit, offset], |row| {
            Ok(UserRow {
                id: row.get(0)?,
                username: row.get(1)?,
                email: row.get(2)?,
                password_hash: row.get(3)?,
                created_at: row.get(4)?,
                completed_lessons: row.get(5)?,
                total_time_spent: row.get(6)?,
            })
        })?;
        rows.filter_map(|r| r.ok()).collect()
    };

    Ok(users)
}

/// Get total user count
pub fn get_user_count(conn: &Connection, search: Option<&str>) -> SqliteResult<i64> {
    let query = if search.is_some() {
        "SELECT COUNT(*) FROM users WHERE username LIKE ?1 OR email LIKE ?1"
    } else {
        "SELECT COUNT(*) FROM users"
    };

    let mut stmt = conn.prepare(query)?;

    if let Some(s) = search {
        let search_pattern = format!("%{}%", s);
        stmt.query_row(params![search_pattern], |row| row.get(0))
    } else {
        stmt.query_row([], |row| row.get(0))
    }
}

/// Get a single user by ID
pub fn get_user_by_id(conn: &Connection, user_id: i64) -> SqliteResult<Option<UserRow>> {
    let mut stmt = conn.prepare(
        "SELECT u.id, u.username, u.email, u.password_hash, u.created_at,
                COALESCE(COUNT(DISTINCT up.lesson_id), 0) as completed_lessons,
                COALESCE(SUM(up.time_spent_seconds), 0) as total_time_spent
         FROM users u
         LEFT JOIN user_progress up ON u.id = up.user_id
         WHERE u.id = ?1
         GROUP BY u.id, u.username, u.email, u.password_hash, u.created_at"
    )?;

    let mut rows = stmt.query(params![user_id])?;

    if let Some(row) = rows.next()? {
        Ok(Some(UserRow {
            id: row.get(0)?,
            username: row.get(1)?,
            email: row.get(2)?,
            password_hash: row.get(3)?,
            created_at: row.get(4)?,
            completed_lessons: row.get(5)?,
            total_time_spent: row.get(6)?,
        }))
    } else {
        Ok(None)
    }
}

/// Delete a user
pub fn delete_user(conn: &Connection, user_id: i64) -> SqliteResult<()> {
    conn.execute("DELETE FROM user_code_saves WHERE user_id = ?1", params![user_id])?;
    conn.execute("DELETE FROM user_progress WHERE user_id = ?1", params![user_id])?;
    conn.execute("DELETE FROM user_sessions WHERE user_id = ?1", params![user_id])?;
    conn.execute("DELETE FROM users WHERE id = ?1", params![user_id])?;
    Ok(())
}

/// Get user progress details
#[derive(Debug, serde::Serialize)]
pub struct UserProgressRow {
    pub lesson_id: String,
    pub completed_at: String,
    pub time_spent_seconds: i64,
}

pub fn get_user_progress(conn: &Connection, user_id: i64) -> SqliteResult<Vec<UserProgressRow>> {
    let mut stmt = conn.prepare(
        "SELECT lesson_id, completed_at, time_spent_seconds FROM user_progress WHERE user_id = ?1 ORDER BY completed_at DESC"
    )?;

    let rows = stmt.query_map(params![user_id], |row| {
        Ok(UserProgressRow {
            lesson_id: row.get(0)?,
            completed_at: row.get(1)?,
            time_spent_seconds: row.get(2)?,
        })
    })?;

    rows.collect()
}

/// Save or update user progress for a lesson
pub fn save_user_progress(
    conn: &Connection,
    user_id: i64,
    lesson_id: &str,
    time_spent_seconds: i64,
) -> SqliteResult<()> {
    conn.execute(
        "INSERT INTO user_progress (user_id, lesson_id, time_spent_seconds, completed_at)
         VALUES (?1, ?2, ?3, CURRENT_TIMESTAMP)
         ON CONFLICT(user_id, lesson_id) DO UPDATE SET
         time_spent_seconds = time_spent_seconds + excluded.time_spent_seconds,
         completed_at = CURRENT_TIMESTAMP",
        params![user_id, lesson_id, time_spent_seconds],
    )?;
    Ok(())
}
