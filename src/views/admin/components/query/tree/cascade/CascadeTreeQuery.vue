<template>
  <div class="cascade-tree-query">
    <template v-if="$slots&&$slots['title']">
      <slot name="title"></slot>
    </template>
    <template v-else>
      <div v-if="title" class="title-box">
        <div class="title">{{title}}</div>
      </div>
    </template>
    <div class="tree-wrapper">
      <el-scrollbar>
        <el-tree v-if="cascadeClasses.length>0" :load="load"
                 lazy
                 :props="{label:'name',isLeaf:(_data:any,_node:any)=>_node.level===cascades.length}"
                 node-key="id"
                 @node-click="nodeClick"
                 ref="tree">
          <template #default="{data,node}">
            <div class="node-icon">
              <template v-if="data.icon">
                <x-icon :name="data.icon" />
              </template>
              <template v-else>
                <template v-if="node.expanded">
                  <el-icon class="node-text"><FolderOpened /></el-icon>
                </template>
                <template v-else-if="node.isLeaf">
                  <el-icon class="node-text"><Document /></el-icon>
                </template>
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
import {defineModel, onMounted, ref} from "vue";
import {uiModelFormItem} from "@/store/th4/admin/ui/api/API.ts";
import {modelList} from "@/store/th4/framework/service/api/API.ts";
import XIcon from "@/views/admin/components/icon/XIcon.vue";
import {ElTree} from "element-plus";
import http from "@th4/http.ts";

const props=defineProps<{title?:string,loadData?:Function,cascades:string[]|{property:string,data?:any[],uri?:string}[],modelName:string}>();
const queryable=defineModel<Record<any,any>>('queryable',{required:true});
const cascadeClasses=ref<th4.admin.ui.EditFormItem[]>([]);
const tree=ref();
const lastNodeClickQueryName=ref<string>();
onMounted(async ()=>{
  if(props.cascades.length>0) {
    let modelName = props.modelName;
    const _cascadeClasses:th4.admin.ui.EditFormItem[]=[]
    for (const cascade of props.cascades) {
      if (modelName) {
        if(typeof cascade === 'string'){
          const formItem = await uiModelFormItem(modelName, cascade);
          if (formItem.clazz) {
            modelName = formItem.clazz.name
            _cascadeClasses.push(formItem);
          }
        }else if (typeof cascade === 'object'&& 'property' in cascade){
          const formItem = await uiModelFormItem(modelName, cascade.property);
          if (formItem.clazz) {
            modelName = formItem.clazz.name
            _cascadeClasses.push(formItem);
          }
        }
      }
    }
    cascadeClasses.value=_cascadeClasses.reverse();
  }
})
const load=(node:any, resolve:any)=>{
  const cascade=props.cascades.reverse()[node.level];
  const formItem=cascadeClasses.value[node.level]
  if(formItem) {
    if (typeof cascade === 'object') {
      if ('data' in cascade && cascade.data && Array.isArray(cascade.data)) {
        cascade.data.forEach(item => {
          item.id = formItem.clazz!.name.concat('.').concat(item[formItem.clazz!.idField.property])
        })
        resolve(cascade.data)
      }else if('uri' in cascade && cascade.uri){
        const lastFormItem = cascadeClasses.value[node.level - 1]
        http.post<any,any[]>(cascade.uri, {[lastFormItem ? lastFormItem.property.concat(".").concat(lastFormItem.clazz!.idField.property).concat('Eq') : '']: lastFormItem ? node.data[lastFormItem.clazz!.idField.property] : ''}).then(list => {
          list.forEach(item => {
            item.id = formItem.clazz!.name.concat('.').concat(item[formItem.clazz!.idField.property])
          })
          resolve(list)
        })
      }
    } else {
      const lastFormItem = cascadeClasses.value[node.level - 1]
      modelList(formItem.clazz!.name, {[lastFormItem ? lastFormItem.property.concat(".").concat(lastFormItem.clazz!.idField.property).concat('Eq') : '']: lastFormItem ? node.data[lastFormItem.clazz!.idField.property] : ''}).then(list => {
        list.forEach(item => {
          item.id = formItem.clazz!.name.concat('.').concat(item[formItem.clazz!.idField.property])
        })
        resolve(list)
      })

    }
  }

}
const nodeClick=(data:any, node:any)=>{
  // 构建查询条件
  const queryKey=cascadeClasses.value[node.level-1].property.concat('.').concat(cascadeClasses.value[node.level-1].clazz!.idField.property).concat('Eq');
  if(queryKey==lastNodeClickQueryName.value){
    if(queryable.value[queryKey]==data[cascadeClasses.value[node.level-1].clazz!.idField.property]){
      delete queryable.value[queryKey]
      tree.value.setCurrentKey(null);
    }else{
      queryable.value[queryKey]=data[cascadeClasses.value[node.level-1].clazz!.idField.property]
    }
  }else {
    if(lastNodeClickQueryName.value){
      delete queryable.value[lastNodeClickQueryName.value]
    }
    queryable.value[queryKey]=data[cascadeClasses.value[node.level-1].clazz!.idField.property]
  }
  lastNodeClickQueryName.value=queryKey
  props.loadData&&props.loadData()
}
</script>
<style scoped lang="scss">
.cascade-tree-query{
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