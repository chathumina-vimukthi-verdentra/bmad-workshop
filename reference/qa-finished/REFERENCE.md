# Reference: what the QA track ends with

Workshop sample values, not real emission factors.

This folder is a read-only guide. It is the state after `/bmad-tea-framework`, `/bmad-tea-test-design` and `/bmad-tea-automate` on story 1.1. Compare your own work with it, or copy a file from it if you are stuck. Do not open this folder as your VS Code workspace.

| Part | Where |
|---|---|
| Test framework: Playwright config, support files, README | `playwright.config.ts`, `tests/support/`, `tests/README.md` |
| Rule that blocks `.only` and hard waits | `tools/check-test-rules.mjs`, `.githooks/pre-commit`, `npm run lint:tests` |
| Test design for epic 1 | `_bmad-output/test-artifacts/test-design/test-design-epic-1.md` |
| API tests and browser tests | `tests/api/factors.api.spec.ts`, `tests/e2e/factor-library.spec.ts` |
| Accessibility scan (axe, WCAG 2.2 AA) | `tests/e2e/factor-library.a11y.spec.ts` |
| Automation summary for story 1.1 | `_bmad-output/test-artifacts/automate/automation-summary-story-1-1.md` |
| Plain summary of the TEA run with measured numbers | `_bmad-output/test-artifacts/tea-run-summary.md` |

## The measured numbers

These were measured in a real run. A live run will differ.

| What | Result |
|---|---|
| `npm test` (Vitest) | 13 passed |
| `npx playwright test` | 32 passed (22 API, 10 browser) |
| `npm run build` | passes |

The first Playwright run, on the app as built, had 31 passed and 1 failed. The failure was a real accessibility defect: the Scope 2 badge had a contrast ratio of 3.32 to 1. The badge colours in `apps/web/src/styles.css` were then changed to the colours in the UX design, and the run passed. The Left for later list in the automation summary says what is still open.

It is a guide. A live run will differ in wording and detail.
