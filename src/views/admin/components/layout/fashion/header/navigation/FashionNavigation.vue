<template>
  <div class="fashion-navigation">
      <div class="fashion-navigation-container">
        <template v-if="menus['Nav']">
          <template v-for="item  in menus['Nav']">
            <fashion-menu :active="menu?.menuId==item.menuId" :menu="item" @menu-click="fireMenuClick"/>
          </template>
        </template>
      </div>
  </div>
</template>
<script setup lang="ts">
import FashionMenu from "@/views/admin/components/layout/fashion/header/navigation/menu/FashionMenu.vue";

defineProps<{menus:Record<string, th4.admin.system.Menu[]>,menu:th4.admin.system.Menu}>();
const emits=defineEmits<{'menuClick':[th4.admin.system.Menu]}>();
const fireMenuClick=(menu:th4.admin.system.Menu)=>{
  emits('menuClick',menu)
}
</script>
<style scoped lang="scss">
.fashion-navigation{
  width: 100%;
  height: 100%;
  .fashion-navigation-container{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

}
</style>