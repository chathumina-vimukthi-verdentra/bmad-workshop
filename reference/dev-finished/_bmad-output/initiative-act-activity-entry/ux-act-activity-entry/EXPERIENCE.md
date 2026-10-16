---
name: Carbon Hub Lite, Record activity
status: final
sources:
  - ../prd-act-activity-entry/prd-act-activity-entry.md
created: 2026-10-15
updated: 2026-10-16
---

# Experience: Record activity

This file says how the Record activity screen behaves. The companion file `DESIGN.md` says what it adds to the shared design. Open `mockups/index.html` to click through it. The spine wins on conflict with any mock.

Workshop sample values, not real emission factors. All figures are fictional.

Stories: 2.1 Record an activity and 2.2 List activities with validation messages, both in `../epic-record-activities/tickets.toml`. Requirements: ACT.FR-1 to ACT.FR-3 in `../prd-act-activity-entry/prd-act-activity-entry.md`.

## Purpose

Let Priya record one activity for a site and a period, and see what she recorded. She has fuel and electricity numbers from invoices. She is not a carbon expert.

## Layout

Page title "Record activity". Two columns on wide screens: the form card (left) and the recent activities card (right). Below 960px the columns stack, form first.

## Screen

Form fields in order: Site, Period, Activity type, Quantity, Unit (read only), then the button "Record activity". The recent activities card lists the activities for the chosen site and period: id, type, and quantity with unit.

| Field | Rule |
|---|---|
| Site | Required. Free text, for example "Depot 1". |
| Period | Required. `YYYY` or `YYYY-MM`. Help text: "Use 2026 or 2026-03." |
| Activity type | Required. Choose one of the six factors by label. |
| Quantity | Required. Decimal number greater than 0. Sent as a string. |
| Unit | Read only. Set from the chosen factor (litre or kWh). Empty until a type is chosen. |

The factor is pinned when the activity is recorded. The screen never looks up "latest".

## States

| Loading | Empty | Error | Success |
|---|---|---|---|
| The button shows "Recording..." and is disabled. Fields stay | "No activities recorded for this site and period yet." | Field errors inline, plus a banner "Please fix the 2 problems below." (the count matches) | Green banner "Activity ACT-0004 recorded." Quantity clears, Site and Period stay, the new row shows at the top |

## Copy and validation messages

They map to the `errors` array of the 422 problem+json response.

- Site empty: "Enter a site."
- Period empty: "Enter a period."
- Period wrong format: "Use 2026 or 2026-03."
- Activity type empty: "Choose an activity type."
- Quantity empty: "Enter a quantity."
- Quantity not a number: "Quantity must be a number."
- Quantity zero or less: "Quantity must be greater than 0."

Prototype note: open `mockups/index.html?demo=error` to see the error example "Use 2026 or 2026-03." (period "2026-3"). The export `mockups/screens/02-record-activity.png` shows it.

## Keyboard and accessibility

- Tab order follows the visual order. Enter submits the form.
- On error, focus moves to the first invalid field.
- Form errors use `role="alert"` and are linked to the field with `aria-describedby`. The field has `aria-invalid="true"`.
- A visible 3px focus ring on every interactive element. Targets are at least 44 by 44px.
- Errors carry text, not only colour. WCAG 2.2 AA.

## Key Flow

**Priya records March for Depot 1.** She opens Activities. She enters site "Depot 1", period "2026-03", picks "Diesel (road)" and types 1200. The unit fills in as litre. She submits. The activity appears in the recent list. She repeats for natural gas (8000 kWh) and grid electricity (15000 kWh). Once she mistypes the period and sees the inline error.

## Cross-screen rules

- Quantities are shown and sent exactly as typed (strings). Nothing is rounded here.
- The sample values notice is repeated in the footer of every screen.
