

<template>
  <div>
  <el-dropdown class="retro-user" @command="handleCommand" >
    <div class="retro-user-box">
      <div class="retro-user-name">
        <template v-if="user.username.length>=2">
          {{user.username.substring(0,2)}}
        </template>
        <template v-else-if="user.username.length==1">
          {{user.username.substring(0,1)}}
        </template>
        <template v-else>

        </template>
      </div>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <div class="user-dropdown-item">{{user.username}}</div>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <div class="user-dropdown-item">
            <x-icon name="account"/>
            <div class="text">
              账号管理
            </div>
          </div>
        </el-dropdown-item>
        <el-dropdown-item>
          <div class="user-dropdown-item">
            <x-icon name="user-info"/>
            <div class="text">
              个人信息
            </div>
          </div>
        </el-dropdown-item>
        <el-dropdown-item >
          <div class="user-dropdown-item">
            <x-icon name="password"/>
            <div class="text">
              修改密码
            </div>
          </div>
        </el-dropdown-item>
        <el-dropdown-item divided command="logout">
          <div class="user-dropdown-item">
            <x-icon name="logout"/>
            <div class="text">
              退出登录
            </div>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  </div>
</template>
<script lang="ts" setup>
import {ElDropdown,ElDropdownMenu,ElDropdownItem} from "element-plus";
import XIcon from "@/views/admin/components/icon/XIcon.vue";
import {useRouter} from "vue-router";

defineProps<{user: th4.admin.system.User,
  menus: Record<string, th4.admin.system.Menu[]>,
  role: th4.admin.system.Role
}>()
const router = useRouter();
const handleCommand=()=>{
  router.push('/login')
}
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
.retro-user {
  .retro-user-box {
    width: 40px;
    /* 自动布局 */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;

    .retro-user-name {
      width: 40px;
      height: 40px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background: #D1AF79;
      border-radius: 4px;
      color: #FFFFFF;
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0;
    }
  }
}
.user-dropdown-item {
  display: flex;
  align-items: center;
  width: 200px;
  height: 40px; /* 设置每个选项的高度 */
  line-height: 40px; /* 文字垂直居中 */
  font-size: 20px;
  color: #1F2D3D;
  .x-icon{
    font-size: 20px;
    color: #1F2D3D;
  }
  .text{
    margin-left: 20px;
    font-size: 14px;
  }
}
</style>