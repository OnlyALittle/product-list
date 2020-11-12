import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/index.vue';

export const routerHistory = createWebHistory()
export const router = createRouter({
  history: routerHistory,
  strict: true,
  routes: [
    {
      path: '/',
      props: true,
      components: { default: Home },
    },
    {
      path: '/:type',
      props: true,
      components: { default: Home },
    }
  ],
})
