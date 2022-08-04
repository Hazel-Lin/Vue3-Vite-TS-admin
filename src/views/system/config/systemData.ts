/**
 * 存放系统管理data数据
 */
import { DATE_RANGE, INPUT, SELECT } from '@/constants/fromType'

export const systemData: any = {
  labelWidth: '100px',
  // 是否展示默认的查询和清空按钮
  isShowDefaultBtns: true,
  systemDataList: [
    {
      type: INPUT,
      label: '用户名',
      prop: 'username',
      placeholder: '请输入用户名',
    },
    {
      type: INPUT,
      label: '手机号码',
      prop: 'phone',
      placeholder: '请输入手机号码',
    },
    {
      type: DATE_RANGE,
      label: '时间',
      prop: ['updateStartTime', 'updateEndTime'],
      placeholder: '请输入具体时间',
    },
    {
      type: SELECT,
      label: '状态',
      prop: 'status',
      placeholder: '请选择状态',
      selectOptions: [
        {
          label: '全部',
          value: '2',
        },
        {
          label: '启用',
          value: '1',
        },
        {
          label: '禁用',
          value: '0',
        },
      ],
    },
  ],
}
