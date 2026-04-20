

<template>
  <div class="tool-menu" v-if="menu" @click.stop="fireMenuClick()">
    <x-icon :name="menu.icon"/>
  </div>
</template>
<script setup lang="ts">
import XIcon from "@/views/admin/components/icon/XIcon.vue";

const props=defineProps<{menu:th4.admin.system.Menu}>();
const emits=defineEmits<{'menuClick':[th4.admin.system.Menu]}>();
const fireMenuClick=()=>{
  emits('menuClick',props.menu)
}
</script>
<style scoped lang="scss">
.tool-menu{
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 20px;
  color: #4E5969;
  .x-icon{
    font-size: 20px;
  }
  &:hover{
    color: var(--el-color-primary)
  }
}
</style>