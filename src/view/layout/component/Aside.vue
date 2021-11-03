<template>
  <div class="mainSide">
    <el-menu
      background-color="rgb(48, 65, 86)"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-sub-menu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-sub-menu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template #title>{{ subItem.title }}</template>
              </el-sub-menu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index"
                >{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
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
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  setup() {
    const items = [
      {
        icon: "el-icon-menu",
        index: "/dashboard",
        title: "系统首页",
      },
      {
        icon: "el-icon-menu",
        index: "/table",
        title: "基础表格",
      },
      {
        icon: "el-icon-menu",
        index: "/tabs",
        title: "tab选项卡",
      },
      {
        icon: "el-icon-menu",
        index: "3",
        title: "表单相关",
        subs: [
          {
            index: "/form",
            title: "基本表单",
          },
          {
            index: "/upload",
            title: "文件上传",
          },
        ],
      },
      {
        icon: "el-icon-menu",
        index: "/icon",
        title: "自定义图标",
      },
      {
        icon: "el-icon-menu",
        index: "/charts",
        title: "schart图表",
      },
      {
        icon: "el-icon-menu",
        index: "/i18n",
        title: "国际化功能",
      },
      {
        icon: "el-icon-menu",
        index: "7",
        title: "错误处理",
        subs: [
          {
            index: "/permission",
            title: "权限测试",
          },
          {
            index: "/404",
            title: "404页面",
          },
        ],
      },
      {
        icon: "el-icon-menu",
        index: "/donate",
        title: "支持作者",
      },
    ];
    return {
      items,
    };
  },
});
</script>

<style scoped>
.mainSide {
  background-color: #d3dce6;
  width: 250px;
}
.layout-aside {
  text-align: center;
  line-height: 200px;
}
.mainSide > ul {
  height: 100%;
}
</style>
