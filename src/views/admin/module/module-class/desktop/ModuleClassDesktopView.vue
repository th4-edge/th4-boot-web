<template>
  <div class="module-class-desktop-view">
    <classic-title-view :title="'【'+moduleClass.name+'】'.concat('模型详情')">
      <template #action-bar>
        <el-button icon="back" round @click="()=>$emit('backClick')"></el-button>
      </template>
      <div class="module-class-desktop-content">
        <module-class-title-view :module-class="moduleClass" @delete="fireDeleteModuleClass"/>
        <div class="module-class-desktop-content-tabs">
          <el-tabs  v-model="activeTab">
            <template v-for="tabPane in Object.keys(tabComponents)">
              <el-tab-pane :name="tabPane">
                <template #label>
                  <div class="tab-pane-label">{{tabComponents[tabPane].text}}</div>
                </template>
              </el-tab-pane>
            </template>
          </el-tabs>
        </div>
        <div class="module-class-desktop-content-pane">
          <component :is="tabComponents[activeTab].component" v-model:moduleClass="moduleClass"/>
        </div>
      </div>
    </classic-title-view>

  </div>
</template>
<script setup lang="ts">
import ClassicTitleView from "@/views/admin/components/layout/classic/container/view/ClassicTitleView.vue";
import {ElButton, ElMessageBox, ElTabPane, ElTabs} from "element-plus";
import ModuleClassTitleView from "@/views/admin/module/module-class/desktop/title/ModuleClassTitleView.vue";
import {ref, watch} from "vue";
import ModuleClassFieldView from "@/views/admin/module/module-class/desktop/field/ModuleClassFieldView.vue";
import {modelDelete, modelInfo} from "@/store/th4/framework/service/api/API.ts";
import ModuleClassTopologyView
  from "@/views/admin/module/module-class/desktop/topology/ModuleClassTopologyView.vue";
const props=defineProps<{moduleClass:th4.admin.module.ModuleClass}>();
const emit=defineEmits<{backClick:[]}>();
const moduleClass=ref<th4.admin.module.ModuleClass>(props.moduleClass);
const tabComponents:any={
  field:{text:'模型字段',component:ModuleClassFieldView},
  topology:{text:'模型关联',component:ModuleClassTopologyView},
  // primaryKey:{text:'唯一校验',component:ModuleClassPrimaryKeyView},
};
const activeTab=ref<string>(Object.keys(tabComponents)[0]);
const fireDeleteModuleClass=(item:any)=>{
  ElMessageBox.confirm('确定要删除模型【'+item.name+'】？', '警告', {type: 'warning'}).then(()=>{
    modelDelete('module-class',{clzId:item.clzId}).then(()=>{
      emit('backClick');
    })
  })
}
watch(()=>props.moduleClass,()=>{
  modelInfo('module-class',{clzId:props.moduleClass.clzId}).then(data=>{
    moduleClass.value=data;
  })
},{immediate:true})
</script>

<style scoped lang="scss">
.module-class-desktop-view{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .module-class-desktop-content{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .module-class-desktop-content-tabs{
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      box-sizing: border-box;
      padding: 0 20px;
      .el-tabs{
        --el-tabs-header-height: 64px;
      }
      :deep(.el-tabs__active-bar){
        height: 3px;
      }
      :deep(.el-tabs__header){
        margin: 0;
      }
      .tab-pane-label{
        width: 112px;
        height: 56px;
        /* 自动布局 */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px 24px;
        box-sizing: border-box;
        font-weight: 600;
      }
    }
    .module-class-desktop-content-pane{
      flex: 1;
      width: 100%;
      padding:20px 20px 20px 20px;
      box-sizing: border-box;
      overflow: auto;
    }
  }
}
</style>