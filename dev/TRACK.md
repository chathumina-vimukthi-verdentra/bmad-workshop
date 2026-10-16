# Developer track

Workshop sample values, not real emission factors.

## What we are trying to do

We build, walk through and review the first ticket, 1.1 List seeded factors: the factor list API and the Factor library web page. BMad and the Test Architect are already installed and set up in this folder, and the active initiative is `initiative-fac-factor-library`. Ticket 1.1 is planned and not built. You run three commands in order. `/bmad-build 1.1` plans, asks for your approval, implements with tests, reviews its own work and makes a local commit. `/bmad-walkthrough` walks you through the change one block at a time. `/bmad-code-review` runs several reviewers in parallel and triages their findings. The finding to look for is that an invalid filter value returns an empty list instead of a 400 error.

## Who decides

You do. The human decision points are:

- Build: answer the route questions, and approve or change the plan before any code is written. The plan's Intent is frozen after you approve.
- Walkthrough: you say when a block is done, which move comes next (thoughts, second opinion, formal review, test, drive the app) and when to wrap up.
- Code review: you confirm the target, decide any `decision-needed` finding (patch, defer or reject), and choose how patches are applied. Deferring is a real decision and goes on the record.

## Time box

58 minutes: build 30, walkthrough 10, code review 18. The skills do the typing. Your time goes to reading. The times are estimates, because live model runs vary.

| Command | Estimate | Clock |
|---|---|---|
| `/bmad-build 1.1` | 30 min | 0:10 to 0:40 |
| `/bmad-walkthrough` | 10 min | 0:40 to 0:50 |
| `/bmad-code-review` | 18 min | 0:50 to 1:08 |

Checkpoint: if Build is not finished by 0:45 on the clock, copy what you need from `reference/dev-finished` and move on. The QA people work on their own folder next, so nobody waits for you.

## Before you start

Open this `dev` folder itself in VS Code (File > Open Folder), not the repository root. Use GitHub Copilot Chat in Agent mode. Setup was done once for the whole workshop (see the README at the repository root). If a command says a package is missing, run `scripts/setup.sh` from the repository root again. The scripts are in the `scripts` folder one level up, so they start with `../scripts`. The working tree must be clean. Your own commits use your own git name and email.

## Commands

### 1. Build: start (assistant chat)

```text
/bmad-build 1.1
```

### 2. Build: answer any route question

The skill investigates first. It may ask a few numbered questions before it shows the plan. Answer from the epic and the capability PRD. For example:

```text
1: Yes. Use the order and the nine fields from the capability PRD. No pagination.
```

### 3. Build: read the plan, then approve it

It shows a short summary, the plan's risk and the path of the plan file. Open the file and check that:

- the Intent matches ticket 1.1,
- the Boundaries say what is not included (no detail endpoint, no pagination),
- the tasks cover the API, the tests and the web page,
- the Acceptance Criteria are the seven criteria (a) to (g).

At the checkpoint, type:

```text
Approve and continue
```

To change something first, say it instead, for example: `Review plan. Also show the factor id under the label in the table.`

### 4. Build: let it implement and review

It writes the code, runs the tests and reviews its own work. Findings go into the plan's Review Triage Log. Answer any question it asks. When it finishes, the plan status is `built` and it makes a local commit. It never pushes.

### 5. Build: check the result

```bash
git log --oneline -3
```

```bash
npm test
```

```bash
npm run build
```

```bash
uv run _bmad/method/scripts/tickets.py --project-root . status
```

To see it in the browser, open two terminals. In the first:

```bash
npm run dev:api
```

In the second:

```bash
npm run dev:web
```

Then open this address in your browser:

```text
http://localhost:5173
```

### 6. Walkthrough: start (assistant chat)

```text
/bmad-walkthrough
```

If it asks for the target, answer:

```text
Review the commit that built ticket 1.1. The plan is _bmad-output/initiative-fac-factor-library/epic-browse-factors/story-list-seeded-factors-plan.md
```

### 7. Walkthrough: go through the blocks

It presents block 1, the intent, then offers one to three moves. Open the links it gives you and read. When a block is fine, say so:

```text
Done, next block
```

At the service and route block, ask the question a careful reviewer would ask:

```text
What happens to a scope value that is not 1 or 2?
```

If it offers the Drive or Test move, accept it. It starts the app and tells you which tab to open.

### 8. Walkthrough: wrap up

```text
Wrap up
```

It asks what the follow-through is. Answer that you will run the code review next, and that nothing needs committing now. Then commit the notes:

```bash
git add -A && git commit -m "docs: walkthrough notes for 1.1"
```

### 9. Code review: start (assistant chat)

```text
/bmad-code-review
```

The skill lists the tickets whose state is `review`. Pick ticket 1.1. If it asks for a target instead, answer:

```text
Review ticket 1.1. The plan is _bmad-output/initiative-fac-factor-library/epic-browse-factors/story-list-seeded-factors-plan.md
```

It shows the diff stats, the review mode and the plan it loaded. Confirm:

```text
Continue
```

### 10. Code review: decide the findings

The reviewers run in parallel. Wait for the summary line and the list of findings. If it lists `decision-needed` findings, each one has numbered options and a recommendation. Reply with only the number of your choice.

If the review did not find the invalid filter problem, say:

```text
Check what GET /api/v1/factors does for scope=9 and for an unknown activityType. The capability PRD says an invalid scope is rejected with a 400 problem+json (FAC.FR-2).
```

### 11. Code review: apply the patches

When it asks how to handle the patch findings, reply with only the number:

```text
1
```

Option 1 is Apply every patch. Option 2 walks through each patch first.

### 12. Code review: check the result

```bash
npm test
```

```bash
grep -n "Review\]" _bmad-output/initiative-fac-factor-library/epic-browse-factors/story-list-seeded-factors-plan.md
```

```bash
cat _bmad-output/initiative-fac-factor-library/deferred-work.md
```

```bash
git add -A && git commit -m "fix: validate factor filters, review findings for 1.1"
```

## What to check

- After the build: a new commit with a conventional message, `npm test` passes (the reference build has 7 tests: 1 health and 6 for the ticket), `npm run build` passes, the status command shows ticket 1.1 in state `review` and 1.2 as `planned`, and the Factors tab shows six rows ordered by label, each with a scope badge and a version chip, and the "Workshop sample values" notice.
- After the walkthrough: the narrative has the blocks Intent, Broad strokes, a few Slices and Periphery with clickable links, and the log records your question about the invalid scope value as an open finding. Nothing in `apps/` changed.
- After the review: `npm test` passes (13 tests in the reference: the 7 from the build plus 6 for invalid filters), the grep prints one line per finding tagged `[Review][Patch]` or `[Review][Defer]`, `deferred-work.md` has one bullet per deferred item, and `GET /api/v1/factors?scope=9` returns 400 with `application/problem+json`.

## What you will see

Files created or changed:

- `_bmad-output/initiative-fac-factor-library/epic-browse-factors/story-list-seeded-factors-plan.md`: the plan, with `status` moving `draft`, `ready-for-dev`, `in-progress`, `in-review`, `built`, and later a `## Code Review` section.
- `apps/api/src/modules/factors/` (`types.ts`, `repository.ts`, `service.ts`, `routes.ts`), `apps/api/src/app.ts`, `apps/api/test/factors.test.ts`.
- `apps/web/src/pages/FactorLibraryPage.tsx`, `apps/web/src/api/factors.ts`, `apps/web/src/App.tsx`, `apps/web/src/styles.css`.
- `_bmad-output/initiative-fac-factor-library/walkthrough-list-seeded-factors/` with the narrative and the log.
- `_bmad-output/initiative-fac-factor-library/deferred-work.md`.

The reference output is `reference/dev-finished`. It is a guide: your live run will differ in wording, file details and commit ids. The reference build has one deliberate gap that the walkthrough and the review find. The reference review lists 2 patches, 3 deferred items and 3 rejected findings. Your review will find different things and word them differently.

## If you are stuck

Compare with `reference/dev-finished` and copy the files you need into this folder. Do not open the reference folder as your workspace. The QA track works on its own copy of the built ticket, so you never block QA.

Back to the [repository README](../README.md).
