import Layout from '@/layout/index.vue'
const productRouter = {
  path: '/product',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Product',
  meta: {
    title: '产品配置',
    icon: 'el-icon-menu',
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
          /* webpackChunkName: "account" */ '@/views/system/index.vue'
        ),
      meta: { title: '产品管理', icon: 'el-icon-menu' },
    },
  ],
}
export default productRouter
