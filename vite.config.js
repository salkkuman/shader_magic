import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0', // Allow connections from any IP
    open: true,
    strictPort: false // Try next available port if 3000 is busy
  },
  build: {
    target: 'esnext',
    sourcemap: true
  }
});
