<template>
  <div class="classic-navigation">
    <template v-if="$slots['menu']">
      <div class="menu-container">
        <slot :menus="menus" :role="role" name="menu" v-bind="$attrs" :menuClick="menuClick"></slot>
      </div>
    </template>
    <template v-else>
      <el-scrollbar>
        <el-menu
            ellipsis
            theme="dark"
            unique-opened
            @select="menuSelect"
        >
          <template v-for="(menu,index) in menus.sort((a,b) => {
          if(a.priority === b.priority){
            return a.menuId-b.menuId;
          }
          return a.priority - b.priority;
        })" :key="menu.menuId">
            <basic-menu :index="index" :menu="menu" :role="role" root @menuClick="menuClick"/>
          </template>
        </el-menu>
      </el-scrollbar>
    </template>

  </div>
</template>
<script lang="ts" setup>
import {ElMenu, ElScrollbar} from 'element-plus'
import BasicMenu from "@/views/admin/components/layout/classic/navigation/menu/BasicMenu.vue";
import {defineEmits, defineProps, onMounted} from 'vue';

const props = defineProps<{
  collapsed?: boolean,
  role: th4.admin.system.Role,
  menus: th4.admin.system.Menu[],
  menu?: th4.admin.system.Menu
}>();
const emit = defineEmits<{ menuClick: [menu: th4.admin.system.Menu] }>();
const menuClick = (menu: th4.admin.system.Menu) => {

  emit('menuClick', menu);
}
const menuSelect = (index: any) => {
  try {
    outer:for (const menu of props.menus) {
      if (menu.menuId == parseInt(index)) {
        emit('menuClick', menu);
        break;
      } else {
        if (menu.children) {
          for (const item of menu.children) {
            if (item.menuId == parseInt(index)) {
              emit('menuClick', item);
              break outer;
            }
          }
        }
      }


    }
  } catch (e) {
    //
  }
}
onMounted(() => {
  if (!props.menu) {
    if (props.menus && props.menus.length > 0) {
      const firstMenu = props.menus.sort((b, a) => a.priority - b.priority)[0];
      if (firstMenu.children && firstMenu.children.length > 0) {
        menuClick(firstMenu.children[0])
      } else if (firstMenu.path) {
        menuClick(firstMenu)
      }
    }
  }
})
</script>
<style lang="scss" scoped>
.classic-navigation {
  padding: 20px 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: var(--el-bg-color);

  .menu-container {
    width: 100%;
    height: 100%;
  }

  .el-menu {
    //--el-menu-item-font-size: 13px;
    //--el-menu-item-height: 36px;
    width: 100%;
    height: 100%;
    background: var(--el-bg-color);
    border-right: none;
    transition: background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

    .el-menu-item .is-active {
      background-color: var(--el-color-primary);
      color: #FFFFFF;
      //border-radius: var(--el-border-radius-base);
    }

    .el-sub-menu .el-menu-item {
      font-weight: 500;
    }

    .el-sub-menu .el-sub-menu__icon-arrow {
      color: var(--el-color-primary);
    }

    :deep(.el-sub-menu__title) {
      font-weight: 500;
    }


  }

  .span-text {
    overflow: hidden; /* 确保超出容器的文本被裁剪 */
    white-space: nowrap; /* 确保文本在一行内显示 */
    text-overflow: ellipsis;
  }

}
</style>