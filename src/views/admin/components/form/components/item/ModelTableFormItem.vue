<template>
  <el-form-item :label="props.formItem.label" :prop="props.formItem.property">
    <div class="model-container-wrapper">
      <div class="model-container input-item" @click="selectDialogVisible=true">
        <div class="input-item-content">
        {{ name ? name.substring(0, name.length - 1) : '' }}
        </div>
        <div v-if="formModel[props.formItem.property]" class="close"
             @click.stop="formModel[props.formItem.property]=undefined">
          <el-icon>
            <CircleClose/>
          </el-icon>
        </div>
        <div class="icon">
          <el-icon>
            <Document/>
          </el-icon>
        </div>
      </div>
      <div v-if="props.formItem.clazz?.features.includes('Enumerated')" class="model-add"
           @click.stop="saveDialogVisible=true">
        <el-icon>
          <Plus/>
        </el-icon>
      </div>
    </div>
    <el-dialog v-if="props.formItem.clazz"
               v-model="selectDialogVisible"
               :show-close="false"
               append-to-body
               class="model-select-dialog"
               top="15vh"
               width="60%"
    >
      <template #header>
        <title-header :title="'选择'+props.formItem.label" style="padding-bottom: 20px;padding-top: 10px;height:50px"/>
      </template>
      <model-select-table :model-name="props.formItem.clazz.name"
                          :queryable="props.queryable"
                          :keyword="props.keyword"
                          :ignore-table-field="props.ignoreTableField"
                          :ignore-table-column="props.ignoreTableColumn"
                          :uri="props.uri"
                          :auth="props.auth"
                          @selected="handleSelect"/>
    </el-dialog>
  </el-form-item>
</template>
<script lang="ts" setup>
import {ElDialog, ElFormItem, ElIcon} from 'element-plus';
import {computed, defineModel, defineProps, onMounted, ref} from 'vue';
import TitleHeader from "@/views/admin/components/layout/classic/container/view/header/TitleHeader.vue";
import ModelSelectTable from "@/views/admin/components/select/model/ModelSelectTable.vue";

const props = defineProps<{
  modelName: string,
  formItem: th4.admin.ui.EditFormItem
  queryable?:Record<string, any>,
  keyword?:string,
  ignoreTableField?: string,
  ignoreTableColumn?: string[],
  uri?: string,
  auth?:string,
}>()
const formModel = defineModel<Record<string, any>>('formModel', {required: true})
const selectDialogVisible = ref<boolean>(false)
const saveDialogVisible = ref<boolean>(false)
const handleSelect = (item: any) => {
  formModel.value[props.formItem.property] = item
  selectDialogVisible.value = false
}

onMounted(() => {
})
const name = computed<string>(() => props.formItem.clazz?.nameFields.reduce((name, field) => {
  if (!field.type.model) {
    if (formModel.value[props.formItem.property] && formModel.value[props.formItem.property][field.property]) {
      return name.concat(formModel.value[props.formItem.property][field.property] + '  ')
    }
  }
  return name
}, ' ') || ' ')
</script>
<style lang="scss" scoped>

.model-container-wrapper {
  box-sizing: border-box;
  padding-right: 24px;
  .input-item{
    width: 320px;
    --el-component-size: 36px;
    --el-input-border-radius:  4px;
    --el-input-focus-border-color: var(--el-color-primary);
  }
  .model-container {
    height: var(--el-component-size);
    align-items: center;
    background-color: var(--el-input-bg-color, var(--el-fill-color-blank));
    background-image: none;
    border-radius: var(--el-input-border-radius);
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
    cursor: pointer;
    display: inline-flex;
    justify-content: start;
    padding: 1px 12px;
    transform: translateZ(0);
    transition: var(--el-transition-box-shadow);
    color: var(--el-text-color-regular);
    box-sizing: border-box;
    &:hover {
      box-shadow: 0 0 0 1px var(--el-color-primary) inset;
    }
    .input-item-content{
      display: flex;
      align-items: center;
      height: var(--el-component-size);
      box-sizing: border-box;
    }
    .close {
      width: 34px;
      height: 34px;
      position: absolute;
      right: 34px;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--el-text-color-secondary);
      transition: var(--el-transition-color);
      box-sizing: border-box;
      &:hover {
        color: var(--el-color-primary);
      }
    }

    .icon {
      width: 34px;
      height: 34px;
      position: absolute;
      right: 10px;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--el-text-color-secondary);
      box-sizing: border-box;
    }
  }

  .model-add {
    margin-left: 10px;
    width: 18px;
    height: 34px;
    align-items: center;
    background-color: var(--el-input-bg-color, var(--el-fill-color-blank));
    background-image: none;
    border-radius: 8px;
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
    cursor: pointer;
    display: inline-flex;
    justify-content: start;
    padding: 1px 12px;
    transform: translateZ(0);
    transition: var(--el-transition-box-shadow);
    color: var(--el-text-color-regular);
    box-sizing: border-box;
    &:hover {
      color: var(--el-color-primary);
      box-shadow: 0 0 0 1px var(--el-color-primary) inset;
    }
  }
}

.model-select-dialog {
  --el-dialog-padding-primary: 0 !important;
  --el-dialog-padding: 0 !important;
}

</style>