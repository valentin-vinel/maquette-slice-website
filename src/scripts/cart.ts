// Panier de commande, entièrement dans le navigateur : rien n'est envoyé.
// Le visiteur compose sa liste puis appelle la boutique de son choix en l'ayant sous les yeux.
import { catalog, formatPrice } from '../data/menu';

type Cart = Record<string, number>;

const KEY = 'slice-commande';
// Mêmes tracés que les icônes plus / minus de Icon.astro.
const PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
const MINUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>';
const MAX = 20;
const byId = new Map(catalog.map((item) => [item.id, item]));

function load(): Cart {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '{}') as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(raw).filter(
        (entry): entry is [string, number] =>
          byId.has(entry[0]) && Number.isInteger(entry[1]) && (entry[1] as number) > 0,
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
const total = () => Object.entries(cart).reduce((sum, [id, q]) => sum + (byId.get(id)?.price ?? 0) * q, 0);

const live = document.querySelector<HTMLElement>('[data-cart-live]');
function announce(id: string) {
  const item = byId.get(id);
  if (!live || !item) return;
  const q = cart[id] ?? 0;
  live.textContent = q > 0 ? `${item.label} : ${q} dans votre commande.` : `${item.label} retiré de votre commande.`;
}

function setQty(id: string, qty: number) {
  const q = Math.max(0, Math.min(MAX, qty));
  if (q > 0) cart[id] = q;
  else delete cart[id];
  save();
  render();
  announce(id);
}

// Boutons + / − d'un article (carte, accueil, et lignes de la commande).
document.addEventListener('click', (event) => {
  const button = (event.target as Element).closest<HTMLButtonElement>('[data-cart-inc], [data-cart-dec]');
  if (!button) return;
  const id = button.closest<HTMLElement>('[data-cart-item]')?.dataset.cartItem;
  if (!id || !byId.has(id)) return;
  setQty(id, (cart[id] ?? 0) + (button.hasAttribute('data-cart-inc') ? 1 : -1));
});

const fab = document.querySelector<HTMLButtonElement>('[data-cart-open]');
const dialog = document.querySelector<HTMLDialogElement>('[data-cart-dialog]');
const list = document.querySelector<HTMLElement>('[data-cart-list]');

function lineElement(id: string, qty: number) {
  const item = byId.get(id)!;
  const li = document.createElement('li');
  li.className = 'cart__line';
  li.dataset.cartItem = id;

  const name = document.createElement('span');
  name.className = 'cart__name';
  name.textContent = item.label;

  const stepper = document.createElement('span');
  stepper.className = 'qty qty--line';
  const dec = document.createElement('button');
  dec.type = 'button';
  dec.className = 'qty__btn';
  dec.setAttribute('data-cart-dec', '');
  dec.setAttribute('aria-label', `Retirer : ${item.label}`);
  dec.innerHTML = MINUS;
  const value = document.createElement('span');
  value.className = 'qty__count';
  value.textContent = String(qty);
  const inc = document.createElement('button');
  inc.type = 'button';
  inc.className = 'qty__btn';
  inc.setAttribute('data-cart-inc', '');
  inc.setAttribute('aria-label', `Ajouter : ${item.label}`);
  inc.innerHTML = PLUS;
  stepper.append(dec, value, inc);

  const price = document.createElement('span');
  price.className = 'cart__price';
  price.textContent = formatPrice(item.price * qty);

  li.append(name, stepper, price);
  return li;
}

function render() {
  const n = count();

  // Compteurs sur la carte.
  document.querySelectorAll<HTMLElement>('.qty[data-cart-item]:not(.qty--line)').forEach((el) => {
    const q = cart[el.dataset.cartItem!] ?? 0;
    el.hidden = false;
    el.classList.toggle('has-items', q > 0);
    const value = el.querySelector('.qty__count');
    if (value) value.textContent = String(q);
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
    list.replaceChildren(...Object.entries(cart).map(([id, q]) => lineElement(id, q)));
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

// Un autre onglet a modifié le panier.
window.addEventListener('storage', (event) => {
  if (event.key === KEY) {
    cart = load();
    render();
  }
});

render();
