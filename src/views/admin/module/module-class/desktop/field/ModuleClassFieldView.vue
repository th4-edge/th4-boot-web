<template>
  <div class="module-class-field-view">
    <template v-if="moduleClass.groups">
      <draggable v-model="moduleClass.groups" item-key="" handle=".module-class-field-group"  @end="handleDragEnd">
        <template #item="{element,index}">
          <module-class-group-field-view :key="element" :index="index" :group="element" v-model:module-class="moduleClass"/>
        </template>
      </draggable>
      <div class="module-class-field-group active" >
        <div class="module-class-field-group-icon" @click="fireAddGroup">
          <el-icon><CirclePlusFilled /></el-icon>
        </div>
        <div class="module-class-field-group-title" @click="fireAddGroup">
          添加分组
        </div>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import {modelUpdate} from "@/store/th4/framework/service/api/API.ts";
import ModuleClassGroupFieldView
  from "@/views/admin/module/module-class/desktop/field/group/ModuleClassGroupFieldView.vue";
import draggable from 'vuedraggable';
const moduleClass=defineModel<th4.admin.module.ModuleClass>('moduleClass',{required:true});

const fireAddGroup=()=>{
  moduleClass.value.groups.push('未命名分组');
  modelUpdate('module-class',{clzId:moduleClass.value.clzId,groups:moduleClass.value.groups}).then(()=>{
  })
}
const handleDragEnd = () => {
  modelUpdate('module-class', {clzId: moduleClass.value.clzId, groups: moduleClass.value.groups}).then(() => {
  })
}

</script>
<style scoped lang="scss">
.module-class-field-view{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  .active{
    color: var(--el-color-primary);
  }
  .module-class-field-group{
    height: 56px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    line-height: 16px;
    cursor: pointer;
    .rotate {
      transform: rotate(-90deg);
    }
    .module-class-field-group-icon{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-icon{
        transition: transform .3s ease;
      }
    }
    .module-class-field-group-title{
      font-weight: 600;
    }
    .module-class-field-group-edit{
      display: none;
    }
    .module-class-field-group-delete{
      display: none;
      color: #FF4D4F;
    }
    &:hover{
      color: var(--el-color-primary);
      .module-class-field-group-edit{
        display: flex;
      }
      .module-class-field-group-delete{
        display: flex;
      }
    }
  }
}
</style>