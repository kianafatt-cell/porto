/** Small formatting helpers used across the UI. */

/** Format seconds as `m:ss` / `mm:ss`. Returns `0:00` for NaN / negative. */
export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/** Pretty-print a year range `2024 – current` in either language. */
export function formatYearRange(start: number, end: number | 'now', lang: 'id' | 'en'): string {
  const endLabel = end === 'now' ? (lang === 'id' ? 'sekarang' : 'now') : String(end);
  return `${start} – ${endLabel}`;
}

/** Capitalise first letter. */
export function capitalize(value: string): string {
  if (!value) return value;
  return value[0]!.toUpperCase() + value.slice(1);
}

/** Render a comma-joined list with a localised "and". */
export function joinList(items: readonly string[], lang: 'id' | 'en'): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0] ?? '';
  const last = items[items.length - 1];
  const head = items.slice(0, -1).join(', ');
  const and = lang === 'id' ? 'dan' : 'and';
  return `${head} ${and} ${last}`;
}

/** Convert a phone number like `+6283834683978` into a WA deep-link. */
export function waLink(phone: string, message?: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  const base = `https://wa.me/${digits}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
