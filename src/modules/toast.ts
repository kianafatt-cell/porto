import { el } from '@/utils/dom';

/**
 * Tiny toast helper. A single rolling stack in the bottom-center of the
 * viewport. Toasts auto-dismiss after `duration` ms.
 */

let container: HTMLElement | null = null;

function ensureContainer(): HTMLElement {
  if (container && container.isConnected) return container;
  container = el('div', { class: 'toast-stack', 'aria-live': 'polite' });
  document.body.append(container);
  return container;
}

export function toast(message: string, duration = 1800): void {
  const stack = ensureContainer();
  const node = el('div', { class: 'toast' }, [message]);
  stack.append(node);
  requestAnimationFrame(() => node.classList.add('is-visible'));
  window.setTimeout(() => {
    node.classList.remove('is-visible');
    node.classList.add('is-leaving');
    window.setTimeout(() => node.remove(), 400);
  }, duration);
}
