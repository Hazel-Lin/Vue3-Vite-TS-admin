// 渲染表格每一列的数据
export const organizationList = [
  {
    label: '用户名',
    prop: 'username',
  },
  {
    label: '手机号码',
    prop: 'phone',
  },
  {
    label: '所属地区',
    prop: 'provAndCityName',
  },
  {
    label: '创建时间',
    prop: 'createTime',
  },
  {
    label: '操作人',
    prop: 'updateByName',
  },
  {
    label: '操作时间',
    prop: 'updateTime',
  },
  {
    label: '操作',
    prop: 'handler',
    elProps: {
      width: '160',
    },
  },
]
