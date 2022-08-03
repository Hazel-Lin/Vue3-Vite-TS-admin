<script setup lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
</style>
