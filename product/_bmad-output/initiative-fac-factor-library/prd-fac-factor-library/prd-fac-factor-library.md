---
title: 'FAC Factor library'
status: final
created: 2026-10-15
updated: 2026-10-15
parent: _bmad-output/prd-carbon-lite/prd-carbon-lite.md
code: FAC
---

# PRD: FAC Factor library

Workshop sample values, not real emission factors.

## 0. Document Purpose

This is the capability PRD for FAC. It owns FAC.FR-1 to FAC.FR-3. It cites the cross-cutting requirements CLT.NFR-n in the master PRD (`_bmad-output/prd-carbon-lite/prd-carbon-lite.md`) and the architecture decisions AD-n in the system spine (`_bmad-output/architecture-carbon-lite/architecture-carbon-lite.md`). It does not restate them. Terms follow the master PRD glossary.

## 1. Purpose

The factor library holds the emission factors that every calculation uses. It is read only. Factors are versioned and never change (AD-3). In Carbon Hub it maps to the real modules D6 and D7. Code lives in module `factors`.

## 2. User and job

Priya Nair, sustainability lead at Nair Logistics. She wants to see which factors exist, what they say, and which version and source each one has, before she trusts a number.

## 3. Functional requirements

### FAC.FR-1: List emission factors

Returns all factors, ordered by label ascending.

- Acceptance: the six seeded factors come back in label order.
- Acceptance: each item has `id`, `activityType`, `label`, `unit`, `kgCo2ePerUnit` (string), `scope`, `source`, `version`, `validFrom`.
- Acceptance: seeding twice does not create duplicates.
- Acceptance: the web page "Factor library" lists the factors in a table with a scope badge and a version chip, and shows the "Workshop sample values" notice.

### FAC.FR-2: Filter factors

Filters by `scope` (1 or 2) and by `activityType`.

- Acceptance: `scope=1` returns only Scope 1 factors.
- Acceptance: `activityType=diesel` returns one factor.
- Acceptance: a filter with no match returns `count` 0 and empty `items`.
- Acceptance: an invalid `scope` value is rejected with a 400 problem+json (CLT.NFR-3).

### FAC.FR-3: Factor detail

Returns one factor by id.

- Acceptance: a known id returns the full factor.
- Acceptance: an unknown id returns 404 problem+json (CLT.NFR-3).

## 4. Data model

Factor:

| Field | Type | Example |
| --- | --- | --- |
| id | string | `EF-DIESEL-UK-2026.1` |
| activityType | enum | `diesel` |
| label | string | `Diesel (road)` |
| unit | `litre` or `kWh` | `litre` |
| kgCo2ePerUnit | decimal string (CLT.NFR-1, AD-4) | `"2.70"` |
| scope | 1 or 2 | `1` |
| source | string | `Workshop sample` |
| version | string | `2026.1` |
| validFrom | date | `2026-01-01` |

Seed (fixed ids, in memory, idempotent):

| Id | Activity type | Label | Unit | kg CO2e per unit | Scope |
| --- | --- | --- | --- | --- | --- |
| EF-DIESEL-UK-2026.1 | diesel | Diesel (road) | litre | 2.70 | 1 |
| EF-PETROL-UK-2026.1 | petrol | Petrol (road) | litre | 2.31 | 1 |
| EF-NATURALGAS-UK-2026.1 | natural_gas | Natural gas | kWh | 0.183 | 1 |
| EF-LPG-UK-2026.1 | lpg | LPG | litre | 1.56 | 1 |
| EF-GRIDELEC-UK-2026.1 | grid_electricity | Grid electricity (UK) | kWh | 0.207 | 2 |
| EF-DISTRICTHEAT-UK-2026.1 | district_heat | District heat | kWh | 0.150 | 2 |

All six have source `Workshop sample`, version `2026.1`, validFrom `2026-01-01`.

## 5. API

- `GET /api/v1/factors?scope=1|2&activityType=...` returns `{count, items}` (AD-7).
- `GET /api/v1/factors/:id` returns a Factor, or 404 problem+json.

The service interface also offers `getById(id)` and `getCurrentForActivityType(activityType)` for ACT (AD-1).

## 6. Web

A "Factor library" screen with a table, a scope badge, a version chip and the "Workshop sample values" notice. See `ux-fac-factor-library/EXPERIENCE.md` (this screen) and `ux-fac-factor-library/DESIGN.md` (the shared design) in this initiative.

## 7. Non-goals

- Creating, editing or deleting factors.
- Importing factors from a file or a service.
- Publishing new versions through the UI.
- Scope 3 factors.

## 8. Dependencies

None. FAC is the bottom of the chain (AD-1). ACT and FPS depend on it.

## 9. Open questions

None.

## 10. Ticket acceptance criteria

The epic `epic-browse-factors` plans two tickets. Ticket files are pulled only on demand, so the acceptance criteria are kept here in the form a pulled ticket would carry. `/bmad-build 1.1` reads the entry in `epic-browse-factors/tickets.toml`, the epic envelope and this document.

### Ticket 1.1: List seeded factors

Covers FAC.FR-1 and FAC.FR-2. Scope: `GET /api/v1/factors` with `scope` and `activityType` filters, plus the "Factor library" web page. The seven criteria below are the acceptance criteria for this ticket. They are lettered (a) to (g) because the tests and the review refer to them.

**(a) Seeded list, ordered**
**Given** the six factors are seeded
**When** I call `GET /api/v1/factors`
**Then** the response is 200 with `count` 6
**And** the items are ordered by label ascending

**(b) Item shape**
**Given** the factors are listed
**When** I look at any item
**Then** it has `id`, `activityType`, `label`, `unit`, `kgCo2ePerUnit`, `scope`, `source`, `version` and `validFrom`
**And** `kgCo2ePerUnit` is a string, not a number

**(c) Scope filter**
**Given** the six factors are seeded
**When** I call `GET /api/v1/factors?scope=1`
**Then** only Scope 1 factors are returned
**And** `count` matches the number of items

**(d) Activity type filter**
**Given** the six factors are seeded
**When** I call `GET /api/v1/factors?activityType=diesel`
**Then** exactly one factor is returned
**And** it is the diesel factor

**(e) No match**
**Given** the six factors are seeded
**When** I call the list with a filter that matches nothing
**Then** the response is 200 with `count` 0
**And** `items` is an empty array

**(f) Idempotent seed**
**Given** the seed has already run once
**When** the seed runs a second time
**Then** the list still returns six factors
**And** no factor id appears twice

**(g) Web page**
**Given** I open the web app
**When** I select the "Factor library" page
**Then** the factors are listed in a table with a scope badge and a version chip on each row
**And** a "Workshop sample values" notice is visible

### Ticket 1.2: Factor detail by id

Covers FAC.FR-3.

**Known id**
**Given** the factor `EF-DIESEL-UK-2026.1` is seeded
**When** I call `GET /api/v1/factors/EF-DIESEL-UK-2026.1`
**Then** the response is 200 with the full factor
**And** `kgCo2ePerUnit` is the string `"2.70"`

**Unknown id**
**Given** no factor has the id `EF-UNKNOWN-1`
**When** I call `GET /api/v1/factors/EF-UNKNOWN-1`
**Then** the response is 404 problem+json
**And** it has `type`, `title`, `status` and `detail`

**Detail on the page**
**Given** I am on the "Factor library" page
**When** I select a factor row
**Then** I see all fields of that factor
**And** the "Workshop sample values" notice is still visible
