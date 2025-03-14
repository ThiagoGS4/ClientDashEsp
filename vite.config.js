import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://serverdashesp.azurewebsites.net/', // Porta do backend
        changeOrigin: true,
        secure: false
      }
    }
  }
});
