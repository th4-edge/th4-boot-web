<template>
  <div class="fashion-header">
    <title-logo :user="user" :role="role">
      <template v-if="$slots['logo']" #logo>
        <slot name="logo"></slot>
      </template>
    </title-logo>
    <fashion-navigation :menus="menus" :menu="menu" @menu-click="fireMenuClick"/>
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
import TitleLogo from "@/views/admin/components/layout/classic/header/logo/TitleLogo.vue";
import UserInfo from "@/views/admin/components/layout/classic/header/user/UserInfo.vue";
import {defineProps} from "vue";
import FashionNavigation from "@/views/admin/components/layout/fashion/header/navigation/FashionNavigation.vue";


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

.fashion-header {
  --classic-layout-header-title-color : #FFFFFF;
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  padding: 0 24px;
  box-sizing: border-box;
  background: white linear-gradient(to right, oklch(0.546 0.245 262.881) 0%, oklch(0.627 0.194 149.214) 100%);
  .fashion-navigation{
    margin-left: 24px;
  }
}
</style>