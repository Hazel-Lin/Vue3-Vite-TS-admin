/**
 * 存放系统管理data数据
 */
import { SELECT, INPUT } from '@/constants/fromType.ts';

export const systemData: any = [{
  type: INPUT,
  label: "用户名",
  placeholder: "请输入用户名",
}, {
  type: INPUT,
  label: "手机号码",
  placeholder: "请输入手机号码",
},
{
  type: SELECT,
  label: "状态",
  placeholder: "请选择状态",
  selectOptions: []
},
]
