

<template>
  <div class="logo">
    <div class="logo-text"></div>
  </div>
</template>
<script setup lang="ts">

</script>
<style scoped lang="scss">
.logo{
  width: 280px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .logo-text{
    background-image: url("/logo-text.png");
    background-repeat: no-repeat;
    background-size: contain;
    width: 172px;
    height: 48px;
  }
}
</style>