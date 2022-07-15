<template>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({})
</script>

<style lang="scss" scoped>
.main{
  background-color: #f0f0f0;
  height: 100%;
  padding: 20px;
}
</style>
