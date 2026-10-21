export type MenuItem = {
  name: string;
  description?: string;
  price: number;
  photo?: string; // nom du fichier dans src/assets/menu/, sans extension (affiché au-dessus du nom)
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
      { name: 'Margherita', description: 'Sauce tomate, mozzarella', price: 8, photo: 'margherita' },
      { name: 'Anchois', description: 'Sauce tomate, anchois, herbes de Provence', price: 9, photo: 'anchois' },
      { name: 'Royale', description: 'Sauce tomate, mozzarella, jambon blanc artisanal, champignons frais', price: 13.9, photo: 'royale' },
      { name: 'Original Pepperoni', description: 'Sauce tomate, mozzarella, pepperoni', price: 15.9, photo: 'original-pepperoni' },
      { name: 'Meatballs', description: 'Sauce tomate, mozzarella, boulette de viande cuisinée, oignons rôtis', price: 15.9, photo: 'meatballs' },
      { name: '4 Fromages', description: 'Sauce tomate, mozzarella, chèvre, gorgonzola, parmesan', price: 15.9, photo: '4-fromages' },
      { name: 'Vege', description: 'Sauce tomate, mozzarella, lamelles de courgettes, oignons rôtis', price: 14.5, photo: 'vege' },
      { name: 'Ooh Honey', description: 'Crème fraîche, mozzarella, jambon cru fumé, sauce moutarde miel, burrata', price: 16.9, photo: 'ooh-honey' },
      { name: 'Chicken Ranch', description: 'Sauce tomate, mozzarella, poulet mariné, sauce ranch', price: 15.5, photo: 'chicken-ranch' },
      // Pizzas vendues à la part sur la carte imprimée ; prix entier = prix de la part × 4 (consigne du client).
      { name: 'Champignon', description: 'Sauce tomate, mozzarella, champignons frais', price: 11.2, photo: 'champignon' },
      { name: 'Jambon', description: 'Sauce tomate, mozzarella, jambon blanc artisanal', price: 13.2, photo: 'jambon' },
      { name: 'Poivron grillé', description: 'Sauce tomate, mozzarella, poivron grillé', price: 16, photo: 'poivron-grille' },
      { name: 'Carbo Style', description: 'Crème fraîche, mozzarella, jambon cru fumé, parmesan, jaune d’œuf', price: 14, photo: 'carbo-style' },
      { name: 'Chèvre Miel', description: 'Crème fraîche, mozzarella, chèvre, miel', price: 14.8, photo: 'chevre-miel' },
    ],
  },
  {
    id: 'desserts',
    title: 'Desserts',
    items: [
      { name: 'Cookie XL maison', price: 3.5, photo: 'cookie' },
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

// Pizza du mois (accueil sous la devanture, et en tête de /carte), à mettre à jour chaque mois.
// Tant que `item` est vide, un emplacement « à fournir » s'affiche. Elle se commande comme les autres pizzas
// (configurateur + extras). Photo : déposer le fichier dans src/assets/menu/ et renseigner `photo`.
export const pizzaOfTheMonth: { month: string; item?: MenuItem } = {
  month: '', // ex. « Novembre »
  item: undefined, // ex. { name: '…', description: '…', price: 15.9, photo: '…' }
};

// Extras à ajouter sur une pizza (configurateur du panier). Ils ne sont pas une section de la carte.
export const extras: MenuItem[] = [
  { name: 'Poulet mariné', price: 3 },
  { name: 'Viande hachée marinée', price: 3 },
  { name: 'Pepperoni', price: 3 },
  { name: 'Jambon blanc artisanal', price: 3 },
  { name: 'Jambon cru fumé', price: 3 },
  { name: 'Anchois', price: 3 },
  { name: 'Chèvre', price: 3 },
  { name: 'Gorgonzola', price: 3 },
  { name: 'Parmesan râpé', price: 3 },
  { name: 'Burrata', price: 4 },
  { name: 'Mozzarella', price: 2 },
  { name: 'Champignons frais', price: 2 },
  { name: 'Poivron grillé mariné', price: 2 },
  { name: 'Oignons rôtis', price: 2 },
  { name: 'Lamelles de courgettes', price: 2 },
  { name: 'Sauce ranch', price: 2 },
  { name: 'Jaune d’œuf', price: 2 },
  { name: 'Sauce moutarde miel', price: 2 },
  { name: 'Miel piquant', price: 2 },
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

// Pizzas qu'on peut configurer et commander : celles de la carte et la pizza du mois.
export const orderablePizzas = pizzaOfTheMonth.item ? [...pizzas.items, pizzaOfTheMonth.item] : pizzas.items;

// « Extras à ajouter sur chaque pizza : de 2 € à 4 € » (accueil, carte), calculé depuis les prix.
const roundPrice = (price: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', trailingZeroDisplay: 'stripIfInteger' }).format(price);
const extraPrices = extras.map((e) => e.price);
export const extrasHint = `Extras à ajouter sur chaque pizza : de ${roundPrice(Math.min(...extraPrices))} à ${roundPrice(Math.max(...extraPrices))}`;
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

// Nom lisible hors de sa section (panier, boutons) : « Boisson 33 cl ».
export const itemLabel = (sectionId: string, item: MenuItem) =>
  sectionId === 'boissons' ? `Boisson ${item.name}` : item.name;

// Catalogue à plat pour le panier, avec les noms lisibles hors contexte (itemLabel).
export const catalog = menu
  .map((section) => (section === pizzas ? { ...section, items: orderablePizzas } : section))
  .flatMap((section) =>
    section.items.map((item) => ({
      id: itemId(section.id, item),
      label: itemLabel(section.id, item),
      price: item.price,
    })),
  );

// Extras pour le configurateur : « extras-burrata », nom en minuscule pour le récapitulatif (« + burrata »).
export const extraCatalog = extras.map((item) => ({
  id: itemId('extras', item),
  label: item.name.charAt(0).toLowerCase() + item.name.slice(1),
  price: item.price,
}));
