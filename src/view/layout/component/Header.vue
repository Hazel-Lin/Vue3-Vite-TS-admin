<template>
  <div class="content-nav-head">
    <div class="content-nav-head-left">
      <i
        :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
        @click="handleFold"
        class="menu-flod"
      ></i>
    </div>
    <div class="content-nav-head-right">
      {{ breadcrumbList }}
      <el-breadcrumb separator="/" v-if="breadcrumbList">
        <template v-for="(item, index) in breadcrumbList" :key="index">
          <!-- <el-breadcrumb-item>{{ item.meta.title }}</el-breadcrumb-item> -->
          <el-breadcrumb-item>{{ item }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, computed, onMounted, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
let breadcrumbList: any = ref([])

watch(
  () => route.path,
  () => {
    getBreadcrumb()
  }
)

const emit = defineEmits(['changeFlod'])
const isFold = ref(false)
const handleFold = () => {
  isFold.value = !isFold.value
  console.log(isFold.value, 'isFold.value')
  emit('changeFlod', isFold.value)
}
onMounted(() => {
  getBreadcrumb()
})
const getBreadcrumb = () => {
  let matched = route.matched.filter((item) => item.meta && item.meta.title)
  let list = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  )
  // breadcrumbList = matched.filter(
  //   (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  breadcrumbList.value = list
  // )
  console.log(breadcrumbList.value[0], 'breadcrumbList')
}
</script>

<style lang="scss">
.content-nav-head {
  display: flex;
}
.el-icon-location {
  width: 40px;
  height: 40px;
}
.menu-flod {
  font-size: 30px;
  cursor: pointer;
}
</style>
