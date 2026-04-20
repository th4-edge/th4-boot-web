<template>
  <el-table-column v-if="!props.tableColumn.lob"
      :column-key="props.tableColumn.property"
      :fixed="(props.parentColumns&&props.parentColumns[0]&&props.parentColumns[0].fixed)||props.tableColumn.fixed? 'left' : false"
      :label="props.tableColumn.label"
      :prop="props.parentColumns? `${props.parentColumns.map(c => c.property).join('.')}.${props.tableColumn.property}` : props.tableColumn.property"
      :width="160"
  >
<!--      :width="!props.parentColumns&&props.tableColumn.property=='name'? 200 : props.tableColumn.width/192+'rem'"-->

    <template #default="{row}">
      <el-tooltip
          :content="getRowValue(row)"
          :disabled="!isShowTooltip"
          effect="light"
          placement="bottom"
      >
        <div class="span-text" @mouseenter="visibilityChange">
          {{ getRowValue(row) }}
        </div>
      </el-tooltip>
    </template>
  </el-table-column>
</template>
<script lang="ts" setup>
import {defineProps, ref} from 'vue';
import {ElTableColumn, ElTooltip} from 'element-plus';

const props = defineProps<{ tableColumn: th4.admin.ui.TableColumn, parentColumns?: th4.admin.ui.TableColumn[] }>();
const isShowTooltip = ref(false);

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
// 判断是否显示 溢出的文本 el-tooltip
const visibilityChange = (event: any) => {
  const ev = event.target;
  const evWeight = ev.scrollWidth;
  const contentWeight = ev.clientWidth;
  if (evWeight > contentWeight) {
    // 实际宽度 > 可视宽度  文字溢出
    isShowTooltip.value = true;
  } else {
    // 否则为不溢出
    isShowTooltip.value = false;
  }
};
</script>
<style lang="scss" scoped>
.span-text {
  overflow: hidden; /* 确保超出容器的文本被裁剪 */
  white-space: nowrap; /* 确保文本在一行内显示 */
  text-overflow: ellipsis;
}
</style>