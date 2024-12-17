<template>
  <router-link v-bind="linkProps()">
    <slot />
  </router-link>
</template>

<script setup>
const props = defineProps({
  to: {
    type: String,
    required: true
  }
})
function linkProps() {
  return {
    to: props.to
  }
}
</script>