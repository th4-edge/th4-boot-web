

<template>
  <div class="retro-navigation">
    <div class="retro-menu-container">
      <template v-if="menus['Nav']">
        <template v-for="item  in menus['Nav']">
          <retro-menu :active="menu?.menuId==item.menuId" :menu="item" @menu-click="fireMenuClick"/>
        </template>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import RetroMenu from "@/views/admin/components/layout/retro/header/navigation/menu/RetroMenu.vue";
defineProps<{menus:Record<string, th4.admin.system.Menu[]>,menu:th4.admin.system.Menu}>();
const emits=defineEmits<{'menuClick':[th4.admin.system.Menu]}>();
const fireMenuClick=(menu:th4.admin.system.Menu)=>{
  emits('menuClick',menu)
}
</script>
<style scoped lang="scss">
.retro-navigation{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .retro-menu-container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
    overflow: auto;
  }
}
</style>