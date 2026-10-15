// Informations générales de la pizzeria.
// À COMPLÉTER : téléphones et horaires des boutiques, e-mail et réseaux sont provisoires.
export type Slot = readonly [string, string];

export type Hours = readonly {
  label: string;
  days: readonly number[]; // 0 = dimanche … 6 = samedi
  slots: readonly Slot[]; // vide = fermé
}[];

export type Shop = {
  id: string;
  name: string;
  street: string;
  city: string;
  phone: string;
  mapsUrl: string;
  hours: Hours;
};

// Horaires provisoires, recopiés pour chaque boutique en attendant les vrais.
const placeholderHours: Hours = [
  { label: 'Lundi', days: [1], slots: [] },
  { label: 'Mardi – Jeudi', days: [2, 3, 4], slots: [['11:30', '14:30'], ['18:30', '22:30']] },
  { label: 'Vendredi – Samedi', days: [5, 6], slots: [['11:30', '14:30'], ['18:30', '23:30']] },
  { label: 'Dimanche', days: [0], slots: [['18:30', '22:30']] },
];

const maps = (street: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Slice Pizzeria ${street} 84000 Avignon`)}`;

export const shops: Shop[] = [
  {
    id: 'carnot',
    name: 'Carnot',
    street: '45 rue Carnot',
    city: '84000 Avignon',
    phone: '04 90 00 00 01',
    mapsUrl: maps('45 rue Carnot'),
    hours: placeholderHours,
  },
  {
    id: 'republique',
    name: 'République',
    street: '26 rue de la République',
    city: '84000 Avignon',
    phone: '04 90 00 00 02',
    mapsUrl: maps('26 rue de la République'),
    hours: placeholderHours,
  },
  {
    id: 'henri-fabre',
    name: 'Henri Fabre',
    street: '10 rue Henri Fabre',
    city: '84000 Avignon',
    phone: '04 90 00 00 03',
    mapsUrl: maps('10 rue Henri Fabre'),
    hours: placeholderHours,
  },
];

export const site = {
  name: 'Slice',
  tagline: 'Pizzeria à Avignon',
  description:
    'Slice, pizzeria dans le centre-ville d’Avignon : trois boutiques, des pizzas de 40 cm à emporter. Margherita, Original Pepperoni, Chicken Ranch, Ooh Honey…',
  email: 'contact@exemple.fr',
  // À COMPLÉTER : lien du compte Instagram de Slice (icône dans l'en-tête).
  instagram: 'https://www.instagram.com/',
  // Réseaux : à compléter avec les vrais comptes (la colonne du pied de page est masquée tant que la liste est vide).
  socials: [] as { label: string; href: string }[],
};

export const formatTime = (t: string) => t.replace(':', 'h');

// Un créneau ne se coupe jamais en deux : « 11h30 – 14h30 ».
export const formatSlot = ([a, b]: Slot) => `${formatTime(a)} – ${formatTime(b)}`;

export const formatSlots = (slots: readonly Slot[]) =>
  slots.length === 0 ? 'Fermé' : slots.map((s) => formatSlot(s)).join(' · ');

// Créneaux par jour de la semaine (index 0 = dimanche), dérivés des horaires d'une boutique.
export const weekOf = (hours: Hours): readonly (readonly Slot[])[] =>
  Array.from({ length: 7 }, (_, d) => hours.find((h) => h.days.includes(d))?.slots ?? []);

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, '')}`;

export const nav = [
  { href: '/', label: 'Accueil' },
  { href: '/carte', label: 'La carte' },
  { href: '/contact', label: 'Boutiques' },
] as const;
