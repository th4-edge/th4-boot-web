<template>
  <route-container :active="active">
    <module-class-dashboard-view key="dashboard" @item-click="fireItemClick"/>
    <module-class-desktop-view v-if="moduleClass" key="desktop" :module-class="moduleClass" @backClick="fireBackClick"/>
  </route-container>
</template>
<script lang="ts" setup>
import {onActivated, onMounted, ref} from "vue"
import RouteContainer from "@/views/admin/components/view/manage/components/container/RouteContainer.vue";
import ModuleClassDashboardView from "@/views/admin/module/module-class/dashboard/ModuleClassDashboardView.vue";
import ModuleClassDesktopView from "@/views/admin/module/module-class/desktop/ModuleClassDesktopView.vue";

const active = ref<string>('dashboard')
const moduleClass = ref<th4.admin.module.ModuleClass>();
const fireItemClick = (item: any) => {
  moduleClass.value = item;
  active.value = 'desktop';
}
const fireBackClick = () => {
  active.value = 'dashboard';
  moduleClass.value=undefined;
}
onMounted(()=>{
  fireBackClick();
})
onActivated(()=>{
  fireBackClick();
})
</script>
<style lang="scss" scoped>
.route-container{
  box-sizing: border-box;
}
</style>