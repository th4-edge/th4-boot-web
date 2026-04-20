<template>
  <div class="classic-container">
    <classic-indicator v-if="layoutConfig.container.showIndicator" ref="classicIndicator" :menu="menu" :root-menu="rootMenu"/>
    <div ref="classicViewContent" class="classic-view-content">
      <template v-if="$slots['component']">
        <slot name="component" v-bind="$attrs"></slot>
      </template>
      <template v-else>
        <router-view v-slot="{ Component }">
          <component :is="Component" ref="routedView" :menu="menu" :menus="menus" :role="role"
                     :root-menu="rootMenu" :user="user"
                     class="classic-view-slot" v-bind="$attrs"/>
        </router-view>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {defineProps, onMounted, ref} from 'vue';
import ClassicIndicator from "@/views/admin/components/layout/classic/container/view/indicator/ClassicIndicator.vue";
import {pxToRem} from "@th4/pxToRem.ts";


defineProps<{
  layoutConfig:{header:{height:number},navigation:{width:number,minWidth:number,maxWidth:number},split:{width:number},container:{showIndicator:boolean}}
  role: th4.admin.system.Role,
  user: th4.admin.system.User,
  menus: Record<string, th4.admin.system.Menu[]>,
  menu?: th4.admin.system.Menu,
  rootMenu?: th4.admin.system.Menu
}>();
//const router = useRouter();
const classicIndicator = ref<InstanceType<typeof ClassicIndicator>>();
const classicViewContent = ref<HTMLDivElement>();
//const routedView = ref<any>();
//const title = ref<string>('');
//const back =ref<boolean>(false);
// const goBack = () => {
//   back.value = true;
//   nextTick(() => {
//     if(back.value){
//       router.go(-1);
//     }
//     back.value = false;
//   });
// }
//
// provide(configure.backKey, back);
//
// provide(configure.titleKey, title);


onMounted(() => {
  if (classicIndicator.value && classicViewContent.value) {
    classicViewContent.value.style.height = `calc(100%  - ${pxToRem(classicIndicator.value.$el.offsetHeight)}rem - ${pxToRem(20)}rem)`
  }
});
// watch(() => props.menu, () => {
//   if (props.menu) {
//     title.value = props.menu.name
//   }
// })
</script>
<style lang="scss" scoped>
.classic-container {
  width: 100%;
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .classic-view-content {
    width: 100%;
    flex: 1;
    margin-top: 20px;
    border: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    box-sizing: border-box;
    .classic-view-slot {
      width: 100%;
      height: 100%;
    }
  }
}
</style>