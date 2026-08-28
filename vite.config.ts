import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    target: 'es2022',
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        demo: resolve(__dirname, 'demo/index.html'),
        work: resolve(__dirname, 'work/index.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
        terms: resolve(__dirname, 'terms/index.html')
      }
    }
  },
  server: { port: 4173 },
});
