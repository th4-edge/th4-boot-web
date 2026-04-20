<template>
  <el-form-item :label="formItem.label" :prop="props.formItem.property" class="enum-collection-form-item">
    <div class="enum-collection-form-item-content">
      <el-checkbox-group v-model="formModel[props.formItem.property]">
        <template v-for="option in options">
          <el-checkbox :label="option.name" :value="option" style="min-width: 120px;margin-bottom: 10px"/>
        </template>
      </el-checkbox-group>
    </div>
  </el-form-item>
</template>
<script lang="ts" setup>
import {defineModel, defineProps, onMounted, ref} from "vue";
import {ElCheckbox, ElCheckboxGroup, ElFormItem} from 'element-plus'
import http from "@th4/http.ts";

const props = defineProps<{ modelName: string, formItem: th4.admin.ui.Field }>()
const formModel = defineModel<Record<string, any>>('formModel', {required: true})
const options = ref<{ name: string, value: any }[]>([])
onMounted(() => {
  if (props.modelName) {
    if (!formModel.value[props.formItem.property]) {
      formModel.value[props.formItem.property] = []
    }
    http.post<any, { name: string, value: any }[]>(props.modelName + '/enums/' + props.formItem.property).then((enums: {
      name: string,
      value: any
    }[]) => {
      options.value = enums;
    })
  }
})
</script>
<style lang="scss" scoped>
.enum-collection-form-item {
  width: 100%;
  box-sizing: border-box;

  .enum-collection-form-item-content {
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

  }
}
</style>