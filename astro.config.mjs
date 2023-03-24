import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    build: {
      assetsInlineLimit: 0,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/script.js',
          assetFileNames: 'assets/[name][extname]',
        }
      }
    }
  }
});
