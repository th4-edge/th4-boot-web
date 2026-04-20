

<template>
  <div class="basic-save-view">
    <classic-title-view :title="props.title||('新增'.concat(modelClazz?.note||''))">
      <template #action-bar>
        <slot name="action-bar"/>
      </template>
      <div class="basic-save-view-content">
        <el-scrollbar>
          <embed-save-view :model-name="props.modelName" :auth="props.auth" :data="props.data" :uri="props.uri" :ignored-field-names="props.ignoredFieldNames" @form-submit="formSubmit">
            <slot/>
          </embed-save-view>
        </el-scrollbar>
      </div>
    </classic-title-view>
  </div>
</template>
<script setup lang="ts">
import {defineProps,defineEmits, ref, watch} from "vue"
import ClassicTitleView from "@/views/admin/components/layout/classic/container/view/ClassicTitleView.vue";
import EmbedSaveView from "@/views/admin/components/view/save/embed/EmbedSaveView.vue";
import {ElScrollbar} from "element-plus";
import {uiModelViewLayout} from "@/store/th4/admin/ui/api/API.ts";
const props=defineProps<{
  title?:string,
  modelName:string,
  uri?:string,
  auth?:string,
  ignoredFieldNames?:string,
  data?:Record<any, any>
}>();
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
.basic-save-view{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .basic-save-view-content{
    //width: 100%;
    //height: 100%;
    margin-top: 20px;
    margin-bottom: 40px;
    box-sizing: border-box;
  }
}
</style>