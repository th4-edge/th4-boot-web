<template>
  <el-table-column :label="infoItem.label" :prop="infoItem.property" align="left">
    <template #default="row">
      <template v-if="data">
        <el-tooltip
            :content="getValue(data[row.$index])"
            :disabled="!isShowTooltip"
            effect="light"
            placement="bottom"
        >
          <div class="span-text" @mouseenter="visibilityChange">
            {{ getValue(data[row.$index])}}
          </div>
        </el-tooltip>
      </template>
      <template v-else>
        <el-tooltip
            :content="getValue(row.row)"
            :disabled="!isShowTooltip"
            effect="light"
            placement="bottom"
        >
          <div class="span-text" @mouseenter="visibilityChange">
            {{ getValue(row.row) }}
          </div>
        </el-tooltip>
      </template>
    </template>
  </el-table-column>
</template>
<script lang="ts" setup>

import {ref} from "vue";

const props = defineProps<{ infoItem: th4.admin.ui.InfoItem, data?: any[] }>();

import {ElTableColumn, ElTooltip} from "element-plus";
const isShowTooltip = ref(false);
const getValue = (row: any) => {
  let parent = props.infoItem.parent;
  while (parent && row) {
    row = row[parent.property];
    parent = parent.parent;
  }
  return row ? row[props.infoItem.property] : '';
}
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