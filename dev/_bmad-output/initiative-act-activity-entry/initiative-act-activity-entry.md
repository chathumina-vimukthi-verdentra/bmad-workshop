---
type: initiative
title: "Priya can record fuel and electricity use with clear messages when input is wrong"
parent: none
covers: [ACT.FR-1, ACT.FR-2, ACT.FR-3]
after: []
assignee: ""
risk: medium
---

# Priya can record fuel and electricity use with clear messages when input is wrong

Workshop sample values, not real emission factors.

## Description

Priya Nair can record fuel and electricity use for a site and a reporting period, and see what she recorded. Bad input is refused with one clear message per field. Each activity pins the factor that was current when it was recorded (AD-6). The capability PRD owns ACT.FR-1 to ACT.FR-3. This initiative delivers them.

## Outcome

Priya records March for Depot 1 once and trusts what was stored. The signal is the PRD's UJ-1: she mistypes a period, sees a message next to the field and fixes it.

## Done when

1. ACT.FR-1 to ACT.FR-3 work end to end: the API records and lists activities and the Record activity page uses it.
2. Every recorded activity carries the pinned factor id and its quantity as the decimal string sent (CLT.NFR-1, AD-6).
3. Every invalid request returns 422 problem+json with one error per invalid field and stores nothing (CLT.NFR-3).
4. Every acceptance criterion has a passing automated test, or a stated manual check for the page (CLT.NFR-4).

## Boundaries

One capability: recording and listing activities, in module `activities` and on the Activities tab. Not factors (FAC), not calculation (FPS), not editing or deleting activities. See the non-goals in the capability PRD. Tracer path: one valid activity posted, stored with its pinned factor, and shown in the list on the page.

- Touch point: factors module (FAC) - ACT reads the current factor and the unit through the FAC service interface; owner: epic-browse-factors

## References

- spec - `_bmad-output/initiative-act-activity-entry/prd-act-activity-entry/prd-act-activity-entry.md`, sections 3 and 10
- constraint - `_bmad-output/prd-carbon-lite/prd-carbon-lite.md`, section 5, CLT.NFR-1 to CLT.NFR-5
- constraint - `_bmad-output/architecture-carbon-lite/architecture-carbon-lite.md`, AD-1, AD-2, AD-4, AD-6, AD-7
- design - `_bmad-output/initiative-fac-factor-library/ux-fac-factor-library/EXPERIENCE.md`, screen Record activity

## Notes

- Waits on initiative-fac-factor-library because: ACT pins the current factor and checks the unit through the FAC service (AD-1). Epic ordering across initiatives follows AD-1: FAC, then ACT, then FPS.
- Decision: one epic, `epic-record-activities`, because one owner and one module deliver the whole capability (2026-10-15).
- Decision: not built in the workshop. It stays in the backlog (2026-10-15).
- Decision: no platform-baseline epic. The scaffold, the test setup and the web shell are provided as the starter, and the sample runs locally with no deployment (CLT.NFR-5) (2026-10-15).
