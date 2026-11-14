#!/usr/bin/env bash
set -euo pipefail
pm2 delete toolmart-admin >/dev/null 2>&1 || true
pm2 save
