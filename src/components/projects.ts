import { PROJECTS } from '@/data/projects';
import { html, escapeHtml } from '@/utils/dom';
import { iconHtml } from '@/utils/icons';

/**
 * Projects section. Each project card shows a cover, category chip,
 * description, optional domain-migration panel, and a "visit" CTA that
 * opens the new domain in a new tab.
 *
 * Translations for descriptions are embedded directly as two
 * `data-i18n-alt` attributes (one for each language), then resolved at
 * runtime based on the active language.
 */
export function renderProjects(): string {
  const cards = PROJECTS.map((project, index) => {
    const migrated = project.migrated
      ? html`
          <div class="project-card__migration">
            <span class="project-card__migration-tag">
              ${iconHtml('external', 'icon')}
              <span data-i18n="projects_migrated">Domain migrated</span>
            </span>
            <div class="project-card__migration-rows">
              <div class="project-card__migration-row">
                <span class="project-card__migration-label" data-i18n="project_domain_old">Old</span>
                <span class="project-card__migration-url project-card__migration-url--old">${escapeHtml(project.migrated.from)}</span>
              </div>
              <div class="project-card__migration-arrow" aria-hidden="true">
                ${iconHtml('arrow-down', 'icon')}
              </div>
              <div class="project-card__migration-row">
                <span class="project-card__migration-label project-card__migration-label--new" data-i18n="project_domain_new">New</span>
                <span class="project-card__migration-url project-card__migration-url--new">${escapeHtml(project.migrated.to)}</span>
              </div>
            </div>
          </div>
        `
      : '';

    return html`
      <article
        class="project-card"
        data-reveal-child
        data-tilt
        data-tilt-max="5"
        style="--card-delay:${index * 100}ms"
      >
        <div class="project-card__media">
          <img
            src="${escapeHtml(project.image)}"
            alt="${escapeHtml(project.title)} preview"
            loading="lazy"
            decoding="async"
            data-fade
            onerror="this.onerror=null;this.src='https://via.placeholder.com/900x560/1e1840/c084fc?text=${escapeHtml(project.title)}';"
          />
          <span class="project-card__sheen" aria-hidden="true"></span>
        </div>
        <div class="project-card__body">
          <span class="project-card__category">
            <span data-i18n="projects_label">Things I built</span>
            <span aria-hidden="true">·</span>
            <span>${escapeHtml(project.tags[0] ?? 'web')}</span>
          </span>
          <h3 class="project-card__title">${escapeHtml(project.title)}</h3>
          <p class="project-card__desc" data-project-desc="${escapeHtml(project.id)}">${escapeHtml(project.description.en)}</p>
          ${migrated}
          <a
            class="btn btn--outline project-card__cta"
            href="${escapeHtml(project.url)}"
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            data-cursor="hover"
          >
            <span data-i18n="project_visit_new">Visit new domain</span>
            ${iconHtml('external', 'icon btn__icon')}
          </a>
        </div>
      </article>
    `;
  }).join('');

  return html`
    <section class="projects" id="projects">
      <header class="section-header" data-reveal>
        <span class="section-header__label" data-i18n="projects_label">Things I built</span>
        <h2 class="section-header__title">
          <span data-i18n="projects_title">My</span>
          <span class="section-header__accent" data-i18n="projects_accent"> projects</span>
        </h2>
        <span class="section-header__rule" aria-hidden="true"></span>
      </header>

      <div class="projects__grid" data-reveal data-reveal-stagger="120">
        ${cards}
      </div>
    </section>
  `;
}
