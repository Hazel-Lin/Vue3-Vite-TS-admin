import Request from '@/api'
export const login = (data: any) => {
  return Request.post('admin/login', data)
}
export const getRoles = (data: any) => {
  return Request.post('admin/role', data)
}
