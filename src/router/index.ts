import { createRouter, createWebHistory } from 'vue-router'
import Introduction from '../views/Introduction.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'introduction',
      component: Introduction
    },
    {
      path: '/questions',
      name: 'questions',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Questions.vue')
    },
    {
      path: '/results',
      name: 'results',
      component: () => import('../views/Results.vue')
    }
  ]
})

export default router
