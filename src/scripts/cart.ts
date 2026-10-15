// Panier de commande, entièrement dans le navigateur : rien n'est envoyé.
// Le visiteur compose sa liste puis appelle la boutique de son choix en l'ayant sous les yeux.
import { catalog, extraCatalog, formatPrice, pizzas, itemId } from '../data/menu';

// Une ligne = un article et ses extras, encodés dans la clé :
// « desserts-cookie-xl-maison », « pizzas-royale+extras-burrata+extras-chevre+extras-chevre ».
type Cart = Record<string, number>;

const KEY = 'slice-commande';
// Mêmes tracés que les icônes plus / minus de Icon.astro.
const PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
const MINUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>';
const MAX = 20;
const MAX_EXTRA = 5; // même extra sur une pizza
const byId = new Map(catalog.map((item) => [item.id, item]));
const extraById = new Map(extraCatalog.map((extra) => [extra.id, extra]));
const pizzaById = new Map(pizzas.items.map((item) => [itemId(pizzas.id, item), item]));
const extraOrder = new Map(extraCatalog.map((extra, i) => [extra.id, i]));

const lineKey = (base: string, extras: string[]) =>
  [base, ...[...extras].sort((a, b) => extraOrder.get(a)! - extraOrder.get(b)!)].join('+');

// Clé valide : un article connu, et des extras connus seulement sur une pizza.
function parseKey(key: string) {
  const [base, ...extras] = key.split('+');
  if (!byId.has(base)) return null;
  if (extras.length > 0 && (!pizzaById.has(base) || !extras.every((id) => extraById.has(id)))) return null;
  return { base, extras };
}

const unitPrice = (key: string) => {
  const line = parseKey(key)!;
  return byId.get(line.base)!.price + line.extras.reduce((sum, id) => sum + extraById.get(id)!.price, 0);
};

// « burrata, 2 × chèvre », dans l'ordre de la liste des extras.
function extrasText(extras: string[]) {
  const counts = new Map<string, number>();
  for (const id of extras) counts.set(id, (counts.get(id) ?? 0) + 1);
  return [...counts]
    .sort(([a], [b]) => extraOrder.get(a)! - extraOrder.get(b)!)
    .map(([id, n]) => `${n > 1 ? `${n} × ` : ''}${extraById.get(id)!.label}`)
    .join(', ');
}

const lineLabel = (key: string) => {
  const line = parseKey(key)!;
  const name = byId.get(line.base)!.label;
  return line.extras.length > 0 ? `${name} + ${extrasText(line.extras)}` : name;
};

function load(): Cart {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '{}') as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(raw).filter(
        (entry): entry is [string, number] =>
          parseKey(entry[0]) !== null && Number.isInteger(entry[1]) && (entry[1] as number) > 0,
      ),
    );
  } catch {
    return {};
  }
}

let cart: Cart = load();

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(cart));
  } catch {
    // Stockage indisponible (navigation privée…) : le panier fonctionne pour la page en cours.
  }
}

const count = () => Object.values(cart).reduce((n, q) => n + q, 0);
const total = () => Object.entries(cart).reduce((sum, [key, q]) => sum + unitPrice(key) * q, 0);

const live = document.querySelector<HTMLElement>('[data-cart-live]');
function announce(key: string) {
  if (!live || !parseKey(key)) return;
  const q = cart[key] ?? 0;
  const label = lineLabel(key);
  live.textContent = q > 0 ? `${label} : ${q} dans votre commande.` : `${label} retiré de votre commande.`;
}

function setQty(key: string, qty: number) {
  const q = Math.max(0, Math.min(MAX, qty));
  if (q > 0) cart[key] = q;
  else delete cart[key];
  save();
  render();
  announce(key);
}

// Boutons + / − d'un article (desserts, boissons, et lignes de la commande).
document.addEventListener('click', (event) => {
  const button = (event.target as Element).closest<HTMLButtonElement>('[data-cart-inc], [data-cart-dec]');
  if (!button) return;
  const key = button.closest<HTMLElement>('[data-cart-item]')?.dataset.cartItem;
  if (!key || !parseKey(key)) return;
  setQty(key, (cart[key] ?? 0) + (button.hasAttribute('data-cart-inc') ? 1 : -1));
});

const fab = document.querySelector<HTMLButtonElement>('[data-cart-open]');
const dialog = document.querySelector<HTMLDialogElement>('[data-cart-dialog]');
const list = document.querySelector<HTMLElement>('[data-cart-list]');

function lineElement(key: string, qty: number) {
  const line = parseKey(key)!;
  const label = lineLabel(key);
  const li = document.createElement('li');
  li.className = 'cart__line';
  li.dataset.cartItem = key;

  const name = document.createElement('span');
  name.className = 'cart__name';
  name.textContent = byId.get(line.base)!.label;
  if (line.extras.length > 0) {
    const extras = document.createElement('span');
    extras.className = 'cart__extras';
    extras.textContent = `+ ${extrasText(line.extras)}`;
    name.append(extras);
  }

  const stepper = document.createElement('span');
  stepper.className = 'qty qty--line';
  const dec = document.createElement('button');
  dec.type = 'button';
  dec.className = 'qty__btn';
  dec.setAttribute('data-cart-dec', '');
  dec.setAttribute('aria-label', `Retirer : ${label}`);
  dec.innerHTML = MINUS;
  const value = document.createElement('span');
  value.className = 'qty__count';
  value.textContent = String(qty);
  const inc = document.createElement('button');
  inc.type = 'button';
  inc.className = 'qty__btn';
  inc.setAttribute('data-cart-inc', '');
  inc.setAttribute('aria-label', `Ajouter : ${label}`);
  inc.innerHTML = PLUS;
  stepper.append(dec, value, inc);

  const price = document.createElement('span');
  price.className = 'cart__price';
  price.textContent = formatPrice(unitPrice(key) * qty);

  li.append(name, stepper, price);
  return li;
}

function render() {
  const n = count();

  // Compteurs sur la carte (desserts, boissons).
  document.querySelectorAll<HTMLElement>('.qty[data-cart-item]:not(.qty--line)').forEach((el) => {
    const q = cart[el.dataset.cartItem!] ?? 0;
    el.hidden = false;
    el.classList.toggle('has-items', q > 0);
    const value = el.querySelector('.qty__count');
    if (value) value.textContent = String(q);
  });

  // Pizzas : nombre commandé, toutes compositions confondues.
  document.querySelectorAll<HTMLElement>('.qty[data-pizza]').forEach((el) => {
    const id = el.dataset.pizza!;
    const q = Object.entries(cart).reduce((sum, [key, qty]) => sum + (parseKey(key)!.base === id ? qty : 0), 0);
    el.hidden = false;
    el.classList.toggle('has-items', q > 0);
    el.querySelector('.qty__count')!.textContent = String(q);
  });

  // Bouton flottant.
  if (fab) {
    fab.hidden = n === 0;
    fab.querySelector('[data-cart-count]')!.textContent = String(n);
    fab.querySelector('[data-cart-total]')!.textContent = formatPrice(total());
    fab.setAttribute('aria-label', `Voir ma commande : ${n} article${n > 1 ? 's' : ''}, ${formatPrice(total())}`);
    document.body.classList.toggle('has-cart', n > 0);
  }

  // Contenu de la commande.
  if (dialog && list) {
    list.replaceChildren(...Object.entries(cart).map(([key, q]) => lineElement(key, q)));
    dialog.classList.toggle('is-empty', n === 0);
    dialog.querySelector('[data-cart-dialog-total]')!.textContent = formatPrice(total());
  }
}

fab?.addEventListener('click', () => dialog?.showModal());
dialog?.querySelector('[data-cart-close]')?.addEventListener('click', () => dialog.close());
dialog?.querySelector('[data-cart-clear]')?.addEventListener('click', () => {
  cart = {};
  save();
  render();
  if (live) live.textContent = 'Commande vidée.';
});
// Clic sur le fond : fermer.
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

// Configurateur : une pizza, sa quantité et ses extras, puis « Ajouter à ma commande ».
const config = document.querySelector<HTMLDialogElement>('[data-config-dialog]');
let draft = { pizza: '', qty: 1, extras: new Map<string, number>() };

const draftExtras = () => [...draft.extras].flatMap(([id, n]) => Array<string>(n).fill(id));
const draftKey = () => lineKey(draft.pizza, draftExtras());

function renderConfig() {
  if (!config) return;
  const pizza = pizzaById.get(draft.pizza)!;
  const extras = draftExtras();
  const set = (selector: string, text: string) => (config.querySelector(selector)!.textContent = text);

  set('[data-config-name]', pizza.name);
  set('[data-config-base-price]', formatPrice(pizza.price));
  set('[data-config-desc]', pizza.description ?? '');
  set('[data-config-qty-count]', String(draft.qty));
  config.querySelector<HTMLButtonElement>('[data-config-qty] [data-cart-dec]')!.disabled = draft.qty <= 1;
  config.querySelector<HTMLButtonElement>('[data-config-qty] [data-cart-inc]')!.disabled = draft.qty >= MAX;

  config.querySelectorAll<HTMLElement>('[data-extra]').forEach((row) => {
    const n = draft.extras.get(row.dataset.extra!) ?? 0;
    row.querySelector('.qty')!.classList.toggle('has-items', n > 0);
    row.querySelector('.qty__count')!.textContent = String(n);
    row.querySelector<HTMLButtonElement>('[data-cart-inc]')!.disabled = n >= MAX_EXTRA;
  });

  set('[data-config-recap-name]', `${draft.qty} × ${pizza.name}`);
  set('[data-config-recap-extras]', extras.length > 0 ? `+ ${extrasText(extras)}` : 'Sans extra');
  set('[data-config-total]', formatPrice(unitPrice(draftKey()) * draft.qty));
}

function openConfig(pizza: string) {
  if (!config || !pizzaById.has(pizza)) return;
  draft = { pizza, qty: 1, extras: new Map() };
  renderConfig();
  config.showModal();
  config.scrollTop = 0;
}

// « + » d'une pizza.
document.addEventListener('click', (event) => {
  const pizza = (event.target as Element).closest('[data-config-open]')?.closest<HTMLElement>('[data-pizza]')?.dataset.pizza;
  if (pizza) openConfig(pizza);
});

config?.addEventListener('click', (event) => {
  if (event.target === config) return config.close();
  const button = (event.target as Element).closest<HTMLButtonElement>('[data-cart-inc], [data-cart-dec]');
  if (!button) return;
  const step = button.hasAttribute('data-cart-inc') ? 1 : -1;
  const extra = button.closest<HTMLElement>('[data-extra]')?.dataset.extra;
  if (extra) {
    const n = Math.max(0, Math.min(MAX_EXTRA, (draft.extras.get(extra) ?? 0) + step));
    if (n > 0) draft.extras.set(extra, n);
    else draft.extras.delete(extra);
  } else if (button.closest('[data-config-qty]')) {
    draft.qty = Math.max(1, Math.min(MAX, draft.qty + step));
  }
  renderConfig();
});

config?.querySelector('[data-config-close]')?.addEventListener('click', () => config.close());
config?.querySelector('[data-config-confirm]')?.addEventListener('click', () => {
  const key = draftKey();
  setQty(key, (cart[key] ?? 0) + draft.qty);
  config.close();
  if (live) live.textContent = `${lineLabel(key)} ajouté à votre commande.`;
});

// Un autre onglet a modifié le panier.
window.addEventListener('storage', (event) => {
  if (event.key === KEY) {
    cart = load();
    render();
  }
});

render();
