# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

KaiRust is an online Rust learning platform. Users write Rust code in a browser-based Monaco Editor, submit it, and the backend compiles and runs it in an isolated Docker sandbox for automated grading.

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
     +----------------+                             +--------+--------+
                                                               |
                                                      +--------v---------+
                                                      |  Code Executor   |
                                                      |  (Docker Sandbox)|
                                                      +------------------+
```

## Common Commands

### Frontend (TypeScript + Vite)
```bash
cd frontend
npm run dev          # Start dev server at http://localhost:5173
npm run build        # Build for production
npm run build:admin  # Build admin panel
npm run preview      # Preview production build
```

### Backend (Rust + Axum)
```bash
cd backend
cargo build          # Build the project
cargo run            # Run with Docker sandbox (default, requires Docker)
RUN_LOCAL=1 cargo run  # Run without Docker (local dev only)
cargo check         # Type-check without full build
```

### Docker (Full Stack - Production Only)
```bash
docker-compose up -d              # Start all services (production)
docker-compose -f docker-compose.local.yml up -d  # Local development (no domain needed)
docker-compose down              # Stop all services
```

### Access Points (local)
- Frontend: http://localhost:80
- Backend API: http://localhost:3001
- WebSocket: ws://localhost:3001/ws/play

## Directory Structure

```
KaiRust/
├── backend/                    # Rust Axum backend
│   └── src/
│       ├── main.rs            # Entry point, server initialization
│       ├── router.rs          # API route definitions
│       ├── db.rs              # SQLite database operations
│       ├── auth.rs            # JWT authentication
│       ├── models.rs          # Request/response types
│       ├── exercises/        # Exercise definitions (ch01-ch08, limits, test code)
│       └── handlers/          # HTTP/WebSocket handlers
│           ├── executor.rs    # Core: compile & run code in sandbox
│           ├── ws.rs          # WebSocket: practice mode (with test cases)
│           ├── ws_play.rs     # WebSocket: theory mode (free run)
│           ├── code.rs        # Save/load user code
│           ├── admin.rs       # Admin panel endpoints
│           ├── progress.rs    # User progress tracking
│           └── achievements.rs # Gamification system
│
├── frontend/                   # TypeScript + Vite frontend
│   └── src/
│       ├── main.ts            # Main app: course view, Monaco editor setup
│       ├── courses.ts         # Course data structure, content generation
│       ├── practice.ts        # Practice mode: exercise UI, test case handling
│       ├── progress.ts        # Progress manager (localStorage)
│       ├── achievements.ts    # Achievement system
│       └── chapters/          # Static course content (ch01-ch23)
│
├── caddy/                      # Caddy reverse proxy config
├── docker-compose.yml          # Production deployment
└── docker-compose.local.yml    # Local development config
```

## Key Patterns

### Code Execution Flow
1. Frontend sends code via WebSocket (`/ws/run` for practice, `/ws/play` for theory)
2. Backend creates temporary workspace in `/tmp/kairust_sandbox/{session_id}`
3. Writes user code to `src/main.rs`
4. Appends test code if `is_test=true`
5. Compiles with `cargo build --release`
6. Runs in Docker container with resource limits (128MB RAM, 1-10s timeout)
7. Compares output against expected test case results

### WebSocket Messages
- Client sends: `{ type: "run"|"play", code, lesson_id?, is_test?, stdin? }`
- Server responds: `{ success, stdout, stderr, execution_time_ms, memory_usage_kb, results? }`

### Authentication
- JWT tokens stored in cookies
- Password hashing with Argon2
- Admin path configurable via `ADMIN_PATH` env var

### Exercise Definition
Each exercise has: `title`, `problemDescription`, `inputFormat`, `outputFormat`, `constraints`, `examples`, `defaultCode`, `testCases`, `timeLimit`, `memoryLimit`

## Database

SQLite at `/data/kairust.db` with tables: users, code_submissions, progress, achievements

## Environment Variables

```
JWT_SECRET          # Secret for JWT token signing
ADMIN_PASSWORD      # Password for admin panel
DOMAIN              # Domain for Caddy (production)
DUCKDNS_TOKEN       # DuckDNS token for dynamic DNS
ADMIN_PATH          # Custom admin URL path (default: "admin")
```
