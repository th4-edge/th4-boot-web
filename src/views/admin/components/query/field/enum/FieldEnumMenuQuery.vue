<template>
  <div class="field-enum-menu-query">
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
        <el-menu-item index="-1" >全部</el-menu-item>
        <template v-for="(item,index) in enums">
          <el-menu-item :index="index+''" :route="item">{{item.name}}</el-menu-item>
        </template>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import {ElMenu,ElMenuItem,ElSubMenu} from 'element-plus'
import {defineModel, defineProps, onMounted, ref} from "vue";
import {modelEnums} from "@/store/th4/framework/service/api/API.ts";
import {uiModelFormItem} from "@/store/th4/admin/ui/api/API.ts";
const menu=ref();
const props=defineProps<{
  modelName:string,
  propertyName:string,
  loadData:Function
}>()
const activeIndex=ref();
const selected=ref<th4.framework.Enumerated<any>>();
const enums=ref<th4.framework.Enumerated<any>[]>([]);
const fieldItem=ref<th4.admin.ui.EditFormItem>();
const queryable=defineModel<Record<any,any>>('queryable',{required:true});
const emit=defineEmits<{'selected':[item:th4.framework.Enumerated<any>|undefined]}>();
const onSelect=(index:string)=>{
  const i=parseInt(index)
  if(i>=0){
    selected.value=enums.value[i];
    activeIndex.value=index
    queryable.value[props.propertyName.concat('Eq')]=selected.value?.key;
  }else{
    selected.value=undefined;
    activeIndex.value=undefined;
    queryable.value[props.propertyName.concat('Eq')]="";
  }
  props.loadData();
}
onMounted(()=>{
  queryable.value[props.propertyName.concat('Eq')]="";
  uiModelFormItem(props.modelName,props.propertyName).then(_formItem=> {
    fieldItem.value = _formItem
  })
  modelEnums(props.modelName,props.propertyName).then(data=>{
    enums.value=data;
  })
})
</script>
<style scoped lang="scss">
.field-enum-menu-query{
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