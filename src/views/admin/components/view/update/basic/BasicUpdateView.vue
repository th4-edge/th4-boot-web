

<template>
  <div class="basic-update-view">
    <classic-title-view :title="title||'修改'.concat(modelClazz?.note||'')">
      <template #action-bar>
        <slot name="action-bar"/>
      </template>
      <div class="basic-update-view-content">
        <el-scrollbar>
          <embed-update-view :model-name="modelName" :auth="props.auth" :reset-param="props.resetParam" :ignored-field-names="ignoredFieldNames" :uri="uri" v-model:form-model="formModel"  @form-submit="formSubmit"/>
        </el-scrollbar>
      </div>
    </classic-title-view>
  </div>
</template>
<script setup lang="ts">
import {defineProps, defineEmits, ref, watch, defineModel} from "vue"
import ClassicTitleView from "@/views/admin/components/layout/classic/container/view/ClassicTitleView.vue";
import {ElScrollbar} from "element-plus";
import {uiModelViewLayout} from "@/store/th4/admin/ui/api/API.ts";
import EmbedUpdateView from "@/views/admin/components/view/update/embed/EmbedUpdateView.vue";
const props=defineProps<{
  title?:string,
  modelName:string,
  uri?:string,
  auth?:string,
  ignoredFieldNames?:string,
  resetParam?:Function
}>();
const formModel = defineModel<any>('form-model',{required:true});
const emits=defineEmits<{formSubmit:[any]}>();
const modelClazz=ref<th4.admin.ui.Clazz>()
const formSubmit=(model:any)=>{
  emits('formSubmit',model)
}
watch(()=>props.modelName,()=>{
  uiModelViewLayout(props.modelName).then(clazz=>{
    modelClazz.value=clazz;
  })
},{immediate:true})
</script>
<style scoped lang="scss">
.basic-update-view{
  width: 100%;
  height: 100%;
  .basic-update-view-content{
    width: 100%;
    height: 100%;
    padding-top: 20px;
    margin-bottom: 40px;
  }
}
</style>