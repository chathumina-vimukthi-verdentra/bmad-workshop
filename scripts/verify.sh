#!/usr/bin/env bash
# Usage: ./scripts/verify.sh <folder>
# Runs the API unit tests (npm test) in the folder and prints PASS or FAIL.
# Windows: run it in Git Bash or WSL.
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [ $# -ne 1 ]; then
  echo "Usage: ./scripts/verify.sh <folder>"
  echo "Examples: ./scripts/verify.sh qa   or   ../scripts/verify.sh ."
  exit 1
fi

ARG="$1"
if [ ! -d "$ARG" ] && [ -d "$ROOT/$ARG" ]; then
  ARG="$ROOT/$ARG"
fi
if [ ! -d "$ARG" ]; then
  echo "Stop: $1 is not a folder."
  exit 1
fi
TARGET="$(cd "$ARG" && pwd)"

if [ ! -f "$TARGET/package.json" ]; then
  echo "Stop: no package.json in $TARGET."
  exit 1
fi
if [ ! -d "$TARGET/node_modules" ] && [ ! -d "$ROOT/node_modules" ]; then
  echo "Stop: the packages are not installed. Run the setup script from the repository folder:"
  echo "  $ROOT/scripts/setup.sh"
  exit 1
fi

cd "$TARGET"
if npm test; then
  echo
  echo "PASS: npm test passed in $TARGET"
  exit 0
else
  echo
  echo "FAIL: npm test failed in $TARGET"
  exit 1
fi
