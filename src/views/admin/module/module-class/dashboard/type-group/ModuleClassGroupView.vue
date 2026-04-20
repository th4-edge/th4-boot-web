

<template>
  <div class="module-class-group-view">
    <div class="module-class-group-view-header" @click.stop="collapse=!collapse">
      <div class="rotate-box">
        <el-icon :class="{'rotate': collapse}"><ArrowLeft /></el-icon>
      </div>
      <div class="icon-box">
        <template v-if="moduleType.icon">
          <x-icon :name="moduleType.icon"/>
        </template>
        <template v-else>
          <el-icon><List /></el-icon>
        </template>
      </div>
      <div class="text-box">{{moduleType.name}} ( {{moduleClasses.length}} )</div>
      <div class="tool-box">
        <el-dropdown trigger="click">
          <el-icon @click.stop><Operation /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon="plus" @click="()=>emit('save','module-class',{type:moduleType})">新建模型</el-dropdown-item>
              <el-dropdown-item icon="edit" @click="()=>emit('update','module-type',moduleType)">编辑类型</el-dropdown-item>
              <el-dropdown-item icon="delete" :disabled="moduleClasses&&moduleClasses.length!=0" @click="()=>emit('delete','module-type',moduleType)">删除类型</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="module-class-group-view-content" :class="{'collapse': !collapse}">
      <template v-if="moduleClasses">
        <template v-for="(moduleClass,index) in moduleClasses">
          <module-class-card-view :module-class="moduleClass" :visible="collapse" :style="{'transition-delay': (50*index)+'ms'}" @click="()=>emit('itemClick',moduleClass)"/>
        </template>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import ModuleClassCardView from "@/views/admin/module/module-class/dashboard/card/ModuleClassCardView.vue";
import {ref} from "vue";
import {ElDropdown,ElDropdownMenu,ElDropdownItem} from "element-plus";
import XIcon from "@/views/admin/components/icon/XIcon.vue";

defineProps<{moduleType:{name:string,icon?:string},moduleClasses:th4.admin.module.ModuleClass[]}>();
const collapse=ref<boolean>(true);
const emit=defineEmits<{'save':[string,any],'update':[string,any],'delete':[string,any],'itemClick':[any]}>();
</script>
<style scoped lang="scss">
.module-class-group-view{
  width: 100%;
  height: auto;
  .module-class-group-view-header{
    height: 48px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    line-height: 16px;
    cursor: pointer;
    .rotate {
      transform: rotate(-90deg);
    }
    .rotate-box{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-icon{
        transition: transform .3s ease;
      }
    }
    .icon-box{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-icon{
        transition: transform .3s ease;
      }
    }
    .text-box{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .tool-box{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &:hover{
      //background-color: #F5F7FA;
    }
  }

  .module-class-group-view-content{
    width: 100%;
    height: calc(100% - 36px);
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    box-sizing: content-box;
    transition: all .3s ease-in-out;
    .module-class-card-view{
      flex:0 0 20%;
      transition: all 0.3s ease-in-out;
    }
  }
  .collapse{
    gap: 0;
    .module-class-card-view{
      flex:0 0 0;
      height: 0 !important;
      padding: 0;
      font-size: 0;
    }
  }
}
</style>