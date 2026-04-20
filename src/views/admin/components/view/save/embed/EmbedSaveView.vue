<template>
  <div class="embed-save-view">
     <slot></slot>
      <basic-form :model-name="props.modelName" style="margin-top: 20px"
                  v-model:form="form" v-model:form-model="formModel"
                  v-model:from-items="formItems"
                  :auth="auth"
      />
      <div class="action-view">
        <el-button icon="plus" type="primary" @click="formSubmit">{{ submitText || ' 保 存 '}}</el-button>
        <el-button @click="formReset">重置</el-button>
      </div>
  </div>
</template>
<script setup lang="ts">
import {defineProps, defineEmits,ref, watch} from "vue"
import BasicForm from "@/views/admin/components/form/basic/BasicForm.vue";
import {FormInstance, ElButton, ElMessage} from "element-plus";
import {modelBuild, modelSave} from "@/store/th4/framework/service/api/API.ts";
import {uiModelFormSave} from "@/store/th4/admin/ui/api/API.ts";
const props=defineProps<{
  modelName:string,
  uri?:string,
  note?:string,
  auth?:string,
  ignoredFieldNames?:string,
  submitText?:string,
  data?:Record<any, any>,
}>();
const emits=defineEmits<{formSubmit:[any]}>();
const form = ref<FormInstance>();
const formModel = ref<any>({});
const formItems=ref<th4.admin.ui.EditFormItem[]>([]);
const formSubmit=()=>{
  form.value?.validate((success:boolean)=>{
    if(success) {
      modelSave(props.modelName, formModel.value,props.uri,props.auth).then((data:any) => {
        ElMessage({
          message: (props.submitText||'新增') + (props.note ? props.note : '信息') + '成功',
          type: 'success',
        })
        formReset();
        emits('formSubmit',data)
      }).catch((errorCode: th4.framework.ErrorCode) => {
        ElMessage({
          message: (props.submitText||'新增') + (props.note ? props.note : '信息') + '失败：' + errorCode.message,
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
  modelBuild(props.modelName).then(model=>{
    formModel.value={...model,...props.data};
  })

  uiModelFormSave(props.modelName,props.ignoredFieldNames).then(list=>{
    formItems.value=list;
  })
},{immediate:true})
</script>
<style scoped lang="scss">
.embed-save-view {
  margin-top: 20px;
  box-sizing: border-box;
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
    box-sizing: border-box;
  }
}
</style>