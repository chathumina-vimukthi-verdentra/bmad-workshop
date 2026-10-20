# Carbon Hub Lite: product track

The planning half of Carbon Hub Lite: from a capability idea to a capability PRD and its UX, the way Carbon Hub is recommended to plan. It stops at the point where the work is handed to development.

All emission factor numbers in this project are workshop sample values, not real emission factors.

| What | Where |
|---|---|
| Master PRD (problem, release plan, CLT.NFR-n) | `_bmad-output/prd-carbon-lite/` |
| System spine (AD-1 to AD-10) | `_bmad-output/architecture-carbon-lite/` |
| Worked example, planned end to end: PRD, UX, then epic and tickets | `_bmad-output/initiative-fac-factor-library/` |
| The shared design that every initiative inherits | `_bmad-output/initiative-fac-factor-library/ux-fac-factor-library/DESIGN.md` |
| The initiative we plan live: Onboarding (ONB) | `_bmad-output/initiative-onb-onboarding/` (empty, active) |
| BMad skills | `.agents/skills/` (already installed) |

## What the demo produces

```text
_bmad-output/initiative-onb-onboarding/
  initiative-onb-onboarding.md        already here, frontmatter only
  prd-onb-onboarding/                 /bmad-prd
    prd-onb-onboarding.md
    .memlog.md
  ux-onb-onboarding/                  /bmad-ux
    ux-onb-onboarding.md
    DESIGN.md
    EXPERIENCE.md
    mockups/
    .memlog.md
```

Read `TRACK.md` for the demo script.

## Where this sits in the flow

| Step | Skill | Where |
|---|---|---|
| Master PRD and system spine | `/bmad-prd`, `/bmad-architecture` | given, at the store root |
| Initiative | `/bmad` | given: `initiative-onb-onboarding` |
| Capability PRD | `/bmad-prd` | **this folder, live** |
| UX: DESIGN.md, EXPERIENCE.md, mockups | `/bmad-ux` | **this folder, live** |
| Hand-over line | | |
| Epics and tickets | `/bmad-ticket` | shown in the FAC example only |
| Build, walkthrough, code review | `/bmad-build` and the rest | the `dev` folder |

## Run

There is nothing to build here. `apps/` is the same starter as in `dev`, kept so the planning skills can see the real web shell. Packages are installed once at the workshop root.

Back to the [repository README](../README.md).
