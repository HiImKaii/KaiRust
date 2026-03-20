# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

After edit any file in this project, update CLAUDE.md file.

## Project Overview

KaiRust is an online Rust learning platform with two learning modes:
- **Theory/Course Mode** (`/`): Structured curriculum (ch01–ch23, appendix, final project) with free-run code editor
- **Practice Mode** (`/practice`): Exercise-based curriculum with automated test case grading

Users write Rust code in a browser-based Monaco Editor, submit it, and the backend compiles and runs it in an isolated Docker sandbox for automated grading.

## Architecture

```
                                    Internet
                                       |
                         Cloudflare Tunnel (public access)
                                       |
                                    Caddy (HTTPS reverse proxy)
                                       |
              +------------------------+------------------------+
              |                                                 |
         Port 80/443                                     Port 8080
              |                                                 |
     +--------v--------+                             +----------v---------+
     |    Frontend     |                             |   Backend        |
     |   (Vite/Nginx) | <-- REST/WebSocket -------> |   (Rust/Axum)   |
     |    Port 80     |                             |   Port 3001     |
     +--------+-------+                             +--------+--------+
              |                                                 |
              |                                         +------v--------+
              |                                         |   Code Executor|
              |                                         | (Docker Sandbox)|
              |                                         +---------------+
```

The backend uses **template pre-compilation** (compiles a base Rust project at startup) and **binary caching** (SHA256 of code → cached compiled binary) to minimize cold-start latency.

> **Note:** `backend/Cargo.toml` uses `edition = "2024"` (unstable at time of writing — requires nightly Rust). The stable alternative is `edition = "2021"`.

## Common Commands

### Frontend (TypeScript + Vite)
```bash
cd frontend
npm run dev          # Dev server at http://localhost:5173 (proxies /ws, /api to backend)
npm run build        # Build both SPAs (theory → dist/, admin → dist-admin/)
npm run build:admin  # Build admin React SPA only → dist-admin/
npm run preview      # Preview production build
```

### Backend (Rust + Axum)
```bash
cd backend
cargo build          # Build the project
cargo run            # Run with Docker sandbox (requires Docker daemon)
RUN_LOCAL=1 cargo run  # Run without Docker — binaries execute directly on host
cargo check          # Type-check without full build
cargo test           # Run unit tests (no #[test] modules currently)
```

### Local Development Script
```bash
./dev.sh             # Start frontend + backend (backend uses RUN_LOCAL=1)
# Logs: tail -f /tmp/kairust-backend.log /tmp/kairust-frontend.log
# Stop: pkill -f kairust-backend; pkill -f vite
```

### Docker (Full Stack)
```bash
docker-compose up -d              # Production: backend, frontend, caddy, cloudflared
docker-compose -f docker-compose.local.yml up -d  # Local: backend only (no domain/Caddy)
docker-compose down              # Stop all services
```

### Access Points (local)
- Frontend (Theory): http://localhost:80
- Frontend (Practice): http://localhost:80/practice
- Backend API: http://localhost:3001
- WebSocket (Practice): ws://localhost:3001/ws/run
- WebSocket (Theory): ws://localhost:3001/ws/play

## Directory Structure

```
KaiRust/
├── backend/                    # Rust Axum backend
│   └── src/
│       ├── main.rs             # Entry point: template pre-compilation, DB/JWT/CORS init
│       ├── router.rs           # API route definitions (REST + WebSocket)
│       ├── db.rs               # SQLite via rusqlite; all migrations & queries
│       ├── auth.rs             # JWT + Argon2 auth; register/login/forgot-password
│       ├── models.rs           # Request/response types (RunRequest, WsMessages)
│       ├── exercises/          # ~200 embedded test code files (ch01–ch20)
│       │   ├── mod.rs          # get_test_code() via include_str!(), get_exercise_limits()
│       │   ├── ch01/           # Each lesson has a .rs file with full test harness
│       │   └── ... ch20/
│       └── handlers/
│           ├── executor.rs     # REST POST /run — compile & run (non-WS)
│           ├── ws.rs           # WS /ws/run — practice mode with test cases
│           ├── ws_play.rs      # WS /ws/play — theory mode (free run, no tests)
│           ├── code.rs         # POST /api/code/save, GET /api/code/{lesson_id}
│           ├── admin.rs        # Admin login/logout + React SPA serving
│           ├── progress.rs     # POST /api/progress/save
│           └── achievements.rs # GET /api/achievements, stats, rank, streak
│
├── frontend/                   # TypeScript + Vite (two SPAs built together)
│   ├── index.html              # Theory SPA entry (served as /)
│   ├── practice.html           # Practice SPA entry (served as /practice)
│   ├── admin.html              # Admin SPA entry (built to dist-admin/)
│   ├── dist/                    # Built theory SPA (nginx served)
│   ├── dist-admin/              # Built admin React SPA
│   ├── src/
│   │   ├── main.ts             # Theory SPA: course nav, Monaco editor, auth modal
│   │   ├── practice.ts         # Practice SPA: exercise UI, test runner
│   │   ├── courses.ts          # courseData (ch01–ch23) + generateCPContent()
│   │   ├── progress.ts         # ProgressManager: localStorage + server sync
│   │   ├── achievements.ts     # Achievements UI (~750 lines, embedded CSS)
│   │   ├── AdminApp.tsx        # Admin React root component
│   │   ├── admin-main.tsx       # React bootstrap (creates AdminApp)
│   │   ├── admin.css           # Admin panel styles
│   │   ├── style.css           # Main app styles
│   │   ├── chapters/           # ch01–ch23, final_project, appendix lesson content
│   │   └── practice_data/      # ch28 (28Tech curriculum: buoi1–buoi3 implemented; buoi4–buoi24 PDFs in 28tech/ but unimplemented)
│   ├── nginx.conf              # Clean URLs: / → index.html, /practice → practice.html
│   ├── vite.config.ts          # Theory + practice SPA build (cleanUrlPlugin)
│   └── vite.admin.config.ts    # Separate admin SPA build → dist-admin/
│
├── 28tech/                     # Source PDFs for ch28 curriculum (buoi4–buoi24, unimplemented)
├── caddy/                      # Caddy Docker build context with DuckDNS plugin
├── data/                       # SQLite database (gitignored)
├── docker-compose.yml          # Production: backend, frontend, caddy, cloudflared
├── docker-compose.local.yml    # Local dev: backend only
├── Caddyfile                   # Root-level Caddy config (DuckDNS + proxy)
├── dev.sh                      # Convenience script to run both services
├── .env                        # Environment variables (gitignored)
└── CLAUDE.md
```

## Key Patterns

### Code Execution Flow

1. Frontend sends code via WebSocket (`/ws/run` for practice, `/ws/play` for theory)
2. Backend checks **binary cache** (`/tmp/kairust_cache/{sha256}`) — if hit, skip compile
3. If cache miss: copies `/tmp/kairust_template` (pre-compiled base) to `/tmp/kairust_sandbox/{session_id}`
4. Writes user code to `src/main.rs`; appends test code if `is_test=true`
5. Compiles with `cargo build --release`
6. **Docker mode**: runs in `debian:bookworm-slim` container with `--read-only --network none --memory 128m --cpus 0.5 --pids-limit 64`
7. **Local mode** (`RUN_LOCAL=1`): runs binary directly on host
8. For practice: frontend compares output against expected `testCases`

### Template Pre-compilation (Cold Start Optimization)
On backend startup, `main.rs` creates `/tmp/kairust_template` with `Cargo.toml` + `main.rs` and runs `cargo build --release` once. All session workspaces clone from this template. This avoids re-compiling dependencies (rand crate) on every request. Template directory is also pre-pulled Docker image.

### Binary Caching
Both WS handlers use `SHA256(code)` as the cache key. Compiled binaries are stored in `/tmp/kairust_cache`. LRU eviction keeps max 100 entries. Stdin is **not** included in the hash — the same binary is reused regardless of input; frontend handles test case comparison.

### WebSocket Message Protocol

**Client → Server:**
```json
{ "type": "run", "code": "...", "is_test": true, "lesson_id": "ch02_03", "stdin": "..." }
{ "type": "stdin", "data": "..." }
{ "type": "kill" }
```

**Server → Client (streaming):**
```json
{ "type": "compiling" }
{ "type": "running" }
{ "type": "stdout", "data": "..." }
{ "type": "stderr", "data": "..." }
{ "type": "exit", "code": 0, "execution_time_ms": 150, "memory_usage_kb": 4096 }
{ "type": "compile_error", "stderr": "..." }
{ "type": "error", "message": "..." }
```

### Two-SPA Architecture

| SPA | Entry | Route | Backend WS | Auth |
|---|---|---|---|---|
| Theory | `index.html` / `main.ts` | `/` | `/ws/play` | JWT localStorage |
| Practice | `practice.html` / `practice.ts` | `/practice` | `/ws/run` | JWT localStorage |
| Admin | `admin.html` / `AdminApp.tsx` | `/{ADMIN_PATH}` | none | JWT HttpOnly cookie |

The **Vite dev server** uses a custom `cleanUrlPlugin` that redirects `/index.html` → `/` and `/practice.html` → `/practice`. In production, **nginx** handles these clean URLs via `try_files`.

The **admin React SPA** uses `vite.admin.config.ts` which outputs to `dist-admin/` with relative asset paths (`base: './'`). The backend serves it at a configurable path `/{ADMIN_PATH}` after verifying the JWT cookie. When serving `admin.html`, the backend replaces `%%ADMIN_BASE_VALUE%%` with the current admin path.

### Database (`DbPool = Arc<PathBuf>`)
SQLite at `{DATA_DIR}/kairust.db`. The `DbPool` type alias wraps the path in `Arc<PathBuf>` — this makes it `Send + Sync` so it can be cloned into Axum's `AppState`. Each handler opens its own `rusqlite::Connection` via `tokio::task::spawn_blocking` (rusqlite is synchronous).

### Exercise Definition

**Backend test code** (ch01–ch20): `exercises/mod.rs` returns `include_str!("ch01/ch01_01.rs")` for each lesson. Each `.rs` file contains a full Rust test harness that reads stdin, runs the user's code, and writes output. Test code is embedded at **compile time** and copied into the Docker image.

**Frontend lesson data** (`courses.ts`, `practice_data/`): Each lesson defines `testCases: [{ input, expectedOutput, hidden? }]`. The frontend sends `stdin` via WebSocket and compares output against `expectedOutput` locally. Lessons also have `problemDescription`, `inputFormat`, `outputFormat`, `constraints`, `examples`, and `defaultCode`.

The `generateCPContent(lesson)` function in `courses.ts` builds HTML for a competitive programming-style problem display.

### Authentication
- **User auth**: JWT (HS256, 7-day expiry), stored in `kairust_token` localStorage, sent as `Authorization: Bearer` header
- **Password hashing**: Argon2
- **Admin auth**: Separate JWT cookie (`admin_token`, HttpOnly, 24h, SameSite=Strict) verified in `admin.rs`

## Database

SQLite at `{DATA_DIR}/kairust.db` (default: `data/kairust.db`):

| Table | Key Columns | Notes |
|---|---|---|
| `users` | id, username, email, password_hash, password | Stores both Argon2 hash and plaintext (for forgot-password flow) |
| `user_sessions` | id, user_id, token, expires_at | Session-based JWT revocation |
| `user_progress` | id, user_id, lesson_id | completed_at, time_spent_seconds |
| `user_code_saves` | id, user_id, lesson_id | Dual-layer save: localStorage + server |
| `achievements` | id, name, name_vi, description, description_vi, category, icon, rarity, points | 36 seeded |
| `user_achievements` | id, user_id, achievement_id | earned_at |
| `user_streaks` | id, user_id | current_streak, longest_streak, last_activity_date |

## Environment Variables

```
JWT_SECRET             # Secret for JWT signing (default: kairust_default_secret_key_change_in_production)
ADMIN_PASSWORD         # Admin panel password (default: admin123)
ADMIN_PATH             # Custom admin URL path (default: "admin")
ADMIN_DIST_DIR         # Path to built admin SPA (default: frontend/dist-admin)
DATA_DIR               # SQLite database directory (default: data)
RUN_LOCAL              # Set to "1" to disable Docker, run binaries directly
SANDBOX_VOLUME_NAME    # Docker named volume for sandbox tmpfs (DooD mode)
DOMAIN                 # Domain for Caddy (production)
DUCKDNS_TOKEN          # DuckDNS token for dynamic DNS
RUST_LOG               # Logging level (default: info)
```

## Docker Setup

Three separate Dockerfiles, each building a separate service image:
- `backend/Dockerfile` — Rust 1.88-slim build stage → debian:bookworm-slim runtime (includes Docker CLI for DooD sandbox containers)
- `frontend/Dockerfile` — Node 20-alpine build stage → nginx:alpine static serve
- `caddy/Dockerfile` — Caddy Alpine with DuckDNS plugin

**Sandbox isolation**: Production uses a named tmpfs volume (`kairust_sandbox_data`) for `/tmp/kairust_sandbox` to prevent disk I/O inside containers. Local dev uses `docker-compose.local.yml` with a local tmpfs.

**DooD pattern**: The backend container runs `docker` CLI and mounts `/var/run/docker.sock` to spawn child containers for each code execution. The `SANDBOX_VOLUME_NAME` env var switches between named volume (Docker-in-Docker) and host bind-mount.
