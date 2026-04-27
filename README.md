# Rijal — Portfolio

A mobile-first, dark, minimalist portfolio for Rijal, a Class 12 student from
Bogor, Indonesia. Built from scratch with Vite + TypeScript and zero UI
frameworks — just modern DOM APIs, a single shared animation loop, and a lot
of care about motion and rhythm.

> Live: https://ijal.eu.cc

## Design concept

- **Dark, obsidian base.** The whole stage is `#0b0912` with subtle noise and
  a violet ambient glow that follows the cursor.
- **One accent, one display face.** Everything is either Inter (body) or
  Instrument Serif (display, always italic). The only accent colour is the
  violet family (`--violet-300` through `--violet-700`). Constraint is what
  keeps it calm.
- **Mobile-first.** Every layout is designed for a 360px phone first, then
  progressively enhanced for bigger screens. Spacing, type, and touch-targets
  all respect `env(safe-area-inset-*)`.
- **Motion with purpose.** Every animation has a job — scroll-in reveals
  signal arrival, the typed line tells you who Rijal is, the audio dock
  confirms playback, the cursor parallax hints at depth. Nothing blinks,
  nothing spins without reason.
- **Minimal, but not sparse.** The page is dense with content (hero, about,
  three-track music picker, projects grid with domain-migration callouts,
  contact) but breathing room is generous.

## Tech

| Area | Pick | Why |
| --- | --- | --- |
| Build | Vite 5 | Instant HMR, ESM output, tiny production bundle. |
| Language | TypeScript 5 (strict) | Type-safety across data, modules, i18n. |
| Runtime | Vanilla DOM API | No framework tax. One `<audio>`, one RAF loop. |
| Styling | Hand-written CSS with design tokens | Full control over motion + rhythm. |
| Hosting | GitHub Pages, custom domain via CNAME | Free, fast, SSL included. |

## Structure

```
index.html                 # App shell with boot skeleton (no-JS fallback + splash)
public/                    # Static assets copied verbatim (CNAME, favicon, manifest)
src/
  main.ts                  # Entry — kicks off App
  app.ts                   # Composes the page and starts lifecycle modules
  types/                   # Global domain types
  data/                    # Profile, tracks, projects, socials, translations
  utils/                   # DOM helpers, easing, math, events, storage, icons
  modules/                 # Lifecycle behaviours (cursor, audio, reveal, …)
  components/              # Markup builders for each page section
  styles/                  # Tokens + reset + component styles + mobile tweaks
.github/workflows/         # CI (typecheck + build) and deploy (to Pages)
```

## Development

```bash
npm install
npm run dev           # http://localhost:5173 with HMR
npm run typecheck     # tsc --noEmit
npm run build         # typecheck + production bundle in dist/
npm run preview       # serve the production bundle locally
```

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the
site and publishes `dist/` to GitHub Pages. The CNAME file inside `public/` is
copied into the build so `ijal.eu.cc` resolves to the Pages deployment.

## Architecture notes

- **Lifecycle modules** are pure objects with `id`, `init`, and optional
  `destroy`. Every behaviour (audio, cursor, reveal, particles, …) is one.
  This keeps the code easy to delete, test, and reorder.
- **Single RAF loop.** `utils/rafScheduler.ts` owns one
  `requestAnimationFrame` loop that each module can tap into. No more
  competing frames.
- **i18n as a singleton.** `modules/i18n.ts` exposes `i18n.t()` plus an
  `onChange` subscription that components use to keep themselves in sync.
- **No heavy libraries.** The whole bundle is ~17 KB gzipped — no React, no
  animation library, no icon font. Icons are inline SVG strings. Fonts are
  streamed from Google via `font-display: swap`.

## Credits

Built in Bogor by Rijal, with a lot of help from Cognition's Devin.
