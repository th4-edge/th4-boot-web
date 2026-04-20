<template>
  <div class="retro-container">
    <retro-navigation :role="role" :user="user" :menus="menus" :menu="menu" :class="{'retro-navigation-hidden':!menus||!menus.length}" @menu-click="fireMenuClick"/>
    <div class="retro-container-content">
      <router-view v-slot="{ Component }">
          <component :is="Component" ref="routedView" :menu="menu" :menus="menus" :role="role"
                     :user="user"
                     class="classic-view-slot" v-bind="$attrs"/>
      </router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import {defineProps} from "vue";
import RetroNavigation from "@/views/admin/components/layout/retro/container/view/navigation/RetroNavigation.vue";

defineProps<{
  role: th4.admin.system.Role,
  user: th4.admin.system.User,
  menus: th4.admin.system.Menu[],
  menu?: th4.admin.system.Menu
}>();
const fireMenuClick=(_menu:{icon:string,name:string,component?:any})=>{
  emits('menu-click',_menu)
}
</script>
<style scoped lang="scss">
.retro-container{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  .retro-navigation-hidden{
    width: 0;
  }
  .retro-navigation{
    width: 320px;
    height: 100%;
    transition: all .8s linear;
  }
  .retro-container-content{
    width: calc(100% - 320px);
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
  }
}
</style>