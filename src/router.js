import { useRoute, createRouter, createWebHistory } from 'vue-router'

const defaultRouter = [
  {
    path: '/',
    name: 'Home',
    redirect: '/bim',
    children: [
      {
        path: '/demo',
        name: 'Demo',
        component: () => import('@/views/screen/demo.vue'),
        meta: { title: '智慧大屏' },
      },
      {
        path: '/bim',
        name: 'Bim',
        component: () => import('@/views/screen/bim.vue'),
        meta: { title: '基于BIM轻量化的智慧大屏' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: defaultRouter,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    }
  },
})

export default router
