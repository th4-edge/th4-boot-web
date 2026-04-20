<template>
    <classic-title-view key="view" :title="title||(modelClazz?.note||'').concat('管理')" class="basic-page-view">
<!--      <template v-if="!keywordPlaceholder" #action-bar>-->
<!--        <slot :load-data="loadData" :queryable="queryable" />-->
<!--      </template>-->
      <div class="basic-page-container">
        <div class="basic-page-header">
          <div class="basic-page-header-query">
          <slot name="query" :load-data="loadData" :queryable="queryable"></slot>
          <keyword-query v-model:keyword="keyword" class="keyword-query"
                         :keyword-placeholder="keywordPlaceholder"
                         :model-name="props.modelName"/>
          </div>
          <div>
            <slot :load-data="loadData" :queryable="queryable"/>
          </div>
        </div>
        <div :class="{'basic-page-content-width': !keywordPlaceholder}" class="basic-page-content">
          <div class="basic-page-content-left" ref="tree">
             <slot name="tree" :load-data="loadData" :queryable="queryable"></slot>
          </div>
          <customize-table-view ref="customizeTableView"
                                :uri="props.uri"
                                :auth="props.auth"
                                :keyword="keyword"
                                :model-name="props.modelName"
                                :ignore-table-column="props.ignoreTableColumn"
                                :ignore-table-field="props.ignoreTableField"
                                :queryable="queryable"
                                :sortable="sortable"
                                :multipleColumn="multipleColumn"
                                :span-method="spanMethod"
                                :selection="selection"
                                @row-click="fireRowClick"
                                @selection-change="fireSelectionChange"
          >
            <template v-if="$slots['table-columns']" #table-columns>
                <slot name="table-columns"></slot>
            </template>
            <template #table-actions="{row}">
              <slot :load-data="loadData" :row="row" :note="modelClazz?.note" name="table-actions"></slot>
            </template>
          </customize-table-view>
        </div>
      </div>
    </classic-title-view>
</template>
<script lang="ts" setup>
import {defineEmits, defineProps, nextTick, ref, watch, computed, useSlots} from "vue"
import ClassicTitleView from "@/views/admin/components/layout/classic/container/view/ClassicTitleView.vue";
import CustomizeTableView from "@/views/admin/components/table/customize/CustomizeTableView.vue";
import KeywordQuery from "@/views/admin/components/query/keyword/KeywordQuery.vue";
import {uiModelQueryKeyword, uiModelViewLayout} from "@/store/th4/admin/ui/api/API.ts";
import {useElementSize} from "@vueuse/core";
import {TableColumnCtx} from "element-plus";

const props = defineProps<{
  title?:string,
  modelName: string,
  ignoreTableField?: string,
  ignoreTableColumn?: string[],
  uri?: string,
  auth?:string,
  queryable?:Record<string, any>,
  sortable?:Record<string, any>,
  multipleColumn?: boolean,
  spanMethod?: ({row, column, rowIndex, columnIndex}: {
    row: any,
    column: TableColumnCtx<any>,
    rowIndex: number,
    columnIndex: number
  }) => any,
  selection?: boolean
}>();
const queryable = ref(props.queryable||{})
const emit = defineEmits<{
  'row-click':[any],
  'selection-change': [any[]]
}>();
const modelClazz = ref<th4.admin.ui.Clazz>()
const keyword = ref<string>('');
const keywordPlaceholder = ref<string>();
const customizeTableView = ref();
const slots=useSlots();
const tree=ref();
const {width}=useElementSize(tree);
const customizeTableViewWidth = computed(() => slots['tree'] ? ( `calc(100% - ${width.value}px)` ) : '100%');

const fireSelectionChange=(selections:any[])=>{
  emit('selection-change', selections)
}
const fireRowClick=(row:any)=>{
  emit('row-click',row)
}
const loadData=()=>{
  if (customizeTableView.value) {
    customizeTableView.value.resetPage();
    customizeTableView.value.loadData();
  }
}
const loadQueryKeyword = () => {
  uiModelQueryKeyword(props.modelName).then((placeholder: string) => {
    keywordPlaceholder.value = placeholder
  })
}
watch(keyword, () => {
  //等待keyword值域更新到表格控件后进行数据刷新
  nextTick(() => {
    loadData()
  })
}, {immediate: true})
const loadViewLayout = () => {
  uiModelViewLayout(props.modelName).then(clazz => {
    modelClazz.value = clazz
  })
}
watch(() => props.modelName, () => {
  loadViewLayout();
  loadQueryKeyword();
}, {immediate: true})
</script>
<style lang="scss" scoped>
.basic-page-view {
  //width: 100%;
  //height: 100%;
  box-sizing: border-box;
  .basic-page-container {
    width: 100%;
    height: 100%;
    padding:0 20px;
    box-sizing: border-box;
    .basic-page-header {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      .basic-page-header-query{
        display: flex;
        align-items: center;
        gap: 10px;
        .keyword-query{
           //margin-left: 10px;
        }
      }
    }

    .basic-page-content {
      width: 100%;
      height: calc(100% - 60px) !important;
      display: flex;
      box-sizing: border-box;
      .basic-page-content-left{
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        box-sizing: border-box;
        padding-bottom: 40px;
        & > *{
          flex: 1;
          margin-bottom: 20px;
        }
      }
      .customize-table-view{
        width: v-bind(customizeTableViewWidth);
        height: 100%;
        box-sizing: border-box;
      }
    }
    .basic-page-content-width{
      height: 100%;
    }
  }
}
</style>