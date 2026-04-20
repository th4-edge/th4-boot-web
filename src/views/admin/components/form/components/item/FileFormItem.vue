

<template>
  <el-form-item ref="formItemContainer" :label="props.formItem.label" :prop="buildProps(props.formItem)">
    <el-upload
        class="upload-input"
        drag
        :headers="{
          [TokenHeader]:systemStore.token
        }"
        :accept="formItem.file?.accept"
        :name="props.formItem.property"
        :action="`${API}${modelName}/upload/${props.formItem.property}`"
        :on-success="onSuccess"
        :on-remove="onRemove"
        v-model:file-list="fileList"
        :limit="formItem.file.limit"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        将文件拖拽到这里或者 <em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          <template v-if="formItem.file">
            <template v-if="formItem.file.accept">
              {{formItem.file.accept}}文件
            </template>
            <template v-else>
              任意文件
            </template>
            <template v-if="formItem.file.maxSize">
              ，大小小于{{formItem.file.maxSize}}MB
            </template>
            <template v-if="formItem.file.limit">
              ，个数不能多于{{formItem.file.limit}}个
            </template>
          </template>
        </div>
      </template>
    </el-upload>
  </el-form-item>
</template>
<script setup lang="ts">
import {API, TokenHeader} from "@th4/http.config.ts";
import {ElFormItem, ElMessage, ElUpload, UploadFile, UploadFiles} from "element-plus";
import {defineModel, defineProps, onMounted, ref} from "vue";
import {useTh4AdminSystem} from "@/store/th4/admin/system/system.ts";
const props = defineProps<{ modelName: string, formItem: th4.admin.ui.EditFormItem }>()
const formModel = defineModel<Record<string, any>>('formModel', {required: true})
const systemStore = useTh4AdminSystem();
const fileList=ref<UploadFile[]>([])
const buildProps = (formItem: th4.admin.ui.EditFormItem) => {
  let prop = formItem.property;
  let parent = formItem.parent;
  while (parent && parent.property) {
    prop = parent.property + '.' + prop;
    parent = parent.parent
  }
  return prop;
}
onMounted(()=>{
  if(formModel.value[buildProps(props.formItem)]){
    fileList.value.push({
      uid:1,
      name:formModel.value[buildProps(props.formItem)],
      status:'success'
    })
  }
})
const onRemove=(_uploadFile: UploadFile)=>{
  delete formModel.value[buildProps(props.formItem)]
}
const onSuccess=(response: {success:boolean,data?:string,errorCode?:th4.framework.ErrorCode}, uploadFile: UploadFile, uploadFiles: UploadFiles )=>{
  if(!response.success){
    ElMessage.error(
        response.errorCode?.message||'上传文件错误'
    )
    delete formModel.value[buildProps(props.formItem)]
  }else{
    if(response.data){
      uploadFile.name=response.data;
      formModel.value[buildProps(props.formItem)]=response.data
    }
  }
}
</script>
<style scoped lang="scss">
.upload-input{
  width: 60%;
}
</style>