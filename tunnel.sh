#!/usr/bin/env bash
# The Silo website — build it, serve it, and expose it publicly via a Cloudflare quick tunnel.
# Just run: ./tunnel.sh   (no account, no password page)
set -euo pipefail

cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "== The Silo (tunnel mode) =="

command -v cloudflared >/dev/null 2>&1 || { echo "!! cloudflared not found (brew install cloudflared)"; exit 1; }

[ -d node_modules ] || { echo "-> Installing dependencies..."; npm install --silent; }

echo "-> Building production site..."
npm run build --silent

find_free_port() {
  local port=$1
  while lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; do port=$((port + 1)); done
  echo "$port"
}
PORT="$(find_free_port 4173)"
URL="http://127.0.0.1:${PORT}"

echo "-> Serving on ${URL}"
npx vite preview --host 127.0.0.1 --port "$PORT" --strictPort &
SERVER_PID=$!
TUNNEL_PID=""
cleanup() {
  kill "$SERVER_PID" 2>/dev/null || true
  [ -n "$TUNNEL_PID" ] && kill "$TUNNEL_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

for _ in $(seq 1 60); do curl -s -o /dev/null "$URL" && break; sleep 0.5; done

echo "-> Starting tunnel... look for the https://*.trycloudflare.com URL below"
cloudflared tunnel --no-autoupdate --url "$URL" &
TUNNEL_PID=$!

echo "-> Local: ${URL}"
echo "-> Press Ctrl+C to stop both the site and the tunnel."
wait "$SERVER_PID" "$TUNNEL_PID"
