<template>
  <classic-title-view :title="step.name">
    <template #action-bar>
      <slot/>
    </template>
    <div class="view-content">
      <el-scrollbar>
        <embed-info-view :model-name="modelName" :model="props.target" :auth="props.auth">
          <div class="receipt-form-container">
            <title-line :title="step.name"/>
            <embed-save-view v-if="receiptModelName"
                             :ignored-field-names="props.ignoredFieldNames"
                             :data="{...props.target,target:props.target}"
                             :uri="`flow/${props.modelName}/launch/${step.key}`"
                             :model-name="receiptModelName" :submit-text="step.name" @formSubmit="formSubmit"/>
          </div>
        </embed-info-view>
      </el-scrollbar>
    </div>
  </classic-title-view>
</template>
<script setup lang="ts">
import {defineProps, ref, watch} from "vue"
import {ElScrollbar} from "element-plus";
import TitleLine from "@/views/admin/components/layout/classic/container/view/header/TitleLine.vue";
import ClassicTitleView from "@/views/admin/components/layout/classic/container/view/ClassicTitleView.vue";
import EmbedSaveView from "@/views/admin/components/view/save/embed/EmbedSaveView.vue";
import EmbedInfoView from "@/views/admin/components/view/info/embed/EmbedInfoView.vue";
import {flowStageStepReceiptName} from "@/store/th4/framework/flow/api/API.ts";
const props=defineProps<{
  modelName:string,
  target:th4.flow.Target,step:th4.flow.Step,property:string,stage:string
  auth?:string,
  ignoredFieldNames?:string,
}>()
const emits=defineEmits<{
  launch:[th4.flow.Receipt]
}>();
const receiptModelName=ref<string>()
const formSubmit=(receipt:th4.flow.Receipt)=>{
  emits('launch',receipt)
}
watch(()=>props.step,()=>{
  flowStageStepReceiptName(props.modelName,props.property,props.stage,props.step.key).then(modelName=>{
    receiptModelName.value=modelName
  })
},{immediate:true})
</script>
<style scoped lang="scss">
.view-content {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  .receipt-form-container {
    width: 100%;
    padding-left: 40px;
  }
}
</style>