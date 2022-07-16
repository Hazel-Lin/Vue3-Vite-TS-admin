import { defineStore } from "pinia";
import type { UserInfo } from "@/types/user";


// 存放用户信息
// token userInfo userPermissions
interface UserState {
  token: string | null;
  userInfo: UserInfo;
  userPermissions: string[];
}
export const userStore = defineStore({
  id:"user",
  state:():UserState => ({
    token:null,
    userInfo: null as any,
    userPermissions: []
  }),
  getters:{
    // 获取用户token
    getToken:(state): string | null =>state.token,
    // 获取用户信息
    getUserInfo:(state): UserInfo =>state.userInfo,
    // 获取用户权限
    getUserPermissions:(state): string[] =>state.userPermissions
  },
  actions:{

  }
})
