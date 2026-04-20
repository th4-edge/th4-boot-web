<template>
  <div class="embeddable-model-form">
    <el-form ref="form"
             :label-width="props.labelWidth || 'auto'"
             :model="formModel"
             :rules="formRules"
             :label-position="labelPosition||'top'"
             class="basic-form"
             status-icon>
      <template v-for="formItem in props.formItems">
        <div class="embeddable-model-form-item-row">
                    <basic-form-item max-width
                                     v-model:form-model="formModel"
                                     v-model:form-rules="formRules"
                                     :form-item="{...formItem,parent:formItem&&formItem.type.enumerated?props.formItem:undefined}"
                                     :model-name="props.modelName" :parent-form-item="props.formItem"/>
        </div>
<!--        <template v-if="index*2-2>=0">-->
<!--          <div class="embeddable-model-form-item-row">-->
<!--            <basic-form-item v-if="index*2-2<props.formItems.length"-->
<!--                             v-model:form-model="formModel"-->
<!--                             v-model:form-rules="formRules"-->
<!--                             :form-item="{...props.formItems[index*2-2],parent:props.formItems[index*2-2].type.enumerated?props.formItem:undefined}"-->
<!--                             :model-name="props.modelName" :parent-form-item="props.formItem"/>-->
<!--            <basic-form-item v-if="index*2-1<props.formItems.length"-->
<!--                             v-model:form-model="formModel"-->
<!--                             v-model:form-rules="formRules"-->
<!--                             :form-item="{...props.formItems[index*2-1],parent:props.formItems[index*2-1].type.enumerated?props.formItem:undefined}"-->
<!--                             :model-name="props.modelName" :parent-form-item="props.formItem"/>-->
<!--          </div>-->
<!--        </template>-->
      </template>
    </el-form>
    <div class="embeddable-model-form-bar">
      <el-button icon="plus" @click="addItem">保存{{ props.formItem.label }}</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed, defineProps, ref} from "vue";
import {ElButton, ElForm, FormInstance} from "element-plus";
import BasicFormItem from "@/views/admin/components/form/components/item/BasicFormItem.vue";

const props = defineProps<{
  formItems: th4.admin.ui.EditFormItem[],
  modelName: string,
  formItem: th4.admin.ui.EditFormItem,
  labelWidth?: string,
  labelPosition?: string,
}>();
const formModel = defineModel<Record<string, any>>('formModel', {required: true})
const form = ref<FormInstance>();
const emits = defineEmits(['form-submit'])

const addItem = () => {
  form.value?.validate((valid: boolean) => {
    if (valid) {
      emits('form-submit', formModel.value)
      //form.value?.resetFields()
    }
  });
}
const buildProps = (formItem: th4.admin.ui.EditFormItem) => {
  let prop = formItem.property;
  let parent = formItem.parent;
  while (parent) {
    prop = parent.property + '.' + prop;
    parent = formItem.parent
  }
  return prop;
}
const buildFormItemRules = (formItem: th4.admin.ui.EditFormItem, rules: Record<string, any[]>, parentKey?: string) => {
  const rule = []
  if (formItem.rule?.required) {
    rule.push({required: true, message: `请输入${formItem.label}`, trigger: 'blur'})
  }
  if (formItem.type.name === 'String' && formItem.rule?.max) {
    rule.push({
      min: 0,
      max: formItem.rule.max,
      message: `${formItem.label}长度不能超过${formItem.rule.max}`,
      trigger: 'blur'
    })
  }
  if (formItem.type.number) {
    rule.push({type: 'number', message: `${formItem.label}必须是数字`, trigger: 'blur'})
  }
  if (rule.length > 0) {
    rules[parentKey ? `${parentKey}.${formItem.property}` : formItem.property] = rule
  }
  if (formItem.children && !formItem.type.collection) {
    formItem.children.forEach(child => buildFormItemRules(child, rules, parentKey ? `${parentKey}.${formItem.property}` : formItem.property))
  }
  if (rule.length > 0) {
    rules[buildProps(formItem)] = rule
  }
  return rules
}
const formRules = computed<Record<string, any[]>>(() => props.formItems.reduce((rules: Record<string, any[]>, formItem) => buildFormItemRules(formItem, rules), {}));

</script>
<style lang="scss" scoped>
.embeddable-model-form {
  width: 100%;
  box-sizing: border-box;
  .embeddable-model-form-item-row {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    margin-bottom: 15px;
    //:deep(.el-form-item__label,label) {
    //  width: v-bind(labelWidth) !important;
    //}
    .basic-form-item{
      flex: 1;
    }
    //:deep(.el-input) {
    //  width: 260px !important;
    //}
  }

  .embeddable-model-form-bar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 15px;
  }
}
</style>