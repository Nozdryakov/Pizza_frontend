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
      '/images': {
        target: 'http://localhost:8000/images/products',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/images/, ''),
      },
      '/st-img': {
        target: 'http://localhost:8000/images/stocks',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/st-img/, ''),
      },
      '/pop-img': {
        target: 'http://localhost:8000/images/popular',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pop-img/, ''),
      },
      '/login-admin': {
        target: 'http://localhost:8000/AuthAdmin/auths/login',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/login-admin/, ''),
      },
      '/product': {
        target: 'http://localhost:8000/api/applications/index',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/product/, ''),
      },
      '/get-products-admin': {
        target: 'http://localhost:8000/admin/admins/index',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/get-products-admin/, ''),
      },
      '/get-stocks-admin': {
        target: 'http://localhost:8000/admin/admins/get-stocks',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/get-stocks-admin/, ''),
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
      '/get-stocks': {
        target: 'http://localhost:8000/api/applications/get-stocks',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/get-stocks/, ''),
      },
      '/insert-stocks': {
        target: 'http://localhost:8000/admin/admins/insert-stock',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/insert-stocks/, ''),
      },
      '/update-stock': {
        target: 'http://localhost:8000/admin/admins/update-stock',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/update-stock/, ''),
      },
      '/delete-stock': {
        target: 'http://localhost:8000/admin/admins/delete-stock',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/delete-stock/, ''),
      },
      '/update-visible': {
        target: 'http://localhost:8000/admin/admins/update-visible',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/update-visible/, ''),
      },
      '/send-order': {
        target: 'http://localhost:8000/api/applications/send-order',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/send-order/, ''),
      },
      '/get-populars': {
        target: 'http://localhost:8000/api/applications/get-populars',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/get-populars/, ''),
      },
      '/get-areas': {
        target: 'http://localhost:8000/api/applications/get-areas',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/get-areas/, ''),
      },
      '/reg-user': {
        target: 'http://localhost:8000/AuthUser/auth-users/register',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/reg-user/, ''),
      },
      '/get-order-guest-kitchen': {
        target: 'http://localhost:8000/api/applications/get-order-guest-kitchen',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/get-order-guest-kitchen/, ''),
      },
      '/get-order-user-courier': {
        target: 'http://localhost:8000/api/applications/get-order-user-courier',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/get-order-user-courier/, ''),
      },
      '/login-user': {
        target: 'http://localhost:8000/AuthUser/auth-users/login',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/login-user/, ''),
      },
      '/get-address-user': {
        target: 'http://localhost:8000/api/applications/get-address-user',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/get-address-user/, ''),
      },
      '/courier-access-zero': {
        target: 'http://localhost:8000/api/applications/courier-access-zero',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/courier-access-zero/, ''),
      },
      '/courier-access': {
        target: 'http://localhost:8000/api/applications/courier-access',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/courier-access/, ''),
      },
      '/get-order-guest-courier': {
        target: 'http://localhost:8000/api/applications/get-order-guest-courier',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/get-order-guest-courier/, ''),
      },
      '/get-order-guest': {
        target: 'http://localhost:8000/api/applications/get-order-guest',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/get-order-guest/, ''),
      },
      '/send-address-user': {
        target: 'http://localhost:8000/api/applications/send-address-user',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/send-address-user/, ''),
      },
      '/update-admin-access': {
        target: 'http://localhost:8000/api/applications/update-admin-access',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/update-admin-access/, ''),
      },
      '/update-admin-access-zero': {
        target: 'http://localhost:8000/api/applications/update-admin-access-zero',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/update-admin-access-zero/, ''),
      },
      '/get-order-user-kitchen': {
        target: 'http://localhost:8000/api/applications/get-order-user-kitchen',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/get-order-user-kitchen/, ''),
      },
      '/get-order-user': {
        target: 'http://localhost:8000/api/applications/get-order-user',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/get-order-user/, ''),
      },
      '/kitchen-access-zero': {
        target: 'http://localhost:8000/api/applications/kitchen-access-zero',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/kitchen-access-zero/, ''),
      },
      '/kitchen-access': {
        target: 'http://localhost:8000/api/applications/kitchen-access',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/kitchen-access/, ''),
      },
    },
  },
});
