<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  // 列表每一列的数据
  columnData: {
    type: Array as PropType<any>,
  },
  // 列表渲染的数据
  tableData: {
    type: Array as PropType<any>,
  },
  showSelectColumn: {
    type: Boolean,
    default: false,
  },
  showIndexColumn: {
    type: Boolean,
    default: false,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  total: {
    type: Number,
    default: 0,
  },
  // 个数选择器
  pageSizes: {
    type: Array as PropType<any>,
    default: () => [10, 20, 30, 40, 50],
  },
  // 每页显示条目个数
  pageSize: {
    type: Number,
    default: 10,
  },
  // 当前页数
  currentPage: {
    type: Number,
    default: 1,
  },
})
// 多选框
const emit = defineEmits(['selectionChange', 'pagination'])
const selectionChange = (selectionValue: any) => {
  emit('selectionChange', selectionValue)
}

const handleCurrentChange = (val: any) => {
  console.log('val', val)
  emit('pagination', { page: props.currentPage, limit: val })
}
const handleSizeChange = (val: any) => {
  emit('pagination', { page: val, limit: props.pageSize })
}
</script>

<template>
  <div class="myTable">
    <div class="myTable-header">
      <div class="myTable-title">
        <slot name="title" />
      </div>
      <div class="myTable-btn">
        <slot name="button" />
      </div>
    </div>
    <!-- 列表项 -->
    <el-table
      class="myTable-table"
      :data="tableData"
      border
      stripe
      @selection-change="selectionChange"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      />
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      />
      <el-table-column
        v-for="item in columnData"
        v-bind="item" :key="item.prop"
      >
        <template #default="scope">
          <slot :name="item.prop" :row="scope.row">
            {{ scope.row[item.prop] }}
          </slot>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div v-if="showFooter" class="footer">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.myTable {
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 5px;
  .myTable-header{
    padding: 8px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .myTable-title {
      font-size: 20px;
      font-weight: 700;
    }
  }
  .footer {
    background: #fff;
    justify-content: flex-end;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
  }
}
</style>
