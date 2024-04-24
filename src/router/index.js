import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ContactView from '@/views/ContactView.vue';
import CardView from '@/views/CardView.vue';
import LoginView from "@/views/LoginView.vue";

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
      component: CardView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {    // always scroll to top
    return { top: 0 }
  }
})

export default router
