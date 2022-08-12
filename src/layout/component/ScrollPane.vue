<script setup lang="ts">
import { computed, defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, ref } from 'vue'

const emit = defineEmits(['scroll'])
defineOptions({
  name: 'ScrollPane',
})
const tagAndTagSpacing = 4
const instance: any = getCurrentInstance()

const scrollWrapper: any = computed(() => {
  return instance.refs.scrollContainer.$refs?.wrap$
})
const emitScroll = () => {
  emit('scroll')
}
onMounted(() => {
  scrollWrapper.value.addEventListener('scroll', emitScroll, true)
})
onBeforeUnmount(() => {
  scrollWrapper.value.removeEventListener('scroll', emitScroll, true)
})

const handleScroll = (e: any) => {
  const eventDelta = e.wheelDelta || -e.deltaY * 40
  const $scrollWrapper = scrollWrapper
  console.log('$scrollWrapper', $scrollWrapper.value)
  $scrollWrapper.value.scrollLeft = $scrollWrapper.value.scrollLeft + eventDelta / 4
}
const moveToTarget = (currentTag: any) => {
  const $container = instance.refs.scrollContainer.$el
  const $containerWidth = $container.offsetWidth
  const $scrollWrapper = scrollWrapper
  const tagList = instance.proxy.$parent.$refs.tag

  let firstTag = null
  let lastTag = null

  // find first tag and last tag
  if (tagList.length > 0) {
    firstTag = tagList[0]
    lastTag = tagList[tagList.length - 1]
  }

  if (firstTag === currentTag) {
    $scrollWrapper.scrollLeft = 0
  }
  else if (lastTag === currentTag) {
    $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
  }
  else {
    // find preTag and nextTag
    const currentIndex = tagList.findIndex((item: any) => item === currentTag)
    const prevTag = tagList[currentIndex - 1]
    const nextTag = tagList[currentIndex + 1]

    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

    if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth)
      $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
    else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft)
      $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
  }
}
defineExpose({
  moveToTarget,
})
</script>

<template>
  <el-scrollbar
    ref="scrollContainer"
    @wheel.native.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<style lang="scss" scoped>
</style>
