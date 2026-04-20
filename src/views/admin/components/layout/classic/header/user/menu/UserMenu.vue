<template>
  <div v-if="user" class="user-menu">
    <div class="user-menu-header">
      <div class="user-menu-avatar">
        <div class="image-wrapper">
          <template v-if="$slots['avatar']">
            <slot name="avatar" class="el-image"></slot>
          </template>
          <template v-else>
            <el-image :src="avatar" fit="cover"/>
          </template>
        </div>
      </div>
      <div class="user-menu-info">
        <div class="user-menu-nick-name">{{ user.username }}</div>
        <div class="user-menu-role-name">
          <el-icon>
            <User/>
          </el-icon>
          <span class="user-menu-role-name-text">{{ role.name }}</span>
        </div>
        <div class="user-menu-tel-no">
          <el-icon>
            <Iphone/>
          </el-icon>
          <span class="user-menu-tel-no-text"></span>
        </div>
        <div class="user-menu-email">
          <el-icon>
            <Message/>
          </el-icon>
          <span class="user-menu-email-text"></span>
        </div>
      </div>
    </div>
    <div class="user-menu-content">
      <div class="setting-container" @click.stop="handleMenuClick({name:'个人设置',icon:'Setting',path:'mine-setting'})">
        <el-icon>
          <Setting/>
        </el-icon>
      </div>
      <el-scrollbar>
        <div class="user-menu-item-container">
          <user-menu-item :menu="{name:'个人中心',icon:'User',path:'mine-info'}" @menu-click="handleMenuClick"/>
          <user-menu-item :menu="{name:'修改密码',icon:'Lock',path:'reset-password'}" @menu-click="handleMenuClick"/>
          <user-menu-item :menu="{name:'退出登录',icon:'SwitchButton',path:'/logout'}" @menu-click="handleMenuClick"/>
        </div>
      </el-scrollbar>
    </div>
    <div class="user-menu-footer">
      <user-menu-button :menu="{name:'App下载',icon:'Download'}" @menu-click="handleMenuClick"/>
      <user-menu-button :menu="{name:'更新说明',icon:'Bell'}" @menu-click="handleMenuClick"/>
      <user-menu-button :menu="{name:'关于系统',icon:'Warning',path:'about'}" @menu-click="handleMenuClick"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import avatar from '/public/logo.png';
import {defineEmits, defineProps} from 'vue';
import {useRouter} from 'vue-router';
import {ElIcon, ElImage, ElScrollbar} from 'element-plus';
import UserMenuItem from "@/views/admin/components/layout/classic/header/user/menu/UserMenuItem.vue";
import UserMenuButton from "@/views/admin/components/layout/classic/header/user/menu/UserMenuButton.vue";

const props=defineProps<{ user: th4.admin.system.User, role: th4.admin.system.Role, menus?: th4.admin.system.Menu[] }>();
const emit = defineEmits<{ hide: [] }>();
const router = useRouter();
const handleMenuClick = (menu: { name: string, icon?: string, path?: string }) => {
  if (menu.path) {
    if(menu.path.startsWith('/')){
      router.push(menu.path)
    }else{
      router.push(props.role.home.concat("/").concat(menu.path));
    }
  } else {
    // ElMessage.warning('该功能暂未开放，稍后管理人员会进行升级完善。');
  }
  emit('hide');
}
</script>
<style lang="scss" scoped>
.user-menu {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .user-menu-header {
    display: flex;
    background: var(--el-color-primary);
    padding: 10px;

    .user-menu-avatar {
      width: 120px;
      height: 120px;
      display: flex;
      justify-content: center;
      align-items: center;

      .image-wrapper {
        width: 72px;
        height: 72px;
        border: 3px solid #fff;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;

        :deep(.el-image) {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background-color: #FFFFFF;
        }
      }
    }

    .user-menu-info {
      flex: 1;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      margin-left: 10px;
      padding-right: 15px;

      .user-menu-real-name {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .user-menu-nick-name {
        margin-top: 8px;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .user-menu-role-name {
        margin-top: 8px;
        font-size: 12px;
        line-height: 14px;

        .el-icon {
          font-size: 12px;
        }

        .user-menu-role-name-text {
          margin-left: 2px;
          min-width: 100px;
        }
      }

      .user-menu-tel-no {
        margin-top: 8px;
        font-size: 12px;
        line-height: 14px;

        .el-icon {
          font-size: 12px;
        }

        .user-menu-tel-no-text {
          margin-left: 2px;
          min-width: 100px;
        }
      }

      .user-menu-email {
        margin-top: 4px;
        font-size: 12px;
        line-height: 14px;

        .el-icon {
          font-size: 12px;
        }

        .user-menu-email-text {
          margin-left: 2px;
          min-width: 120px;
        }
      }
    }
  }

  .user-menu-content {
    position: relative;
    padding-left: 10px;
    padding-top: 40px;
    height: calc(100% - 140px - 48px - 40px);

    .setting-container {
      position: absolute;
      top: -24px;
      right: 20px;
      width: 48px;
      height: 48px;
      background-color: #fff;
      border-radius: 50%;
      box-shadow: var(--el-border-color) 0 0 4px 0;
      display: flex;
      align-items: center;
      justify-content: center;

      .el-icon {
        font-size: 20px;
        font-weight: lighter;
        color: #888;
      }

      &:hover {
        cursor: pointer;
        box-shadow: var(--el-border-color) 0 0 8px 0;

        .el-icon {
          font-size: 24px;
        }
      }
    }

    .user-menu-item-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;

      .user-menu-item {
        margin-left: 15px;
        margin-bottom: 10px;
      }
    }
  }

  .user-menu-footer {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #999;
  }
}
</style>