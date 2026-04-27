import type { Language, LifecycleModule } from '@/types';
import { i18n } from '@/modules/i18n';
import { qsa } from '@/utils/dom';
import { on } from '@/utils/events';

/**
 * Wires up every `[data-lang-option]` button to the i18n controller. Buttons
 * are marked `is-active` for the currently selected language and respond to
 * keyboard navigation so the control feels like a proper radio group.
 */
export function createLangSwitcherModule(): LifecycleModule {
  let unsubs: Array<() => void> = [];

  function refreshActive(): void {
    for (const option of qsa<HTMLElement>('[data-lang-option]')) {
      const target = option.dataset['langOption'] as Language | undefined;
      const isActive = target === i18n.language;
      option.classList.toggle('is-active', isActive);
      option.setAttribute('aria-checked', String(isActive));
      option.setAttribute('tabindex', isActive ? '0' : '-1');
    }
  }

  return {
    id: 'lang-switcher',
    init() {
      refreshActive();
      for (const option of qsa<HTMLElement>('[data-lang-option]')) {
        const target = option.dataset['langOption'] as Language | undefined;
        if (!target) continue;
        unsubs.push(
          on(option, 'click', () => {
            i18n.set(target);
          }),
        );
        unsubs.push(
          on(option, 'keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              i18n.set(target);
            }
          }),
        );
      }
      unsubs.push(i18n.onChange(refreshActive));
    },
    destroy() {
      unsubs.forEach((u) => u());
      unsubs = [];
    },
  };
}
