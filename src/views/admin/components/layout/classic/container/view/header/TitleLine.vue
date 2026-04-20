<template>
  <div class="title-line">
    <div class="title-line__title">
      <div class="icon"></div>
      <div class="title">{{ title }}</div>
    </div>
    <div class="title-line__line">
      <div class="line"></div>
    </div>
    <div class="title-line__slot">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps<{ title: string }>()
</script>
<style lang="scss" scoped>
.title-line {
  width: 100%;
  display: flex;
  box-sizing: border-box;

  .title-line__title {
    // width:160px;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: flex-end;

    .icon {
      width: 6px;
      height: 16px;
      background: inherit;
      background-color: var(--el-color-primary);
      border: none;
      border-radius: 8px;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
    }

    .title {
      margin-left: 10px;
      margin-right: 10px;
      white-space: nowrap;
      text-transform: none;
      font-weight: 500;
      font-style: normal;
      font-size: 15px;
      color: rgba(51, 51, 51, 0.898039215686275);
    }
  }

  .title-line__line {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    .line {
      width: 100%;
      height: 1px;
      background-color: var(--el-border-color);
    }
  }
}
</style>