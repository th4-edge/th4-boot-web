<template>
  <div class="embeddable-list-form-item">
    <div class="embeddable-title">{{props.formItem.label}}</div>
<!--    <el-form-item class="embeddable-title" :label="props.formItem.label" :prop="props.formItem.property">-->
    <template v-for="formItem in props.formItem.children"
                v-if="props.formItem.children&&props.formItem.children.length>0">
        <basic-form-item max-width
                         v-model:form-model="embeddableFormModel"
                         v-model:form-rules="formRules"
                         :form-item="{...formItem,parent:props.formItem}" :model-name="props.modelName"/>

      </template>
<!--    </el-form-item>-->
  </div>
</template>
<script lang="ts" setup>
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
.embeddable-list-form-item {
  width: 100%;
  .embeddable-title {
      font-size: 16px !important;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0;
      /* 重点 1F2D3D */
      color: #1F2D3D;
    margin-bottom: 20px;
  }
}
</style>