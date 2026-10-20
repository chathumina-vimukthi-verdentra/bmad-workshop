---
name: Carbon Hub Lite, Factor library
status: final
sources:
  - ../prd-fac-factor-library/prd-fac-factor-library.md
created: 2026-10-15
updated: 2026-10-16
---

# Experience: Factor library

This file says how the Factor library screen behaves. The companion file `DESIGN.md` says how it looks and is shared by all three screens. Open `mockups/index.html` to click through it. The spine wins on conflict with any mock.

Workshop sample values, not real emission factors. All figures are fictional.

Stories: 1.1 List seeded factors and 1.2 Factor detail by id, both in `../epic-browse-factors/tickets.toml`. Requirements: FAC.FR-1, FAC.FR-2 and FAC.FR-3 in `../prd-fac-factor-library/prd-fac-factor-library.md`.

## Foundation

Single web app, desktop first, usable on a phone. Plain React with the design tokens in `DESIGN.md`. No UI system. One persona: **Priya Nair**, sustainability lead at Nair Logistics, a small UK haulage firm. She is not a carbon expert. On this screen she wants to know which factors exist, and which version and source each one has, before she trusts a number.

The web app formats numbers for display only. It never calculates and never re-sorts what the API returns.

## Information Architecture

| Surface | Reached from | Purpose | Capability |
|---|---|---|---|
| Factor library | Factors tab | Show which emission factors exist and which version is current | FAC.FR-1, FAC.FR-2, FAC.FR-3 |

The tab state is kept in the URL hash (`#factors`).

## Voice and Tone

Plain, short and calm. Say what happened and what to do next. No jargon, no blame.

- Notice (sample): "Workshop sample values, not real emission factors."
- Column help on kgCO2e per unit: "Kilograms of CO2 equivalent for one unit."

## Component Patterns

- **Tab nav.** Native links with `role="tablist"`. A tab switch moves focus to the page title.
- **Data table.** Rows are not interactive in ticket 1.1. The API owns the order. Below 720px the table scrolls sideways inside its card and the toolbar stacks.
- **Filter.** A native select. An invalid value is not possible from the select.
- **Notice banner.** The sample banner shows on Factors and is repeated in the footer of every screen.

## State Patterns

| Screen | Loading | Empty | Error | Success |
|---|---|---|---|---|
| Factor library | Five grey skeleton rows. Screen reader text: "Loading factors" | "No factors match this filter." with a "Clear filter" button | Error banner "We could not load the factors. Try again." with a "Try again" button | The table. The count text updates, for example "3 factors" |

## Interaction Primitives

- Keyboard: tab order follows the visual order. Cards are not interactive.
- Focus: a visible 3px focus ring on every interactive element. After a tab switch, focus goes to the page title.
- Responsive: below 720px tables scroll sideways.

## Accessibility Floor

WCAG 2.2 AA.

- Targets at least 44 by 44px for tabs, buttons and inputs.
- Badges and chips carry text, not only colour.
- No animation beyond a 150ms fade, and `prefers-reduced-motion` is respected.
- Contrast values are in `DESIGN.md`.

## Screen: Factor library (FAC, ticket 1.1 list and 1.2 detail)

**Purpose:** show which emission factors exist and which version is current.

- Page title "Factor library" and a one line intro.
- Notice banner (sample): "Workshop sample values, not real emission factors."
- Toolbar: a Scope filter select (All scopes, Scope 1, Scope 2) with the label "Scope", and a count text "6 factors".
- Data table. Columns: Factor (label and id), Activity type, Unit, kgCO2e per unit, Scope badge, Version chip, Valid from.
- Sort: label ascending, fixed.
- `kgCO2e per unit` is shown exactly as received, as a string.
- Validation: none on the screen.

## Key Flow

**Priya checks which factors a figure is built on.** She opens Factors. She sees the six sample factors, each with a scope badge and a version chip. She filters by scope to check which fuels are Scope 1. She reads the sample values notice. She can now name the factor id and version behind any figure she sees later.

## Cross-screen rules

- Quantities and factors are shown exactly as stored (strings).
- The sample values notice is repeated in the footer of every screen.
- Capability map: Factor library is FAC, Record activity is ACT, Footprint summary is FPS. The other two screens have their own UX folders in their initiatives.
