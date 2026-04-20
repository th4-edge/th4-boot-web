

<template>
  <basic-form-item v-if="formItem" :auth="props.auth" :label-width="props.labelWidth"
                   :model-name="props.modelName" :form="form" :form-rules="formRules" :form-item="formItem" :form-model="formModel"/>
</template>
<script setup lang="ts">
import BasicFormItem from "@/views/admin/components/form/components/item/BasicFormItem.vue";
import {defineModel, defineProps, ref, watch} from "vue";
import {FormInstance} from "element-plus";
import {uiModelFormItem} from "@/store/th4/admin/ui/api/API.ts";
const props=defineProps<{ modelName: string, property:string,auth?:string,labelWidth?:string }>()
const formModel = defineModel<any>('formModel', {required: true})
const formRules = defineModel<Record<string, any[]>>('formRules', {})
const form = defineModel<FormInstance>('form');
const formItem=ref<th4.admin.ui.EditFormItem>();
watch(()=>props.property,()=>{
  uiModelFormItem(props.modelName,props.property).then(item=>{
    formItem.value=item;
  })
},{immediate:true})
</script>
<style scoped lang="scss">

</style>