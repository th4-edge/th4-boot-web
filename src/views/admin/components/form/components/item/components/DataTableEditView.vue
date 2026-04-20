<template>
  <div class="data-table-edit-view">
    <el-table :data="props.data" stripe border>
      <el-table-column fixed label="序号" type="index" width="60"/>
      <template v-for="(tableColumn, index) in props.tableColumns">
        <el-table-column v-if="index==0" :label="tableColumn.label">
          <template #default="{row}">
            {{
              row[tableColumn.property] ? (row[tableColumn.property].name ? row[tableColumn.property].name : row[tableColumn.property]) : undefined
            }}
          </template>
        </el-table-column>
        <el-table-column v-else :label="tableColumn.label"
                         :width="tableColumn.rule&&tableColumn.rule.max?(tableColumn.rule.max<140?tableColumn.rule.max+140:140):140">
          <template #default="{row}">
            {{
              row[tableColumn.property] ? (row[tableColumn.property].name ? row[tableColumn.property].name : row[tableColumn.property]) : undefined
            }}
          </template>
        </el-table-column>
      </template>
      <el-table-column/>
      <el-table-column fixed="right" width="160">
        <template #header>
          <slot></slot>
        </template>
        <template #default="row">
          <el-button icon="Delete" link @click="props.data.splice(row.$index, 1)"/>
          <el-button icon="Edit" link @click="fireEdit(row.$index)"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import {defineProps} from "vue";
import {ElButton, ElTable, ElTableColumn} from "element-plus";

const props = defineProps<{
  data: any[],
  tableColumns: ({ label: string, property: string } & Record<string, any>)[]
}>();
const emits = defineEmits<{ edit: [index: number] }>();
const fireEdit = (index: number) => {
  emits("edit", index);
}
</script>
<style lang="scss" scoped>
.data-table-edit-view {
  width: 100%;

  .el-table {
    background-color: inherit;
    width: 100%;
    height: 100%;
    --el-table-border-color: none;
    //--el-table-border:1px solid rgba(242, 242, 242, 1);;
    --el-table-border: 0;
    //--el-fill-color-lighter:rgba(242, 242, 242, 0.498039215686275);
    --el-table-header-bg-color: rgba(242, 242, 242, 1);
    //--el-fill-color-light:rgba(242, 242, 242, 0.498039215686275);
    .el-table__inner-wrapper::before {
      height: 0;
    }

    :deep(.cell) {
      padding: 4px 10px !important;
    }

    :deep(.el-table__cell) {
      border-bottom: 1px solid rgba(242, 242, 242, 1) !important;
    }

    :deep(.el-table__body tr.hover-row > td.el-table__cell) {
      //background-color: #2561EF;
      color: var(--el-color-primary);
      font-weight: 200;
    }
  }
}
</style>