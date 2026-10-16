# Reference: what the Developer track ends with

Workshop sample values, not real emission factors.

This folder is a read-only guide. It is the state after `/bmad-build 1.1`, `/bmad-walkthrough` and `/bmad-code-review`: ticket 1.1 built, walked through, reviewed and patched. Compare your own work with it, or copy a file from it if you are stuck. Do not open this folder as your VS Code workspace.

| What | Where |
|---|---|
| Plan, review findings and deferred work | `_bmad-output/initiative-fac-factor-library/` |
| Walkthrough notes | `_bmad-output/initiative-fac-factor-library/walkthrough-list-seeded-factors/` |
| API module | `apps/api/src/modules/factors/` |
| API tests | `apps/api/test/factors.test.ts` |
| Web page | `apps/web/src/pages/FactorLibraryPage.tsx` |

## Reference numbers (the reference folder only, a live run will differ)

These figures were verified from the reference folder. Your live run will differ, so compare the shape and not the numbers.

- Build: 7 tests (1 health and 6 for the ticket), 6 seeded factors, 7 acceptance criteria (a) to (g), 11 files changed, 1 local commit.
- Walkthrough: 7 blocks, 5 broad-strokes entry points, 5 log entries, 1 open finding.
- Code review: 8 findings (2 patch, 3 defer, 3 rejected, 0 decision-needed), 3 deferred items, 13 tests after the patches.

