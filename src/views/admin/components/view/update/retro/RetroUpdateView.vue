<template>
  <div class="retro-update-view">
    <div class="retro-update-header">
      <div class="icon">
        <x-icon name="Edit"/>
      </div>
      <div class="title">
        {{ title || '修改'.concat(modelClazz?.note||'') }}
      </div>
    </div>
    <div class="retro-update-container">
      <div class="retro-update-content">
        <basic-form :model-name="props.modelName" :style="{width: $slots&&$slots['preview']?'100%':'50%'}"
                    v-model:form="form" v-model:form-model="formModel"
                    v-model:from-items="formItems"
                    :auth="auth" label-position="top"
        />
      </div>
      <div class="retro-update-preview" v-if="$slots&&$slots['preview']">
        <slot name="preview" :model-name="modelName" :form-model="formModel"></slot>
      </div>
    </div>
    <div class="retro-update-footer">
      <el-button @click="formReset"> 取 消 </el-button>
      <el-button type="primary" @click="formSubmit">保存{{modelClazz?.note}}</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import XIcon from "@/views/admin/components/icon/XIcon.vue";
import BasicForm from "@/views/admin/components/form/basic/BasicForm.vue";
import {defineEmits, defineModel, defineProps, ref, watch} from "vue";
import {ElMessage, FormInstance} from "element-plus";
import {modelUpdate} from "@/store/th4/framework/service/api/API.ts";
import {uiModelFormUpdate, uiModelViewLayout} from "@/store/th4/admin/ui/api/API.ts";

const props=defineProps<{
  title?:string,
  modelName:string,
  uri?:string,
  note?:string,
  auth?:string,
  ignoredFieldNames?:string,
  submitText?:string,
  data?:Record<any, any>,
  resetParam?:Function
  back?:Function
}>();
const emits=defineEmits<{formSubmit:[any]}>();
const form = ref<FormInstance>();
const formModel = defineModel<any>('form-model',{required:true});
const formItems=ref<th4.admin.ui.EditFormItem[]>([]);
const modelClazz = ref<th4.admin.ui.Clazz>();
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
  form.value?.resetFields();
  props.back&&props.back()
}
watch(()=>props.modelName,()=>{
  uiModelViewLayout(props.modelName).then(clazz => {
    modelClazz.value = clazz
  })
  uiModelFormUpdate(props.modelName,props.ignoredFieldNames).then(list=>{
    formItems.value=list;
  })
},{immediate:true})
</script>
<style lang="scss" scoped>
.retro-update-view {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #FFFFFF;
  .retro-update-header{
    height: 56px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px;
    border-width: 0 0 1px 0;
    border-style: solid;
    border-color: #E4E4E4;
    box-sizing: border-box;
    .icon{
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #1F2D3D;
      margin-right: 8px;
    }
    .title{
      height: 16px;
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
      text-align: right;
      letter-spacing: 0;
      /* 重点 1F2D3D */
      color: #1F2D3D;
    }
    &:hover{
      .icon{
        color: #2561EF;
      }
    }
  }
  .retro-update-container{
    width: 100%;
    height: calc(100% - 56px - 66px);
    display: flex;
    box-sizing: border-box;
    .retro-update-content{
      flex: 1;
      height: 100%;
      padding: 20px;
      overflow: auto;
      border-width: 0 1px 0 0;
      border-style: solid;
      border-color: #E4E4E4;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
    }
    .retro-update-preview{
      flex: 2;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      overflow: auto;
    }
  }

  .retro-update-footer{
    height: 66px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 20px 20px 20px;
    box-sizing: border-box;
  }
}
</style>