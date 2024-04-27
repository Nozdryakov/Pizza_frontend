import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': '/src', // Update this alias path according to your project structure
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000/api/applications/index',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
