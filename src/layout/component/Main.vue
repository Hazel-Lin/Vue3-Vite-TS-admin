<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({})
</script>

<template>
  <div class="main">
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.main{
  background-color: #f0f0f0;
  height: 100%;
  padding: 20px;
  overflow: auto;
}
</style>
