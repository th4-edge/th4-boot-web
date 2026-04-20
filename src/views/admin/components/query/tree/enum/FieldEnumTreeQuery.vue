<template>
  <div class="field-enum-tree-query" v-if="fieldItem">
    <div class="title-box">
      <div class="title">{{fieldItem.label}}</div>
    </div>
    <div class="tree-wrapper">
      <el-tree :data="data" :props="{label:'name'}" node-key="key" @node-click="nodeClick" ref="tree"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ElTree} from "element-plus";
import {defineModel, defineProps, onMounted, ref} from "vue";
import {uiModelFormItem} from "@/store/th4/admin/ui/api/API.ts";
import {modelEnums} from "@/store/th4/framework/service/api/API.ts";
const queryable=defineModel<Record<any,any>>('queryable',{required:true})
const props=defineProps<{
  modelName:string,
  propertyName:string,
  loadData:Function,
  uriQueryable?:Record<string, any>
}>()
const tree=ref();
const data=ref<any[]>([]);
const fieldItem=ref<th4.admin.ui.EditFormItem>()
onMounted(()=>{
  uiModelFormItem(props.modelName,props.propertyName).then(formItem=>{
    fieldItem.value=formItem
    modelEnums(props.modelName,props.propertyName).then(list=>{
      data.value=[{name:formItem.label,key:'',children:list}]
    })
  })
})
const nodeClick=(data:any)=>{
  if(fieldItem.value){
    if(queryable.value[props.propertyName.concat('Eq')]==data.key){
      queryable.value[props.propertyName.concat('Eq')]=undefined
      tree.value.setCurrentKey(null);
      props.loadData();
    }else{
      queryable.value[props.propertyName.concat('Eq')]=data.key
      props.loadData()
    }

  }
}
</script>
<style scoped lang="scss">
.field-enum-tree-query{
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
    height: 100%;
    box-sizing: border-box;
    margin: 10px;

    .el-tree {
      font-family: 'PingFangSC-Regular', 'PingFang SC', serif;
      font-weight: 400;
      font-style: normal;
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