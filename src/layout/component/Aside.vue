<script setup lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userPermissions } from '../../store/modules/permission'
import SidebarItem from './SidebarItem.vue'

const props = defineProps({
  isCollapse: Boolean,
})
const route = useRoute()
const router = useRouter()

// 左侧菜单栏
const routeList = userPermissions().routes
console.log(routeList, 'routeList')

const onRoutes = computed(() => {
  return route.path
})
const back2Home = () => {
  router.push({ path: '/' })
}
</script>

<template>
  <div class="bg-#0c2135 h-100% overflow-hidden">
    <div flex h50px justify-center items-center flex-row>
      <img w-35px mx10px cursor-pointer src="@/assets/img/logo.png" alt="logo" @click="back2Home">
      <span v-if="!isCollapse" fw700 text-16px text-white>Vue3Admin</span>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="onRoutes"
        :collapse="isCollapse"
        background-color="#0c2135"
        text-color="#b7bdc3"
        :unique-opened="false"
        active-text-color="#0a60bd"
        class="w-100%"
        border-r-none
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="routeItem in routeList"
          :key="routeItem.path"
          :item="routeItem"
          :base-path="routeItem.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style scoped lang='scss'>
:deep(.el-menu--collapse .el-menu-item span){
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
</style>
