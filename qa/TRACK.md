# QA track

Workshop sample values, not real emission factors.

## What we are trying to do

We use the Test Architect module on story 1.1 with three commands. In this folder ticket 1.1 is already built and reviewed (13 Vitest tests, the review applied), so you do not wait for the Developer track. `/bmad-tea-framework` sets up Playwright on the web app's own stack, keeps the existing Vitest suite and scaffolds the test files and fixtures. `/bmad-tea-test-design` writes the epic 1 test plan: every risk traces to a written gap, is scored, and gets coverage by priority and quality gates. `/bmad-tea-automate` writes the planned tests, runs them, repairs only defects in the tests, and says plainly what it left for later. The result is a working test framework, a test plan and a passing suite.

## Who decides

You do. The human decision points are:

- Framework: which operation to run, whether CI is included, how the stack and the dependencies are handled.
- Test design: which epic to plan, and whether the risks, priorities and gates are right. A risk with no written gap behind it is not a risk. A product defect found by a test is for the developers to fix. TEA does not edit the app to make a test pass.
- Automate: which mode to run, and what to do with a failing test. A failing test that points at the app is a finding, not something to hide.

## Time box

30 minutes: framework 8, test design 8, automate 14. The times are estimates, because live model runs vary. Read the test design while the tests are written. This folder starts with ticket 1.1 already built and reviewed, so you never wait for the developers.

| Command | Estimate | Clock |
|---|---|---|
| `/bmad-tea-framework` | 8 min | 1:08 to 1:16 |
| `/bmad-tea-test-design` | 8 min | 1:16 to 1:24 |
| `/bmad-tea-automate` | 14 min | 1:24 to 1:38 |

Checkpoint: if a command is not finished when its time is up, copy what you need from `reference/qa-finished` and move on.

## Before you start

Open this `qa` folder itself in VS Code (File > Open Folder), not the repository root. Use GitHub Copilot Chat in Agent mode. Setup was done once for the whole workshop (see the README at the repository root). If a command says a package is missing, run `scripts/setup.sh` from the repository root again. The scripts are in the `scripts` folder one level up, so they start with `../scripts`. The working tree should be clean.

## Commands

### 1. Set up the test framework (assistant chat)

```text
/bmad-tea-framework create
```

The first question is "Do you want CI too? Yes (framework and CI pipeline) or No (framework only)". Reply:

```text
No, framework only
```

A preflight may then stop and say that the fullstack backend check needs a manifest such as `pyproject.toml`, `pom.xml` or `go.mod`, and that this repo's backend is Node.js and has none. The options are 1. Treat the stack as Node/TypeScript fullstack and scaffold a Playwright E2E layer (recommended), 2. API only, 3. Stop. Reply:

```text
1
```

Why: the install set the TEA stack to fullstack. Next it may ask how to handle dependencies, because `AGENTS.md` says not to run `npm install` in this folder. The options are 1. Playwright with playwright-utils, 2. Plain Playwright, 3. Scaffold files only. Reply:

```text
2
```

Why: the packages are already installed once at the repository root, so plain Playwright needs nothing more. The result is a `playwright.config.ts` that starts the API and web servers, specs in `tests/e2e`, fixtures and helpers in `tests/support`, `tests/README.md`, `.env.example`, `.nvmrc` and a `test:e2e` script. Contract testing is skipped. The write-time hook is skipped on this host.

### 2. Check the framework

```bash
npx playwright test --list
```

It lists the tests Playwright found. After `/bmad-tea-framework` these are the sample specs the framework scaffolded.

### 3. Design the tests (assistant chat)

```text
/bmad-tea-test-design
```

It first shows "[C] Create, [R] Resume, [V] Validate, [E] Edit". Reply:

```text
C
```

Then it asks the scope, system-level or epic-level. Reply:

```text
Epic-level for epic 1
```

It may ask an open question about accessibility: the UX spec says WCAG 2.2 AA but names no tool or threshold, and asks if you want an axe scan added to the Playwright suite. Reply:

```text
Yes, add an axe scan (WCAG 2.2 AA)
```

This makes the accessibility check show up, with the known Scope 2 badge contrast finding in this folder. The plan is written to `_bmad-output/test-artifacts/test-design/test-design-epic-1.md`. Read it. Check that every risk quotes a statement from the epic, the plan, the review or the deferred work, and that the quality gates say P0 must pass 100%.

### 4. Write and run the tests (assistant chat)

```text
/bmad-tea-automate
```

It shows "[C] Create, [R] Resume, [V] Validate, [E] Edit". Reply:

```text
C
```

The mode defaults to expand. Reply:

```text
Expand
```

It does not normally ask which story. If it does, answer `Story 1.1`. It writes tests for the existing code, runs them and reports. A failing test that points at a real defect in the app is reported, not hidden, and the app is left alone.

### 5. Run the API unit tests

```bash
npm test
```

### 6. Run the Playwright tests

```bash
npm run test:e2e
```

### 7. Open the report

```bash
npx playwright show-report
```

## What to check

Reference numbers:

- Framework: `npm test` still passes with 13 Vitest tests. TEA adds a Playwright config, e2e specs, fixtures and helpers and a `test:e2e` script. Pact is skipped.
- Test design: 4 risks (R-001 is high, score 6), 32 scenarios (P0 9, P1 19, P2 3, P3 1), 26 to 45 hours if written by hand, and quality gates of 100% for P0, 95% for P1 and 90% for P2 and P3. Every scored risk points at one coverage row.
- Automate: 32 Playwright tests, which are 22 API and 10 browser. The first run had 31 passed and 1 failed: the axe scan found the Scope 2 badge contrast at 3.32:1. After the fix, 32 passed, and 96 of 96 passed with `--repeat-each=3`. 13 Vitest tests still pass.
- Nothing was hidden: a failing test is in the summary, not skipped.

These are the reference numbers. A live Copilot run can differ slightly; compare the shape.

## What you will see

Files created or changed (paths follow `_bmad/config.toml`):

- `playwright.config.ts`, `tests/` (`e2e/`, `support/`, and `api/` if it writes API tests), `tests/README.md`, `.env.example`, `.nvmrc`
- `package.json` scripts and `package-lock.json`
- `_bmad-output/test-artifacts/framework/` with the setup checkpoints
- `_bmad-output/test-artifacts/test-design/test-design-epic-1.md`
- `_bmad-output/test-artifacts/automate/automation-summary-story-1-1.md`

The reference output is `reference/qa-finished`. It also has `_bmad-output/test-artifacts/tea-run-summary.md`, a plain page with the measured numbers. The rule that blocks `.only` and hard waits (`tools/check-test-rules.mjs`, `.githooks/pre-commit`) exists only in the reference folder. It was added by hand. TEA does not create it on this host.

### What can differ in your run

- Counts: the dry run had 17 Vitest and 8 Playwright tests without an axe check. Your counts will differ from the reference.
- Which questions appear: the preflight may or may not stop on the missing backend manifest, and the dependency and accessibility questions may be worded differently or not asked.
- Whether the preflight halts: if it does, choose the recommended option and carry on.

## If you are stuck

Compare with `reference/qa-finished` and copy the files you need into this folder. Do not open the reference folder as your workspace.

Back to the [repository README](../README.md).
