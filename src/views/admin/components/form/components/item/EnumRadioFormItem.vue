<template>
  <el-form-item class="enum-radio-form-item" :label="props.formItem.label" :prop="props.formItem.property">
    <div class="enum-form-item-content">
      <el-radio-group v-model="radioModel">
        <template v-for="option in options">
          <div style="min-width: 120px;margin-bottom: 10px">
            <el-radio :label="option.name" :value="option.key"/>
          </div>
        </template>
      </el-radio-group>
    </div>
  </el-form-item>
</template>
<script lang="ts" setup>
import {computed, defineModel, defineProps, onMounted, ref} from "vue";
import {ElFormItem, ElRadio, ElRadioGroup} from 'element-plus'
import {modelEnums} from "@/store/th4/framework/service/api/API.ts";

const props = defineProps<{ modelName: string, formItem: th4.admin.ui.EditFormItem }>()
const formModel = defineModel<Record<string, any>>('formModel', {required: true})
const options = ref<{ name: string, value: any, key: string }[]>([])
const radioModel = computed({
  set: (val: any) => {
    options.value.forEach(option => {
      if (option.key === val) {
        formModel.value[props.formItem.property] = option
      }
    })
  },
  get: () => formModel.value[props.formItem.property] ? formModel.value[props.formItem.property].key : undefined
})
onMounted(() => {
  if (props.modelName) {
    let fieldName = props.formItem.property;
    let parent = props.formItem.parent;
    while (parent) {
      fieldName = parent.property + '.' + fieldName;
      parent = parent.parent;
    }
    modelEnums(props.modelName, fieldName).then((enums: {
      name: string,
      value: any,
      key: string
    }[]) => {
      options.value = enums;
    })
  }
})
</script>
<style lang="scss" scoped>
.enum-radio-form-item {
  width: 100%;
  .w180 {
    width: 240px;
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
    min-width: 360px;
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
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
  }
}
</style>