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
})
// 多选框
const emit = defineEmits(['selectionChange'])
const selectionChange = (selectionValue: any) => {
  emit('selectionChange', selectionValue)
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
    <el-table :data="tableData" border stripe @selection-change="selectionChange">
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
  </div>
</template>

<style lang="scss" scoped>
.myTable {
  width: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
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
}
</style>
