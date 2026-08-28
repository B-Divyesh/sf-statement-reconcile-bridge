import { defineConfig } from 'vite';

export default defineConfig({
  build: { target: 'es2022', cssCodeSplit: false },
  server: { port: 4173 },
});
