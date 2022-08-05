<script setup lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import moment from 'moment'
import type { PropType } from 'vue'

const props = defineProps({
  formData: {
    type: Object as PropType<any>,
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6, // ≥1920px
      lg: 8, // ≥1200px
      md: 12, // ≥992px
      sm: 24, // ≥768px
      xs: 24, // <768px
    }),
  },
})
const emit = defineEmits(['search', 'reset'])
const formDataMap: any = ref({})
const datePrefix = 'dateRange'
const dataList = props.formData.systemDataList

dataList.forEach((item: any) => {
  item.modelKey = item.prop
  if (item.type.includes('range')) {
    const _key = datePrefix
    formDataMap[_key] = item.value
    item.modelKey = _key
  }
})
// 获取日期格式化
const getFormatResult = (type: string, name: string) => {
  return type === name ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss'
}
const getValue = (value: any, formatStr: string) => {
  return value ? moment(value).format(formatStr) : ''
}
const getCurrentItem = (modelKey: string) => {
  return dataList.find((item: any) => item.modelKey === modelKey)
}
// 时间日期选择器表示一段时间的范围
const fitlerDateRange = (modelKey: string, data: any) => {
  const _value = formDataMap.value[modelKey] ? formDataMap.value[modelKey] : []
  const { prop, type } = getCurrentItem(modelKey)

  const formatStr = getFormatResult(type, 'daterange')
  data[prop[0]] = getValue(_value[0], formatStr)
  data[prop[1]] = getValue(_value[1], formatStr)
}
// 其他表单项
const filterItem = (modelKey: string, data: any) => {
  let _value = data[modelKey]
  const { type } = getCurrentItem(modelKey)

  if (['date', 'datetime'].includes(type))
    _value = moment(_value).format(getFormatResult(type, 'date'))

  return _value
}
// 点击查询前先处理数据
const filterFormData = () => {
  const data: any = {}

  for (const key in formDataMap.value) {
    if (!key.includes(datePrefix))
      data[key] = filterItem(key, formDataMap.value)

    else fitlerDateRange(key, data)
  }

  return data
}

const handleSearch = (): void => {
  emit('search', filterFormData())
}
const handleReset = (): void => {
  formDataMap.value = {}
  emit('reset', formDataMap.value)
}
</script>

<template>
  <div class="searchFrom">
    <!-- 头部标题展示 -->
    <div class="header">
      <slot name="title" />
    </div>
    <!-- 搜索表单项 -->
    <el-form
      :label-width="formData.labelWidth"
      :size="formData.size"
      :inline="true"
    >
      <template v-for="(item, index) in formData.systemDataList" :key="index">
        <el-form-item :label="item.label" :prop="item.modelKey">
          <el-input
            v-if="item.type === 'input'"
            v-model="formDataMap[item.modelKey]"
            :placeholder="item.placeholder || `请输入${item.label}`"
            :clearable="item.clearable || true"
            :maxlength="item.maxlength"
            :disabled="item.disabled || false"
          />
          <el-select
            v-else-if="item.type === 'select'"
            v-model="formDataMap[item.modelKey]"
            :placeholder="item.placeholder || `请选择${item.label}`"
            :clearable="item.clearable || true"
            :filterable="item.filterable || true"
            :multiple="item.multiple || false"
            :disabled="item.disabled || false"
            style="width: 100%"
          >
            <el-option
              v-for="option in item.selectOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
          <!-- 日期选择器 -->
          <el-date-picker
            v-else-if="item.type === 'date' || item.type === 'datetime'"
            v-model="formDataMap[item.modelKey]"
            :type="item.type"
            :placeholder="item.placeholder || '请选择日期'"
            :disabled="item.disabled"
            :clearable="item.clearable"
            style="width: 100%"
          />
          <el-date-picker
            v-else-if="item.type === 'daterange' || item.type === 'datetimerange'"
            v-model="formDataMap[item.modelKey]"
            :type="item.type"
            :range-separator="item.rangeSeparator || '至'"
            :disabled="item.disabled"
            :clearable="item.clearable"
            :placeholder="item.placeholder"
            :start-placeholder="item.start || '开始日期'"
            :end-placeholder="item.end || '结束日期'"
            :disabled-date="item.pickerOptions?.disabledDate"
            :shortcuts="item.pickerOptions?.shortcuts || []"
            :cell-class-name="item.pickerOptions?.cellClassName"
            style="width: 100%"
          />
        </el-form-item>
      </template>
    </el-form>
    <!-- 表单按钮 默认按钮展示 -->
    <div class="footer">
      <div v-if="formData.isShowDefaultBtns">
        <el-row type="flex" justify="end" class="footer-btns">
          <el-button @click="handleReset">
            清空
          </el-button>
          <el-button type="primary" @click="handleSearch">
            查询
          </el-button>
          <slot name="footer" />
        </el-row>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.searchFrom {
  padding: 10px;
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  .header {
    font-size: 20px;
    font-weight: 700;
    text-align: left;
    margin-bottom: 10px;
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  .footer-btns {
    margin-right: 10px;
  }
}
</style>
