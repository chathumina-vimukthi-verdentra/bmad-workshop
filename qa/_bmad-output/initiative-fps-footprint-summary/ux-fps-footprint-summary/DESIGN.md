---
name: Carbon Hub Lite, Footprint summary
description: The Footprint summary screen. It inherits the Factor library design and adds only the summary card, the Indicative status pill and the lines table with a total row.
status: final
inherits: ../../initiative-fac-factor-library/ux-fac-factor-library/DESIGN.md
created: 2026-10-15
updated: 2026-10-16
---

# Design: Footprint summary

This file inherits the shared design in `../../initiative-fac-factor-library/ux-fac-factor-library/DESIGN.md`: colours, typography, spacing, shapes, scope badge, version chip, data table and the app header. Read that file first. Only what this screen adds or uses is listed here.

Workshop sample values, not real emission factors.

## Uses from the shared design

- App header and tab nav (the Footprint tab is current).
- Data table, with right aligned numbers and tabular numerals.
- Scope badge and version chip (the chip holds the factor id).
- Notice banner, variant info.

## Adds

### Summary card
White card with a 4px top accent bar: green for Scope 1, blue for Scope 2, navy for Total. Content: a label, the Display figure in tCO2e (3 decimals), the kg figure in muted text (2 decimals), and the status pill. The accent bar is decorative. The label carries the meaning.

### Status pill
- Indicative: amber tint background, amber text, an 8px amber dot and the text "Indicative".
- Verified: green tint background, green text, a check icon and the text "Verified". Carbon Hub Lite never shows it.

Shown next to every total. The tooltip says "Indicative: calculated from sample factors, not certified."

### Lines table
The shared data table with a footer row: the label "Total" and the summed kgCO2e, right aligned and bold.

## Layout

Three summary cards in a row on wide screens, then the lines card. Below 720px the cards stack, Total first, and the table scrolls sideways inside its card.
