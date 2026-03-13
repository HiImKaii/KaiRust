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
COPY Cargo.toml Cargo.lock ./
RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release
RUN rm -rf src

# Build actual source
COPY src ./src
RUN touch src/main.rs && cargo build --release

# Stage 2: Runtime
FROM debian:bookworm-slim

WORKDIR /app

# Install runtime dependencies
# - rustc: compiler for user code
# - docker.io: CLI to spawn sandboxed containers for running user binaries
RUN apt-get update && apt-get install -y \
    rustc \
    docker.io \
    && rm -rf /var/lib/apt/lists/*

# Create data directory
RUN mkdir -p /data /tmp/kairust_sandbox

# Copy binary
COPY --from=builder /app/target/release/kairust-backend .

EXPOSE 3001

CMD ["./kairust-backend"]
