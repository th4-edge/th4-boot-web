<template>
  <div class="user-menu-item" @click.stop="emit('menuClick', menu)">
    <div class="menu-icon">
      <template v-if="menu.icon">
        <x-icon :color="iconColor||'#333'" :name="menu.icon" />
      </template>
      <template v-else>
        <el-icon :color="iconColor||'#333'">
          <Document/>
        </el-icon>
      </template>
    </div>
    <div class="menu-name">{{ menu.name }}</div>
  </div>
</template>
<script lang="ts" setup>
import {defineEmits, defineProps} from "vue";
import {ElIcon} from "element-plus";
import XIcon from "@/views/admin/components/icon/XIcon.vue";

defineProps<{ menu: { name: string, icon?: string, path?: string }, iconColor?: string, iconSize?: number }>();
const emit = defineEmits<{ menuClick: [menu: { name: string, icon?: string, path?: string }] }>();
</script>
<style lang="scss" scoped>
.user-menu-item {
  width: 72px;
  height: 72px;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  font-style: normal;
  font-size: 12px;
  .menu-icon {
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }

  .menu-name {
    margin-top: 10px;

    text-align: center;
    color: #666;
    line-height: normal;
    letter-spacing: normal;
    word-wrap: break-word;
    text-transform: none;
  }

  &:hover {
    background-color: rgba(37, 97, 239, 0.07);
  }
}
</style>