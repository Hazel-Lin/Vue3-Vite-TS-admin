<template>
  <el-container class="layout-contain">
    <Aside />
    <el-container class="content">
      <el-header><Header /></el-header>
      <el-main> <Main /></el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Aside from './component/Aside.vue'
import Header from './component/Header.vue'
import Main from './component/Main.vue'

export default defineComponent({
  components: {
    Aside,
    Header,
    Main
  },
  setup() {}
})
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
