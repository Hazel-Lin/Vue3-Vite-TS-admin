<template>
  <el-scrollbar
    ref="scrollContainer"
  >
    <slot />
  </el-scrollbar>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

const tagAndTagSpacing = 4;
const left = ref(0)

</script>

<style lang="scss" scoped>
</style>
