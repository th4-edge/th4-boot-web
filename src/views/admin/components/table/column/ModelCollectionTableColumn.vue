<template>
  <el-table-column
      :column-key="props.tableColumn.property"
      :label="props.tableColumn.label"
      :prop="props.parentColumns? `${props.parentColumns.map(c => c.property).join('.')}.${props.tableColumn.property}` : props.tableColumn.property"
      :width="500">
    <template #default="{row}">
      <div class="tag-container">
        <template v-for="item in getRowValue(row)">
          <el-tag style="margin-right: 5px;margin-bottom: 5px;" type="primary">
            <template v-for="children in props.tableColumn.children">
              <template v-if="!children.id&&!children.type.collection&&!children.type.map">
                {{ item[children.property] ? (item[children.property].name || item[children.property]) : '' }}
              </template>
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
</script>
<style lang="scss" scoped>
.span-text {
  overflow: hidden; /* 确保超出容器的文本被裁剪 */
  white-space: nowrap; /* 确保文本在一行内显示 */
  text-overflow: ellipsis;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  align-content: flex-start;
  justify-content: flex-start;
}
</style>