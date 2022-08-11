import Request from '@/api'
export const getMenuList = (data: any) => {
  return Request.post('admin/getMenuList', data || {})
}
