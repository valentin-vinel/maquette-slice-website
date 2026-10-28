// Présentation de Slice et de son fondateur (accueil, entre la carte et les avis).
// À COMPLÉTER avec de vrais éléments : tant qu'un champ est vide, un emplacement « à fournir » s'affiche.
import type { MediaSlot } from './media';

export const about = {
  title: 'L’histoire de Slice',
  founder: 'Rémi' as string | undefined, // prénom du fondateur, affiché en signature manuscrite
  role: 'fondateur de Slice',
  // 3 à 4 phrases au total, en 1 ou 2 paragraphes.
  paragraphs: [
    'Slice, c’est l’idée de Rémi : des pizzas généreuses de 40 cm, garnies sans compter, à emporter en plein centre d’Avignon. On a commencé rue Carnot, puis les habitués nous ont suivis jusqu’à République et Henri Fabre.',
    'La pâte est préparée chaque jour, avec une fermentation longue de 48 h minimum, afin de vous proposer un produit de la meilleure qualité possible.',
  ] as string[],
  photo: {
    kind: 'photo',
    title: 'Le fondateur',
    brief: 'Portrait du fondateur au comptoir ou devant le four, en situation plutôt que posé, lumière naturelle.',
    specs: 'JPG · vertical 4:5 · 1600 px de large min.',
    alt: 'Rémi, fondateur de Slice, croque une part de pizza dans la rue, une pizza entière à la main.',
    src: '/medias/remi.jpg',
  } satisfies MediaSlot as MediaSlot,
};
