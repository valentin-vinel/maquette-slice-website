// Avis clients affichés sur l'accueil. À COMPLÉTER uniquement avec de vrais avis (Google, avec l'accord
// du client) : tant que `text` est vide, un emplacement « avis à fournir » s'affiche.
import { shops } from './site';

export type Review = {
  text?: string; // 2 à 3 phrases, recopiées telles quelles
  author?: string; // prénom + initiale, ex. « Julie M. »
  date?: string; // mois et année, ex. « septembre 2026 »
  shop?: string; // boutique de la fiche Google d'où vient l'avis
};

// Fiches Google existantes (mettre à jour la note et le nombre d'avis de temps en temps).
// Henri Fabre n'a pas encore de fiche.
const mapsOf = (id: string) => shops.find((s) => s.id === id)!.mapsUrl;

export const profiles = [
  { shop: 'Carnot', rating: 4.8, count: 234, url: mapsOf('carnot') },
  { shop: 'République', rating: 4.8, count: 67, url: mapsOf('republique') },
];

// Note globale = moyenne pondérée par le nombre d'avis de chaque fiche.
export const totalCount = profiles.reduce((n, p) => n + p.count, 0);
export const overallRating = profiles.reduce((sum, p) => sum + p.rating * p.count, 0) / totalCount;

// « 200+ », « 50+ » : nombres arrondis vers le bas pour rester vrais sans mise à jour constante.
export const roundedCount = (n: number) => {
  const step = n >= 100 ? 100 : n >= 50 ? 50 : 10;
  return n >= 10 ? `${Math.floor(n / step) * step}+` : String(n);
};

export const countLabel = roundedCount(totalCount);

// 6 à 8 avis pour le bandeau défilant (8 emplacements prévus ; supprimer les vides en trop).
export const reviews: Review[] = [
  {
    text: "Super endroit Personnel très sympa et pizza super bonne ! Je vais revenir vraiment souvent je me suis régaler et les prix sont super correct pour la qualités du produit !",
    author: "Louisa S.",
    date: "Mai 2025",
    shop: ""
  },  {
    text: "Excellente surprise ! Ouvert même en période hivernale sur Avignon ! Service client très sympathique, aimable et vrai ! Rapport qualité prix incroyable ! Des pizzas énormes et très très bonnes. Sans présomption,sans artifices, de vraies simples bonnes pizza ! Bravo ! Nous reviendrons!",
    author: "Dan",
    date: "Février 2026",
    shop: ""
  },  {
    text: "Il y a des traditions super simples à mettre en place : quand tu rentres du travail en courant, tu t’arrêtes et tu prend un part (ou deux) de pizza! Oui c’est diététique ! Les pizzas sont super! Le service est génial! Les cookies sont au top!",
    author: "Auré V.",
    date: "Avril 2025",
    shop: ""
  },  {
    text: "Super pizzeria, pâtes et sauces fait maison. Sélection journalière des aliment chez le primeur et à la boucherie et ça se sent ! Le Pizzaiolo est très agréable et sa royale était si bonne que j’ai du revenir pour en chercher une deuxième.",
    author: "Pierre A.",
    date: "2024",
    shop: ""
  },  {
    text: "Nous avons commandé plusieurs fois et n'avons jamais été déçus. La pizza est excellente, copieuse, peu chère et la livraison rapide et efficace permet aux pizzas d'arriver chaudes. Nous recommandons vivement et vous remercions !",
    author: "Lucie R.",
    date: "Mai 2023",
    shop: ""
  },  {
    text: "Les pizzas sont super bonnes ! Les produits frais se ressentent !! Franchement top! Recommande les yeux fermés.",
    author: "Jade O.",
    date: "Octobre 2024",
    shop: ""
  },
];
