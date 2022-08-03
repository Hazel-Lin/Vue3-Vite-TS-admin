<script setup lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  tableData: Array,
})
</script>

<template>
  <div class="table">
    <div class="table-hearder">
      <div class="table-title">
        系统管理
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%" stripe>
      <el-table-column prop="id" label="UID" width="180" />
      <el-table-column prop="name" label="用户名" />
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.table {
  width: 100%;
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
</style>
