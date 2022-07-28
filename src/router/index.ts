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
export const constantRoutes:any[] = [
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

  },
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    hidden: true,
    meta: { title: '首页' },
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
    component: () =>
    import(
      /* webpackChunkName: "system" */ '@/views/system/index.vue'
    ),
    redirect: '/system/index',
    name: 'System',
    meta: { title: '系统管理', icon: 'el-icon-menu', noCache: true }
  },
  {
    path: '/account',
    component: Layout,
    redirect: '/account/index',
    meta: { title: '基础配置', icon: 'el-icon-setting' },
    children: [
      {
        path: 'index',
        component: () =>
          import(
            /* webpackChunkName: "account" */ '@/views/account/index.vue'
          ),
        meta: { title: '账号管理' },
      },
      {
        path: 'user',
        component: () =>
          import(
            /* webpackChunkName: "account" */ '@/views/account/user/index.vue'
          ),
        meta: { title: '用户管理' }
      },
    ]
  },
  {
    path: '/404',
    component: () =>
      import(/* webpackChunkName: "404" */ '@/views/404.vue'),
    name: '404',
    hidden: true
  },
  {
    path: '/:catchAll(.*)',
    redirect: "/404",
    hidden: true
  },
]
function compare(property:any) {
  return function(a:any, b:any) {
    return a[property].sort - b[property].sort;
  };
}

// 导入modules文件夹下的路由 读取本地路由
// const modulesRoute:any = [];
// const routeFiles = (require as any).context('./modules', true, /\.ts$/);
// routeFiles.keys().forEach((path:any) => {
//   const module = routeFiles(path).default;
//   if (module) {
//     modulesRoute.push(module);
//   }
// });
// const modulesRoutes = modulesRoute.sort(compare('meta'));

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user resources
 */
export const asyncRoutes = [
  // ...modulesRoutes,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
];
// 创建一个路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
