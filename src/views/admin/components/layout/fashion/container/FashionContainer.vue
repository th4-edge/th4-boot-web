<template>
  <div class="fashion-container">
    <div ref="classicViewContent" class="fashion-view-content">
      <template v-if="$slots['component']">
        <slot name="component" v-bind="$attrs"></slot>
      </template>
      <template v-else>
        <router-view v-slot="{ Component }">
          <component :is="Component" ref="routedView" :menu="menu" :menus="menus" :role="role"
                     :root-menu="rootMenu" :user="user"
                     class="classic-view-slot" v-bind="$attrs"/>
        </router-view>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>

import {defineProps} from "vue";

defineProps<{
  layoutConfig:{header:{height:number},navigation:{width:number,minWidth:number,maxWidth:number},split:{width:number},container:{showIndicator:boolean}}
  role: th4.admin.system.Role,
  user: th4.admin.system.User,
  menus: Record<string, th4.admin.system.Menu[]>,
  menu?: th4.admin.system.Menu,
  rootMenu?: th4.admin.system.Menu
}>();
</script>
<style lang="scss" scoped>
.fashion-container {
  width: 100%;
  height: 100%;
  background: #f9fafb;
  overflow-y: auto;
  box-sizing: border-box;

  .fashion-view-content {
    width: 100%;
    height: 100%;
    border: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    box-sizing: border-box;
    .classic-view-slot {
      width: 100%;
      height: 100%;
    }
  }
}
</style>