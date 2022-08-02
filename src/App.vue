<script lang="ts">
import { defineComponent } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default defineComponent({
  name: 'App',
  components: {
  },
  setup() {
    return {
      locale: zhCn,
    }
  },
})
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<style lang='scss'>
@import "./assets/css/index.scss";
</style>
