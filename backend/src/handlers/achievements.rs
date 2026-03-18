// =====================================================
// Achievements Handler — User achievements, badges, and ranks
// =====================================================

use crate::db::{self, DbPool, Achievement, UserAchievement, AchievementStats, UserRank, UserStreak};
use crate::auth::get_user_id_from_token;
use axum::{
    extract::State,
    extract::Query,
    http::StatusCode,
    response::Json,
};
use rusqlite::params;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct GetAchievementsRequest {
    pub token: String,
}

#[derive(Debug, Deserialize)]
pub struct TokenQuery {
    pub token: String,
}

#[derive(Debug, Serialize)]
pub struct AchievementsResponse {
    pub success: bool,
    pub achievements: Vec<AchievementWithStatus>,
    pub stats: Option<AchievementStats>,
}

#[derive(Debug, Serialize)]
pub struct AchievementWithStatus {
    pub achievement: Achievement,
    pub earned: bool,
    pub earned_at: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct RankResponse {
    pub success: bool,
    pub rank: UserRank,
}

#[derive(Debug, Serialize)]
pub struct StreakResponse {
    pub success: bool,
    pub streak: UserStreak,
}

#[derive(Debug, Serialize)]
pub struct NewAchievementsResponse {
    pub success: bool,
    pub new_achievements: Vec<Achievement>,
    pub stats: AchievementStats,
}

// =====================================================
// Routes
// =====================================================

pub fn create_achievements_router(state: DbPool) -> axum::Router {
    use axum::routing::{get, post};

    axum::Router::new()
        .route("/api/achievements", get(get_achievements))
        .route("/api/achievements/stats", get(get_achievement_stats))
        .route("/api/achievements/check", post(check_achievements))
        .route("/api/rank", get(get_user_rank))
        .route("/api/streak", get(get_user_streak))
        .with_state(state)
}

// =====================================================
// Handlers
// =====================================================

/// Get all achievements with user's earned status
pub async fn get_achievements(
    State(db): State<DbPool>,
    Query(query): Query<TokenQuery>,
) -> Result<Json<AchievementsResponse>, (StatusCode, String)> {
    let user_id = get_user_id_from_token(&db, &query.token)
        .await
        .map_err(|e| (StatusCode::UNAUTHORIZED, e.to_string()))?;

    let db_path = (*db).clone();

    let result = tokio::task::spawn_blocking(move || {
        let conn = rusqlite::Connection::open(&db_path).map_err(|e| e.to_string())?;

        // Get all achievements
        let all_achievements = db::get_all_achievements(&conn)
            .map_err(|e| e.to_string())?;

        // Get user's earned achievements
        let user_achievements = db::get_user_achievements(&conn, user_id)
            .map_err(|e| e.to_string())?;

        // Get user's stats
        let stats = db::get_achievement_stats(&conn, user_id)
            .map_err(|e| e.to_string())?;

        // Create achievement list with status
        let earned_ids: std::collections::HashSet<_> = user_achievements
            .iter()
            .map(|ua| ua.achievement.id.clone())
            .collect();

        let earned_map: std::collections::HashMap<_, _> = user_achievements
            .iter()
            .map(|ua| (ua.achievement.id.clone(), ua.earned_at.clone()))
            .collect();

        let achievements: Vec<AchievementWithStatus> = all_achievements
            .into_iter()
            .map(|a| {
                let earned = earned_ids.contains(&a.id);
                let earned_at: Option<String> = earned_map.get(&a.id).map(|v| v.clone());
                AchievementWithStatus {
                    achievement: a,
                    earned,
                    earned_at,
                }
            })
            .collect();

        Ok::<_, String>((achievements, stats))
    })
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(AchievementsResponse {
        success: true,
        achievements: result.0,
        stats: Some(result.1),
    }))
}

/// Get user achievement stats only
pub async fn get_achievement_stats(
    State(db): State<DbPool>,
    Query(query): Query<TokenQuery>,
) -> Result<Json<AchievementStats>, (StatusCode, String)> {
    let user_id = get_user_id_from_token(&db, &query.token)
        .await
        .map_err(|e| (StatusCode::UNAUTHORIZED, e.to_string()))?;

    let db_path = (*db).clone();

    let stats = tokio::task::spawn_blocking(move || {
        let conn = rusqlite::Connection::open(&db_path).map_err(|e| e.to_string())?;
        db::get_achievement_stats(&conn, user_id).map_err(|e| e.to_string())
    })
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(stats))
}

/// Check and award new achievements (called after completing a lesson)
pub async fn check_achievements(
    State(db): State<DbPool>,
    Json(payload): Json<GetAchievementsRequest>,
) -> Result<Json<NewAchievementsResponse>, (StatusCode, String)> {
    let user_id = get_user_id_from_token(&db, &payload.token)
        .await
        .map_err(|e| (StatusCode::UNAUTHORIZED, e.to_string()))?;

    let db_path = (*db).clone();

    let result = tokio::task::spawn_blocking(move || {
        let conn = rusqlite::Connection::open(&db_path).map_err(|e| e.to_string())?;

        // Update streak first
        let _streak = db::update_user_streak(&conn, user_id)
            .map_err(|e| e.to_string())?;

        // Check and award new achievements
        let new_achievement_ids = db::check_and_award_achievements(&conn, user_id)
            .map_err(|e| e.to_string())?;

        // Get achievement details for new awards
        let mut new_achievements = Vec::new();
        for id in &new_achievement_ids {
            let mut stmt = conn.prepare(
                "SELECT id, name, name_vi, description, description_vi, category, icon, requirement_type, requirement_value, rarity, points
                 FROM achievements WHERE id = ?1"
            ).map_err(|e| e.to_string())?;

            if let Ok(a) = stmt.query_row(params![id], |row| {
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
            }) {
                new_achievements.push(a);
            }
        }

        // Get updated stats
        let stats = db::get_achievement_stats(&conn, user_id)
            .map_err(|e| e.to_string())?;

        Ok::<_, String>((new_achievements, stats))
    })
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    if !result.0.is_empty() {
        tracing::info!("[ACHIEVEMENTS] User {} earned {} new achievements", user_id, result.0.len());
    }

    Ok(Json(NewAchievementsResponse {
        success: true,
        new_achievements: result.0,
        stats: result.1,
    }))
}

/// Get user rank
pub async fn get_user_rank(
    State(db): State<DbPool>,
    Query(query): Query<TokenQuery>,
) -> Result<Json<RankResponse>, (StatusCode, String)> {
    let user_id = get_user_id_from_token(&db, &query.token)
        .await
        .map_err(|e| (StatusCode::UNAUTHORIZED, e.to_string()))?;

    let db_path = (*db).clone();

    let rank = tokio::task::spawn_blocking(move || {
        let conn = rusqlite::Connection::open(&db_path).map_err(|e| e.to_string())?;
        db::calculate_user_rank(&conn, user_id).map_err(|e| e.to_string())
    })
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(RankResponse {
        success: true,
        rank,
    }))
}

/// Get user streak
pub async fn get_user_streak(
    State(db): State<DbPool>,
    Query(query): Query<TokenQuery>,
) -> Result<Json<StreakResponse>, (StatusCode, String)> {
    let user_id = get_user_id_from_token(&db, &query.token)
        .await
        .map_err(|e| (StatusCode::UNAUTHORIZED, e.to_string()))?;

    let db_path = (*db).clone();

    let streak = tokio::task::spawn_blocking(move || {
        let conn = rusqlite::Connection::open(&db_path).map_err(|e| e.to_string())?;
        db::get_user_streak(&conn, user_id).map_err(|e| e.to_string())
    })
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(StreakResponse {
        success: true,
        streak,
    }))
}
