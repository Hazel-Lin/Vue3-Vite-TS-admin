// 导出路由
/**
 * Q&A
 * 路由的原理
 * hash 和 history的区别
 * 静态 和 动态路由区别
 * 导航守卫处理
 * @ 标识符的定义
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// RouteRecordRaw 路由记录
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/view/login/index.vue')
  },
  {
    path: '/home',
    component: () =>
      import(/* webpackChunkName: "layout" */ '@/view/layout/index.vue'),
    name: 'Home',
    meta: { title: '首页' },
    children: [
      {
        path: '/system',
        component: () =>
          import(/* webpackChunkName: "system" */ '@/view/system/index.vue'),
        meta: { title: '系统管理' }
      },
      {
        path: '/accout',
        component: () =>
          import(/* webpackChunkName: "accout" */ '@/view/accout/index.vue'),
        meta: { title: '账号管理' },
        children: [
          {
            path: '/accout/user',
            component: () =>
              import(
                /* webpackChunkName: "accout" */ '@/view/accout/user/index.vue'
              ),
            meta: { title: '用户管理' }
          }
        ]
      }
    ]
  }
]
// 创建一个路由实例
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes // 应该添加到路由的初始路由列表。
})
// 路由守卫
router.beforeEach((to, from) => {})

export default router
