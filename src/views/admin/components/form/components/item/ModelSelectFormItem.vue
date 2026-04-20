<template>
  <el-form-item :label="props.formItem.label" :prop="props.formItem.property">
    <el-select
        v-model="formModel[formItem.property]"
        :placeholder="formItem.describe"
        class="input-item"
        clearable
        :value-key="formItem.clazz?.idField.property"
    >
      <el-option v-if="formItem.clazz"
          v-for="item in options"
          :key="item[formItem.clazz.idField.property]"
          :label="item.name"
          :value="item"
      />
    </el-select>
  </el-form-item>
</template>
<script lang="ts" setup>
import {defineModel, defineProps, onMounted, ref, watch} from "vue";
import {ElFormItem, ElOption, ElSelect} from 'element-plus'
import {modelList} from "@/store/th4/framework/service/api/API.ts";

const props = defineProps<{ modelName: string, formItem: th4.admin.ui.EditFormItem,data?:any[] }>()
const formModel = defineModel<Record<string, any>>('formModel', {required: true})
const options = ref<any[]>(props.data ||[])
onMounted(() => {
  if(!props.data) {
    if (props.modelName) {
      if (props.formItem.clazz) {
        modelList(props.formItem.clazz.name).then(data => {
          options.value = data;
        })
      }
    }
  }
})
watch(()=>props.data,()=>{
  if(props.data){
    options.value=props.data;
  }
})
</script>
<style lang="scss" scoped>
.input-item {
  width: 320px;
  height: auto;
  --el-component-size: 36px;
  --el-border-radius-base: 4px;
  --el-input-focus-border-color: var(--el-color-primary);
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