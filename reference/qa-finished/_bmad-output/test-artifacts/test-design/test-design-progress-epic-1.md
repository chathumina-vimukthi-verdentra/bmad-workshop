---
runScope: 'epic'
runKey: 'epic-1'
workflowStatus: 'completed'
totalSteps: 5
stepsCompleted: ['step-01-detect-mode', 'step-02-load-context', 'step-03-risk-and-testability', 'step-04-coverage-plan', 'step-05-generate-output']
lastStep: 'step-05-generate-output'
nextStep: ''
lastSaved: '2026-10-16'
---

# Test design progress: epic-1

Reference example of the checkpoint `/bmad-tea-test-design` writes while it works. The finished plan is `test-design-epic-1.md` in this folder.

## Step 1: Detect mode

- Mode: epic-level. The active initiative is `initiative-fac-factor-library` and its ticket tree holds epic 1 (`epic-browse-factors`).
- Run key: `epic-1`.
- Prerequisites found: epic and story requirements with acceptance criteria, the capability PRD, the system spine.

## Step 2: Load context

- Stack: fullstack (`test_stack_type` is set to `fullstack`).
- Loaded: epic envelope, capability PRD (sections 3, 4, 5, 10), master PRD (CLT.NFR-1 to CLT.NFR-5), system spine (AD-1 to AD-10), plan and review of ticket 1.1, `deferred-work.md`, UX `EXPERIENCE.md`.
- Existing tests: `apps/api/test/health.test.ts` and `apps/api/test/factors.test.ts` (13 Vitest tests), no browser tests.
- Knowledge fragments: `risk-governance.md`, `probability-impact.md`, `test-levels-framework.md`, `test-priorities-matrix.md`, `nfr-criteria.md`.

## Step 3: Risk and testability

- Gap statements found: 4 (no automated test for criterion (g), unknown route body, no pagination, no cache headers).
- Scored risks: R-001 (6), R-002 (3), R-003 (2), R-004 (1). No residual per-story risks, because gap statements exist.
- The invalid filter finding is already patched, so it is a control checked by regression tests, not a risk.

## Step 4: Coverage plan

- 32 scenarios: P0 9, P1 19, P2 3, P3 1. Levels: API 22, E2E 10.

## Step 5: Generate output

- Written: `test-design-epic-1.md`. Checklist passed. No orphaned browser sessions.
