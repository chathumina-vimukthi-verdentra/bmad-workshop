---
runScope: 'story'
runKey: 'story-1-1'
workflowStatus: 'completed'
stepsCompleted: ['step-01-preflight-and-context', 'step-02-identify-targets', 'step-03c-aggregate', 'step-04-validate-and-summarize']
lastStep: 'step-04-validate-and-summarize'
lastSaved: '2026-10-16'
test_mode: 'expand'
test_operation: 'create'
auto_validate: true
auto_heal_failures: true
max_healing_iterations: 3
use_mcp_healing: true
healing_rounds_used: 0
---

# Automation Summary: Story 1.1, List seeded factors

Workshop sample values, not real emission factors. This is a reference example. A live run of `/bmad-tea-automate` will word things differently and may choose different tests.

**Execution mode:** BMad-integrated. Inputs: ticket 1.1 acceptance criteria (a) to (g), `test-design-epic-1.md`, the capability PRD, the plan and review notes.
**Detected stack:** fullstack
**Playwright Utils mandate:** enabled
**Pact.js Utils mandate:** enabled in config, no contract artifacts generated (no consumer-provider boundary)
**Total tests generated:** 32

## Execution status

| Run | Command | Result |
| --- | --- | --- |
| First run, app as built | `npx playwright test` | **failed**: 31 passed, 1 failed, 0 skipped (4.1 s) |
| After the app fix below | `npx playwright test` | **passed**: 32 passed (22 in project `api`, 10 in project `chromium`, 3.6 s) |
| Stability check | `npx playwright test --repeat-each=3` | passed: 96 of 96 |
| Existing unit tests | `npm test` | passed: 13 tests (Vitest, unchanged) |

Repair rounds used: 0 of 3. The one failure was a real product defect, not a test defect, so the run left the test as it was.

## Coverage Plan by Test Level and Priority

| Test level | P0 | P1 | P2 | P3 | Total |
| ---------- | -- | -- | -- | -- | ----- |
| API        | 9  | 11 | 2  | 0  | 22    |
| E2E        | 0  | 8  | 1  | 1  | 10    |
| **Total**  | 9  | 19 | 3  | 1  | 32    |

P0 covers the seeded list, decimal strings and the rejection of invalid filters. P1 covers the Factor library page, the filters, the read-only rule and the accessibility scan. P2 covers repeated reads, the unknown route and the accessibility scan of the error state. P3 covers the app shell tabs. The plan is in `_bmad-output/test-artifacts/test-design/test-design-epic-1.md`. Every test name starts with its priority.

Acceptance criteria map: (a), (b) in the first API test. (c), (d), (e) in the filter tests. (f) is a Vitest test and the API read-twice test. (g) in the seven page tests.

Fixtures created: 0 new. The run used `apiRequest`, `interceptNetworkCall`, `recurse` and the network error monitor from `tests/support/merged-fixtures.ts`. One helper holds the expected data: `tests/support/helpers/factor-data.ts`.

## Files Created/Updated

### Created

- `tests/api/factors.api.spec.ts` (22 tests)
- `tests/e2e/factor-library.spec.ts` (8 tests)
- `tests/e2e/factor-library.a11y.spec.ts` (2 tests)

### Updated

- None in the test support files.

### Product defect found, fixed outside this run

- `apps/web/src/styles.css`: the Scope 2 badge showed white text on the bright blue `#3b90e5`, a contrast ratio of 3.32 to 1 where WCAG 2.2 AA needs 4.5 to 1. This run did not change application code. A developer then changed the two badge styles to the colours in `DESIGN.md` (green tint with green text for Scope 1, blue tint with blue text for Scope 2) and added four colour tokens. The second run above is after that change.

## Key Assumptions and Risks

- Assumption: the seeded values in the capability PRD (section 4) are correct. The tests compare the API with them.
- Assumption: no response schema file exists, so a Zod schema was written in `tests/support/helpers/factor-data.ts` and passed to `apiRequest` with `validateSchema`.
- Observation: in development mode the page asks for the list twice, because React StrictMode runs effects twice. Confirmed with a request count of 2. It is not a defect and the production build asks once. No test counts requests.
- Observation: the review finding about a repeated `scope` parameter had no test. The new test shows the route rejects it with 400.
- Risk: the browser tests need Chromium (`npx playwright install chromium`) and free ports 3001 and 5173, or servers that already run.
- Risk: the API tests run against an in-memory store. If the store becomes persistent, the fixed seed assumption must be revisited.

## Left for later

- The unknown route still returns the Fastify default 404 body, not problem+json (risk R-002, deferred in the code review). The test asserts the 404 status only. Add the body assertion in the change that adds the handlers.
- Ticket 1.2, factor detail by id, is not built, so it has no tests.
- The Scope filter select, count text and "Try again" button in `EXPERIENCE.md` are not on the page, so nothing tests them. Clarification C-1 in the test design asks product about them.
- Pagination and cache headers are deferred (R-003, R-004) and have no tests.
- Chromium only. No CI pipeline.

## Playwright Utils Deviations

tests/api/factors.api.spec.ts:117: raw `request`, because `apiRequest` returns a null body and no headers for `application/problem+json`
tests/api/factors.api.spec.ts:124: raw `request`, same reason
tests/api/factors.api.spec.ts:130: raw `request`, same reason
tests/api/factors.api.spec.ts:137: raw `request`, same reason

RECOMMENDED, not wired:

- `auth-session`: the app has no sign-in in R1 (system spine, Deferred), so there is no auth provider to wire.
- `burn-in`: `package.json` has no burn-in script. Wire `runBurnIn` before the suite joins a nightly flaky-test job; see `burn-in.md`.
- `network-recorder`: not needed. The app and its API are local and fast.

## Pact.js Utils Deviations

None

## Next Recommended Workflow

Run `bmad-tea-test-review` next, for a quality read of the new suite. Follow with `bmad-tea-trace` to confirm every acceptance criterion of ticket 1.1 maps to a passing test.
