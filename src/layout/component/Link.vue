<template>
  <component
    :is="type"
    v-bind="linkProps(to)"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  to: {
      type: String,
      required: true
    }
});

const type = computed(() => {
  if (isExternal.value) {
    return 'a';
  }
  return 'router-link';
});
const isExternal = computed(() => {
  return /^(https?:|mailto:|tel:)/.test(props.to);
});


const linkProps = (to:any) => {
  if (isExternal.value) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener'
    };
  }
  return {
    to
  };
}

</script>
