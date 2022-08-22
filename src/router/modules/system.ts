import Layout from '@/layout/index.vue'
const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: 'noRedirect',
  name: 'System',
  meta: {
    title: '系统配置',
    icon: 'table',
    noCache: true,
    // 仅有管理员有权限
    roles: ['admin'],
  },
  children: [
    {
      path: 'index',
      name: 'Menu',
      component: () =>
        import(
          /* webpackChunkName: "system" */ '@/views/system/index.vue'
        ),
      meta: { title: '菜单管理', icon: 'table' },
    },
  ],
}
export default systemRouter
