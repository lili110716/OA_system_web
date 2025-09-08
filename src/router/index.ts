import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
// 扫描指定文件夹下的 index.vue (以 views 文件夹为例)
// 这里假设你的页面组件都放在 src/views 目录下，且每个页面都是 index.vue
const modules = import.meta.glob('../views/**/index.vue')
// 生成路由配置
const routes: RouteRecordRaw[] = Object.entries(modules).map(([path, component]) => {
  // 解析路径，例如: ../views/user/index.vue -> /user
  // 去掉 ../views 和 /index.vue 部分
  const routePath = path
    .replace('../views', '')
    .replace('/index.vue', '')
    // 如果是根目录的 index.vue，路径设为 /
    .replace(/^$/, '/')

  // 生成路由名称 (首字母大写)
  const name =
    routePath === '/'
      ? 'Home'
      : routePath
          .split('/')
          .filter(Boolean)
          .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
          .join('')

  return {
    path: routePath,
    name,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    component: component as () => Promise<typeof import('*.vue')>,
    meta: { layout: true, title: name },
  }
})

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
        ...routes,
        {
          name: 'home',
          path: '',
          component: () => import('@/system/home/index.vue'),
          meta: { layout: true, title: '首页' },
        },
      ],
    },
  ],
})
// // 全局前置守卫
router.beforeEach((to, from, next) => {
  // 1. 判断是否需要登录权限
  // 2. 获取登录状态（这里假设通过localStorage存储登录信息）
  const isLogin = !!localStorage.getItem('token')
  // 3. 判断逻辑
  if (isLogin || to.name === 'login') {
    // 已登录，允许访问
    next()
  } else {
    // 未登录，重定向到登录页，并记录当前路径以便登录后返回
    next({
      path: '/login',
      query: { redirect: to.fullPath }, // 存储要跳转的路径
    })
  }
})
export default router
