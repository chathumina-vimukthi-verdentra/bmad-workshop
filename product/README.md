# Carbon Hub Lite: product track

The planning half of Carbon Hub Lite: from an empty initiative to a capability PRD, its UX, its epic and its tickets, the way Carbon Hub is recommended to plan. It stops at the point where the work is handed to development.

All emission factor numbers in this project are workshop sample values, not real emission factors.

| What | Where |
|---|---|
| Master PRD (problem, release plan, CLT.NFR-n) | `_bmad-output/prd-carbon-lite/` (given) |
| System spine (AD-1 to AD-10) | `_bmad-output/architecture-carbon-lite/` (given) |
| The initiative we plan live: Factor library (FAC) | `_bmad-output/initiative-fac-factor-library/` (empty, active) |
| The answer key: the same initiative, finished | `../dev/_bmad-output/initiative-fac-factor-library/` |
| BMad skills | `.agents/skills/` (already installed) |

## What the demo produces

```text
_bmad-output/initiative-fac-factor-library/
  initiative-fac-factor-library.md    already here, frontmatter only; filled in by /bmad-ticket
  prd-fac-factor-library/             /bmad-prd
    prd-fac-factor-library.md
    .memlog.md
  ux-fac-factor-library/              /bmad-ux, read live from the Figma link you give it
    ux-fac-factor-library.md
    DESIGN.md                         the shared design every screen inherits
    EXPERIENCE.md
    imports/figma/                    a PNG per Figma frame and a README with the link and node ids
    .memlog.md
  tickets.toml                        /bmad-ticket: the epics, in build order
  epic-browse-factors/                /bmad-ticket
    epic-browse-factors.md
    tickets.toml                      the tickets 1.1 and 1.2
```

Read `TRACK.md` for the demo script.

## Where this sits in the flow

| Step | Skill | Where |
|---|---|---|
| Master PRD and system spine | `/bmad-prd`, `/bmad-architecture` | given, at the store root |
| Initiative folder | `/bmad` | given: `initiative-fac-factor-library`, empty |
| Capability PRD | `/bmad-prd` | **this folder, live** |
| UX: DESIGN.md, EXPERIENCE.md, mockups | `/bmad-ux` | **this folder, live** |
| Initiative, epics and tickets | `/bmad-ticket` | **this folder, live** |
| Hand-over line | | |
| Build, walkthrough, code review | `/bmad-build 1.1` and the rest | the `dev` folder |
| Test framework, test design, automate | `/bmad-tea-*` | the `qa` folder |

## Run

There is nothing to build here. `apps/` is the same starter as in `dev`, kept so the planning skills can see the real web shell. Packages are installed once at the workshop root.

Back to the [repository README](../README.md).
