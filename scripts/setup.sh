#!/usr/bin/env bash
# Usage: ./scripts/setup.sh      (run once, from the repository folder)
# Mac, Linux, Git Bash or WSL. On Windows cmd or PowerShell use scripts\setup.cmd instead.
# Checks your tools, installs the shared packages at the repository root, installs the Playwright
# browser and runs a smoke test. Safe to run again: finished work is skipped.
# It never installs a tool for you. If one is missing it tells you how to get it.
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

stop() { echo; echo "Stop: $1"; shift; for line in "$@"; do echo "  $line"; done; exit 1; }

echo "Checking your tools"

command -v node >/dev/null 2>&1 || stop "Node is not installed or not on your PATH." \
  "Install Node 24 LTS from https://nodejs.org (Node 20 or later works)." \
  "Then open a new terminal and run this script again."
NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
[ "$NODE_MAJOR" -ge 20 ] || stop "Node 20 or later is needed. You have $(node -v)." \
  "Install Node 24 LTS from https://nodejs.org, then run this script again."
echo "  node $(node -v)"

command -v npm >/dev/null 2>&1 || stop "npm is not installed or not on your PATH." \
  "npm comes with Node. Reinstall Node from https://nodejs.org."
echo "  npm $(npm -v)"

command -v git >/dev/null 2>&1 || stop "git is not installed or not on your PATH." \
  "Install git from https://git-scm.com/downloads, then run this script again."
echo "  $(git --version)"

command -v uv >/dev/null 2>&1 || stop "uv is not installed or not on your PATH. The BMad skills call it." \
  "Mac: brew install uv" \
  "Any system with Python: pip install uv" \
  "Official installer: see https://docs.astral.sh/uv/getting-started/installation/" \
  "Then open a new terminal and run this script again."
echo "  $(uv --version)"

if command -v code >/dev/null 2>&1; then
  echo "  VS Code command 'code' found"
else
  echo "  Warning: the 'code' command was not found. You can still open the folders from VS Code itself."
fi

echo
if [ -d node_modules/vitest ] && [ -d node_modules/@playwright/test ] && [ -d node_modules/vite ]; then
  echo "Packages are already installed at the repository root. Skipping npm install."
else
  echo "Installing packages at the repository root. This takes a few minutes."
  npm install --no-audit --no-fund || stop "npm install failed. Check your internet connection and run this script again."
fi

echo
echo "Installing the Playwright browser (Chromium). Already installed browsers are skipped."
npx playwright install chromium || stop "The Playwright browser install failed. Check your internet connection and run this script again."

echo
echo "Smoke test: running the tests of the qa folder"
"$ROOT/scripts/verify.sh" "$ROOT/qa" > /tmp/workshop-smoke.$$ 2>&1
STATUS=$?
if [ "$STATUS" -ne 0 ]; then
  cat /tmp/workshop-smoke.$$; rm -f /tmp/workshop-smoke.$$
  stop "The smoke test failed. Send the output above to the presenter."
fi
rm -f /tmp/workshop-smoke.$$
echo "  PASS"

echo
echo "Ready. Open dev or qa in VS Code."
