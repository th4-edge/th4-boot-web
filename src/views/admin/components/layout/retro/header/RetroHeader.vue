
<template>
  <div class="retro-header">
    <logo/>
    <retro-navigation :menus="menus" :menu="menu" @menu-click="fireMenuClick"/>
    <retro-tool-bar :menus="menus" :menu="menu" @menu-click="fireMenuClick"/>
    <retro-user :user="user" :menus="menus" :role="role"/>
  </div>
</template>
<script lang="ts" setup>

import Logo from "@/views/admin/components/layout/retro/header/logo/Logo.vue";
import RetroNavigation from "@/views/admin/components/layout/retro/header/navigation/RetroNavigation.vue";
import RetroToolBar from "@/views/admin/components/layout/retro/header/tool-bar/RetroToolBar.vue";
import RetroUser from "@/views/admin/components/layout/retro/header/user/RetroUser.vue";
import {defineProps} from "vue";

defineProps<{
  role: th4.admin.system.Role,
  user: th4.admin.system.User,
  menus: Record<string, th4.admin.system.Menu[]>,
  menu?: th4.admin.system.Menu
}>();
const emits=defineEmits<{'menuClick':[th4.admin.system.Menu]}>();
const fireMenuClick=(menu:th4.admin.system.Menu)=>{
  emits('menuClick',menu)
}
</script>

<style lang="scss" scoped>
.retro-header {
  /* 自动布局 */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px; /* 纯白 */
  background: #FFFFFF;
  box-sizing: border-box; /* 边框色 */
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: #E4E4E4;
  .logo{
    height: 100%;
  }
  .retro-navigation{
    flex: 1;
    height: 100%;
  }
}
</style>