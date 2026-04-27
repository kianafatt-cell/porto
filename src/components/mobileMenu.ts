import { html } from '@/utils/dom';
import { iconHtml } from '@/utils/icons';

/**
 * Full-screen off-canvas menu. Renders its own language switcher so the
 * control is reachable with one thumb while the sheet is open.
 */
export function renderMobileMenu(): string {
  return html`
    <div class="menu-backdrop" data-menu-backdrop aria-hidden="true"></div>
    <aside
      class="menu-sheet"
      id="mobile-menu"
      data-menu-sheet
      aria-hidden="true"
      aria-label="Mobile navigation"
    >
      <div class="menu-sheet__head">
        <span class="menu-sheet__brand" data-i18n="nav_logo">Rijal</span>
        <button
          type="button"
          class="menu-sheet__close"
          data-menu-close
          aria-label="Close menu"
        >
          ${iconHtml('close', 'icon')}
        </button>
      </div>

      <nav class="menu-sheet__nav" aria-label="Mobile primary">
        <ul class="menu-sheet__list">
          <li style="--menu-delay:60ms">
            <a href="#home" data-i18n="nav_home">Home</a>
            ${iconHtml('arrow-right', 'icon menu-sheet__chev')}
          </li>
          <li style="--menu-delay:120ms">
            <a href="#about" data-i18n="nav_about">About</a>
            ${iconHtml('arrow-right', 'icon menu-sheet__chev')}
          </li>
          <li style="--menu-delay:180ms">
            <a href="#music" data-i18n="nav_music">Music</a>
            ${iconHtml('arrow-right', 'icon menu-sheet__chev')}
          </li>
          <li style="--menu-delay:240ms">
            <a href="#projects" data-i18n="nav_projects">Projects</a>
            ${iconHtml('arrow-right', 'icon menu-sheet__chev')}
          </li>
          <li style="--menu-delay:300ms">
            <a href="#contact" data-i18n="nav_contact">Contact</a>
            ${iconHtml('arrow-right', 'icon menu-sheet__chev')}
          </li>
        </ul>
      </nav>

      <div class="menu-sheet__footer">
        <div class="lang-switch menu-sheet__lang" role="radiogroup" aria-label="Language">
          <button type="button" class="lang-switch__option" data-lang-option="id" role="radio" aria-checked="false">ID</button>
          <button type="button" class="lang-switch__option" data-lang-option="en" role="radio" aria-checked="false">EN</button>
          <span class="lang-switch__thumb" aria-hidden="true"></span>
        </div>
        <p class="menu-sheet__signoff" data-i18n="footer_tagline">Built slowly in Bogor.</p>
      </div>
    </aside>
  `;
}
