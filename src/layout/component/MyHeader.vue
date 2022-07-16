<template>
  <div class="content-nav-head">
    <div class="content-nav-head-left">
      <i
        :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="handleFold"
        class="menu-flod"
      ></i>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbsList"
          :key="index"
          >{{ item.meta.title }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="content-nav-head-right">
      <i class="el-icon-message message-icon" @click="handleOpenMessage"></i>
      <el-dropdown @command="handleDropDownClick">
        <span class="el-dropdown-link userInfo">
          <el-avatar :size="30" :src="circleUrl"></el-avatar>
          <span class="name">Hz Lin</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu @click="handleLogout">
            <el-dropdown-item command="退出系统">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const emit = defineEmits(['changeFlod'])
const circleUrl =
  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

const isFold = ref(false)
const handleFold = () => {
  isFold.value = !isFold.value
  emit('changeFlod', isFold.value)
}

onMounted(() => {
  getBreadcrumb()

})
// 监听路由变化 改变面包屑数组
watch(
  () => route.path,
  () => {
    getBreadcrumb()
  }
)

const breadcrumbsList = ref([])
const getBreadcrumb = () => {
  let matched: any = route.matched.filter(
    (item) => item.meta && item.meta.title
  )

  breadcrumbsList.value = matched.filter(
    (item: any) =>
      item.meta && item.meta.title && item.meta.breadcrumb !== false
  )
}
const handleDropDownClick = () => {}
const handleOpenMessage = () => {}
const handleLogout = () => {
  router.push('/login')
}
</script>

<style lang="scss">
.content-nav-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  .content-nav-head-left {
    display: flex;
    align-items: center;
    .menu-flod {
      font-size: 30px;
      cursor: pointer;
      margin-right: 20px;
    }
  }
  .content-nav-head-right {
    display: flex;
    align-items: center;
    .message-icon {
      font-size: 30px;
      cursor: pointer;
      margin-right: 20px;
    }
    .userInfo {
      display: flex;
      align-items: center;
      .name {
        margin-left: 10px;
      }
    }
  }
}
.el-icon-location {
  width: 40px;
  height: 40px;
}

</style>
