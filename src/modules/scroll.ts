import type { LifecycleModule } from '@/types';
import { qs, qsa } from '@/utils/dom';
import { throttle, on } from '@/utils/events';

/**
 * Keeps three global concerns in sync while the user scrolls:
 *
 * 1. A top-of-page progress bar that fills based on total scroll progress.
 * 2. The navbar's `is-scrolled` modifier.
 * 3. Active-link highlighting for the nav anchors that match the current
 *    section.
 *
 * The handler is throttled to 50ms to keep things snappy on low-end phones.
 */
export function createScrollModule(): LifecycleModule {
  let unsubs: Array<() => void> = [];

  function update(): void {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const maxScroll = (doc.scrollHeight - window.innerHeight) || 1;
    const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);

    const bar = qs<HTMLElement>('[data-scroll-progress]');
    if (bar) bar.style.setProperty('--progress', progress.toFixed(4));

    const navbar = qs<HTMLElement>('[data-navbar]');
    if (navbar) navbar.classList.toggle('is-scrolled', scrollTop > 20);

    const sections = qsa<HTMLElement>('main section[id]');
    let activeId: string | null = null;
    const triggerLine = scrollTop + window.innerHeight * 0.35;
    for (const section of sections) {
      if (section.offsetTop <= triggerLine) activeId = section.id;
    }
    for (const link of qsa<HTMLElement>('[data-nav-link]')) {
      const href = link.getAttribute('href') ?? '';
      const id = href.replace(/^#/, '');
      link.classList.toggle('is-active', id === activeId);
    }

    document.documentElement.style.setProperty(
      '--page-progress',
      progress.toFixed(4),
    );
  }

  return {
    id: 'scroll',
    init() {
      const throttled = throttle(update, 50);
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
