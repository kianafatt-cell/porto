import { html } from '@/utils/dom';
import { iconHtml } from '@/utils/icons';

/**
 * Footer. Small, unobtrusive — a tagline, copyright, and a "back to top"
 * button that springs out once you're far enough down the page.
 */
export function renderFooter(): string {
  const year = new Date().getFullYear();
  return html`
    <footer class="footer">
      <div class="footer__row">
        <p class="footer__brand">
          <span class="footer__brand-mark" aria-hidden="true"></span>
          <span data-i18n="nav_logo">Rijal</span>
        </p>
        <p class="footer__tagline" data-i18n="footer_tagline">Built slowly in Bogor.</p>
      </div>
      <div class="footer__row footer__row--meta">
        <small class="footer__rights">&copy; ${year} Rijal · <span data-i18n="footer_rights">All rights reserved.</span></small>
        <button
          type="button"
          class="footer__back"
          data-back-to-top
          aria-label="Back to top"
        >
          ${iconHtml('arrow-up', 'icon')}
        </button>
      </div>
    </footer>
  `;
}
