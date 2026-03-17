// =====================================================
// Admin Handler — Server-gated admin panel with password protection
// =====================================================

use crate::db::{self, DbPool, UserProgressRow, UserRow};
use axum::{
    extract::{Path, Query, State},
    http::{header, HeaderMap, StatusCode},
    response::IntoResponse,
    Json,
};
use jsonwebtoken::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use serde_json::json;

// ===== Config =====

fn get_admin_password() -> String {
    std::env::var("ADMIN_PASSWORD").unwrap_or_else(|_| "admin123".to_string())
}

fn get_jwt_secret() -> Vec<u8> {
    std::env::var("JWT_SECRET")
        .unwrap_or_else(|_| "kairust_default_secret_key_change_in_production".to_string())
        .into_bytes()
}

fn get_admin_path() -> String {
    std::env::var("ADMIN_PATH").unwrap_or_else(|_| "admin".to_string())
}

fn get_admin_dist_dir() -> String {
    std::env::var("ADMIN_DIST_DIR")
        .unwrap_or_else(|_| "/home/quan/Desktop/KaiRust/frontend/dist-admin".to_string())
}

// ===== JWT Claims =====

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    sub: String,
    exp: usize,
}

// ===== JWT Helpers =====

fn extract_jwt_from_cookies(cookie_header: &str) -> Option<String> {
    for cookie in cookie_header.split(';') {
        let cookie = cookie.trim();
        if let Some(value) = cookie.strip_prefix("admin_token=") {
            if !value.is_empty() {
                return Some(value.to_string());
            }
        }
    }
    None
}

fn has_valid_jwt_cookie(headers: &HeaderMap) -> bool {
    if let Some(cookie_header) = headers.get(header::COOKIE) {
        if let Ok(cookie_str) = cookie_header.to_str() {
            if let Some(token) = extract_jwt_from_cookies(cookie_str) {
                let secret = get_jwt_secret();
                let validation = Validation::new(Algorithm::HS256);
                return decode::<Claims>(&token, &DecodingKey::from_secret(&secret), &validation).is_ok();
            }
        }
    }
    false
}

fn create_jwt() -> Result<String, jsonwebtoken::errors::Error> {
    let expiration = (chrono::Utc::now().timestamp() + 24 * 3600) as usize;
    let claims = Claims {
        sub: "admin".to_string(),
        exp: expiration,
    };
    let secret = get_jwt_secret();
    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(&secret),
    )
}

fn guess_content_type(path: &str) -> &'static str {
    if path.ends_with(".js") {
        "application/javascript"
    } else if path.ends_with(".css") {
        "text/css"
    } else if path.ends_with(".html") {
        "text/html; charset=utf-8"
    } else if path.ends_with(".json") {
        "application/json"
    } else if path.ends_with(".svg") {
        "image/svg+xml"
    } else if path.ends_with(".png") {
        "image/png"
    } else if path.ends_with(".jpg") || path.ends_with(".jpeg") {
        "image/jpeg"
    } else if path.ends_with(".woff2") {
        "font/woff2"
    } else if path.ends_with(".woff") {
        "font/woff"
    } else {
        "application/octet-stream"
    }
}

// ===== Auth Endpoints =====

#[derive(Debug, Deserialize)]
pub struct AdminLoginRequest {
    password: String,
}

#[derive(Debug, Serialize)]
pub struct AdminLoginResponse {
    success: bool,
    message: String,
}

pub async fn admin_login(Json(input): Json<AdminLoginRequest>) -> axum::response::Response {
    if input.password != get_admin_password() {
        return (
            StatusCode::UNAUTHORIZED,
            Json(AdminLoginResponse {
                success: false,
                message: "Invalid password".to_string(),
            }),
        )
            .into_response();
    }

    let token = match create_jwt() {
        Ok(t) => t,
        Err(_) => {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(AdminLoginResponse {
                    success: false,
                    message: "Failed to create token".to_string(),
                }),
            )
            .into_response();
        }
    };

    let cookie = format!(
        "admin_token={}; HttpOnly; SameSite=Strict; Path=/; Max-Age=86400",
        token
    );

    (
        [(header::SET_COOKIE, cookie)],
        Json(AdminLoginResponse {
            success: true,
            message: "Login successful".to_string(),
        }),
    )
        .into_response()
}

pub async fn admin_logout() -> axum::response::Response {
    let cookie = "admin_token=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0";
    (
        [(header::SET_COOKIE, cookie.to_string())],
        Json(json!({ "success": true, "message": "Logged out" })),
    )
        .into_response()
}

pub async fn admin_verify(headers: HeaderMap) -> axum::response::Response {
    if has_valid_jwt_cookie(&headers) {
        Json(json!({ "authenticated": true })).into_response()
    } else {
        Json(json!({ "authenticated": false })).into_response()
    }
}

// ===== Server-Gated Admin Pages =====

const LOGIN_PAGE_HTML: &str = r##"<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>KaiRust Admin - Đăng Nhập</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#e0e8f0}
.c{background:#12121a;border:1px solid #1e293b;border-radius:12px;padding:40px;width:100%;max-width:380px;text-align:center}
h1{font-size:1.75rem;color:#22c55e;margin-bottom:6px;letter-spacing:-0.5px}
p{color:#64748b;margin-bottom:28px;font-size:0.9rem}
.f{text-align:left;margin-bottom:20px}
label{display:block;color:#94a3b8;margin-bottom:8px;font-size:0.85rem}
input{width:100%;padding:12px 14px;background:#0a0a0f;border:1px solid #1e293b;border-radius:8px;color:#f1f5f9;font-size:0.95rem;outline:none;transition:border-color 0.2s}
input:focus{border-color:#22c55e}
button{width:100%;padding:12px;background:linear-gradient(135deg,#22c55e,#16a34a);color:#0a0a0f;border:none;border-radius:8px;font-size:0.95rem;font-weight:600;cursor:pointer;transition:opacity 0.2s}
button:hover{opacity:0.9}
button:disabled{opacity:0.5;cursor:not-allowed}
.e{color:#ef4444;margin-bottom:14px;font-size:0.85rem;display:none}
.logo{font-size:2rem;margin-bottom:16px}
</style>
</head>
<body>
<div class="c">
<div class="logo">⚙️</div>
<h1>KaiRust Admin</h1>
<p>Quản lý hệ thống học tập</p>
<div id="e" class="e"></div>
<form id="f">
<div class="f">
<label>Mật khẩu admin</label>
<input type="password" id="p" placeholder="••••••••••" required autofocus></div>
<button type="submit" id="b">Đăng Nhập</button>
</form>
</div>
<script>
document.getElementById('f').onsubmit=async function(ev){
ev.preventDefault();
var b=document.getElementById('b'),e=document.getElementById('e');
b.disabled=true;e.style.display='none';
try{
var r=await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify({password:document.getElementById('p').value})});
var d=await r.json();
if(d.success){window.location.reload()}else{e.textContent=d.message||'Sai mật khẩu';e.style.display='block'}
}catch(x){e.textContent='Lỗi kết nối';e.style.display='block'}
b.disabled=false};
</script>
</body>
</html>"##;

pub async fn serve_admin_page(headers: HeaderMap) -> axum::response::Response {
    if has_valid_jwt_cookie(&headers) {
        let dist_dir = get_admin_dist_dir();
        let admin_path = get_admin_path();
        match tokio::fs::read_to_string(format!("{}/admin.html", dist_dir)).await {
            Ok(html) => {
                let admin_base = format!("/{}", admin_path);
                let html = html.replace("%%ADMIN_BASE_VALUE%%", &admin_base);
                let html = html.replace("./assets/", &format!("/{}/assets/", admin_path));
                ([(header::CONTENT_TYPE, "text/html; charset=utf-8")], html).into_response()
            }
            Err(_) => StatusCode::INTERNAL_SERVER_ERROR.into_response(),
        }
    } else {
        ([(header::CONTENT_TYPE, "text/html; charset=utf-8")], LOGIN_PAGE_HTML).into_response()
    }
}

pub async fn serve_admin_asset(headers: HeaderMap, path: String) -> axum::response::Response {
    if !has_valid_jwt_cookie(&headers) {
        return StatusCode::FORBIDDEN.into_response();
    }
    if path.contains("..") {
        return StatusCode::FORBIDDEN.into_response();
    }
    let dist_dir = get_admin_dist_dir();
    let file_path = format!("{}/assets/{}", dist_dir, path);
    match tokio::fs::read(&file_path).await {
        Ok(data) => {
            let content_type = guess_content_type(&path);
            ([(header::CONTENT_TYPE, content_type)], data).into_response()
        }
        Err(_) => StatusCode::NOT_FOUND.into_response(),
    }
}

// ===== Admin API - User Management =====

#[derive(Debug, Deserialize)]
pub struct UserQuery {
    search: Option<String>,
    #[serde(default = "default_limit")]
    limit: i64,
    #[serde(default = "default_offset")]
    offset: i64,
}

fn default_limit() -> i64 {
    20
}

fn default_offset() -> i64 {
    0
}

#[derive(Debug, Serialize)]
pub struct UserListResponse {
    success: bool,
    users: Vec<UserRow>,
    total: i64,
}

pub async fn list_users(
    headers: HeaderMap,
    State(db): State<DbPool>,
    Query(query): Query<UserQuery>,
) -> Result<Json<UserListResponse>, StatusCode> {
    // Check auth
    if !has_valid_jwt_cookie(&headers) {
        return Err(StatusCode::UNAUTHORIZED);
    }

    let db_path = (*db).clone();

    let (users, total) = tokio::task::spawn_blocking(move || {
        let conn = rusqlite::Connection::open(&db_path).map_err(|e| e.to_string())?;

        let search = query.search.as_deref();
        let users = db::get_all_users(&conn, search, query.limit, query.offset)
            .map_err(|e| e.to_string())?;
        let total = db::get_user_count(&conn, search)
            .map_err(|e| e.to_string())?;

        Ok::<_, String>((users, total))
    })
    .await
    .map_err(|_e| StatusCode::INTERNAL_SERVER_ERROR)?
    .map_err(|_e| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(UserListResponse {
        success: true,
        users,
        total,
    }))
}

#[derive(Debug, Serialize)]
pub struct UserDetailResponse {
    success: bool,
    user: Option<UserRow>,
    progress: Vec<UserProgressRow>,
}

pub async fn get_user_detail(
    headers: HeaderMap,
    State(db): State<DbPool>,
    Path(user_id): Path<i64>,
) -> Result<Json<UserDetailResponse>, StatusCode> {
    if !has_valid_jwt_cookie(&headers) {
        return Err(StatusCode::UNAUTHORIZED);
    }

    let db_path = (*db).clone();

    let (user, progress) = tokio::task::spawn_blocking(move || {
        let conn = rusqlite::Connection::open(&db_path).map_err(|e| e.to_string())?;

        let user = db::get_user_by_id(&conn, user_id)
            .map_err(|e| e.to_string())?;
        let progress = db::get_user_progress(&conn, user_id)
            .map_err(|e| e.to_string())?;

        Ok::<_, String>((user, progress))
    })
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(UserDetailResponse {
        success: true,
        user,
        progress,
    }))
}

pub async fn delete_user(
    headers: HeaderMap,
    State(db): State<DbPool>,
    Path(user_id): Path<i64>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    if !has_valid_jwt_cookie(&headers) {
        return Err(StatusCode::UNAUTHORIZED);
    }

    let db_path = (*db).clone();

    tokio::task::spawn_blocking(move || {
        let conn = rusqlite::Connection::open(&db_path).map_err(|e| e.to_string())?;
        db::delete_user(&conn, user_id).map_err(|e| e.to_string())?;
        Ok::<_, String>(())
    })
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(json!({ "success": true, "message": "User deleted" })))
}

// ===== Admin Stats =====

#[derive(Debug, Serialize)]
pub struct StatsResponse {
    success: bool,
    total_users: i64,
    total_lessons: i64,
    total_completions: i64,
}

pub async fn get_stats(
    headers: HeaderMap,
    State(db): State<DbPool>,
) -> Result<Json<StatsResponse>, StatusCode> {
    if !has_valid_jwt_cookie(&headers) {
        return Err(StatusCode::UNAUTHORIZED);
    }

    let db_path = (*db).clone();

    let stats = tokio::task::spawn_blocking(move || {
        let conn = rusqlite::Connection::open(&db_path).map_err(|e| e.to_string())?;

        let total_users: i64 = conn
            .query_row("SELECT COUNT(*) FROM users", [], |row| row.get(0))
            .unwrap_or(0);

        // Count distinct lessons completed
        let total_completions: i64 = conn
            .query_row("SELECT COUNT(*) FROM user_progress", [], |row| row.get(0))
            .unwrap_or(0);

        // Total unique lessons attempted (unique user_id + lesson_id combinations)
        let total_lessons: i64 = conn
            .query_row("SELECT COUNT(DISTINCT lesson_id) FROM user_progress", [], |row| row.get(0))
            .unwrap_or(0);

        Ok::<_, String>(StatsResponse {
            success: true,
            total_users,
            total_lessons,
            total_completions,
        })
    })
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(stats))
}
