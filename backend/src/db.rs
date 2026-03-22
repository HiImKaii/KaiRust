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
            password TEXT NOT NULL DEFAULT '',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )",
        [],
    )?;

    // Add password column if not exists (for existing databases)
    conn.execute("ALTER TABLE users ADD COLUMN password TEXT NOT NULL DEFAULT ''", []).ok();

    // Add profile columns if not exist (for existing databases)
    conn.execute("ALTER TABLE users ADD COLUMN full_name TEXT NOT NULL DEFAULT ''", []).ok();
    conn.execute("ALTER TABLE users ADD COLUMN bio TEXT NOT NULL DEFAULT ''", []).ok();
    conn.execute("ALTER TABLE users ADD COLUMN avatar_url TEXT NOT NULL DEFAULT ''", []).ok();
    conn.execute("ALTER TABLE users ADD COLUMN location TEXT NOT NULL DEFAULT ''", []).ok();
    conn.execute("ALTER TABLE users ADD COLUMN github_username TEXT NOT NULL DEFAULT ''", []).ok();
    conn.execute("ALTER TABLE users ADD COLUMN website TEXT NOT NULL DEFAULT ''", []).ok();
    conn.execute("ALTER TABLE users ADD COLUMN company_school TEXT NOT NULL DEFAULT ''", []).ok();

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

    // =====================================================
    // Achievements System Tables
    // =====================================================

    // Achievements definition table
    conn.execute(
        "CREATE TABLE IF NOT EXISTS achievements (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            name_vi TEXT NOT NULL,
            description TEXT NOT NULL,
            description_vi TEXT NOT NULL,
            category TEXT NOT NULL,
            icon TEXT NOT NULL,
            requirement_type TEXT NOT NULL,
            requirement_value INTEGER NOT NULL,
            rarity TEXT NOT NULL DEFAULT 'common',
            points INTEGER NOT NULL DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )",
        [],
    )?;

    // User achievements table
    conn.execute(
        "CREATE TABLE IF NOT EXISTS user_achievements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            achievement_id TEXT NOT NULL,
            earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (achievement_id) REFERENCES achievements(id),
            UNIQUE(user_id, achievement_id)
        )",
        [],
    )?;

    // User streaks table
    conn.execute(
        "CREATE TABLE IF NOT EXISTS user_streaks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL UNIQUE,
            current_streak INTEGER NOT NULL DEFAULT 0,
            longest_streak INTEGER NOT NULL DEFAULT 0,
            last_activity_date DATE,
            total_active_days INTEGER NOT NULL DEFAULT 0,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )",
        [],
    )?;

    // Seed default achievements
    seed_achievements(conn)?;

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
    pub password: String,
    pub created_at: String,
    pub completed_lessons: i64,
    pub total_time_spent: i64,
}

/// Get all users with progress stats
pub fn get_all_users(conn: &Connection, search: Option<&str>, limit: i64, offset: i64) -> SqliteResult<Vec<UserRow>> {
    let search_pattern = search.map(|s| format!("%{}%", s));

    let users: Vec<UserRow> = if let Some(ref sp) = search_pattern {
        let mut stmt = conn.prepare(
            "SELECT u.id, u.username, u.email, u.password_hash, u.password, u.created_at,
                    COALESCE(COUNT(DISTINCT up.lesson_id), 0) as completed_lessons,
                    COALESCE(SUM(up.time_spent_seconds), 0) as total_time_spent
             FROM users u
             LEFT JOIN user_progress up ON u.id = up.user_id
             WHERE u.username LIKE ?1 OR u.email LIKE ?1
             GROUP BY u.id, u.username, u.email, u.password_hash, u.password, u.created_at
             ORDER BY u.created_at DESC LIMIT ?2 OFFSET ?3"
        )?;
        let rows = stmt.query_map(params![sp, limit, offset], |row| {
            Ok(UserRow {
                id: row.get(0)?,
                username: row.get(1)?,
                email: row.get(2)?,
                password_hash: row.get(3)?,
                password: row.get(4)?,
                created_at: row.get(5)?,
                completed_lessons: row.get(6)?,
                total_time_spent: row.get(7)?,
            })
        })?;
        rows.filter_map(|r| r.ok()).collect()
    } else {
        let mut stmt = conn.prepare(
            "SELECT u.id, u.username, u.email, u.password_hash, u.password, u.created_at,
                    COALESCE(COUNT(DISTINCT up.lesson_id), 0) as completed_lessons,
                    COALESCE(SUM(up.time_spent_seconds), 0) as total_time_spent
             FROM users u
             LEFT JOIN user_progress up ON u.id = up.user_id
             GROUP BY u.id, u.username, u.email, u.password_hash, u.password, u.created_at
             ORDER BY u.created_at DESC LIMIT ?1 OFFSET ?2"
        )?;
        let rows = stmt.query_map(params![limit, offset], |row| {
            Ok(UserRow {
                id: row.get(0)?,
                username: row.get(1)?,
                email: row.get(2)?,
                password_hash: row.get(3)?,
                password: row.get(4)?,
                created_at: row.get(5)?,
                completed_lessons: row.get(6)?,
                total_time_spent: row.get(7)?,
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
        "SELECT u.id, u.username, u.email, u.password_hash, u.password, u.created_at,
                COALESCE(COUNT(DISTINCT up.lesson_id), 0) as completed_lessons,
                COALESCE(SUM(up.time_spent_seconds), 0) as total_time_spent
         FROM users u
         LEFT JOIN user_progress up ON u.id = up.user_id
         WHERE u.id = ?1
         GROUP BY u.id, u.username, u.email, u.password_hash, u.password, u.created_at"
    )?;

    let mut rows = stmt.query(params![user_id])?;

    if let Some(row) = rows.next()? {
        Ok(Some(UserRow {
            id: row.get(0)?,
            username: row.get(1)?,
            email: row.get(2)?,
            password_hash: row.get(3)?,
            password: row.get(4)?,
            created_at: row.get(5)?,
            completed_lessons: row.get(6)?,
            total_time_spent: row.get(7)?,
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
    tracing::info!("[DB] save_user_progress called: user_id={}, lesson_id={}, time={}", user_id, lesson_id, time_spent_seconds);

    let result = conn.execute(
        "INSERT INTO user_progress (user_id, lesson_id, time_spent_seconds, completed_at)
         VALUES (?1, ?2, ?3, CURRENT_TIMESTAMP)
         ON CONFLICT(user_id, lesson_id) DO UPDATE SET
         time_spent_seconds = time_spent_seconds + excluded.time_spent_seconds,
         completed_at = CURRENT_TIMESTAMP",
        params![user_id, lesson_id, time_spent_seconds],
    );

    match result {
        Ok(rows) => tracing::info!("[DB] save_user_progress success: {} rows affected", rows),
        Err(e) => tracing::error!("[DB] save_user_progress error: {}", e),
    }

    Ok(())
}

// =====================================================
// Achievements System
// =====================================================

/// Achievement definition
#[derive(Debug, serde::Serialize, Clone)]
pub struct Achievement {
    pub id: String,
    pub name: String,
    pub name_vi: String,
    pub description: String,
    pub description_vi: String,
    pub category: String,
    pub icon: String,
    pub requirement_type: String,
    pub requirement_value: i64,
    pub rarity: String,
    pub points: i64,
}

/// User achievement with earned info
#[derive(Debug, serde::Serialize)]
pub struct UserAchievement {
    pub achievement: Achievement,
    pub earned_at: String,
}

/// User streak info
#[derive(Debug, serde::Serialize)]
pub struct UserStreak {
    pub user_id: i64,
    pub current_streak: i64,
    pub longest_streak: i64,
    pub last_activity_date: Option<String>,
    pub total_active_days: i64,
}

/// User rank info
#[derive(Debug, serde::Serialize)]
pub struct UserRank {
    pub rank: String,
    pub rank_name: String,
    pub rank_name_vi: String,
    pub rank_icon: String,
    pub total_points: i64,
    pub next_rank: Option<String>,
    pub next_rank_name: Option<String>,
    pub next_rank_points: Option<i64>,
    pub progress_percent: i64,
}

/// Seed default achievements
fn seed_achievements(conn: &Connection) -> SqliteResult<()> {
    let achievements = vec![
        // Problem Solving - Solved count
        ("first_solve", "First Steps", "Bước Đầu", "Complete your first challenge", "Hoàn thành bài tập đầu tiên", "problem", "school", "solved", 1, "bronze", 10),
        ("solved_5", "Apprentice", "Người Học", "Complete 5 challenges", "Hoàn thành 5 bài tập", "problem", "trending_up", "solved", 5, "bronze", 25),
        ("solved_10", "Student", "Học Sinh", "Complete 10 challenges", "Hoàn thành 10 bài tập", "problem", "auto_stories", "solved", 10, "bronze", 50),
        ("solved_25", "Intermediate", "Trung Cấp", "Complete 25 challenges", "Hoàn thành 25 bài tập", "problem", "psychology", "solved", 25, "silver", 100),
        ("solved_50", "Advanced", "Nâng Cao", "Complete 50 challenges", "Hoàn thành 50 bài tập", "problem", "workspace_premium", "solved", 50, "silver", 200),
        ("solved_100", "Rustacean", "Rustacean", "Complete 100 challenges", "Hoàn thành 100 bài tập", "problem", "military_tech", "solved", 100, "gold", 400),
        ("solved_200", "Expert", "Chuyên Gia", "Complete 200 challenges", "Hoàn thành 200 bài tập", "problem", "emoji_events", "solved", 200, "gold", 800),
        ("solved_500", "Master", "Bậc Thầy", "Complete 500 challenges", "Hoàn thành 500 bài tập", "problem", "diamond", "solved", 500, "platinum", 2000),

        // Streak - Daily activity
        ("streak_3", "Getting Started", "Khởi Đầu", "3 days streak", "3 ngày liên tiếp", "streak", "local_fire_department", "streak", 3, "bronze", 15),
        ("streak_7", "Week Warrior", "Chiến Binh", "7 days streak", "7 ngày liên tiếp", "streak", "whatshot", "streak", 7, "bronze", 35),
        ("streak_14", "Fortnight Fighter", "Chiến Binh 2 Tuần", "14 days streak", "14 ngày liên tiếp", "streak", "bolt", "streak", 14, "silver", 70),
        ("streak_30", "Monthly Master", "Tháng Thiên Tài", "30 days streak", "30 ngày liên tiếp", "streak", "flash_on", "streak", 30, "gold", 150),
        ("streak_60", "Dedicated", "Tận Tâm", "60 days streak", "60 ngày liên tiếp", "streak", "sentiment_very_satisfied", "streak", 60, "gold", 300),
        ("streak_100", "Unstoppable", "Bất Khả Chiến Bại", "100 days streak", "100 ngày liên tiếp", "streak", "star", "streak", 100, "platinum", 600),

        // Time Spent
        ("time_1h", "Time Keeper", "Người Quản Lý Thời Gian", "Spend 1 hour learning", "Học 1 giờ", "time", "schedule", "time_spent", 3600, "bronze", 10),
        ("time_5h", "Time Enthusiast", "Người Yêu Thời Gian", "Spend 5 hours learning", "Học 5 giờ", "time", "hourglass_top", "time_spent", 18000, "bronze", 30),
        ("time_10h", "Time Devotee", "Người Tận Tụy", "Spend 10 hours learning", "Học 10 giờ", "time", "history", "time_spent", 36000, "silver", 60),
        ("time_50h", "Time Champion", "Vô Địch Thời Gian", "Spend 50 hours learning", "Học 50 giờ", "time", "timer", "time_spent", 180000, "silver", 200),
        ("time_100h", "Time Legend", "Huyền Thoại", "Spend 100 hours learning", "Học 100 giờ", "time", "hourglass_bottom", "time_spent", 360000, "gold", 400),

        // Chapter Completion
        ("chapter_1", "Chapter 1 Complete", "Hoàn Thành Chương 1", "Complete all lessons in Chapter 1", "Hoàn thành tất cả bài trong Chương 1", "chapter", "looks_one", "chapter", 1, "bronze", 20),
        ("chapter_3", "Chapter 3 Complete", "Hoàn Thành Chương 3", "Complete all lessons in Chapter 3", "Hoàn thành tất cả bài trong Chương 3", "chapter", "looks_3", "chapter", 3, "bronze", 20),
        ("chapter_5", "Chapter 5 Complete", "Hoàn Thành Chương 5", "Complete all lessons in Chapter 5", "Hoàn thành tất cả bài trong Chương 5", "chapter", "looks_5", "chapter", 5, "silver", 40),
        ("chapter_10", "Chapter 10 Complete", "Hoàn Thành Chương 10", "Complete all lessons in Chapter 10", "Hoàn thành tất cả bài trong Chương 10", "chapter", "looks_one", "chapter", 10, "silver", 80),
        ("chapter_15", "Chapter 15 Complete", "Hoàn Thành Chương 15", "Complete all lessons in Chapter 15", "Hoàn thành tất cả bài trong Chương 15", "chapter", "looks_6", "chapter", 15, "gold", 150),
        ("chapter_all", "Complete Course", "Hoàn Thành Khóa Học", "Complete all chapters", "Hoàn thành tất cả các chương", "chapter", "school", "chapter", 23, "platinum", 500),

        // Special Achievements
        ("perfect_first", "Perfect Start", "Khởi Đầu Hoàn Hảo", "Get perfect score on first try", "Đạt điểm tuyệt đối lần đầu", "special", "verified", "perfect", 1, "gold", 50),
        ("speed_demon", "Speed Demon", "Thiên Tố", "Complete a challenge in under 2 minutes", "Hoàn thành bài trong 2 phút", "special", "speed", "speed", 120, "silver", 40),
        ("no_hint", "Independent", "Độc Lập", "Complete 10 challenges without hints", "Hoàn thành 10 bài không xem gợi ý", "special", "lightbulb", "no_hint", 10, "silver", 60),
        ("night_owl", "Night Owl", "Cú Đêm", "Study at night (after 10 PM)", "Học vào ban đêm (sau 10h)", "special", "dark_mode", "night", 1, "bronze", 15),
        ("early_bird", "Early Bird", "Chim Sớm", "Study in the morning (before 7 AM)", "Học vào sáng sớm (trước 7h)", "special", "wb_sunny", "morning", 1, "bronze", 15),
    ];

    for (id, name, name_vi, desc, desc_vi, category, icon, req_type, req_val, rarity, points) in achievements {
        conn.execute(
            "INSERT OR IGNORE INTO achievements (id, name, name_vi, description, description_vi, category, icon, requirement_type, requirement_value, rarity, points)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)",
            params![id, name, name_vi, desc, desc_vi, category, icon, req_type, req_val, rarity, points],
        )?;
    }

    Ok(())
}

/// Get all achievements
pub fn get_all_achievements(conn: &Connection) -> SqliteResult<Vec<Achievement>> {
    let mut stmt = conn.prepare(
        "SELECT id, name, name_vi, description, description_vi, category, icon, requirement_type, requirement_value, rarity, points
         FROM achievements ORDER BY category, points"
    )?;

    let rows = stmt.query_map([], |row| {
        Ok(Achievement {
            id: row.get(0)?,
            name: row.get(1)?,
            name_vi: row.get(2)?,
            description: row.get(3)?,
            description_vi: row.get(4)?,
            category: row.get(5)?,
            icon: row.get(6)?,
            requirement_type: row.get(7)?,
            requirement_value: row.get(8)?,
            rarity: row.get(9)?,
            points: row.get(10)?,
        })
    })?;

    rows.collect()
}

/// Get user achievements with earned status
pub fn get_user_achievements(conn: &Connection, user_id: i64) -> SqliteResult<Vec<UserAchievement>> {
    let mut stmt = conn.prepare(
        "SELECT a.id, a.name, a.name_vi, a.description, a.description_vi, a.category, a.icon,
                a.requirement_type, a.requirement_value, a.rarity, a.points, ua.earned_at
         FROM achievements a
         LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = ?1
         ORDER BY a.category, a.points"
    )?;

    let rows = stmt.query_map(params![user_id], |row| {
        let earned_at: Option<String> = row.get(11)?;
        if earned_at.is_some() {
            Ok(Some(UserAchievement {
                achievement: Achievement {
                    id: row.get(0)?,
                    name: row.get(1)?,
                    name_vi: row.get(2)?,
                    description: row.get(3)?,
                    description_vi: row.get(4)?,
                    category: row.get(5)?,
                    icon: row.get(6)?,
                    requirement_type: row.get(7)?,
                    requirement_value: row.get(8)?,
                    rarity: row.get(9)?,
                    points: row.get(10)?,
                },
                earned_at: earned_at.unwrap(),
            }))
        } else {
            Ok(None)
        }
    })?;

    Ok(rows.filter_map(|r| r.ok().flatten()).collect())
}

/// Check and award achievements for a user
pub fn check_and_award_achievements(conn: &Connection, user_id: i64) -> SqliteResult<Vec<String>> {
    let mut awarded = Vec::new();

    // Get user stats
    let solved_count: i64 = conn.query_row(
        "SELECT COUNT(*) FROM user_progress WHERE user_id = ?1",
        params![user_id],
        |row| row.get(0),
    ).unwrap_or(0);

    let total_time: i64 = conn.query_row(
        "SELECT COALESCE(SUM(time_spent_seconds), 0) FROM user_progress WHERE user_id = ?1",
        params![user_id],
        |row| row.get(0),
    ).unwrap_or(0);

    // Check problem solving achievements
    let problem_achievements = vec![
        ("first_solve", 1),
        ("solved_5", 5),
        ("solved_10", 10),
        ("solved_25", 25),
        ("solved_50", 50),
        ("solved_100", 100),
        ("solved_200", 200),
        ("solved_500", 500),
    ];

    for (achievement_id, required) in problem_achievements {
        if solved_count >= required {
            if let Ok(_) = conn.execute(
                "INSERT OR IGNORE INTO user_achievements (user_id, achievement_id) VALUES (?1, ?2)",
                params![user_id, achievement_id],
            ) {
                awarded.push(achievement_id.to_string());
            }
        }
    }

    // Check time spent achievements
    let time_achievements = vec![
        ("time_1h", 3600),
        ("time_5h", 18000),
        ("time_10h", 36000),
        ("time_50h", 180000),
        ("time_100h", 360000),
    ];

    for (achievement_id, required) in time_achievements {
        if total_time >= required {
            if let Ok(_) = conn.execute(
                "INSERT OR IGNORE INTO user_achievements (user_id, achievement_id) VALUES (?1, ?2)",
                params![user_id, achievement_id],
            ) {
                awarded.push(achievement_id.to_string());
            }
        }
    }

    // Check streak achievements
    let streak = get_user_streak(conn, user_id).unwrap_or(UserStreak {
        user_id,
        current_streak: 0,
        longest_streak: 0,
        last_activity_date: None,
        total_active_days: 0,
    });

    let streak_achievements = vec![
        ("streak_3", 3),
        ("streak_7", 7),
        ("streak_14", 14),
        ("streak_30", 30),
        ("streak_60", 60),
        ("streak_100", 100),
    ];

    for (achievement_id, required) in streak_achievements {
        if streak.current_streak >= required {
            if let Ok(_) = conn.execute(
                "INSERT OR IGNORE INTO user_achievements (user_id, achievement_id) VALUES (?1, ?2)",
                params![user_id, achievement_id],
            ) {
                awarded.push(achievement_id.to_string());
            }
        }
    }

    // Check chapter completion achievements
    // Count unique chapters completed (lesson_id format: "ch01_03" → extract "ch01")
    let chapters_completed: i64 = conn.query_row(
        "SELECT COUNT(DISTINCT substr(lesson_id, 1, instr(lesson_id || '_', '_') - 1))
         FROM user_progress WHERE user_id = ?1",
        params![user_id],
        |row| row.get(0),
    ).unwrap_or(0);

    let chapter_achievements = vec![
        ("chapter_1", 1),
        ("chapter_3", 3),
        ("chapter_5", 5),
        ("chapter_10", 10),
        ("chapter_15", 15),
        ("chapter_all", 20), // ch01–ch20 have exercises in backend
    ];

    for (achievement_id, required) in chapter_achievements {
        if chapters_completed >= required {
            if let Ok(_) = conn.execute(
                "INSERT OR IGNORE INTO user_achievements (user_id, achievement_id) VALUES (?1, ?2)",
                params![user_id, achievement_id],
            ) {
                awarded.push(achievement_id.to_string());
            }
        }
    }

    // Check special achievements
    // Note: perfect_first, speed_demon, no_hint, night_owl, early_bird
    // require tracking additional state not stored in current DB schema.
    // These are checked here as placeholders; implement additional tracking
    // (e.g., perfect_score column in user_progress, hint_usage table) as needed.

    tracing::info!("[ACHIEVEMENTS] Awarded {} new achievements to user {}", awarded.len(), user_id);
    Ok(awarded)
}

/// Get user streak info
pub fn get_user_streak(conn: &Connection, user_id: i64) -> SqliteResult<UserStreak> {
    conn.query_row(
        "SELECT user_id, current_streak, longest_streak, last_activity_date, total_active_days FROM user_streaks WHERE user_id = ?1",
        params![user_id],
        |row| Ok(UserStreak {
            user_id: row.get(0)?,
            current_streak: row.get(1)?,
            longest_streak: row.get(2)?,
            last_activity_date: row.get(3)?,
            total_active_days: row.get(4)?,
        }),
    ).or_else(|_| {
        // Create default streak if not exists
        conn.execute(
            "INSERT INTO user_streaks (user_id, current_streak, longest_streak, total_active_days) VALUES (?1, 0, 0, 0)",
            params![user_id],
        )?;
        Ok(UserStreak {
            user_id,
            current_streak: 0,
            longest_streak: 0,
            last_activity_date: None,
            total_active_days: 0,
        })
    })
}

/// Update user streak after activity
pub fn update_user_streak(conn: &Connection, user_id: i64) -> SqliteResult<UserStreak> {
    let today = chrono::Local::now().format("%Y-%m-%d").to_string();

    conn.execute(
        "INSERT INTO user_streaks (user_id, current_streak, longest_streak, last_activity_date, total_active_days)
         VALUES (?1, 1, 1, ?2, 1)
         ON CONFLICT(user_id) DO UPDATE SET
         current_streak = CASE
             WHEN last_activity_date = date('now', '-1 day') THEN current_streak + 1
             WHEN last_activity_date = date('now') THEN current_streak
             ELSE 1
         END,
         longest_streak = MAX(longest_streak, CASE
             WHEN last_activity_date = date('now', '-1 day') THEN current_streak + 1
             WHEN last_activity_date = date('now') THEN current_streak
             ELSE 1
         END),
         last_activity_date = ?2,
         total_active_days = total_active_days + CASE WHEN last_activity_date != ?2 THEN 1 ELSE 0 END,
         updated_at = CURRENT_TIMESTAMP",
        params![user_id, &today],
    )?;

    get_user_streak(conn, user_id)
}

/// Calculate user rank based on points
pub fn calculate_user_rank(conn: &Connection, user_id: i64) -> SqliteResult<UserRank> {
    // Calculate total points from achievements
    let achievement_points: i64 = conn.query_row(
        "SELECT COALESCE(SUM(a.points), 0) FROM user_achievements ua
         JOIN achievements a ON ua.achievement_id = a.id
         WHERE ua.user_id = ?1",
        params![user_id],
        |row| row.get(0),
    ).unwrap_or(0);

    // Also add points from completed lessons (1 point per lesson)
    let lessons_points: i64 = conn.query_row(
        "SELECT COUNT(*) FROM user_progress WHERE user_id = ?1",
        params![user_id],
        |row| row.get(0),
    ).unwrap_or(0);

    let total_points = achievement_points + lessons_points;

    // Define rank thresholds: (id, name_en, name_vi, icon, min_points)
    let ranks = vec![
        ("newcomer", "Newcomer", "Người Mới", "badge", 0),
        ("beginner", "Beginner", "Người Bắt Đầu", "star_border", 50),
        ("intermediate", "Intermediate", "Trung Cấp", "star_half", 200),
        ("advanced", "Advanced", "Nâng Cao", "star", 500),
        ("expert", "Expert", "Chuyên Gia", "stars", 1000),
        ("master", "Master", "Bậc Thầy", "emoji_events", 2000),
    ];

    let mut current_rank = ranks[0].clone();
    let mut next_rank = None;

    for (i, rank) in ranks.iter().enumerate() {
        if total_points >= rank.4 as i64 {
            current_rank = rank.clone();
            if i + 1 < ranks.len() {
                next_rank = Some(ranks[i + 1].clone());
            }
        }
    }

    let progress_percent = match &next_rank {
        Some(next) => {
            let prev_threshold = current_rank.4 as i64;
            let next_threshold = next.4 as i64;
            let progress = ((total_points - prev_threshold) as f64 / (next_threshold - prev_threshold) as f64 * 100.0) as i64;
            progress.min(100).max(0)
        }
        None => 100,
    };

    Ok(UserRank {
        rank: current_rank.0.to_string(),
        rank_name: current_rank.1.to_string(),
        rank_name_vi: current_rank.2.to_string(),
        rank_icon: current_rank.3.to_string(),
        total_points,
        next_rank: next_rank.as_ref().map(|r| r.0.to_string()),
        next_rank_name: next_rank.as_ref().map(|r| r.1.to_string()),
        next_rank_points: next_rank.as_ref().map(|r| r.4 as i64),
        progress_percent,
    })
}

/// Get achievement stats for user (for frontend display)
#[derive(Debug, serde::Serialize)]
pub struct AchievementStats {
    pub total_achievements: i64,
    pub earned_achievements: i64,
    pub total_points: i64,
    pub rank: UserRank,
    pub streak: UserStreak,
}

pub fn get_achievement_stats(conn: &Connection, user_id: i64) -> SqliteResult<AchievementStats> {
    let total_achievements: i64 = conn.query_row(
        "SELECT COUNT(*) FROM achievements",
        [],
        |row| row.get(0),
    )?;

    let earned_achievements: i64 = conn.query_row(
        "SELECT COUNT(*) FROM user_achievements WHERE user_id = ?1",
        params![user_id],
        |row| row.get(0),
    )?;

    let achievement_points: i64 = conn.query_row(
        "SELECT COALESCE(SUM(a.points), 0) FROM user_achievements ua
         JOIN achievements a ON ua.achievement_id = a.id
         WHERE ua.user_id = ?1",
        params![user_id],
        |row| row.get(0),
    )?;

    let lessons_points: i64 = conn.query_row(
        "SELECT COUNT(*) FROM user_progress WHERE user_id = ?1",
        params![user_id],
        |row| row.get(0),
    ).unwrap_or(0);

    let total_points = achievement_points + lessons_points;

    let rank = calculate_user_rank(conn, user_id)?;
    let streak = get_user_streak(conn, user_id)?;

    Ok(AchievementStats {
        total_achievements,
        earned_achievements,
        total_points,
        rank,
        streak,
    })
}
