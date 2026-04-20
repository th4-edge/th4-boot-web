
<template>
  <fashion-layout/>
<!--    <modern-layout>-->
<!--      <template #header-actions>-->

<!--      </template>-->
<!--    </modern-layout>-->
<!--    <modern-layout/>-->
<!--  <retro-layout/>-->
</template>
<script setup lang="ts">

// import ClassicLayout from "@/views/admin/components/layout/classic/ClassicLayout.vue";
import ModernLayout from "@/views/admin/components/layout/modern/ModernLayout.vue";
import {FashionLayout} from "@/views/admin/components/layout/fashion";

document.documentElement.style.setProperty('--el-color-primary','#083B40');
</script>

<style scoped lang="scss">
.classic-layout{
  --el-color-primary: #0089FF;
  --theme-background: #0B1C35;
  --theme-background-hover: #19345B;
  --theme-background-active: #19345B;
  background: #F5F7F9;
  :deep(.el-radio-button__inner){
    padding: 10px 10px;
  }
  :deep(.classic-header){
    background:  var(--theme-background);
    color: #FFFFFF;
  }
  :deep(.user-menu-header){
    background:  var(--theme-background);
  }
  :deep(.classic-navigation){
    background: var(--theme-background);
    .el-menu{
      --el-menu-text-color: #FFFFFF;
      --el-menu-hover-bg-color:  var(--theme-background-hover);
      --el-menu-active-color: var(--theme-background-active);
      background: var(--theme-background);
    }
  }
  :deep(.input-item){
    --el-input-height: 36px;
    --el-input-border-radius: 4px;
  }
  :deep(.el-button){
    --el-border-radius-base: 4px;
    --el-button-hover-bg-color: var(--theme-background-hover);
    --el-button-active-bg-color: var(--theme-background-active);
  }
}
.modern-layout{
  --el-color-primary: #083B40;
  --theme-background: #0B333D;
  --theme-background-hover: #083B40;
  --theme-background-active: #194D51;
  :deep(.el-radio-button__inner){
    padding: 10px 10px;
  }

  :deep(.input-item){
    --el-input-width: 320px;
    --el-input-height: 36px;
    --el-input-border-radius: 4px;
  }
  :deep(.input-item .el-select__wrapper) {
    padding: 7px 12px !important;
    min-height: 36px;
  }
  :deep(.el-button){
    --el-border-radius-base: 4px;
    --el-button-hover-bg-color: var(--theme-background-hover);
    --el-button-active-bg-color: var(--theme-background-active);
    --el-button-hover-text-color: #FFFFFF;
  }
  :deep(.modern-header){
    background:  var(--theme-background);
    color: #FFFFFF;
  }
  :deep(.modern-menu){
    border-bottom-color: var(--theme-background);
    &:hover{
      background: var(--theme-background-hover);
    }
  }
  :deep(.modern-menu-active){
    background-color: var(--theme-background-active);
  }
  :deep(.user-menu-header){
    background: var(--theme-background);
  }
  :deep(.classic-navigation){
    background:  var(--theme-background);
    .el-menu{
      --el-menu-text-color: #FFFFFF;
      --el-menu-hover-bg-color: var(--theme-background-hover);
      --el-menu-active-color: var(--theme-background-active);
      background: var(--theme-background);
    }
  }

}
</style>