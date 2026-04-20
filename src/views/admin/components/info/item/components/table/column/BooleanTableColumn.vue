<template>
  <el-table-column :label="infoItem.label" :prop="infoItem.property" align="center">
    <template #default="row">
      <template v-if="data">
        {{ getValue(data[row.$index]) ? '是' : '否' }}
      </template>
      <template v-else>
        {{ getValue(row.row) ? '是' : '否' }}
      </template>
    </template>
  </el-table-column>
</template>
<script lang="ts" setup>
import {defineProps} from "vue";
import {ElTableColumn} from "element-plus";

const props = defineProps<{ infoItem: th4.admin.ui.InfoItem, data?: any[] }>();
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