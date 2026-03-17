# =====================================================
# Backend Dockerfile — Multi-stage Rust build
# =====================================================

# Stage 1: Build
FROM rust:1.88-slim AS builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Cache dependencies
COPY backend/Cargo.toml backend/Cargo.lock ./
RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release
RUN rm -rf src

# Build actual source
COPY backend/src ./src
RUN touch src/main.rs && cargo build --release

# Stage 2: Build Admin SPA
FROM node:20-alpine AS admin-builder
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build:admin

# Stage 3: Runtime
FROM debian:bookworm-slim

WORKDIR /app

# Install runtime dependencies
# - rustc: compiler for user code
# - docker.io: CLI to spawn sandboxed containers for running user binaries
RUN apt-get update && apt-get install -y \
    rustc \
    curl \
    && curl -fsSL https://download.docker.com/linux/static/stable/x86_64/docker-27.5.1.tgz | tar -xzC /usr/local/bin --strip-components=1 docker/docker \
    && rm -rf /var/lib/apt/lists/*

# Create data directory
RUN mkdir -p /data /tmp/kairust_sandbox /tmp/kairust_cache /app/dist-admin

# Copy binary
COPY --from=builder /app/target/release/kairust-backend .

# Copy Admin SPA
COPY --from=admin-builder /app/dist-admin /app/dist-admin

EXPOSE 3001

CMD ["./kairust-backend"]
