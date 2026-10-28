# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary visitors are people in and around **Avignon**, mostly on their phone:

- **Locals and regulars** checking whether Slice is open now, what is on the menu, and what it costs.
- **People ready to order**, whose next step is a phone call to order for takeaway.
- **Newcomers and visitors** (the print menu is bilingual FR/EN, so tourists are a real audience) who need to be convinced to come in and to find the place.

## Product Purpose

The showcase site (« site vitrine ») of **Slice — Pizzeria, Avignon**, a real client with **three shops in Avignon's city centre**: Carnot (45 rue Carnot), République (26 rue de la République) and Henri Fabre (10 rue Henri Fabre), all 84000 Avignon. Henri Fabre is temporarily closed. It exists to answer the practical questions quickly (open? where? what's on the menu? how much?) and turn the visit into a call or a trip to the shop. Success means visitors reach hours, the menu, and the phone number without friction, and newcomers leave wanting to come.

## Positioning

Generous **40 cm pizzas** with an American/NY-pizzeria menu (Original Pepperoni, Meatballs, Chicken Ranch, Ooh Honey), in a shop whose identity (badge logo, checkerboard print menus) is unmistakably its own. In the shop, a selection is also sold by the slice and toppings can be added, but **the website presents whole 40 cm pizzas only** and does not mention slices (client's choice). The extras (toppings at 2–4 €) can be added to each pizza in the order list since 2026-10-15.

## Operating Context

- Service mode: **takeaway only. No dine-in, no delivery.**
- Ordering happens by phone or at the counter; there is no online ordering or payment. The site offers an order list (« Ma commande ») the visitor builds from the menu (pizzas with optional extras) and keeps on screen while phoning a shop; it is never sent.
- Pricing structure: whole pizza (40 cm), slice (¼ pizza; "slices are also available as whole pizzas"), extras (toppings added at 2–4 €), desserts, canned/bottled soft drinks by size (33 cl / 1,5 L).
- Print menus are bilingual: French name/description with the English translation beneath.

## Capabilities and Constraints

- Static Astro site: home (`/`), menu (`/carte`), contact (`/contact`), legal notice (`/mentions-legales`), plus 404.
- All business data lives in `src/data/` (`site.ts`, `menu.ts`, `about.ts`, `reviews.ts`, `media.ts`, `legal.ts`); pages render from it. `menu.ts` holds the real 2026 menu, whole pizzas only (40 cm), by the client's choice; slice prices are not shown on the site, and the site does not mention buying by the slice (client's choice, 2026-10-15). The extras are listed with their prices in a burgundy block under the pizzas (like the print menu) and added to a pizza through its « + » configurator.
- All user-facing copy is in **French**; English menu translations exist in the source material if wanted.
- Still to come from the client: Henri Fabre's phone (shop temporarily closed), confirmation of the opening hours (one shared schedule for now), the pizza of the month (the client is testing recipes, for the month after next).
- Undecided: whether the site should be bilingual.

## Brand Commitments

- Founder: **Rémi** (with the accent, as he writes it), presented on the home page (« L'histoire de Slice »).

- Name and lockup: **SLICE — PIZZERIA — AVIGNON**, a black circular badge with a pizza slice dripping cheese, stars, and "SLICE" set diagonally. Use the client's logo as-is; do not redraw it.
- The client's print menus establish the identity: cream paper ground, deep burgundy-red, black, a red-and-cream checkerboard border, bold geometric sans in caps, and a handwritten script for asides. Future visual work should derive from these, not replace them.

## Evidence on Hand

- `design-source/slice-logo.ai` — logo source (PDF-compatible Illustrator file, black). Web export: `public/logo.png` (826×756, transparent). No SVG export yet.
- `design-source/menu-pizza-2026.pdf` — 2026 pizza menu: whole pizzas, slices, extras, with prices. The authoritative source for the menu. The five slice-only pizzas (Champignon, Jambon, Poivron grillé, Carbo Style, Chèvre Miel) are sold whole at 4 × the slice price (client's rule, 2026-10-15).
- `design-source/desserts-boissons-2026.pdf` — 2026 desserts and drinks poster (Cookie XL maison 3,50 €, Pizza Nutella 10 €; drinks 33 cl 2 € / 1,5 L 3,50 €).
- **Product photos (2026-10-21)**: one real photo per pizza (all 14) and of the Cookie XL, shown on the menu above each name (`src/assets/menu/`, originals in `design-source/photos/`). The hero and gallery photos on hand are approved by the client « for now » (2026-10-28); no new shoot is planned. Pizza Nutella has no photo. Do not substitute stock imagery or AI-generated images of the food or the place.
- **Claims the client's materials don't support** (from an early placeholder template, now removed): Neapolitan style, wood-fired oven at 450 °C, Italian-sourced ingredients, "Depuis 2018 · Paris". Do not reintroduce claims of this kind.
- **Dough** (client, 2026-10-28): made every day, long fermentation of at least 48 h. Stated in « L'histoire de Slice ».
- **Drinks** (client, 2026-10-28): no Dr Pepper; Orangina and Schweppes Agrumes added.
- **Reviews**: real Google reviews of the Carnot and République shops (`src/data/reviews.ts`). No press or awards on hand. Do not fabricate any.

## Product Principles

1. **Practical first.** Hours, menu, prices, phone and address must be reachable in seconds, especially on mobile.
2. **Truth over flourish.** It's a real business: every claim, price and detail comes from the client's materials.
3. **Prices at a glance.** The menu reads like the counter menu: every whole 40 cm pizza with its price, nothing to decode.
4. **The shop's own identity carries the brand.** The logo and print menus are the reference, not generic pizzeria clichés.
