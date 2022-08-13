<script setup lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { constantRoutes } from '../../router'
import ScrollPane from './ScrollPane.vue'
import { useTagsViewStore } from '@/store/modules/tagsView'

const route = useRoute()
const router = useRouter()
const instance = getCurrentInstance()
const { proxy } = instance as any
const visible = ref(false)
const top = ref(0)
const buttonLeft = ref(0)
const selectedTag = ref({})
const affixTags = ref([])
const filterAffixTags = (routes: any, basePath = '/') => {
  let tags: any = []
  routes.forEach((route: any) => {
    if (route.meta && route.meta.affix) {
      const tagPath = `${basePath}/${route.path}`
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1)
        tags = [...tags, ...tempTags]
    }
  })
  return tags
}
const addTags = () => {
  const { name } = route
  if (name && name !== '404')
    useTagsViewStore().addView(route)

  return false
}
const initTags = () => {
  const affixTagsList = (affixTags.value = filterAffixTags(routes.value))
  for (const tag of affixTagsList) {
    // Must have tag name
    if (tag.name)
      useTagsViewStore().addVisitedView(tag)
  }
}
onMounted(() => {
  initTags()
  addTags()
})

const closeMenu = () => {
  visible.value = false
}
const moveToCurrentTag = () => {
  const tags = instance?.refs.tag as any[]
  nextTick(() => {
    // 解决tags is not iterable报错
    if (tags === null || tags === undefined || !Array.isArray(tags))
      return
    for (const tag of tags) {
      if (tag.to.path === route.path) {
        proxy.$refs.scrollPane.moveToTarget(tag)
        if (tag.to.fullPath !== route.fullPath)
          useTagsViewStore().updateVisitedView(route)

        break
      }
    }
  })
}
watch(
  () => visible.value,
  (val) => {
    if (val)
      document.body.addEventListener('click', closeMenu)
    else
      document.body.removeEventListener('click', closeMenu)
  },
)
watch(
  () => route.path,
  () => {
    addTags()
    moveToCurrentTag()
  },
)
// 初始化标签
const visitedViews = computed(() => {
  return useTagsViewStore().visitedViews
})

const routes = computed(() => {
  return constantRoutes
})

const isActive = (view: any) => {
  return view.path === route.path
}
const isAffix = (tag: any) => {
  return tag.meta && tag.meta.affix
}

const toLastView = (visitedViews: any, view: any) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.fullPath)
  }
  else {
    if (view.name === 'Home') {
      // to reload home page
      router.replace({ path: `/redirect${view.fullPath}` }).catch((err) => {
        console.warn(err)
      })
    }
    else {
      router.push('/')
    }
  }
}
const closeSelectedTag = (view: any) => {
  useTagsViewStore().delView(view).then(({ visitedViews }: any) => {
    if (isActive(view))
      toLastView(visitedViews, view)
  })
}
const openMenu = (tag: any, e: any) => {
  const menuMinWidth = 105
  const offsetLeft = proxy.$el.getBoundingClientRect().left // container margin left
  const offsetWidth = proxy.$el.offsetWidth // container width
  const maxLeft = offsetWidth - menuMinWidth // left boundary
  const left = e.clientX - offsetLeft + 15 // 15: margin right

  buttonLeft.value = left > maxLeft ? maxLeft : left
  top.value = e.clientY
  visible.value = true
  selectedTag.value = tag
}

const handleScroll = () => {
  closeMenu()
}
const closeAllTags = (view: any) => {
  useTagsViewStore().delAllViews().then(({ visitedViews }: any) => {
    if (affixTags.value.some((tag: any) => tag.path === view.path))
      return

    toLastView(visitedViews, view)
  })
}
const closeOthersTags = () => {
  router.push(selectedTag.value)
  useTagsViewStore().delOthersViews(selectedTag.value).then(() => {
    moveToCurrentTag()
  })
}
</script>

<template>
  <div
    id="tags-view-container"
    class="tags-view-container"
  >
    <ScrollPane
      ref="scrollPane"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        class="tags-view-item"
        tag="span"
        @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </ScrollPane>
    <ul
      v-show="visible"
      :style="{ left: `${buttonLeft}px`, top: `${top}px` }"
      class="contextmenu"
    >
      <li @click="closeOthersTags">
        关闭其他
      </li>
      <li @click="closeAllTags(selectedTag)">
        关闭所有
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  display: flex;
  white-space: nowrap;
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin:4px 0 1px 5px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }

  .d2-multiple-page-control-btn {
    position: relative;
    bottom: -1px;
  }
}
</style>

<style lang="scss">
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
