import { defineStore } from 'pinia'
import type { UserInfo } from '@/types/user'
import { getRoles, login, logout } from '@/api/login'
import { removeToken, setToken } from '@/utils/auth'
// 存放用户信息
// token userInfo userPermissions
interface UserState {
  token: string | null
  userInfo: UserInfo
  userRoles: string[]
  userRoutes: string[]
}
const _recursiveDeleteBtnPermission = (menus: any): void => {
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]
    // 目录
    if (menu.type === 1) {
      const children = menu?.children || []
      _recursiveDeleteBtnPermission(children) // 递归
      // 菜单
    }
    else if (menu.type === 2) {
      const children = menu?.children || []
      if (children?.length) {
        // 删除按钮权限数组
        delete menu.children
        menu.children = []
      }
    }
  }
}
export const getUserMenus = (userMenus: any) => {
  const menus = [...userMenus] // 备份（纯函数）
  _recursiveDeleteBtnPermission(menus)
  return menus
}

export const userStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: null,
    userInfo: null as any,
    userRoles: [],
    userRoutes: [],
  }),
  getters: {
    // 获取用户token
    getToken: (state): string | null => state.token,
    // 获取用户信息
    getUserInfo: (state): UserInfo => state.userInfo,
    // 获取用户权限
    getUserPermissions: (state): string[] => state.userRoles,

    getUserRoutes: (state): string[] => state.userRoutes,
  },
  actions: {
    setToken(token: any) {
      this.token = token
    },
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    setUserRoutes(userRoutes: any) {
      this.userRoutes = userRoutes
    },
    setUserRoles(role: any) {
      this.userRoles = role
    },
    // user login 登录后获取到token 通过token获取用户信息和权限并渲染菜单
    // 用户登录
    async login() {
      const params = {
        username: 'admin',
        password: '123456',
      }
      const res = await login(params)
      if (res.isSuccess()) {
        const { token, userInfo } = res.getData()
        if (token) {
          this.setToken(token)
          setToken(token)
          this.setUserInfo(userInfo)
          this.getRoleList(token)
        }
      }
      return res
    },
    // 获取用户权限
    async getRoleList(token: string) {
      const res = await getRoles({ token })
      if (res.isSuccess()) {
        const { roles } = res.getData()
        roles && this.setUserRoles(roles)
        return roles
      }
    },
    // 用户退出
    async logout() {
      const res = await logout({ token: this.getToken })
      if (res.isSuccess()) {
        this.setToken('')
        this.setUserRoles([])
        removeToken()
      }
    },
  },
})
