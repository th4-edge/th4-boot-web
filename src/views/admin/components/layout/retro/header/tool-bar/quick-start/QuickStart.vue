<template>
  <div class="quick-start">
    <div class="icon"></div>
    <div class="text">开始使用</div>
  </div>
</template>
<script lang="ts" setup>

</script>
<style lang="scss" scoped>
.quick-start {
  width: 130px;
  height: 40px;
  border-radius: 4px;
  /* 自动布局 */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  gap: 10px; /* 背景色 */
  background: #F5F7FA;
  box-sizing: border-box; /* 边框色 */
  border: 1px solid #E4E4E4;
  cursor: pointer;

  .icon {
    width: 20px;
    height: 20px;
    background-image: url("/theme/icon/quick-start.png");
    background-size: cover;
    background-position: center;
  }

  .text {
    width: 80px;
    height: 20px;
    font-size: 18px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0;
    color: #4E5969;
  }
}
</style>