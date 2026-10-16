# TEA run summary: Carbon Hub Lite, story 1.1

Workshop sample values, not real emission factors.

This page summarises what the three Test Architect commands did on story 1.1. It is a reference example. A live run will differ in wording, in some choices and sometimes in the numbers. The facts below were measured in a real run on Node.js 24 with Chromium.

## The three commands

| Command | What it did | Where the output is |
| --- | --- | --- |
| `/bmad-tea-framework` | Set up Playwright next to the existing Vitest suite. One config with two projects (`api` and `chromium`), one merged fixture file, a commit hook that blocks `.only` and hard waits. | `playwright.config.ts`, `tests/`, `tools/`, `.githooks/`, `_bmad-output/test-artifacts/framework/` |
| `/bmad-tea-test-design` | Wrote the epic 1 test plan. Four risks, each tied to a written gap. 32 planned scenarios by priority. Quality gates. | `_bmad-output/test-artifacts/test-design/test-design-epic-1.md` |
| `/bmad-tea-automate` | Wrote the planned tests, ran them, and said what it left for later. | `tests/api/`, `tests/e2e/`, `_bmad-output/test-artifacts/automate/automation-summary-story-1-1.md` |

## Numbers

| What | Count |
| --- | --- |
| Vitest tests (`npm test`), unchanged | 13 passed |
| Playwright tests written | 32 (22 API, 10 browser) |
| First Playwright run, app as built | 31 passed, 1 failed |
| Playwright run after the app fix | 32 passed in 3.6 s |
| Playwright with `--repeat-each=3` | 96 of 96 passed |
| Test repair rounds used | 0 of 3 |
| Web build (`npm run build`) | passes |

## What the run found

1. **A real accessibility defect.** The Scope 2 badge had white text on bright blue, a contrast ratio of 3.32 to 1. WCAG 2.2 AA needs 4.5 to 1. The axe scan caught it, and TEA did not edit the app or weaken the test. A developer fixed the badge colours to match `DESIGN.md` and the second run passed.
2. **A tool limit worth knowing.** `apiRequest` from playwright-utils returns a null body and no headers for `application/problem+json`. The tests for the 400 responses use Playwright's `request` fixture, with a deviation note on each line.
3. **A gap in the review's tests.** The code review found that a repeated `scope` parameter was not validated, but no test covered it. A new test shows the route rejects it.
4. **A dev-only behaviour.** The page asks for the list twice in development, because of React StrictMode. Not a defect.

## What was left for later

- The unknown route 404 is still not problem+json (R-002). The test checks the status only.
- Ticket 1.2 has no tests because it is not built.
- The scope filter and the count text in the UX document are not on the page.
- Pagination and cache headers are deferred.
- No CI pipeline, Chromium only.

## What to do next

Review the suite with `/bmad-tea-test-review`, then trace the acceptance criteria with `/bmad-tea-trace`. Commit the work when you are happy with it.
