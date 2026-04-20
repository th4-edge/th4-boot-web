<template>
  <el-table-column v-if="parentColumns?.children?.length==1"
      :column-key="props.tableColumn.property"
      :fixed="(props.parentColumns&&props.parentColumns[0]&&props.parentColumns[0].fixed)||props.tableColumn.fixed? 'left' : false"
      :label="props.tableColumn.label"
      :prop="props.parentColumns? `${props.parentColumns.map(c => c.property).join('.')}.${props.tableColumn.property}` : props.tableColumn.property"
      :sortable="props.tableColumn.sortable? 'custom' : false"
      width="160">
    <template #default="{row}">
      <el-icon>
        <Calendar/>
      </el-icon>
      <span>{{
          getRowValue(row)
        }}
        </span>
    </template>
  </el-table-column>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue';
import {ElIcon, ElTableColumn} from 'element-plus';

const props = defineProps<{ tableColumn: th4.admin.ui.TableColumn, parentColumns?: th4.admin.ui.TableColumn[] }>();

const getRowValue = (row: any) => {
  if (props.parentColumns) {
    for (let parentColumn of props.parentColumns) {
      row = row[parentColumn.property];
      if (!row) {
        return "";
      }
    }
  }
  return row[props.tableColumn.property];
}

</script>
<style lang="scss" scoped>

</style>