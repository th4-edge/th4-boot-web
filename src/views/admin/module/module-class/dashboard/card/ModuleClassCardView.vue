

<template>
  <div class="module-class-card-view">
    <div class="module-class-card-left">
      <div class="icon-box-wrapper">
        <template v-if="moduleClass.icon">
          <x-icon :name="moduleClass.icon"/>
        </template>
        <template v-else>
          <el-icon><Odometer /></el-icon>
        </template>
      </div>
    </div>
    <div class="module-class-card-right">
      <div class="module-class-card-title">
        <div class="module-class-card-title-text">{{ moduleClass.name }}</div>
      </div>
      <div class="module-class-card-desc">
        <div class="module-class-card-desc-text">{{ moduleClass.name }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import XIcon from "@/views/admin/components/icon/XIcon.vue";
defineProps<{moduleClass:th4.admin.module.ModuleClass}>();
defineEmits<{'itemClick':[moduleClass:th4.admin.module.ModuleClass]}>();
</script>
<style scoped lang="scss">
.module-class-card-view{
  width: 100%;
  height: 120px;
  background: #F5F7FA;
  overflow: auto;
  box-sizing: border-box;
  cursor: pointer;
  border: 1px solid #F5F7FA;
  border-radius: 8px;
  display: flex;
  padding: 20px;
  &:hover{
    border: 1px solid #e4e4e4;
    background: rgba(24, 144, 255, 0.08);
  }
  .module-class-card-left{
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-box-wrapper{
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: rgba(24, 144, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
    }
  }
  .module-class-card-right{
    width: calc(100% - 120px);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    .module-class-card-title{
      font-size: 18px;
      color:#1F2D3D;
    }
    .module-class-card-desc{
      font-size: 14px;
      color:#4E5969;
    }
  }
}
</style>