<template>
  <div class="modern-navigation">
      <div class="modern-navigation-container">
        <template v-if="menus['Nav']">
          <template v-for="item  in menus['Nav']">
            <modern-menu :active="menu?.menuId==item.menuId" :menu="item" @menu-click="fireMenuClick"/>
          </template>
        </template>
      </div>
  </div>
</template>
<script setup lang="ts">

import ModernMenu from "@/views/admin/components/layout/modern/header/navigation/menu/ModernMenu.vue";

defineProps<{menus:Record<string, th4.admin.system.Menu[]>,menu:th4.admin.system.Menu}>();
const emits=defineEmits<{'menuClick':[th4.admin.system.Menu]}>();
const fireMenuClick=(menu:th4.admin.system.Menu)=>{
  emits('menuClick',menu)
}
</script>
<style scoped lang="scss">
.modern-navigation{
  width: 100%;
  height: 100%;
  .modern-navigation-container{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

}
</style>