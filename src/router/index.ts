import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('@/system/login/index.vue'),
      meta: { layout: false, title: '登录' },
    },
    {
      path: '/',
      component: () => import('@/layout/index.vue'),
      children: [
        {
          name: 'home',
          path: '',
          component: () => import('@/system/home/index.vue'),
          meta: { layout: true, title: '首页' },
        },
      ],
    },
    // {name: 'user', path: '/user', component: () => import('@/system/user/index.vue')},
    // {name: 'role', path: '/role', component: () => import('@/system/role/index.vue')},
    // {name: 'menu', path: '/menu', component: () => import('@/system/menu/index.vue')},
  ],
})

export default router
