# Carbon Hub Lite

A small slice of Carbon Hub, planned and built the way Carbon Hub is recommended to be: plan by capability, code by module, with the BMad Method and GitHub Copilot.

A member records fuel and electricity use for a site and a reporting period, and sees an indicative footprint.

All emission factor numbers in this project are workshop sample values, not real emission factors.

| Carbon Hub | Here |
|---|---|
| Master PRD at the store root | `_bmad-output/prd-carbon-lite/` |
| System spine (shared architecture decisions) | `_bmad-output/architecture-carbon-lite/` |
| Capability initiatives, each holding its PRD | `initiative-fac-factor-library/` (built first), `initiative-act-activity-entry/`, `initiative-fps-footprint-summary/` |
| Epics and stories, listed in `tickets.toml` | inside each initiative; ticket `1.1` is epic 1, entry 1 |
| UX design, one folder per initiative | `initiative-fac-factor-library/ux-fac-factor-library/` (also holds the shared `DESIGN.md`), `initiative-act-activity-entry/ux-act-activity-entry/`, `initiative-fps-footprint-summary/ux-fps-footprint-summary/` |
| `modules.yaml`, Copilot instructions | same names here |
| BMad skills | `.agents/skills/` (already installed) |

## Layout

- `apps/api`: Fastify 5 and TypeScript API. Tests use Vitest and `fastify.inject`.
- `apps/web`: React 19 and Vite web app.
- `tests/`: Playwright API tests, browser tests and accessibility scans.
- `_bmad-output/`: the planning documents and, later, the output of each BMad step.
- `_bmad/`: BMad configuration, created by `bmad setup`. `custom/config.user.toml` holds the active initiative.
- `AGENTS.md`: routing and rules for the coding agent. `modules.yaml`: module owners and allowed dependencies.

## Run

Packages are installed once at the workshop root, so there is nothing to install here.

```bash
npm test
npm run dev:api
npm run dev:web
npm run build
npm run test:e2e
```

Install the browser once with `npx playwright install chromium` before `npm run test:e2e`. The Playwright tests live in `tests/`, see `tests/README.md`.

The API listens on port 3001. The web app listens on port 5173 and proxies `/api` to the API.

## Status

This folder is part of the BMad hands-on workshop. Read `REFERENCE.md` in this folder to see what it is. Features are added ticket by ticket.
