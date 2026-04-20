<template>
  <div :class="{active: selected}" class="icon-menu" @click="menuClick">
    <div class="icon-menu-image">
      <div class="image-wrapper">
        <slot name="icon"/>
      </div>
    </div>
    <div class="icon-menu-text">
      {{ text }}
    </div>
    <div class="icon-menu-block"></div>
    <div ref="menuList" class="icon-menu-list">
      <slot name="menu-list"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {defineEmits, defineProps, nextTick, ref} from 'vue';

defineProps<{ text: string, selected?: boolean }>();
defineEmits<{ showMenuList: [boolean] }>()

const menuList = ref<HTMLDivElement | undefined>();
const iconMenuListVisible = ref(false);
const menuClick = () => {
  if (!iconMenuListVisible.value) {
    iconMenuListVisible.value = true;
    nextTick().then(() => {
      menuList.value && menuList.value.classList.remove('icon-menu-list-hidden');
      menuList.value && menuList.value.classList.add('icon-menu-list-show');
    })
  } else {
    menuList.value && menuList.value.classList.remove('icon-menu-list-show');
    menuList.value && menuList.value.classList.add('icon-menu-list-hidden');
    nextTick().then(() => {
      iconMenuListVisible.value = false;
    })
  }
}
</script>
<style lang="scss" scoped>
.active {
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
}

.icon-menu {
  width: 100px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-family: 'PingFangSC-Medium', 'PingFang SC Medium', 'PingFang SC', serif;
  font-weight: 500;
  font-style: normal;
  color: #FFFFFF;
  line-height: 20px;
  border-width: 3px;
  margin-right: 16px;
  margin-left: 16px;

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
  }

  .icon-menu-image {
    height: 32px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .image-wrapper {
      width: 20px;
      height: 20px;
    }
  }

  .icon-menu-text {
    width: 100%;
    height: 24px;
    font-size: 14px;
    text-align: center;
    font-weight: 500;
    font-style: normal;
    color: #FFFFFF;
    line-height: 20px;
    word-wrap: break-word;
    text-transform: none;
  }

  .icon-menu-block {
    flex: 4;
    width: 100%;
  }

  .icon-menu-list {
    position: absolute;
    top: 70px;
    width: 480px;
    height: 0;
    opacity: 0;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(228, 228, 228, 1);
    border-radius: 10px;
    -moz-box-shadow: 0 10px 30px rgba(228, 228, 228, 1);
    -webkit-box-shadow: 0 10px 30px rgba(228, 228, 228, 1);
    box-shadow: 0 10px 30px rgba(228, 228, 228, 1);
    letter-spacing: normal;
    color: #333333;
    text-align: center;
    line-height: normal;
    text-transform: none;
    z-index: 1000;
  }

  .icon-menu-list-hidden {
    animation: hide-animation 0.5s forwards;
    @keyframes hide-animation {
      from {
        opacity: 1;
        height: 400px;
        border-width: 1px;
      }
      to {
        border-width: 0;
        opacity: 0;
        height: 0;
        visibility: hidden;
      }
    }
  }

  .icon-menu-list-show {
    animation: show-animation 0.5s forwards;
    @keyframes show-animation {
      from {
        height: 0;
        opacity: 0;
        border-width: 0;
      }
      to {
        opacity: 1;
        height: 400px;
        border-width: 1px;
        visibility: visible;
      }
    }
  }
}
</style>