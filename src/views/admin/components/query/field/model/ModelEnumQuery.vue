
<template>
  <div class="model-enum-query">
    <el-radio-group v-if="fieldItem&&fieldItem.clazz" v-model="queryable[props.propertyName.concat('.').concat(fieldItem.clazz?.idField.property).concat('Eq')]" :size="size||'default'" @change="loadData">
      <el-radio-button label="全部" value=""/>
      <template v-for="item in data">
        <el-radio-button :value="item[fieldItem.clazz.idField.property]">{{item.name}}</el-radio-button>
      </template>
    </el-radio-group>
  </div>
</template>
<script setup lang="ts">
import { ref,defineProps, defineModel,onMounted } from 'vue';
import { ElRadioGroup, ElRadioButton } from 'element-plus'
import { modelList} from "@/store/th4/framework/service/api/API.ts";
import {uiModelFormItem} from "@/store/th4/admin/ui/api/API.ts";
const data=ref<any[]>([]);
const fieldItem=ref<th4.admin.ui.EditFormItem>()
const queryable=defineModel<Record<any,any>>('queryable',{required:true})
const props=defineProps<{
  modelName:string,
  propertyName:string,
  loadData:Function,
  size?:string
}>()
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
.model-enum-query {
  display: flex;
  align-items: center;
}
</style>