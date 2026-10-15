# Slice — site vitrine de pizzeria

Site statique construit avec [Astro](https://astro.build) 7.

## Commandes

| Commande          | Action                                   |
| ----------------- | ---------------------------------------- |
| `npm install`     | Installe les dépendances                 |
| `npm run dev`     | Serveur de dev sur `localhost:4321`      |
| `npm run build`   | Génère le site dans `./dist/`            |
| `npm run preview` | Prévisualise le build                    |

## Structure

```
src/
├── components/   Header, Footer, MenuItem, Hours
├── data/
│   ├── site.ts   Nom, adresse, téléphone, horaires, réseaux
│   └── menu.ts   La carte (pizzas, desserts, boissons)
├── layouts/      Layout.astro (SEO, polices, header/footer)
├── pages/        index, carte, contact, 404
└── styles/       global.css (couleurs et typo en variables CSS)
```

Pour personnaliser le contenu, modifiez simplement `src/data/site.ts` et `src/data/menu.ts`.
