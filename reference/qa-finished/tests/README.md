# Tests

Workshop sample values, not real emission factors.

Carbon Hub Lite has two test suites.

| Suite | Tool | Where | Run with |
| --- | --- | --- | --- |
| API unit tests | Vitest and `fastify.inject`, in process | `apps/api/test/` | `npm test` |
| API and browser tests | Playwright | `tests/api/` and `tests/e2e/` | `npm run test:e2e` |

## Setup

Packages and the browser are installed once at the workshop root (`scripts/setup.sh`).

The git pre-commit hook (see Rules below) is switched on with `git config core.hooksPath .githooks`, when this project is the root of its git repository.

## Run

Run everything the Playwright config knows about. It starts the API on port 3001 and the web app on port 5173 when they are not running already:

```bash
npm run test:e2e
```

Run one project:

```bash
npx playwright test --project=api
```

Run with the UI mode, to watch and debug:

```bash
npm run test:e2e:ui
```

Open the last HTML report:

```bash
npx playwright show-report
```

## Layout

```text
tests/
  api/                     API tests, no browser (project "api")
  e2e/                     Browser tests and accessibility scans (project "chromium")
  support/
    merged-fixtures.ts     The one place specs import `test` from
    helpers/factor-data.ts Expected factor data (from the capability PRD) and the Zod schema
```

## Architecture

- Every spec imports `test` and `expect` from `tests/support/merged-fixtures.ts`. It merges the `@seontechnologies/playwright-utils` fixtures: `apiRequest`, `recurse`, `interceptNetworkCall` and the network error monitor.
- `apiRequest` makes API calls and returns `{ status, body }`. One exception: it returns a null body and no headers for `application/problem+json`, so the tests for 400 responses use Playwright's `request` fixture. Each of those lines has a deviation comment.
- `interceptNetworkCall` is declared before `page.goto`, so the test never misses the response.
- The network error monitor fails a browser test when the page triggers a 4xx or 5xx response. A test that expects one opts out with the annotation `skipNetworkMonitoring`.
- Expected data comes from the capability PRD, not from the app, so a wrong value in the app fails a test.

## Best practices

- Name a test with its priority: `[P0]`, `[P1]`, `[P2]` or `[P3]`. The priorities come from `_bmad-output/test-artifacts/test-design/test-design-epic-1.md`.
- Select by role, name or text. The app has no `data-testid` attributes.
- Wait for a state or a response. Never wait for a number of milliseconds.
- Each test stands alone. The data is read only and the seed is fixed.

## Rules the commit enforces

Two rules apply to every test file under `tests/` and `apps/api/test/`:

- No `.only`. A focused test silently skips the rest of the suite.
- No hard waits, such as `waitForTimeout` or `sleep`. They make tests slow and flaky.

`tools/check-test-rules.mjs` checks both. Run it by hand with `npm run lint:tests`. The git hook `.githooks/pre-commit` runs it on every commit, and the `core.hooksPath` setting above turns the hook on. To turn off a rule, edit the `RULES` list in the script and say why in the commit message.

## CI

No CI pipeline is set up in this reference. When one is added, run `npm ci`, `npx playwright install --with-deps chromium`, `npm test` and `npm run test:e2e`, and keep `playwright-report/` and `test-results/` as artifacts.

## Troubleshooting

- Port 3001 or 5173 is busy: stop the other process, or start your servers first. The config reuses a server that is already running.
- A browser is missing: run `npx playwright install chromium`.
- The page shows two list requests in the network tab: in development mode React StrictMode runs the effect twice. This is normal.

## Knowledge base

The TEA knowledge fragments that shaped this setup are in `.agents/skills/bmod-tea/knowledge/`: `playwright-utils-mandate.md`, `api-request.md`, `intercept-network-call.md`, `network-error-monitor.md`, `fixtures-composition.md`, `playwright-config.md` and `test-quality.md`.
