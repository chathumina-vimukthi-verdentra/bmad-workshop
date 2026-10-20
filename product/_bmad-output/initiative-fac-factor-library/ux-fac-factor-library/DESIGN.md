---
name: Carbon Hub Lite
description: Calm, clear carbon figures for a small business. Navy header, white cards, one accent per meaning. Workshop sample values, not real emission factors.
status: final
created: 2026-10-15
updated: 2026-10-15
colors:
  navy: '#0F3567'
  navy-700: '#0A2748'
  green: '#70AC46'
  green-text: '#3F7A1F'
  green-tint: '#EAF4E2'
  blue: '#3B90E5'
  blue-text: '#1F63B0'
  blue-tint: '#E6F1FC'
  amber: '#F8B702'
  amber-text: '#6B4D00'
  amber-tint: '#FFF4D1'
  error: '#B3261E'
  error-tint: '#FCEBEA'
  text: '#181818'
  text-muted: '#4A5568'
  surface: '#F5F7FA'
  card: '#FFFFFF'
  border: '#DDE3EC'
typography:
  display:
    fontFamily: '"Poppins", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif'
    fontSize: 32px
    fontWeight: 600
    lineHeight: 40px
  h1:
    fontFamily: '"Poppins", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif'
    fontSize: 24px
    fontWeight: 600
    lineHeight: 32px
  h2:
    fontFamily: '"Poppins", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif'
    fontSize: 18px
    fontWeight: 600
    lineHeight: 26px
  body:
    fontFamily: '"Poppins", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 22px
  label:
    fontFamily: '"Poppins", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif'
    fontSize: 13px
    fontWeight: 500
    lineHeight: 20px
  small:
    fontFamily: '"Poppins", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif'
    fontSize: 12px
    fontWeight: 400
    lineHeight: 18px
  mono:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
    fontSize: 13px
    fontWeight: 500
    lineHeight: 20px
rounded:
  DEFAULT: 8px
  full: 999px
spacing:
  '1': 4px
  '2': 8px
  '3': 12px
  '4': 16px
  '5': 24px
  '6': 32px
  '7': 48px
  content-max: 1120px
components:
  app-header:
    backgroundColor: '{colors.navy}'
    textColor: '#FFFFFF'
    height: 64px
  button-primary:
    backgroundColor: '{colors.navy}'
    textColor: '#FFFFFF'
    rounded: '{rounded.DEFAULT}'
    height: 44px
  button-secondary:
    backgroundColor: '{colors.card}'
    textColor: '{colors.navy}'
    rounded: '{rounded.DEFAULT}'
    height: 44px
  card:
    backgroundColor: '{colors.card}'
    rounded: '{rounded.DEFAULT}'
  scope-badge-1:
    backgroundColor: '{colors.green-tint}'
    textColor: '{colors.green-text}'
    rounded: '{rounded.full}'
  scope-badge-2:
    backgroundColor: '{colors.blue-tint}'
    textColor: '{colors.blue-text}'
    rounded: '{rounded.full}'
  status-pill-indicative:
    backgroundColor: '{colors.amber-tint}'
    textColor: '{colors.amber-text}'
    rounded: '{rounded.full}'
  notice-sample:
    backgroundColor: '{colors.amber-tint}'
    textColor: '{colors.amber-text}'
    rounded: '{rounded.DEFAULT}'
---

# Design: Carbon Hub Lite

This file says how Carbon Hub Lite looks. It is the shared design for all three screens, and it lives with the factor library because FAC is built first. The companion file `EXPERIENCE.md` says how the Factor library screen behaves. The clickable prototype is `mockups/index.html` and its export is `mockups/screens/01-factor-library.png`. The Record activity and Footprint summary screens inherit this file: see `../../initiative-act-activity-entry/ux-act-activity-entry/DESIGN.md` and `../../initiative-fps-footprint-summary/ux-fps-footprint-summary/DESIGN.md`. The spines win on conflict with any mock.

Workshop sample values, not real emission factors. Every figure in the prototype is fictional.

## Brand & Style

Calm and clear. A navy header, white cards, one accent per meaning. The look is close to the Verdentra palette. Numbers are the hero: figures use tabular numerals and right alignment. Every figure shows a status, Verified or Indicative, and the workshop only shows Indicative. Colour never carries meaning alone: badges and pills always have text.

## Colors

- **Navy** `{colors.navy}` is for the header bar, headings and primary buttons. `{colors.navy-700}` is the button hover.
- **Green** `{colors.green}` is the Scope 1 accent bar and the success icon. Decorative only. Text on light surfaces uses `{colors.green-text}`. `{colors.green-tint}` is the Scope 1 badge background.
- **Blue** `{colors.blue}` is the focus ring and the Scope 2 accent bar. Decorative only. Text uses `{colors.blue-text}`. `{colors.blue-tint}` is the Scope 2 badge and the info notice background.
- **Amber** `{colors.amber}` is the Indicative accent and the warning bar. Text uses `{colors.amber-text}`. `{colors.amber-tint}` is the Indicative pill and the sample notice background.
- **Error** `{colors.error}` is error text and the field border. `{colors.error-tint}` is the error banner background.
- **Neutrals** are `{colors.text}` for body text, `{colors.text-muted}` for secondary text, `{colors.surface}` for the page, `{colors.card}` for cards and tables, and `{colors.border}` for borders and dividers.

Rule: the bright green, blue and amber are for bars, dots and fills. Text uses the `-text` variants so it passes contrast.

## Typography

Font stack: Poppins, then the system font. Poppins loads from Google Fonts. If it fails, the system font is used and the layout still works.

| Style | Size / line | Weight | Use |
|---|---|---|---|
| Display | 32 / 40 | 600 | Summary card figure |
| H1 | 24 / 32 | 600 | Page title |
| H2 | 18 / 26 | 600 | Card title |
| Body | 14 / 22 | 400 | Default text |
| Label | 13 / 20 | 500 | Form labels, table headers |
| Small | 12 / 18 | 400 | Help text, chips |
| Mono | 13 / 20 | 500 | Factor ids |

Numbers in tables and cards use `font-variant-numeric: tabular-nums`.

## Layout & Spacing

Spacing scale on a 4px base: 4, 8, 12, 16, 24, 32, 48. Page content is at most `{spacing.content-max}` wide and centred. Side padding is 24px, and 16px on small screens. Tables scroll sideways inside their card below 720px. Two-column layouts stack below 960px.

## Elevation & Depth

Cards use a 1px `{colors.border}` border plus a soft shadow `0 1px 2px rgba(15, 53, 103, 0.06)`. Menus and dialogs use `0 8px 24px rgba(15, 53, 103, 0.16)`. Nothing else casts a shadow.

## Shapes

8px radius for cards, inputs and buttons (`{rounded.DEFAULT}`). Pills and chips are fully rounded (`{rounded.full}`).

## Components

### App header
Navy bar, 64px high. Left: the product name "Carbon Hub Lite" in white, 600 weight, with a small green leaf mark. Right: the text "Nair Logistics" and a round avatar with the initials "PN".

### Tab nav
Sits on the header bar, below the product name row on small screens. Three tabs: Factors, Activities, Footprint. The active tab has white text and a 3px green underline. Inactive tabs use 80% white. Each target is at least 44px high. Role `tablist`.

### Data table
White card, header row on `{colors.surface}`, label style, bottom border on every row. Numbers are right aligned. Row height 52px. Hover row tint `#F0F4F9`.

### Scope badge
A pill. "Scope 1" uses the green tint with green text. "Scope 2" uses the blue tint with blue text. It always shows the word, never only a colour.

### Version chip
A small rounded chip with a 1px `{colors.border}` border and mono text, for example `v2026.1`. Neutral background.

### Status pill
- Indicative: amber tint background, amber text, an 8px amber dot and the text "Indicative".
- Verified: green tint background, green text, a check icon and the text "Verified".

Shown next to every total.

### Form field with error text
Label above (13px, 500). Input 44px high, 1px border, 8px radius. Help text below in muted small text. On error the border and text turn `{colors.error}`, the border becomes 2px, an icon shows, and the message sits below the field. The field has `aria-invalid="true"` and `aria-describedby` pointing at the message.

### Summary card
White card with a 4px top accent bar: green for Scope 1, blue for Scope 2, navy for Total. Content: a label, the Display figure in tCO2e, the kg figure in muted text, and the status pill.

### Notice banner
Full width inside the page, 8px radius, 1px border, an icon and text. Variants: sample (amber tint), info (blue tint), error (error tint), success (green tint). The sample text is "Workshop sample values, not real emission factors."

### Buttons
Primary: navy fill, white text, 44px high. Secondary: white fill, navy border and text. Focus ring: 3px `{colors.blue}` with a 2px offset.

## Do's and Don'ts

- Do use the `-text` colour variants for text. Do not put bright green, blue or amber text on a light surface.
- Do show the word on every badge, pill and error. Do not rely on colour alone.
- Do keep a visible focus ring on every interactive element.
- Do keep targets at least 44 by 44px for tabs, buttons and inputs.
- Do right align numbers and use tabular numerals.
- Do not animate beyond a 150ms fade, and respect `prefers-reduced-motion`.
- Do not show Verified anywhere in Carbon Hub Lite.
- Contrast checks passed in the prototype: text on card 17.8:1, navy on white 12.2:1, green text on green tint 4.6:1, blue text on blue tint 5.3:1, amber text on amber tint 7.1:1, error text on white 6.5:1.
