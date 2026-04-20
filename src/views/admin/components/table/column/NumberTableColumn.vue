<template>
  <template v-if="props.tableColumn.property==='date'">
    <date-table-column :parent-columns="props.parentColumns" :table-column="props.tableColumn"></date-table-column>
  </template>
  <template v-else-if="props.tableColumn.property==='dateTime'">
    <date-time-table-column :parent-columns="props.parentColumns"
                            :table-column="props.tableColumn"></date-time-table-column>
  </template>
  <template v-else>
    <el-table-column
        :column-key="props.tableColumn.property"
        :fixed="(props.parentColumns&&props.parentColumns[0]&&props.parentColumns[0].fixed)||props.tableColumn.fixed? 'left' : false"
        :label="props.tableColumn.label"
        :prop="props.parentColumns? `${props.parentColumns.map(c => c.property).join('.')}.${props.tableColumn.property}` : props.tableColumn.property"
        :sortable="props.tableColumn.sortable? 'custom' : false"
        align="center"
        width="120">
      <template #default="{row}">
        {{ getRowValue(row) }} {{tableColumn.unit}}
      </template>
    </el-table-column>
  </template>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue';
import {ElTableColumn} from 'element-plus';
import DateTableColumn from "@/views/admin/components/table/column/DateTableColumn.vue";
import DateTimeTableColumn from "@/views/admin/components/table/column/DateTimeTableColumn.vue";

const props = defineProps<{ tableColumn: th4.admin.ui.TableColumn, parentColumns?: th4.admin.ui.TableColumn[] }>();
const getRowValue = (row: any) => {
  if (props.parentColumns) {
    for (let parentColumn of props.parentColumns) {
      row = row[parentColumn.property];
      if (row === undefined || row === null) {
        return '';
      }
    }
  }
  return row[props.tableColumn.property] != undefined && row[props.tableColumn.property] != null ? (props.tableColumn.type.name === 'BigDecimal' ? row[props.tableColumn.property].toFixed(2) : row[props.tableColumn.property]) : '';
}
</script>
<style lang="scss" scoped>

</style>