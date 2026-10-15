---
name: Slice
description: Pizzeria à Avignon. The printed counter menu, translated to the web.
colors:
  cream-stock: "#f6f1de"
  cream-shade: "#efe7cc"
  menu-ink: "#1c1c1a"
  warm-graphite: "#4d4741"
  burgundy-ink: "#8a2430"
  burgundy-deep: "#6c1a24"
  on-burgundy: "#f6f1de"
  on-burgundy-muted: "#ecd2cc"
  kraft-rule: "#ddd2b2"
typography:
  display:
    fontFamily: "League Spartan Variable, Futura, Century Gothic, sans-serif"
    fontSize: "clamp(2.6rem, 5.6vw, 5.25rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  frame-title:
    fontFamily: "League Spartan Variable, Futura, Century Gothic, sans-serif"
    fontSize: "clamp(2.4rem, 8cqi, 5rem)"
    fontWeight: 800
    lineHeight: 0.85
    letterSpacing: "0.14em"
  headline:
    fontFamily: "League Spartan Variable, Futura, Century Gothic, sans-serif"
    fontSize: "clamp(2.2rem, 4.5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 0.95
  title:
    fontFamily: "League Spartan Variable, Futura, Century Gothic, sans-serif"
    fontSize: "clamp(1.3rem, 2.4vw, 1.6rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "0.01em"
  price:
    fontFamily: "League Spartan Variable, Futura, Century Gothic, sans-serif"
    fontSize: "clamp(1.7rem, 3vw, 2.1rem)"
    fontWeight: 800
    lineHeight: 1
  subline:
    fontFamily: "League Spartan Variable, Futura, Century Gothic, sans-serif"
    fontSize: "clamp(0.95rem, 2vw, 1.3rem)"
    fontWeight: 700
    letterSpacing: "0.38em"
  body:
    fontFamily: "Jost Variable, Futura, Century Gothic, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  description:
    fontFamily: "Jost Variable, Futura, Century Gothic, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 500
    letterSpacing: "0.03em"
  label:
    fontFamily: "League Spartan Variable, Futura, Century Gothic, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 700
    letterSpacing: "0.06em"
  signature:
    fontFamily: "Caveat Variable, cursive"
    fontSize: "clamp(2.4rem, 4vw, 3.2rem)"
    fontWeight: 600
rounded:
  row: "3px"
  control: "3px"
  band: "6px"
  pill: "6px"
spacing:
  check: "10px"
  frame-desktop: "30px"
  frame-mobile: "20px"
  gutter: "1rem"
  section: "clamp(4rem, 9vw, 7rem)"
  container: "1180px"
components:
  button-primary:
    backgroundColor: "{colors.burgundy-ink}"
    textColor: "{colors.on-burgundy}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.8rem 1.5rem 0.7rem"
    height: "3.25rem"
  button-primary-hover:
    backgroundColor: "{colors.burgundy-deep}"
    textColor: "{colors.on-burgundy}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.burgundy-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.8rem 1.5rem 0.7rem"
    height: "3.25rem"
  button-ghost-hover:
    backgroundColor: "{colors.burgundy-ink}"
    textColor: "{colors.on-burgundy}"
  button-cream:
    backgroundColor: "{colors.on-burgundy}"
    textColor: "{colors.burgundy-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.8rem 1.5rem 0.7rem"
  band:
    backgroundColor: "{colors.burgundy-ink}"
    textColor: "{colors.on-burgundy}"
    rounded: "{rounded.band}"
    padding: "1.1rem 2.25rem 0.95rem"
  status-pill:
    backgroundColor: "transparent"
    textColor: "{colors.menu-ink}"
    rounded: "{rounded.pill}"
    padding: "0.45rem 0.9rem 0.35rem"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.burgundy-ink}"
    rounded: "{rounded.pill}"
    padding: "0.2rem 0.6rem 0.1rem"
---

# Design System: Slice

## Overview

**Creative North Star: "The Counter Menu"**

The site is Slice's own printed menu carried onto the screen: cream stock, burgundy ink, a burgundy-and-cream checkerboard frame, and heavy geometric capitals that shout names and prices the way the board above the counter does. Every device on the page comes from the client's 2026 print menus and badge logo in `design-source/`; nothing is borrowed from the generic pizzeria template.

Density is that of a menu, not a brochure: two columns of names, dotted leaders and prices inside a frame, generous cream around it. Burgundy appears as ink (headings, prices, rules) and as whole flat fields (the rounded band, the visit section, the drinks pill), never as a gradient or tint. The page is flat print: depth comes from overlap (the band crossing the frame's bottom edge, the title sitting in the frame's gap) and from inversion (cream on burgundy, cream on menu-ink in the footer), not from shadows.

The client's black badge logo is used as supplied (raster `public/logo.png`), recoloured only through a CSS mask to cream or burgundy, never redrawn. Photography and the hero video are the client's own footage only (slots in `src/data/media.ts` and `about.ts`, rendered by `Media.astro`); until supplied, each slot shows a dashed « à fournir » placeholder with its shooting brief.

**Key Characteristics:**
- Cream paper ground, burgundy ink, near-black names.
- A three-check (30px) checkerboard frame, open at the top; the section title sits in the opening.
- Heavy uppercase League Spartan for every name, price, heading and control; Jost for running text.
- Dotted leaders run from names to prices; cents are set small beside large euro units.
- Flat fields with soft corners; no shadows, no gradients. Photos only from the client.

## Colors

A two-ink print palette: burgundy and near-black on cream, with burgundy also used as a full field.

### Primary
- **Burgundy Ink** (`burgundy-ink`): H1 and H2 headings, prices, primary buttons, active nav underline, the checkerboard, the hero band, the visit section field, focus outlines, text selection.
- **Burgundy Deep** (`burgundy-deep`): hover state of filled burgundy buttons only.

### Neutral
- **Cream Stock** (`cream-stock`): the page ground, header ground, the cream checks, the cream patch that opens the frame. Also the theme-color.
- **On-Burgundy Cream** (`on-burgundy`): the same cream used as text and fill on burgundy and on the near-black footer (cream buttons, logo mask, today row on dark).
- **On-Burgundy Muted** (`on-burgundy-muted`): secondary running text set on the burgundy field.
- **Menu Ink** (`menu-ink`): body text, menu item names, dotted leaders (at 40% opacity), the footer field.
- **Warm Graphite** (`warm-graphite`): menu item descriptions and other quiet text on cream.
- **Cream Shade** (`cream-shade`): scrollbar track. Reserved for quiet tonal surfaces.
- **Kraft Rule** (`kraft-rule`): reserved hairline token; current surfaces draw their rules in burgundy or dotted ink instead.

### Named Rules
**The Two Inks Rule.** Text on cream is burgundy or menu-ink (warm graphite for quiet text), never a third hue. Burgundy marks what the menu shouts (headings, prices, actions); menu-ink carries names and reading text.

**The Whole Field Rule.** When burgundy is a background it is a full, flat field (band, section, pill, today row), never a tint, wash or gradient.

## Typography

**Display Font:** League Spartan Variable (with Futura, Century Gothic, sans-serif)
**Body Font:** Jost Variable (with Futura, Century Gothic, sans-serif)
**Signature Font:** Caveat Variable (with cursive), the handwritten aside of the print menus

**Character:** Two geometric sans faces from the same Futura family tree: League Spartan at 700–800 in capitals is the menu's painted voice; Jost is the quieter print beneath it. Self-hosted via Fontsource.

### Hierarchy
- **Display** (800, clamp(2.6rem, 5.6vw, 5.25rem), 0.95, uppercase, burgundy): page H1. On /carte the H1 is pushed to clamp(3rem, 9vw, 6rem) with 0.14em tracking.
- **Frame Title** (800, clamp(2.4rem, 8cqi, 5rem), 0.85, 0.14em tracking, 0.1em on mobile, uppercase, never wraps): the section name set in the frame's top opening (PIZZA, DESSERTS, HORAIRES). Sized to the frame's container, with a 2.4rem floor.
- **Headline** (800, clamp(2.2rem, 4.5vw, 3.75rem), 0.95, uppercase): section H2 outside a frame.
- **Title** (800, clamp(1.3rem, 2.4vw, 1.6rem), 1.05, uppercase, menu-ink): menu item names.
- **Price** (800, units clamp(1.7rem, 3vw, 2.1rem), cents 0.95rem, burgundy): menu prices, split into large euros and small cents with the € sign.
- **Subline** (700, clamp(0.95rem, 2vw, 1.3rem), 0.38em tracking, uppercase, centred): the menu's format line under a frame title (« ENTIÈRES · 40 CM »).
- **Body** (Jost 400, 1.0625rem, 1.55): running text; leads at 1.1–1.3rem, 40–44ch.
- **Description** (Jost 500, 0.92rem, 0.03em, uppercase, warm graphite, 52ch max): ingredient lines under menu items.
- **Label** (700, 0.95–1.1rem, 0.04–0.1em tracking, uppercase): buttons, nav links, status pill, band text, day names, definition terms.
- **Signature** (Caveat 600, clamp(2.4rem, 4vw, 3.2rem), burgundy, set straight): the founder's name in the « L'histoire de Slice » section only. It echoes the handwritten asides of the print menus; never used for headings, prices or controls.

### Named Rules
**The Shouted Caps Rule.** Names, prices, headings and controls are uppercase League Spartan at 700 or 800. Jost is never set in display sizes.

**The Small Cents Rule.** Prices always split euros and cents: large units, cents at 0.95rem, both burgundy.

## Layout

A single centred container (1180px, 1rem gutters each side). Pages stack full-width sections; vertical rhythm comes from section padding of clamp(4rem, 9vw, 7rem). The checkerboard is built on a 10px check: the frame is three checks (30px) wide on desktop and two (20px) at 640px and below; the visit section's top edge is a three-check strip. Inside a frame, padding is the frame width plus clamp(1.5rem, 4vw, 3.5rem) (plus 1.25rem on mobile).

Menus are two equal columns with a clamp(2rem, 6vw, 5rem) gap; they collapse to one column at 860px, along with the hero grid (logo above copy, centred) and the visit grid. At 640px hero buttons stack full-width and the band drops out of its overlap to sit in flow. At 480px hours rows stack the times under the day and lose their leader. The header is sticky, 76px (64px at 760px and below, where the nav becomes a toggled panel).

**The Open Frame Rule.** Every checkerboard frame is open at the top, as on the print menus: either a cream gap over the middle 68% (56% on mobile) or the frame title sitting in the gap. On mobile the opening widens rather than the title shrinking below 2.4rem.

## Elevation & Depth

Flat. No component casts a shadow. Depth comes from overlap and inversion: the hero band hangs one check below the frame's bottom edge, the frame title's cream ground interrupts the checks, and burgundy and near-black fields reverse the inks. A `--shadow` token exists in the stylesheet but nothing uses it.

**The Printed Sheet Rule.** Surfaces are ink on paper. Show hierarchy with overlap, fields and type weight, not drop shadows or blur.

## Shapes

The checkerboard is the one hard-edged geometry; everything placed on it has only slightly softened corners. Controls, menu anchors and the highlighted today row are 3px (`--radius-sm`); cards, bands, tags, the status indicator and the drinks pill are 6px (`--radius`). Only true circles (status dot, round video toggle) stay fully round; the hero photo sits square-cornered in its checker frame. Borders are solid 2px in burgundy, cream or currentColor; the active nav underline is 3px. Dotted 2px leaders link labels to values in menus and hours. Icons are inline SVG line drawings (2.2 stroke, round caps), sized at about 1.1em next to text.

## Components

### Buttons
Heavy caps controls that read like the menu's labels.
- **Shape:** barely rounded (3px), 2px border, minimum height 3.25rem (2.75rem in the desktop header).
- **Primary:** filled burgundy with cream label, League Spartan 700 at 1.05rem, 0.06em tracking, leading line icon. Default call action (« Appeler »), always the phone number when space allows.
- **Hover / Focus:** fills deepen to burgundy deep over 0.25s on the out-expo ease; press nudges 1px down; focus is a 3px burgundy outline offset 3px (cream on burgundy and dark fields).
- **Ghost:** burgundy outline and label on cream; fills burgundy on hover. Secondary actions (« Itinéraire »).
- **Cream / Cream ghost:** the same pair inverted for use on the burgundy field.
- **Arrow link:** uppercase burgundy label with a trailing arrow that slides 4px on hover, for tertiary navigation.

### Chips
- **Tags:** full-pill outline in currentColor, 0.75rem caps; burgundy for signature and spicy, menu-ink for vegetarian.
- **Menu anchors (/carte):** 10px outlined burgundy chips that fill on hover.

### Cards / Containers
- **Checkerboard Frame:** the primary container; see the Open Frame Rule. Holds the hero, each menu board, the contact hours and the 404.
- **Hours card on burgundy:** 6px radius, 2px cream border at 45% opacity, no fill.

### Navigation
Uppercase League Spartan 700, 1rem, 0.1em tracking, menu-ink; hover and current page turn burgundy, current page adds a 3px burgundy underline. A compact primary « Appeler » button closes the bar. The bar sits on cream over a 2px burgundy rule. Below 760px a three-bar toggle opens a full-width cream panel with 1.5rem links and a full-size call button. The header logo tilts -6deg on hover.

### Menu Item (signature)
Name in menu-ink caps, a dotted leader at 40% opacity, then the split burgundy price; ingredients beneath in small uppercase Jost. Laid out in two columns inside a frame, exactly like the counter menu.

### Band (signature)
A rounded burgundy strip in cream caps with line icons, like the EXTRA strip on the print menu. On the hero it overlaps the frame's bottom edge and carries today's hours and the address; on /carte the same field becomes the drinks pill.

### Open Status & Hours
A pill-outlined live status (« Ouvert · jusqu'à 14h30 ») with a dot that pulses only while open, computed in the browser for Europe/Paris and hidden without JS. Hours are a leader-dotted list; today's row is inverted (burgundy field on cream, cream field on burgundy).

## Do's and Don'ts

### Do:
- **Do** derive new visual material from the client's print menus and logo in `design-source/`.
- **Do** put new menus and key panels inside the checkerboard frame, open at the top, built from the 10px check.
- **Do** set names, prices, headings and controls in uppercase League Spartan 700–800, and running text in Jost.
- **Do** split prices into large euros and small cents, joined to the name by a dotted leader.
- **Do** use burgundy as a whole flat field when a block needs weight, with cream text and cream focus outlines on it.
- **Do** keep the phone call the primary filled action on every page.

### Don't:
- **Don't** redraw, re-colour by hand or restyle the badge logo; recolour only through the CSS mask to cream or burgundy.
- **Don't** use stock imagery or generated images of the food or the shops; only the client's own photos and video, in the existing media slots.
- **Don't** add drop shadows, gradients or blur; depth comes from overlap and inverted fields.
- **Don't** close the checkerboard frame at the top or shrink a frame title below 2.4rem to fit; widen the opening instead.
- **Don't** introduce a text hue on cream beyond burgundy, menu-ink and warm graphite.
