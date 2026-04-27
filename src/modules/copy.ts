import type { LifecycleModule } from '@/types';
import { qsa } from '@/utils/dom';
import { on } from '@/utils/events';
import { i18n } from '@/modules/i18n';
import { toast } from '@/modules/toast';

/**
 * Wires up `[data-copy]` buttons. The value can either live on the button
 * itself (`data-copy="+6283834683978"`) or be fetched from a sibling target
 * by selector (`data-copy-target="#wa-number"`). Shows a toast on success.
 */
export function createCopyModule(): LifecycleModule {
  let unsubs: Array<() => void> = [];

  async function writeToClipboard(value: string): Promise<boolean> {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return true;
      }
    } catch {
      // fall through to fallback
    }
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    textarea.remove();
    return ok;
  }

  return {
    id: 'copy',
    init() {
      for (const button of qsa<HTMLButtonElement>('[data-copy]')) {
        unsubs.push(
          on(button, 'click', async () => {
            const value = button.dataset['copy'] ?? '';
            if (!value) return;
            const ok = await writeToClipboard(value);
            if (ok) {
              toast(i18n.t('contact_copy_ok'));
              button.classList.add('is-copied');
              window.setTimeout(() => button.classList.remove('is-copied'), 1200);
            }
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
