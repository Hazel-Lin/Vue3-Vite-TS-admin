<template>
  <div class="content-nav-head">
    <div class="content-nav-head-left">
      <i
        :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
        @click="handleFold"
        class="menu-flod"
      ></i>
    </div>
    <div class="content-nav-head-right">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, computed } from 'vue'

const emit = defineEmits(['changeFlod'])
const isFold = ref(false)
const handleFold = () => {
  isFold.value = !isFold.value
  console.log(isFold.value, 'isFold.value')
  emit('changeFlod', isFold.value)
}
</script>

<style lang="scss">
.content-nav-head {
  display: flex;
}
.el-icon-location {
  width: 40px;
  height: 40px;
}
.menu-flod {
  font-size: 30px;
  cursor: pointer;
}
</style>
