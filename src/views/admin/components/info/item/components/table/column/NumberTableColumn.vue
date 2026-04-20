<template>
  <el-table-column :label="infoItem.label" :prop="infoItem.property" align="right">
    <template #default="row">
      <template v-if="data">
        {{ format(getValue(data[row.$index])) }}{{ getValue(data[row.$index]) ? infoItem.unit : '' }}
      </template>
      <template v-else>
        {{ format(getValue(row.row)) }}{{ getValue(row.row) ? infoItem.unit : '' }}
      </template>
    </template>
  </el-table-column>
</template>
<script lang="ts" setup>
import {defineProps} from "vue";
import {ElTableColumn} from "element-plus";

const props = defineProps<{ infoItem: th4.admin.ui.InfoItem, data?: any[] }>();

const format = (value: any) => {
  if (value !== undefined) {
    if (props.infoItem.scale) {
      return value.toFixed(props.infoItem.scale);
    }
    return value;
  }
  if (props.infoItem.scale) {
    return '0.00';
  }
  return '0'
}
const getValue = (row: any) => {
  let parent = props.infoItem.parent;
  while (parent && row) {
    row = row[parent.property];
    parent = parent.parent;
  }
  return row ? row[props.infoItem.property] : undefined;
}
</script>

<style lang="scss" scoped>

</style>