<template>
  <div class="mainSide">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.png" alt="logo" />
      <span class="title" v-if="!isCollapse">Vue3Admin</span>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="onRoutes"
        :collapse="isCollapse"
        background-color="#0c2135"
        text-color="#b7bdc3"
        :unique-opened="false"
        active-text-color="#0a60bd"
        class="mainSide-menu"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routeList"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
/**
 * el-sub-menu 一级菜单
 */
import { defineComponent, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MyHeader from './component/MyHeader.vue'
import { asyncRoutes, constantRoutes } from '../../router';
import SidebarItem from './SidebarItem.vue'

const props = defineProps({
  isCollapse: Boolean,
});
// 侧边导航栏时对应的路由
const routeList:any = constantRoutes
console.log(routeList,'routeList')

const route = useRoute()

const onRoutes = computed(() => {
  return route.path
})

</script>

<style scoped lang='scss'>
.mainSide {
  background-color: #0c2135;
  height: 100%;
  overflow: hidden;
  .mainSide-menu {
    width: 100%;
    border-right: none; // 去除右边框 避免出现错位情况
  }
}
// logo 布局
.logo {
  display: flex;
  height: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .img {
    margin: 0 10px;
    width: 35px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
  }
}
:deep(.el-menu--collapse .el-menu-item span){
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
</style>
