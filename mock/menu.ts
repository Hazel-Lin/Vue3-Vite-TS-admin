import type { MockMethod } from 'vite-plugin-mock'
const list: any = []
for (let i = 0; i < 20; i++) {
  list.push({
    address: '',
    updateByName: 'xxx',
    provCode: '430000',
    cityCode: '430200',
    username: '超级资源有限公司',
    provAndCityName: '湖南省株洲市',
    updateTime: 1658366012000,
    subordinateCode: '',
    parentId: 1,
    companyId: 7,
    companyNo: '',
    createTime: 1658110963000,
    updateBy: 2676,
    phone: '13457888888',
  })
}
export default [
  // 获取菜单数据
  {
    url: '/admin/getMenuList',
    method: 'post',
    response: () => {
      return {
        code: 0,
        data: {
          list,
          total: 20,
        },
        message: '请求成功',
      }
    },
  },
] as MockMethod[]
