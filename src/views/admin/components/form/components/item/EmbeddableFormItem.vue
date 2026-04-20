<template>
  <div class="embeddable-form-item">
    <el-form-item :label="props.formItem.label" :prop="props.formItem.property">
    </el-form-item>
    <template v-for="childrenItem in props.formItem.children"
              v-if="props.formItem.children&&props.formItem.children.length>0">
      <basic-form-item
                       v-model:form-model="embeddableFormModel"
                       v-model:form-rules="formRules"
                       :form-item="{...childrenItem,parent:props.formItem}" :model-name="props.modelName"/>
    </template>
  </div>
</template>
<script lang="ts" setup>
import {ElFormItem} from "element-plus";
import {computed, defineModel, defineProps} from "vue";
import BasicFormItem from "@/views/admin/components/form/components/item/BasicFormItem.vue";

const props = defineProps<{ modelName: string, formItem: th4.admin.ui.EditFormItem }>()
const formModel = defineModel<Record<string, any>>('formModel', {required: true})
const formRules = defineModel<Record<string, any[]>>('formRules', {})
const embeddableFormModel = computed(() => {
  if (!formModel.value[props.formItem.property]) {
    formModel.value[props.formItem.property] = {}
  }
  return formModel.value[props.formItem.property]
})
</script>
<style lang="scss" scoped>
.embeddable-form-item {
  width: 100%;

  .embeddable-form-item-content {
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
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;

    .embeddable-form-item-content-row {
      display: flex;
      flex-wrap: nowrap;
      height: 100%;
      box-sizing: border-box;
      margin-bottom: 15px;

      :deep(.el-form-item__label,label) {
        width: 160px !important;
      }

      :deep(.el-input) {
        width: 260px !important;
      }
    }
  }
}
</style>