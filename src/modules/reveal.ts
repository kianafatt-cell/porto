import type { LifecycleModule } from '@/types';
import { qsa } from '@/utils/dom';

/**
 * Reveal-on-scroll. Adds the `is-revealed` class to any element carrying a
 * `data-reveal` attribute once it enters the viewport. Supports staggered
 * children via `data-reveal-stagger="<ms>"`. No external libraries — just the
 * IntersectionObserver API.
 */
export function createRevealModule(): LifecycleModule {
  let observer: IntersectionObserver | null = null;

  function reveal(target: HTMLElement): void {
    target.classList.add('is-revealed');
    const stagger = Number(target.dataset['revealStagger'] ?? 0);
    if (stagger > 0) {
      const children = qsa<HTMLElement>('[data-reveal-child]', target);
      children.forEach((child, index) => {
        child.style.setProperty('--reveal-delay', `${index * stagger}ms`);
        child.classList.add('is-revealed');
      });
    }
  }

  return {
    id: 'reveal',
    init() {
      const targets = qsa<HTMLElement>('[data-reveal]');
      if (targets.length === 0) return;
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        targets.forEach((t) => reveal(t));
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              reveal(entry.target as HTMLElement);
              observer?.unobserve(entry.target);
            }
          }
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -8% 0px',
        },
      );
      targets.forEach((t) => observer!.observe(t));
    },
    destroy() {
      observer?.disconnect();
      observer = null;
    },
  };
}
