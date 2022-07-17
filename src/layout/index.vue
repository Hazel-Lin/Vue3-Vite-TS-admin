<template>
  <el-container class="layout-contain">
    <el-aside :width="collapse ? '62px' : '210px'">
      <Aside :collapse="collapse" :items="items"/>
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

const collapse = ref(false)
const handleChangeFlod = (flod: any) => {
  collapse.value = flod
}
// 侧边导航栏时对应的路由
const routes = userStore().getUserRoutes
const items = [
  {
    icon: 'el-icon-menu',
    index: '/system',
    title: '系统管理'
  },
  {
    icon: 'el-icon-setting',
    index: '/account',
    title: '账号管理',
    children: [
      {
        icon: 'el-icon-user-solid',
        index: '/account/user',
        title: '用户管理'
      }
    ]
  }
]
</script>

<style scoped>
.layout-contain,
.content {
  height: 100%;
}
</style>
