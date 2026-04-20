<template>
  <div class="classic-route-item">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue';

defineProps<{ key: string }>();
</script>
<style lang="scss" scoped>
.classic-route-item {
  height: 100%;
  width: 100%;
}
</style>