import type { LifecycleModule } from '@/types';
import { isTouchDevice } from '@/modules/motion';
import { el, qsa } from '@/utils/dom';
import { scheduler } from '@/utils/rafScheduler';

/**
 * A smooth custom cursor that only activates on fine-pointer devices. On
 * touch phones it's a no-op — we preserve the system cursor (well,
 * lack thereof) for better UX.
 *
 * Architecture:
 * - One big `ring` follows the mouse with easing for a liquid feel.
 * - A tiny `dot` tracks the mouse exactly so precision clicks are honest.
 * - Elements with `[data-cursor="hover"]` expand the ring on hover.
 */
export function createCursorModule(): LifecycleModule {
  let unregister: (() => void) | null = null;
  let ring: HTMLElement | null = null;
  let dot: HTMLElement | null = null;
  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;
  let visible = false;

  return {
    id: 'cursor',
    init() {
      if (isTouchDevice()) return;
      ring = el('div', { class: 'cursor', 'aria-hidden': 'true' });
      dot = el('div', { class: 'cursor__dot', 'aria-hidden': 'true' });
      document.body.append(ring, dot);

      const onMove = (event: MouseEvent): void => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        if (!visible) {
          visible = true;
          ring!.classList.add('is-visible');
          dot!.classList.add('is-visible');
          ringX = mouseX;
          ringY = mouseY;
        }
        dot!.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      };
      const onLeave = (): void => {
        visible = false;
        ring!.classList.remove('is-visible');
        dot!.classList.remove('is-visible');
      };
      const onDown = () => ring!.classList.add('is-pressed');
      const onUp = () => ring!.classList.remove('is-pressed');

      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('mouseleave', onLeave);
      window.addEventListener('mousedown', onDown);
      window.addEventListener('mouseup', onUp);

      // Hover targets
      const hoverCleanups: Array<() => void> = [];
      const wireHover = (): void => {
        for (const node of qsa<HTMLElement>(
          'a, button, [role="button"], [data-cursor="hover"]',
        )) {
          const enter = () => ring!.classList.add('is-hover');
          const leave = () => ring!.classList.remove('is-hover');
          node.addEventListener('mouseenter', enter);
          node.addEventListener('mouseleave', leave);
          hoverCleanups.push(() => {
            node.removeEventListener('mouseenter', enter);
            node.removeEventListener('mouseleave', leave);
          });
        }
      };
      wireHover();
      const wireObserver = new MutationObserver(() => {
        // Re-wire when DOM changes (e.g. i18n re-render). Cleanups stay live.
        wireHover();
      });
      wireObserver.observe(document.body, { childList: true, subtree: true });

      const tick = scheduler.add((dt) => {
        const ease = 1 - Math.pow(0.0001, dt);
        ringX += (mouseX - ringX) * ease;
        ringY += (mouseY - ringY) * ease;
        if (ring) {
          ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        }
      });

      unregister = () => {
        tick();
        wireObserver.disconnect();
        hoverCleanups.forEach((cleanup) => cleanup());
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseleave', onLeave);
        window.removeEventListener('mousedown', onDown);
        window.removeEventListener('mouseup', onUp);
        ring?.remove();
        dot?.remove();
      };
    },
    destroy() {
      unregister?.();
      unregister = null;
    },
  };
}
