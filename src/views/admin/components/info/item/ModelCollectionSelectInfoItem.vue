<template>
  <el-form-item :label="infoItem.label"
                :prop="infoItem.parent?infoItem.parent.property+'.'+infoItem.property:infoItem.property">
    <div class="enum-info-item">
      <template v-if="modelValue">
        <template v-for="item in modelValue">
          <el-tag>{{ item ? item.name : '' }}{{ item ? infoItem.unit : '' }}</el-tag>
        </template>
      </template>

    </div>
  </el-form-item>
</template>
<script lang="ts" setup>
import {computed, defineModel, defineProps} from 'vue';
import {ElFormItem, ElTag, TableColumnCtx} from "element-plus";

const props = defineProps<{
  modelName: string,
  infoItem: th4.admin.ui.InfoItem,
  labelWidth?: string,
  ignoredTableColumns?: string[],
  spanMethod?: ({row, column, rowIndex, columnIndex}: {
    row: any,
    column: TableColumnCtx<any>,
    rowIndex: number,
    columnIndex: number
  }) => any,
}>();
const model = defineModel<Record<string, any>>('model', {required: true})

const paddingLeft = computed(() => props.labelWidth ? (parseInt(props.labelWidth.replace('px', '')) / 2) + 'px' : '0');

const modelValue = computed(() => {
  let value = model.value;
  let parent = props.infoItem.parent;
  while (parent) {
    value = value[parent.property];
    parent = parent.parent;
  }
  return value ? value[props.infoItem.property] : [];
})
</script>
<style lang="scss" scoped>
.enum-info-item {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>