<template>
  <div class="title-header">
    <div class="title-header-title">
      <div class="title-header-icon"></div>
      <div class="title-header-text">{{ title }}</div>
    </div>
    <div class="title-header-content">
      <slot/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue';

defineProps<{ title: string }>();
</script>
<style lang="scss" scoped>
.title-header {
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  border-bottom: 1px solid rgba(229, 231, 235);

  .title-header-title {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .title-header-icon {
      width: 6px;
      height: 100%;
      background: inherit;
      background-color: var(--el-color-primary);
      border: none;
      border-radius: 8px;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
    }

    .title-header-text {
      margin-left: 10px;
      font-size: 18px;
      font-weight: 500;
      font-style: normal;
      color: #333333;
    }
  }

  .title-header-content {
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 20px;
  }
}
</style>