<template>
  <div class="fashion-split" @mousedown="handleMouseDown"></div>
</template>
<script lang="ts" setup>

const emit=defineEmits<{
  (e: 'mousedown'): void;
}>();

const handleMouseDown = () => {
  emit('mousedown');
};
</script>
<style lang="scss" scoped>
.fashion-split {
  width: 100%;
  height: 100%;
  background: #e5e7eb;
  cursor: col-resize;
  transition: background 0.3s ease;
  
  &:hover {
    background: #d1d5db;
  }
  
  &:active {
    background: #9ca3af;
  }
}
</style>