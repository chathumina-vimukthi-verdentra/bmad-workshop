# Carbon Hub Lite: BMad workshop for developers and QA

A hands-on session where you use the BMad Method and the Test Architect module (TEA) with GitHub Copilot in VS Code. You work on a small slice of Carbon Hub, called Carbon Hub Lite. Run by Verdentra for Veriforce developers and QA.

All emission factor numbers in this workshop are fictional sample values, not real emission factors.

## What it is

Carbon Hub Lite lets a member record fuel and electricity use for a site and a reporting period, and see an indicative footprint. In this workshop the work is ticket 1.1: listing the seeded emission factors (API and web page). BMad and TEA are already installed and set up. There is nothing to install by hand in the session.

## The session: one presenter, two hours

One presenter runs the session and the steps run one after another. Developers do steps 1 to 3 and QA watch. QA do steps 4 to 6 and developers watch. The `qa` folder starts with ticket 1.1 already built and reviewed, so QA never waits on anything. The times below are estimates, because live model runs vary.

| Clock | Part | Who does it | Folder | Minutes |
|---|---|---|---|---|
| 0:00 to 0:10 | Welcome and context | everyone | | 10 |
| 0:10 to 0:40 | 1 Build: `/bmad-build 1.1` | Developers | `dev` | 30 |
| 0:40 to 0:50 | 2 Walkthrough: `/bmad-walkthrough` | Developers | `dev` | 10 |
| 0:50 to 1:08 | 3 Code review: `/bmad-code-review` | Developers | `dev` | 18 |
| 1:08 to 1:16 | 4 TEA Framework: `/bmad-tea-framework` | QA | `qa` | 8 |
| 1:16 to 1:24 | 5 TEA Test design: `/bmad-tea-test-design` | QA | `qa` | 8 |
| 1:24 to 1:38 | 6 TEA Automate: `/bmad-tea-automate` | QA | `qa` | 14 |
| 1:38 to 1:46 | Wrap-up and questions | everyone | | 8 |
| 1:46 to 2:00 | Reserve | | | 14 |

Planned time is 106 minutes plus a 14 minute reserve. The two hours are a hard limit. Read `TRACK.md` in your folder: `dev/TRACK.md` or `qa/TRACK.md`.

Each track has one reference folder: `reference/dev-finished` and `reference/qa-finished`. They are read-only guides to compare with, or to copy files from if you are stuck. Do not open them as your workspace.

### If you are behind

Cut in this order:

1. Walkthrough: show the reference walkthrough (in `reference/dev-finished`) instead of running it.
2. Code review: run it to the triage list, then apply the reference patch.
3. TEA Test design: read the reference test design (in `reference/qa-finished`) instead of running it.

## Product track (separate demo)

`product` is a planning-only copy of `dev`. It keeps the master PRD and the system spine, and empties the Factor library initiative (`initiative-fac-factor-library`) back to its frontmatter. The demo runs `/bmad-prd`, `/bmad-ux` and `/bmad-ticket` to plan it again from empty, and stops at the hand-over to `/bmad-build 1.1` in `dev`. The finished plan in `dev` is the answer key. Read `product/TRACK.md`.

## Open the right folder

In VS Code use File > Open Folder and choose `dev`, `qa` or `product` itself. Do not open the repository root. The BMad skills are found in the folder you open, so opening the root hides them.

## Before the session (once)

Clone or unzip the repository to a short path such as `C:\bmad` or `~/bmad`, open a terminal in that folder and run one command:

```bash
./scripts/setup.sh
```

On Windows, in cmd or PowerShell:

```bat
scripts\setup.cmd
```

It checks your tools, installs the packages once at the repository root, installs the Playwright browser and runs a smoke test. It finishes with "Ready. Open dev or qa in VS Code." You can run it again at any time. It skips what is done. It never installs a tool for you: if one is missing it says how to get it. See `PREWORK.md` for the message sent before the session.

After that you never run `npm install` in `dev` or `qa`. They use the shared install one level up, so keep them inside this repository folder.

### Prerequisites

- Node 20 or later (Node 24 LTS recommended) and npm
- git, with your name and email configured (needed for the commits you make)
- uv (a Python tool runner, used by the BMad skills and scripts)
- VS Code with GitHub Copilot Chat, and Copilot access, in Agent mode
- About 1 GB of free disk space

Windows: run the bash scripts in Git Bash or WSL, or use `scripts\setup.cmd` for the setup.

## Git

This is one git repository with its history. Use it as it is. Do not copy `dev` or `qa` into another git repository. Your own commits go into this repository, using your own git name and email, and nothing is pushed. If you share the workshop as a zip, the zip keeps the `.git` folder.

## Optional: how BMad and TEA were installed

`INSTALL.md` shows the install and setup commands and the 13 TEA answers. It is a demo and slide topic, not part of the exercise.

## The scripts

| Script | What it does |
|---|---|
| `scripts/setup.sh` (or `scripts\setup.cmd`) | Once, before the session: checks tools, installs packages and the browser, runs a smoke test |
| `scripts/verify.sh <folder>` | Runs `npm test` in the folder and prints `PASS` or `FAIL` |
| `scripts/check-install.sh <folder>` | Compares each skill's hash in the folder's `skills-lock.json` with `scripts/baseline-skills-lock.json` and prints `OK` or the skills that drifted |
| `scripts/maintainers/pack.sh` | For the presenter: zips the repository, with `.git`, without `node_modules` |

From the repository root: `./scripts/verify.sh dev`. From inside a track folder: `../scripts/verify.sh .`.

## Folder map

```text
README.md        this file
PREWORK.md       the message to send before the session
INSTALL.md       optional appendix: how BMad and TEA were installed
package.json     the shared install (with package-lock.json); node_modules appears here
dev/             Developer track: ticket 1.1 planned, not built
qa/              QA track: ticket 1.1 built and reviewed
product/         Product track: plan the Factor library from empty to its tickets
reference/       dev-finished and qa-finished, read-only guides
scripts/         setup, verify, check-install, baseline lock, maintainers/
```

## Inputs, not exercises

The product documents are provided. They are product and business analysis work that is already done: the master PRD, the system spine (the architecture decisions AD-1 to AD-10), the three capability PRDs with their epics and tickets, and one UX folder per initiative with a clickable prototype. You read them. You do not create them. There is no architecture step. They live in `_bmad-output/` in each track folder.

## The reference output is a guide

The reference output shows what good looks like. It was measured in a real run, but your own run will differ in wording, structure, file details and sometimes in the numbers. That is normal. Compare the shape and the decisions, not the exact text.
