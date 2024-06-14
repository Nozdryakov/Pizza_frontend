import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ContactView from '@/views/ContactView.vue';
import CardView from '@/views/CardView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import AdminView from "@/views/AdminView.vue";
import AdminStatsView from "@/views/AdminStatsView.vue";
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
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/stats',
      name: 'stats',
      component: AdminStatsView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash && to.hash !== '') {
      const element = document.querySelector(to.hash);
      if (element) {
        setTimeout(() => {
          const scrollToOffset = element.offsetTop - 120;
          window.scrollTo({
            top: scrollToOffset,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }
});

export default router;
