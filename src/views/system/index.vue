<script setup lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { systemData } from './systemData'
import mySearch from '@/components/my-search.vue'
import myContent from '@/components/my-content.vue'

const labelWidth = '80px'
// 是否展示默认的查询和清空按钮
const isShowDefaultBtns = true
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
const tableData = ref([])
onMounted(() => {
  tableData.value = list
})
</script>

<template>
  <div class="system-content">
    <my-search
      :form-data="systemData"
      :label-width="labelWidth"
      :is-show-default-btns="isShowDefaultBtns"
    >
      <template #title>
        <div>系统管理筛选项</div>
      </template>
      <template #footer>
        <el-button type="primary">
          导入
        </el-button>
        <el-button type="primary">
          导出
        </el-button>
      </template>
    </my-search>

    <my-content />
  </div>
</template>

<style lang="scss">
.system-content {
  .search {
    height: 300px;
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .table {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    .table-hearder {
      padding: 8px 15px;
      height: 45px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .table-title {
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
}
</style>

