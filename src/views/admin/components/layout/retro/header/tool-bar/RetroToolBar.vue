

<template>
  <div class="retro-tool-bar">
    <!-- <quick-start/> -->
    <template v-if="menus">
      <template v-for="item in menus['Tool']">
        <retro-tool-menu :menu="item" @menu-click="fireMenuClick"/>
      </template>
    </template>
  </div>
</template>
<script setup lang="ts">

import QuickStart from "@/views/admin/components/layout/retro/header/tool-bar/quick-start/QuickStart.vue";
import RetroToolMenu from "@/views/admin/components/layout/retro/header/tool-bar/menu/RetroToolMenu.vue";

defineProps<{menus:Record<string, th4.admin.system.Menu[]>,menu:th4.admin.system.Menu}>();

const emits=defineEmits<{'menuClick':[th4.admin.system.Menu]}>();
const fireMenuClick=(menu:th4.admin.system.Menu)=>{
  emits('menuClick',menu)
}
</script>
<style scoped lang="scss">
.retro-tool-bar{
  width: 200px;
  height: 100%;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>