<template>
  <div class="customize-table-view">
    <div class="table-wrapper" >
      <el-table ref="table"
          :cell-style="cellStyle"
          :data="page.content"
          :span-method="spanMethod"
          border
          :highlight-current-row="!props.selection&&props.highlightCurrentRow"
          header-row-class-name="table-header-row-class-name"
          row-class-name="table-data-row-class-name"
          stripe
          @sort-change="handleSortChange"
          @selection-change="handleSelectionChange"
          @current-change="handleCurrentChange"
                @row-click="handleRowClick"
      >
        <el-table-column type="selection" width="50" v-if="props.selection&&!props.highlightCurrentRow"/>
        <el-table-column fixed label="" type="index" width="60"/>
        <template v-if="$slots['table-columns']">
          <slot name="table-columns"/>
        </template>
        <template v-else v-for="tableColumn in tableColumns">
          <template v-if="tableColumn.visible">
            <basic-table-column :ignore-table-column="props.ignoreTableColumn" :model-name="props.modelName"
                                :multiple-column="props.multipleColumn" :table-column="tableColumn" :table-columns="tableColumns"/>
          </template>
        </template>
        <el-table-column/>
        <el-table-column v-if="slots['table-actions']" fixed="right" :width="160">
          <template #header>
            <div style="width:100%;display:flex;align-items: center;justify-content: flex-start">
              <span style="margin-right: 5px">操作</span>
              <el-icon>
                <Setting/>
              </el-icon>
            </div>
          </template>
          <template #default="{row}">
            <slot :row="row" :selections="selections" :loadData="loadData" name="table-actions"/>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty />
        </template>
      </el-table>
    </div>
    <div class="pagination-wrapper">
      <div class="pagination-tool-bar">
<!--        <div class="icon-box">-->
<!--          <el-icon>-->
<!--            <Setting/>-->
<!--          </el-icon>-->
<!--        </div>-->
<!--        <div class="icon-box">-->
<!--          <el-icon>-->
<!--            <Setting/>-->
<!--          </el-icon>-->
<!--        </div>-->
<!--        <div class="icon-box">-->
<!--          <el-icon>-->
<!--            <Setting/>-->
<!--          </el-icon>-->
<!--        </div>-->
<!--        <div class="icon-box">-->
<!--          <el-icon>-->
<!--            <Setting/>-->
<!--          </el-icon>-->
<!--        </div>-->
        <slot name="table-footer"/>
      </div>
      <el-pagination
          v-model:current-page="page.number"
          v-model:page-size="page.size"
          :page-sizes="[10,20, 50, 100, 200]"
          :total="page.totalElements"
          background
          layout="total, sizes, -> ,prev, pager, next, jumper"
          size="small"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import {CSSProperties, defineEmits, defineProps, defineSlots, ref, watch} from 'vue'
import {ElIcon, ElPagination, ElTable, ElTableColumn, TableColumnCtx, ElEmpty, ElMessage} from 'element-plus'
import BasicTableColumn from "@/views/admin/components/table/column/BasicTableColumn.vue";
import {uiModelTableViewColumns} from "@/store/th4/admin/ui/api/API.ts";
import {modelPage} from "@/store/th4/framework/service/api/API.ts";
const slots = defineSlots();
const props = defineProps<{
  selection?:boolean,
  highlightCurrentRow?:boolean,
  autoLoad?:boolean,
  modelName: string,
  queryable?:Record<string, any>,
  sortable?:Record<string, any>,
  keyword?:string,
  ignoreTableField?: string,
  ignoreTableColumn?: string[],
  uri?: string,
  auth?:string,
  cellStyle?: ({row, column, rowIndex, columnIndex}: {
    row: any,
    column: TableColumnCtx<any>,
    rowIndex: number,
    columnIndex: number
  }) => CSSProperties,
  spanMethod?: ({row, column, rowIndex, columnIndex}: {
    row: any,
    column: TableColumnCtx<any>,
    rowIndex: number,
    columnIndex: number
  }) => any,
  multipleColumn?: boolean
}>();
const table=ref<InstanceType<typeof ElTable>>()
const tableColumns = ref<th4.admin.ui.TableColumn[]>([]);
const page = ref<th4.framework.Page<any>>({
  first: true,
  last: true,
  number: 1,
  size: 10,
  totalElements: 0,
  totalPages: 1,
  content: []
})
//分页
const pageable = ref<{ page: number, size: number }>({
  page: 1,
  size: 10
})
//排序
const sortable = ref<Record<string, string>>({});
const selections = ref<any[]>([]);
const loadData = () => {
  modelPage(props.modelName, {
    keyword: props.keyword?.trim(),
    ...pageable.value,
    ...sortable.value,
    ...props.queryable,
    ...props.sortable,
  },props.uri,props.auth).then((thePage: th4.framework.Page<any>) => {
    page.value = thePage
  }).catch(e => {
    ElMessage.error(e.message)
  })
}
const resetPage=()=>{
  pageable.value.page=1
}
const sortChange = (property: string, direction: string) => {
  if (!direction) {
    delete sortable.value[property];
    delete sortable.value[property + 'OrderBy'];
  } else {
    sortable.value[property + 'OrderBy'] = direction.startsWith('asc') ? 'asc' : 'desc';
  }
  pageable.value.page = 1;
  loadData();
}
const pageChange = (page: number) => {
  pageable.value.page = page;
  loadData();
}
const sizeChange = (size: number) => {
  pageable.value.size = size;
  pageable.value.page = 1;
  loadData();
}
const emit = defineEmits<{
  'size-change': [number],
  'page-change': [number],
  'sort-change': [string, string],
  'selection-change': [any[]],
  'current-change': [any],
  'row-click':[any]
}>();
const selectionChange = (selection: any[]) => {
  selections.value = selection;
  emit('selection-change', selections.value);
}
const currentChange=(_row:any)=>{
  //
}

const handleRowClick=(_row:any,_column:any)=>{
  // 右侧锁定列不支持点击查看更多
  if(!_column.fixed || _column.fixed!='right'){
    emit('row-click', _row);
  }
}
const handleSizeChange = (size: number) => {
  sizeChange(size);
  emit('size-change', size);
}
const handlePageChange = (page: number) => {
  pageChange(page)
  emit('page-change', page);
}
const handleSortChange = (event: { column: any, prop: string, order: string }) => {
  sortChange(event.prop, event.order)
  emit('sort-change', event.prop, event.order);
}
const handleSelectionChange = (selection: any[]) => {
  selectionChange(selection)
  emit('selection-change', selection);
}
const handleCurrentChange = (current: any) => {
  currentChange(current)
  emit('current-change', current);
}
const resize=()=>{
  table.value?.doLayout()
}
defineExpose({
  loadData:()=>{
    pageable.value.page = 1;
    loadData();
  },
  resetPage,
  selections,
  resize,
})
const loadTableColumn = () => {
  uiModelTableViewColumns(props.modelName, props.ignoreTableField, props.uri,props.auth).then(columns => {
    tableColumns.value = columns;
  })
}
//
watch(() => props.modelName, () => {
  loadTableColumn();
  table.value?.setCurrentRow(undefined)
  if(props.autoLoad){
    resetPage();
    loadData();
  }
}, {immediate: true})
</script>
<style lang="scss" scoped>
.customize-table-view {
  box-sizing: border-box;
  //--customize-table-header-backgroud:rgba(242, 242, 242, 1);
  //--customize-table-header-text-color:var(--el-text-color-secondary);
  //--customize-table-tr-striped-background:var(--el-fill-color-lighter);
  //--customize-table-text-color:var(--el-text-color-secondary);
  //--customize-table-padding: 0;
  .table-wrapper {
    color: #333333;

    width: 100%;
    height: calc(100% - 50px);
    box-sizing: border-box;
    background-color: var(--customize-table-header-backgroud);
    border: 1px solid #eeeeee;
    padding: 0 var(--customize-table-padding) var(--customize-table-padding) var(--customize-table-padding);

    .el-table {
      --el-table-header-bg-color: #FAFAFA;
      --el-table-header-text-color:#666666;
      --el-table-text-color: #333333;
      //--el-table-header-text-color: var(--customize-table-header-text-color);
      //--el-color-info: var(--customize-table-header-text-color);
      //--el-text-color-placeholder: var(--customize-table-header-text-color);
      //--el-fill-color-lighter:var(--customize-table-tr-striped-background);
      //--el-table-text-color:var(--customize-table-text-color);
      width: 100%;
      height: 100%;
      --el-table-border-color: none;
      //--el-table-border:1px solid rgba(242, 242, 242, 1);;
      --el-table-border: 0;
      //--el-fill-color-lighter:rgba(242, 242, 242, 0.498039215686275);
      //--el-table-header-bg-color: var(--customize-table-header-backgroud);
      //--el-table-header-bg-color: #f0f9eb;
      //--el-fill-color-light:rgba(242, 242, 242, 0.498039215686275);
      .el-table__inner-wrapper::before {
        height: 0;
      }

      :deep(.el-table__header) {
        thead {
          th {
            border-top:1px solid #eeeeee;
            border-bottom: 1px solid #eeeeee;
          }
        }
      }
      :deep(.el-table__header .el-table__cell) {
        //padding: 0 !important;
      }
      :deep(.cell) {
        padding: 4px 10px !important;
      }

      :deep(.el-table__cell) {
        border-bottom: 1px solid rgba(229, 231, 235) !important;
      }


      :deep(.el-table__body tr.hover-row > td.el-table__cell) {
        //background-color: #2561EF;
        color: var(--el-color-primary);
        font-weight: 600;
      }
    }
  }

  .pagination-wrapper {
    width: 100%;
    height: 48px;
    background-color: #FFFFFF;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    .pagination-tool-bar{
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      .icon-box{
        padding: 6px;
        background-color: var(--el-fill-color-light);
        color: var(--el-text-color-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        border-radius: 4px;
        cursor: pointer;
        &:hover{
          background-color: var(--el-color-primary);
          color: #FFFFFF;
        }
      }
    }
    .el-pagination {
      --el-pagination-border-radius: 4px;
      margin-right: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
      :deep(.el-input){
        --el-border-radius-base: 4px;
      }
    }
  }
}
</style>