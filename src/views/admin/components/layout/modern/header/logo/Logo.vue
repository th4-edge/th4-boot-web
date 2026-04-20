

<template>
  <div class="logo">
    <div class="title">{{role.title}}</div>
  </div>
</template>
<script setup lang="ts">
defineProps<{role:th4.admin.system.Role}>()
</script>
<style scoped lang="scss">
.logo{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  .title{
    font-weight: bold;
    font-size: 28px;
  }
}
</style>