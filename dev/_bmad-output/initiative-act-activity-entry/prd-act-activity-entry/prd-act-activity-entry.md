---
title: 'ACT Activity entry'
status: final
created: 2026-10-15
updated: 2026-10-15
parent: _bmad-output/prd-carbon-lite/prd-carbon-lite.md
code: ACT
---

# PRD: ACT Activity entry

Workshop sample values, not real emission factors.

## 0. Document Purpose

This is the capability PRD for ACT. It owns ACT.FR-1 to ACT.FR-3. It cites CLT.NFR-n from the master PRD (`_bmad-output/prd-carbon-lite/prd-carbon-lite.md`) and AD-n from the system spine (`_bmad-output/architecture-carbon-lite/architecture-carbon-lite.md`). It does not restate them. Terms follow the master PRD glossary.

## 1. Purpose

Activity entry lets a member record fuel and electricity use for a site and a reporting period. It pins the current factor to each activity when the activity is created (AD-6). In Carbon Hub it maps to the real module D5. Code lives in module `activities`.

## 2. User and job

Priya Nair, sustainability lead at Nair Logistics. She has fuel card totals and electricity bills for each depot. She wants to enter them once, get clear messages if something is wrong, and see what she entered.

## 3. Functional requirements

### ACT.FR-1: Record an activity

Creates one activity from `siteId`, `period`, `activityType`, `quantity` and `unit`.

- Acceptance: a valid request returns 201 with the Activity.
- Acceptance: the activity has a sequential id (`ACT-0001`, `ACT-0002`) and a `createdAt` time.
- Acceptance: `factorId` is the current factor for the activity type, pinned at creation (AD-6).
- Acceptance: `quantity` is stored and returned as a decimal string, exactly as sent (CLT.NFR-1).

### ACT.FR-2: Validate input

Rejects bad input with 422 problem+json and an `errors` array (CLT.NFR-3, AD-7). Each error names the field and says what is wrong.

- Acceptance: `quantity` must be a decimal string greater than zero.
- Acceptance: `period` must match `YYYY` or `YYYY-MM`.
- Acceptance: `activityType` must be one of the six known types.
- Acceptance: `unit` must match the factor unit for that activity type.
- Acceptance: `siteId` must not be empty.
- Acceptance: several problems in one request give several errors.
- Acceptance: nothing is stored when the request is invalid.

### ACT.FR-3: List activities

Lists activities for a site and period.

- Acceptance: `siteId` and `period` filter the list.
- Acceptance: the response is `{count, items}`, oldest first.
- Acceptance: no match gives `count` 0 and empty `items`.

## 4. Data model

Activity:

| Field | Type | Example |
| --- | --- | --- |
| id | string | `ACT-0001` |
| siteId | string | `depot-leeds` |
| period | `YYYY` or `YYYY-MM` | `2026-03` |
| activityType | enum | `diesel` |
| quantity | decimal string, greater than 0 | `"1250.5"` |
| unit | `litre` or `kWh` | `litre` |
| factorId | string, pinned | `EF-DIESEL-UK-2026.1` |
| createdAt | ISO 8601 | `2026-10-15T09:30:00Z` |

ACT is the only writer of activities (AD-2). Storage is in memory.

## 5. API

- `POST /api/v1/activities` with `{siteId, period, activityType, quantity, unit}` returns 201 Activity, or 422 problem+json with `errors`.
- `GET /api/v1/activities?siteId=&period=` returns `{count, items}`.

The service interface offers `listForSitePeriod(siteId, period)`. It returns each activity with its pinned factor resolved, so FPS does not call FAC directly (AD-1).

## 6. Web

A "Record activity" screen with a form and a list of recorded activities. See `EXPERIENCE.md` and `DESIGN.md` in `_bmad-output/initiative-act-activity-entry/ux-act-activity-entry/`.

## 7. Non-goals

- Editing or deleting activities.
- Bulk upload or CSV import.
- Site management. A site is just a text id here.
- Choosing an older factor version.
- Scope 3 activity types.

## 8. Dependencies

- FAC service, for the current factor and the unit check (AD-1).
- Used by FPS.

## 9. Open questions

None.

## 10. Ticket acceptance criteria

The epic `epic-record-activities` plans two tickets. The criteria are kept here in the form a pulled ticket would carry.

### Ticket 1.1: Record an activity

Covers ACT.FR-1 and ACT.FR-2.

**Valid activity is recorded**
**Given** the factors are seeded
**When** I `POST /api/v1/activities` with `{"siteId":"depot-leeds","period":"2026-03","activityType":"diesel","quantity":"1250.5","unit":"litre"}`
**Then** the response is 201 with an Activity
**And** its id is `ACT-0001` and `quantity` is the string `"1250.5"`

**Factor is pinned**
**Given** an activity was just recorded for diesel
**When** I look at its `factorId`
**Then** it is `EF-DIESEL-UK-2026.1`
**And** it stays that value even if newer factors exist later

**Quantity must be greater than zero**
**Given** a request with `quantity` `"0"` or `"-5"`
**When** I `POST /api/v1/activities`
**Then** the response is 422 problem+json
**And** `errors` has an entry for `quantity`

**Period format**
**Given** a request with `period` `"March 2026"`
**When** I `POST /api/v1/activities`
**Then** the response is 422 problem+json
**And** `errors` has an entry for `period` that says the allowed formats

**Unit matches the factor**
**Given** a request with `unit` `"kWh"` for `activityType` `"diesel"`
**When** I `POST /api/v1/activities`
**Then** the response is 422 problem+json
**And** `errors` has an entry for `unit`

**Several errors at once**
**Given** a request with more than one invalid field
**When** I `POST /api/v1/activities`
**Then** `errors` lists every invalid field
**And** no activity is stored

**Web form**
**Given** I am on the "Record activity" page
**When** I submit a valid form
**Then** the activity appears in the list on the same page
**And** the form is cleared

### Ticket 1.2: List activities and show validation messages

Covers ACT.FR-3 and ACT.FR-2 on the page.

**List by site and period**
**Given** two activities exist for `depot-leeds` in `2026-03` and one for `depot-york`
**When** I call `GET /api/v1/activities?siteId=depot-leeds&period=2026-03`
**Then** the response is 200 with `count` 2
**And** the items are in the order they were recorded

**No match**
**Given** no activity matches the site and period
**When** I call `GET /api/v1/activities?siteId=depot-leeds&period=2030`
**Then** the response is 200 with `count` 0
**And** `items` is an empty array

**Messages next to fields**
**Given** I am on the "Record activity" page and the API returns validation errors
**When** the response arrives
**Then** each message is shown next to its field
**And** the values I typed are kept

**Empty state**
**Given** I have not recorded any activity for the chosen site and period
**When** I view the list on the "Record activity" page
**Then** I see an empty state that tells me to record the first activity
