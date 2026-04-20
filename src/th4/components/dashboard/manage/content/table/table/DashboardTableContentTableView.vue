<template>
  <div class="dashboard-table-content-table-view">
    <div class="table-wrapper">
      <el-table :data="page.content" stripe @row-click="handleRowClick" style="cursor: pointer;">
        <template v-if="$slots['table-columns']">
          <slot name="table-columns"></slot>
        </template>
        <template v-else v-for="tableColumn in tableColumns">
          <template v-if="tableColumn.visible">
            <basic-table-column :model-name="props.modelName"
                                :table-column="tableColumn" :table-columns="tableColumns"/>
            <el-table-column/>
          </template>
        </template>
        <el-table-column/>
        <template #empty>
          <el-empty/>
        </template>
      </el-table>
    </div>
    <div class="pagination-wrapper">
      <el-pagination
          v-model:current-page="pageable.page"
          v-model:page-size="pageable.size"
          :page-sizes="[100, 200, 300, 400]"
          background
          layout="total, sizes ,prev, pager, next, jumper"
          size="default"
          :total="page.totalElements"
          @size-change="fireSizeChange"
          @current-change="firePageChange"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import {defineEmits, onMounted, ref, useSlots} from 'vue'
import {ElTable, ElPagination} from 'element-plus'
import {uiModelTableViewColumns} from "@/store/th4/admin/ui/api/API.ts";
import BasicTableColumn from "@/views/admin/components/table/column/BasicTableColumn.vue";
const props=defineProps<{
  modelName?: string
  page: th4.framework.Page<crm.customer.customer.Customer>
  pageable: { page: number; size: number }
}>();
const emit = defineEmits<{
  'size-change': [number]
  'page-change': [number]
  'sort-change': [string, string]
  'current-change': [any]
  'row-click': [any]
}>();
const slots = useSlots();
const tableColumns = ref<th4.admin.ui.TableColumn[]>([]);
const loadTableColumn = () => {
  if(props.modelName){
    uiModelTableViewColumns(props.modelName).then(columns => {
      tableColumns.value = columns;
    })
  }

}
onMounted(()=>{
  if(!slots['table-columns']){
    loadTableColumn();
  }
})


const firePageChange = (page: number) => emit('page-change', page)
const fireSizeChange = (size: number) => emit('size-change', size)
const handleRowClick = (row: any) => emit('row-click', row)
</script>
<style lang="scss" scoped>
.dashboard-table-content-table-view {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  border-top: 1px solid #e4e4e4;
  .overview-table-column {
    display: flex;
    align-items: center;
    gap: 8px;
    .comment-box {
      height: 28px;
    }
    // margin: 0 10px;
    box-sizing: border-box;
  }
  .table-wrapper {
    background-color: #f0f9eb;
    width: 100%;
    height: calc(100% - 48px);
    :deep(.el-table__header-wrapper .el-table__header) {
      height: 48px !important;
    }
    :deep(.el-table td.el-table__cell) {
      height: 48px !important;
    }
    .el-table {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      overflow: auto;
      --el-table-header-bg-color: #f5f7fa;
      --el-table-header-text-color: #4e5969;
    }
  }
  .pagination-wrapper {
    width: 100%;
    height: 48px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
