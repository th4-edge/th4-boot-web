<template>
  <div class="retro-navigation">
    <div class="navigation-header">
      <template v-if="slots['header']">
        <slot name="header"></slot>
      </template>
<!--      <template v-else>-->
<!--        {{title || '设置'}}-->
<!--      </template>-->
    </div>
    <template v-if="menus">
      <template v-for="item in menus">
        <nav-group-card  :menu="item"  @menu-click="fireMenuClick"/>
<!--        <div class="line"></div>-->
      </template>
    </template>
  </div>
</template>
<script setup lang="ts">
import {defineProps, useSlots} from "vue";
import NavGroupCard from "@/views/admin/components/layout/retro/container/view/navigation/card/NavGroupCard.vue";
defineProps<{
  role: th4.admin.system.Role,
  user: th4.admin.system.User,
  menus: th4.admin.system.Menu[],
  menu?: th4.admin.system.Menu
}>();
const emits=defineEmits<{'menu-click':[{icon:string,name:string,component?:any}]}>();
const fireMenuClick=(_menu:{icon:string,name:string,component?:any})=>{
  emits('menu-click',_menu)
}
const slots=useSlots();
</script>
<style scoped lang="scss">
.retro-navigation{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding:20px 16px;
  background: #FFFFFF;
  /* 边框色 */
  border-width: 0 1px 0 0;
  border-style: solid;
  border-color: #E4E4E4;
  .navigation-header{
    font-size: 20px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0;

    font-variation-settings: "opsz" auto;
    /* 主要文字 1F2D3D */
    color: #1F2D3D;
  }
  .nav-group-card{
    margin-top: 24px;
  }
  .line{
    width: 100%;
    height: 1px;
    background: #E4E4E4;
    margin-top: 24px;
  }
}
</style>