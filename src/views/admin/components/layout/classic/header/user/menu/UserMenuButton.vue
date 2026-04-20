<template>
  <div class="user-menu-button" @click="menuClick()">
    <div class="user-menu-button-icon">
      <x-icon :name="menu.icon"/>
    </div>
    <div class="user-menu-button-text">
      {{ menu.name }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import {defineEmits, defineProps} from 'vue';
import XIcon from "@/views/admin/components/icon/XIcon.vue";

const props = defineProps<{ menu: { name: string, icon?: string, path?: string } }>();
const emit = defineEmits<{ menuClick: [menu: { name: string, icon?: string, path?: string }] }>();
const menuClick = () => {
  emit('menuClick', props.menu);
}
</script>
<style lang="scss" scoped>
.user-menu-button {
  box-sizing: border-box;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 4px;
  cursor: pointer;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 400;
  .user-menu-button-icon {
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user-menu-button-text {
    margin-left: 4px;
    line-height: 24px;

  }

  &:hover {
    background-color: rgba(37, 97, 239, 0.03);
  }
}
</style>