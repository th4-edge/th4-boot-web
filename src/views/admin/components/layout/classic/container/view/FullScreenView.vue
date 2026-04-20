<template>
  <div class="full-screen-view" :class="{'full-screen':fullScreen}">
    <slot/>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  fullScreen?: boolean
}>()
</script>
<style lang="scss" scoped>
.full-screen-view {
  width: 100%;
  height: 100%;
}
.full-screen{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: white;
}
</style>