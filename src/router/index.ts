// 导出路由
/**
 * Q&A
 * 路由的原理
 * hash 和 history的区别
 * 静态 和 动态路由区别
 * 导航守卫处理
 * @ 标识符的定义
 * 以下路由控制面包屑及地址栏中的url
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

// RouteRecordRaw 路由记录
export const constantRoutes: any[] = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    hidden: true,
    meta: { title: '登录' },
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    hidden: true,
    meta: { title: '首页' },
    children: [
      {
        path: 'home',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
        name: 'Home',
        meta: {
          title: '首页',
          icon: 'user',
          noCache: true,
        },
      },
    ],
  },

  {
    path: '/base',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Base',
    meta: { title: '基础配置', icon: 'el-icon-setting' },
    children: [
      {
        path: 'index',
        name: 'Account',
        component: () =>
          import(
            /* webpackChunkName: "account" */ '@/views/account/index.vue'
          ),
        meta: { title: '账号管理' },
      },
      {
        path: 'user',
        name: 'User',
        component: () =>
          import(
            /* webpackChunkName: "account" */ '@/views/account/user/index.vue'
          ),
        meta: { title: '用户管理' },
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () =>
      import(/* webpackChunkName: "404" */ '@/views/404.vue'),
  },
]

// 导入modules文件夹下的路由 读取本地路由
const routeFiles = import.meta.globEager('./modules/*.ts')
const modulesRoutes = Object.keys(routeFiles).reduce((modules: any, modulePath) => {
  modules.push(routeFiles[modulePath].default)
  return modules
}, [])

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user resources
 */
export const asyncRoutes = [
  ...modulesRoutes,
  // 404 page must be placed at the end !!!
  { path: '/:catchAll(.*)', redirect: '/404', hidden: true },
]
// 创建一个路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export default router
