import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/admin/login',
    method: 'post',
    response: () => {
      return {
        code: 0,
        data: {
          token: 'admin-token',
        },
        message: '请求成功',
      }
    },
  },
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
