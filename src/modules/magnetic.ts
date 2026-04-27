import type { LifecycleModule } from '@/types';
import { isTouchDevice } from '@/modules/motion';
import { qsa } from '@/utils/dom';
import { clamp } from '@/utils/math';

/**
 * Applies a subtle "magnetic" cursor attraction to elements marked with
 * `data-magnetic`. Disabled on touch devices (no pointer to attract). The
 * effect is a plain transform — no libraries, no layout thrash.
 */
export function createMagneticModule(): LifecycleModule {
  const cleanups: Array<() => void> = [];

  return {
    id: 'magnetic',
    init() {
      if (isTouchDevice()) return;
      const maxOffset = 12;
      for (const node of qsa<HTMLElement>('[data-magnetic]')) {
        const onMove = (event: MouseEvent): void => {
          const rect = node.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dx = event.clientX - centerX;
          const dy = event.clientY - centerY;
          const x = clamp(dx * 0.25, -maxOffset, maxOffset);
          const y = clamp(dy * 0.25, -maxOffset, maxOffset);
          node.style.setProperty('--mx', `${x.toFixed(2)}px`);
          node.style.setProperty('--my', `${y.toFixed(2)}px`);
        };
        const onLeave = (): void => {
          node.style.setProperty('--mx', '0px');
          node.style.setProperty('--my', '0px');
        };
        node.addEventListener('mousemove', onMove);
        node.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          node.removeEventListener('mousemove', onMove);
          node.removeEventListener('mouseleave', onLeave);
        });
      }
    },
    destroy() {
      cleanups.forEach((cleanup) => cleanup());
      cleanups.length = 0;
    },
  };
}
