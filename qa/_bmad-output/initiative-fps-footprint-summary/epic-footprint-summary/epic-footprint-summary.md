---
type: epic
title: "Priya can read the footprint summary"
parent: initiative-fps-footprint-summary
covers: [FPS.FR-1, FPS.FR-2, FPS.FR-3]
after: []
assignee: ""
risk: medium
---

# Priya can read the footprint summary

Workshop sample values, not real emission factors.

## Description

Priya calculates emissions for each recorded activity with its pinned factor, sees the totals by scope in kg and tonnes CO2e, and sees the status Indicative next to every figure. The capability PRD holds the full requirement text and acceptance notes.

## Outcome

Priya can report a number and be honest that it is not verified. The PRD's SM-3 is the signal: a reviewer can check the summary against the criteria and the system spine.

## Requirements

The requirement source is the capability PRD (`prd-fps-footprint-summary/prd-fps-footprint-summary.md`, section 3). Ids are the PRD's.

- FPS.FR-1: Calculate emissions for one activity from the pinned factor, rounded to 2 decimal places half up.
- FPS.FR-2: Total emissions by scope for a site and period, in kg and in tonnes.
- FPS.FR-3: Show the status Indicative on every figure.

The ticket criteria are written out in the PRD, section 10.

## Done when

1. Each activity becomes a line with `kgCo2e` worked out from its pinned factor, and the line shows the factor id.
2. The totals by scope are the sums of the unrounded line values, rounded once.
3. The summary has `status` Indicative and the page shows the status next to the totals.
4. A missing `siteId` or `period` returns 400 problem+json, and an empty period gives zero totals.
5. Every criterion has a passing automated test, or a stated manual check for the page (CLT.NFR-4).

## Boundaries

The `footprint` module and the Footprint tab. Reads activities only through the ACT service interface. Not storing, exporting or comparing footprints.

## References

- parent - `_bmad-output/initiative-fps-footprint-summary/initiative-fps-footprint-summary.md`, covers FPS.FR-1 to FPS.FR-3
- spec - `_bmad-output/initiative-fps-footprint-summary/prd-fps-footprint-summary/prd-fps-footprint-summary.md`, sections 3, 4, 5 and 10
- constraint - `_bmad-output/architecture-carbon-lite/architecture-carbon-lite.md`, AD-1 to AD-6
- design - `_bmad-output/initiative-fac-factor-library/ux-fac-factor-library/EXPERIENCE.md`, screen Footprint summary

## Notes

- Decision: ticket 1 is the tracer bullet: one activity calculated into one line (2026-10-15).
- Waits on epic-record-activities in initiative-act-activity-entry because: ticket 1 reads activities with the pinned factor resolved.
