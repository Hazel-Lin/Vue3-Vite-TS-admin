<template>
  <div class="mainSide">
    <!-- <div class="logo">
      <img class="img" src="https://cn.vitejs.dev/logo.svg" alt="logo" />
      <span v-show="!isCollapse" class="title">Vue3Admin</span>
    </div> -->
    <el-menu
      :unique-opened="false"
      background-color="#001529"
      text-color="#B7BDC3"
      active-text-color="#fff"
    >
      <template v-for="item in items">
        <!-- 包含子菜单 -->
          <el-sub-menu :index="item.index" :key="item.index" v-if="item.subs">
            <template #title>
              <i class="el-icon-location"></i>
              <span>{{ item.title }}{{item.icon}}</span>
            </template>
            <template v-for="subItem in item.subs" :key="subItem.index">
              <el-menu-item :index="subItem.index"
                >{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        <!-- 只有一级菜单 -->
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span>{{ item.title }}{{item.icon}}</span>
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
  setup() {
    const items = [
      {
        icon: 'el-icon-menu',
        index: '/dashboard',
        title: '系统首页'
      },
      {
        icon: 'el-icon-menu',
        index: '/table',
        title: '基础表格'
      },
      {
        icon: 'el-icon-menu',
        index: '/tabs',
        title: 'tab选项卡'
      },
      {
        icon: 'el-icon-menu',
        index: '3',
        title: '表单相关',
        subs: [
          {
            index: '/form',
            title: '基本表单'
          },
          {
            index: '/upload',
            title: '文件上传'
          }
        ]
      },
      {
        icon: 'el-icon-menu',
        index: '/icon',
        title: '自定义图标'
      },
      {
        icon: 'el-icon-menu',
        index: '/i18n',
        title: '国际化功能'
      },
      {
        icon: 'el-icon-menu',
        index: '7',
        title: '错误处理',
        subs: [
          {
            index: '/404',
            title: '404页面'
          }
        ]
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
  background-color: #001529;
  min-width: 200px;
}
// logo 布局
.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
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
.mainSide > ul {
  height: 100%;
}
.mainSide i::before {
  content: '';
}
</style>
