<template>
  <el-container class="layout-contain">
    <Aside :collapse="collapse" />
    <el-container class="content">
      <el-header><my-header @changeFlod="handleChangeFlod" /></el-header>
      <el-main><Main></Main></el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import Aside from './component/Aside.vue'
import MyHeader from './component/Header.vue'
import Main from './component/Main.vue'

const collapse = ref(false)
const handleChangeFlod = (flod:any) => {
  collapse.value = flod
}
</script>

<style scoped>
.layout-contain,
.content {
  width: 100%;
  height: 100%;
}
.el-header {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
  border: 1px solid red;
  color: var(--el-text-color-primary);
  line-height: 60px;
}
</style>
