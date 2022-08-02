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

<template>
  <el-container class="layout-contain">
    <el-aside :width="isCollapse ? '64px' : '210px'">
      <Aside :is-collapse="isCollapse" />
    </el-aside>
    <el-container class="content">
      <el-header>
        <MyHeader @change-flod="handleChangeFlod" />
      </el-header>
      <TagsView />
      <Main />
    </el-container>
  </el-container>
</template>

<style scoped>
.layout-contain,
.content {
  height: 100%;
  position: relative;
}
</style>

