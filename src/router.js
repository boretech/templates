import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Index.vue')
  }
]

export default createRouter({
  routes,
  history: createWebHashHistory()
})
