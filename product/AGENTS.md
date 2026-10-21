# Carbon Hub Lite workshop: product track

Workshop sample values, not real emission factors. Every factor number here is fictional.

This folder is for planning only. It takes one initiative from empty to its capability PRD, its UX, its
epic and its tickets (`bmad-prd`, `bmad-ux`, `bmad-ticket`). Do not write build plans (`*-plan.md`) or
code here. That is the hand-over to `bmad-build`, which the `dev` folder shows.

## Routing

`active_initiative` in `_bmad/custom/config.user.toml` names the work in hand.

| Code | Initiative folder | Module slugs | Status |
|---|---|---|---|
| FAC | `_bmad-output/initiative-fac-factor-library/` | factors | Active. Being planned: PRD, then UX, then epic and tickets |

ACT and FPS are in the master PRD index, but their initiative folders are not in this copy. Do not
recreate them here. Do not read `../dev`, `../qa` or `../reference`: they are other tracks, not inputs to this one.

- Planning lives in `_bmad-output/`. Read only the active initiative's folder and the store-root
  documents.
- The master PRD (`_bmad-output/prd-carbon-lite/`) and the system spine
  (`_bmad-output/architecture-carbon-lite/`) bind every initiative. Cite their ids. Never restate them.
- Cite requirements as FAC.FR-1 and CLT.NFR-1, architecture decisions as AD-2, modules by slug.
- Never hand-edit a PRD, a spine, a UX spine or a `tickets.toml`. Change it through the BMad skill that owns it.
- If the FAC scope conflicts with the master PRD or the spine, say so and let the user decide. Do not
  quietly change the master PRD or the spine.

## Run

- Stack, for context only: Node.js 24 LTS, TypeScript, Fastify 5 API in `apps/api`, React 19 and Vite web
  app in `apps/web`. The architecture rules are AD-1 to AD-10 in the system spine.
- Packages are installed once at the workshop root. Do not run `npm install` in this folder.
- Never push. Commits stay local.
