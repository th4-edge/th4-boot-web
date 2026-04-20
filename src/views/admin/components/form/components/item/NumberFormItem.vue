<template>
  <el-form-item :label="formItem.label" :prop="buildProps(formItem)">
    <el-input v-model.number="formModel[props.formItem.property]" :placeholder="formItem.describe" class="input-item"
              type="number">
      <template v-if="formItem.unit" #suffix>
        {{ formItem.unit }}
      </template>
    </el-input>
  </el-form-item>
</template>
<script lang="ts" setup>
import {defineModel, defineProps} from 'vue'
import {ElFormItem, ElInput} from 'element-plus'

const props = defineProps<{ modelName: string, formItem: th4.admin.ui.EditFormItem }>()
const formModel = defineModel<Record<string, any>>('formModel', {required: true})
const buildProps = (formItem: th4.admin.ui.EditFormItem) => {
  let prop = formItem.property;
  let parent = formItem.parent;
  if (parent) {
    prop = parent.property + '.' + prop;
    parent = parent.parent
  }
  return prop;
}
</script>
<style lang="scss" scoped>
.input-item {
  width: 320px;
  --el-component-size: 36px;
  --el-border-radius-base: 8px;
  --el-input-focus-border-color: var(--el-color-primary);
}

.input-item::-webkit-inner-spin-button,
.input-item::-webkit-outer-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}

/* 对Firefox进行兼容 */
.input-item[type=number] {
  -moz-appearance: textfield;
}
</style>