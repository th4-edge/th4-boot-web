<template>
  <div class="data-model-table-embeddable-edit-view">
    <el-table :data="data.key" border highlight-current-row stripe>
      <el-table-column fixed label="序号" type="index" width="60"/>
      <template v-for="tableColumn in keyTableColumns">
        <template v-if="tableColumn.visible">
          <basic-table-column :ignore-table-column="props.ignoreTableColumn" :model-name="props.map.key.clazz.name"
                              :multiple-column="props.multipleColumn" :table-column="tableColumn"/>
        </template>
      </template>
      <template v-if="map.value.children">
        <template v-for="formItem in map.value.children">
          <el-table-column :label="formItem.label" width="180">
            <template #default="row">
              <basic-table-column-form-item v-model:data="data.value[row.$index][formItem.property]" :form-item="props.formItem" :map="props.map"
                                            :model-name="props.modelName"/>
            </template>
          </el-table-column>
        </template>
      </template>
      <template v-else>
        <el-table-column :label="props.map.value.clazz.note" fixed="right" width="180">
          <template #default="row">
            <basic-table-column-form-item v-model:data="data.value[row.$index]" :form-item="props.formItem" :map="props.map"
                                          :model-name="props.modelName"/>
          </template>
        </el-table-column>
      </template>
      <el-table-column align="center" fixed="right">
        <template #header>
          <slot/>
        </template>
        <template #default="row">
          <el-button icon="Delete" link @click="handleDelete(row.$index)"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import {defineProps, ref, watch} from "vue";
import {ElButton, ElTable, ElTableColumn, TableColumnCtx} from "element-plus";
import {uiModelTableViewColumns} from "@/store/th4/admin/ui/api/API.ts";
import BasicTableColumnFormItem
  from "@/views/admin/components/form/components/item/components/column-item/BasicTableColumnFormItem.vue";
import BasicTableColumn from "@/views/admin/components/table/column/BasicTableColumn.vue";

const props = defineProps<{
  modelName: string,
  formItem: th4.admin.ui.EditFormItem,
  map: th4.admin.ui.MapProperty<th4.admin.ui.EditFormItem>,
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
const keyTableColumns = ref<th4.admin.ui.TableColumn[]>([]);
const data = defineModel<{ key: any[], value: any[] }>('data', {required: true})

const handleDelete = (index: number) => {
  data.value.key.splice(index, 1);
  data.value.value.splice(index, 1);
}
const loadTableColumns = async (modelName: string) => {
  return await uiModelTableViewColumns(modelName, props.ignoreTableField);
}

watch(() => props.map.key.clazz.name, () => {
  loadTableColumns(props.map.key.clazz.name).then(data => {
    keyTableColumns.value = data;
  });
}, {immediate: true})

</script>

<style lang="scss" scoped>
.data-model-table-embeddable-edit-view {
  .el-table {
    background-color: inherit;
    width: 100%;
    height: 100%;
    //--el-table-border-color: none;
    //--el-table-border:1px solid rgba(242, 242, 242, 1);;
    //--el-table-border: 0;
    //--el-fill-color-lighter:rgba(242, 242, 242, 0.498039215686275);
    --el-table-header-bg-color: rgba(242, 242, 242, 1);
    //--el-fill-color-light:rgba(242, 242, 242, 0.498039215686275);
    .el-table__inner-wrapper::before {
      height: 0;
    }

    :deep(.cell) {
      padding: 4px 10px !important;
    }

    :deep(.el-table__cell) {
      border-bottom: 1px solid rgba(242, 242, 242, 1) !important;
    }

    :deep(.el-table__body tr.hover-row > td.el-table__cell) {
      //background-color: #2561EF;
      color: var(--el-color-primary);
      font-weight: 200;
    }
  }
}
</style>