<template>
  <div class="mainSide">
    <div class="logo">
      <img class="img" src="@/assets/logo.png" alt="logo" />
      <span class="title" v-if="!collapse">Vue3Admin</span>
    </div>
    <el-menu
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in items">
        <!-- 包含子菜单 -->
        <template v-if="item.children">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.index">
              <el-menu-item :index="subItem.index">
                <i :class="subItem.icon"></i>
                <span>{{ subItem.title }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 只有一级菜单 -->
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </el-menu-item>
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

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const items = [
      {
        icon: 'el-icon-menu',
        index: '/dashboard',
        title: '系统首页'
      },
      {
        icon: 'el-icon-setting',
        index: '/table',
        title: '系统管理',
        children: [
          {
            icon: 'el-icon-user-solid',
            index: '/table',
            title: '用户管理'
          }
        ]
      },
      {
        icon: 'el-icon-goods',
        index: '/tabs',
        title: '商品信息'
      }
    ]
    return {
      items
    }
  }
})
</script>

<style scoped lang='scss'>
.mainSide {
  background-color: #0c2135;
  height: 100%;
}
// logo 布局
.logo {
  display: flex;
  height: 50px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .img {
    height: 100%;
    margin: 0 10px;
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
::v-deep .el-menu {
  height: 100%;
  border-right: none; // 去除右边框 避免出现错位情况
}
</style>
