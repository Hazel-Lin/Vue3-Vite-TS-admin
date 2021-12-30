<template>
  <div class="content-nav-head">
    <div class="content-nav-head-left">
      <i
        :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
        @click="handleFold"
        class="menu-flod"
      ></i>
      <el-breadcrumb separator="/">
        <template v-for="(item, index) in breadcrumbsList" :key="index">
          <el-breadcrumb-item>{{ item.meta.title }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div class="content-nav-head-right"></div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const emit = defineEmits(['changeFlod'])
const isFold = ref(false)
const handleFold = () => {
  isFold.value = !isFold.value
  console.log(isFold.value, 'isFold.value')
  emit('changeFlod', isFold.value)
}

const route = useRoute()
onMounted(() => {
  getBreadcrumb()
})

const breadcrumbsList = ref([])
const getBreadcrumb = () => {
  let matched: any = route.matched.filter(
    (item) => item.meta && item.meta.title
  )

  breadcrumbsList.value = matched.filter(
    (item:any) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  )
}
console.log(breadcrumbsList, 'breadcrumbsList---')
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
