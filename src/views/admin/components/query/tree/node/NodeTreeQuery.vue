<template>
  <div class="model-tree-query" v-if="fieldItem&&fieldItem.clazz">
    <div class="title-box">
      <div class="title">{{fieldItem.label}}</div>
    </div>
    <div class="tree-wrapper">
      <el-scrollbar>
        <el-tree :load="load"
                 lazy
                 :icon="icon"
                 :props="{label:'name'}"
                 :node-key="fieldItem.clazz.idField.property"
                 @node-click="nodeClick" ref="tree">
          <template #default="{data,node}">
            <div class="node-icon">
              <template v-if="data.icon">
                <x-icon :name="data.icon" />
              </template>
              <template v-else>
                <template v-if="node.expanded">
                  <el-icon class="node-text"><FolderOpened /></el-icon>
                </template>
<!--                <template v-else-if="node.isLeaf">-->
<!--                  <el-icon class="node-text"><Document /></el-icon>-->
<!--                </template>-->
                <template v-else>
                  <el-icon class="node-text"><Folder /></el-icon>
                </template>
              </template>
              <div>{{data.name}}</div>
            </div>

          </template>
        </el-tree>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ElTree} from "element-plus";
import {Component, defineModel, defineProps, onMounted, ref} from "vue";
import {uiModelFormItem} from "@/store/th4/admin/ui/api/API.ts";
import {modelList, modelTree} from "@/store/th4/framework/service/api/API.ts";
import XIcon from "@/views/admin/components/icon/XIcon.vue";
const queryable=defineModel<Record<any,any>>('queryable',{required:true})
const props=defineProps<{
  modelName:string,
  propertyName:string,
  loadData?:Function,
  uriQueryable?:Record<string, any>
  icon?:string|Component
}>()
const tree=ref();
const fieldItem=ref<th4.admin.ui.EditFormItem>()
onMounted(()=>{
  uiModelFormItem(props.modelName,props.propertyName).then(formItem=>{
    fieldItem.value=formItem
  })
})
const load=(node:any, resolve:any)=>{
  if(fieldItem.value){
    modelTree(fieldItem.value!.clazz!.name,{[fieldItem.value.clazz!.idField.property]:node.data[fieldItem.value.clazz!.idField.property]}).then(list=>{
      resolve(list)
    })
  }

}
const nodeClick=(data:any)=>{
  if(fieldItem.value&&fieldItem.value.clazz){
    if(queryable.value[props.propertyName.concat('.').concat(fieldItem.value.clazz.idField.property).concat('Eq')]==data[fieldItem.value.clazz.idField.property]){
      queryable.value[props.propertyName.concat('.').concat(fieldItem.value.clazz.idField.property).concat('Eq')]=undefined;
      tree.value.setCurrentKey(null);
      props.loadData&&props.loadData();
    }else{
      queryable.value[props.propertyName.concat('.').concat(fieldItem.value.clazz.idField.property).concat('Eq')]=
          data[fieldItem.value.clazz.idField.property]
      props.loadData&&props.loadData()
    }

  }
}
</script>
<style scoped lang="scss">
.model-tree-query{
  width: 280px;
  height: 100%;
  margin-right: 20px;
  border-right: 1px solid rgb(242, 242, 242);
  border-top: 1px solid rgb(242, 242, 242);
  box-sizing: border-box;
  .title-box{
    .title{
      margin-left: 10px;
      font-size: 14px;
      font-weight: bold;
    }
    margin-bottom: 20px;
    margin-top: 15px;
  }
  .tree-wrapper {
    height: calc(100% - 80px);
    box-sizing: border-box;
    margin: 10px;
    .node-icon{
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .el-tree {
      font-weight: 400;
      font-style: normal;
      background: none;
      --el-tree-node-content-height: 36px;

      :deep(.el-tree-node.is-current>.el-tree-node__content) {
        background-color: var(--el-color-primary);
        color: #FFFFFF;
        //border-radius: var(--el-border-radius-base);
      }
    }
  }
}
</style>