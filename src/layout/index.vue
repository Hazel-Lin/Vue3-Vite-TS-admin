<template>
  <el-container class="layout-contain">
    <el-aside :width="collapse ? '62px' : '210px'">
      <Aside :collapse="collapse" :routeList="routeList"/>
    </el-aside>
    <el-container class="content">
      <el-header><my-header @changeFlod="handleChangeFlod"></my-header></el-header>
      <Main></Main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import Aside from './component/Aside.vue'
import MyHeader from './component/MyHeader.vue'
import Main from './component/Main.vue'
import { userStore } from '@/store/modules/user'
import { asyncRoutes, constantRoutes } from '../router';

const collapse = ref(false)
const handleChangeFlod = (flod: any) => {
  collapse.value = flod
}
// 侧边导航栏时对应的路由
const routeList = constantRoutes
console.log(routeList,'routeList')
</script>

<style scoped>
.layout-contain,
.content {
  height: 100%;
}
</style>
