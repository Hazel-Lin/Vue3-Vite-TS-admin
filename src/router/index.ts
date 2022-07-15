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
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue';

// RouteRecordRaw 路由记录
export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { title: '登录' },
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home'
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    meta: { hidden: true, title: '首页' },
    children: [
      {
        path: 'index',
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
    path: '/system',
    component: Layout,
    redirect: '/system/index',
    children: [
      {
        path: 'index',
        component: () =>
        import(
          /* webpackChunkName: "accout" */ '@/views/system/index.vue'
        ),
        name: 'System',
        meta: { title: '系统管理', icon: 'table', noCache: true }
      }
    ]
  },
  {
    path: '/accout',
    component: Layout,
    redirect: '/accout/index',
    children: [
      {
        path: 'index',
        component: () =>
          import(
            /* webpackChunkName: "accout" */ '@/views/accout/index.vue'
          ),
        meta: { title: '账号管理' }
      },
      {
        path: '/accout/user',
        component: () =>
          import(
            /* webpackChunkName: "accout" */ '@/views/accout/user/index.vue'
          ),
        meta: { title: '用户管理' }
      }
    ]
  },
  {
    path: '/404',
    component: () =>
      import(/* webpackChunkName: "404" */ '@/views/404.vue'),
    name: '404',
  },
  {
    path: '/:catchAll(.*)',
    redirect: "/404",
  },
]
// 创建一个路由实例
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes // 应该添加到路由的初始路由列表。
})
// 路由守卫
router.beforeEach((to, from) => { })

export default router
