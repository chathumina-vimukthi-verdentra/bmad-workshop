# Review log: walkthrough-list-seeded-factors

Target: the commit for ticket 1.1 (list seeded factors), plan `epic-browse-factors/story-list-seeded-factors-plan.md`.

## 1 - Block 1 Intent - Orientation

Session: unavailable · Timestamp: 2026-10-15T14:02:00+01:00

- Action: read the plan Intent and the commit message.
- Result: intent pasted verbatim from the plan. Source is the plan, not a PR.
- Evidence: epic-browse-factors/story-list-seeded-factors-plan.md

## 2 - Block 2 Broad strokes - Review

Session: unavailable · Timestamp: 2026-10-15T14:06:00+01:00

- Action: user opened the five entry points.
- Result: accepted as is.

## 3 - Block 4 Service and route - Thoughts

Session: unavailable · Timestamp: 2026-10-15T14:14:00+01:00

- Action: user asked what happens to a `scope` value that is not 1 or 2.
- Result: finding, open. `Number(scope)` is passed straight to the service. `scope=9`, `scope=abc` and an empty `scope` all reach the filter and return 200 with an empty list. FAC.FR-2 says an invalid `scope` is rejected with a 400 problem+json (CLT.NFR-3, AD-7). No test covers it.
- Evidence: apps/api/src/modules/factors/routes.ts:14, prd-fac-factor-library.md FAC.FR-2
- Open: take this to the code review step.

## 4 - Block 5 Host wiring and tests - Test

Session: unavailable · Timestamp: 2026-10-15T14:21:00+01:00

- Action: started the API and the web app, opened the Factors tab.
- Result: six rows, ordered by label, each with a scope badge and a version chip. Sample values notice visible. Criterion (g) checked by hand.
- Evidence: http://localhost:5173

## 5 - Wrap-up - Review done

Session: unavailable · Timestamp: 2026-10-15T14:30:00+01:00

- Action: user marked every block done and asked to wrap up.
- Result: no edits made. One open finding carried to `/bmad-code-review`.
- Open: invalid filter values return 200 empty instead of 400.
