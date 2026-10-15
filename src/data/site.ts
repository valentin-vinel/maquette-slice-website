// Informations générales de la pizzeria.
// À COMPLÉTER : le téléphone d'Henri Fabre est provisoire.
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

// Horaires communs aux 3 boutiques. Si une boutique a des horaires différents,
// lui donner sa propre liste dans `shops` ci-dessous.
const sharedHours: Hours = [
  { label: 'Lundi – Vendredi', days: [1, 2, 3, 4, 5], slots: [['11:30', '14:30'], ['18:30', '22:30']] },
  { label: 'Samedi', days: [6], slots: [['18:30', '22:30']] },
  { label: 'Dimanche', days: [0], slots: [] },
];

const maps = (street: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Slice Pizzeria ${street} 84000 Avignon`)}`;

export const shops: Shop[] = [
  {
    id: 'carnot',
    name: 'Carnot',
    street: '45 rue Carnot',
    city: '84000 Avignon',
    phone: '04 86 34 14 26',
    mapsUrl: maps('45 rue Carnot'),
    hours: sharedHours,
  },
  {
    id: 'republique',
    name: 'République',
    street: '26 rue de la République',
    city: '84000 Avignon',
    phone: '04 90 26 54 92',
    mapsUrl: maps('26 rue de la République'),
    hours: sharedHours,
  },
  {
    id: 'henri-fabre',
    name: 'Henri Fabre',
    street: '10 rue Henri Fabre',
    city: '84000 Avignon',
    phone: '04 90 00 00 03', // À COMPLÉTER : numéro d'Henri Fabre
    mapsUrl: maps('10 rue Henri Fabre'),
    hours: sharedHours,
  },
];

export const site = {
  name: 'Slice',
  tagline: 'Pizzeria à Avignon',
  description:
    'Slice, pizzeria dans le centre-ville d’Avignon : trois boutiques, des pizzas de 40 cm à emporter. Margherita, Original Pepperoni, Chicken Ranch, Ooh Honey…',
  email: 'sliceavignonpizza@gmail.com',
  instagram: 'https://www.instagram.com/sliceavignonpizza/',
  // Réseaux affichés dans le pied de page (colonne masquée si la liste est vide).
  socials: [{ label: 'Instagram', href: 'https://www.instagram.com/sliceavignonpizza/' }] as { label: string; href: string }[],
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
