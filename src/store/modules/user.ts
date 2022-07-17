import { defineStore } from "pinia";
import type { UserInfo } from "@/types/user";
import { login } from '@/api/login'


// 存放用户信息
// token userInfo userPermissions
interface UserState {
  token: string | null;
  userInfo: UserInfo;
  userPermissions: string[];
  userRoutes: string[];
}
export const userStore = defineStore({
  id:"user",
  state:():UserState => ({
    token:null,
    userInfo: null as any,
    userPermissions: [],
    userRoutes: [],
  }),
  getters:{
    // 获取用户token
    getToken:(state): string | null =>state.token,
    // 获取用户信息
    getUserInfo:(state): UserInfo =>state.userInfo,
    // 获取用户权限
    getUserPermissions:(state): string[] =>state.userPermissions,

    getUserRoutes:(state): string[] =>state.userRoutes
  },
  actions:{
    setToken(token:any){
      this.token = token;
    },
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    },
    setUserRoutes(userRoutes: any) {
      this.userRoutes = userRoutes
    },
    setUserPermission(permissions: any) {
      this.userPermissions = permissions
    },
    // user login 登录后获取到token 通过token获取用户信息和权限并渲染菜单
    async login(params:any) {
    const res = await login(params)
    // if(res.isSuccess){
    //   const { token } = res.getData()
    //   this.setToken(token)
    // }
  },
  }
})
