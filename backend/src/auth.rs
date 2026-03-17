// =====================================================
// Auth Module — Authentication handlers
// =====================================================

use crate::db::DbPool;
use argon2::{password_hash::SaltString, Argon2, PasswordHasher, PasswordVerifier};
use axum::{
    extract::State,
    http::{HeaderMap, StatusCode},
    response::{IntoResponse, Json, Response},
    routing::{get, post},
    Router,
};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use rusqlite::params;
use serde::{Deserialize, Serialize};

// ============== JWT Claims ==============
#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,        // user_id
    pub email: String,      // user email
    pub exp: usize,         // expiration timestamp
}

const DEFAULT_JWT_SECRET: &str = "kairust_default_secret_key_change_in_production";

// ============== Request/Response Models ==============
#[derive(Debug, Deserialize)]
pub struct RegisterRequest {
    pub username: String,
    pub email: String,
    pub password: String,
}

#[derive(Debug, Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Deserialize)]
pub struct ForgotPasswordRequest {
    pub email: String,
}

#[derive(Debug, Serialize)]
pub struct AuthResponse {
    pub success: bool,
    pub message: String,
    pub token: Option<String>,
    pub user: Option<UserInfo>,
}

#[derive(Debug, Serialize, Clone)]
pub struct UserInfo {
    pub id: i64,
    pub username: String,
    pub email: String,
}

// ============== JWT Secret ==============
#[derive(Clone)]
pub struct JwtSecret(pub String);

impl JwtSecret {
    pub fn new(secret: String) -> Self {
        Self(secret)
    }

    pub fn get(&self) -> String {
        self.0.clone()
    }
}

// ============== Auth State ==============
#[derive(Clone)]
pub struct AuthState {
    #[allow(dead_code)]
    pub db: DbPool,
    pub jwt_secret: JwtSecret,
}

// ============== Routes ==============
pub fn create_auth_router(state: AuthState) -> Router {
    Router::new()
        .route("/api/auth/register", post(register))
        .route("/api/auth/login", post(login))
        .route("/api/auth/forgot-password", post(forgot_password))
        .route("/api/auth/me", get(get_current_user))
        .with_state(state)
}

// ============== Handlers ==============

/// Register new user
pub async fn register(
    State(state): State<AuthState>,
    Json(payload): Json<RegisterRequest>,
) -> Response {
    // Validate input
    if payload.username.len() < 3 || payload.username.len() > 30 {
        return (
            StatusCode::BAD_REQUEST,
            Json(AuthResponse {
                success: false,
                message: "Username must be between 3 and 30 characters".to_string(),
                token: None,
                user: None,
            }),
        )
        .into_response();
    }

    if payload.password.len() < 6 {
        return (
            StatusCode::BAD_REQUEST,
            Json(AuthResponse {
                success: false,
                message: "Password must be at least 6 characters".to_string(),
                token: None,
                user: None,
            }),
        )
        .into_response();
    }

    // Hash password
    let salt = SaltString::generate(&mut rand::thread_rng());
    let argon2 = Argon2::default();
    let password_hash = match argon2.hash_password(payload.password.as_bytes(), &salt) {
        Ok(hash) => hash.to_string(),
        Err(_) => {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(AuthResponse {
                    success: false,
                    message: "Failed to hash password".to_string(),
                    token: None,
                    user: None,
                }),
            )
            .into_response();
        }
    };

    // Clone values for the blocking task
    let username = payload.username.clone();
    let email = payload.email.clone();
    let password_hash_clone = password_hash.clone();
    let jwt_secret_for_token = state.jwt_secret.clone();
    let email_for_log = email.clone(); // Clone for logging after spawn

    // Insert user into database using blocking
    let result = tokio::task::spawn_blocking(move || {
        use rusqlite::Connection;
        let db_dir = std::env::var("DATA_DIR")
            .unwrap_or_else(|_| "data".to_string());
        let db_path = std::path::PathBuf::from(db_dir).join("kairust.db");
        let conn = Connection::open(&db_path).map_err(|e| e.to_string())?;

        conn.execute(
            "INSERT INTO users (username, email, password_hash) VALUES (?1, ?2, ?3)",
            params![&username, &email, &password_hash_clone],
        ).map_err(|e| e.to_string())?;

        // Get the inserted user
        let mut stmt = conn.prepare("SELECT id, username, email FROM users WHERE email = ?1")
            .map_err(|e| e.to_string())?;
        let user = stmt.query_row(params![&email], |row| {
            Ok(UserInfo {
                id: row.get(0)?,
                username: row.get(1)?,
                email: row.get(2)?,
            })
        }).map_err(|e| e.to_string())?;

        Ok::<_, String>(user)
    }).await;

    match result {
        Ok(Ok(user)) => {
            tracing::info!("User registered: {}", email_for_log);

            // Generate JWT token
            let token = generate_token(&jwt_secret_for_token, Some(&user));

            (
                StatusCode::CREATED,
                Json(AuthResponse {
                    success: true,
                    message: "Registration successful".to_string(),
                    token,
                    user: Some(user),
                }),
            )
            .into_response()
        }
        Ok(Err(e)) => {
            let message = if e.contains("UNIQUE constraint failed") || e.contains("already exists") {
                "Username or email already exists".to_string()
            } else {
                format!("Registration failed: {}", e)
            };

            (
                StatusCode::CONFLICT,
                Json(AuthResponse {
                    success: false,
                    message,
                    token: None,
                    user: None,
                }),
            )
            .into_response()
        }
        Err(_) => {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(AuthResponse {
                    success: false,
                    message: "Server error".to_string(),
                    token: None,
                    user: None,
                }),
            )
            .into_response()
        }
    }
}

/// Login user
pub async fn login(
    State(state): State<AuthState>,
    Json(payload): Json<LoginRequest>,
) -> Response {
    let email = payload.email.clone();
    let password = payload.password.clone();
    let jwt_secret_for_token = state.jwt_secret.clone();

    // Find user by email using blocking
    let result = tokio::task::spawn_blocking(move || {
        use rusqlite::Connection;
        let db_dir = std::env::var("DATA_DIR")
            .unwrap_or_else(|_| "data".to_string());
        let db_path = std::path::PathBuf::from(db_dir).join("kairust.db");
        let conn = Connection::open(&db_path).map_err(|e| e.to_string())?;

        let mut stmt = conn.prepare("SELECT id, username, email, password_hash FROM users WHERE email = ?1 OR username = ?1")
            .map_err(|e| e.to_string())?;
        let user = stmt.query_row(params![&email], |row| {
            Ok((
                row.get::<_, i64>(0)?,
                row.get::<_, String>(1)?,
                row.get::<_, String>(2)?,
                row.get::<_, String>(3)?,
            ))
        }).map_err(|e| e.to_string())?;

        Ok::<_, String>(user)
    }).await;

    let (user_id, username, email, stored_hash) = match result {
        Ok(Ok(r)) => r,
        _ => {
            return (
                StatusCode::UNAUTHORIZED,
                Json(AuthResponse {
                    success: false,
                    message: "Invalid email or password".to_string(),
                    token: None,
                    user: None,
                }),
            )
            .into_response();
        }
    };

    // Verify password
    let argon2 = Argon2::default();
    let parsed_hash = match argon2::PasswordHash::new(&stored_hash) {
        Ok(hash) => hash,
        Err(_) => {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(AuthResponse {
                    success: false,
                    message: "Failed to verify password".to_string(),
                    token: None,
                    user: None,
                }),
            )
            .into_response();
        }
    };

    if argon2
        .verify_password(password.as_bytes(), &parsed_hash)
        .is_err()
    {
        return (
            StatusCode::UNAUTHORIZED,
            Json(AuthResponse {
                success: false,
                message: "Invalid email or password".to_string(),
                token: None,
                user: None,
            }),
        )
        .into_response();
    }

    tracing::info!("User logged in: {}", email);

    let user = UserInfo {
        id: user_id,
        username: username.clone(),
        email: email.clone(),
    };

    // Generate JWT token
    let token = generate_token(&jwt_secret_for_token, Some(&user));

    (
        StatusCode::OK,
        Json(AuthResponse {
            success: true,
            message: "Login successful".to_string(),
            token,
            user: Some(UserInfo {
                id: user_id,
                username,
                email,
            }),
        }),
    )
    .into_response()
}

/// Forgot password - reset password
pub async fn forgot_password(
    State(_state): State<AuthState>,
    Json(payload): Json<ForgotPasswordRequest>,
) -> Response {
    let email = payload.email.clone();

    // Find user and reset password using blocking
    let result = tokio::task::spawn_blocking(move || {
        use rusqlite::Connection;
        let db_dir = std::env::var("DATA_DIR")
            .unwrap_or_else(|_| "data".to_string());
        let db_path = std::path::PathBuf::from(db_dir).join("kairust.db");
        let conn = Connection::open(&db_path).map_err(|e| e.to_string())?;

        // Find user by email or username
        let mut stmt = conn.prepare("SELECT id, username FROM users WHERE email = ?1 OR username = ?1")
            .map_err(|e| e.to_string())?;
        let (user_id, username): (i64, String) = stmt.query_row(params![&email], |row| {
            Ok((row.get(0)?, row.get(1)?))
        }).map_err(|e| e.to_string())?;

        // Generate new password
        let new_password = generate_random_password();

        // Hash password
        let salt = SaltString::generate(&mut rand::thread_rng());
        let argon2 = Argon2::default();
        let password_hash = argon2.hash_password(new_password.as_bytes(), &salt)
            .map_err(|e| e.to_string())?
            .to_string();

        // Update password
        conn.execute(
            "UPDATE users SET password_hash = ?1 WHERE id = ?2",
            params![&password_hash, user_id],
        ).map_err(|e| e.to_string())?;

        Ok::<_, String>((username, new_password))
    }).await;

    match result {
        Ok(Ok((username, new_password))) => {
            // Log the password (in production, send via email)
            tracing::info!("Password reset for user {}: New password = {}", username, new_password);

            (
                StatusCode::OK,
                Json(AuthResponse {
                    success: true,
                    message: "Password has been reset. Check your email for the new password.".to_string(),
                    token: None,
                    user: None,
                }),
            )
            .into_response()
        }
        _ => {
            // Don't reveal if email exists
            (
                StatusCode::OK,
                Json(AuthResponse {
                    success: true,
                    message: "If the email exists, the password will be sent".to_string(),
                    token: None,
                    user: None,
                }),
            )
            .into_response()
        }
    }
}

/// Get current user info from token
pub async fn get_current_user(
    State(state): State<AuthState>,
    headers: HeaderMap,
) -> Response {
    // Get token from Authorization header
    let token = match headers.get("authorization") {
        Some(value) => match value.to_str() {
            Ok(s) if s.starts_with("Bearer ") => s[7..].to_string(),
            _ => {
                return (
                    StatusCode::UNAUTHORIZED,
                    Json(AuthResponse {
                        success: false,
                        message: "Invalid authorization header".to_string(),
                        token: None,
                        user: None,
                    }),
                )
                .into_response();
            }
        },
        None => {
            return (
                StatusCode::UNAUTHORIZED,
                Json(AuthResponse {
                    success: false,
                    message: "Missing authorization header".to_string(),
                    token: None,
                    user: None,
                }),
            )
            .into_response();
        }
    };

    // Verify token
    let secret = state.jwt_secret.get();
    let claims = match decode::<Claims>(
        &token,
        &DecodingKey::from_secret(secret.as_bytes()),
        &Validation::default(),
    ) {
        Ok(c) => c.claims,
        Err(_) => {
            return (
                StatusCode::UNAUTHORIZED,
                Json(AuthResponse {
                    success: false,
                    message: "Invalid token".to_string(),
                    token: None,
                    user: None,
                }),
            )
            .into_response();
        }
    };

    // Get user from database
    let user_id: i64 = claims.sub.parse().unwrap_or(0);

    let result = tokio::task::spawn_blocking(move || {
        use rusqlite::Connection;
        let db_dir = std::env::var("DATA_DIR")
            .unwrap_or_else(|_| "data".to_string());
        let db_path = std::path::PathBuf::from(db_dir).join("kairust.db");
        let conn = Connection::open(&db_path).map_err(|e| e.to_string())?;

        let mut stmt = conn.prepare("SELECT id, username, email FROM users WHERE id = ?1")
            .map_err(|e| e.to_string())?;
        let user = stmt.query_row(params![user_id], |row| {
            Ok(UserInfo {
                id: row.get(0)?,
                username: row.get(1)?,
                email: row.get(2)?,
            })
        }).map_err(|e| e.to_string())?;

        Ok::<_, String>(user)
    }).await;

    let user = match result {
        Ok(Ok(u)) => u,
        _ => {
            return (
                StatusCode::NOT_FOUND,
                Json(AuthResponse {
                    success: false,
                    message: "User not found".to_string(),
                    token: None,
                    user: None,
                }),
            )
            .into_response();
        }
    };

    (
        StatusCode::OK,
        Json(AuthResponse {
            success: true,
            message: "User info retrieved".to_string(),
            token: None,
            user: Some(user),
        }),
    )
    .into_response()
}

// ============== Helper Functions ==============

/// Generate JWT token
fn generate_token(jwt_secret: &JwtSecret, user: Option<&UserInfo>) -> Option<String> {
    let user = user?;

    let secret = jwt_secret.get();
    let exp = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap()
        .as_secs() as usize
        + 7 * 24 * 60 * 60; // 7 days

    let claims = Claims {
        sub: user.id.to_string(),
        email: user.email.clone(),
        exp,
    };

    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret.as_bytes()),
    )
    .ok()
}

/// Generate random password
fn generate_random_password() -> String {
    use rand::Rng;
    let mut rng = rand::thread_rng();
    let password: String = (0..12)
        .map(|_| {
            let idx = rng.gen_range(0..62);
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                .chars()
                .nth(idx)
                .unwrap()
        })
        .collect();
    password
}

/// Get user_id from JWT token
pub async fn get_user_id_from_token(
    _db: &DbPool,
    token: &str,
) -> Result<i64, String> {
    // Get JWT secret from environment or use default
    let secret = std::env::var("JWT_SECRET")
        .unwrap_or_else(|_| DEFAULT_JWT_SECRET.to_string());

    let claims = decode::<Claims>(
        token,
        &DecodingKey::from_secret(secret.as_bytes()),
        &Validation::default(),
    )
    .map_err(|e| format!("Invalid token: {}", e))?
    .claims;

    let user_id: i64 = claims.sub
        .parse()
        .map_err(|_| "Invalid user ID in token".to_string())?;

    Ok(user_id)
}
