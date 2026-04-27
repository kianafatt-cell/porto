import { html } from '@/utils/dom';
import { PROFILE } from '@/data/profile';
import { iconHtml } from '@/utils/icons';

/**
 * About section. A two-column grid on desktop (portrait → copy), collapsing
 * to a single column on mobile with the portrait floating above the text.
 */
export function renderAbout(): string {
  return html`
    <section class="about" id="about">
      <header class="section-header" data-reveal>
        <span class="section-header__label" data-i18n="about_label">Get to know</span>
        <h2 class="section-header__title">
          <span data-i18n="about_title">About</span>
          <span class="section-header__accent" data-i18n="about_accent"> me</span>
        </h2>
        <span class="section-header__rule" aria-hidden="true"></span>
      </header>

      <div class="about__grid" data-reveal data-reveal-stagger="90">
        <div class="about__portrait" data-reveal-child>
          <div class="about__portrait-frame" data-tilt data-tilt-max="5">
            <img
              src="${PROFILE.avatar}"
              alt="Portrait of ${PROFILE.fullName}"
              loading="eager"
              decoding="async"
              data-fade
              onerror="this.onerror=null;this.src='${PROFILE.avatarFallback}';"
            />
            <span class="about__portrait-grain" aria-hidden="true"></span>
          </div>
          <div class="about__portrait-badge">
            <span class="about__portrait-badge-num">${PROFILE.age}</span>
            <span class="about__portrait-badge-label" data-i18n="about_age_label">Years old</span>
          </div>
          <div class="about__portrait-decor" aria-hidden="true"></div>
        </div>

        <div class="about__body">
          <h3 class="about__heading" data-reveal-child>
            <span data-i18n="about_location_prefix">Student based in</span>
            <span class="about__heading-accent" data-i18n="about_location_city"> Bogor</span>
          </h3>
          <p class="about__p" data-reveal-child data-i18n="about_p1">${PROFILE.bio.en[0]}</p>
          <p class="about__p" data-reveal-child data-i18n="about_p2">${PROFILE.bio.en[1]}</p>

          <dl class="about__facts" data-reveal-child>
            <div class="about__fact">
              <dt>
                ${iconHtml('user', 'icon')}
                <span data-i18n="info_name_label">Name</span>
              </dt>
              <dd>${PROFILE.fullName}</dd>
            </div>
            <div class="about__fact">
              <dt>
                ${iconHtml('cap', 'icon')}
                <span data-i18n="info_class_label">Class</span>
              </dt>
              <dd>12</dd>
            </div>
            <div class="about__fact">
              <dt>
                ${iconHtml('pin', 'icon')}
                <span data-i18n="info_location_label">Location</span>
              </dt>
              <dd>${PROFILE.city}, ID</dd>
            </div>
            <div class="about__fact">
              <dt>
                ${iconHtml('heart', 'icon')}
                <span data-i18n="info_hobby_label">Hobby</span>
              </dt>
              <dd data-i18n="info_hobby_value">Exploration</dd>
            </div>
          </dl>

          <a
            class="btn btn--primary about__cta"
            href="#contact"
            data-magnetic
            data-cursor="hover"
          >
            <span data-i18n="about_cta">Let&rsquo;s connect</span>
            ${iconHtml('arrow-right', 'icon btn__icon')}
          </a>
        </div>
      </div>
    </section>
  `;
}
