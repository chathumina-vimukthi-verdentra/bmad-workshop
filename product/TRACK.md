# Product track

Workshop sample values, not real emission factors.

## What we are trying to do

We plan the first capability, FAC Factor library, from an empty initiative to the point where development can start. BMad is already installed and set up in this folder, and the active initiative is `initiative-fac-factor-library`. It is empty: the master PRD and the system spine are the only planning documents. You run three commands in order. `/bmad-prd` turns a short brief into the capability PRD. `/bmad-ux` reads the design from Figma and writes how the product looks (`DESIGN.md`) and how the screen behaves (`EXPERIENCE.md`). `/bmad-ticket` turns both into an initiative, an epic and the tickets that development builds from. The plan ends at ticket 1.1, which is where the developer track starts.

## Who decides

You do. The skills read what already exists, ask about the rest, and record each decision. The human decision points are:

- PRD: the stakes and the working mode, how invalid input is handled, and each assumption the draft makes.
- UX: which Figma frames are in scope, the navigation, the states the design does not show, and the shared design that later screens inherit.
- Tickets: how the work is split into epics and tickets, the first ticket to build, and its acceptance criteria.

## Time box

80 minutes: PRD 25, UX 25, tickets 20, orientation and hand-over 10. The skills do the writing. Your time goes to deciding and reading. The times are estimates, because live model runs vary.

| Command | Estimate |
|---|---|
| `/bmad-prd` | 25 min |
| `/bmad-ux` | 25 min |
| `/bmad-ticket` | 20 min |

## Before you start

Open this `product` folder itself in VS Code (File > Open Folder), not the repository root. Use GitHub Copilot Chat in Agent mode. Setup was done once for the whole workshop (see the README at the repository root). The working tree must be clean. Your own commits use your own git name and email.

Connect Figma once. This folder's `.vscode/mcp.json` adds the Figma MCP server. In VS Code open the Command Palette, choose **MCP: List Servers**, then **figma**, then **Start Server**, and sign in to Figma in the browser. Your Figma account needs view access to the workshop Figma file. Keep the file's link to hand for step 6.

Check the starting point:

```bash
uv run _bmad/scripts/resolve_config.py --project-root . --key core.active_initiative
```

It prints `initiative-fac-factor-library`. The folder `_bmad-output/initiative-fac-factor-library/` holds only `initiative-fac-factor-library.md`, with its frontmatter.

Read the two planning documents the skills build on:

- `_bmad-output/prd-carbon-lite/prd-carbon-lite.md`: the master PRD. The persona Priya, the journey UJ-1, the release plan, the PRD index and CLT.NFR-1 to CLT.NFR-5.
- `_bmad-output/architecture-carbon-lite/architecture-carbon-lite.md`: the system spine, AD-1 to AD-10.

## Commands

### 1. PRD: start (assistant chat)

```text
/bmad-prd
```

It checks the active initiative, sees that no PRD exists, and asks for your context and inputs.

### 2. PRD: give it the brief

```text
Create the capability PRD for FAC, the Factor library from the master PRD index.
Use the path from the index: prd-fac-factor-library/, code FAC, parent the master PRD.
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

The brief is short on purpose. The persona, the rules and the release plan are already in the master PRD and the spine, and the skill reads them. The seed factors are the one input that exists nowhere else. When it asks whether there is anything else:

```text
No, that is everything.
```

### 3. PRD: stakes and working mode

```text
Internal. A workshop sample of a real product.
```

```text
Fast path
```

Fast path drafts the whole PRD at once and marks each inference as an `[ASSUMPTION]` for you to settle. The Coaching path walks the sections with you instead.

Before it drafts, Fast path asks its open questions in one go. The decision to look for is invalid input. Answer:

```text
An invalid scope is rejected with 400 problem+json and an unknown id returns 404 problem+json, as CLT.NFR-3 requires. An activity type that matches nothing returns 200 with count 0. The two filters combine. It is a page on the Factors tab plus the API, and it is step 1 of UJ-1. The table shows the label and id, activity type, unit, value, scope, version and valid from; the source shows when you open one factor.
```

Why: the spine says how errors look, but only the PRD can say which requests are errors.

### 4. PRD: finalize

Read the draft and its assumptions. When the draft is right:

```text
Finalize
```

It walks the decision log, checks the draft against your inputs, offers reviewers and settles the open items. Reply in turn:

```text
All captured.
```

```text
Skip the reviewers
```

```text
Accept the assumptions.
```

A short polish pass still runs after the reviewers are skipped. It tidies the structure and the wording, and then sets `status: final`.

### 5. PRD: check the result

```bash
grep -n "FAC.FR-" _bmad-output/initiative-fac-factor-library/prd-fac-factor-library/prd-fac-factor-library.md
```

```bash
git add -A . && git commit -m "docs: FAC capability PRD"
```

### 6. UX: start and give it the design (assistant chat)

```text
/bmad-ux
```

It lists the planning documents it found. Reply with the brief and your Figma link:

```text
UX for the Factor library, from the FAC PRD. Use ux-fac-factor-library as the folder. The master PRD and the system spine also apply.
The design is in Figma: <Figma link>
01 Home is the app shell; 02 Factor library sits inside it under Factors.
This DESIGN.md becomes the shared design the Activity entry and Footprint summary screens will inherit.
```

It reads the Figma file through the Figma MCP server and lists the frames. Choose:

```text
Both frames.
```

For each frame it reads the layout, the text and the styles, and saves a PNG snapshot to `ux-fac-factor-library/imports/figma/` with a README that records the link and the frame ids. The snapshot is what development receives if they have no Figma access. When it asks whether there is anything else, and then notes that the file has no Figma variables:

```text
No, that is everything.
```

```text
No Figma variables is fine: take the colours, font and radius from the frames.
```

### 7. UX: stakes and working mode

```text
Internal
```

```text
Fast path
```

### 8. UX: settle what the design does not show

A design file shows the screens, not every rule behind them. Expect two sets of questions.

First, every place the design disagrees with the app or the PRD. The main one is navigation: Figma draws one tab, Factors, while the web app already has three. Keep all three: Figma draws only Factors because it is the only screen planned so far. Answer the set with:

```text
Keep all three tabs, Factors, Activities and Footprint, inside the navy header as in Figma. Keep the factor id on one line; below 720px the table scrolls sideways in its card. No Source column: the source shows when you open one factor. The organisation name and avatar are static text, with no sign-in. The amber notice on the page is the required one, and the footer line stays. The v before the version is display only.
```

Second, what the design does not show: the states, the components the later screens need, and how the page behaves. Answer with:

```text
Priya Nair, not a carbon expert. Desktop first, usable on a phone, plain React. The tab state is in the URL hash, and a tab switch moves focus to the page title. Loading shows five skeleton rows. Empty says "No factors match this filter." with a Clear filter button. An error says "We could not load the factors. Try again." with a Try again button. The shared design adds a status pill, a form field with error text, a summary card and buttons for the next two screens. Pick error and focus colours that pass WCAG 2.2 AA. WCAG 2.2 AA, 44px targets, a visible focus ring, fades of 150ms at most, reduced motion respected. Journey: Priya opens Factors, sees the six factors, filters to Scope 1, and can name the factor id and version behind any figure.
```

### 9. UX: finalize

```text
Finalize
```

Then, in turn:

```text
Skip the reviewers
```

```text
Accept the assumptions.
```

When it asks which screens need a visual reference:

```text
The Figma frames are the visual reference. Do not render HTML mockups for them. Every other state is spine only.
```

### 10. UX: check the result

```bash
ls -R _bmad-output/initiative-fac-factor-library/ux-fac-factor-library
```

Open `imports/figma/README.md` and check that both frames are listed with their PNGs.

```bash
git add -A . && git commit -m "docs: FAC UX"
```

### 11. Tickets: start (assistant chat)

```text
/bmad-ticket
```

```text
Plan the FAC initiative for development: the initiative, its epics, and the first epic's tickets.
Title: "Priya can see the versioned emission factors every figure is built on". One epic, epic-browse-factors, for FAC.FR-1 to FAC.FR-3. No platform epic: the starter is in apps/. The workshop builds only ticket 1.1. No tracker: the repository is the store.
```

It reads the PRD, the UX, the spine and the codebase, and tells you what it found. When it asks what is wrong or missing:

```text
Nothing missing.
```

If it raises that the design differs from the starter app's styles:

```text
The UX governs the page. Ticket 1.1 updates the stylesheet.
```

### 12. Tickets: agree the epic

It drafts the initiative: its outcome, when it is done, its boundaries and the epics. Check that it proposes one epic, `epic-browse-factors`, covering FAC.FR-1 to FAC.FR-3. Why: one owner and one module deliver the whole capability, so a second epic adds coordination without adding value. Each decision is recorded with its date in the initiative's notes. When it offers to plan the epic now:

```text
Yes, incept epic-browse-factors now.
```

### 13. Tickets: agree the tickets

Check that it proposes two tickets in this order:

1. List seeded factors (FAC.FR-1 and FAC.FR-2): the thinnest path from the seeded data through the API to the table on the Factors tab.
2. Factor detail by id (FAC.FR-3): after ticket 1, because it reuses the same data, service and types.

The entries carry a description and a check, not full acceptance criteria. Ticket 1's criteria belong in the epic, lettered (a) to (g), because the build, the tests and the review refer to them by letter. Say:

```text
Put ticket 1's acceptance criteria in the epic's Requirements, lettered (a) to (g): the six factors in label order, the nine fields with kgCo2ePerUnit as a string, the scope filter, the activityType filter, a filter with no match, seeding twice gives no duplicates, and the Factor library page with the scope badge, the version chip and the notice.
```

When the set is right:

```text
Approve
```

### 14. Tickets: check the result

```bash
uv run _bmad/method/scripts/tickets.py --project-root . next
```

It lists 1.1 under `ready_to_start`, and 1.2 as blocked, waiting on 1.

```bash
git add -A . && git commit -m "docs: FAC initiative, epic and tickets"
```

## What to check

- PRD: `status: final`, FAC.FR-1 to FAC.FR-3 with acceptance notes, the 400 for an invalid scope and the 404 for an unknown id, the six seed factors as given, and CLT.NFR and AD ids cited rather than restated.
- UX: `DESIGN.md` and `EXPERIENCE.md` have `status: final`. `DESIGN.md` holds the colour, type and component tokens for all three screens. `EXPERIENCE.md` holds the three-tab navigation with the Factor library under Factors, the states and the key flow. Both cite the Figma link and frame ids. `imports/figma/` holds a PNG per frame.
- Tickets: the initiative is filled in with dated decisions. Its `tickets.toml` has one epic. `epic-browse-factors/` has the epic with criteria (a) to (g) and a `tickets.toml` with two entries, 1 before 2. The `next` command shows 1.1 ready to start.
- Nothing outside `_bmad-output/initiative-fac-factor-library/` changed, and nothing in `apps/`.

## What you will see

Files created or changed, all under `_bmad-output/initiative-fac-factor-library/`:

- `prd-fac-factor-library/`: the capability PRD and its decision log (`.memlog.md`), and a `reconcile-*.md` file per input if the skill checked your inputs in parallel.
- `ux-fac-factor-library/`: `DESIGN.md`, `EXPERIENCE.md`, an index file naming both, the decision log, and `imports/figma/` with the PNG snapshots and their README.
- `initiative-fac-factor-library.md`: filled in. `tickets.toml`: the epics in build order.
- `epic-browse-factors/`: the epic and its `tickets.toml`, with tickets 1.1 and 1.2.

This is the hand-over. The developer track starts here with `/bmad-build 1.1`, which reads ticket 1.1, its epic, the PRD, the spine and the UX. The same initiative, as the developer track receives it, is in `../dev/_bmad-output/initiative-fac-factor-library/`. Your wording will differ.

Back to the [repository README](../README.md).
