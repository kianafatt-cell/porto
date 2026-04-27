import type { LifecycleModule } from '@/types';
import { isTouchDevice } from '@/modules/motion';
import { qsa } from '@/utils/dom';

/**
 * 3D tilt effect for cards marked `data-tilt`. The tilt is subtle (max 6deg)
 * and fades out smoothly on mouse leave. Each card tracks the cursor over
 * its own bounding rect so many cards can run in parallel.
 */
export function createTiltModule(): LifecycleModule {
  const cleanups: Array<() => void> = [];

  return {
    id: 'tilt',
    init() {
      if (isTouchDevice()) return;
      for (const card of qsa<HTMLElement>('[data-tilt]')) {
        const maxDeg = Number(card.dataset['tiltMax'] ?? 6);
        const onMove = (event: MouseEvent): void => {
          const rect = card.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width;
          const py = (event.clientY - rect.top) / rect.height;
          const ry = (px - 0.5) * maxDeg * 2;
          const rx = (0.5 - py) * maxDeg * 2;
          card.style.setProperty('--tilt-rx', `${rx.toFixed(2)}deg`);
          card.style.setProperty('--tilt-ry', `${ry.toFixed(2)}deg`);
          card.style.setProperty('--tilt-sheen-x', `${(px * 100).toFixed(1)}%`);
          card.style.setProperty('--tilt-sheen-y', `${(py * 100).toFixed(1)}%`);
        };
        const onLeave = (): void => {
          card.style.setProperty('--tilt-rx', '0deg');
          card.style.setProperty('--tilt-ry', '0deg');
        };
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          card.removeEventListener('mousemove', onMove);
          card.removeEventListener('mouseleave', onLeave);
        });
      }
    },
    destroy() {
      cleanups.forEach((cleanup) => cleanup());
      cleanups.length = 0;
    },
  };
}
