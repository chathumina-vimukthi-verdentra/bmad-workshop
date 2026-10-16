---
type: epic
title: "Priya can record and list activities"
parent: initiative-act-activity-entry
covers: [ACT.FR-1, ACT.FR-2, ACT.FR-3]
after: []
assignee: ""
risk: medium
---

# Priya can record and list activities

Workshop sample values, not real emission factors.

## Description

Priya records one activity for a site and period, gets a clear message next to every invalid field, and lists what she recorded for a site and period. The capability PRD holds the full requirement text and acceptance notes.

## Outcome

Priya can enter her fuel and electricity numbers once and see them back. The PRD's SM-2 is the signal: each criterion maps to one passing test or a stated manual check.

## Requirements

The requirement source is the capability PRD (`prd-act-activity-entry/prd-act-activity-entry.md`, section 3). Ids are the PRD's.

- ACT.FR-1: Record an activity from `siteId`, `period`, `activityType`, `quantity` and `unit`, pinning the current factor.
- ACT.FR-2: Validate the input and explain each invalid field.
- ACT.FR-3: List activities for a site and period.

The ticket criteria are written out in the PRD, section 10.

## Done when

1. A valid request records an activity with a sequential id, the pinned factor id and the quantity as sent.
2. An invalid request returns 422 problem+json with one error per invalid field and stores nothing.
3. The list returns the activities for a site and period, oldest first, and an empty list for no match.
4. The Record activity page shows messages next to the fields, keeps the typed values, and shows an empty state.
5. Every criterion has a passing automated test, or a stated manual check for the page (CLT.NFR-4).

## Boundaries

The `activities` module and the Activities tab. Reads factors only through the FAC service interface. Not calculation, not editing or deleting.

## References

- parent - `_bmad-output/initiative-act-activity-entry/initiative-act-activity-entry.md`, covers ACT.FR-1 to ACT.FR-3
- spec - `_bmad-output/initiative-act-activity-entry/prd-act-activity-entry/prd-act-activity-entry.md`, sections 3, 4, 5 and 10
- constraint - `_bmad-output/architecture-carbon-lite/architecture-carbon-lite.md`, AD-1, AD-2, AD-4, AD-6, AD-7
- design - `_bmad-output/initiative-act-activity-entry/ux-act-activity-entry/EXPERIENCE.md`, screen Record activity
- design - `_bmad-output/initiative-act-activity-entry/ux-act-activity-entry/DESIGN.md`, what this screen adds to the shared design
- design - `_bmad-output/initiative-act-activity-entry/ux-act-activity-entry/mockups/index.html`, the clickable prototype

## Notes

- Decision: ticket 1 is the tracer bullet: one valid activity from request to stored record to list row (2026-10-15).
- Waits on epic-browse-factors in initiative-fac-factor-library because: ticket 1 needs the FAC service for the current factor and the unit check.
