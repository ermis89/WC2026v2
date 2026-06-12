import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/WC2026v2/',
  resolve: {
    alias: {
      'lucide-react': fileURLToPath(new URL('./src/vendor/lucide-react.js', import.meta.url)),
    },
  },
});
