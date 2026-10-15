# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static showcase site ("site vitrine") for **Slice**, a real pizzeria in Avignon (three city-centre shops, 40 cm pizzas, takeaway only: no dine-in, no delivery). Built with Astro 7 (output: `static`), plain scoped CSS, no UI framework, no Tailwind. All user-facing content is in **French** (`<html lang="fr">`) — keep new copy in French. The menu and prices are real (from the client's 2026 print menus in `design-source/`); shop addresses are real; phones, hours and email are still placeholders. See `PRODUCT.md` for product truth and `DESIGN.md` for the visual system.

## Commands

- `npm run dev` — dev server on `localhost:4321`
- `npm run build` — builds to `dist/`; this is the only verification step available (no tests, no linter)
- `npm run preview` — serve the built site
- `npx astro check` — type-check `.astro`/TS files (prompts to install `@astrojs/check` + `typescript`, which are not dependencies yet)

Requires Node `>=22.12.0`.

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Architecture

- **Content is data-driven.** All business info and the menu live in `src/data/`, not in the pages:
  - `site.ts` — `shops` (the three city-centre shops: id, name, street, city, phone, `mapsUrl`, hours), `site` (name, tagline, SEO description, email, socials) and the `nav` array (drives both Header and Footer links). Hours are structured per shop: `{ label, days (0 = dimanche), slots: [['11:30','14:30'], …] }`; empty `slots` = closed. `closed: true` marks a shop as temporarily closed (Henri Fabre for now): its card shows « Fermée temporairement » with no hours or call button, it is left out of the cart's call list and of the overall open status, and the footer shows the notice instead of its phone; `openShops` is the filtered list. `weekOf`, `formatSlot(s)` and `telHref(phone)` are helpers. `components/ShopCard.astro` renders one shop.
  - `about.ts` — « L'histoire de Slice » (home, between the menu and the reviews): founder's first name (handwritten Caveat signature, the only use of that font), paragraphs and portrait slot, rendered by `components/About.astro`; empty fields show « à fournir » placeholders.
  - `reviews.ts` — the Google profiles (Carnot, République; Henri Fabre has none yet) with rating, count and link; the displayed rating is the count-weighted average and the count is floored to the hundred (« +300 »). Plus 6–8 review items, shown in `components/ReviewMarquee.astro`: a right-to-left looping band (duplicated list `aria-hidden`/`inert`), paused on hover/focus or via its pause button, and a manual horizontal scroll under `prefers-reduced-motion`. Only real reviews; an item without `text` renders an « avis à fournir » placeholder (`components/ReviewCard.astro`).
  - `menu.ts` — `MenuSection[]` rendered by `/carte`; the first section (`pizzas`) is also shown on the home page. `extras` (toppings, from the print menu) is not a menu section: it is shown read-only in the burgundy `components/Extras.astro` block inside the pizza frame (home and `/carte`, under `extrasHint`, a « de 2 € à 4 € » link to it) and feeds the pizza configurator (`extraCatalog`). `itemLabel()` gives the out-of-context name used by the cart (« Boisson 33 cl »). `description` is optional. `formatPrice` formats in `fr-FR` EUR, `splitPrice` splits units/cents for the print-menu price style. Adding a tag value requires updating the `tags` union type and the tag→CSS class mapping in `components/MenuItem.astro`.
  - `media.ts` — the hero media (`heroMedia`, a photo for now, switchable to a video) and the home photo strip (`gallery`). Each slot has a shooting brief; while `src` is empty, `components/Media.astro` renders a visible « à fournir » placeholder with that brief. To publish, put files in `public/medias/` and fill `src` (plus `poster`/`webm` for the video, which autoplays muted unless reduced motion or Save-Data, with a pause button).
- **One layout.** Every page wraps `layouts/Layout.astro`, which imports `styles/global.css`, sets `<title>` as `"{title} · Slice"` (or the tagline when no title), meta description/OG tags, loads League Spartan + Jost from Google Fonts, and renders Header/Footer.
- **Styling.** Design tokens (colors sampled from the print menus, fonts, radius, container width, shadow, the `--checker` damier) are CSS custom properties on `:root` in `global.css`, along with shared utility classes (`.container`, `.section`, `.btn`, `.btn--ghost`, `.link-arrow`, `.visually-hidden`). Component/page styles are Astro-scoped `<style>` blocks that use those variables. `components/Frame.astro` is the checkerboard frame (an optional `slot="title"` heading sits in its top opening); `components/Logo.astro` renders `public/logo.png` (ink, or tinted via CSS mask); `components/Icon.astro` holds the SVG icons.
- **JS is minimal**: the mobile menu toggle in `components/Header.astro`, and `scripts/hours.ts` (imported by `OpenStatus.astro` and `Hours.astro`), which computes open/closed status in Europe/Paris time: per shop for `[data-open-status][data-shop]`, across all shops when `data-shop` is absent, and marks today's `[data-days]` rows. Active nav link is marked via `aria-current` computed from `Astro.url.pathname`.
- **Order list (« Ma commande »)**: `scripts/cart.ts` + `components/Cart.astro` (included in the layout on every page). Desserts and drinks get a + / − stepper (`.qty[data-cart-item]`, ids from `itemId()` / `catalog` in `menu.ts`). Pizzas (`MenuItem` with `configurable`) get a « + » that opens the configurator dialog in `Cart.astro` (quantity, extras with their own steppers, sticky recap, « Ajouter à ma commande »). A cart line's key encodes its composition, `pizzas-royale+extras-burrata+extras-chevre`, so the same pizza with different extras makes separate lines; the list is kept in `localStorage` (`slice-commande`) and shown in a `<dialog>` (side panel on desktop, bottom sheet on mobile) with the total and a call button per shop. Nothing is sent anywhere: the visitor phones a shop with the list on screen.
- Phone links use `telHref(shop.phone)` from `site.ts`. The header « Appeler » button and menu-page CTAs link to `/contact#boutiques`, since there is one phone per shop.
- `design-source/` holds the client's original files (logo `.ai`, print menu PDFs). It is not served; keep it out of `public/`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
