import type { MockMethod } from 'vite-plugin-mock'

export default [
  // 用户登录
  {
    url: '/admin/login',
    method: 'post',
    response: () => {
      return {
        code: 0,
        data: {
          token: 'admin-token',
          username: 'admin',
        },
        message: '请求成功',
      }
    },
  },
  // 获取用户权限
  {
    url: '/admin/role',
    method: 'post',
    response: () => {
      return {
        code: 0,
        data: {
          role: ['admin'],
        },
        message: '请求成功',
      }
    },
  },
] as MockMethod[]
