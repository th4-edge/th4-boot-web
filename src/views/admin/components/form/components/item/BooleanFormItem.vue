<template>
  <el-form-item :label="props.formItem.label" :prop="buildProps(props.formItem)">
    <div class="switch-wrapper">
      <el-switch v-model="formModel[props.formItem.property]"
                 active-text="是"
                 class="wl-switch"
                 inline-prompt
                 size="large"
                 width="42"></el-switch>
    </div>

  </el-form-item>
</template>
<script lang="ts" setup>
import {ElFormItem, ElSwitch} from 'element-plus';
import {defineModel, defineProps} from 'vue';

const props = defineProps<{ modelName: string, formItem: th4.admin.ui.EditFormItem }>()
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
.switch-wrapper {
  width: 320px;
  height: 34px;
  display: flex;
  justify-content: start;
  align-items: center;

  .wl-switch {
    height: 36px;
  }
}
</style>