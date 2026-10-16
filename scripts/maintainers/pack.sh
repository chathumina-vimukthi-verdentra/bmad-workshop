#!/usr/bin/env bash
# Maintainer tool. Zips the whole workshop folder next to the folder.
# Leaves out node_modules, dist, test-results, playwright-report and .DS_Store.
# Keeps every .git folder, so the repository carries its history, so the zip works as it is.
# Includes the root package.json and package-lock.json, scripts, README.md and PREWORK.md.
# Fails if one of those is missing.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
NAME="$(basename "$ROOT")"
OUT="$(dirname "$ROOT")/$NAME.zip"
for f in package.json package-lock.json README.md PREWORK.md INSTALL.md scripts/setup.sh scripts/setup.cmd; do
  [ -f "$ROOT/$f" ] || { echo "Missing $f"; exit 1; }
done
rm -f "$OUT"
cd "$(dirname "$ROOT")"
zip -qr "$OUT" "$NAME" -x '*/node_modules/*' '*/dist/*' '*/test-results/*' '*/playwright-report/*' '*.DS_Store'
echo "Wrote $OUT"
