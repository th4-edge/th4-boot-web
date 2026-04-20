<template>
  <div class="map-model-number-form-item">
    <div class="map-model-number-form-item-container">
      <div class="action-form-item-content" @click="selectDialogVisible=true">
        <el-icon class="el-icon" size="14">
          <Plus/>
        </el-icon>
        添加{{ props.formItem.label }}
      </div>
      <div v-if="props.formItem.map&&props.formItem.map.key.clazz.name" class="model-form-item-content">
        <data-model-table-embeddable-edit-view v-if="formModel[props.formItem.property]"
                                               v-model:data="formModel[props.formItem.property]"
                                               :form-item="props.formItem"
                                               :ignore-table-column="props.ignoreTableColumn"
                                               :ignore-table-field="props.ignoreTableField"
                                               :map="props.formItem.map"
                                               :model-name="props.modelName"
                                               :multiple-column="props.multipleColumn"
                                               :span-method="props.spanMethod"
        />
      </div>
      <div class="summary-form-item-content">
        共
        <span>{{ formModel[props.formItem.property] ? formModel[props.formItem.property].key.length : 0 }}</span>
        条
        {{ props.formItem.label }}
      </div>
      <el-dialog v-if="props.formItem.map&&props.formItem.map.key.clazz.name"
                 v-model="selectDialogVisible"
                 :show-close="false"
                 append-to-body
                 top="15vh"
                 width="60%"
      >
        <template #header>
          <title-header :title="'选择'+props.formItem.label"
                        style="padding-bottom: 20px;padding-top: 10px;height:50px"/>
        </template>
        <model-select-table v-if="props.formItem.map&&props.formItem.map.key.clazz.name&&selectDialogVisible"
                            :model-name="props.formItem.map.key.clazz.name"
                            :queryable="props.queryable"
                            :sortable="props.sortable"
                            multiple
                            @selected="handleSelect"/>
      </el-dialog>
    </div>
  </div>

</template>
<script lang="ts" setup>

import {defineModel, defineProps, onMounted, ref} from "vue";
import {ElDialog, ElIcon, TableColumnCtx} from "element-plus";
import TitleHeader from "@/views/admin/components/layout/classic/container/view/header/TitleHeader.vue";
import DataModelTableEmbeddableEditView
  from "@/views/admin/components/form/components/item/components/DataModelTableEmbeddableEditView.vue";
import ModelSelectTable from "@/views/admin/components/select/model/ModelSelectTable.vue";

const props = defineProps<{
  modelName: string, formItem: th4.admin.ui.EditFormItem
  spanMethod?: ({row, column, rowIndex, columnIndex}: {
    row: any,
    column: TableColumnCtx<any>,
    rowIndex: number,
    columnIndex: number
  }) => any,
  ignoreTableField?: string,
  multipleColumn?: boolean,
  ignoreTableColumn?: string[],
  matchSelection?: (selection: any) => boolean,
  sortable?: any,
  queryable?: any,
}>()
const formModel = defineModel<Record<string, any>>('formModel', {required: true})
const selectDialogVisible = ref<boolean>(false)
const handleSelect = (selection: any) => {

    if (!formModel.value[props.formItem.property].key.some((item: any) => item[props.formItem.map!.key.clazz!.idField.property] === selection[props.formItem.map!.key.clazz!.idField.property])) {
      if (!props.matchSelection || props.matchSelection(selection)) {
        formModel.value[props.formItem.property].key.push(selection)
        if (props.formItem.map?.value.type.model) {
          formModel.value[props.formItem.property].value.push({})
        } else {
          formModel.value[props.formItem.property].value.push(undefined)
        }
      }
    }

  selectDialogVisible.value = false
}
onMounted(() => {
  if (!formModel.value[props.formItem.property]) {
    formModel.value[props.formItem.property] = {
      key: [],
      value: []
    }
  }
})
</script>
<style lang="scss" scoped>
.map-model-number-form-item {
  .map-model-number-form-item-container {
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

      .data-model-table-embeddable-edit-view {
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
        color: var(--el-color-primary);
        font-weight: 500;
        margin-left: 4px;
        margin-right: 4px;
      }
    }
  }
}
</style>