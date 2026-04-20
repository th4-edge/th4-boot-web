<template>
  <el-form-item :label="props.formItem.label" :prop="buildProps(props.formItem)">
<!--    <div class="input-item">-->
      <el-date-picker class="input-item"
          v-model="model"
          :editable="false"
          :placeholder="'请选择'+ props.formItem.label"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"/>
<!--    </div>-->
  </el-form-item>
</template>
<script lang="ts" setup>
import {computed, defineModel, defineProps} from 'vue'
import {ElDatePicker, ElFormItem} from 'element-plus'

const props = defineProps<{ modelName: string, formItem: th4.admin.ui.EditFormItem }>()
const model = computed({
  get: () => formModel.value[props.formItem.property] ? (formModel.value[props.formItem.property].dateTime ? formModel.value[props.formItem.property].dateTime : formModel.value[props.formItem.property]) : '',
  set: (value: string) => {
    formModel.value[props.formItem.property] = value;
  }
})

const formModel = defineModel<Record<string, any>>('formModel', {required: true})
const buildProps = (formItem: th4.admin.ui.EditFormItem) => {
  let prop = formItem.property;
  let parent = formItem.parent;
  while (parent) {
    prop = parent.property + '.' + prop;
    parent = parent.parent
  }
  return prop;
}
</script>
<style lang="scss" scoped>
.input-item {
  //:deep(.el-input) {
  width: 260px;
  --el-component-size: 36px;
  --el-border-radius-base: 8px;
  --el-input-focus-border-color: var(--el-color-primary);
  //}

}
</style>