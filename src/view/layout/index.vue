<template>
  <el-container class="layout-contain">
    <Aside />

    <el-container>
      <Header />
      <Main />
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Aside from "./component/Aside.vue";
import Header from "./component/Header.vue";
import Main from "./component/Main.vue";

export default defineComponent({
  components: {
    Aside,
    Header,
    Main,
  },
  setup() {
    
  },
});
</script>

<style scoped>
.layout-contain{
    width: 100%;
    height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  line-height: 60px;
}

.el-aside {
  color: var(--el-text-color-primary);
}
</style>
