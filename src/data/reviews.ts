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

// « +300 » : total arrondi à la centaine inférieure, pour rester vrai entre deux mises à jour.
export const countLabel = totalCount >= 100 ? `+${Math.floor(totalCount / 100) * 100}` : String(totalCount);

// 6 à 8 avis pour le bandeau défilant (8 emplacements prévus ; supprimer les vides en trop).
export const reviews: Review[] = [{}, {}, {}, {}, {}, {}, {}, {}];
