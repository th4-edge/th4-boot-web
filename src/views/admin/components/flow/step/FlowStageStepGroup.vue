

<template>
    <template v-if="steps" v-for="step in steps">
      <el-tooltip :content="step.name">
        <el-button link @click="handleClick(step)">
          <template #default>
            <x-icon :name="step.key" :size="16"/>
          </template>
        </el-button>
      </el-tooltip>
    </template>
</template>
<script setup lang="ts">
import {defineProps, ref, watch} from "vue"
import {ElButton,ElTooltip} from "element-plus";
import {flowStageSteps} from "@/store/th4/framework/flow/api/API.ts";
import XIcon from "@/views/admin/components/icon/XIcon.vue";
const props=defineProps<{
  modelName:string,
  property:string,
  stage:th4.framework.Enumerated<any>,
  target:th4.flow.Target
}>();
const emits=defineEmits<{'step':[th4.flow.Target,th4.framework.Enumerated<any>]}>()
const steps=ref<th4.framework.Enumerated<any>[]>([])

watch(()=>props.stage,()=>{
  flowStageSteps(props.modelName,props.property,props.stage.key).then(list=>{
    steps.value=list;
  })
},{immediate:true})
const handleClick=(step:th4.framework.Enumerated<any>)=>{
  emits('step',props.target,step)
}
</script>
<style scoped lang="scss">

</style>