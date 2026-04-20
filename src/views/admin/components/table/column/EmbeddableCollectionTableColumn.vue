<template>
  <el-table-column
      :column-key="props.tableColumn.property"
      :fixed="(props.parentColumns&&props.parentColumns[0]&&props.parentColumns[0].fixed)||props.tableColumn.fixed? 'left' : false"
      :label="props.tableColumn.label"
      :prop="props.parentColumns? `${props.parentColumns.map(c => c.property).join('.')}.${props.tableColumn.property}` : props.tableColumn.property"
      :width="500">
    <template #default="{row}">
      <div class="flex">
        <template v-for="item in getRowValue(row)">
          <el-tag style="margin-right: 5px;" type="primary">
            <template v-for="children in props.tableColumn.children">
              {{ item[children.property] ? (item[children.property].name || item[children.property]) : '' }}
            </template>
          </el-tag>
        </template>
      </div>
    </template>
  </el-table-column>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue';
import {ElTableColumn, ElTag} from 'element-plus';

const props = defineProps<{ tableColumn: th4.admin.ui.TableColumn, parentColumns?: th4.admin.ui.TableColumn[] }>();

const getRowValue = (row: any) => {
  if (props.parentColumns) {
    for (let parentColumn of props.parentColumns) {
      row = row[parentColumn.property];
      if (!row) {
        return [];
      }
    }
  }
  return row[props.tableColumn.property] ? row[props.tableColumn.property] : [];
}
// 判断是否显示 溢出的文本 el-tooltip
</script>
<style lang="scss" scoped>
.span-text {
  overflow: hidden; /* 确保超出容器的文本被裁剪 */
  white-space: nowrap; /* 确保文本在一行内显示 */
  text-overflow: ellipsis;
}
</style>