import type { MockMethod } from 'vite-plugin-mock'

export default [
  // 用户登录
  {
    url: '/basic-api/login',
    method: 'post',
    response: () => {
      return {
        code: 0,
        data: {
          token: 'admin-token',
          userInfo: {
            username: 'admin',
          },
        },
        message: '请求成功',
      }
    },
  },
  // 获取用户权限
  {
    url: '/basic-api/role',
    method: 'post',
    response: () => {
      return {
        code: 0,
        data: {
          roles: ['admin'],
        },
        message: '请求成功',
      }
    },
  },
  // 用户退出
  {
    url: '/basic-api/logout',
    method: 'post',
    response: () => {
      return {
        code: 0,
        data: {},
        message: '请求成功',
      }
    },
  },
] as MockMethod[]
