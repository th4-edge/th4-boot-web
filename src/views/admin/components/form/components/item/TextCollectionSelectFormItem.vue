<template>
  <el-form-item :label="props.formItem.label" :prop="props.formItem.property">
    <el-select
        v-model="formModel[formItem.property]"
        :placeholder="formItem.describe"
        class="input-item"
        :multiple="multiple"
        clearable
    >
      <el-option
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item"
      />
    </el-select>
  </el-form-item>
</template>
<script lang="ts" setup>
import {defineModel, defineProps, onMounted, ref, watch} from "vue";
import {ElFormItem, ElOption, ElSelect} from 'element-plus'
import http from "@th4/http.ts";

const props = defineProps<{ modelName: string, formItem: th4.admin.ui.EditFormItem,uri?:string,data?:any[],multiple?:boolean }>()
const formModel = defineModel<Record<string, any>>('formModel', {required: true})
const options = ref<any[]>([])
onMounted(() => {
  if (props.uri) {
    http.post<any,any[]>(props.uri).then((data:any[])=>{
      options.value=data;
    })
  }

})
watch(()=>props.data,()=>{
  if(props.data){
    options.value=props.data;
  }
},{immediate:true,deep:true})
</script>
<style lang="scss" scoped>
.input-item {
  width: 260px;
  height: 36px;
  --el-component-size: 36px;
  --el-border-radius-base: 8px;
  --el-input-focus-border-color: var(--el-color-primary);

  :deep(.el-select__wrapper) {
    padding: 7px 12px !important;
    min-height: 36px;
  }
}

.enum-form-item-content {
  width: 80%;
  background: inherit;
  background-color: rgba(26, 107, 232, 0.0470588235294118);
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(242, 242, 242, 1);
  border-radius: 8px;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  padding: 20px;
}
</style>