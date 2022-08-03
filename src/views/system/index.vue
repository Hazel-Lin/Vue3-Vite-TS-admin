<script setup lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { systemData } from './config/systemData'
import mySearch from '@/components/Search/mySearch.vue'
import myTable from '@/components/MyTable/my-table.vue'

const list = [
  {
    id: 1,
    name: '李磊',
  },
  {
    id: 2,
    name: '王明',
  },
  {
    id: 3,
    name: '陈故',
  },
]
const tableData: any = ref([])
onMounted(() => {
  tableData.value = list
})
const handleSearch = (): void => {
  // 获取到筛选项数据 => 请求接口进行过滤 => 返回的结果展示给列表组件
}
const handleReset = (): void => {
  // 清空筛选项数据 并且重新获取数据
}
</script>

<template>
  <div class="system-content">
    <mySearch
      :form-data="systemData"
      @search="handleSearch"
      @reset="handleReset"
    >
      <template #title>
        <div>系统管理筛选项</div>
      </template>
      <template #footer>
        <!-- <el-button type="primary">
          导入
        </el-button>
        <el-button type="primary">
          导出
        </el-button> -->
      </template>
    </mySearch>

    <!-- <myTable :table-data="tableData" /> -->
  </div>
</template>

<style lang="scss" scoped>
</style>

