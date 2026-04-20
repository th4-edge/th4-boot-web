<template>
  <route-container :active="active">
    <basic-page-view key="page" :model-name="modelName"
                     :title="title"
                     :sortable="sortable"
                     :queryable="queryable"
                     :selection="selection"
                     :ignore-table-field="ignoredTableFieldNames"
                     :ignore-table-column="ignoredTableColumn"
                     :auth="props.auth"
                     :uri="pageUri"
                     :span-method="spanMethod"
                     :multiple-column="multipleColumn"
                     @selection-change="fireSelectionChange"
    >
      <template v-if="$slots['table-columns']" #table-columns>
        <slot name="table-columns"/>
      </template>
      <template #default="{loadData,queryable}">
        <div style="display:flex;align-items: center;gap: 10px;">
          <slot name="action-bar" :load-data="loadData" :queryable="queryable" :selections="selections"/>
          <el-button v-if="!props.disableSave" icon="plus" type="primary" @click="fireSave">新增</el-button>
        </div>
      </template>
      <template #table-actions="{row,loadData,note}">
        <el-tooltip v-if="!props.disableUpdate"  :content="'修改'.concat(note)">
          <el-button icon="edit" link @click="fireUpdate(row)"></el-button>
        </el-tooltip>
        <el-tooltip v-if="!props.disableDelete"  :content="'删除'.concat(note)">
          <el-button icon="delete" link @click="fireDelete(row,loadData)"></el-button>
        </el-tooltip>
          <slot name="table-actions" :row="row" :load-data="loadData"></slot>
        <el-tooltip v-if="!disableInfo" :content="note.concat('详情')">
          <el-button icon="more" link @click="fireInfo(row)"></el-button>
        </el-tooltip>
      </template>
      <template #query="{loadData,queryable}">
        <slot name="query" :load-data="loadData" :queryable="queryable"></slot>
      </template>
      <template #tree="{loadData,queryable}">
        <slot name="tree" :load-data="loadData" :queryable="queryable"></slot>
      </template>
    </basic-page-view>
    <basic-save-view key="save" :model-name="modelName" :uri="saveUri" :auth="props.auth"
                     :ignored-field-names="ignoredSaveFieldNames"
                     @form-submit="fireSaveSuccess">
      <template #action-bar>
        <el-button icon="back"  @click="active='page'"></el-button>
      </template>
    </basic-save-view>
    <basic-update-view key="update" :model-name="modelName" :uri="updateUri" :auth="props.auth"
                       :ignored-field-names="ignoredUpdateFieldNames"
                       @form-submit="fireUpdateSuccess" :form-model="formModel">
      <template #action-bar>
        <el-button icon="back"  @click="active='page'"></el-button>
      </template>
    </basic-update-view>
    <basic-info-view key="info" :model-name="props.modelName" :model="formModel"
                       :ignored-field-names="ignoredInfoFieldNames" :auth="props.auth" :uri="props.infoUri">
      <template #action-bar>
        <el-button icon="back"  @click="active='page'"></el-button>
      </template>
    </basic-info-view>
    <slot/>
  </route-container>
</template>
<script lang="ts" setup>
import {defineProps, onActivated, ref} from "vue"
import RouteContainer from "@/views/admin/components/view/manage/components/container/RouteContainer.vue";
import BasicPageView from "@/views/admin/components/view/page/basic/BasicPageView.vue";
import BasicSaveView from "@/views/admin/components/view/save/basic/BasicSaveView.vue";
import {ElButton, ElMessage, ElMessageBox, TableColumnCtx,ElTooltip} from "element-plus";
import {modelDelete, modelInfo} from "@/store/th4/framework/service/api/API.ts";
import BasicUpdateView from "@/views/admin/components/view/update/basic/BasicUpdateView.vue";
import BasicInfoView from "@/views/admin/components/view/info/basic/BasicInfoView.vue";
const props = defineProps<{
  title?:string,
  modelName: string,
  pageUri?:string,
  saveUri?:string,
  updateUri?:string
  deleteUri?:string,
  infoUri?:string,
  auth?:string,
  disableDelete?:boolean,
  disableSave?:boolean,
  disableUpdate?:boolean,
  disableInfo?:boolean,
  queryable?:Record<string, any>,
  sortable?:Record<string, any>,
  ignoredSaveFieldNames?:string,
  ignoredUpdateFieldNames?:string,
  ignoredInfoFieldNames?:string,
  ignoredTableColumn?: string[],
  ignoredTableFieldNames?: string,
  multipleColumn?: boolean,
  spanMethod?: ({row, column, rowIndex, columnIndex}: {
    row: any,
    column: TableColumnCtx<any>,
    rowIndex: number,
    columnIndex: number
  }) => any,
  selection?: boolean
}>();
const active = ref<string>('page')
// 修改对象
const formModel=ref<any>();

const selections=ref<any[]>();

const fireSelectionChange=(_selections:any[])=>{
  selections.value=_selections;
}
const fireSave = () => {
  active.value = 'save'
}
const fireSaveSuccess=()=>{
  active.value='page';
}
const fireUpdateSuccess=()=>{
  active.value='page';
}
const fireUpdate = (row: any) => {
  modelInfo(props.modelName,row,undefined,props.auth).then(model=>{
    formModel.value=model;
    active.value='update'
  })

}
const fireDelete = (row: any, loadData: Function) => {
  ElMessageBox.confirm(
      '是否确认删除选定该条记录信息?',
      '提示',
      {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
        modelDelete(props.modelName, row,props.deleteUri,props.auth).then(() => {
          ElMessage({
            message: '记录删除成功',
            type: 'success',
          })
        }).catch((reason: th4.framework.ErrorCode) => {
          ElMessage({
            message: '记录删除失败：' + reason.message,
            type: 'error',
          })
        }).finally(() => {
          if (loadData) {
            loadData()
          }
        })
  }).catch(() => {})
}
const fireInfo = (row: any) => {
  formModel.value=row;
  active.value='info'
}
onActivated(() => {
  active.value='page'
})
</script>
<style lang="scss" scoped>
</style>