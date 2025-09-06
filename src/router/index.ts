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
// // 全局前置守卫
// router.beforeEach((to, from, next) => {
//   // 1. 判断是否需要登录权限
//   // const requiresAuth = to.meta.requiresAuth

//   // 2. 获取登录状态（这里假设通过localStorage存储登录信息）
//   const isLogin = !!localStorage.getItem('token')

//   // 3. 判断逻辑
//   if (isLogin) {
//     // 已登录，允许访问
//     next()
//   } else {
//     // 未登录，重定向到登录页，并记录当前路径以便登录后返回
//     next({
//       path: '/login',
//       query: { redirect: to.fullPath }, // 存储要跳转的路径
//     })
//   }
// })
export default router
