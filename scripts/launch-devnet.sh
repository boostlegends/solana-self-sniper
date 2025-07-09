#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT/docker"

echo "Starting Solana validator + Jito block-engine mock via docker-compose..."
docker compose up -d

echo "Containers running. Validator RPC -> http://localhost:8899"
echo "To stop: docker compose down"
