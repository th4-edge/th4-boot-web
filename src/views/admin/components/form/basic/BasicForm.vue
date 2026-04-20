

<template>
  <el-form ref="form"
           :model="formModel"
           :rules="formRules"
           class="basic-form"
           :label-width="labelWidth"
           :label-position="labelPosition"
           status-icon>
    <template v-for="formItem in formItems">
      <basic-form-item v-model:form-model="formModel" v-model:form="form" v-model:form-rules="formRules" :form-item="formItem"
                       :model-name="props.modelName" :auth="auth" :max-width="'top'==labelPosition" :label-position="labelPosition"/>
    </template>
  </el-form>
</template>
<script setup lang="ts">
import {ElForm, FormInstance} from "element-plus";
import {defineModel, defineProps, ref, watch} from "vue";
import BasicFormItem from "@/views/admin/components/form/components/item/BasicFormItem.vue";
import {modelPropertyUnique} from "@/store/th4/framework/service/api/API.ts";
const props = defineProps<{  modelName: string,auth?:string,labelPosition?:string,labelWidth?:string, }>()
const form = defineModel<FormInstance>('form');
const formModel = defineModel<any>('formModel',{required:true});
const formItems=defineModel<th4.admin.ui.EditFormItem[]>('fromItems',{required:true});
const buildFormItemRules = (formItem: th4.admin.ui.EditFormItem, rules: Record<string, any[]>, parentKey?: string) => {
  const rule = []
  if (formItem.rule?.required) {
    rule.push({required: true, message: `请输入${formItem.label}`, trigger: 'blur'})
  }
  if (formItem.rule?.regex&&formItem.rule.regex.length>0) {
    rule.push({ pattern:new RegExp( `${formItem.rule.regex}`), message: '请输入正确的'+formItem.label, trigger: 'blur' })
  }
  if (formItem.rule?.unique) {
    rule.push({validator: (_rule: any, value: any,callback:Function)=>{
        modelPropertyUnique(props.modelName,formItem.property,value,formModel.value).then((b:boolean)=>{
          if(!b){
            callback(new Error(`已经存在相同的${formItem.property}:${value}`))
          }else{
            callback()
          }

        }).catch((e:th4.framework.ErrorCode)=>{
          callback(new Error(e.message))
        })
      }, trigger: 'blur',message: '已经存在相同的'+formItem.label+',请重新输入。', })
  }
  if (formItem.type.name === 'String' && formItem.rule?.max) {
    rule.push({
      min: 0,
      max: formItem.rule.max,
      message: `${formItem.label}长度不能超过${formItem.rule.max}`,
      trigger: 'blur'
    })
  }
  if (formItem.type.number) {
    rule.push({type: 'number', message: `${formItem.label}必须是数字`, trigger: 'blur'})
  }
  if (rule.length > 0) {
    rules[parentKey ? `${parentKey}.${formItem.property}` : formItem.property] = rule
  }

  if (formItem.children && !formItem.type.collection) {
    formItem.children.forEach(child => buildFormItemRules(child, rules, parentKey ? `${parentKey}.${formItem.property}` : formItem.property))
  }
  return rules
}
const formRules = ref<Record<string, any[]>>({});
watch(()=>formItems.value,()=>{
  formRules.value=formItems.value.reduce((rules: Record<string, any[]>, formItem) => buildFormItemRules(formItem, rules), {});
  form.value?.resetFields()
  form.value?.clearValidate()
},{immediate:true})
watch(()=>formRules.value,()=>{
  form.value?.clearValidate()
},{immediate:true})
</script>
<style scoped lang="scss">
.basic-form{
  width: 100%;
}
</style>