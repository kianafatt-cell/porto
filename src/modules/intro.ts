import type { LifecycleModule } from '@/types';
import { qs } from '@/utils/dom';

/**
 * Splash / intro. Runs once on page load, fades the cover out after a short
 * hold, then removes itself. Handles reduced motion by skipping the hold.
 */
export function createIntroModule(): LifecycleModule {
  let timeoutHandle: number | null = null;

  return {
    id: 'intro',
    init() {
      const cover = qs<HTMLElement>('[data-intro]');
      if (!cover) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const hold = reduced ? 80 : 900;

      document.body.classList.add('is-loading');
      // Ensure one paint before triggering the fade.
      requestAnimationFrame(() => {
        timeoutHandle = window.setTimeout(() => {
          cover.classList.add('is-hidden');
          document.body.classList.remove('is-loading');
          document.body.classList.add('is-ready');
          timeoutHandle = window.setTimeout(() => {
            cover.remove();
          }, 900);
        }, hold);
      });
    },
    destroy() {
      if (timeoutHandle !== null) window.clearTimeout(timeoutHandle);
    },
  };
}
