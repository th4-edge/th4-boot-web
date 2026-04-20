<template>
  <div class="classic-layout">
    <el-watermark v-if="adminSystemStore.role" :content="adminSystemStore.role.watermark||'th4 Admin'" :font="{color: 'rgba(167, 149, 149, 0.15)'}" class="watermark">
      <div class="classic-layout-container">
        <classic-header ref="layoutHeader" :user="adminSystemStore.user" :menu="menu" :menus="adminSystemStore.menus"
                        :role="adminSystemStore.role">
          <template v-if="slots['title']" #title>
            <slot name="title"></slot>
          </template>
          <template v-if="slots['logo']" #logo>
            <slot name="logo"></slot>
          </template>
          <template v-if="slots['user-info']" #user-info>
              <slot name="user-info"></slot>
            </template>
            <template v-if="slots['header-actions']" #header-actions>
              <slot name="header-actions"></slot>
            </template>
          <template v-if="$slots['user-avatar']" #user-avatar>
            <slot name="user-avatar"></slot>
          </template>
        </classic-header>
        <div ref="layoutContent" class="classic-content" @mousemove="splitMove" @mouseup="splitUp">
          <classic-navigation ref="layoutNavigation" :user="adminSystemStore.user" :menu="menu"
                              :menus="adminSystemStore.menus['Nav']||[]"
                              :role="adminSystemStore.role" @menu-click="handleMenuClick">
            <template v-if="slots['menu']" #menu="{role,menus,menuClick}">
              <slot name="menu" :menus="menus" :role="role" :menuClick="menuClick"></slot>
            </template>
          </classic-navigation>
          <classic-split ref="layoutSplit" @mousedown="splitDown"/>
          <classic-container ref="layoutContainer" :layout-config="layoutConfig" :user="adminSystemStore.user" :menu="menu" :menus="adminSystemStore.menus"
                             :role="adminSystemStore.role"
                             :root-menu="rootMenu">
            <template v-if="$slots['component']" #component>
              <slot name="component"></slot>
            </template>
          </classic-container>
        </div>
      </div>
    </el-watermark>
  </div>
</template>
<script lang="ts" setup>
import {nextTick, onMounted, reactive, ref, useSlots, watch} from "vue";
import {useRouter} from "vue-router";
import {ElWatermark} from "element-plus";
import ClassicHeader from "@/views/admin/components/layout/classic/header/ClassicHeader.vue";
import ClassicNavigation from "@/views/admin/components/layout/classic/navigation/ClassicNavigation.vue";
import ClassicContainer from "@/views/admin/components/layout/classic/container/ClassicContainer.vue";
import ClassicSplit from "@/views/admin/components/layout/classic/split/ClassicSplit.vue";
import {useTh4AdminSystem} from "@/store/th4/admin/system/system.ts";
import {pxToRem} from "@th4/pxToRem.ts";

const props=defineProps<{layoutConfig?:{header?:{height:number},navigation?:{width:number,minWidth:number,maxWidth:number},split?:{width:number},container?:{showIndicator:boolean}}}>()
// refs
const layoutHeader = ref();
const layoutContent = ref();
const layoutNavigation = ref();
const layoutSplit = ref();
const layoutContainer = ref();
const router = useRouter();
const menu = ref<th4.admin.system.Menu>();
const rootMenu = ref<th4.admin.system.Menu>();
const adminSystemStore=useTh4AdminSystem();
const slots=useSlots();
//
const split = ref(false);
// config
const layoutConfig = reactive<{header:{height:number},navigation:{width:number,minWidth:number,maxWidth:number},split:{width:number},container:{showIndicator:boolean}}>({
  header: {
    height: 64
  },
  navigation: {
    width: 200,
    maxWidth: 300,
    minWidth: 200
  },
  split: {
    width: 2
  },
  container:{
    showIndicator:true
  }
,...props.layoutConfig})
const splitMove = (e: MouseEvent) => {
  if (split.value) {
    if (e.clientX <= layoutConfig.navigation.maxWidth && e.clientX >= layoutConfig.navigation.minWidth) {
      layoutConfig.navigation.width = e.clientX;
    }
  }
}
const splitDown = () => {
  split.value = true;
}
const splitUp = () => {
  split.value = false;
}
const handleMenuClick = (currentMenu: th4.admin.system.Menu) => {
  menu.value=currentMenu;
  nextTick(()=>{
    if(currentMenu){
      router.push({path: adminSystemStore.role?.home.concat('/').concat(currentMenu.path)});
    }

  })
}
const initLayout = () => {
  layoutContent.value.style.height = 'calc(100% - '
      + pxToRem(layoutConfig.header.height) + 'rem)';
  layoutHeader.value.$el.style.height = pxToRem(layoutConfig.header.height) + 'rem';
  layoutNavigation.value.$el.style.width = pxToRem(layoutConfig.navigation.width) + 'rem';
  layoutSplit.value.$el.style.width = pxToRem(layoutConfig.split.width) + 'rem';
  layoutContainer.value.$el.style.width = 'calc(100% - '
      + pxToRem(layoutConfig.navigation.width) + 'rem - '
      + pxToRem(layoutConfig.split.width) + 'rem)';
}
onMounted(() => {
  initLayout();
})

watch(() => layoutConfig, () => {
  initLayout();
}, {deep: true});

</script>
<style lang="scss" scoped>
.classic-layout {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #f4f4f5;
  .watermark {
    width: 100%;
    height: 100%;

    .classic-layout-container {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      .classic-header {
        height: 64px;
      }

      .classic-content {
        width: 100%;
        height: calc(100% - 64px);
        display: flex;
        flex-direction: row;


        .classic-navigation {
          width: 200px;
        }

        .classic-split {
          width: 2px;
        }

        .classic-container {
          width: calc(100% - 200px - 2px);
          height: 100%;
          overflow: hidden;
        }
      }

    }
  }
}
</style>