import type { LifecycleModule } from '@/types';
import { PROJECTS } from '@/data/projects';
import { i18n } from '@/modules/i18n';
import { qsa } from '@/utils/dom';

/**
 * Binds project descriptions to the active language. Descriptions live on
 * the `Project` entity (not in the i18n bundle) because they're long-form
 * prose and pair 1:1 with a project. This module closes the loop.
 */
export function createProjectI18nModule(): LifecycleModule {
  let unsubscribe: (() => void) | null = null;

  function apply(): void {
    const lang = i18n.language;
    for (const node of qsa<HTMLElement>('[data-project-desc]')) {
      const id = node.dataset['projectDesc'];
      if (!id) continue;
      const project = PROJECTS.find((p) => p.id === id);
      if (!project) continue;
      node.textContent = project.description[lang];
    }
  }

  return {
    id: 'project-i18n',
    init() {
      apply();
      unsubscribe = i18n.onChange(apply);
    },
    destroy() {
      unsubscribe?.();
    },
  };
}
