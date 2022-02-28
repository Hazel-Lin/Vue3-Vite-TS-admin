<template>
  <div class="table">
    <div class="table-hearder">
      <div class="table-title">系统管理</div>
    </div>
    <el-table :data="tableData" border style="width: 100%" stripe>
      <el-table-column prop="id" label="UID" width="180"> </el-table-column>
      <el-table-column prop="name" label="用户名"> </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
</script>

<style lang="scss" scoped>
</style>
