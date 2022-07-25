import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/index.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/about.vue'),
    },
  ]
})