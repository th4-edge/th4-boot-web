<template>
  <div class="retro-manage-view">
    <route-container :active="active">
      <retro-page-view key="page" :model-name="modelName" :setting="setting" @fire-update="fireUpdate" @fire-delete="fireDelete">
        <template #action-box>
          <div>
            <x-icon name="Plus" @click="active='save'"/>
          </div>
        </template>
        <template v-if="$slots&&$slots['query']" #query="{queryable,loadData}">
          <slot name="query" :queryable="queryable" :load-data="loadData"></slot>
        </template>
        <template v-if="$slots&&$slots['empty']" #empty>
          <slot name="empty"></slot>
        </template>
        <template v-if="$slots&&$slots['info-title']" #info-title="{model,modelName}">
          <slot name="info-title" :model="model" :model-name="modelName"></slot>
        </template>
        <template v-if="$slots&&$slots['model-card-icon']" #model-card-icon="{model}">
          <slot name="model-card-icon" :model="model"></slot>
        </template>
      </retro-page-view>
      <div key="save">
        <template v-if="modelName.toLowerCase() in CustomizeSaveViewStore">
          <component :is="CustomizeSaveViewStore[modelName.toLowerCase()]" :model-name="modelName" @form-submit="()=>active='page'">
            <template #action-bar>
              <slot name="action-bar"/>
            </template>
          </component>
        </template>
        <template v-else>
          <retro-save-view :back="()=>active='page'" :model-name="modelName" :title="title" :auth="auth" :uri="saveUri" :ignored-field-names="ignoredSaveFieldNames">
              <template v-if="$slots&&$slots['save-preview']" #preview="{modelName,formModel}">
                <slot name="save-preview" :model-name="modelName" :form-model="formModel"></slot>
              </template>
          </retro-save-view>
        </template>
      </div>
      <retro-update-view key="update" :back="()=>active='page'" :model-name="modelName" :form-model="formModel" @form-submit="()=>active='page'">
        <template v-if="$slots&&$slots['update-preview']" #preview="{modelName,formModel}">
          <slot name="update-preview" :model-name="modelName" :form-model="formModel"></slot>
        </template>
      </retro-update-view>
    </route-container>
  </div>
</template>
<script setup lang="ts">
import {defineProps, ref, watch} from "vue";
import RouteContainer from "@/views/admin/components/view/manage/components/container/RouteContainer.vue";
import RetroPageView from "@/views/admin/components/view/page/retro/RetroPageView.vue";
import XIcon from "@/views/admin/components/icon/XIcon.vue";
import CustomizeSaveViewStore from "@/views/admin/components/view/manage/retro/CustomizeSaveViewStore.ts";
import RetroSaveView from "@/views/admin/components/view/save/retro/RetroSaveView.vue";
import RetroUpdateView from "@/views/admin/components/view/update/retro/RetroUpdateView.vue";
import {modelDelete, modelInfo} from "@/store/th4/framework/service/api/API.ts";
import {ElMessage, ElMessageBox} from "element-plus";


const props = defineProps<{
  command?:'page'|'save',
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
  setting?: {
    status?: string | Function,
    icon?: string | Function,
    name?: string | Function,
    title?: string | Function,
    dateTime?: string | Function,
    desc?: string | Function,
    tip?: string | Function,
    tipColor?: string | Function,
    tipContent?: string,
    colors?:Record<string, string>
  }
}>();
const active=ref('page')

// 修改对象
const formModel=ref<any>();

const fireUpdate=(row:any)=>{
  modelInfo(props.modelName,row,undefined,props.auth).then(model=>{
    formModel.value=model;
    active.value='update'
  })
}
const fireDelete=(row:any,loadData:Function)=>{
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
      loadData&&loadData();
    })
  }).catch(() => {})
}

watch(()=>props.command,()=>{
  if(props.command){
    active.value=props.command
  }
})
</script>
<style scoped lang="scss">
.retro-manage-view {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;

  .retro-manage-content-view {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 16px;

    /* 纯白 */
    background: #FFFFFF;

    box-sizing: border-box;
    /* 边框色 */
    border-width: 0 1px 0 0;
    border-style: solid;
    border-color: #E4E4E4;

    .list-header {
      /* 自动布局 */
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      align-self: stretch;

      .title {
        font-size: 20px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0em;
        font-variation-settings: "opsz" auto;
        /* 主要文字 1F2D3D */
        color: #1F2D3D;
        display: flex;
      }

      .tool-bar {
        color: #4E5969;
        font-weight: 500;
        font-size: 20px;

        &:hover {
          color: #2561EF;
          cursor: pointer;
        }
      }
    }

    .desc {
      margin-top: 24px;
      margin-bottom: 24px;
      font-size: 14px;
      font-weight: normal;
      line-height: 14px;
      letter-spacing: 0em;
      font-variation-settings: "opsz" auto;
      /* 次要 4E5969 */
      color: #4E5969;
    }

    .keyword-query {
      width: 100%;

      :deep(.input-item) {
        --el-border-radius-base: 4px;
        --el-component-size: 40px;
        --el-input-bg-color: #F5F7FA;
        width: 100%;
      }
    }

    .line {
      margin-top: 24px;
      //margin-bottom: 24px;
      width: 100%;
      height: 1px;
      background: #E4E4E4;
    }

    .card-scroll-view {
      width: 100%;
      flex: 1 1 auto;
      overflow: auto;
      box-sizing: border-box;
    }
  }

  .retro-manage-route-view {
    flex: 2;
    height: 100%;
  }
}
</style>