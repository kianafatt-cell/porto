import { SOCIALS } from '@/data/socials';
import { html, escapeHtml } from '@/utils/dom';
import { iconHtml, type IconKey } from '@/utils/icons';

const ICON_BY_SOCIAL: Record<string, IconKey> = {
  whatsapp: 'whatsapp',
  instagram: 'instagram',
  pin: 'pin',
};

/**
 * Contact section. Surfaces the three primary channels (WA, IG, location),
 * with a copy-to-clipboard button next to each. On mobile the channels
 * stack vertically with generous tap-targets.
 */
export function renderContact(): string {
  const items = SOCIALS.map((social) => {
    const iconKey = ICON_BY_SOCIAL[social.icon] ?? 'external';
    const copyable = social.id !== 'location';
    return html`
      <li class="contact-item" data-reveal-child>
        <a
          class="contact-item__primary"
          href="${escapeHtml(social.url)}"
          target="_blank"
          rel="noopener noreferrer"
          data-magnetic
          data-cursor="hover"
        >
          <span class="contact-item__icon">${iconHtml(iconKey, 'icon')}</span>
          <div class="contact-item__text">
            <span class="contact-item__label">${escapeHtml(social.label)}</span>
            <span class="contact-item__value">${escapeHtml(social.display)}</span>
          </div>
          <span class="contact-item__arrow" aria-hidden="true">${iconHtml('arrow-right', 'icon')}</span>
        </a>
        ${copyable
          ? html`<button
              type="button"
              class="contact-item__copy"
              data-copy="${escapeHtml(social.handle)}"
              aria-label="Copy ${escapeHtml(social.label)}"
            >
              ${iconHtml('copy', 'icon contact-item__copy-icon contact-item__copy-icon--idle')}
              ${iconHtml('check', 'icon contact-item__copy-icon contact-item__copy-icon--ok')}
            </button>`
          : ''}
      </li>
    `;
  }).join('');

  return html`
    <section class="contact" id="contact">
      <header class="section-header" data-reveal>
        <span class="section-header__label" data-i18n="contact_label">Get in touch</span>
        <h2 class="section-header__title">
          <span data-i18n="contact_title">Contact</span>
          <span class="section-header__accent" data-i18n="contact_accent"> me</span>
        </h2>
        <span class="section-header__rule" aria-hidden="true"></span>
      </header>

      <div class="contact__grid" data-reveal data-reveal-stagger="120">
        <div class="contact__intro" data-reveal-child>
          <h3 class="contact__heading">
            <span data-i18n="contact_connect_heading">Let&rsquo;s</span>
            <span class="contact__heading-accent" data-i18n="contact_connect_accent"> connect</span>
          </h3>
          <p class="contact__desc" data-i18n="contact_desc">
            Embracing the journey, one step at a time. Reach out on WhatsApp or
            Instagram — I&rsquo;d love to connect and share ideas.
          </p>
        </div>

        <ul class="contact__list">
          ${items}
        </ul>
      </div>
    </section>
  `;
}
