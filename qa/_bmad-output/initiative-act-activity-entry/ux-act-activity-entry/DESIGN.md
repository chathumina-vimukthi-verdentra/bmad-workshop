---
name: Carbon Hub Lite, Record activity
description: The Record activity screen. It inherits the Factor library design and adds only a form field with inline error text and a compact recent activities list.
status: final
inherits: ../../initiative-fac-factor-library/ux-fac-factor-library/DESIGN.md
created: 2026-10-15
updated: 2026-10-16
---

# Design: Record activity

This file inherits the shared design in `../../initiative-fac-factor-library/ux-fac-factor-library/DESIGN.md`: colours, typography, spacing, shapes, buttons, notice banners and the app header. Read that file first. Only what this screen adds or uses is listed here.

Workshop sample values, not real emission factors.

## Uses from the shared design

- App header and tab nav (the Activities tab is current).
- Cards, 8px radius, with the soft card shadow.
- Primary button (navy, 44px high) for "Record activity".
- Notice banner, variants error and success.
- Version chip and scope badge are not used on this screen.

## Adds

### Form field
Label above (13px, 500). Input or select 44px high, 1px border, 8px radius. Help text below in muted small text. The Unit field is read only, with a muted fill.

### Inline error text
On error the border and text turn the error colour, the border becomes 2px, an icon shows, and the message sits below the field. The field has `aria-invalid="true"` and `aria-describedby` pointing at the message. Colour never carries the error alone: the text is always there.

### Recent activities list
A compact data table inside a card: Id (mono), Type, Quantity with unit (right aligned, tabular numerals). The newest activity is at the top. A context line above it names the site and period, for example "Depot 1, 2026-03".

## Layout

Two columns on wide screens: the form card on the left and the recent activities card on the right. Below 960px the columns stack, form first.
