<template>
  <div class="embeddable-table-view" v-if="props.data">
    <el-table :data="props.data" :span-method="spanMethod" border stripe>
      <el-table-column label="#" type="index" width="80" />
      <template v-if="props.infoItems">
        <template v-for="infoItem in props.infoItems">
          <basic-table-column :ignored-table-columns="props.ignoredTableColumns" :info-item="infoItem"
                              :multiple="props.multiple" :data="props.data"/>
        </template>
      </template>
      <el-table-column/>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import {ElTable, TableColumnCtx,ElTableColumn} from "element-plus";
import BasicTableColumn from "@/views/admin/components/info/item/components/table/column/BasicTableColumn.vue";

const props = defineProps<{
  data: any[],
  infoItems: th4.admin.ui.InfoItem[],
  multiple?: boolean,
  spanMethod?: ({row, column, rowIndex, columnIndex}: {
    row: any,
    column: TableColumnCtx<any>,
    rowIndex: number,
    columnIndex: number
  }) => any,
  ignoredTableColumns?: string[]
}>();
</script>
<style lang="scss" scoped>
.embeddable-table-view {
  width: 100%;
  height: 100%;
  .el-table{
    --el-table-header-bg-color: #FAFAFA;
    --el-table-header-text-color:#666666;
    --el-table-text-color: #333333;
  }
}
</style>