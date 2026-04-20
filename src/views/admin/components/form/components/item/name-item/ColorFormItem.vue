<template>
  <el-form-item ref="formItemContainer" :label="props.formItem.label" :prop="buildProps(props.formItem)">
    <el-color-picker v-model="formModel[props.formItem.property]" show-alpha :predefine="predefineColors"/>
  </el-form-item>
</template>
<script lang="ts" setup>
import {computed, defineModel, defineProps, ref} from 'vue'
import {ElFormItem} from 'element-plus'
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const formItemContainer = ref<any>()
const props = defineProps<{ modelName: string, formItem: th4.admin.ui.EditFormItem }>()
const formModel = defineModel<Record<string, any>>('formModel', {required: true})
const buildProps = (formItem: th4.admin.ui.EditFormItem) => {
  let prop = formItem.property;
  let parent = formItem.parent;
  while (parent && parent.property) {
    prop = parent.property + '.' + prop;
    parent = parent.parent
  }
  return prop;
}
const width = computed(() => {
  let width = 300;
  if (props.formItem.lob) {
    width = 800;
  }
  if (props.formItem.rule?.max) {

    if (props.formItem.rule.max >= 128) {
      width = 480
    }
    if (props.formItem.rule.max >= 64) {
      width = 360
    }
  }
  //if(formItemContainer.value?.$el.offsetWidth>width){
  return width + 'px';
  // }else{
  //   return formItemContainer.value?.$el.offsetWidth*0.9+'px';
  // }

})
</script>

<style lang="scss" scoped>
.input-item {
  width: v-bind(width);
  --el-component-size: 36px;
  --el-border-radius-base: 8px;
  --el-input-focus-border-color: var(--el-color-primary);
  textarea{
    width: 800px;
  }
}
.example{
  margin-left: 10px;
  color: #AAAAAA;
  font-size: 12px;
}
</style>