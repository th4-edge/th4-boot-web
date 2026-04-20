

<template>
  <div class="model-select-query">
    <el-menu ref="menu"
             :default-active="activeIndex"
             mode="horizontal"
             :ellipsis="false"
             :popper-offset="16"
             @select="onSelect"
    >
      <el-sub-menu index="x">
        <template #title>
          <template v-if="selected">
            {{selected.name}}
          </template>
          <template v-else>
            {{fieldItem?.label}}
          </template>
        </template>
        <el-menu-item index="-1">全部</el-menu-item>
        <template  v-for="(item,index) in data">
          <el-menu-item :index="index+''" :route="item">{{item.name}}</el-menu-item>
        </template>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import {ElMenu,ElMenuItem,ElSubMenu} from 'element-plus'
import {defineModel, onMounted, ref} from "vue";
import {uiModelFormItem} from "@/store/th4/admin/ui/api/API.ts";
import {modelList} from "@/store/th4/framework/service/api/API.ts";
const props=defineProps<{modelName:string,propertyName:string,queryable:Record<string, any>,loadData:Function}>();
const data=ref<any[]>([]);
const fieldItem=ref<th4.admin.ui.EditFormItem>();
const activeIndex=ref();
const selected=ref<any>();
const queryable=defineModel<Record<any,any>>('queryable',{required:true})
const onSelect=(index:string)=>{
  const i=parseInt(index)
  if(i>=0){
    selected.value=data.value[i];
    activeIndex.value=index
    if(fieldItem.value&&fieldItem.value.clazz){
      queryable.value[props.propertyName.concat('.').concat(fieldItem.value.clazz.idField.property).concat('Eq')]=selected.value[fieldItem.value.clazz.idField.property];
    }
  }else{
    selected.value=undefined;
    activeIndex.value=undefined;
    if(fieldItem.value&&fieldItem.value.clazz){
      queryable.value[props.propertyName.concat('.').concat(fieldItem.value.clazz.idField.property).concat('Eq')]="";
    }
  }
  props.loadData();
}
onMounted(()=>{
  uiModelFormItem(props.modelName,props.propertyName).then(formItem=>{
    fieldItem.value=formItem
    if(formItem.clazz){
      queryable.value[props.propertyName.concat('.').concat(formItem.clazz.idField.property).concat('Eq')]=""
      modelList(formItem.clazz.name,{}).then(list=>{
        data.value=list
      })
    }
  })
})
</script>
<style scoped lang="scss">
.model-select-query{
  .el-menu{
    --el-menu-horizontal-height:16px;
    border-bottom:none;
    :deep(.el-sub-menu__title){
      border-bottom:none;
    }
    .el-sub-menu__title{
      border-bottom:none;
    }
  }
}
</style>