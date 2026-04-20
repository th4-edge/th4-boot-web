

<template>
  <div class="classic-box">
    <div class="classic-box-header">
      <div v-if="title" class="classic-title">{{title}}</div>
      <div class="classic-tool-bar">
        <slot name="tool-bar"></slot>
      </div>
    </div>
    <div class="classic-box-content">
      <slot/>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title?:string
}>();
</script>
<style scoped lang="scss">
.classic-box{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 20px;
  .classic-box-header{
    width: 100%;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .classic-title{
      font-size: 18px;
      font-weight: bold;
      line-height: 20px;
    }
  }
  .classic-box-content{
    padding-top: 10px;
    box-sizing: border-box;
    font-size: 14px;
    width: 100%;
    height: calc(100% - 40px );
  }
}
</style>