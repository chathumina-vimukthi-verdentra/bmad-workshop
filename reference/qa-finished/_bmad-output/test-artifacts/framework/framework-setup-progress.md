---
workflowStatus: 'completed'
stepsCompleted: ['step-01-preflight', 'step-02-select-framework', 'step-03-scaffold-framework', 'step-04-docs-and-scripts', 'step-05-validate-and-summary']
lastStep: 'step-05-validate-and-summary'
lastSaved: '2026-10-16'
setup_scope: 'framework'
setup_operation: 'create'
---

# Framework setup progress

Reference example of the checkpoint `/bmad-tea-framework` writes. A live run words it differently.

## Questions asked and answers

| Question | Answer |
| --- | --- |
| Which operation: Create, Resume, Validate or Edit? | Create |
| Do you want CI too? | No. Framework only. `ci_scope_answered` is true. |
| Install `@seontechnologies/playwright-utils` as a dev dependency? | Yes |

## Step 1: Preflight

- Detected stack: fullstack (the `test_stack_type` setting is `fullstack`). React 19 and Vite web app, Fastify API.
- Existing browser framework: none. Existing unit framework: Vitest in `apps/api` (kept as it is).
- Architecture context: `_bmad-output/architecture-carbon-lite/architecture-carbon-lite.md`.

## Step 2: Framework selection

- Browser and API framework: Playwright. Reason: the web app and the API need to be tested together, and Playwright runs both from one config.
- Backend unit framework: Vitest, kept. TEA adds no second unit framework.
- Contract testing: skipped. The web app calls its own API in the same repository, so there is no consumer-provider boundary (Pact relevance gate closed).
- Contract of the setup: package manager npm, lockfile `package-lock.json`, local command `npm run test:e2e`, servers started by `playwright.config.ts` (`npm run start -w apps/api` on port 3001, `npm run dev:web` on port 5173).

## Step 3: Scaffold

- `playwright.config.ts` with two projects, `api` (no browser) and `chromium`. Timeouts: action 15 s, navigation 30 s, test 60 s. Trace, screenshot and video kept on failure. Reporters: list, HTML, JUnit.
- `tests/support/merged-fixtures.ts`: one entry point built with `mergeTests` from `apiRequest`, `recurse`, `interceptNetworkCall` and the network error monitor.
- `tests/support/helpers/factor-data.ts`: expected factor data and a Zod schema.
- `.env.example`, `.nvmrc`.
- Not created: an auth fixture (no sign-in in R1) and data factories (no write endpoints).

## Step 4: Docs and scripts

- `tests/README.md`.
- `package.json` scripts: `test:e2e`, `test:e2e:ui`, `lint:tests`, `typecheck:tests`. The existing `test` (Vitest) is unchanged.
- Enforcement: the write-time hook TEA ships needs an agent with tool hooks. In this repository the same two rules, no `.only` and no hard waits, are enforced at commit time. `tools/check-test-rules.mjs` runs from `.githooks/pre-commit` and from `npm run lint:tests`. `npm install` turns the hook on.

## Step 5: Validate and summary

- The framework scaffolds one API and one browser sample spec. This reference keeps no sample specs: the specs in `tests/api` and `tests/e2e` are the ones `/bmad-tea-automate` wrote next, and with them `npm run test:e2e` passes (32 tests).
- `npm test` still passes: 13 Vitest tests.
- Checklist passed.
