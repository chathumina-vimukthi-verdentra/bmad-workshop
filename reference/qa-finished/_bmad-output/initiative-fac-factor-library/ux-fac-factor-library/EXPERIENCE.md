---
name: Carbon Hub Lite
status: final
sources:
  - ../prd-fac-factor-library/prd-fac-factor-library.md
  - ../../initiative-act-activity-entry/prd-act-activity-entry/prd-act-activity-entry.md
  - ../../initiative-fps-footprint-summary/prd-fps-footprint-summary/prd-fps-footprint-summary.md
created: 2026-10-15
updated: 2026-10-15
---

# Experience: Carbon Hub Lite

This file says how Carbon Hub Lite behaves. The companion file `DESIGN.md` says how it looks. Open `mockups/index.html` to click through it. The spine wins on conflict with any mock.

Workshop sample values, not real emission factors. All figures are fictional.

## Foundation

Single web app, desktop first, usable on a phone. Plain React with the design tokens in `DESIGN.md`. No UI system. One persona: **Priya Nair**, sustainability lead at Nair Logistics, a small UK haulage firm. She is not a carbon expert. She has fuel and electricity numbers from invoices. She wants to record them for one site and one month, and see a footprint she can trust and explain. She needs to know which factor was used and whether a figure is Verified or Indicative.

The web app formats numbers for display only. It never calculates and never re-sorts what the API returns.

## Information Architecture

| Surface | Reached from | Purpose | Capability |
|---|---|---|---|
| Factor library | Factors tab | Show which emission factors exist and which version is current | FAC.FR-1, FAC.FR-2, FAC.FR-3 |
| Record activity | Activities tab | Record one activity for a site and period, and list what was recorded | ACT.FR-1, ACT.FR-2, ACT.FR-3 |
| Footprint summary | Footprint tab | Show the indicative footprint for a site and period, by scope | FPS.FR-1, FPS.FR-2, FPS.FR-3 |

Navigation is by the three tabs only. The tab state is kept in the URL hash (`#factors`, `#activities`, `#footprint`). Every surface has a journey that lands there (see Key Flows).

## Voice and Tone

Plain, short and calm. Say what happened and what to do next. No jargon, no blame.

- Notice (sample): "Workshop sample values, not real emission factors."
- Notice (info, Footprint): "Every figure is Indicative in this workshop. Verified figures need certification, which is out of scope."
- Status pill tooltip: "Indicative: calculated from sample factors, not certified."
- Note on Footprint: "Figures are calculated from factors and quantities only. No figure is written by AI."
- Column help on kgCO2e per unit: "Kilograms of CO2 equivalent for one unit."

## Component Patterns

- **Tab nav.** Native links with `role="tablist"`. A tab switch moves focus to the page title.
- **Data table.** Rows are not interactive in ticket 1.1. The API owns the order. Below 720px the table scrolls sideways inside its card and the toolbar stacks.
- **Filter.** A native select. An invalid value is not possible from the select.
- **Form.** One message next to each invalid field. On error, focus moves to the first invalid field. Enter submits.
- **Notice banner.** Four variants (sample, info, error, success). The sample banner shows on Factors and is repeated in the footer of every screen.

## State Patterns

| Screen | Loading | Empty | Error | Success |
|---|---|---|---|---|
| Factor library | Five grey skeleton rows. Screen reader text: "Loading factors" | "No factors match this filter." with a "Clear filter" button | Error banner "We could not load the factors. Try again." with a "Try again" button | The table. The count text updates, for example "3 factors" |
| Record activity | The button shows "Recording..." and is disabled. Fields stay | "No activities recorded for this site and period yet." | Field errors inline, plus a banner "Please fix the 2 problems below." (the count matches) | Green banner "Activity ACT-0004 recorded." Quantity clears, Site and Period stay, the new row shows at the top |
| Footprint summary | Three skeleton cards and three skeleton rows | "No activities for this site and period. Record an activity first." with a "Record activity" button | Error banner "We could not calculate the footprint. Try again." | Cards and table as in Screens |

## Interaction Primitives

- Keyboard: tab order follows the visual order. Enter submits forms. Cards are not interactive.
- Focus: a visible 3px focus ring on every interactive element. After a tab switch, focus goes to the page title.
- Responsive: below 960px the Record activity columns stack, form first. Below 720px tables scroll sideways and Footprint cards stack, Total first.

## Accessibility Floor

WCAG 2.2 AA.

- Targets at least 44 by 44px for tabs, buttons and inputs.
- Form errors use `role="alert"` and are linked to the field with `aria-describedby`. The field has `aria-invalid="true"`.
- Badges, pills and errors carry text, not only colour.
- No animation beyond a 150ms fade, and `prefers-reduced-motion` is respected.
- Contrast values are in `DESIGN.md`.

## Screens

### Factor library (FAC, ticket 1.1 list and 1.2 detail)

**Purpose:** show which emission factors exist and which version is current.

- Page title "Factor library" and a one line intro.
- Notice banner (sample): "Workshop sample values, not real emission factors."
- Toolbar: a Scope filter select (All scopes, Scope 1, Scope 2) with the label "Scope", and a count text "6 factors".
- Data table. Columns: Factor (label and id), Activity type, Unit, kgCO2e per unit, Scope badge, Version chip, Valid from.
- Sort: label ascending, fixed.
- `kgCO2e per unit` is shown exactly as received, as a string.
- Validation: none on the screen.

### Record activity (ACT, tickets 1.1 record and 1.2 list)

**Purpose:** let Priya record one activity for a site and period.

- Page title "Record activity". Two columns on wide screens: the form card (left) and the recent activities card (right).
- Form fields in order: Site, Period, Activity type, Quantity, Unit (read only), then the button "Record activity".
- The recent activities card lists the activities for the chosen site and period: id, type, and quantity with unit.

| Field | Rule |
|---|---|
| Site | Required. Free text, for example "Depot 1". |
| Period | Required. `YYYY` or `YYYY-MM`. Help text: "Use 2026 or 2026-03." |
| Activity type | Required. Choose one of the six factors by label. |
| Quantity | Required. Decimal number greater than 0. Sent as a string. |
| Unit | Read only. Set from the chosen factor (litre or kWh). Empty until a type is chosen. |

Validation messages (they map to the `errors` array of the 422 problem+json response):

- Site empty: "Enter a site."
- Period empty: "Enter a period."
- Period wrong format: "Use 2026 or 2026-03."
- Activity type empty: "Choose an activity type."
- Quantity empty: "Enter a quantity."
- Quantity not a number: "Quantity must be a number."
- Quantity zero or less: "Quantity must be greater than 0."

Prototype note: submit with period "2026-3" to see the example error "Use 2026 or 2026-03."

### Footprint summary (FPS, tickets 1.1 calculate and 1.2 summary)

**Purpose:** show the indicative footprint for a site and period, by scope, and how each line was worked out.

- Page title "Footprint summary". Context line: "Depot 1, 2026-03".
- Notice banner (info) as in Voice and Tone.
- Three summary cards: Scope 1, Scope 2, Total. Each shows tCO2e (3 decimals), the kg value (2 decimals) and the status pill Indicative.
- Lines table. Columns: Activity, Type, Quantity, Factor id, kgCO2e, Scope badge. A total row sits at the bottom.
- Card caption: "tCO2e" with kg in small text, for example "4,704.00 kgCO2e".
- If site and period are missing: "Choose a site and period on the Activities tab."

Sample figures used in the prototype:

| Line | Quantity | Factor | kgCO2e | Scope |
|---|---|---|---|---|
| Diesel (road) | 1200 litre | EF-DIESEL-UK-2026.1 | 3240.00 | 1 |
| Natural gas | 8000 kWh | EF-NATURALGAS-UK-2026.1 | 1464.00 | 1 |
| Grid electricity (UK) | 15000 kWh | EF-GRIDELEC-UK-2026.1 | 3105.00 | 2 |

Scope 1 = 4704.00 kg = 4.704 t. Scope 2 = 3105.00 kg = 3.105 t. Total = 7809.00 kg = 7.809 t.

## Key Flows

**Priya answers "How big was the Depot 1 footprint in March 2026?"**

1. **Factor library.** She opens Factors. She sees the six sample factors, each with a scope badge and a version chip. She filters by scope to check which fuels are Scope 1. She reads the sample values notice.
2. **Record activity.** She opens Activities. She enters site "Depot 1", period "2026-03", picks "Diesel (road)" and types 1200. The unit fills in as litre. She submits. The activity appears in the recent list. She repeats for natural gas (8000 kWh) and grid electricity (15000 kWh). Once she mistypes the period and sees the inline error.
3. **Footprint summary.** She opens Footprint. She sees Scope 1 at 4.704 tCO2e, Scope 2 at 3.105 tCO2e and Total 7.809 tCO2e, each marked Indicative. The lines table shows kgCO2e for each activity. **Climax:** she can see the factor id behind every line and explain the number.

## Cross-screen rules

- Quantities and factors are shown exactly as stored (strings). Only the calculation rounds, to 2 decimals for kg and 3 for tonnes.
- The sample values notice is repeated in the footer of every screen.
- Capability map: Factor library is FAC, Record activity is ACT, Footprint summary is FPS.
