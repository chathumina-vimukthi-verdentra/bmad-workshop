#!/usr/bin/env bash
# Usage: ./scripts/check-install.sh <folder>
# Compares every skill's computedHash in the folder's skills-lock.json with the baseline
# lock at scripts/baseline-skills-lock.json. Prints OK, or lists the skills that drifted.
# Exit code: 0 OK, 1 drift, 2 no skills-lock.json in the folder.
# Windows: run it in Git Bash or WSL.
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BASELINE="$ROOT/scripts/baseline-skills-lock.json"

if [ $# -ne 1 ]; then
  echo "Usage: ./scripts/check-install.sh <folder>"
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

if ! command -v node >/dev/null 2>&1; then
  echo "Stop: node is not installed or not on your PATH."
  exit 1
fi
if [ ! -f "$BASELINE" ]; then
  echo "Stop: baseline lock not found at $BASELINE."
  exit 1
fi
if [ ! -f "$TARGET/skills-lock.json" ]; then
  echo "No skills-lock.json in $TARGET. BMad and TEA are not installed here."
  echo ""
  exit 2
fi

node - "$BASELINE" "$TARGET/skills-lock.json" <<'JS'
const fs = require('fs');
const [baselinePath, foundPath] = process.argv.slice(2);
const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8')).skills || {};
const base = read(baselinePath);
const found = read(foundPath);

const changed = [];
const missing = [];
const extra = [];
for (const name of Object.keys(base)) {
  if (!(name in found)) missing.push(name);
  else if (base[name].computedHash !== found[name].computedHash) changed.push(name);
}
for (const name of Object.keys(found)) {
  if (!(name in base)) extra.push(name);
}

const total = Object.keys(base).length;
if (!changed.length && !missing.length && !extra.length) {
  console.log(`OK: all ${total} skills match the baseline.`);
  process.exit(0);
}
console.log(`DRIFT: ${changed.length + missing.length + extra.length} difference(s) from the baseline of ${total} skills.`);
if (changed.length) console.log('Different hash:\n' + changed.map((n) => '  ' + n).join('\n'));
if (missing.length) console.log('Missing from this folder:\n' + missing.map((n) => '  ' + n).join('\n'));
if (extra.length) console.log('Not in the baseline:\n' + extra.map((n) => '  ' + n).join('\n'));
console.log('A drift means the live install is a different version of BMad or TEA than the snapshots.');
console.log('The reference output may then differ from what you see.');
process.exit(1);
JS
