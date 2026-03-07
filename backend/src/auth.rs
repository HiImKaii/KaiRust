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
use serde::{Deserialize, Serialize};
use sqlx::Row;

// ============== JWT Claims ==============
#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,        // user_id
    pub email: String,      // user email
    pub exp: usize,         // expiration timestamp
}

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
    pub db: DbPool,
    pub jwt_secret: JwtSecret,
}

// ============== Routes ==============
pub fn create_auth_router(state: AuthState) -> Router {
    Router::new()
        .route("/register", post(register))
        .route("/login", post(login))
        .route("/forgot-password", post(forgot_password))
        .route("/me", get(get_current_user))
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

    // Insert user into database
    let result = sqlx::query(
        "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
    )
    .bind(&payload.username)
    .bind(&payload.email)
    .bind(&password_hash)
    .execute(&*state.db)
    .await;

    match result {
        Ok(_) => {
            tracing::info!("User registered: {}", payload.email);

            // Get the inserted user
            let user = sqlx::query("SELECT id, username, email FROM users WHERE email = ?")
                .bind(&payload.email)
                .fetch_one(&*state.db)
                .await
                .ok()
                .map(|row| UserInfo {
                    id: row.get("id"),
                    username: row.get("username"),
                    email: row.get("email"),
                });

            // Generate JWT token
            let token = generate_token(&state.jwt_secret, user.as_ref());

            (
                StatusCode::CREATED,
                Json(AuthResponse {
                    success: true,
                    message: "Registration successful".to_string(),
                    token,
                    user,
                }),
            )
            .into_response()
        }
        Err(e) => {
            let message = if e.to_string().contains("UNIQUE constraint failed") {
                "Username or email already exists".to_string()
            } else {
                "Registration failed".to_string()
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
    }
}

/// Login user
pub async fn login(
    State(state): State<AuthState>,
    Json(payload): Json<LoginRequest>,
) -> Response {
    // Find user by email
    let user_row = match sqlx::query(
        "SELECT id, username, email, password_hash FROM users WHERE email = ?",
    )
    .bind(&payload.email)
    .fetch_one(&*state.db)
    .await
    {
        Ok(row) => row,
        Err(_) => {
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

    let user_id: i64 = user_row.get("id");
    let username: String = user_row.get("username");
    let email: String = user_row.get("email");
    let stored_hash: String = user_row.get("password_hash");

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
        .verify_password(payload.password.as_bytes(), &parsed_hash)
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
        username,
        email: email.clone(),
    };

    // Generate JWT token
    let token = generate_token(&state.jwt_secret, Some(&user));

    (
        StatusCode::OK,
        Json(AuthResponse {
            success: true,
            message: "Login successful".to_string(),
            token,
            user: Some(user),
        }),
    )
    .into_response()
}

/// Forgot password - send password to email
pub async fn forgot_password(
    State(state): State<AuthState>,
    Json(payload): Json<ForgotPasswordRequest>,
) -> Response {
    // Find user by email
    let user_row = match sqlx::query(
        "SELECT id, username, email FROM users WHERE email = ?",
    )
    .bind(&payload.email)
    .fetch_one(&*state.db)
    .await
    {
        Ok(row) => row,
        Err(_) => {
            // Don't reveal if email exists or not
            return (
                StatusCode::OK,
                Json(AuthResponse {
                    success: true,
                    message: "If the email exists, the password will be sent".to_string(),
                    token: None,
                    user: None,
                }),
            )
            .into_response();
        }
    };

    let user_id: i64 = user_row.get("id");
    let username: String = user_row.get("username");

    // Generate a new random password
    let new_password = generate_random_password();

    // Hash the new password
    let salt = SaltString::generate(&mut rand::thread_rng());
    let argon2 = Argon2::default();
    let password_hash = match argon2.hash_password(new_password.as_bytes(), &salt) {
        Ok(hash) => hash.to_string(),
        Err(_) => {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(AuthResponse {
                    success: false,
                    message: "Failed to generate password".to_string(),
                    token: None,
                    user: None,
                }),
            )
            .into_response();
        }
    };

    // Update password in database
    let result = sqlx::query("UPDATE users SET password_hash = ? WHERE id = ?")
        .bind(&password_hash)
        .bind(user_id)
        .execute(&*state.db)
        .await;

    if result.is_err() {
        return (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(AuthResponse {
                success: false,
                message: "Failed to reset password".to_string(),
                token: None,
                user: None,
            }),
        )
        .into_response();
    }

    // TODO: Send email with password (requires email service)
    // For now, just log the password (in production, send via email service)
    tracing::info!(
        "Password reset for user {}: New password = {}",
        username,
        new_password
    );

    // In production, you would send the password via email service here
    // For now, we return success and log it

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

    let user_row = match sqlx::query("SELECT id, username, email FROM users WHERE id = ?")
        .bind(user_id)
        .fetch_one(&*state.db)
        .await
    {
        Ok(row) => row,
        Err(_) => {
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

    let user = UserInfo {
        id: user_row.get("id"),
        username: user_row.get("username"),
        email: user_row.get("email"),
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
