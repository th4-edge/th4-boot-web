<template>
  <el-table-column v-if="!props.tableColumn.lob"
                   :column-key="props.tableColumn.property"
                   :fixed="(props.parentColumns&&props.parentColumns[0]&&props.parentColumns[0].fixed)||props.tableColumn.fixed? 'left' : false"
                   :label="props.tableColumn.label"
                   width="180"
                   :prop="props.parentColumns? `${props.parentColumns.map(c => c.property).join('.')}.${props.tableColumn.property}` : props.tableColumn.property"
  >
    <!--      :width="!props.parentColumns&&props.tableColumn.property=='name'? 200 : props.tableColumn.width/192+'rem'"-->

    <template #default="{row}">
      <div class="name-box">
        <template v-if="$slots['default']">
          <slot :row="row"/>
        </template>
        <div v-else class="span-text">
          {{ getRowValue(row) }}
        </div>
      </div>
    </template>
  </el-table-column>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue';
import {ElTableColumn} from 'element-plus';

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
  return row[props.tableColumn.property] ? row[props.tableColumn.property] + props.tableColumn.unit : "";
}
</script>
<style lang="scss" scoped>
.name-box{
  display: flex;
  align-items: center;
  gap: 10px;
  .span-text {
    overflow: hidden; /* 确保超出容器的文本被裁剪 */
    white-space: nowrap; /* 确保文本在一行内显示 */
    text-overflow: ellipsis;
  }
}

</style>