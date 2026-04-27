import type { LifecycleModule } from '@/types';
import { qsa } from '@/utils/dom';
import { on } from '@/utils/events';

/**
 * Intercepts clicks on `a[href^="#"]` and delegates to `scrollIntoView`
 * with `behavior: smooth`. Also fixes the perennial anchor-jump issue by
 * offsetting scrolls by the navbar height.
 */
export function createSmoothScrollModule(): LifecycleModule {
  let unsubs: Array<() => void> = [];

  return {
    id: 'smooth-scroll',
    init() {
      for (const link of qsa<HTMLAnchorElement>('a[href^="#"]')) {
        const href = link.getAttribute('href');
        if (!href || href === '#' || href.length < 2) continue;
        unsubs.push(
          on(link, 'click', (event) => {
            const id = href.slice(1);
            const target = document.getElementById(id);
            if (!target) return;
            event.preventDefault();
            const navbarHeight =
              document.querySelector<HTMLElement>('[data-navbar]')?.offsetHeight ?? 64;
            const top =
              target.getBoundingClientRect().top + window.scrollY - navbarHeight + 4;
            window.scrollTo({
              top,
              behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 'auto'
                : 'smooth',
            });
            history.replaceState(null, '', `#${id}`);
          }),
        );
      }
    },
    destroy() {
      unsubs.forEach((u) => u());
      unsubs = [];
    },
  };
}
