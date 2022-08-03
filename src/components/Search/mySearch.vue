<script setup lang="ts">
import {
  computed,
  defineComponent,
  defineProps,
  onMounted,
  ref,
  watch,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  formData: Object,
})
const emit = defineEmits(['search', 'reset'])
const formDataMap: any = ref({})

const handleSearch = (): void => {
  console.log('搜索', formDataMap.value)
  emit('search', formDataMap.value)
}
const handleReset = (): void => {
  formDataMap.value = {}
  console.log('清空', formDataMap.value)
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
    <div pl10px>
      <el-form :label-width="formData.labelWidth" :size="formData.size || 'default'">
        <el-row :gutter="20">
          <template v-for="(item, index) in formData.systemDataList" :key="index">
            <el-col :span="6">
              <el-form-item :label="item.label" :prop="item.prop">
                <template v-if="item.type === 'input'">
                  <el-input
                    v-model="formDataMap[item.prop]"
                    :placeholder="item.placeholder || '请输入'"
                    :clearable="item.clearable || true"
                    :maxlength="item.maxlength"
                    :disabled="item.disabled || false"
                  />
                </template>
                <template v-else-if="item.type === 'select'">
                  <el-select
                    v-model="item.prop"
                    :placeholder="item.placeholder || '请选择'"
                    :clearable="item.clearable || true"
                    :filterable="item.filterable || true"
                    :multiple="item.multiple || true"
                    :disabled="item.disabled || false"
                  >
                    <el-option
                      v-for="item in item.selectOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </template>
                <!-- 日期选择器 -->
                <template v-else-if="item.type === 'date-picker'">
                  <el-date-picker
                    v-model="item.prop"
                    type="date"
                    :placeholder="item.placeholder || '请选择'"
                  />
                </template>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </div>
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
