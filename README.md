# Slice — site vitrine de pizzeria

Site vitrine de **Slice**, pizzeria à Avignon : trois boutiques dans le centre-ville, des pizzas de 40 cm, uniquement à emporter (ni sur place, ni en livraison).

Site statique construit avec [Astro](https://astro.build) 7, en CSS pur, sans framework. Tout le contenu est en français.

## Commandes

Node `>= 22.12.0` requis.

| Commande          | Action                              |
| ----------------- | ----------------------------------- |
| `npm install`     | Installe les dépendances            |
| `npm run dev`     | Serveur de dev sur `localhost:4321` |
| `npm run build`   | Génère le site dans `./dist/`       |
| `npm run preview` | Prévisualise le build               |

Il n'y a ni tests ni linter : `npm run build` sert de vérification.

## Pages

- `/` — accueil : statut ouvert / fermé en direct, les pizzas et les extras, l'histoire de Slice, les avis Google, des photos, les boutiques
- `/carte` — la carte complète : pizzas, extras, desserts, boissons
- `/contact` — les boutiques : adresse, horaires, téléphone, itinéraire
- `/mentions-legales` — mentions légales et confidentialité
- `/404`

## « Ma commande »

Le visiteur compose sa commande depuis la carte, puis appelle la boutique de son choix en gardant la liste à l'écran. **Rien n'est envoyé** : la liste reste dans le navigateur (`localStorage`).

- Le **+** d'une pizza ouvre une fenêtre pour choisir la quantité et les extras, avec un récapitulatif à confirmer.
- Desserts et boissons s'ajoutent directement avec **+ / −**.

## Modifier le contenu

Tout le contenu est dans `src/data/`. Les pages ne contiennent pas de texte métier.

| Fichier      | Contenu                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------- |
| `site.ts`    | Boutiques (adresse, téléphone, horaires, fermeture temporaire), email, réseaux, navigation |
| `menu.ts`    | Pizzas, desserts, boissons et extras, avec les prix                                       |
| `reviews.ts` | Note et nombre d'avis des fiches Google, avis affichés dans le bandeau                    |
| `about.ts`   | « L'histoire de Slice » : fondateur, texte, portrait                                      |
| `media.ts`   | Photo du hero et photos de la galerie                                                     |
| `legal.ts`   | Mentions légales : entreprise, SIRET, directeur de la publication, hébergeur             |

Quelques cas courants :

- **Fermer temporairement une boutique** : ajouter `closed: true` à la boutique dans `site.ts`. Pour la rouvrir, retirer la ligne.
- **Changer les horaires** : `sharedHours` dans `site.ts` (communs aux trois boutiques), ou une liste propre à une boutique.
- **Ajouter une photo** : déposer le fichier dans `public/medias/` et renseigner `src` dans `media.ts` (ou `about.ts`). Tant que `src` est vide, un emplacement « à fournir » s'affiche, avec la consigne de prise de vue.
- **Ajouter un avis** : uniquement de vrais avis Google, recopiés tels quels, dans `reviews.ts`.

## Structure

```
src/
├── components/   Header, Footer, ShopCard, MenuItem, Extras, Cart (commande + configurateur),
│                 Frame (cadre en damier), Media, About, ReviewMarquee, OpenStatus, Hours…
├── data/         contenu du site (voir ci-dessus)
├── layouts/      Layout.astro (SEO, polices, header, footer, commande)
├── pages/        index, carte, contact, 404
├── scripts/      cart.ts (commande), hours.ts (ouvert / fermé, heure de Paris)
└── styles/       global.css (couleurs, typo et utilitaires en variables CSS)
public/           logo, favicons, photos (medias/)
design-source/    fichiers du client (logo .ai, cartes PDF 2026), non publiés
```

## À fournir par le client

- Les mentions légales (`src/data/legal.ts`) : raison sociale, SIRET, RCS, TVA, directeur de la publication, hébergeur
- L'image de partage `public/og-image.jpg` (1200 × 630, provisoire)
- La pizza du mois (`pizzaOfTheMonth` dans `menu.ts`)

- Le téléphone de la boutique Henri Fabre (fermée temporairement pour l'instant)
- Les photos définitives : devanture, four, comptoir (les photos actuelles sont provisoires)

## Documentation

- `PRODUCT.md` — ce qui est vrai sur Slice et ce que le site doit faire
- `DESIGN.md` — le système visuel (couleurs relevées sur les cartes imprimées, typographie, damier)
- `AGENTS.md` — guide technique pour les agents de code (`CLAUDE.md` est un lien vers ce fichier)
