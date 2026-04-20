<template>
  <div class="model-tree-query" v-if="fieldItem&&fieldItem.clazz">
    <div class="title-box">
      <div class="title">{{title||fieldItem.label}}</div>
    </div>
    <div class="tree-wrapper">
      <el-scrollbar>
        <el-tree :data="data" :props="{label:'name'}" :node-key="fieldItem.clazz.idField.property" @node-click="nodeClick" ref="tree">
          <template #default="{data}">
            <div class="node-icon">
              <template v-if="data.icon">
                <x-icon :name="data.icon" />
              </template>
              <template v-else>
                <el-icon class="node-text"><Document /></el-icon>
              </template>
            </div>
            <div>{{data.name}}</div>
          </template>
        </el-tree>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ElTree} from "element-plus";
import {defineModel, defineProps, onMounted, ref} from "vue";
import {uiModelFormItem} from "@/store/th4/admin/ui/api/API.ts";
import {modelList} from "@/store/th4/framework/service/api/API.ts";
import XIcon from "@/views/admin/components/icon/XIcon.vue";
import http from "@th4/http.ts";
const queryable=defineModel<Record<any,any>>('queryable',{required:true})
const props=defineProps<{
  title?:string,
  modelName:string,
  propertyName:string,
  loadData?:Function,
  uriQueryable?:Record<string, any>,
  uri?:string,
  auth?:string
}>()
const tree=ref();
const data=ref<any[]>([]);
const fieldItem=ref<th4.admin.ui.EditFormItem>()
onMounted(()=>{
  uiModelFormItem(props.modelName,props.propertyName).then(formItem=>{
    fieldItem.value=formItem
    if(formItem?.clazz){
      queryable.value[props.propertyName.concat('.').concat(formItem.clazz.idField.property).concat('Eq')]="";
      (props.uri?http.post(props.uri,props.uriQueryable):modelList(formItem.clazz.name,props.uriQueryable,undefined,props.auth)).then((list:any)=>{
        data.value=list.sort((a:any,b:any ) => {
          if(!a.priority){
            return b.priority||0
          }
          if(a.priority === b.priority){
            return 0;
          }
          return a.priority - b.priority;
        })
      })
    }
  })
})
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
      margin-right: 10px;
    }
    .el-tree {
      font-family: 'PingFangSC-Regular', 'PingFang SC', serif;
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