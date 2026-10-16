#!/usr/bin/env node
// Blocks two things in test files: focused tests (.only) and hard waits.
// Run by hand with `npm run lint:tests`. The git pre-commit hook in .githooks runs it too.
// Reasons: a stray .only silently skips the rest of the suite. A hard wait makes a test slow and flaky.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const roots = ['tests', 'apps/api/test'];
const isTestFile = (name) => /\.(spec|test)\.(ts|tsx|js|jsx|mjs|cjs)$/.test(name);

const RULES = [
  {
    id: 'no-focused-tests',
    pattern: /\b(?:test|it|describe)(?:\.(?:serial|parallel|describe))*\.only\s*\(|\b(?:fit|fdescribe)\s*\(/,
    message: 'Focused test (.only). Remove it so the whole suite runs.',
  },
  {
    id: 'no-hard-waits',
    pattern: /\.waitForTimeout\s*\(|\bsleep\s*\(|new Promise\([^)]*setTimeout|\bsetTimeout\s*\(/,
    message: 'Hard wait. Wait for a visible state, a response or a poll with recurse instead.',
  },
];

function walk(dir, files = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return files;
  }
  for (const name of entries) {
    if (name === 'node_modules' || name.startsWith('.')) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, files);
    else if (isTestFile(name)) files.push(path);
  }
  return files;
}

const violations = [];
for (const base of roots) {
  for (const file of walk(join(root, base))) {
    readFileSync(file, 'utf8')
      .split('\n')
      .forEach((line, index) => {
        const code = line.replace(/\/\/.*$/, '');
        for (const rule of RULES) {
          if (rule.pattern.test(code)) {
            violations.push(`${relative(root, file)}:${index + 1}  [${rule.id}] ${rule.message}`);
          }
        }
      });
  }
}

if (violations.length > 0) {
  console.error('Test rules failed:\n' + violations.map((v) => '  ' + v).join('\n'));
  process.exit(1);
}
console.log('Test rules passed: no .only and no hard waits.');
