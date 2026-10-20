# Product track: from idea to PRD and UX

Workshop sample values, not real emission factors.

## What we are trying to do

We plan one new capability, **Onboarding (ONB)**, from an empty initiative to a finished capability PRD and its UX. We stop at the hand-over to development: no epics, no tickets, no code. BMad is already installed and set up in this folder. The active initiative is `initiative-onb-onboarding`, and it is empty apart from its frontmatter.

The Factor library initiative (FAC) is the worked example. It shows the same steps already done, and the steps that come after the hand-over.

You run two commands in order:

1. `/bmad-prd` turns a brain dump into the capability PRD for ONB, with requirement ids `ONB.FR-n`.
2. `/bmad-ux` turns the PRD into `DESIGN.md` (how it looks), `EXPERIENCE.md` (how it behaves) and clickable mockups. It inherits the shared Carbon Hub Lite design instead of starting again.

## Who decides

You do. The skills ask and capture. They do not decide the product for you. The human decision points are:

- PRD: what onboarding is and is not, the stakes, the working mode (Fast or Coaching), and how each open question and `[ASSUMPTION]` is settled at Finalize.
- PRD: the conflict with the master PRD. Section 8 puts "sign-in, organisations, roles and multiple tenants" out of scope. You decide where onboarding stands. This is the best moment of the demo, so let the skill raise it.
- UX: whether Figma or the shared design owns the look, which Figma steps are in scope, and whether to run the reviewer lenses.

## Time box

About 55 minutes. The times are estimates and have not been dry run yet, because live model runs vary.

| Part | Command | Estimate |
|---|---|---|
| 0 Orient: the planning store and the worked example | none | 5 min |
| 1 Capability PRD | `/bmad-prd` | 25 min |
| 2 UX | `/bmad-ux` | 20 min |
| 3 Wrap-up: commit, show what comes next | none | 5 min |

If you are behind: in step 1 and step 2 choose the Fast path, and skip the reviewer lenses at Finalize.

## Before you start

Open this `product` folder itself in VS Code (File > Open Folder), not the repository root. Use GitHub Copilot Chat in Agent mode. The working tree must be clean.

```bash
uv run _bmad/scripts/resolve_config.py --project-root . --key core.active_initiative
```

It must print `initiative-onb-onboarding`.

Connect Figma once: this folder's `.vscode/mcp.json` adds the Figma MCP server (`https://mcp.figma.com/mcp`). In VS Code open the Command Palette, choose **MCP: List Servers**, then **figma**, then **Start Server**, and sign in to Figma in the browser. In Copilot Chat, Agent mode, the tools list then shows the Figma tools. The account must be able to open the Figma file.

## 0. Orient (no commands)

Open these in order and say one line about each:

1. `_bmad-output/prd-carbon-lite/prd-carbon-lite.md`: the master PRD. The problem, the persona Priya, the release plan, the PRD index (section 4), and CLT.NFR-1 to CLT.NFR-5 that bind every capability.
2. `_bmad-output/architecture-carbon-lite/architecture-carbon-lite.md`: the system spine. AD-1 to AD-10. Modules depend one way.
3. `_bmad-output/initiative-fac-factor-library/`: the worked example, in the order it was made:
   - `prd-fac-factor-library/`: the capability PRD (FAC.FR-1 to FAC.FR-3).
   - `ux-fac-factor-library/`: `DESIGN.md` (the shared design), `EXPERIENCE.md`, `mockups/index.html`.
   - The hand-over line. Everything below it is development's input, made with `/bmad-ticket`: `initiative-fac-factor-library.md` (filled in), `tickets.toml`, `epic-browse-factors/`.
4. `_bmad-output/initiative-onb-onboarding/`: empty. That is where today's work lands.

## 1. Capability PRD

### 1.1 Start (assistant chat)

```text
/bmad-prd
```

It greets you, checks the active initiative and detects the intent: Create.

### 1.2 Give it the brain dump

It asks for context and inputs first. Paste this, and change it to suit your audience:

```text
Create the capability PRD for ONB, Onboarding. Use the slug onb-onboarding, so it lands in prd-onb-onboarding/.

Inputs to read:
- the master PRD, _bmad-output/prd-carbon-lite/prd-carbon-lite.md (it binds this PRD: cite CLT.NFR ids, use its glossary)
- the system spine, _bmad-output/architecture-carbon-lite/architecture-carbon-lite.md
- the FAC capability PRD as the shape to follow, _bmad-output/initiative-fac-factor-library/prd-fac-factor-library/prd-fac-factor-library.md

Brain dump:
Priya Nair opens Carbon Hub Lite for the first time and sees three tabs and empty screens. She does not know where to start, what "Indicative" means, or that the factors are sample values. Today a site is a free-text id she types on every activity, so "Depot 1" and "depot1" become two sites.

Onboarding is the first-run experience that gets her to her first footprint:
- a welcome that explains the three steps (check the factors, record activities, read the footprint) and that every figure is Indicative
- a short setup: her organisation's name and when her reporting year starts
- add her sites once (name, and type such as depot or office), so activity entry can offer a list instead of free text
- a getting-started checklist that shows her progress and can be dismissed

Constraints: no sign-in, one organisation only, nothing stored between runs, same stack and rules as the rest.
Not in: inviting colleagues, roles, several organisations, importing sites from a file, emails or reminders.
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

Fast path drafts the whole PRD with `[ASSUMPTION]` tags, which suits the time box. Choose `Coaching path` and then `Journey-led` if you have time and want to show the elicitation.

### 1.4 Expect the conflicts

A careful skill raises these. If it does not, ask:

```text
Does anything in this conflict with the master PRD or the system spine?
```

- **Organisations are out of scope** in the master PRD, section 8. A good answer: one organisation profile, with no tenants, sign-in or roles. That stays within the master PRD's intent. Record it as a decision.
- **A new module.** Sites and the profile need an owner. That is a proposed module `onboarding`, which is not in AD-1 or `modules.yaml` yet. The PRD names the need. The spine change comes later, with `/bmad-architecture`. Do not let the PRD decide architecture.
- **Activities depend on sites.** ACT records a free-text site today. Onboarding changes what ACT reads. Note it as a dependency, not a change to the ACT PRD.

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
ls _bmad-output/initiative-onb-onboarding/prd-onb-onboarding
```

```bash
grep -n "ONB.FR-" _bmad-output/initiative-onb-onboarding/prd-onb-onboarding/prd-onb-onboarding.md
```

```bash
git add -A && git commit -m "docs: ONB capability PRD"
```

## 2. UX

### 2.1 Start (assistant chat)

```text
/bmad-ux
```

### 2.2 Give it the sources and the Figma link

It scans for sources and lists their paths. Confirm the ONB PRD and the master PRD, and give it the Figma file. The design comes from Figma: the skill pulls it in, and does not draw its own mockups.

```text
Use the slug onb-onboarding, so it lands in ux-onb-onboarding/.

Sources: the ONB PRD and the master PRD.

The design is in Figma: https://www.figma.com/design/e2OJqBBR9LCuaK276wpakc/Onboarding-Screen?node-id=0-1
Pull it in with the Figma creative tool.
```

It lists the frames it found and asks which are in scope. Today the file has one frame, `01 Home`: step 1 of 11, "Welcome & your team". Answer:

```text
All of them.
```

It saves a screenshot, the design context and the variables of each frame to `ux-onb-onboarding/imports/figma/`, writes a `README.md` there that lists them, and logs each import in the memlog.

### 2.3 The decisions Figma raises

Let the skill raise these, and decide each one live. If it does not, ask: `Does the Figma design conflict with the PRD or the shared design?`

- **The look.** The Figma screen is black and white. The shared Carbon Hub Lite design (`initiative-fac-factor-library/ux-fac-factor-library/DESIGN.md`) is navy and green. Either Figma is the visual source and `DESIGN.md` takes its tokens, or the shared design is inherited (`inherits:` in the frontmatter) and Figma gives only the layout and the flow.
- **The scope.** The Figma rail has 11 steps: Welcome & your team, Organisation, Reporting period, Logo, Package, Org axes, People & access, Organisational boundary, Operational boundary, Review & submit, Book your data call. The PRD may cover fewer. Steps the PRD does not cover are out of the UX, or they go back to the PRD as an Update.
- **The steps not drawn yet.** Only step 1 has a frame. Steps 2 to 11 are specified from the conversation only (spine only), or the designer adds frames and you pull again.

### 2.4 Stakes and working mode

```text
Internal
```

```text
Fast path
```

The Coaching path shows the creative tools (colour themes, design directions, wireframes). The look comes from Figma here, so the time is better spent on the flow.

If it asks for a journey, narrate one from the Figma flow. For example:

```text
Priya opens Carbon Hub for the first time. Step 1 shows her the two people who look after her: Rosa, her account manager, and Meera, her carbon analyst, each with a short intro video. She reads what she needs to have to hand and clicks Continue. She closes the tab halfway through Organisation and comes back the next day to the same step, because progress is saved as she goes. The climax: on Review & submit she sees every choice in one place, submits, and books her data call with Meera.
```

### 2.5 Finalize

```text
Finalize
```

When it asks which screens need a visual reference, answer:

```text
The Figma frames are the visual reference. Do not render HTML mockups for them. The steps with no frame are spine only.
```

Skip the reviewers if you are behind. At the end `DESIGN.md` and `EXPERIENCE.md` have `status: final`. They link the Figma imports at the matching sections and say once that the spines win on conflict.

### 2.6 Check the result

```bash
ls -R _bmad-output/initiative-onb-onboarding/ux-onb-onboarding
```

Open `_bmad-output/initiative-onb-onboarding/ux-onb-onboarding/imports/figma/README.md` and check that every frame is listed, with its screenshot beside it.

```bash
git add -A && git commit -m "docs: ONB UX"
```

## 3. Wrap-up: the hand-over

Stop here. Show what development receives, and what the next skills would do. Do not run them in this demo:

- `/bmad-prd` (Update) on the master PRD: add ONB to the PRD index (section 4) and settle the organisation line in section 8.
- `/bmad-architecture` (Update) on the system spine: add the module `onboarding` and its place in AD-1, then `modules.yaml`.
- `/bmad-ticket`: fill in the initiative envelope, slice it into epics and write `tickets.toml`, as in `initiative-fac-factor-library/`.
- `/bmad-build 1.1` in the `dev` folder: the developer track.

## What to check

- PRD: `prd-onb-onboarding/prd-onb-onboarding.md` exists with `status: final` and `parent:` set to the master PRD. It has numbered `ONB.FR-n` with acceptance criteria. It cites CLT.NFR and AD ids rather than restating them, and it names the non-goals. `.memlog.md` records the organisation decision.
- UX: `ux-onb-onboarding/` holds `ux-onb-onboarding.md`, `DESIGN.md`, `EXPERIENCE.md` with the journey, IA and states, and `imports/figma/` with a screenshot, the design context and a README line for each frame. `.memlog.md` names the Figma link as the visual source and records the look decision.
- Nothing outside `_bmad-output/initiative-onb-onboarding/` changed. The master PRD, the spine and the FAC folder are as they were.
- No `tickets.toml`, no epic folder, nothing in `apps/`.

## If you are stuck

Show the matching file in `initiative-fac-factor-library/` and say "this is what it produces". The FAC folder is the reference for both steps.

Back to the [README](README.md) or the [repository README](../README.md).
