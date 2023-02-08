import { defineConfig } from 'astro/config';
import bundle from 'astro-bundle';

// https://astro.build/config
export default defineConfig({
  build: {
    format: 'file',
  },
  integrations: [
    bundle(),
  ],
});
