import '@/styles/main.css';

import { App } from '@/app';

/**
 * Boot the app after the DOM has parsed. We don't wait for the `load` event
 * because we want the UI to paint as fast as possible — images / audio can
 * stream in after that.
 */
function boot(): void {
  const app = new App();
  void app.start();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
