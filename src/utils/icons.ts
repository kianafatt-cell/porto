/**
 * Tiny inline-SVG icon set. Replaces Font Awesome — no external CSS, no
 * web-font, only the glyphs we actually need. All icons render at 1em and
 * inherit `currentColor`.
 */

type IconKey =
  | 'play'
  | 'pause'
  | 'prev'
  | 'next'
  | 'volume'
  | 'mute'
  | 'pin'
  | 'whatsapp'
  | 'instagram'
  | 'github'
  | 'mail'
  | 'arrow-right'
  | 'arrow-down'
  | 'arrow-up'
  | 'external'
  | 'sparkle'
  | 'seed'
  | 'map'
  | 'book'
  | 'cap'
  | 'mountain'
  | 'copy'
  | 'check'
  | 'menu'
  | 'close'
  | 'sun'
  | 'moon'
  | 'heart'
  | 'user'
  | 'globe'
  | 'compass';

const ICONS: Record<IconKey, string> = {
  play: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.29-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" fill="currentColor"/></svg>`,
  pause: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/></svg>`,
  prev: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h2v14H6zM20 5.14v13.72a1 1 0 0 1-1.54.84L8.17 12.84a1 1 0 0 1 0-1.68L18.46 4.3A1 1 0 0 1 20 5.14Z" fill="currentColor"/></svg>`,
  next: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 5h2v14h-2zM4 5.14v13.72a1 1 0 0 0 1.54.84l10.29-6.86a1 1 0 0 0 0-1.68L5.54 4.3A1 1 0 0 0 4 5.14Z" fill="currentColor"/></svg>`,
  volume: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Zm12.5 3a4 4 0 0 0-2.5-3.7v7.4a4 4 0 0 0 2.5-3.7Zm-2.5-7v2.1a6 6 0 0 1 0 9.8V19a8 8 0 0 0 0-14Z" fill="currentColor"/></svg>`,
  mute: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Zm15.59-.41L21 10l-2.29 2.3L21 14.59l-1.41 1.41L17.3 13.7 15 16l-1.41-1.41L15.89 12.3 13.59 10 15 8.59l2.3 2.3Z" fill="currentColor"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" fill="currentColor"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.53A10 10 0 1 0 12.04 2Zm5.96 14.32c-.25.7-1.48 1.35-2.04 1.43-.52.08-1.19.11-1.92-.12a17.68 17.68 0 0 1-1.75-.65c-3.08-1.33-5.1-4.44-5.26-4.65-.15-.2-1.25-1.66-1.25-3.17 0-1.5.78-2.25 1.06-2.55.28-.31.61-.39.81-.39h.58c.18 0 .43-.07.67.51.25.58.86 2 .93 2.15.08.15.12.32.03.51-.09.2-.14.32-.27.5-.14.17-.29.39-.41.52-.14.15-.29.32-.13.62.16.31.7 1.16 1.52 1.88 1.04.93 1.92 1.22 2.24 1.36.32.14.51.12.7-.08.2-.21.79-.92 1-1.24.2-.32.41-.27.7-.16.29.11 1.83.87 2.14 1.03.31.15.52.23.6.36.07.13.07.75-.18 1.45Z" fill="currentColor"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.22.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.22-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.05-.41-2.22-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.36 2.22-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.98c-3.14 0-3.51.01-4.75.07-1 .05-1.54.21-1.9.35-.48.18-.82.4-1.18.76-.36.36-.58.7-.76 1.18-.14.36-.3.9-.35 1.9-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.05 1 .21 1.54.35 1.9.18.48.4.82.76 1.18.36.36.7.58 1.18.76.36.14.9.3 1.9.35 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c1-.05 1.54-.21 1.9-.35.48-.18.82-.4 1.18-.76.36-.36.58-.7.76-1.18.14-.36.3-.9.35-1.9.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.05-1-.21-1.54-.35-1.9a3.17 3.17 0 0 0-.76-1.18 3.17 3.17 0 0 0-1.18-.76c-.36-.14-.9-.3-1.9-.35-1.24-.06-1.61-.07-4.75-.07Zm0 3.37a4.45 4.45 0 1 1 0 8.9 4.45 4.45 0 0 1 0-8.9Zm0 1.98a2.47 2.47 0 1 0 0 4.94 2.47 2.47 0 0 0 0-4.94Zm5.66-2.2a1.04 1.04 0 1 1 0 2.08 1.04 1.04 0 0 1 0-2.08Z" fill="currentColor"/></svg>`,
  github: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.91c.58.1.79-.25.79-.56v-2.1c-3.2.7-3.88-1.37-3.88-1.37-.52-1.32-1.28-1.67-1.28-1.67-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.74.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.73.8 1.18 1.82 1.18 3.08 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" fill="currentColor"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1Zm1 2.3v8.7h14V8.3l-7 5.2-7-5.2ZM18.8 7H5.2l6.8 5 6.8-5Z" fill="currentColor"/></svg>`,
  'arrow-right': `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.3 4.3 11.9 5.7l5.3 5.3H3v2h14.2l-5.3 5.3 1.4 1.4 7.7-7.7z" fill="currentColor"/></svg>`,
  'arrow-down': `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v14.2l5.3-5.3 1.4 1.4-7.7 7.7-7.7-7.7 1.4-1.4 5.3 5.3V3h2z" fill="currentColor"/></svg>`,
  'arrow-up': `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21V6.8l5.3 5.3 1.4-1.4L11 3l-7.7 7.7 1.4 1.4L10 6.8V21h2z" fill="currentColor"/></svg>`,
  external: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3ZM5 5h6v2H5v12h12v-6h2v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1Z" fill="currentColor"/></svg>`,
  sparkle: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 14 8l6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" fill="currentColor"/></svg>`,
  seed: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c-4 0-7 3-7 7 0 5 4 10 7 13 3-3 7-8 7-13 0-4-3-7-7-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" fill="currentColor"/></svg>`,
  map: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2Zm0 2.3 6 2v13.4l-6-2V5.3Z" fill="currentColor"/></svg>`,
  book: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h7a4 4 0 0 1 4 4v12a4 4 0 0 0-4-4H3V4Zm18 0v12h-7a4 4 0 0 0-4 4V8a4 4 0 0 1 4-4h7Z" fill="currentColor"/></svg>`,
  cap: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 8l11 5 9-4.1V17h2V8L12 3Zm0 7-7 3v4c0 1.1 3.1 3 7 3s7-1.9 7-3v-4l-7-3Z" fill="currentColor"/></svg>`,
  mountain: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6 8 14H2l6-10 3 5 3-9Z" fill="currentColor"/></svg>`,
  copy: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 2H4a2 2 0 0 0-2 2v12h2V4h12V2Zm4 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm0 16H8V8h12v14Z" fill="currentColor"/></svg>`,
  check: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 16.2-4.2-4.2-1.4 1.4L9 19l12-12-1.4-1.4L9 16.2Z" fill="currentColor"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" fill="currentColor"/></svg>`,
  close: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4l-6.3 6.3-1.4-1.4L9.2 12 2.9 5.7l1.4-1.4 6.3 6.3 6.3-6.3 1.4 1.4Z" fill="currentColor"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4V1h0v3h0Zm0 19v-3h0v3h0ZM4 12H1v0h3v0Zm19 0h-3v0h3v0ZM5.6 5.6 3.5 3.5l1.4-1.4L7 4.2 5.6 5.6Zm13.4 13.4 2.1 2.1-1.4 1.4L17.7 20 19 19Zm0-13.4L20.5 3.5l1.4 1.4L19 7 17.7 5.6l1.3-1Zm-13.4 13.4 1.4 1.4-2.1 2.1-1.4-1.4 2.1-2.1ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" fill="currentColor"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.3A8 8 0 0 1 8.7 4a9 9 0 1 0 11.3 11.3Z" fill="currentColor"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-8-5-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-8 11-8 11h-2Z" fill="currentColor"/></svg>`,
  user: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.4 0-8 2.7-8 6v2h16v-2c0-3.3-3.6-6-8-6Z" fill="currentColor"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7 8h-3a15 15 0 0 0-1.4-5.1A8 8 0 0 1 19 10ZM9.4 4.9A13 13 0 0 0 8 10H4a8 8 0 0 1 5.4-5.1ZM4 14h4a13 13 0 0 0 1.4 5.1A8 8 0 0 1 4 14Zm10.6 5.1A13 13 0 0 0 16 14h4a8 8 0 0 1-5.4 5.1ZM10 14h4a11 11 0 0 1-1.3 4.6A11 11 0 0 1 10 14Zm0-4a11 11 0 0 1 1.3-4.6A11 11 0 0 1 14 10h-4Z" fill="currentColor"/></svg>`,
  compass: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.2 5.8L13 14l-6.2 2.2L9 10l7.2-2.2Z" fill="currentColor"/></svg>`,
};

/** Return the raw SVG markup for an icon. */
export function iconHtml(name: IconKey, className = 'icon'): string {
  const svg = ICONS[name];
  return svg.replace(
    '<svg ',
    `<svg class="${className}" width="1em" height="1em" `,
  );
}

export type { IconKey };
