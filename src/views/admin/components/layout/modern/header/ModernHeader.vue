
<template>
  <div class="modern-header">
    <title-logo :user="user" :role="role">
      <template v-if="$slots['logo']" #logo>
        <slot name="logo"></slot>
      </template>
    </title-logo>
    <modern-navigation :menus="menus" :menu="menu" @menu-click="fireMenuClick"/>
    <template v-if="$slots&&$slots['header-actions']">
      <slot name="header-actions"/>
    </template>
    <template v-if="$slots['user-info']">
      <slot name="user-info" :user="user" :menus="menus['User']"
            :role="role" v-bind="$attrs"></slot>
    </template>
    <template v-else>
      <user-info :user="user" :menus="menus['User']"
                 :role="role">
        <template v-if="$slots['user-avatar']" #avatar>
          <slot name="user-avatar"></slot>
        </template>
      </user-info>
    </template>
  </div>
</template>
<script lang="ts" setup>
import {defineProps} from "vue";
import ModernNavigation from "@/views/admin/components/layout/modern/header/navigation/ModernNavigation.vue";
import UserInfo from "@/views/admin/components/layout/classic/header/user/UserInfo.vue";
import TitleLogo from "@/views/admin/components/layout/classic/header/logo/TitleLogo.vue";

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
.modern-header {
  /* 自动布局 */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px; /* 纯白 */
  background: rgba(37, 97, 239, 1);
  box-sizing: border-box; /* 边框色 */
  border-width: 0 0 0 0;
  border-style: solid;
  border-color: #E4E4E4;
  gap: 40px;
  .logo{
    width: 420px;
    height: 100%;
    color: #FFFFFF;
  }
  .modern-navigation{
    flex: 1;
    height: 100%;
  }
  .user-info{
    color: #FFFFFF;
  }
}
</style>