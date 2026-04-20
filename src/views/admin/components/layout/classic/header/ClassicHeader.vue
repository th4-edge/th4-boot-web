<template>
  <div class="classic-header">
    <div class="header-logo">
      <template v-if="slots['title']">
        <slot name="title"></slot>
      </template>
      <template v-else>
        <title-logo :user="props.user"
                    :role="props.role">
          <template v-if="$slots['logo']" #logo>
            <slot name="logo"></slot>
          </template>
        </title-logo>
      </template>

    </div>
    <div class="header-content">
      <slot name="header-content"/>
    </div>
    <div class="header-actions">
      <tool-bar :user="props.user" :menus="props.menus['Tool']"
                :role="props.role"/>

      <slot name="header-actions"></slot>

      <template v-if="slots['user-info']">
        <slot name="user-info"></slot>
      </template>
      <template v-else>
        <user-info :user="props.user" :menus="props.menus['User']"
                   :role="props.role">
          <template v-if="$slots['user-avatar']" #avatar>
            <slot name="user-avatar"></slot>
          </template>
        </user-info>
      </template>


    </div>
  </div>
</template>
<script lang="ts" setup>

import TitleLogo from "@/views/admin/components/layout/classic/header/logo/TitleLogo.vue";
import UserInfo from "@/views/admin/components/layout/classic/header/user/UserInfo.vue";
import ToolBar from "@/views/admin/components/layout/classic/header/tool-bar/ToolBar.vue";
// import UserMessage from "@/views/admin/components/layout/classic/header/message/UserMessage.vue";
import {useSlots} from "vue";

const props = defineProps<{
  menus: Record<string, th4.admin.system.Menu[]>,
  menu?: th4.admin.system.Menu,
  role: th4.admin.system.Role,
  user?: th4.admin.system.User
}>();
const slots=useSlots();
</script>
<style lang="scss" scoped>
.classic-header {
  width: 100%;
  height: 60px;
  overflow-x: hidden;
  -ms-overflow-y: hidden;
  overflow-y: hidden;
  background: var(--el-color-primary);
  border: none;
  border-radius: 0;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  display: flex;
  justify-content: start;
  align-items: center;
  padding-right: 40px;
  box-sizing: border-box;

  .header-logo {
    height: 100%;
  }

  .header-content {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
  }

  .header-actions {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .tool-bar {
      margin-right: 1px;
    }

    .user-message {
      margin-right: 10px;
    }
  }
}
</style>