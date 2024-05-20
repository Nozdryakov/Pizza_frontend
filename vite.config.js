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
      '/product': {
        target: 'http://localhost:8000/api/applications/index',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/product/, ''),
      },
      '/insert-product': {
        target: 'http://localhost:8000/admin/admins/insert-product',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/insert-product/, ''),
      },
      '/delete-product': {
        target: 'http://localhost:8000/admin/admins/delete-product',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/delete-product/, ''),
      },
      '/update-product': {
        target: 'http://localhost:8000/admin/admins/update-product',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/update-product/, ''),
      },
    },
  },
});
