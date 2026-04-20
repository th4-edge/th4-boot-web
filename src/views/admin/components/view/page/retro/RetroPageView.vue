<template>
  <div class="retro-page-view">
    <div class="retro-page-content-view">
      <div class="list-header">
        <div class="title">
          <div class="icon"></div>
          <div class="text">{{ modelClazz?.note }}</div>
        </div>
        <div class="tool-bar">
          <slot name="action-box"></slot>
        </div>
      </div>
      <div class="desc">
        {{ modelClazz?.describe }}
      </div>
      <keyword-query v-model:keyword="keyword" :model-name="modelName"/>
      <div class="line"></div>
      <card-scroll-view ref="dataView"
          :model-name="modelName"
          :setting="setting"
          :keyword="keyword" auto-load
          @selected="onSelected"
          @fireUpdate="fireUpdate"
          @fireDelete="fireDelete"
      >
        <template v-if="$slots&&$slots['query']" #query="{queryable,loadData}">
          <slot name="query" :queryable="queryable" :load-data="loadData"></slot>
        </template>
        <template v-if="$slots&&$slots['empty']" #empty>
          <slot name="empty"></slot>
        </template>
        <template v-if="$slots&&$slots['model-card-icon']" #model-card-icon="{model}">
          <slot name="model-card-icon" :model="model"></slot>
        </template>
      </card-scroll-view>
    </div>
    <div class="retro-page-info-view">
      <template v-if="selected">
        <retro-info-view :model-name="modelName" :model="selected" @fireUpdate="fireUpdate"
                         @fireDelete="fireDelete">
          <template v-if="$slots&&$slots['info-title']" #title>
            <slot name="info-title" :model="selected" :modelName="modelName"></slot>
          </template>
        </retro-info-view>
      </template>
      <template v-else>
        <el-empty />
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import {defineProps, ref, watch} from "vue";
import {uiModelQueryKeyword, uiModelViewLayout} from "@/store/th4/admin/ui/api/API.ts";
import KeywordQuery from "@/views/admin/components/query/keyword/KeywordQuery.vue";
import CardScrollView from "@/views/admin/components/card/scroll/CardScrollView.vue";
import RetroInfoView from "@/views/admin/components/view/info/retro/RetroInfoView.vue";

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
const dataView=ref();
const keyword = ref<string>('');
const keywordPlaceholder = ref<string>();
const modelClazz = ref<th4.admin.ui.Clazz>();
const selected=ref<any>();
const emit = defineEmits<{ 'selected': [any],'fireUpdate':[any],'fireDelete':[any,Function] }>()

const fireUpdate=(row:any)=>{
  emit('fireUpdate', row)
}
const fireDelete=(row:any,loadData?:Function)=>{
  emit('fireDelete', row,loadData||dataView.value.loadData)
}
const onSelected = (model: any) => {
  selected.value = model
  emit('selected', selected.value)
}
const loadQueryKeyword = () => {
  uiModelQueryKeyword(props.modelName).then((placeholder: string) => {
    keywordPlaceholder.value = placeholder
  })
}
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
<style scoped lang="scss">
.retro-page-view {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;

  .retro-page-content-view {
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
    overflow: auto;

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

  .retro-page-info-view {
    flex: 2;
    height: 100%;
    background-color: #FFFFFF;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    min-width: 0;
  }
}
</style>