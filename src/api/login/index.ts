import Request from '@/api'
export const login = (data: any) => {
  return Request.post('basic-api/login', data)
}
export const getRoles = (data: any) => {
  return Request.post('basic-api/role', data)
}
export const logout = (data: any) => {
  return Request.post('basic-api/logout', data)
}
