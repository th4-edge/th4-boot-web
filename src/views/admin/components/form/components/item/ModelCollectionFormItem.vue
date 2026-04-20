<template>
  <el-form-item :label="props.formItem.label" :prop="props.formItem.property">
    <div>
      <div class="action-form-item-content" @click="selectDialogVisible=true">
        <el-icon class="el-icon" size="14">
          <Plus/>
        </el-icon>
        添加{{ props.formItem.label }}
      </div>
      <div v-if="props.formItem.clazz" class="model-form-item-content">
        <model-table-edit-view v-if="formModel[props.formItem.property]&&props.formItem.clazz.name"
                               :clazz="props.formItem.clazz" :data="formModel[props.formItem.property]"
                               :ignore-table-column="props.ignoreTableColumn"
                               :ignore-table-field="props.ignoreTableField" :model-name="props.formItem.clazz.name"
                               :multiple-column="props.multipleColumn"/>
      </div>
      <div class="summary-form-item-content">
        共
        <span>{{ formModel[props.formItem.property] ? formModel[props.formItem.property].length : 0 }}</span>
        条
        {{ props.formItem.label }}
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
          <title-header :title="'选择'+props.formItem.label"
                        style="padding-bottom: 20px;padding-top: 10px;height:50px"/>
        </template>
        <model-select-table v-if="props.formItem.clazz&&selectDialogVisible"
                            :model-name="props.formItem.clazz.name"
                                :form-model-name="props.modelName"
                                :form-item="props.formItem"
                            multiple
                            @selected="handleSelect"/>
      </el-dialog>
    </div>
  </el-form-item>
</template>
<script lang="ts" setup>
import {defineModel, defineProps, onMounted, ref, watch} from "vue";
import {ElDialog, ElFormItem, ElIcon, TableColumnCtx} from 'element-plus'
import TitleHeader from "@/views/admin/components/layout/classic/container/view/header/TitleHeader.vue";
import ModelTableEditView from "@/views/admin/components/form/components/item/components/ModelTableEditView.vue";
import ModelSelectTable from "@/views/admin/components/select/model/ModelSelectTable.vue";
// import ModelTableEditView from "@/views/admin/manage/form/item/components/ModelTableEditView.vue";
// import TitleHeader from "@/views/layout/classic/container/view/header/TitleHeader.vue";
// import CustomizeModelSelect from "@/views/admin/manage/select/model/CustomizeModelSelect.vue";

const props = defineProps<{
  modelName: string,
  formItem: th4.admin.ui.EditFormItem,
  spanMethod?: ({row, column, rowIndex, columnIndex}: {
    row: any,
    column: TableColumnCtx<any>,
    rowIndex: number,
    columnIndex: number
  }) => any,
  ignoreTableField?: string,
  multipleColumn?: boolean,
  ignoreTableColumn?: string[]
}>()
const formModel = defineModel<Record<string, any>>('formModel', {required: true})
const selectDialogVisible = ref<boolean>(false)
const handleSelect = (selection: any) => {
  if (!formModel.value[props.formItem.property].some((item: any) => item[props.formItem.clazz!.idField.property] === selection[props.formItem.clazz!.idField.property])) {
    formModel.value[props.formItem.property].push(selection)
  }
  selectDialogVisible.value = false
}
onMounted(() => {
  if (!formModel.value[props.formItem.property]) {
    formModel.value[props.formItem.property] = []
  }
})
watch(() => formModel.value[props.formItem.property], () => {
  if (!formModel.value[props.formItem.property]) {
    formModel.value[props.formItem.property] = []
  }
}, {immediate: true})
</script>
<style lang="scss" scoped>
.action-form-item-content {
  font-size: 14px;
  font-weight: 500;
  color: var(--el-color-primary);
  padding: 2px 10px;
  box-sizing: border-box;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;

  .el-icon {
    width: 14px;
    height: 14px;
    font-size: 14px;
    font-weight: 500;
  }

}

.model-form-item-content {
  width: 1200px;
  height: 480px;
  background: inherit;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(242, 242, 242, 1);
  border-radius: 4px;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  margin-top: 10px;

  .model-table-edit-view {
    width: 100%;
    height: 100%;
  }
}

.summary-form-item-content {
  font-size: 14px;

  padding: 2px 10px;
  box-sizing: border-box;
  height: 40px;
  display: flex;
  align-items: center;

  span {
    color: var(--el-color-primary);;
    font-weight: 500;
    margin-left: 4px;
    margin-right: 4px;
  }
}
</style>