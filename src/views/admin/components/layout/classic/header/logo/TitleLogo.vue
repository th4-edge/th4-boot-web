<template>
  <div class="title-logo">
    <div class="logo-box">
    <template v-if="$slots['logo']">
      <slot name="logo"></slot>
    </template>
    <template v-else>
      <div class="logo"></div>
    </template>
    </div>
    <div class="title">
      {{ role.title }}
      <!--    OA办公后台管理系统-->
    </div>
  </div>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue';

defineProps<{ menu?: th4.admin.system.Menu, role: th4.admin.system.Role, user: th4.admin.system.User }>();

</script>
<style lang="scss" scoped>
.title-logo {
  height: 100%;
  display: flex;
  align-items: center;
  font-family: 'PingFangSC-Medium', 'PingFang SC Medium', 'PingFang SC', serif;
  gap: 10px;
  .logo-box {
    min-height: 32px;
    min-width: 32px;
    .logo {
      width: 32px;
      height: 32px;
      background-color: #FFFFFF;
      background-image: url("/logo.png");
      background-size: 32px 32px;
      background-repeat: no-repeat;
      background-position: left center;
    }
  }
  .title {
    font-style: normal;
    color: #FFFFFF;
    white-space: nowrap;
    text-transform: none;
    font-weight: 500;
    font-size: 18px;
    line-height: 32px;
  }
}
</style>