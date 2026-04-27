import { html } from '@/utils/dom';

/** Top-of-page scroll progress bar. */
export function renderScrollProgress(): string {
  return html`
    <div class="scroll-progress" data-scroll-progress aria-hidden="true">
      <span class="scroll-progress__fill"></span>
    </div>
  `;
}
