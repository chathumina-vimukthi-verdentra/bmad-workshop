# Product track: plan the Factor library from empty to hand-over

Workshop sample values, not real emission factors.

## What we are trying to do

We plan one capability, **Factor library (FAC)**, from an empty initiative to everything development needs: the capability PRD, the UX, the initiative, its epic and its tickets. We stop at the hand-over: no plan, no code. That is where the `dev` track starts with `/bmad-build 1.1`.

BMad is already installed and set up in this folder. The active initiative is `initiative-fac-factor-library`, and it is empty apart from its frontmatter. The master PRD and the system spine are given: they are the planning baseline that every initiative inherits.

The answer key is the same initiative, finished, in `../dev/_bmad-output/initiative-fac-factor-library/`. It is the exact input the dev and QA tracks build from. Your run will differ in wording. Compare the shape and the decisions, not the text.

You run three skills in order:

1. `/bmad-prd` turns a brain dump into the capability PRD, with requirement ids `FAC.FR-n`.
2. `/bmad-ux` reads the Figma design you link and turns it and the PRD into `DESIGN.md` (how it looks, shared by every screen) and `EXPERIENCE.md` (how this screen behaves), with a PNG snapshot of each Figma frame.
3. `/bmad-ticket` writes the initiative, slices it into one epic, and plans that epic's tickets in `tickets.toml`.

## Who decides

You do. The skills ask and capture. They do not decide the product for you. The human decision points are:

- PRD: what the factor library is and is not, the stakes, the working mode, how an invalid filter is handled, and how each open question and `[ASSUMPTION]` is settled at Finalize.
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

If you are behind: choose the Fast path in steps 1 and 2, skip the reviewer lenses at every Finalize, and in step 3 show the answer key's `epic-browse-factors/` instead of incepting live.

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

Connect Figma once: this folder's `.vscode/mcp.json` adds the Figma MCP server (`https://mcp.figma.com/mcp`). In VS Code open the Command Palette, choose **MCP: List Servers**, then **figma**, then **Start Server**, and sign in to Figma in the browser. In Copilot Chat, Agent mode, the tools list then shows the Figma tools. The account must be able to open the Figma file. Have the Figma link to hand for step 2; it is not stored in this folder.

## 0. Orient (no commands)

Open these in order and say one line about each:

1. `_bmad-output/prd-carbon-lite/prd-carbon-lite.md`: the master PRD. The problem, the persona Priya, the journey UJ-1, the release plan (FAC first), the PRD index (section 4, which already names the FAC folder and PRD path we are about to create), CLT.NFR-1 to CLT.NFR-5 that bind every capability, and the glossary.
2. `_bmad-output/architecture-carbon-lite/architecture-carbon-lite.md`: the system spine. AD-1 to AD-10. FAC is the bottom of the chain (AD-1), factors are immutable and versioned (AD-3), values are decimal strings (AD-4), lists are `{count, items}` and errors are problem+json (AD-7).
3. `_bmad-output/initiative-fac-factor-library/`: empty. That is where today's work lands.

Optional, to show the router: in the assistant chat type `/bmad` and ask `What should I do next?`. It reads the store and recommends `/bmad-prd` for the active initiative.

## 1. Capability PRD

### 1.1 Start (assistant chat)

```text
/bmad-prd
```

It greets you, checks the active initiative and detects the intent: Create.

### 1.2 Give it the brain dump

It asks for context and inputs first. Paste this:

```text
Create the capability PRD for FAC, the Factor library. Use the slug fac-factor-library, so it lands in prd-fac-factor-library/. In the frontmatter set parent to the master PRD path and code to FAC.

Inputs to read:
- the master PRD, _bmad-output/prd-carbon-lite/prd-carbon-lite.md (it binds this PRD: cite CLT.NFR ids, use its glossary, do not restate it)
- the system spine, _bmad-output/architecture-carbon-lite/architecture-carbon-lite.md (cite AD ids, do not restate them)

Brain dump:
Priya Nair, sustainability lead at Nair Logistics, will not trust a footprint until she can see which emission factors sit behind it: what each one says, its scope, its version and its source. The factor library is step 1 of UJ-1 and the bottom of the chain: ACT and FPS read factors from it. In Carbon Hub it maps to the real modules D6 and D7. The code lives in module factors.

It is read only. Three things:
- list all factors, ordered by label
- filter the list by scope (1 or 2) and by activity type
- open one factor by its id

A factor has: id, activityType, label, unit (litre or kWh), kgCo2ePerUnit, scope, source, version, validFrom.

Seed six factors in memory, with fixed ids, so seeding twice gives no duplicates. All have source "Workshop sample", version 2026.1, validFrom 2026-01-01:
EF-DIESEL-UK-2026.1, diesel, Diesel (road), litre, 2.70, scope 1
EF-PETROL-UK-2026.1, petrol, Petrol (road), litre, 2.31, scope 1
EF-NATURALGAS-UK-2026.1, natural_gas, Natural gas, kWh, 0.183, scope 1
EF-LPG-UK-2026.1, lpg, LPG, litre, 1.56, scope 1
EF-GRIDELEC-UK-2026.1, grid_electricity, Grid electricity (UK), kWh, 0.207, scope 2
EF-DISTRICTHEAT-UK-2026.1, district_heat, District heat, kWh, 0.150, scope 2

API: GET /api/v1/factors with the scope and activityType filters, and GET /api/v1/factors/:id. ACT will also need getById and getCurrentForActivityType through the factors service.
Web: a "Factor library" page with a table, a scope badge, a version chip and a "Workshop sample values" notice.

Not in: creating, editing or deleting factors, importing factors, publishing new versions through the UI, Scope 3.
```

When it asks "anything else?", answer:

```text
No, that is everything.
```

### 1.3 Stakes and working mode

When it asks about stakes:

```text
Internal. A workshop sample of a real product.
```

When it offers the working mode, choose one:

```text
Fast path
```

Fast path drafts the whole PRD with `[ASSUMPTION]` tags, which suits the time box. Choose `Coaching path` and then `Vision + Features` if you have time and want to show the elicitation. FAC is a capability for one persona with no real journey of its own, so Vision + Features fits better than Journey-led.

### 1.4 The decisions to expect

A careful skill raises these as questions or as `[ASSUMPTION]` tags. If it does not, ask:

```text
What does the spine and the master PRD decide for us here, and what is still open?
```

- **An invalid filter.** What happens on `scope=3`? Answer: reject it with a 400 problem+json (CLT.NFR-3). This becomes an acceptance note of FAC.FR-2. Remember it: in step 3 it is the one rule that ticket 1's criteria leave out, and in the dev track the build stops on it and the code review finds it.
- **An unknown id.** Answer: 404 problem+json (CLT.NFR-3).
- **The value type.** `kgCo2ePerUnit` is a decimal string, never a number (CLT.NFR-1, AD-4).
- **The order.** Label ascending, fixed. The web page never re-sorts.
- **No match.** A filter that matches nothing returns `count` 0 and empty `items`, not an error (AD-7).
- **Dependencies.** None. FAC is the bottom of the chain (AD-1). Do not let the PRD design the ACT side.

### 1.5 Finalize

Say when the draft is right:

```text
Finalize
```

It walks the memlog, reconciles your inputs, offers reviewers, and triages the open items one at a time. For each `[ASSUMPTION]`, accept, change or defer it. For the reviewers, in a hurry:

```text
Skip the reviewers
```

At the end the PRD has `status: final`.

### 1.6 Check the result

```bash
ls -a _bmad-output/initiative-fac-factor-library/prd-fac-factor-library
```

```bash
grep -n "FAC.FR-" _bmad-output/initiative-fac-factor-library/prd-fac-factor-library/prd-fac-factor-library.md
```

Compare with `../dev/_bmad-output/initiative-fac-factor-library/prd-fac-factor-library/prd-fac-factor-library.md`: three FRs (list, filter, detail), the data model and the seed table, the API, the web page, the non-goals, and no dependencies. Sections 0 to 9 are what this step makes. Section 10 of the answer key came later, after the tickets: see step 3.6.

```bash
git add -A . && git commit -m "docs: FAC capability PRD"
```

## 2. UX

The look comes from Figma. The skill reads the Figma file live through the Figma MCP server, writes `DESIGN.md` and `EXPERIENCE.md` from it, and keeps a frozen PNG snapshot of each frame for development. It does not draw its own mockups. Nothing about the Figma file is stored in this folder before the run: you pass the link in the chat.

### 2.1 Start (assistant chat)

```text
/bmad-ux
```

### 2.2 Give it the Figma link, the sources and the brain dump

It scans for sources and lists their paths. Confirm the FAC PRD and the master PRD, then paste this with your Figma link in place of the placeholder:

```text
Use the slug fac-factor-library, so it lands in ux-fac-factor-library/.

Sources: the FAC PRD and the master PRD.

The design is in Figma: <your Figma link>
Pull it in with the Figma creative tool. Frame 01 Home is the app shell: the header with the tab nav and the footer notice. Frame 02 Factor library is the screen that sits inside it, under the Factors tab.

What Figma does not show:
- This DESIGN.md is the shared design for all of Carbon Hub Lite. FAC is built first, so it lives here, and the ACT (Record activity) and FPS (Footprint summary) screens will inherit it. Beyond what Figma draws, it needs the components those screens use: a status pill (Indicative, amber), a form field with error text, a summary card with a figure in tCO2e, and primary and secondary buttons.
- One persona, Priya Nair, sustainability lead at a small UK haulage firm, not a carbon expert. Web app, desktop first, usable on a phone. Plain React, no UI system.
- Colour never carries meaning alone: every badge and pill has text. Numbers are tabular and right aligned.
- The screen shows values exactly as the API sends them. It never calculates and never re-sorts.
- Accessibility: WCAG 2.2 AA, 44px targets, a visible focus ring, no animation beyond a short fade.
```

It lists the frames it found and asks which are in scope. Answer:

```text
Both frames.
```

For each frame it reads the design, downloads a PNG to `ux-fac-factor-library/imports/figma/`, writes a `README.md` there with the link and the node ids, and logs each import in the memlog. The Figma file has no variables, so it tells you it takes the colours, the font and the radius from the frames, and logs that as an assumption. Accept it.

When it asks "anything else?", answer:

```text
No, that is everything.
```

### 2.3 Stakes and working mode

```text
Internal
```

```text
Fast path
```

The Coaching path shows the creative tools (colour themes, design directions, wireframes). The look comes from Figma here, so the time is better spent on the states and the shared design.

If it asks for a journey, narrate one:

```text
Priya opens Carbon Hub Lite on the Factors tab. She sees the six sample factors, each with a scope badge and a version chip, and reads the sample values notice. She filters by Scope 1 to check which fuels are direct emissions. The climax: she can name the factor id and version behind any figure she sees later.
```

### 2.4 The decisions to expect

Let the skill raise these, and decide each one live. If it does not, ask: `Does the Figma design conflict with the PRD or the starter app, and what does it not show?`

- **The tabs.** Figma draws one tab, Factors. The web starter (`apps/web/src/App.tsx`) already has three: Factors, Activities and Footprint. Answer: the shared tab nav has all three tabs. Figma draws only Factors because FAC is the only screen planned here. The tab state is kept in the URL hash (`#factors`).
- **The states.** Figma shows only the loaded table. Answer: five grey skeleton rows while loading; "No factors match this filter." with a "Clear filter" button when empty; an error banner "We could not load the factors. Try again." with a "Try again" button.
- **The factor id.** In Figma the mono id under each factor label wraps onto two lines. Answer: the id stays on one line, and below 720px the table scrolls sideways inside its card.
- **The filter.** A native select (All scopes, Scope 1, Scope 2). An invalid scope cannot be chosen from the screen, so the 400 from step 1 is an API rule, not a UX state.

### 2.5 Finalize

```text
Finalize
```

When it asks which screens need a visual reference, answer:

```text
The Figma frames are the visual reference. Do not render HTML mockups for them. Every other state is spine only.
```

Skip the reviewers if you are behind. At the end `DESIGN.md` and `EXPERIENCE.md` have `status: final`. They cite the Figma link and the node ids at the matching sections, link the PNGs in `imports/figma/`, and say once that the spines win on conflict.

### 2.6 Check the result

```bash
ls -aR _bmad-output/initiative-fac-factor-library/ux-fac-factor-library
```

Open `imports/figma/README.md` and check that both frames are listed, each with its PNG beside it. Compare with `../dev/_bmad-output/initiative-fac-factor-library/ux-fac-factor-library/`: the colour, type, spacing and component tokens in the `DESIGN.md` frontmatter, the components for all three screens, the three-tab nav, the state table in `EXPERIENCE.md`, and the memlog decision that this `DESIGN.md` is the shared design. The answer key has `mockups/` where your run has `imports/figma/`. That is the one intended difference.

```bash
git add -A . && git commit -m "docs: FAC UX"
```

## 3. Initiative, epic and tickets

`/bmad-ticket` works top down: the initiative's envelope, then its epics, then the selected epic's tickets. Run it twice.

### 3.1 Write the initiative and slice it into epics (assistant chat)

```text
/bmad-ticket
```

```text
Author the initiative initiative-fac-factor-library and slice it into epics.
Its requirement source is the FAC PRD. Its constraints are the master PRD (CLT.NFR-1 to CLT.NFR-5) and the system spine (AD-1 to AD-10). Its design is the FAC UX folder.
Title it from Priya's point of view: "Priya can see the versioned emission factors every figure is built on".
```

It reads the parent chain and the codebase, tells you what it found, and drafts the envelope: Description, Outcome, Done when, Boundaries, References and Notes.

### 3.2 The decisions to expect at initiative level

Answer each as it comes up. Each answer becomes a dated `Decision:` line in the initiative's Notes.

- **Order across initiatives.** FAC first, because ACT and FPS depend on it (AD-1). Then ACT, then FPS.
- **How many epics.** One: `epic-browse-factors`, "Priya can browse the emission factors", covering FAC.FR-1 to FAC.FR-3. One owner and one module deliver the whole capability.
- **A platform-baseline epic.** No. The scaffold, the test setup and the web shell are already in `apps/` as the starter, and the sample runs locally with no deployment (CLT.NFR-5).
- **What the workshop builds.** Only epic 1, ticket 1. The rest stays in the backlog.

Confirm the envelope and the epic set. It writes `initiative-fac-factor-library.md`, the initiative's `tickets.toml` with one `[[epic]]`, and the folder `epic-browse-factors/` with its envelope.

### 3.3 Plan the epic's tickets

If it offers to incept the epic now, say yes. Otherwise, in the same chat:

```text
Incept epic-browse-factors.
```

It proposes tickets in build order. The answer key has two:

1. **List seeded factors** (FAC.FR-1 and FAC.FR-2). The tracer bullet: the thinnest path from the seeded repository through the API to the table on the Factors tab.
2. **Factor detail by id** (FAC.FR-3). After ticket 1, because it reuses the repository, the service and the `Factor` type.

With only two entries it does not add a "Refactor sweep" story. If it offers a closing end-to-end suite, decline it: QA adds tests in the QA track.

### 3.4 Agree ticket 1's acceptance criteria

Ask it to letter them, because the build, the tests and the review refer to them by letter:

```text
Write ticket 1's acceptance criteria in the epic, lettered (a) to (g): (a) the six factors in label order with count 6, (b) the nine fields with kgCo2ePerUnit as a string, (c) the scope filter, (d) the activityType filter, (e) a filter with no match, (f) seeding twice gives no duplicates, (g) the Factor library page with the scope badge, the version chip and the notice.
```

This is the moment to point out what is **not** in the list: the invalid-scope 400 from step 1.4. FAC.FR-2 requires it, but criteria (a) to (g) do not mention it. The answer key leaves it out on purpose. In the dev track, `/bmad-build 1.1` stops on that gap as an open question, and `/bmad-code-review` finds it. Either keep it out to match the dev track, or add it as (h) and say that the dev track then has one less thing to find.

Approve the set. It writes `epic-browse-factors/tickets.toml` with the two entries. No ticket file is written: an entry is pulled into a file only on demand.

### 3.5 Check the result

```bash
uv run _bmad/method/scripts/tickets.py --project-root . status
```

It lists epic 1 with entries 1 and 2 in state `planned`, and entry 1 ready to build.

```bash
ls -aR _bmad-output/initiative-fac-factor-library
```

```bash
git add -A . && git commit -m "docs: FAC initiative, epic and tickets"
```

### 3.6 Optional: bring the PRD and the UX up to date

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
- Section 10 of the PRD and the story ids in `EXPERIENCE.md` only if you ran step 3.6.

The text differs. The shape and the decisions should not.

Then show the hand-over line. Everything above it is product work and is now in the repository. Everything below it is the dev and QA tracks:

- `/bmad-build 1.1` in the `dev` folder reads `epic-browse-factors/tickets.toml` entry 1, the epic, the PRD, the spine and the UX, and plans the code.
- `/bmad-walkthrough` and `/bmad-code-review`, then the TEA steps in the `qa` folder.

## What to check

- PRD: `prd-fac-factor-library/prd-fac-factor-library.md` exists with `status: final`, `parent:` set to the master PRD and `code: FAC`. It has FAC.FR-1 to FAC.FR-3 with acceptance notes, including the 400 for an invalid scope and the 404 for an unknown id. It cites CLT.NFR and AD ids rather than restating them, and it names the non-goals.
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
