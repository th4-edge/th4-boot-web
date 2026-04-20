<template>
  <div class="embed-update-view">
      <basic-form :model-name="props.modelName"
                  v-model:form="form" v-model:form-model="formModel"
                  v-model:from-items="formItems"
                  :auth="auth"
      />
      <div class="action-view">
        <template v-if="$slots['form-submit']">
          <slot name="form-submit" :formSubmit="formSubmit"></slot>
        </template>
        <template v-else>
          <el-button icon="plus" type="primary" @click="formSubmit"> 保 存 </el-button>
        </template>

        <el-button @click="formReset">重置</el-button>
      </div>
  </div>
</template>
<script setup lang="ts">
import {defineProps, defineEmits, ref, defineModel, watch} from "vue"
import BasicForm from "@/views/admin/components/form/basic/BasicForm.vue";
import {FormInstance, ElButton, ElMessage} from "element-plus";
import {modelUpdate} from "@/store/th4/framework/service/api/API.ts";
import {uiModelFormUpdate} from "@/store/th4/admin/ui/api/API.ts";
const props=defineProps<{
  modelName:string,
  uri?:string,
  note?:string,
  auth?:string,
  ignoredFieldNames?:string,
  resetParam?:Function
}>();
const emits=defineEmits<{formSubmit:[any]}>();
const form = ref<FormInstance>();
const formModel = defineModel<any>('form-model',{required:true});
const formItems=ref<th4.admin.ui.EditFormItem[]>([]);

const formSubmit=()=>{
  form.value?.validate((success:boolean)=>{
    if(success) {
      modelUpdate(props.modelName, props.resetParam?props.resetParam(formModel.value):formModel.value,props.uri,props.auth).then((data:any) => {
        ElMessage({
          message: '修改' + (props.note ? props.note : '信息') + '成功',
          type: 'success',
        })
        formReset();
        emits('formSubmit',data)
      }).catch((errorCode: th4.framework.ErrorCode) => {
        ElMessage({
          message: '修改' + (props.note ? props.note : '信息') + '失败：' + errorCode.message,
          type: 'error',
        })
      })
    }
  })
}
const formReset=()=>{
  form.value?.resetFields()
}
watch(()=>props.modelName,()=>{
  uiModelFormUpdate(props.modelName,props.ignoredFieldNames).then(list=>{
    formItems.value=list;
  })
},{immediate:true})
</script>
<style scoped lang="scss">
.embed-update-view {
  width: 100%;
  height: 100%;
  .action-view {
    padding-left: 20px;
    border-top: 1px solid rgb(242, 242, 242);;
    height: 160px;
    display: flex;
    padding-bottom: 40px;
    padding-right: 40px;
    align-items: center;
    justify-items: center;
    justify-content: right;
  }
}
</style>