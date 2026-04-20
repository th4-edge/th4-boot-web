<template>
  <el-table-column :label="infoItem.label" align="center" v-if="data">
    <template #default="row">
      <template v-if="data">
        {{ getValue(data[row.$index]) ? getValue(data[row.$index]).join(", ") : '' }}
      </template>
      <template v-else>
        {{ getValue(row.row).join(", ") }}
      </template>
    </template>
  </el-table-column>
</template>
<script lang="ts" setup>

const props = defineProps<{ infoItem: th4.admin.ui.InfoItem, data?: any[] }>();
import {ElTableColumn} from "element-plus";

const getValue = (row: any) => {
  let parent = props.infoItem.parent;
  while (parent && row) {
    row = row[parent.property];
    parent = parent.parent;
  }
  let data:any[]= row ? row[props.infoItem.property] : [];
  if(data.length>0){
    if(props.infoItem.genericTypes&&props.infoItem.genericTypes[0].enumerated){
      return data.map(item=>item.name)
    }
  }
  return data;
}
</script>

<style lang="scss" scoped>

</style>