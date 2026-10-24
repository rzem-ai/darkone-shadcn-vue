import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // GitHub Pages serves the kitchensink, and the registry beside it in r/, under the
  // repository's name. BASE_PATH is set by the Pages workflow; locally it is the root.
  base: process.env.BASE_PATH ?? '/',
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      // import.meta.dirname rather than __dirname: Vite's forthcoming native
      // config loader cannot read the CJS global, and warns about it today.
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
});
