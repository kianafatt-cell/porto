import type { LifecycleModule } from '@/types';
import { qsa } from '@/utils/dom';

/**
 * Fades in images once they finish loading. Pair with `loading="lazy"` on
 * the `<img>` itself — this module only handles the presentation.
 */
export function createLazyImageModule(): LifecycleModule {
  return {
    id: 'lazy-image',
    init() {
      for (const img of qsa<HTMLImageElement>('img[data-fade]')) {
        if (img.complete && img.naturalWidth > 0) {
          img.classList.add('is-loaded');
          continue;
        }
        const done = () => {
          img.classList.add('is-loaded');
          img.removeEventListener('load', done);
          img.removeEventListener('error', done);
        };
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
      }
    },
  };
}
