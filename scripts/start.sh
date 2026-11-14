#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-dev}"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROCESS_NAME="toolmart-admin"
cd "${PROJECT_DIR}"

if [[ "${MODE}" == "prod" ]]; then
  if [[ ! -f "${PROJECT_DIR}/.env.production" ]]; then
    echo "Missing .env.production. Copy .env.production.example and replace the placeholder domains." >&2
    exit 1
  fi
  set -a
  source "${PROJECT_DIR}/.env.production"
  set +a
  npm run build
  pm2 delete "${PROCESS_NAME}" >/dev/null 2>&1 || true
  pm2 start npm --name "${PROCESS_NAME}" --cwd "${PROJECT_DIR}" -- run start
else
  if [[ -f "${PROJECT_DIR}/.env.local" ]]; then set -a; source "${PROJECT_DIR}/.env.local"; set +a; fi
  pm2 delete "${PROCESS_NAME}" >/dev/null 2>&1 || true
  pm2 start npm --name "${PROCESS_NAME}" --cwd "${PROJECT_DIR}" -- run dev
fi
pm2 save
