// Photos et vidéo du site. Tant que `src` est vide, un emplacement « à fournir » s'affiche
// avec la description de ce qu'il faut y mettre. Pour publier un média : déposer le fichier
// dans public/medias/ et renseigner `src` (et `poster` / `webm` pour la vidéo).
export type MediaSlot = {
  kind: 'video' | 'photo';
  title: string; // ce que montre le média (affiché sur l'emplacement)
  brief: string; // consigne de prise de vue
  specs: string; // format attendu
  alt: string; // texte alternatif une fois le média en place
  src?: string; // photo (.jpg) ou vidéo (.mp4)
  webm?: string; // vidéo : version WebM, optionnelle
  poster?: string; // vidéo : image fixe affichée avant la lecture
};

// Média du hero, dans le cadre en damier. Photo pour l'instant ; pour passer à la vidéo plus tard :
// kind: 'video', src: '/medias/hero.mp4', webm: '/medias/hero.webm', poster: '/medias/hero.jpg'
// (boucle de 6 à 10 s, muette, 4:5, ≈ 1,5 Mo).
export const heroMedia: MediaSlot = {
  kind: 'photo',
  title: 'Une pizza qui sort du four',
  brief:
    'Plan serré : une pizza tout juste sortie du four, sur la pelle ou le comptoir, fromage encore fondant. Sans texte ni sticker à l’image.',
  specs: 'JPG · vertical 4:5 · 1600 × 2000 px idéalement (1080 × 1350 min.)',
  alt: 'Une pizza garnie de sauce tomate et de mozzarella, prête à être enfournée.',
  src: '/medias/pizza-1.jpg', // provisoire
};

export const gallery: MediaSlot[] = [
  {
    kind: 'photo',
    title: 'La devanture',
    brief: 'Depuis la rue, en journée : l’enseigne Slice et l’entrée, pour qu’on reconnaisse la boutique en arrivant.',
    specs: 'JPG · vertical 4:5 · 1600 px de large min.',
    alt: 'Des cartons à pizza Slice empilés au soleil, au bord de l’eau.',
    src: '/medias/carton-pizza.jpg', // provisoire, à la place de la devanture
  },
  {
    kind: 'photo',
    title: 'Le four',
    brief: 'Le four en service, une pizza en cuisson, si possible avec le pizzaiolo à l’œuvre.',
    specs: 'JPG · vertical 4:5 · 1600 px de large min.',
    alt: 'La pâte à pizza étirée à la main au-dessus du plan de travail fariné.',
    src: '/medias/pate-pizza.jpg', // provisoire, à la place du four
  },
  {
    kind: 'photo',
    title: 'Une pizza entière',
    brief: 'Vue de dessus, une pizza de 40 cm entière sur le comptoir (ex. Original Pepperoni), lumière naturelle.',
    specs: 'JPG · vertical 4:5 · 1600 px de large min.',
    alt: 'Un filet de sauce versé sur une pizza blanche au jambon cru.',
    src: '/medias/pizza-sauce.jpg', // provisoire
  },
  {
    kind: 'photo',
    title: 'Le comptoir',
    brief: 'Le comptoir avec la carte affichée au mur, ou une pizza remise à un client (avec son accord).',
    specs: 'JPG · vertical 4:5 · 1600 px de large min.',
    alt: 'Des pizzas présentées sur le comptoir de Slice.',
    src: '/medias/presentoir.jpg', // provisoire
  },
];
