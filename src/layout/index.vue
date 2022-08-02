<template>
  <el-container class="layout-contain">
    <el-aside :width="isCollapse ? '64px' : '210px'">
      <Aside :isCollapse="isCollapse"/>
    </el-aside>
    <el-container class="content">
      <el-header>
        <my-header @changeFlod="handleChangeFlod"></my-header>
      </el-header>
      <tags-view/>
      <Main></Main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import Aside from './component/Aside.vue'
import MyHeader from './component/MyHeader.vue'
import Main from './component/Main.vue'
import TagsView from './component/TagsView.vue'


const isCollapse = ref(false)
const handleChangeFlod = (flod: boolean) => {
  isCollapse.value = flod
}
</script>

<style scoped>
.layout-contain,
.content {
  height: 100%;
  position: relative;
}
</style>

