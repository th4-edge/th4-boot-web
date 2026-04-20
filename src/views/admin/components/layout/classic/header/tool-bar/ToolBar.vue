<template>
  <div class="tool-bar">
    <template v-for="menu in props.menus">
      <tool-menu :menu="menu" @menu-click="menuClick"/>
    </template>
  </div>
</template>
<script lang="ts" setup>
import ToolMenu from "@/views/admin/components/layout/classic/header/tool-bar/menu/ToolMenu.vue";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";

const props = defineProps<{ menus?: th4.admin.system.Menu[], role: th4.admin.system.Role, user: th4.admin.system.User }>();
const router = useRouter();
const menuClick = (menu: th4.admin.system.Menu) => {
  if (menu.path) {
    router.push(menu.path);
  } else {
    ElMessage.warning('该功能暂未开放，稍后管理人员会进行升级完善。');
  }
}
</script>
<style lang="scss" scoped>
.tool-bar {
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>