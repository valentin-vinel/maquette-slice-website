export type MenuItem = {
  name: string;
  description?: string;
  price: number;
  tags?: ('végétarien' | 'épicé' | 'signature')[];
};

export type MenuSection = {
  id: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
};

export const menu: MenuSection[] = [
  {
    id: 'pizzas',
    title: 'Pizzas',
    subtitle: 'Entières · 40 cm',
    items: [
      { name: 'Margherita', description: 'Sauce tomate, mozzarella', price: 8 },
      { name: 'Anchois', description: 'Sauce tomate, anchois, herbes de Provence', price: 9 },
      { name: 'Royale', description: 'Sauce tomate, mozzarella, jambon blanc artisanal, champignons frais', price: 13.9 },
      { name: 'Original Pepperoni', description: 'Sauce tomate, mozzarella, pepperoni', price: 15.9 },
      { name: 'Meatballs', description: 'Sauce tomate, mozzarella, boulette de viande cuisinée, oignons rôtis', price: 15.9 },
      { name: '4 Fromages', description: 'Sauce tomate, mozzarella, chèvre, gorgonzola, parmesan', price: 15.9 },
      { name: 'Vege', description: 'Sauce tomate, mozzarella, lamelles de courgettes, oignons rôtis', price: 14.5 },
      { name: 'Ooh Honey', description: 'Crème fraîche, mozzarella, jambon cru fumé, sauce moutarde miel, burrata', price: 16.9 },
      { name: 'Chicken Ranch', description: 'Sauce tomate, mozzarella, poulet mariné, sauce ranch', price: 15.5 },
    ],
  },
  {
    id: 'desserts',
    title: 'Desserts',
    items: [
      { name: 'Cookie XL maison', price: 3.5 },
      { name: 'Pizza Nutella', price: 10 },
    ],
  },
  {
    id: 'boissons',
    title: 'Boissons',
    subtitle: 'Coca-Cola, Coca-Cola Zero, Ice Tea, Sprite, Oasis Tropical, Dr Pepper, eau, Perrier',
    items: [
      { name: '33 cl', price: 2 },
      { name: '1,5 L', price: 3.5 },
    ],
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);

// « 15,90 € » → { units: '15', cents: ',90 €' } pour composer les prix comme sur la carte imprimée.
export const splitPrice = (price: number) => {
  const text = formatPrice(price);
  const i = text.indexOf(',');
  return { units: text.slice(0, i), cents: text.slice(i) };
};

export const pizzas = menu[0];
export const startingPrice = Math.min(...pizzas.items.map((i) => i.price));

// Identifiant stable d'un article pour le panier : « pizzas-original-pepperoni ».
const slug = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const itemId = (sectionId: string, item: MenuItem) => `${sectionId}-${slug(item.name)}`;

// Catalogue à plat pour le panier ; les boissons sont nommées « Boisson 33 cl » pour rester lisibles hors contexte.
export const catalog = menu.flatMap((section) =>
  section.items.map((item) => ({
    id: itemId(section.id, item),
    label: section.id === 'boissons' ? `Boisson ${item.name}` : item.name,
    price: item.price,
  })),
);
