import type { LifecycleModule } from '@/types';
import { qs, qsa } from '@/utils/dom';
import { on } from '@/utils/events';

/**
 * Mobile sheet menu. Triggered by the hamburger button, closes when any of:
 * - A nav link is tapped
 * - The close button is pressed
 * - `Escape` is pressed
 * - The backdrop is clicked
 *
 * While open, body scroll is locked using a `data-scroll-lock` flag so the
 * sheet feels like a native drawer.
 */
export function createMenuModule(): LifecycleModule {
  let unsubs: Array<() => void> = [];
  let open = false;

  function setOpen(state: boolean): void {
    const sheet = qs<HTMLElement>('[data-menu-sheet]');
    const toggle = qs<HTMLButtonElement>('[data-menu-toggle]');
    if (!sheet || !toggle) return;
    open = state;
    sheet.classList.toggle('is-open', state);
    toggle.classList.toggle('is-open', state);
    toggle.setAttribute('aria-expanded', String(state));
    sheet.setAttribute('aria-hidden', String(!state));
    document.body.toggleAttribute('data-scroll-lock', state);
  }

  return {
    id: 'menu',
    init() {
      const toggle = qs<HTMLButtonElement>('[data-menu-toggle]');
      const sheet = qs<HTMLElement>('[data-menu-sheet]');
      if (!toggle || !sheet) return;

      unsubs.push(on(toggle, 'click', () => setOpen(!open)));
      const close = qs<HTMLButtonElement>('[data-menu-close]');
      if (close) unsubs.push(on(close, 'click', () => setOpen(false)));
      const backdrop = qs<HTMLElement>('[data-menu-backdrop]');
      if (backdrop) unsubs.push(on(backdrop, 'click', () => setOpen(false)));

      for (const link of qsa<HTMLAnchorElement>('[data-menu-sheet] a[href^="#"]')) {
        unsubs.push(on(link, 'click', () => setOpen(false)));
      }
      unsubs.push(
        on(document, 'keydown', (event) => {
          if (event.key === 'Escape' && open) setOpen(false);
        }),
      );
    },
    destroy() {
      unsubs.forEach((u) => u());
      unsubs = [];
    },
  };
}
