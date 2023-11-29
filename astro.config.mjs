import path from 'path';
import { defineConfig } from 'astro/config';

const assetsDir = 'assets';

// https://astro.build/config
export default defineConfig({
  build: {
    format: 'file',
    assets: assetsDir,
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          entryFileNames: path.join(assetsDir, 'script.js'),
          assetFileNames: path.join(assetsDir, '[name][extname]'),
        }
      }
    }
  }
});
