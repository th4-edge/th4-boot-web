<template>
  <el-table-column
      :column-key="props.tableColumn.property"
      :fixed="(props.parentColumns&&props.parentColumns[0]&&props.parentColumns[0].fixed)||props.tableColumn.fixed? 'left' : false"
      :label="props.tableColumn.label"
      :prop="props.parentColumns? `${props.parentColumns.map(c => c.property).join('.')}.${props.tableColumn.property}` : props.tableColumn.property"
      :sortable="false"
      width="100">
    <template #default="{row}">
      <x-icon v-if="getRowValue(row)" :name="getRowValue(row)" :size="18"></x-icon>
    </template>
  </el-table-column>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue';
import {ElTableColumn} from 'element-plus';
import XIcon from "@/views/admin/components/icon/XIcon.vue";

const props = defineProps<{ tableColumn: th4.admin.ui.TableColumn, parentColumns?: th4.admin.ui.TableColumn[] }>();
const getRowValue = (row: any) => {
  if (props.parentColumns) {
    for (let parentColumn of props.parentColumns) {
      row = row[parentColumn.property];
      if (!row) {
        return undefined;
      }
    }
  }
  return row[props.tableColumn.property];
}
</script>
<style lang="scss" scoped>

</style>