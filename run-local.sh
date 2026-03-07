#!/bin/bash
# =====================================================
# run-local.sh — Khởi chạy / tắt môi trường LOCAL
# Không ảnh hưởng đến production (docker-compose.yml)
# =====================================================

set -e

COMPOSE_FILE="docker-compose.local.yml"
PROJECT_NAME="kairust_local"

show_help() {
    echo ""
    echo "  KaiRust — Local Dev Runner"
    echo "  Dùng: ./run-local.sh [lệnh]"
    echo ""
    echo "  Lệnh:"
    echo "    up      — Build và khởi chạy (mặc định)"
    echo "    down    — Dừng và xóa container"
    echo "    logs    — Xem logs realtime"
    echo "    rebuild — Build lại toàn bộ từ đầu (--no-cache)"
    echo ""
    echo "  Truy cập sau khi chạy: http://localhost:8080"
    echo ""
}

CMD=${1:-up}

case "$CMD" in
    up)
        echo ">> Đang khởi chạy môi trường local..."
        docker compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME" up --build -d
        echo ""
        echo ">> Đã sẵn sàng tại: http://localhost:8080"
        echo ">> Xem logs: ./run-local.sh logs"
        ;;
    down)
        echo ">> Đang dừng môi trường local..."
        docker compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME" down
        echo ">> Đã dừng."
        ;;
    logs)
        docker compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME" logs -f
        ;;
    rebuild)
        echo ">> Rebuild toàn bộ từ đầu (no cache)..."
        docker compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME" down
        docker compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME" build --no-cache
        docker compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME" up -d
        echo ""
        echo ">> Đã sẵn sàng tại: http://localhost:8080"
        ;;
    *)
        show_help
        ;;
esac
