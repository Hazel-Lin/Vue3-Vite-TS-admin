<script setup lang="ts">
import path from 'path'
import type { PropType } from 'vue'
import { ref } from 'vue'
import Link from './Link.vue'

const props = defineProps({
  item: {
    type: Object as PropType<any>,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: '',
  },
})
const isExternal = (path: string) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}
const onlyOneChild: any = ref(null)
const hasOneShowingChild = (children: any = [], parent: any) => {
  const showingChildren = children.filter((item: any) => {
    if (item.hidden) {
      return false
    }
    else {
      onlyOneChild.value = item
      return true
    }
  })

  if (showingChildren.length === 1)
    return true

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}
const resolvePath = (routePath: any) => {
  const httpReg = /^http(s?):\/\//
  if (httpReg.test(routePath) || httpReg.test(props.basePath))
    return routePath || props.basePath
  else
    return path.resolve(props.basePath, routePath)
}
</script>

<template>
  <template v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item)
          && (!onlyOneChild.children || onlyOneChild.noShowingChildren)
      "
    >
      <Link
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
        >
          <i :class="onlyOneChild.meta?.icon" />
          <span>{{ onlyOneChild.meta?.title }}</span>
        </el-menu-item>
      </Link>
    </template>
    <el-sub-menu
      v-else
      ref="subMenu"
      :index="item.path"
      popper-append-to-body
    >
      <template v-if="item.meta" #title>
        <i :class="item.meta && item.meta.icon" />
        <span>{{ item.meta?.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </template>
</template>

<style lang="scss" scoped>

</style>
