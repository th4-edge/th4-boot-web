<template>
  <el-table-column
      :column-key="props.tableColumn.property"
      :fixed="(props.parentColumns&&props.parentColumns[0]&&props.parentColumns[0].fixed)||props.tableColumn.fixed? 'left' : false"
      :label="props.tableColumn.label"
      :prop="props.parentColumns? `${props.parentColumns.map(c => c.property).join('.')}.${props.tableColumn.property}` : props.tableColumn.property"
      :sortable="props.tableColumn.sortable? 'custom' : false"
      align="center"
      width="190">
    <template #default="{row}">
      <div class="table-column-date-time">
        <el-icon>
          <Clock/>
        </el-icon>
        {{
          getRowValue(row)
        }}
      </div>
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
.table-column-date-time {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>