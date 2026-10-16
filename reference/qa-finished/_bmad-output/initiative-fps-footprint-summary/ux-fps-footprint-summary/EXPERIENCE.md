---
name: Carbon Hub Lite, Footprint summary
status: final
sources:
  - ../prd-fps-footprint-summary/prd-fps-footprint-summary.md
created: 2026-10-15
updated: 2026-10-16
---

# Experience: Footprint summary

This file says how the Footprint summary screen behaves. The companion file `DESIGN.md` says what it adds to the shared design. Open `mockups/index.html` to see it. The spine wins on conflict with any mock.

Workshop sample values, not real emission factors. All figures are fictional.

Stories: 3.1 Calculate emissions for one activity and 3.2 Footprint summary by scope with Indicative status, both in `../epic-footprint-summary/tickets.toml`. Requirements: FPS.FR-1 to FPS.FR-3 in `../prd-fps-footprint-summary/prd-fps-footprint-summary.md`.

## Purpose

Show the indicative footprint for a site and period, by scope, and how each line was worked out. Priya needs to report a number and be honest that it is not verified.

## Layout

Page title "Footprint summary". Context line: "Depot 1, 2026-03". Notice banner (info). Three summary cards: Scope 1, Scope 2, Total. Then the lines card.

## Screen

- Notice banner (info): "Every figure is Indicative in this workshop. Verified figures need certification, which is out of scope."
- Each summary card shows tCO2e (3 decimals), the kg value (2 decimals) and the status pill Indicative.
- Lines table. Columns: Activity, Type, Quantity, Factor id, kgCO2e, Scope badge. A total row sits at the bottom.
- Card caption: "tCO2e" with kg in small text, for example "4,704.00 kgCO2e".
- Status pill tooltip: "Indicative: calculated from sample factors, not certified."
- Note under the table: "Figures are calculated from factors and quantities only. No figure is written by AI."

Sample figures used in the prototype:

| Line | Quantity | Factor | kgCO2e | Scope |
|---|---|---|---|---|
| Diesel (road) | 1200 litre | EF-DIESEL-UK-2026.1 | 3240.00 | 1 |
| Natural gas | 8000 kWh | EF-NATURALGAS-UK-2026.1 | 1464.00 | 1 |
| Grid electricity (UK) | 15000 kWh | EF-GRIDELEC-UK-2026.1 | 3105.00 | 2 |

Scope 1 = 4704.00 kg = 4.704 t. Scope 2 = 3105.00 kg = 3.105 t. Total = 7809.00 kg = 7.809 t.

## States

| Loading | Empty | Error | Success |
|---|---|---|---|
| Three skeleton cards and three skeleton rows | "No activities for this site and period. Record an activity first." with a "Record activity" button | Error banner "We could not calculate the footprint. Try again." | Cards and table as above |

If site and period are missing: "Choose a site and period on the Activities tab."

## Keyboard and accessibility

- Tab order follows the visual order. Cards are not interactive.
- A visible 3px focus ring on every interactive element.
- The status pill and the scope badge carry text, not only colour. WCAG 2.2 AA.

## Key Flow

**Priya answers "How big was the Depot 1 footprint in March 2026?"** She opens Footprint. She sees Scope 1 at 4.704 tCO2e, Scope 2 at 3.105 tCO2e and Total 7.809 tCO2e, each marked Indicative. The lines table shows kgCO2e for each activity. **Climax:** she can see the factor id behind every line and explain the number.

## Cross-screen rules

- Quantities and factors are shown exactly as stored (strings). Only the calculation rounds, to 2 decimals for kg and 3 for tonnes.
- The sample values notice is repeated in the footer of every screen.
