import Request from '@/api'
export const login = (data: any) => {
  return Request.post('admin/login', data)
}
export const role = (data: any) => {
  return Request.post('admin/role', data)
}
