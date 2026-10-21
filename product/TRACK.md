# Product track: plan the Factor library from empty to hand-over

Workshop sample values, not real emission factors.

## What we are trying to do

We plan one capability, **Factor library (FAC)**, from an empty initiative to everything development needs: the capability PRD, the UX, the initiative, its epic and its tickets. We stop at the hand-over: no plan, no code. That is where the `dev` track starts with `/bmad-build 1.1`.

BMad is already installed and set up in this folder. The active initiative is `initiative-fac-factor-library`, and it is empty apart from its frontmatter. The master PRD and the system spine are given: they are the planning baseline that every initiative inherits.

The answer key is the same initiative, finished, in `../dev/_bmad-output/initiative-fac-factor-library/`. It is the exact input the dev and QA tracks build from. Your run will differ in wording. Compare the shape and the decisions, not the text.

You run three skills in order:

1. `/bmad-prd` turns a short brief and the client's factor list into the capability PRD, with requirement ids `FAC.FR-n`.
2. `/bmad-ux` reads the Figma design you link and turns it and the PRD into `DESIGN.md` (how it looks, shared by every screen) and `EXPERIENCE.md` (how this screen behaves), with a PNG snapshot of each Figma frame.
3. `/bmad-ticket` writes the initiative, slices it into one epic, and plans that epic's tickets in `tickets.toml`.

## How the prompts work

Each step starts with one short prompt, the way a brief looks in real work. Everything the repository already holds (the persona, the rules, the release plan) and everything Figma shows is left for the skill to read. The only data you bring is what exists nowhere else: the client's six seed factors.

The skill then asks questions, or drafts with `[ASSUMPTION]` tags. Answer from the **cheat sheet** under each step. The cheat sheet is what makes the run land on the same decisions as the answer key. At Finalize, read the assumptions it lists against the cheat sheet, and correct any that differ.

## Who decides

You do. The skills ask and capture. They do not decide the product for you. The human decision points are:

- PRD: the stakes, the working mode, how an invalid filter and an unknown id are handled, and how each `[ASSUMPTION]` is settled at Finalize.
- UX: which Figma frames are in scope and how they fit together, the tabs, that this `DESIGN.md` is the shared design for all three screens, the states Figma does not show, and whether to run the reviewer lenses.
- Tickets: how many epics, the tracer bullet, the order, and which acceptance criteria belong to ticket 1.

## Time box

About 80 minutes. The times are estimates and have not been dry run yet, because live model runs vary.

| Part | Command | Estimate | Produces |
|---|---|---|---|
| 0 Orient: the baseline and the empty initiative | none (`/bmad` optional) | 5 min | |
| 1 Capability PRD | `/bmad-prd` | 25 min | `prd-fac-factor-library/` |
| 2 UX | `/bmad-ux` | 25 min | `ux-fac-factor-library/` |
| 3 Initiative, epic and tickets | `/bmad-ticket` | 20 min | `initiative-fac-factor-library.md`, `tickets.toml`, `epic-browse-factors/` |
| 4 Wrap-up: compare with the answer key, the hand-over | none | 5 min | |

If you are behind: skip the reviewer lenses at every Finalize, and in step 3 show the answer key's `epic-browse-factors/` instead of incepting live.

## Before the session (hands-on)

Every participant runs the steps on their own machine.

- The repository setup from the main README (`scripts/setup.sh` or `scripts\setup.cmd`), with VS Code, GitHub Copilot Chat in Agent mode, and `uv`.
- A Figma account that can open the workshop Figma file. The presenter shares the file as "anyone with the link can view", or invites each participant. Everyone uses the same link.
- Check the Figma plan before the day: Figma limits how many MCP tool calls some plans and seat types get. One pull is about five to seven calls. Make sure each participant's seat allows that.

## Before you start

Open this `product` folder itself in VS Code (File > Open Folder), not the repository root. Use GitHub Copilot Chat in Agent mode. Commit or stash anything open, so each step ends in one clean commit.

```bash
uv run _bmad/scripts/resolve_config.py --project-root . --key core.active_initiative
```

It must print `initiative-fac-factor-library`.

```bash
ls -a _bmad-output/initiative-fac-factor-library
```

It must show only `initiative-fac-factor-library.md`, which holds frontmatter only.

Connect Figma once: this folder's `.vscode/mcp.json` adds the Figma MCP server (`https://mcp.figma.com/mcp`). In VS Code open the Command Palette, choose **MCP: List Servers**, then **figma**, then **Start Server**, and sign in to Figma in the browser. In Copilot Chat, Agent mode, the tools list then shows the Figma tools. Have the Figma link to hand for step 2; it is not stored in this folder.

## 0. Orient (no commands)

Open these in order and say one line about each:

1. `_bmad-output/prd-carbon-lite/prd-carbon-lite.md`: the master PRD. The problem, the persona Priya, the journey UJ-1, the release plan (FAC first), the PRD index (section 4, which already names the FAC folder and PRD path we are about to create), CLT.NFR-1 to CLT.NFR-5 that bind every capability, and the glossary.
2. `_bmad-output/architecture-carbon-lite/architecture-carbon-lite.md`: the system spine. AD-1 to AD-10. FAC is the bottom of the chain (AD-1), factors are immutable and versioned (AD-3), values are decimal strings (AD-4), lists are `{count, items}` and errors are problem+json (AD-7).
3. `_bmad-output/initiative-fac-factor-library/`: empty. That is where today's work lands.

Optional, to show the router:

```text
/bmad what should I do next?
```

It reads the store and recommends `/bmad-prd` for the active initiative.

## 1. Capability PRD

### 1.1 Start and brief it

```text
/bmad-prd
```

It greets you, checks the active initiative, detects the intent (Create) and asks for context and inputs. Paste:

```text
Create the capability PRD for FAC, the Factor library from the master PRD index.
Priya needs to see the versioned emission factors before she trusts a figure: list them, filter by scope and activity type, open one. Read only.
Read the master PRD and the system spine.

Seed factors (from the client's sheet; all source "Workshop sample", version 2026.1, valid from 2026-01-01):
EF-DIESEL-UK-2026.1, diesel, Diesel (road), litre, 2.70, scope 1
EF-PETROL-UK-2026.1, petrol, Petrol (road), litre, 2.31, scope 1
EF-NATURALGAS-UK-2026.1, natural_gas, Natural gas, kWh, 0.183, scope 1
EF-LPG-UK-2026.1, lpg, LPG, litre, 1.56, scope 1
EF-GRIDELEC-UK-2026.1, grid_electricity, Grid electricity (UK), kWh, 0.207, scope 2
EF-DISTRICTHEAT-UK-2026.1, district_heat, District heat, kWh, 0.150, scope 2
```

### 1.2 Short replies

In the order it usually asks: anything else, stakes, working mode, then Finalize when the draft is right, and the reviewers.

```text
No, that is everything.
```

```text
Internal. A workshop sample of a real product.
```

```text
Fast path
```

```text
Finalize
```

```text
Skip the reviewers
```

Fast path drafts the whole PRD with `[ASSUMPTION]` tags, which suits the time box. Choose `Coaching path` and then `Vision + Features` instead if you want to show the elicitation.

### 1.3 Cheat sheet

| If it asks or assumes | Answer |
|---|---|
| Folder or slug | `fac-factor-library`, as in the master PRD index. Frontmatter: `parent` is the master PRD path, `code: FAC` |
| An invalid scope, such as `scope=3` | 400 problem+json (CLT.NFR-3) |
| An unknown id | 404 problem+json (CLT.NFR-3) |
| A filter with no match | 200 with `count` 0 and empty `items`, not an error |
| The value type | `kgCo2ePerUnit` is a decimal string, never a number (CLT.NFR-1, AD-4) |
| The order | Label ascending, fixed. The page never re-sorts |
| The API | `GET /api/v1/factors?scope=&activityType=` and `GET /api/v1/factors/:id`. The factors service also offers `getById` and `getCurrentForActivityType` for ACT |
| The web page | A "Factor library" page with a table, a scope badge, a version chip and the "Workshop sample values" notice |
| Dependencies | None. FAC is the bottom of the chain (AD-1) |
| Non-goals | Creating, editing or deleting factors, importing factors, publishing new versions in the UI, Scope 3 |
| At Finalize, reject if assumed | Pagination, free-text search, user sorting, editing, persistence, sign-in |

The invalid-scope 400 matters later: in step 3 it is the one rule that ticket 1's criteria leave out, and in the dev track the build stops on it and the code review finds it.

### 1.4 Check the result

```bash
ls -a _bmad-output/initiative-fac-factor-library/prd-fac-factor-library
```

```bash
grep -n "FAC.FR-" _bmad-output/initiative-fac-factor-library/prd-fac-factor-library/prd-fac-factor-library.md
```

Compare with `../dev/_bmad-output/initiative-fac-factor-library/prd-fac-factor-library/prd-fac-factor-library.md`: three FRs (list, filter, detail), the data model and the seed table, the API, the web page, the non-goals, and no dependencies. Sections 0 to 9 are what this step makes. Section 10 of the answer key came later, after the tickets: see step 3.5.

```bash
git add -A . && git commit -m "docs: FAC capability PRD"
```

## 2. UX

The look comes from Figma. The skill reads the Figma file live through the Figma MCP server, writes `DESIGN.md` and `EXPERIENCE.md` from it, and keeps a frozen PNG snapshot of each frame for development. It does not draw its own mockups.

### 2.1 Start and brief it

```text
/bmad-ux
```

It scans for sources and asks for context. Paste this, with your Figma link in place of the placeholder:

```text
UX for the Factor library, from the FAC PRD. The design is in Figma: <your Figma link>
01 Home is the app shell; 02 Factor library sits inside it under Factors.
This DESIGN.md becomes the shared design the Activity entry and Footprint summary screens will inherit.
```

It lists the Figma frames and asks which are in scope. For each frame it reads the design, downloads a PNG to `ux-fac-factor-library/imports/figma/`, writes a `README.md` there with the link and the node ids, and logs each import in the memlog.

### 2.2 Short replies

In the order it usually asks: the frames, anything else, stakes, working mode, Finalize, and the visual reference.

```text
Both frames.
```

```text
No, that is everything.
```

```text
Internal
```

```text
Fast path
```

```text
Finalize
```

```text
The Figma frames are the visual reference. Do not render HTML mockups for them. Every other state is spine only.
```

Skip the reviewers if you are behind.

### 2.3 Cheat sheet

| If it asks or assumes | Answer |
|---|---|
| Folder or slug | `fac-factor-library`, so it lands in `ux-fac-factor-library/` |
| No Figma variables | Accept: take the colours, the font and the radius from the frames |
| Persona and platform | Priya Nair, not a carbon expert. Web app, desktop first, usable on a phone. Plain React, no UI system |
| The tabs (Figma draws one) | Three, as in the starter app (`apps/web/src/App.tsx`): Factors, Activities, Footprint. Figma draws only Factors because FAC is the only screen planned here. The tab state is kept in the URL hash (`#factors`) |
| Components the other screens need | A status pill (Indicative, amber), a form field with error text, a summary card with a tCO2e figure, primary and secondary buttons |
| Loading | Five grey skeleton rows. Screen reader text: "Loading factors" |
| Empty | "No factors match this filter." with a "Clear filter" button |
| Error | "We could not load the factors. Try again." with a "Try again" button |
| The factor id wraps in Figma | Keep it on one line. Below 720px the table scrolls sideways inside its card |
| The filter | A native select: All scopes, Scope 1, Scope 2. An invalid scope cannot be chosen, so the 400 is an API rule, not a UX state |
| Focus and rows | A tab switch moves focus to the page title. Table rows are not interactive in ticket 1.1 |
| Rules | Colour never carries meaning alone. Numbers are tabular and right aligned. Values are shown exactly as sent; the page never calculates |
| Accessibility | WCAG 2.2 AA, 44px targets, a visible focus ring, no animation beyond a 150ms fade, `prefers-reduced-motion` respected |
| A journey | Priya opens the Factors tab, sees the six sample factors with scope badges and version chips, filters by Scope 1 to check which fuels are direct emissions, and can then name the factor id and version behind any figure |

### 2.4 Check the result

```bash
ls -aR _bmad-output/initiative-fac-factor-library/ux-fac-factor-library
```

Open `imports/figma/README.md` and check that both frames are listed, each with its PNG beside it. If a participant's Figma pull failed, they copy `imports/figma/` from a neighbour and carry on. Compare with `../dev/_bmad-output/initiative-fac-factor-library/ux-fac-factor-library/`: the colour, type, spacing and component tokens in the `DESIGN.md` frontmatter, the components for all three screens, the three-tab nav, the state table in `EXPERIENCE.md`, and the memlog decision that this `DESIGN.md` is the shared design. The answer key has `mockups/` where your run has `imports/figma/`. That is the one intended difference.

```bash
git add -A . && git commit -m "docs: FAC UX"
```

## 3. Initiative, epic and tickets

`/bmad-ticket` works top down: the initiative's envelope, then its epics, then the selected epic's tickets.

### 3.1 Start and brief it

```text
/bmad-ticket
```

```text
Plan the FAC initiative for development: the initiative, its epics, and the first epic's tickets.
```

It reads the parent chain and the codebase, tells you what it found, and drafts the initiative envelope (Description, Outcome, Done when, Boundaries, References, Notes) and the epic set. Each decision you make becomes a dated `Decision:` line in the Notes.

### 3.2 Short replies

When it offers to plan the epic's tickets, then when the set is right:

```text
Yes, incept epic-browse-factors now.
```

```text
Approve
```

### 3.3 Cheat sheet

| If it asks or proposes something else | Answer |
|---|---|
| The initiative title | "Priya can see the versioned emission factors every figure is built on" |
| The order across initiatives | FAC first, then ACT, then FPS (AD-1) |
| How many epics | One: `epic-browse-factors`, "Priya can browse the emission factors", covering FAC.FR-1 to FAC.FR-3. One owner and one module deliver it |
| A platform-baseline epic | No. The starter is already in `apps/`, and the sample runs locally with no deployment (CLT.NFR-5) |
| What gets built | Only ticket 1.1 in the workshop. The rest stays in the backlog |
| The tickets | Two. 1 "List seeded factors" (FAC.FR-1 and FAC.FR-2), the tracer bullet: the thinnest path from the seeded repository through the API to the table on the Factors tab. 2 "Factor detail by id" (FAC.FR-3), after ticket 1, because it reuses the repository, the service and the `Factor` type |
| Ticket 1's criteria | Lettered (a) to (g), because the build, the tests and the review refer to them by letter: (a) the six factors in label order with `count` 6, (b) the nine fields with `kgCo2ePerUnit` as a string, (c) the scope filter, (d) the activityType filter, (e) a filter with no match, (f) seeding twice gives no duplicates, (g) the Factor library page with the scope badge, the version chip and the notice |
| The invalid-scope 400 | Leave it out of (a) to (g), to match the dev track. Point it out: FAC.FR-2 requires it, the criteria do not, and in the dev track `/bmad-build 1.1` stops on that gap and `/bmad-code-review` finds it |
| A closing end-to-end suite or a refactor story | Decline. QA adds tests in the QA track |

It writes `initiative-fac-factor-library.md`, the initiative's `tickets.toml` with one `[[epic]]`, the folder `epic-browse-factors/` with its envelope and criteria, and `epic-browse-factors/tickets.toml` with the two entries. No ticket file is written: an entry is pulled into a file only on demand.

### 3.4 Check the result

```bash
uv run _bmad/method/scripts/tickets.py --project-root . status
```

It lists epic 1 with entries 1 and 2 in state `planned`, and entry 1 ready to build.

```bash
git add -A . && git commit -m "docs: FAC initiative, epic and tickets"
```

### 3.5 Optional: bring the PRD and the UX up to date

The answer key has two touches made after the tickets. Skip them if time is short.

- `/bmad-prd`, intent Update on the FAC PRD: `Add section 10, Ticket acceptance criteria: ticket 1.1 criteria (a) to (g) in Given/When/Then form, and ticket 1.2's three criteria.` The ticket entries are pulled into files only on demand, so the criteria are kept in the PRD in the form a pulled ticket would carry.
- `/bmad-ux`, intent Update: `Name stories 1.1 and 1.2 from epic-browse-factors/tickets.toml in EXPERIENCE.md.`

## 4. Wrap-up: the hand-over

Compare the whole run with the answer key:

```bash
diff -rq ../dev/_bmad-output/initiative-fac-factor-library _bmad-output/initiative-fac-factor-library
```

Every file the answer key has should exist here too, with these intended differences:

- `ux-fac-factor-library/imports/figma/` (the Figma snapshot) instead of `ux-fac-factor-library/mockups/` (the answer key's drawn prototype). The epic's design reference points at the Figma snapshot.
- A PRD `.memlog.md`, and maybe a `.working/` folder, that the answer key does not have.
- No links to the ACT and FPS design folders in `DESIGN.md`, because those folders are not in this copy.
- Section 10 of the PRD and the story ids in `EXPERIENCE.md` only if you ran step 3.5.

The text differs. The shape and the decisions should not.

Then show the hand-over line. Everything above it is product work and is now in the repository. Everything below it is the dev and QA tracks:

- `/bmad-build 1.1` in the `dev` folder reads `epic-browse-factors/tickets.toml` entry 1, the epic, the PRD, the spine and the UX, and plans the code.
- `/bmad-walkthrough` and `/bmad-code-review`, then the TEA steps in the `qa` folder.

## What to check

- PRD: `prd-fac-factor-library/prd-fac-factor-library.md` exists with `status: final`, `parent:` set to the master PRD and `code: FAC`. It has FAC.FR-1 to FAC.FR-3 with acceptance notes, including the 400 for an invalid scope and the 404 for an unknown id, and the six seed factors exactly as given. It cites CLT.NFR and AD ids rather than restating them, and it names the non-goals.
- UX: `ux-fac-factor-library/` holds `ux-fac-factor-library.md`, `DESIGN.md` with the colour, type, spacing and component tokens, `EXPERIENCE.md` with the IA (the shell with three tabs, the Factor library under Factors), the states and the key flow, and `imports/figma/` with a PNG per frame and a README with the link and the node ids. `.memlog.md` names the Figma link as the visual source and records that this is the shared design.
- Tickets: `initiative-fac-factor-library.md` is filled in with Outcome, Done when, Boundaries, References and dated `Decision:` lines. The initiative's `tickets.toml` has one epic. `epic-browse-factors/` has the epic envelope with criteria (a) to (g) and a `tickets.toml` with two entries, 1 before 2.
- Nothing outside `_bmad-output/initiative-fac-factor-library/` changed. The master PRD and the spine are as they were.
- No `*-plan.md`, no ticket files and nothing new in `apps/`.

## If you are stuck

Copy the matching file from `../dev/_bmad-output/initiative-fac-factor-library/` and say "this is what it produces". Then move on to the next step: each skill reads the files the step before it wrote, whoever wrote them.

To start again from empty, find the commit before your first `docs: FAC` commit and reset to it. This discards the demo commits:

```bash
git log --oneline -5
git reset --hard <the commit before "docs: FAC capability PRD">
```

Back to the [README](README.md) or the [repository README](../README.md).
