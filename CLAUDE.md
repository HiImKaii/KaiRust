# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
     |   (Vite/Nginx)  | <-- REST/WebSocket -------> |   (Rust/Axum)   |
     |    Port 80     |                             |   Port 3001     |
     +--------+--------+                             +--------+--------+
              |                                                 |
              |                                         +------v--------+
              |                                         |   Code Executor|
              |                                         | (Docker Sandbox)|
              |                                         +---------------+
```

The backend uses **template pre-compilation** (compiles a base Rust project at startup) and **binary caching** (SHA256 of code → cached compiled binary) to minimize cold-start latency.

## Common Commands

### Frontend (TypeScript + Vite)
```bash
cd frontend
npm run dev          # Start dev server at http://localhost:5173
npm run build        # Build for production (theory SPA)
npm run build:admin  # Build admin panel (React SPA)
npm run preview      # Preview production build
```

### Backend (Rust + Axum)
```bash
cd backend
cargo build          # Build the project
cargo run            # Run with Docker sandbox (default, requires Docker)
RUN_LOCAL=1 cargo run  # Run without Docker (local dev only, no Docker required)
cargo check         # Type-check without full build
```

### Local Development Script
```bash
./dev.sh             # Start both frontend and backend (backend uses RUN_LOCAL=1)
# Logs: tail -f /tmp/kairust-backend.log /tmp/kairust-frontend.log
# Stop: pkill -f kairust-backend; pkill -f vite
```

### Docker (Full Stack - Production Only)
```bash
docker-compose up -d              # Start all services (production)
docker-compose -f docker-compose.local.yml up -d  # Local development (no domain needed)
docker-compose down              # Stop all services
```

### Access Points (local)
- Frontend (Theory): http://localhost:80
- Frontend (Practice): http://localhost:80/practice.html
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
│       ├── exercises/          # Exercise definitions (ch01–ch20)
│       │   ├── mod.rs          # get_test_code(), get_exercise_limits()
│       │   ├── ch01/
│       │   └── ... ch20/
│       └── handlers/
│           ├── mod.rs          # Module re-exports
│           ├── executor.rs     # REST POST /run — compile & run (non-WS)
│           ├── ws.rs           # WS /ws/run — practice mode with test cases
│           ├── ws_play.rs      # WS /ws/play — theory mode (free run, no tests)
│           ├── code.rs        # POST /api/code/save, GET /api/code/{lesson_id}
│           ├── admin.rs        # Admin login/logout/verify + React SPA serving
│           ├── progress.rs     # POST /api/progress/save
│           └── achievements.rs # GET /api/achievements, stats, rank, streak
│
├── frontend/                   # TypeScript + Vite frontend (two SPAs)
│   ├── index.html              # Theory SPA entry
│   ├── practice.html           # Practice SPA entry (28Tech curriculum)
│   ├── dist/                    # Built theory SPA (nginx served)
│   ├── dist-admin/              # Built admin React SPA
│   ├── src/
│   │   ├── main.ts             # Theory SPA: course nav, Monaco editor, auth modal
│   │   ├── practice.ts        # Practice SPA: exercise UI, test runner
│   │   ├── courses.ts          # courseData (ch01–ch23, final_project, appendix)
│   │   ├── progress.ts         # ProgressManager: localStorage + server sync
│   │   ├── achievements.ts     # Achievements UI, stats, ranks, streaks
│   │   ├── AdminApp.tsx        # React admin root component
│   │   ├── admin-main.tsx      # React admin bootstrap
│   │   ├── admin.css           # Admin panel styles
│   │   ├── style.css           # Main app styles
│   │   ├── chapters/           # ch01–ch23, final_project, appendix
│   │   └── practice_data/      # ch28 (28Tech practice lessons: buoi1, buoi2, buoi3)
│   ├── Dockerfile              # Multi-stage: node:20-alpine → nginx:alpine
│   ├── nginx.conf
│   ├── vite.config.ts
│   └── vite.admin.config.ts    # Separate Vite config for admin React app
│
├── caddy/                      # Caddy Docker build context
│   └── Dockerfile              # Custom Caddy with DuckDNS plugin
│
├── data/                       # SQLite database (gitignored)
├── docker-compose.yml          # Production: backend, frontend, caddy, cloudflared
├── docker-compose.local.yml    # Local dev: backend only
├── Caddyfile                   # Root-level Caddy config (DuckDNS + proxy)
├── Dockerfile                   # Root standalone Dockerfile (not used by compose)
├── dev.sh                      # Convenience script to run both services
├── .env                        # Environment variables (gitignored)
└── CLAUDE.md
```

## Key Patterns

### Code Execution Flow

1. Frontend sends code via WebSocket (`/ws/run` for practice, `/ws/play` for theory)
2. Backend checks **binary cache** (`/tmp/kairust_cache/{sha256}`) — if hit, skip compile
3. If cache miss: copies `/tmp/kairust_template` (pre-compiled base) to `/tmp/kairust_sandbox/{session_id}`
4. Writes user code to `src/main.rs`, appends test code if `is_test=true`
5. Compiles with `cargo build --release`
6. **Docker mode**: runs in `debian:bookworm-slim` container with `--read-only --network none --memory 128m --cpus 0.5 --pids-limit 64`
7. **Local mode** (`RUN_LOCAL=1`): runs binary directly on host
8. For practice: compares output against expected test case results

### Template Pre-compilation (Cold Start Optimization)
On backend startup, `main.rs` creates `/tmp/kairrust_template` with `Cargo.toml` + `main.rs` and runs `cargo build --release` once. All session workspaces copy from this template. This avoids re-compiling dependencies on every request.

### Binary Caching
Both WS handlers use `SHA256(code)` as the cache key. Compiled binaries are stored in `/tmp/kairust_cache`. LRU eviction keeps max 100 entries.

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

### Authentication
- **User auth**: JWT tokens (7-day expiry, HS256) stored in `kairust_token` localStorage
- **Password hashing**: Argon2
- **Admin auth**: Separate JWT cookie (`admin_token`); inline HTML login page embedded in backend binary
- Configurable admin path via `ADMIN_PATH` env var

### Admin Panel
The admin panel is a **separate React SPA** (`AdminApp.tsx`) with its own Vite build pipeline (`vite.admin.config.ts`). It is served by the backend at `/{ADMIN_PATH}` after admin login verification.

### Exercise Definition (frontend)
Each exercise has: `title`, `problemDescription`, `inputFormat`, `outputFormat`, `constraints`, `examples`, `defaultCode`, `testCases`, `timeLimit`, `memoryLimit`

### Exercise Coverage
- **Backend test code**: ch01–ch20 (embedded via `include_str!()` at compile time)
- **Frontend chapters**: ch01–ch23, appendix, final_project (ch21–ch23 have **no backend test code**)
- **Practice curriculum**: ch28 (28Tech) with buoi1, buoi2, buoi3 lessons

## Database

SQLite at `{DATA_DIR}/kairust.db` (default: `data/kairust.db`):

| Table | Key Columns | Notes |
|---|---|---|
| `users` | id, username, email, password_hash, password | ⚠️ Stores plaintext password too |
| `user_sessions` | id, user_id, token, expires_at | Session-based JWT revocation |
| `user_progress` | id, user_id, lesson_id | completed_at, time_spent_seconds |
| `user_code_saves` | id, user_id, lesson_id | Dual-layer save: localStorage + server |
| `achievements` | id, name, name_vi, description, description_vi, category, icon, rarity, points | 36 seeded achievements |
| `user_achievements` | id, user_id, achievement_id | earned_at |
| `user_streaks` | id, user_id | current_streak, longest_streak, last_activity_date |

## Environment Variables

```
JWT_SECRET             # Secret for JWT token signing (default: kairust_default_secret_key_change_in_production)
ADMIN_PASSWORD         # Admin panel password (default: admin123)
ADMIN_PATH             # Custom admin URL path (default: "admin")
ADMIN_DIST_DIR         # Path to built admin SPA (default: frontend/dist-admin)
DATA_DIR               # SQLite database directory (default: data)
RUN_LOCAL              # Set to "1" to disable Docker, run binaries directly on host
SANDBOX_VOLUME_NAME    # Docker volume name for sandbox tmpfs (DooD vs bind-mount)
DOMAIN                 # Domain for Caddy (production)
DUCKDNS_TOKEN          # DuckDNS token for dynamic DNS
RUST_LOG               # Logging level (default: info)
```

## Docker Setup

Three separate Dockerfiles:
- `backend/Dockerfile` — Rust 1.88 + embedded Docker daemon for sandbox containers
- `frontend/Dockerfile` — Node 20 → Nginx Alpine
- `caddy/Dockerfile` — Caddy Alpine with DuckDNS plugin

`docker-compose.yml` (production): backend, frontend, caddy, cloudflared — uses named tmpfs volumes for sandbox isolation.

`docker-compose.local.yml`: backend only, local tmpfs for sandbox.
