---
type: initiative
title: "Priya can see the versioned emission factors every figure is built on"
parent: none
covers: [FAC.FR-1, FAC.FR-2, FAC.FR-3]
after: []
assignee: ""
risk: low
---

# Priya can see the versioned emission factors every figure is built on

Workshop sample values, not real emission factors.

## Description

Priya Nair, sustainability lead at Nair Logistics, can open the factor library and see which emission factors Carbon Hub Lite uses, with their scope, version and source. The factors are read only and versioned. The capability PRD owns the requirements FAC.FR-1 to FAC.FR-3. This initiative delivers them. It is the base for ACT and FPS.

## Outcome

Priya can check which factor, version and value sit behind a figure before she trusts it. The signal is the PRD's SM-3: a reviewer can check the factor list against the acceptance criteria and the system spine.

## Done when

1. FAC.FR-1 to FAC.FR-3 work end to end: the API lists, filters and opens factors, and the Factor library page shows them.
2. Every acceptance criterion in the capability PRD has a passing automated test, or a stated manual check for the page (CLT.NFR-4).
3. Every factor value is a decimal string and every API error is problem+json (CLT.NFR-1, CLT.NFR-3).
4. The Factor library page shows the "Workshop sample values" notice.

## Boundaries

One capability: the factor library, in module `factors` and on the Factors tab of the web app. Not activities (ACT), not calculation (FPS), not creating or editing factors. See the non-goals in the capability PRD. Tracer path: the seeded factor list, from the repository through the API to a table on the Factors tab.

## References

- spec - `_bmad-output/initiative-fac-factor-library/prd-fac-factor-library/prd-fac-factor-library.md`, sections 3 and 10
- constraint - `_bmad-output/prd-carbon-lite/prd-carbon-lite.md`, section 5, CLT.NFR-1 to CLT.NFR-5
- constraint - `_bmad-output/architecture-carbon-lite/architecture-carbon-lite.md`, AD-1 to AD-10
- design - `_bmad-output/initiative-fac-factor-library/ux-fac-factor-library/EXPERIENCE.md` (Factor library screen) and `DESIGN.md` (the shared design)

## Notes

- Decision: FAC is built first because ACT and FPS depend on it (AD-1). Order across initiatives is FAC, then ACT, then FPS (2026-10-15).
- Decision: one epic, `epic-browse-factors`, because one owner and one module deliver the whole capability (2026-10-15).
- Decision: in the workshop only epic 1, ticket 1 (`/bmad-build 1.1`) is built. Ticket 1.2 stays in the backlog (2026-10-15).
- Decision: no platform-baseline epic. The scaffold, the test setup and the web shell are provided as the starter, and the sample runs locally with no deployment (CLT.NFR-5) (2026-10-15).
