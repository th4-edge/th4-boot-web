

<template>
  <div class="modern-container">
    <div class="modern-nav" :class="{'classic-navigation-hidden':!menus||!menus.length}">
      <classic-navigation  v-if="menus&&menus.length" :role="role" :menus="menus" :user="user" :menu="menu" @menu-click="handleMenuClick"/>
    </div>
    <div class="modern-container-content" :class="{'modern-container-content-padding':menus&&menus.length}">
      <template v-if="$slots['component']">
        <slot name="component" v-bind="$attrs"/>
      </template>
      <template v-else>
        <router-view v-slot="{ Component }">
          <component :is="Component" ref="routedView" :menu="menu" :menus="menus" :role="role"
                     :user="user"
                     class="classic-view-slot" v-bind="$attrs"/>
        </router-view>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import {defineProps} from "vue";
import ClassicNavigation from "@/views/admin/components/layout/classic/navigation/ClassicNavigation.vue";

defineProps<{
  role: th4.admin.system.Role,
  user: th4.admin.system.User,
  menus?: Record<string, th4.admin.system.Menu[]>,
  menu?: th4.admin.system.Menu
}>();
const emits=defineEmits<{'menuClick':[th4.admin.system.Menu]}>();

const handleMenuClick=(menu: th4.admin.system.Menu)=>{
  emits('menuClick', menu);
}
</script>
<style scoped lang="scss">
.modern-container{
  display: flex;
  .classic-navigation-hidden{
    width: 0;
  }
  .classic-navigation{
    width: 260px;
    background-color: #FFFFFF;
    transition: all .8s linear;
    :deep(.el-menu-item.is-active ){
      background-color: var(--el-color-primary);
      color: #FFFFFF;
      //border-radius: var(--el-border-radius-base);
    }
  }
  .modern-container-content{
    flex: 1;
    height: 100%;
    border-left: 2px solid rgba(242, 243, 245, 1);
    background-color: rgba(242, 243, 245, 1);
    box-sizing: border-box;
    overflow: auto;
    .classic-view-slot{
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }
  }
  .modern-container-content-padding{
    padding: 20px;
  }
}
</style>