---
title: 'FPS Footprint summary'
status: final
created: 2026-10-15
updated: 2026-10-15
parent: _bmad-output/prd-carbon-lite/prd-carbon-lite.md
code: FPS
---

# PRD: FPS Footprint summary

Workshop sample values, not real emission factors.

## 0. Document Purpose

This is the capability PRD for FPS. It owns FPS.FR-1 to FPS.FR-3. It cites CLT.NFR-n from the master PRD (`_bmad-output/prd-carbon-lite/prd-carbon-lite.md`) and AD-n from the system spine (`_bmad-output/architecture-carbon-lite/architecture-carbon-lite.md`). It does not restate them. Terms follow the master PRD glossary.

## 1. Purpose

Footprint summary turns recorded activities into emissions. It multiplies each quantity by the pinned factor and totals the result by scope. It stores nothing: it computes on read (AD-2). In Carbon Hub it maps to a small part of the real module D8. Code lives in module `footprint`.

## 2. User and job

Priya Nair, sustainability lead at Nair Logistics. She wants one clear footprint for a site and period, split by scope, with the factor behind every line and a clear sign that the number is indicative.

## 3. Functional requirements

### FPS.FR-1: Calculate per activity

Each activity becomes a footprint line.

- Acceptance: `kgCo2e` is quantity multiplied by the pinned factor, with decimal.js (CLT.NFR-1).
- Acceptance: `kgCo2e` is a decimal string rounded to 2 decimal places, half up (AD-4).
- Acceptance: the line shows `activityId`, `activityType`, `quantity`, `unit`, `factorId`, `kgCo2e` and `scope`.
- Acceptance: the pinned factor is used, never the latest (CLT.NFR-2, AD-6).
- Example: 1000 litres of diesel at 2.70 gives `"2700.00"`.

### FPS.FR-2: Total by scope

Totals lines by scope.

- Acceptance: `totalsKgCo2e` has `scope1`, `scope2` and `total`.
- Acceptance: `totalsTCo2e` has the same keys, in tonnes with 3 decimal places.
- Acceptance: totals are sums of the unrounded line values, then rounded once. Rounding happens only in this module (AD-4).
- Acceptance: a site and period with no activities gives zero totals and no lines.

### FPS.FR-3: Show status

Every figure carries a status (AD-5).

- Acceptance: the summary has `status: "Indicative"`.
- Acceptance: the web card shows the status next to the total.
- Acceptance: Verified is never produced.

## 4. Data model

Footprint line:

| Field | Type |
| --- | --- |
| activityId | string |
| activityType | enum |
| quantity | decimal string |
| unit | string |
| factorId | string |
| kgCo2e | decimal string, 2 dp |
| scope | 1 or 2 |

Footprint summary:

| Field | Type |
| --- | --- |
| siteId | string |
| period | string |
| status | `"Indicative"` |
| totalsKgCo2e | `{scope1, scope2, total}` decimal strings |
| totalsTCo2e | `{scope1, scope2, total}` decimal strings, 3 dp |
| lines | array of Footprint line |

Nothing is stored. The summary is rebuilt on every request (AD-2).

## 5. API

- `GET /api/v1/footprint?siteId=&period=` returns a Footprint summary.
- Missing `siteId` or `period` returns 400 problem+json (CLT.NFR-3).

## 6. Web

A "Footprint summary" screen with a totals card, a status chip and a lines table. See `EXPERIENCE.md` in `_bmad-output/initiative-fac-factor-library/ux-fac-factor-library/`.

## 7. Non-goals

- Scope 3.
- Verified status, or any way to change the status.
- Storing, versioning or exporting a footprint.
- Comparing periods, trends and targets.
- Any AI estimate.

## 8. Dependencies

- ACT service: `listForSitePeriod`, which returns activities with the pinned factor resolved (AD-1, AD-6).
- FPS does not call FAC directly.

## 9. Open questions

None.

## 10. Ticket acceptance criteria

The epic `epic-footprint-summary` plans two tickets. The criteria are kept here in the form a pulled ticket would carry.

### Ticket 1.1: Calculate emissions for one activity

Covers FPS.FR-1.

**Line is calculated with the pinned factor**
**Given** an activity of `"1000"` litres of diesel pinned to `EF-DIESEL-UK-2026.1`
**When** I call `GET /api/v1/footprint?siteId=<site>&period=<period>`
**Then** the line for that activity has `kgCo2e` `"2700.00"`
**And** the line shows `factorId` `EF-DIESEL-UK-2026.1` and `scope` 1

**Rounding**
**Given** an activity of `"10.333"` kWh of grid electricity
**When** the footprint is calculated
**Then** `kgCo2e` is `"2.14"`, rounded half up to 2 decimal places
**And** no float arithmetic is used

**Older factor stays**
**Given** a newer factor version exists for diesel
**When** the footprint for an older activity is calculated
**Then** the line still uses the factor pinned on that activity

**Missing query**
**Given** the `siteId` or `period` query parameter is missing
**When** I call `GET /api/v1/footprint`
**Then** the response is 400 problem+json

### Ticket 1.2: Footprint summary by scope with Indicative status

Covers FPS.FR-2 and FPS.FR-3.

**Totals by scope**
**Given** activities for Scope 1 and Scope 2 exist for a site and period
**When** I call `GET /api/v1/footprint?siteId=<site>&period=<period>`
**Then** `totalsKgCo2e` has `scope1`, `scope2` and `total`
**And** `totalsTCo2e` has the same keys in tonnes with 3 decimal places

**Status**
**Given** the summary is returned
**When** I read the `status` field
**Then** it is `"Indicative"`
**And** it is never `"Verified"`

**Empty period**
**Given** a site and period with no activities
**When** I call the footprint endpoint
**Then** all totals are zero
**And** `lines` is an empty array

**Web card**
**Given** I am on the "Footprint summary" page
**When** I choose a site and period
**Then** a card shows the totals by scope with an Indicative status chip next to the figures
**And** a table lists the lines with the factor id used for each
