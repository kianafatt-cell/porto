import type { LifecycleModule } from '@/types';
import { isTouchDevice } from '@/modules/motion';
import { on } from '@/utils/events';

/**
 * An ambient glow that subtly follows the cursor. Driven by two CSS custom
 * properties (`--glow-x` / `--glow-y`) on `<body>`, so any element with the
 * `ambient-glow` background picks it up for free.
 */
export function createAmbientModule(): LifecycleModule {
  let unsubs: Array<() => void> = [];

  return {
    id: 'ambient',
    init() {
      if (isTouchDevice()) return;
      const style = document.body.style;
      const onMove = (event: MouseEvent): void => {
        const x = (event.clientX / window.innerWidth) * 100;
        const y = (event.clientY / window.innerHeight) * 100;
        style.setProperty('--glow-x', `${x.toFixed(2)}%`);
        style.setProperty('--glow-y', `${y.toFixed(2)}%`);
      };
      unsubs.push(on(window, 'mousemove', onMove, { passive: true }));
    },
    destroy() {
      unsubs.forEach((u) => u());
      unsubs = [];
    },
  };
}
