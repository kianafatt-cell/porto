import type { LifecycleModule } from '@/types';
import { qsa } from '@/utils/dom';
import { on, throttle } from '@/utils/events';

/**
 * Lightweight scroll parallax. Elements with `data-parallax="<speed>"`
 * translate vertically as the user scrolls. Positive speeds move slower than
 * the scroll (depth), negative speeds move faster (foreground). Disabled
 * when the user prefers reduced motion.
 */
export function createParallaxModule(): LifecycleModule {
  let unsubs: Array<() => void> = [];

  function update(): void {
    const scroll = window.scrollY;
    for (const node of qsa<HTMLElement>('[data-parallax]')) {
      const speed = Number(node.dataset['parallax'] ?? 0.2);
      const offset = (scroll - (node.offsetTop || 0)) * speed;
      node.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`);
    }
  }

  return {
    id: 'parallax',
    init() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const throttled = throttle(update, 16);
      unsubs.push(on(window, 'scroll', throttled, { passive: true }));
      unsubs.push(on(window, 'resize', throttled, { passive: true }));
      update();
    },
    destroy() {
      unsubs.forEach((u) => u());
      unsubs = [];
    },
  };
}
