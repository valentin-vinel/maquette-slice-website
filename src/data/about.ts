// Présentation de Slice et de son fondateur (accueil, entre la carte et les avis).
// À COMPLÉTER avec de vrais éléments : tant qu'un champ est vide, un emplacement « à fournir » s'affiche.
import type { MediaSlot } from './media';

export const about = {
  title: 'L’histoire de Slice',
  founder: 'Remi' as string | undefined, // prénom du fondateur, affiché en signature manuscrite
  role: 'fondateur de Slice',
  // 3 à 4 phrases au total, en 1 ou 2 paragraphes. TEXTE FACTICE : à remplacer par la vraie histoire de Slice.
  paragraphs: [
    '(Texte factice, à remplacer par la vraie histoire de Slice.) Slice, c’est l’idée de Remi : des pizzas généreuses de 40 cm, garnies sans compter, à emporter en plein centre d’Avignon. On a commencé rue Carnot, puis les habitués nous ont suivis jusqu’à République et Henri Fabre.',
    'Chaque jour, on prépare la pâte, on garnit à la commande et on vous tend votre pizza encore chaude. Un coup de fil, on s’occupe du reste.',
  ] as string[],
  photo: {
    kind: 'photo',
    title: 'Le fondateur',
    brief: 'Portrait du fondateur au comptoir ou devant le four, en situation plutôt que posé, lumière naturelle.',
    specs: 'JPG · vertical 4:5 · 1600 px de large min.',
    alt: 'Remi, fondateur de Slice, croque une part de pizza dans la rue, une pizza entière à la main.',
    src: '/medias/remi.jpg',
  } satisfies MediaSlot as MediaSlot,
};
