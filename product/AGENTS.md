# Carbon Hub Lite workshop: product track

Workshop sample values, not real emission factors. Every factor number here is fictional.

This folder is for planning only. It stops at the capability PRD and the UX for one initiative. Do not
create epics, tickets, plans or code here unless asked. That is the hand-over to `bmad-ticket` and
`bmad-build`, which the `dev` folder shows.

## Routing

`active_initiative` in `_bmad/custom/config.user.toml` names the work in hand.

| Code | Initiative folder | Module slugs | Status |
|---|---|---|---|
| FAC | `_bmad-output/initiative-fac-factor-library/` | factors | Planned end to end. Read-only reference |
| ONB | `_bmad-output/initiative-onb-onboarding/` | onboarding (proposed) | Active. Being planned: PRD, then UX |

ACT and FPS are in the master PRD index, but their initiative folders are not in this copy. They live in
`../dev`. Do not recreate them here.

- Planning lives in `_bmad-output/`. Read only the active initiative's folder and the store-root
  documents. Do not read another initiative's folder unless asked. The FAC folder is the worked example:
  read it when the user asks for its shape, or its shared `DESIGN.md` when the UX asks for it.
- The master PRD (`_bmad-output/prd-carbon-lite/`) and the system spine
  (`_bmad-output/architecture-carbon-lite/`) bind every initiative. Cite their ids. Never restate them.
- Cite requirements as ONB.FR-1 and CLT.NFR-1, architecture decisions as AD-2, modules by slug.
- Never hand-edit a PRD, a spine or a UX spine. Change it through the BMad skill that owns it.
- If the ONB scope conflicts with the master PRD or the spine, say so and let the user decide. Do not
  quietly change the master PRD or the spine.

## Run

- Stack, for context only: Node.js 24 LTS, TypeScript, Fastify 5 API in `apps/api`, React 19 and Vite web
  app in `apps/web`. The architecture rules are AD-1 to AD-10 in the system spine.
- Packages are installed once at the workshop root. Do not run `npm install` in this folder.
- Never push. Commits stay local.
