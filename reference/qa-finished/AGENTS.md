# Carbon Hub Lite workshop

Workshop sample values, not real emission factors. Every factor number here is fictional.

## Routing

`active_initiative` in `_bmad/custom/config.user.toml` names the work in hand. BMad setup creates that file.

| Code | Initiative folder | Module slugs | Status |
|---|---|---|---|
| FAC | `_bmad-output/initiative-fac-factor-library/` | factors | R1, built first |
| ACT | `_bmad-output/initiative-act-activity-entry/` | activities | R1, later |
| FPS | `_bmad-output/initiative-fps-footprint-summary/` | footprint | R1, later |

- Planning lives in `_bmad-output/`. Read only the active initiative's folder and the store-root
  documents. Do not read another initiative's folder unless asked.
- The master PRD (`_bmad-output/prd-carbon-lite/`) and the system spine
  (`_bmad-output/architecture-carbon-lite/`) bind every initiative. Cite their ids. Never restate them.
- Cite requirements as FAC.FR-3 and CLT.NFR-1, architecture decisions as AD-2, modules by slug.
- Refer to tickets as `<epic id>.<entry id>`, for example `1.1` is epic 1, entry 1 of the active initiative.
- Never hand-edit a PRD or a spine. Change it through the BMad skill that owns it.

## Run and test

- Stack: Node.js 24 LTS (works on 20 and above), TypeScript, Fastify 5 API in `apps/api`, React 19 and
  Vite web app in `apps/web`, npm workspaces. Tests use Vitest and `fastify.inject`. Storage is in
  memory. The architecture rules are AD-1 to AD-10 in the system spine.
- Install: packages are installed once at the workshop root. Do not run `npm install` in this folder.
- Tests: `npm test` runs the API unit tests. `npm run test:e2e` runs the Playwright API and browser tests (install the browser once with `npx playwright install chromium`).
- Test rules: no `.only` and no hard waits in any test. `npm run lint:tests` checks them and the pre-commit hook enforces them.
- API: `npm run dev:api` serves http://localhost:3001.
- Web: `npm run dev:web` serves http://localhost:5173 and proxies `/api` to the API.
- Build: `npm run build`.
- Never push. Commits stay local.
