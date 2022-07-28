<template>
  <div class="mainSide">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.png" alt="logo" />
      <span class="title" v-if="!collapse">Vue3Admin</span>
    </div>
    <el-menu
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      class="mainSide-menu"
      :collapse-transition="false"
      :unique-opened="false"
      :default-active="onRoutes"
    >
      <template v-for="item in routeList">
        <template v-if="!item.hidden">
          <!-- 包含子菜单 -->
          <template v-if="item.children">
            <el-submenu :index="(item.path)" >
              <template #title>
                <i :class="item.meta?.icon"></i>
                <span>{{ item.meta?.title }}</span>
              </template>
              <template v-for="subItem in item.children">
                <el-menu-item
                  :index="subItem.path"
                  @click="handleItemClick(subItem)"
                >
                  <i :class="subItem.meta?.icon"></i>
                  <span>{{ subItem.meta?.title }}</span>
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
          <!-- 只有一级菜单 -->
          <template v-else>
            <el-menu-item
              :index="item.path"
              @click="handleItemClick(item)"
            >
              <i :class="item.meta?.icon"></i>
              <span>{{ item.meta?.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
/**
 * el-sub-menu 一级菜单
 */
import { defineComponent, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    },
    routeList: {
      type: Array,
      default: []
    }
  },
  setup() {
    const router = useRouter()
    const route = useRoute()

    const handleItemClick = (menu: any) => {
      router.push({
        path: menu.path
      })
    }
    const onRoutes = computed(() => {
      return route.path
    })
    return {
      handleItemClick,
      onRoutes
    }
  }
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
.layout-aside {
  text-align: center;
  line-height: 200px;
}
// ::v-deep .el-menu {
//   height: 100%;
//   border-right: none; // 去除右边框 避免出现错位情况
// }
</style>
