<template>
  <div class="modern-layout">
    <el-watermark v-if="adminSystemStore.role" :content="adminSystemStore.role.watermark||adminSystemStore.user?.username" :font="{color: 'rgba(167, 149, 149, 0.15)'}" class="watermark">
      <div class="modern-layout-container">
        <modern-header ref="modernHeader" :user="adminSystemStore.user" :menu="navMenu" :menus="adminSystemStore.menus"
                       :role="adminSystemStore.role" @menu-click="navMenuClick" v-bind="$attrs">
          <template v-if="$slots&&$slots['header-actions']" #header-actions>
            <slot name="header-actions"/>
          </template>
          <template v-if="$slots['logo']" #logo>
            <slot name="logo"></slot>
          </template>
          <template v-if="$slots['user-info']" #user-info="{role,user,menus}">
            <slot name="user-info" :role="role" :user="user" :menus="menus"/>
          </template>
          <template v-if="$slots['user-avatar']" #user-avatar>
            <slot name="user-avatar"></slot>
          </template>
        </modern-header>
        <modern-container ref="modernContainer" :user="adminSystemStore.user" :menu="pathMenu" :menus="menus"
                         :role="adminSystemStore.role" @menu-click="pathMenuClick" v-bind="$attrs">
          <template v-if="$slots['component']" #component>
            <slot name="component"/>
          </template>
        </modern-container>
      </div>
    </el-watermark>
  </div>
</template>
<script setup lang="ts">
import ModernHeader from "@/views/admin/components/layout/modern/header/ModernHeader.vue";
import ModernContainer from "@/views/admin/components/layout/modern/container/ModernContainer.vue";
import {useRouter} from "vue-router";
import {useTh4AdminSystem} from "@/store/th4/admin/system/system.ts";
import {nextTick, onMounted, reactive, ref, watch} from "vue";
import {ElWatermark} from "element-plus";
import {pxToRem} from "@th4/pxToRem.ts";

const props=defineProps<{layoutConfig?:{header?:{height:number}}}>();
const layoutConfig=reactive<{header:{height:number}}>({header:{height:80,...props.layoutConfig?.header}})
const modernHeader=ref();
const modernContainer=ref();
const router = useRouter();
const navMenu = ref<th4.admin.system.Menu>();
const pathMenu = ref<th4.admin.system.Menu>();
const menus = ref<th4.admin.system.Menu[]>([]);
const adminSystemStore=useTh4AdminSystem();
const initLayout = () => {
  modernHeader.value.$el.style.height = pxToRem(layoutConfig.header.height) + 'rem';
  modernContainer.value.$el.style.height = 'calc(100% - '
      + pxToRem(layoutConfig.header.height) + 'px)';
}
const pathMenuClick=(_menu:th4.admin.system.Menu)=>{
  pathMenu.value=_menu;
  nextTick(()=>{
    if(pathMenu.value?.path){
      router.push({path: adminSystemStore.role?.home.concat('/').concat(_menu.path)});
    }
  })
}
const navMenuClick=(_menu:th4.admin.system.Menu)=>{
  navMenu.value=_menu;
  nextTick(()=>{
    if(navMenu.value?.path){
      router.push({path: adminSystemStore.role?.home.concat('/').concat(_menu.path)});
    }
    menus.value=navMenu.value?.children||[];
    if(navMenu.value?.children&&navMenu.value?.children.length>0){
      pathMenuClick(navMenu.value.children[0])
    }

  })
}
onMounted(() => {
  initLayout();
})
watch(() => adminSystemStore.menus, () => {
  navMenuClick(adminSystemStore.menus['Nav'][0])
}, {immediate: true});
watch(() => layoutConfig, () => {
  initLayout();
}, {deep: true});

</script>
<style scoped lang="scss">
.modern-layout{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .watermark {
    width: 100%;
    height: 100%;
    .modern-layout-container {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      .modern-header{
        width: 100%;
        height: 80px;
      }
      .modern-container{
        width: 100%;
        height: calc(100% - 80px);
      }
    }
  }
}
</style>