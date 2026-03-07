FROM rust:1.88-slim as builder

# Set the working directory
WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y pkg-config libssl-dev && rm -rf /var/lib/apt/lists/*

# Copy the entire backend directory
COPY . .

# Build the release version
RUN cargo build --release

# -----------------
# Production stage
# -----------------
FROM rust:1.88-slim

WORKDIR /app

# Install rustc & cargo so the server can run user code
RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Assuming 1.79-slim already has rustc and cargo, if not, we would install them here
RUN rustc --version && cargo --version

# Copy the compiled binary from the builder stage
COPY --from=builder /app/target/release/kairust-backend /usr/local/bin/kairust-backend

# Expose the correct port
EXPOSE 3001

# Run the backend
CMD ["kairust-backend"]
