// Horaires en direct (heure de Paris) : statut « ouvert / fermé » par boutique et pour l'ensemble.
import { shops, weekOf, type Slot } from '../data/site';

type Week = readonly (readonly Slot[])[]; // index 0 = dimanche
type Now = { day: number; minutes: number };

const DAYS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const WEEKDAY: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

const toMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};
const fmt = (t: string) => t.replace(':', 'h');

export function parisNow(date = new Date()): Now {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Paris',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return { day: WEEKDAY[get('weekday')], minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

// Créneau en cours, ou null.
const openSlot = (week: Week, now: Now) =>
  week[now.day].find(([s, e]) => now.minutes >= toMinutes(s) && now.minutes < toMinutes(e)) ?? null;

// Prochaine ouverture : dans combien de jours, à quelle heure, et l'écart en minutes pour comparer.
function nextOpening(week: Week, now: Now) {
  for (let i = 0; i <= 7; i++) {
    const day = (now.day + i) % 7;
    const slot = week[day].find(([s]) => i > 0 || toMinutes(s) > now.minutes);
    if (slot) return { inDays: i, day, time: slot[0], delta: i * 1440 + toMinutes(slot[0]) - now.minutes };
  }
  return null;
}

const whenText = (next: NonNullable<ReturnType<typeof nextOpening>>) =>
  next.inDays === 0 ? `à ${fmt(next.time)}` : `${next.inDays === 1 ? 'demain' : DAYS[next.day]} à ${fmt(next.time)}`;

export function shopStatus(week: Week, now: Now) {
  const slot = openSlot(week, now);
  if (slot) return { open: true, text: `Ouvert · jusqu’à ${fmt(slot[1])}` };
  const next = nextOpening(week, now);
  return { open: false, text: next ? `Fermé · ouvre ${whenText(next)}` : 'Fermé' };
}

export function overallStatus(weeks: Week[], now: Now) {
  const open = weeks.filter((w) => openSlot(w, now)).length;
  if (open > 0 && open === weeks.length) return { open: true, text: `Ouvert · les ${open} boutiques` };
  if (open > 0) return { open: true, text: `Ouvert · ${open} boutique${open > 1 ? 's' : ''} sur ${weeks.length}` };
  const next = weeks
    .map((w) => nextOpening(w, now))
    .filter((n) => n !== null)
    .sort((a, b) => a.delta - b.delta)[0];
  return { open: false, text: next ? `Fermé · ouvre ${whenText(next)}` : 'Fermé' };
}

// Remplit les éléments marqués dans la page ; sans JS, ils restent masqués.
const now = parisNow();
const weeks = new Map(shops.filter((s) => !s.closed).map((s) => [s.id, weekOf(s.hours)]));
const closed = new Set(shops.filter((s) => s.closed).map((s) => s.id));

document.querySelectorAll<HTMLElement>('[data-open-status]').forEach((el) => {
  const id = el.dataset.shop;
  const week = id ? weeks.get(id) : undefined;
  const current =
    id && closed.has(id)
      ? { open: false, text: 'Fermée temporairement' }
      : week
        ? shopStatus(week, now)
        : overallStatus([...weeks.values()], now);
  el.classList.toggle('is-open', current.open);
  const text = el.querySelector('[data-open-status-text]');
  if (text) text.textContent = current.text;
  el.hidden = false;
});

document.querySelectorAll<HTMLElement>('[data-days]').forEach((el) => {
  const days = el.dataset.days!.split(',').map(Number);
  if (days.includes(now.day)) {
    el.classList.add('is-today');
    el.setAttribute('aria-current', 'date');
  }
});
