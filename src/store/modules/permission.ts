import { defineStore } from 'pinia'
import { asyncRoutes, constantRoutes } from '@/router'

// 判断是否有权限
function hasPermission(roles: any, route: any) {
  if (route.meta && route.meta.roles)
    return roles.some((role: any) => route.meta.roles.includes(role))

  else
    return true
}
// 递归过滤
export function filterAsyncRoutes(routes: any, roles: any) {
  const res: any = []

  routes.forEach((route: any) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children)
        tmp.children = filterAsyncRoutes(tmp.children, roles)

      res.push(tmp)
    }
  })

  return res
}
export const userPermissions = defineStore({
  id: 'permission',
  state: () => ({
    addRoutes: [] as any[],
    routes: [] as any[],
  }),
  getters: {

  },
  actions: {
    // 设置路由
    setUserRoutes(routes: any) {
      this.addRoutes = routes
      this.routes = constantRoutes.concat(routes)
    },
    // 生成路由['admin']
    generateRoutes(roles: any) {
      let accessedRoutes
      if (roles.includes('admin'))
        accessedRoutes = asyncRoutes || []

      else
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)

      this.setUserRoutes(accessedRoutes)
      return accessedRoutes
    },
  },
})
