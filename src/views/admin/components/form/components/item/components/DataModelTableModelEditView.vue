<template>
  <div class="data-model-table-embeddable-edit-view">
    <el-table :data="data.key" border highlight-current-row stripe>
      <el-table-column fixed label="序号" type="index" width="60"/>
      <template v-for="tableColumn in keyTableColumns">
        <template v-if="tableColumn.visible&&tableColumn.property=='name'">
          <el-table-column :label="tableColumn.label">
            <template #default="row">
              {{data.key[row.$index][tableColumn.property]}}
            </template>
          </el-table-column>
        </template>
      </template>
      <template v-for="tableColumn in valueTableColumns">
        <template v-if="tableColumn.visible&&tableColumn.property=='name'">
          <el-table-column :label="tableColumn.label">
            <template #default="row">
              {{data.value[row.$index][tableColumn.property]}}
            </template>
          </el-table-column>
        </template>
      </template>
      <el-table-column align="center" fixed="right">
        <template #header>
          <slot/>
        </template>
        <template #default="row">
          <el-button icon="Delete" link @click="handleDelete(row.$index)"/>
          <el-button icon="edit" link @click="fireSelect(row.$index)"/>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-if="props.formItem.map&&props.formItem.map.value.clazz.name"
               v-model="selectValueDialogVisible"
               :show-close="false"
               append-to-body
               top="15vh"
               width="60%"
    >
      <template #header>
        <title-header :title="'选择'+props.formItem.label"
                      style="padding-bottom: 20px;padding-top: 10px;height:50px"/>
      </template>
      <model-select-table :model-name="props.formItem.map.value.clazz.name"
                          multiple
                          @selected="handleSelect"/>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import {defineProps, ref, watch} from "vue";
import {ElButton, ElDialog, ElTable, ElTableColumn, TableColumnCtx} from "element-plus";
import {uiModelTableViewColumns} from "@/store/th4/admin/ui/api/API.ts";
import ModelSelectTable from "@/views/admin/components/select/model/ModelSelectTable.vue";
import TitleHeader from "@/views/admin/components/layout/classic/container/view/header/TitleHeader.vue";
const props = defineProps<{
  modelName: string,
  formItem: th4.admin.ui.EditFormItem,
  map: th4.admin.ui.MapProperty<th4.admin.ui.EditFormItem>,
  spanMethod?: ({row, column, rowIndex, columnIndex}: {
    row: any,
    column: TableColumnCtx<any>,
    rowIndex: number,
    columnIndex: number
  }) => any,
  ignoreTableField?: string,
  multipleColumn?: boolean,
  ignoreTableColumn?: string[]
}>()
const keyTableColumns = ref<th4.admin.ui.TableColumn[]>([]);
const valueTableColumns = ref<th4.admin.ui.TableColumn[]>([]);
const data = defineModel<{ key: any[], value: any[] }>('data', {required: true})
const selectValueDialogVisible = ref<boolean>(false)
const index=ref<number>()
const handleDelete = (index: number) => {
  data.value.key.splice(index, 1);
  data.value.value.splice(index, 1);
}
const fireSelect=(i:number)=>{
  index.value=i
  selectValueDialogVisible.value=true
}
const handleSelect = (selection: any) => {
  if(index.value!=undefined){
    data.value.value[index.value]=selection;
    selectValueDialogVisible.value=false
  }
}
const loadTableColumns =  () => {
 uiModelTableViewColumns(props.map.key.clazz.name).then(tableColumns=>{
   keyTableColumns.value=tableColumns
 })
  uiModelTableViewColumns(props.map.value.clazz.name).then(tableColumns=>{
    valueTableColumns.value=tableColumns
  })
}

watch(() => props.map.key.clazz.name, () => {
  loadTableColumns();
}, {immediate: true})

</script>

<style lang="scss" scoped>
.data-model-table-embeddable-edit-view {
  .el-table {
    background-color: inherit;
    width: 100%;
    height: 100%;
    //--el-table-border-color: none;
    //--el-table-border:1px solid rgba(242, 242, 242, 1);;
    //--el-table-border: 0;
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