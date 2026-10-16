---
type: initiative
title: "Priya can read an indicative footprint by scope with the factor behind every line"
parent: none
covers: [FPS.FR-1, FPS.FR-2, FPS.FR-3]
after: []
assignee: ""
risk: medium
---

# Priya can read an indicative footprint by scope with the factor behind every line

Workshop sample values, not real emission factors.

## Description

Priya Nair can see an indicative footprint for a site and period, split by scope, with the factor used on every line. Nothing is stored: the figures are computed on every read (AD-2). The capability PRD owns FPS.FR-1 to FPS.FR-3. This initiative delivers them.

## Outcome

Priya can explain her number: this quantity, this factor, this version, and it is Indicative. The signal is the PRD's UJ-1 climax.

## Done when

1. FPS.FR-1 to FPS.FR-3 work end to end: the API calculates and totals, and the Footprint summary page shows the result.
2. Every line uses the factor pinned on its activity, never the latest (CLT.NFR-2, AD-6).
3. All arithmetic uses decimal.js and rounding happens only in this module (CLT.NFR-1, AD-4).
4. Every figure shows the status Indicative and Verified is never produced (AD-5).
5. Every acceptance criterion has a passing automated test, or a stated manual check for the page (CLT.NFR-4).

## Boundaries

One capability: the footprint calculation and its summary, in module `footprint` and on the Footprint tab. Not factors (FAC), not activities (ACT), not storing or exporting a footprint. See the non-goals in the capability PRD. Tracer path: one activity calculated into one line with its pinned factor.

- Touch point: activities module (ACT) - FPS reads activities with the pinned factor resolved through the ACT service interface; owner: epic-record-activities

## References

- spec - `_bmad-output/initiative-fps-footprint-summary/prd-fps-footprint-summary/prd-fps-footprint-summary.md`, sections 3 and 10
- constraint - `_bmad-output/prd-carbon-lite/prd-carbon-lite.md`, section 5, CLT.NFR-1 to CLT.NFR-5
- constraint - `_bmad-output/architecture-carbon-lite/architecture-carbon-lite.md`, AD-1 to AD-6
- design - `_bmad-output/initiative-fps-footprint-summary/ux-fps-footprint-summary/EXPERIENCE.md` and `DESIGN.md`, screen Footprint summary (inherits the shared design in `ux-fac-factor-library/DESIGN.md`)

## Notes

- Waits on initiative-act-activity-entry because: FPS reads activities with the pinned factor resolved through the ACT service (AD-1). Epic ordering across initiatives follows AD-1: FAC, then ACT, then FPS.
- Decision: one epic, `epic-footprint-summary`, because one owner and one module deliver the whole capability (2026-10-15).
- Decision: not built in the workshop. It stays in the backlog (2026-10-15).
- Decision: no platform-baseline epic. The scaffold, the test setup and the web shell are provided as the starter, and the sample runs locally with no deployment (CLT.NFR-5) (2026-10-15).
