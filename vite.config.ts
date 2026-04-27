import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

/**
 * Vite build config for Rijal's portfolio.
 *
 * The site is deployed to GitHub Pages at a custom apex domain (`ijal.eu.cc`),
 * so `base` stays at `'/'`. The `public/` directory carries over the `CNAME`
 * file and any static media into the final `dist/` bundle.
 */
export default defineConfig({
  base: '/',
  publicDir: 'public',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: true,
    sourcemap: false,
    emptyOutDir: true,
    target: 'es2020',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,
  },
  preview: {
    host: true,
    port: 4173,
  },
});
