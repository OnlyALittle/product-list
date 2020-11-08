import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/index.vue';

export const routerHistory = createWebHistory()
export const router = createRouter({
  history: routerHistory,
  strict: true,
  routes: [
    {
      path: '/',
      components: { default: Home },
    },
    { path: '/list', redirect: '/' },
  ],
})
