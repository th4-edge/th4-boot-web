<template>
  <div class="model-table-edit-view">
    <el-table :data="props.data" border highlight-current-row stripe>
      <el-table-column fixed label="序号" type="index" width="60"/>
      <template v-for="tableColumn in tableColumns">
        <template v-if="tableColumn.visible">
          <basic-table-column :ignore-table-column="props.ignoreTableColumn" :model-name="props.modelName"
                              :multiple-column="props.multipleColumn" :table-column="tableColumn" />
        </template>
      </template>
      <el-table-column align="center" fixed="right" width="120">
        <template #header>
          <slot/>
        </template>
        <template #default="{row}">
          <el-button icon="Delete" link @click="props.data.splice(row.$index, 1)"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import {defineProps, ref, watch} from "vue";
import {ElButton, ElTable, ElTableColumn, TableColumnCtx} from "element-plus";
import {uiModelTableViewColumns} from "@/store/th4/admin/ui/api/API.ts";
import BasicTableColumn from "@/views/admin/components/table/column/BasicTableColumn.vue";

const props = defineProps<{
  data: any[],
  modelName: string,
  clazz: th4.admin.ui.Clazz,
  spanMethod?: ({row, column, rowIndex, columnIndex}: {
    row: any,
    column: TableColumnCtx<any>,
    rowIndex: number,
    columnIndex: number
  }) => any,
  ignoreTableField?: string,
  uri?: string,
  multipleColumn?: boolean,
  ignoreTableColumn?: string[]
}>();
const tableColumns = ref<th4.admin.ui.TableColumn[]>([]);
const loadTableColumn = () => {
  uiModelTableViewColumns(props.modelName, props.ignoreTableField, props.uri).then(columns => {
    tableColumns.value = columns;
  })
}
//
watch(() => props.modelName, () => {
  if (props.modelName) {
    loadTableColumn();
  }
}, {immediate: true})
</script>
<style lang="scss" scoped>
.model-table-edit-view {
  .el-table {
    background-color: inherit;
    width: 100%;
    height: 100%;
    --el-table-header-bg-color: #FAFAFA;
    --el-table-header-text-color:#666666;
    --el-table-text-color: #333333;
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