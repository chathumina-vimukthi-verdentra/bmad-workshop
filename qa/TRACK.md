# QA track

Workshop sample values, not real emission factors.

## What we are trying to do

We use the Test Architect module on story 1.1 with three commands. In this folder ticket 1.1 is already built and reviewed (13 Vitest tests, the review applied), so you do not wait for the Developer track. `/bmad-tea-framework` sets up Playwright on the web app's own stack, keeps the existing Vitest suite and adds a rule that blocks `.only` and hard waits. `/bmad-tea-test-design` writes the epic 1 test plan: every risk traces to a written gap, is scored, and gets coverage by priority and quality gates. `/bmad-tea-automate` writes the planned tests, runs them, repairs only defects in the tests, and says plainly what it left for later. The result is a working test framework, a test plan and a passing suite.

## Who decides

You do. The human decision points are:

- Framework: which operation to run, whether CI is included, and whether TEA may install packages.
- Test design: which epic to plan, and whether the risks, priorities and gates are right. A risk with no written gap behind it is not a risk. A product defect found by a test is for the developers to fix. TEA does not edit the app to make a test pass.
- Automate: which story to cover, and what to do with a failing test. A failing test that points at the app is a finding, not something to hide.

## Time box

30 minutes. The three commands take most of it. Read the test design while the tests are written. This track can run in parallel with the Developer track.

## Before you start

Open this `qa` folder itself in VS Code (File > Open Folder), not the repository root. Use GitHub Copilot Chat in Agent mode. Setup was done once for the whole workshop (see the README at the repository root). If a command says a package is missing, run `scripts/setup.sh` from the repository root again. The scripts are in the `scripts` folder one level up, so they start with `../scripts`. The working tree should be clean.

## Commands

### 1. Set up the test framework (assistant chat)

```text
/bmad-tea-framework
```

It asks three things first. Answer:

```text
Create
```

```text
No. Framework only.
```

```text
Yes. Install it.
```

The three answers are: the operation (Create), "Do you want CI too?" (no, framework only) and the install consent for `@seontechnologies/playwright-utils`. TEA may run `npm install -D` in this folder. That is fine: `node_modules` is ignored by git, and the browser is already installed once at the repository root.

### 2. Check the framework

```bash
npx playwright test --list
```

It lists the tests Playwright found. After `/bmad-tea-framework` these are the sample specs the framework scaffolded.

### 3. Design the tests (assistant chat)

```text
/bmad-tea-test-design
```

If it asks whether to make a system-level or an epic-level test design, answer:

```text
B. Epic-level, for epic 1.
```

Read the plan it writes. Check that every risk quotes a statement from the epic, the plan, the review or the deferred work, and that the quality gates say P0 must pass 100%.

### 4. Write and run the tests (assistant chat)

```text
/bmad-tea-automate
```

If it asks which story, epic or feature to cover, answer:

```text
Story 1.1
```

It does not ask for a mode. It writes tests for the existing code, runs them and reports. If a test fails because of a real defect in the app, it reports the defect and leaves the app alone.

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

- `npm test` still passes with 13 tests. TEA keeps the existing suite.
- `npm run test:e2e` runs the API tests and the browser tests. The reference run has 32 tests.
- The test design lists each risk with probability, impact and score, and points each scored risk at one coverage row.
- The automation summary says what was created, how many tests passed, which defects were found and what was left for later.
- Nothing was hidden: a failing test is in the summary, not skipped.

## What you will see

Files created or changed (paths follow `_bmad/config.toml`):

- `playwright.config.ts`, `tests/` (`api/`, `e2e/`, `support/`), `tests/README.md`, `.env.example`, `.nvmrc`
- a rule that blocks `.only` and hard waits (the reference uses `tools/check-test-rules.mjs` and `.githooks/pre-commit`; with an assistant that has no tool hooks, TEA says it skipped its own hook)
- `package.json` scripts and `package-lock.json`
- `_bmad-output/test-artifacts/framework/` with the setup checkpoints
- `_bmad-output/test-artifacts/test-design/test-design-epic-1.md`
- `_bmad-output/test-artifacts/automate/automation-summary-story-1-1.md`

The reference output is `reference/qa-finished`. It also has `_bmad-output/test-artifacts/tea-run-summary.md`, a plain page with the measured numbers. It is a guide: a live run will differ in wording, in the tests it chooses and sometimes in the numbers.

## If you are stuck

Compare with `reference/qa-finished` and copy the files you need into this folder. Do not open the reference folder as your workspace.

Back to the [repository README](../README.md).
