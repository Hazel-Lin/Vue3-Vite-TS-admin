<script setup lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userStore } from '../../store/modules/user'

const emit = defineEmits(['changeFlod'])
const route = useRoute()
const router = useRouter()
const circleUrl
  = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

const isFold = ref(false)
const handleFold = () => {
  isFold.value = !isFold.value
  emit('changeFlod', isFold.value)
}

const breadcrumbsList = ref([])
const getBreadcrumb = () => {
  const matched: any = route.matched.filter(
    item => item.meta && item.meta.title,
  )

  breadcrumbsList.value = matched.filter(
    (item: any) =>
      item.meta && item.meta.title && item.meta.breadcrumb !== false,
  )
}
onMounted(() => {
  getBreadcrumb()
})
// 监听路由变化 改变面包屑数组
watch(
  () => route.path,
  () => {
    getBreadcrumb()
  },
)
const handleDropDownClick = () => {}
const handleLogout = () => {
  userStore().removeToken()
  router.push('/login')
}
</script>

<template>
  <div class="content-nav-head">
    <div class="content-nav-head-left">
      <i
        :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        class="menu-flod"
        @click="handleFold"
      />
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbsList"
          :key="index"
        >
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-nav-head-right">
      <el-dropdown @command="handleDropDownClick">
        <span flex items-center>
          <el-avatar :size="30" :src="circleUrl" />
          <span ml10px>{{ userStore().getUserInfo }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu @click="handleLogout">
            <el-dropdown-item command="退出系统">
              退出系统
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss">
.content-nav-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  .content-nav-head-right,
  .content-nav-head-left {
    display: flex;
    align-items: center;

  }
  .message-icon,
  .menu-flod {
    font-size: 30px;
    cursor: pointer;
    margin-right: 20px;
  }
}
.el-icon-location {
  width: 40px;
  height: 40px;
}
</style>
