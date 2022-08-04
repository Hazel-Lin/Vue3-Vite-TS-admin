<script setup lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
})
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
    <el-table :data="tableData" border stripe>
      <el-table-column
        v-for="item in columnData"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
      />
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
