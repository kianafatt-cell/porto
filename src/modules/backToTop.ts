import type { LifecycleModule } from '@/types';
import { qs } from '@/utils/dom';
import { on, throttle } from '@/utils/events';

/**
 * Reveals the floating "back to top" button once the user scrolls past ~2
 * viewport heights. Clicking it scrolls smoothly to the top.
 */
export function createBackToTopModule(): LifecycleModule {
  let unsubs: Array<() => void> = [];

  return {
    id: 'back-to-top',
    init() {
      const button = qs<HTMLButtonElement>('[data-back-to-top]');
      if (!button) return;

      const update = () => {
        const threshold = window.innerHeight * 1.5;
        button.classList.toggle('is-visible', window.scrollY > threshold);
      };
      const throttled = throttle(update, 80);
      unsubs.push(on(window, 'scroll', throttled, { passive: true }));
      update();

      unsubs.push(
        on(button, 'click', () => {
          const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
        }),
      );
    },
    destroy() {
      unsubs.forEach((u) => u());
      unsubs = [];
    },
  };
}
