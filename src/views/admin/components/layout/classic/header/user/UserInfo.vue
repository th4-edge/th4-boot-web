<template>
  <div class="user-info" @click.stop="userMenuClick">
    <div class="user-avatar">
      <template v-if="$slots['avatar']">
        <slot name="avatar"></slot>
      </template>
      <template v-else>
        <el-image :src="avatar" fit="cover"/>
      </template>

    </div>
    <div class="user-name">
      {{ props.user.username }}
    </div>
    <div class="user-more">
      <div class="user-more-icon">
        <el-icon>
          <CaretBottom/>
        </el-icon>
      </div>
    </div>
    <div ref="userMenu" class="user-menu-container">
      <user-menu v-if="userMenuVisible" :user="props.user" :menus="props.menus" :role="props.role"
                 @hide="hideUserMenu" @click.stop="()=>{}">
        <template v-if="$slots['avatar']" #avatar>
          <slot name="avatar" class="el-image"></slot>
        </template>
      </user-menu>
    </div>
  </div>
</template>
<script lang="ts" setup>
import avatar from '/public/logo.png';
import {nextTick, onMounted, onUnmounted, ref} from 'vue';
import {ElIcon, ElImage} from 'element-plus';
import UserMenu from "@/views/admin/components/layout/classic/header/user/menu/UserMenu.vue";

const userMenu = ref<HTMLDivElement>();
const userMenuVisible = ref<boolean>(false);
const props = defineProps<{ menus?: th4.admin.system.Menu[], role: th4.admin.system.Role, user: th4.admin.system.User }>();

const userMenuClick = () => {
  if (!userMenuVisible.value) {
    userMenuVisible.value = true;
    nextTick().then(() => {
      userMenu.value && userMenu.value.classList.remove('user-menu-hidden');
      userMenu.value && userMenu.value.classList.add('user-menu-show');
    })
  } else {
    userMenu.value && userMenu.value.classList.remove('user-menu-show');
    userMenu.value && userMenu.value.classList.add('user-menu-hidden');
    nextTick().then(() => {
      userMenuVisible.value = false;
    })
  }
}
const hideUserMenu = () => {
  if (userMenuVisible.value) {
    userMenu.value && userMenu.value.classList.remove('user-menu-show');
    userMenu.value && userMenu.value.classList.add('user-menu-hidden');
    nextTick().then(() => {
      userMenuVisible.value = false;
    })
  }
}
onMounted(() => {
  window.addEventListener('click', hideUserMenu)
})
onUnmounted(() => {
  window.removeEventListener('click', hideUserMenu)
})
</script>
<style lang="scss" scoped>
.user-info {
  display: flex;
  align-items: center;
  justify-content: center;
  //position: relative;
  box-sizing: border-box;
  cursor: pointer;
  padding: 20px;
  color: var(--classic-layout-header-title-color);
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;

    :deep(.el-image) {
      width: 28px;
      height: 28px;
      border-radius: 50%;
    }
  }

  .user-name {
    width: 100px;
    height: 100%;
    font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC', serif;
    font-weight: 650;
    font-style: normal;
    border-width: 0;
    white-space: nowrap;
    text-transform: none;
    font-size: 18px;
    line-height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user-more {
    width: 40px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    .user-more-icon {
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .user-menu-container {
    position: absolute;
    cursor: default;
    top: 70px;
    right: 30px;
    width: 300px;
    height: 0;
    opacity: 0;
    box-sizing: border-box;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    border-style: solid;
    border-color: rgba(228, 228, 228, 1);
    border-radius: 8px;
    -moz-box-shadow: 0 5px 15px rgba(228, 228, 228, 1);
    -webkit-box-shadow: 0 5px 15px rgba(228, 228, 228, 1);
    box-shadow: 0 5px 15px rgba(228, 228, 228, 1);
    letter-spacing: normal;
    color: #333333;
    text-align: center;
    line-height: normal;
    text-transform: none;
    z-index: 1000;
  }

  .user-menu-hidden {
    animation: hide-animation 0.3s forwards;
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

  .user-menu-show {
    animation: show-animation 0.3s forwards;
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