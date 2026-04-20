

<template>
  <div class="embed-info-view">
    <slot name="view"></slot>
    <template v-for="index in infoItems.length" v-if="infoItems">
      <template v-if="index*2-2>=0">
        <basic-info-item v-if="infoItems[index*2-2]" v-model:model="model" :info-item="infoItems[index*2-2]"
                         :model-name="props.modelName"
                         :label-width="labelWidth||'200px'"/>
        <basic-info-item v-if="infoItems[index*2-1]" v-model:model="model" :info-item="infoItems[index*2-1]"
                         :model-name="props.modelName"
                         :label-width="labelWidth||'200px'"/>

      </template>
    </template>
    <slot></slot>
    <div class="empty"></div>
  </div>
</template>
<script setup lang="ts">

import BasicInfoItem from "@/views/admin/components/info/item/BasicInfoItem.vue";
import {defineProps, ref, watch} from "vue";
import {uiModelFormInfo} from "@/store/th4/admin/ui/api/API.ts";
import {modelInfo} from "@/store/th4/framework/service/api/API.ts";

const props=defineProps<{
  modelName:string,
  ignoredFieldNames?:string,
  model:any,
  uri?:string,
  auth?:string,
  labelWidth?:string
}>();
const model=ref<any>(props.model);
const infoItems = ref<th4.admin.ui.InfoItem[]>([]);


watch(()=>props.modelName,()=>{
  uiModelFormInfo(props.modelName,props.ignoredFieldNames,props.uri,props.auth).then(list=>{
    infoItems.value=list;
  })
  modelInfo(props.modelName,props.model,props.uri,props.auth).then(data=>{
    model.value=data;
  })
},{immediate:true})
// watch(()=>props.model,()=>{
//   modelInfo(props.modelName,props.model,props.uri,props.auth).then(data=>{
//     model.value=data;
//   })
// },{immediate:true})
</script>
<style scoped lang="scss">
.embed-info-view {
  display: flex;
  flex-wrap: wrap;
}
</style>