<template>
  <el-form-item :label="props.formItem.label" :prop="props.formItem.property">
    <el-select
        v-model="formModel[formItem.property]"
        :placeholder="formItem.describe"
        class="input-item"
        clearable
        value-key="key"
    >
      <el-option
          v-for="item in options"
          :key="item.key"
          :label="item.name"
          :value="item"
      />
    </el-select>
  </el-form-item>
</template>
<script lang="ts" setup>
import {defineModel, defineProps, onMounted, ref} from "vue";
import {ElFormItem, ElOption, ElSelect} from 'element-plus'
import {modelEnums} from "@/store/th4/framework/service/api/API.ts";

const props = defineProps<{ modelName: string, formItem: th4.admin.ui.EditFormItem }>()
const formModel = defineModel<Record<string, any>>('formModel', {required: true})
const options = ref<{ name: string, value: any, key: string }[]>([])
onMounted(() => {
  if (props.modelName) {
    let fieldName = props.formItem.property;
    let parent = props.formItem.parent;
    while (parent) {
      fieldName = parent.property + '.' + fieldName;
      parent = parent.parent;
    }
    modelEnums(props.modelName ,fieldName).then((enums: {
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
.input-item {
  width: 320px;
  height: 36px;
  --el-component-size: 36px;
  --el-input-border-radius:  4px;
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