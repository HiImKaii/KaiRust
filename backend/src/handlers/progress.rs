// =====================================================
// Progress Handler — User learning progress tracking
// =====================================================

use crate::db::{self, DbPool };
use crate::auth::get_user_id_from_token;
use axum::{
    extract::State,
    http::StatusCode,
    response::Json,
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct SaveProgressRequest {
    pub token: String,
    pub lesson_id: String,
    pub time_spent_seconds: i64,
}

#[derive(Debug, Serialize)]
pub struct SaveProgressResponse {
    pub success: bool,
    pub message: String,
}

/// Save user progress for a lesson
pub async fn save_progress(
    State(db): State<DbPool>,
    Json(payload): Json<SaveProgressRequest>,
) -> Result<Json<SaveProgressResponse>, (StatusCode, String)> {
    tracing::info!("[PROGRESS] Saving progress - lesson_id: {}, time_spent: {}s", payload.lesson_id, payload.time_spent_seconds);

    // Get user_id from token
    let user_id = get_user_id_from_token(&db, &payload.token)
        .await
        .map_err(|e| {
            tracing::error!("[PROGRESS] Token validation error: {}", e);
            (StatusCode::UNAUTHORIZED, e.to_string())
        })?;

    tracing::info!("[PROGRESS] User ID: {}", user_id);

    let db_clone = (*db).clone();
    let lesson_id = payload.lesson_id.clone();
    let time_spent = payload.time_spent_seconds;

    tokio::task::spawn_blocking(move || {
        tracing::info!("[PROGRESS] Opening database connection...");
        let conn = rusqlite::Connection::open(&db_clone)?;
        tracing::info!("[PROGRESS] Calling save_user_progress for user_id={}, lesson_id={}", user_id, lesson_id);
        db::save_user_progress(&conn, user_id, &lesson_id, time_spent)?;
        tracing::info!("[PROGRESS] Progress saved successfully!");

        // Update streak
        let _streak = db::update_user_streak(&conn, user_id);

        // Check and award achievements
        let new_achievements = db::check_and_award_achievements(&conn, user_id)?;
        if !new_achievements.is_empty() {
            tracing::info!("[ACHIEVEMENTS] User {} earned {} new achievements: {:?}", user_id, new_achievements.len(), new_achievements);
        }

        Ok::<(), rusqlite::Error>(())
    })
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(SaveProgressResponse {
        success: true,
        message: "Progress saved successfully".to_string(),
    }))
}
