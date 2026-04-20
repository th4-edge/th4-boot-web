<template>
    <template v-if="menu.children&&menu.children.length>0">
      <el-sub-menu :index="menu.menuId+'sub'"  class="sub-menu">
        <template #title>
          <template v-if="menu.icon">
            <x-icon :name="menu.icon"/>
          </template>
          <template v-else>
            <el-icon>
              <Menu/>
            </el-icon>
          </template>
          <span class="span-text">
            <template v-if="role.serial">
            {{index+1}}、
            </template>
            {{ menu.name }}</span>
        </template>
        <template v-for="(item,index) in menu.children.sort((a,b ) => {
          if(a.priority === b.priority){
            return a.menuId-b.menuId;
          }
          return a.priority - b.priority;
        })">
          <basic-menu :menu="item" :index="index" @menu-click="menuClick" :role="role"/>
        </template>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :index="menu.menuId+'-'+index">
        <template #title>
          <template v-if="menu.icon">
            <x-icon :name="menu.icon"/>
          </template>
          <template v-else>
            <el-icon><Document /></el-icon>
          </template>
          <span class="span-text">
            <template v-if="role.serial">
            {{index+1}}、
            </template>
            {{ menu.name }}</span>
        </template>
      </el-menu-item>
    </template>
</template>
<script lang="ts" setup>
import {ElIcon, ElMenuItem, ElSubMenu} from 'element-plus'
import XIcon from "@/views/admin/components/icon/XIcon.vue";

defineProps<{
  menu: th4.admin.system.Menu,
  root?:boolean,
  index:number,
  role:th4.admin.system.Role,
}>();
const emit = defineEmits<{ 'menu-click': [menu: th4.admin.system.Menu] }>();
const menuClick = (menu: th4.admin.system.Menu) => {
  emit('menu-click', menu)
  return false
}
</script>
<style lang="scss" scoped>

  //.sub-menu {
  //  color: #2561EF;
  //}

  :deep(.el-menu-item.is-active) {
    background-color: var(--el-color-primary);
    color: #FFFFFF;
    //border-radius: var(--el-border-radius-base);
  }

  :deep(.el-sub-menu__title) {
    font-weight: 500;
  }


  .span-text {
    overflow: hidden; /* 确保超出容器的文本被裁剪 */
    white-space: nowrap; /* 确保文本在一行内显示 */
    text-overflow: ellipsis;
    font-size: 14px;
    color: inherit;
  }

</style>