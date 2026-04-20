<template>
  <el-form-item ref="formItemContainer" :label="props.formItem.label" :prop="buildProps(props.formItem)">
    <el-input v-model="formModel[props.formItem.property]" :class="{'text-area-input':formItem.lob}"
              :placeholder="props.formItem.describe||props.formItem.example||'请输入'.concat(props.formItem.label)"
              :rows="(formItem.lob||(formItem.rule&&formItem.rule.max&&formItem.rule?.max>=256))?6:1" :type="(formItem.lob||(formItem.rule&&formItem.rule.max&&formItem.rule?.max>=256))?'textarea':'text'" class="input-item"/>
    <span class="example" v-if="props.formItem.example">{{props.formItem.example}}</span>
  </el-form-item>
</template>
<script lang="ts" setup>
import {computed, defineModel, defineProps, ref} from 'vue'
import {ElFormItem, ElInput} from 'element-plus'

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