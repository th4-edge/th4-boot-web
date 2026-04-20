<template>
  <div v-if="menu" class="tool-menu" @click.stop="emit('menuClick',menu)">
    <div class="tool-menu-icon">
<!--      <x-icon :name="menu.icon" :size="18"/>-->
    </div>
    <div class="tool-menu-text">{{ menu.name }}</div>
  </div>
</template>
<script lang="ts" setup>
import {defineEmits, defineProps} from "vue";

defineProps<{ menu: { name: string, icon?: string, path?: string } }>();
const emit = defineEmits<{ menuClick: [menu: { name: string, icon?: string, path?: string }] }>();
</script>

<style lang="scss" scoped>
.tool-menu {
  width: 72px;
  height: 100%;
  color: #fff;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 3px;
  border-left: 0;
  border-top: 0;
  border-right: 0;
  box-sizing: border-box;
  margin-right: 10px;
  padding-top: 10px;

  .tool-menu-icon {

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tool-menu-text {
    display: block;
    font-size: 10px;
    text-align: center;
    font-weight: 400;
    font-style: normal;
    color: #FFFFFF;
    line-height: 20px;
    word-wrap: break-word;
    text-transform: none;

  }

  &:hover {
    background-color: rgba(0, 51, 204, 0.498039215686275);
    border-style: solid;
    border-color: rgba(255, 255, 255, 1);
    border-top-color: rgb(255, 255, 255);
    border-right-color: rgb(255, 255, 255);
    border-left-color: rgb(255, 255, 255);
    border-left: 0;
    border-top: 0;
    border-right: 0;
    border-radius: 0;

    .tool-menu-text {
      display: block;
    }
  }
}
</style>