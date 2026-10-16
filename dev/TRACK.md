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

### 2. Build: answer the open question

The skill investigates first. It may stop with an open question before it shows the plan. In the dry run it was "Open question 1: invalid scope value". The capability PRD (FAC.FR-2) says an invalid scope returns 400 problem+json, but the ticket's agreed criteria (a) to (g) do not include it. The options are "A. Leave it out" and "B. Include it". For this workshop answer:

```text
A
```

Why: the agent stops and asks you to decide. Leaving it out keeps the build inside the ticket, and it gives the code review something real to find.

### 3. Build: read the plan, then approve it

Checkpoint 1 shows a summary with the plan file path, the risk and the route. Open the file and check that:

- the Intent matches ticket 1.1,
- the Boundaries say what is not included (no detail endpoint, no pagination),
- the tasks cover the API, the tests and the web page,
- the Acceptance Criteria are the seven criteria (a) to (g).

The choices are "Approve and continue", "Approve and stop" and "Review plan". Type:

```text
Approve and continue
```

To change something first, choose "Review plan" and say what to change, for example: `Also show the factor id under the label in the table.`

### 4. Build: let it implement and review

It writes the code, runs the tests and reviews its own work. Findings go into the plan's Review Triage Log. Answer any question it asks. When it finishes, the plan status is `built`, `npm test` passes and it makes a local commit. It never pushes.

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

If you give it no target, it picks the latest commit itself, which is the build commit. If it asks for a target, answer:

```text
Review the commit that built ticket 1.1. The plan is _bmad-output/initiative-fac-factor-library/epic-browse-factors/story-list-seeded-factors-plan.md
```

### 7. Walkthrough: go through the blocks

It announces "Block 1 of N". Block 1 is the Intent. Then it offers moves: Thoughts, Drive (start the app and check the Factors tab), or you say "done" to go to the next block. When a block is fine, say so:

```text
Done, next block
```

At the service and route block, ask the question a careful reviewer would ask:

```text
What happens to a scope value that is not 1 or 2?
```

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

It stages the inputs and tells you the target: the build commit against the plan baseline, the diff stats and mode `full`. Then it asks you to confirm: "Confirm to start the parallel review, or name a different target". Reply:

```text
Confirm
```

(In the dry run a user typed "Target" and the skill asked again. Reply `Confirm`.)

### 10. Code review: wait for the findings

Four lenses run in parallel: blind hunter, edge case hunter, verification gap and intent alignment. The result is a summary line like "0 decision-needed, N patch, N defer, N rejected". The findings are written to the plan's `## Code Review` section. If it lists `decision-needed` findings, reply with only the number of your choice.

In the reference the scope gap is a patch. If your live review does not find it, say:

```text
Check what GET /api/v1/factors does for scope=9 and for an unknown activityType. The capability PRD says an invalid scope is rejected with a 400 problem+json (FAC.FR-2).
```

### 11. Code review: apply the patches

It asks: "How would you like to handle the patch findings?" The options are 1. Apply every patch, 2. Leave as action items, 3. Walk through each patch. Reply with only the number:

```text
1
```

### 12. Code review: check the result

```bash
npm test
```

```bash
grep -n "Review\]" _bmad-output/initiative-fac-factor-library/epic-browse-factors/story-list-seeded-factors-plan.md
```

```bash
cat _bmad-output/initiative-fac-factor-library/deferred-work.md 2>/dev/null || echo "No deferred work: the review deferred nothing."
```

```bash
git add -A && git commit -m "fix: validate factor filters, review findings for 1.1"
```

## What to check

- Build: the plan status is `built` and there is one local commit. `npm test` passes and `npm run build` passes. The plan lists the seven acceptance criteria (a) to (g). The status command shows ticket 1.1 in state `review` and 1.2 as `planned`. The Factors tab shows the six seeded factors ordered by label, each with a scope badge and a version chip, and the "Workshop sample values" notice.
- Walkthrough: the narrative has an Intent block, a Broad strokes block, slices and a Periphery block, with links. The log records your question about the invalid scope value as an open finding. Nothing in `apps/` changed.
- Code review: four lenses ran. Every finding is patched, deferred or rejected, and the plan's Code Review section lists them. `npm test` passes after the patches. `GET /api/v1/factors?scope=9` returns 400 with `application/problem+json`. `deferred-work.md` exists only if the review deferred something.

## What you will see

Files created or changed:

- `_bmad-output/initiative-fac-factor-library/epic-browse-factors/story-list-seeded-factors-plan.md`: the plan, with `status` moving `draft`, `ready-for-dev`, `in-progress`, `in-review`, `built`, and later a `## Code Review` section.
- `apps/api/src/modules/factors/` (`types.ts`, `repository.ts`, `service.ts`, `routes.ts`), `apps/api/src/app.ts`, `apps/api/test/factors.test.ts`.
- `apps/web/src/pages/FactorLibraryPage.tsx`, `apps/web/src/api/factors.ts`, `apps/web/src/App.tsx`, `apps/web/src/styles.css`.
- `_bmad-output/initiative-fac-factor-library/walkthrough-list-seeded-factors/` with the narrative and the log.
- `_bmad-output/initiative-fac-factor-library/deferred-work.md`, only if the review deferred findings. In the dry run it deferred none, so the file did not exist.

The reference output is `reference/dev-finished`. The reference build has one deliberate gap, the invalid filter value, that the walkthrough and the review find. Your commit ids and wording will differ.

## If you are stuck

Compare with `reference/dev-finished` and copy the files you need into this folder. Do not open the reference folder as your workspace. The QA track works on its own copy of the built ticket, so you never block QA.

## Reference numbers (the reference folder only, a live run will differ)

These figures were verified from the reference folder. Your live run will differ, so compare the shape and not the numbers.

- Build: 7 tests (1 health and 6 for the ticket), 6 seeded factors, 7 acceptance criteria (a) to (g), 11 files changed (code, tests and the plan), 1 local commit.
- Walkthrough: 7 blocks in the narrative, 5 broad-strokes entry points, 5 log entries, 1 open finding (the invalid filter returns 200, not 400).
- Code review: 8 findings, which are 2 patch, 3 defer, 3 rejected and 0 decision-needed. 3 deferred items. 13 tests after the patches (the 7 from the build plus 6 new).

Back to the [repository README](../README.md).
