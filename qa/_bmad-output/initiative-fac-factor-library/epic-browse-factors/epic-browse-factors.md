---
type: epic
title: "Priya can browse the emission factors"
parent: initiative-fac-factor-library
covers: [FAC.FR-1, FAC.FR-2, FAC.FR-3]
after: []
assignee: ""
risk: low
---

# Priya can browse the emission factors

Workshop sample values, not real emission factors.

## Description

Priya can list the six seeded emission factors, narrow the list by scope and activity type, and open one factor by its id. The Factor library page shows the same list in a table with a scope badge and a version chip. The capability PRD holds the full requirement text and the acceptance notes.

## Outcome

Priya sees which factors, versions and values Carbon Hub Lite uses before she trusts a figure. The PRD's SM-2 is the signal: each acceptance criterion maps to one passing test, or to a stated manual check.

## Requirements

The requirement source is the capability PRD (`prd-fac-factor-library/prd-fac-factor-library.md`, section 3). Ids are the PRD's.

- FAC.FR-1: List emission factors, ordered by label, each with the nine factor fields. The Factor library page shows the list.
- FAC.FR-2: Filter factors by scope and by activity type.
- FAC.FR-3: Show one factor by id.

Acceptance criteria for ticket 1 (List seeded factors), lettered as the tests and the review refer to them. They are written out in full in the PRD, section 10.

- (a) The six seeded factors come back with `count` 6, ordered by label ascending. Covers FAC.FR-1.
- (b) Each item has `id`, `activityType`, `label`, `unit`, `kgCo2ePerUnit`, `scope`, `source`, `version` and `validFrom`, and `kgCo2ePerUnit` is a string. Covers FAC.FR-1.
- (c) `scope=1` returns only Scope 1 factors and `count` matches. Covers FAC.FR-2.
- (d) `activityType=diesel` returns exactly the diesel factor. Covers FAC.FR-2.
- (e) A filter with no match returns 200 with `count` 0 and empty `items`. Covers FAC.FR-2.
- (f) Seeding twice does not duplicate: six factors, no id twice. Covers FAC.FR-1.
- (g) The "Factor library" page lists the factors in a table with a scope badge and a version chip on each row, and shows a "Workshop sample values" notice. Covers FAC.FR-1.

Ticket 2 (Factor detail by id) covers FAC.FR-3: a known id returns the full factor, an unknown id returns 404 problem+json, and the page can show one factor's fields.

## Done when

1. Criteria (a) and (b): `GET /api/v1/factors` returns the six seeded factors ordered by label, each with the nine fields and `kgCo2ePerUnit` as a string.
2. Criteria (c), (d) and (e): the scope filter, the activity type filter and a filter with no match behave as written.
3. Criterion (f): building the app twice never duplicates a factor.
4. Criterion (g): the Factors tab shows the table with a scope badge, a version chip and the sample values notice.
5. Ticket 2: `GET /api/v1/factors/:id` returns the factor, or 404 problem+json for an unknown id.
6. Every criterion above has a passing automated test, except (g), which has a stated manual check (CLT.NFR-4).

## Boundaries

The `factors` module and the Factors tab only. No create, update or delete for factors. No pagination. The web page never calculates and never re-sorts (see the UX documents). Not ACT or FPS.

## References

- parent - `_bmad-output/initiative-fac-factor-library/initiative-fac-factor-library.md`, covers FAC.FR-1 to FAC.FR-3
- spec - `_bmad-output/initiative-fac-factor-library/prd-fac-factor-library/prd-fac-factor-library.md`, sections 3, 4, 5 and 10
- constraint - `_bmad-output/prd-carbon-lite/prd-carbon-lite.md`, section 5, CLT.NFR-1 to CLT.NFR-5
- constraint - `_bmad-output/architecture-carbon-lite/architecture-carbon-lite.md`, AD-1 to AD-10
- design - `_bmad-output/initiative-fac-factor-library/ux-fac-factor-library/EXPERIENCE.md`, screen Factor library
- design - `_bmad-output/initiative-fac-factor-library/ux-fac-factor-library/DESIGN.md`, tokens and components
- design - `_bmad-output/initiative-fac-factor-library/ux-fac-factor-library/mockups/index.html`, the clickable prototype

## Notes

- Decision: ticket 1 is the tracer bullet. It is the thinnest path through the repository, the service, the route and the web table (2026-10-15).
- Decision: ticket 2 waits on ticket 1 because it reuses the repository, the service and the `Factor` type (2026-10-15).
- Decision: the seven acceptance criteria above are the agreed scope of ticket 1 (2026-10-15).
