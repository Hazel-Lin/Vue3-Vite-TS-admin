/**
 * 存放系统管理data数据
 */
import { DATE_PICKER, INPUT, SELECT } from '@/constants/fromType'

export const systemData: any = {
  labelWidth: '80px',
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
      type: DATE_PICKER,
      label: '时间',
      prop: 'time',
      placeholder: '请输入具体时间',
    },
    {
      type: SELECT,
      label: '状态',
      placeholder: '请选择状态',
      selectOptions: [],
    },
  ],
}
