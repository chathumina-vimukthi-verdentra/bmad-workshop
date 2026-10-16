---
title: 'Carbon Hub Lite'
status: final
created: 2026-10-15
updated: 2026-10-15
---

# PRD: Carbon Hub Lite

Workshop sample values, not real emission factors. Every factor number in this project is fictional.

## 0. Document Purpose

This is the master PRD for Carbon Hub Lite. It states the problem, the bet, the release plan and the cross-cutting non-functional requirements (CLT.NFR-n) that bind every capability PRD. It holds no functional requirements: each capability PRD in the index (section 4) owns its own FRs, cites CLT.NFR ids rather than restating them, and uses the terms in the Glossary (section 7) exactly.

Carbon Hub Lite is a small slice of Carbon Hub, the Veriforce carbon measurement platform. In Carbon Hub, members measure, certify and set targets for their emissions across Scope 1, 2 and 3. This sample keeps the real principles (versioned factors, decimal arithmetic, a status on every figure, one writer per aggregate) in a form small enough to build in a workshop.

## 1. Problem and Bet

A small business is asked to "do the carbon numbers". It has fuel card totals and electricity bills for each depot. It does not have a carbon specialist. The people who do the work do not know which emission factor to use, cannot explain where a figure came from, and cannot tell a trusted figure from a rough one.

**The bet:** keep the job small and honest. A member records fuel and electricity use for a site and a reporting period and sees an indicative footprint. Every figure shows the factor behind it and a status. Nothing is hidden and nothing claims to be verified.

Principles that shape every capability:

- Factors are data and they are versioned. A factor never changes. A new value is a new version with a new id.
- Quantities and factors are decimal strings. No floats anywhere.
- Every figure shows its status, Verified or Indicative. Carbon Hub Lite only produces Indicative.
- No AI writes a figure. Numbers come from rules and factors only.
- One writer per piece of data. Each module owns its data and others read it through the owner.

## 2. Key User Journey

**UJ-1. Priya records March at Depot 1 and reads her footprint.**

- **Persona + context:** Priya Nair is the sustainability lead at Nair Logistics, a small UK haulage firm. She is not a carbon specialist. She has fuel card totals and electricity bills for each depot, and she needs a figure she can explain to her managing director.
- **Entry state:** Priya has the numbers on paper. She has never used Carbon Hub Lite.
- **Path:**
  1. Priya opens the **factor library** and sees the six sample **emission factors**, each with its **scope**, version and source.
  2. She opens **activity entry** and records diesel, natural gas and grid electricity use for site "Depot 1" and period 2026-03.
  3. When she mistypes the period, she sees a clear message next to the field and fixes it.
  4. She opens the **footprint summary** for Depot 1 and 2026-03.
- **Climax:** She sees Scope 1, Scope 2 and the total in tonnes CO2e, each marked **Indicative**, with the factor id behind every line.
- **Resolution:** She can explain the number: this quantity, this factor, this version.
- **Edge case:** Her figure never changes later because a factor changed, since each activity keeps the factor id it was recorded with (CLT.NFR-2).

The Veriforce analyst (read only access) is out of scope for Carbon Hub Lite.

## 3. Release Plan

**R1** delivers UJ-1 end to end: Factor library (FAC), Activity entry (ACT) and Footprint summary (FPS). The build order follows the module dependency in the system spine (AD-1): FAC first, then ACT, then FPS. [ASSUMPTION: factors and activities live in memory and are seeded on start. Nothing is stored between runs.]

In the workshop only FAC is built, and only its first ticket (FAC epic 1, ticket 1: List seeded factors). The other tickets and initiatives stay in the backlog.

## 4. PRD Index

Initiative folders sit under `_bmad-output/`. Capability PRD paths are relative to the initiative folder.

| Code | Capability | Release | Initiative folder | Capability PRD | Covers |
|---|---|---|---|---|---|
| FAC | Factor library | R1 | `initiative-fac-factor-library/` | `prd-fac-factor-library/prd-fac-factor-library.md` | See the versioned emission factors, filter them by scope and activity type, open one factor by id. |
| ACT | Activity entry | R1 | `initiative-act-activity-entry/` | `prd-act-activity-entry/prd-act-activity-entry.md` | Record an activity for a site and period, get a clear message for each invalid field, list what was recorded. |
| FPS | Footprint summary | R1 | `initiative-fps-footprint-summary/` | `prd-fps-footprint-summary/prd-fps-footprint-summary.md` | Calculate emissions for each activity with its pinned factor, total by scope, show the Indicative status. |

Module slugs: FAC is code in module `factors`, ACT in `activities`, FPS in `footprint` (see `modules.yaml`).

## 5. Cross-Cutting Non-Functional Requirements

These bind every capability PRD. Cite them as CLT.NFR-n.

- **CLT.NFR-1. Precision.** All arithmetic uses decimal.js. No float is used to store, send or calculate a quantity or a factor value.
- **CLT.NFR-2. Determinism.** The same activities and factors always give the same footprint. Calculation never looks up the latest factor.
- **CLT.NFR-3. Error format.** Every API error is RFC 9457 problem+json with `type`, `title`, `status` and `detail`.
- **CLT.NFR-4. Test evidence.** Every acceptance criterion has a passing automated test before a ticket is done. A criterion that cannot be tested by the API suite says how it is checked by hand.
- **CLT.NFR-5. Runs anywhere.** The sample runs on a normal laptop with Node.js 24 LTS (works on 20 and above). No database or cloud account is needed.

## 6. Success Metrics

- **SM-1. Ticket 1.1 in the time box:** a developer starts from the starter and has FAC epic 1, ticket 1 working, with tests, inside the workshop time box. Validates CLT.NFR-4.
- **SM-2. Criteria map to tests:** every acceptance criterion of that ticket maps to one passing test, or to a stated manual check.
- **SM-3. Reviewable:** a reviewer can check a ticket against its acceptance criteria and the system spine, and find what is missing.
- **SM-4. Readable plan:** a new reader can tell, from the initiative folders and their `tickets.toml` files, what to build next.

## 7. Glossary

- **Activity** - one recorded use of fuel or electricity for a site and period.
- **Activity type** - one of diesel, petrol, natural_gas, lpg, grid_electricity, district_heat.
- **Emission factor** - kg CO2e produced per unit of an activity type.
- **kg CO2e** - kilograms of carbon dioxide equivalent.
- **t CO2e** - tonnes of carbon dioxide equivalent (1 t = 1000 kg).
- **Scope 1** - direct emissions, such as fuel burned in owned vehicles.
- **Scope 2** - indirect emissions from purchased electricity and heat.
- **Pinned factor** - the factor id stored on an activity when it was created.
- **Site** - a place where activity happens, such as a depot. A text id in Carbon Hub Lite.
- **Period** - a year (`2026`) or a month (`2026-03`).
- **Indicative** - a figure that has not been verified. The only status in Carbon Hub Lite.
- **Verified** - a figure that has passed verification. Not produced in Carbon Hub Lite.
- **Problem+json** - the standard JSON error format, RFC 9457.

## 8. Out of Scope

Scope 3, verification and certification (nothing becomes Verified), sign-in, organisations, roles and multiple tenants, editing or deleting activities, editing or importing factors and publishing new factor versions through the UI, persistent storage, reports, exports and targets, AI features of any kind, and the Veriforce analyst role.

## 9. Assumptions Index

- Section 3: factors and activities live in memory and are seeded on start.
