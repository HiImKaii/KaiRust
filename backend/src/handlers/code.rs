// =====================================================
// Code Save/Load Handler
// =====================================================

use crate::db::{self, DbPool};
use crate::models::{GetCodeResponse, SaveCodeRequest, SaveCodeResponse};
use crate::auth::get_user_id_from_token;
use axum::{
    extract::{Path, State},
    response::Json,
};

/// Save user code for a lesson
pub async fn save_code(
    State(db): State<DbPool>,
    Json(payload): Json<SaveCodeRequest>,
) -> Result<Json<SaveCodeResponse>, (axum::http::StatusCode, String)> {
    // Get user_id from token header
    let user_id = get_user_id_from_token(&db, &payload.token)
        .await
        .map_err(|e| (axum::http::StatusCode::UNAUTHORIZED, e.to_string()))?;

    // Limit code size to 50KB
    let code = if payload.code.len() > 50 * 1024 {
        payload.code[..50 * 1024].to_string()
    } else {
        payload.code
    };

    let db_clone = (*db).clone();
    let lesson_id = payload.lesson_id.clone();
    let code_clone = code.clone();

    tokio::task::spawn_blocking(move || {
        let conn = rusqlite::Connection::open(&db_clone)?;
        db::save_user_code(&conn, user_id, &lesson_id, &code_clone)?;
        Ok::<(), rusqlite::Error>(())
    })
    .await
    .map_err(|e| (axum::http::StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
    .map_err(|e| (axum::http::StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(SaveCodeResponse {
        success: true,
        message: "Code saved successfully".to_string(),
    }))
}

/// Get saved code for a lesson
pub async fn get_code(
    State(db): State<DbPool>,
    Path(lesson_id): Path<String>,
    axum::extract::Query(token): axum::extract::Query<std::collections::HashMap<String, String>>,
) -> Result<Json<GetCodeResponse>, (axum::http::StatusCode, String)> {
    // Get token from query parameter
    let token = token.get("token")
        .ok_or_else(|| (axum::http::StatusCode::BAD_REQUEST, "Missing token parameter".to_string()))?
        .clone();

    // Get user_id from token
    let user_id = get_user_id_from_token(&db, &token)
        .await
        .map_err(|e| (axum::http::StatusCode::UNAUTHORIZED, e.to_string()))?;

    let db_clone = (*db).clone();
    let lesson_id_clone = lesson_id.clone();

    let code = tokio::task::spawn_blocking(move || {
        let conn = rusqlite::Connection::open(&db_clone)?;
        db::get_user_code(&conn, user_id, &lesson_id_clone)
    })
    .await
    .map_err(|e| (axum::http::StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
    .map_err(|e| (axum::http::StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(GetCodeResponse {
        success: true,
        code,
        lesson_id,
    }))
}
