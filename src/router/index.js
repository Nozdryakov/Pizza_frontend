import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ContactView from '@/views/ContactView.vue';
import CardView from '@/views/CardView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactView
    },
    {
      path: '/card',
      name: 'card',
      component: CardView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    const element = document.querySelector(to.hash);
    if (to.hash) {
      return {
        top: element.offsetTop - 120,
        behavior: 'smooth'
      };
    }
    return { top: 0 };
  }
});
export default router;
