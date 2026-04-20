<template>
  <div class="customize-manage-view">
    <div ref="headerView" class="customize-manage-view-header">
      <div class="header-left">
        <template v-if="props.queryField">
          <template v-for="field in props.queryField.split(',')">
<!--            <basic-query-form :field-name="field" :model-name="props.modelName" v-model:queryable="queryable"/>-->
          </template>
        </template>
        <template v-else>
          <slot name="query"></slot>
        </template>
        <keyword-query v-if="props.keyWordQuery" v-model:key-word="keyWord" :model-name="props.modelName" />
      </div>
      <div class="header-right">
        <slot :loadData="()=>{customizeTableView?.loadData()}" :selections="customizeTableView?.selections" name="action-bar"></slot>
      </div>
    </div>
    <div ref="contentView" class="customize-manage-view-content">

      <div ref="tableView" class="table-view">
        <customize-table-view ref="customizeTableView"
            :ignore-table-column="props.ignoreTableColumn"
            :ignore-table-field="props.ignoreTableField"
            :model-name="props.modelName"
            :multiple-column="props.multipleColumn"
                              :keyword="keyWord"
        >
          <template #table-actions="{row,loadData}">
            <slot :loadData="loadData" :row="row" name="table-actions"></slot>
          </template>
          <template #table-footer>
            <slot name="table-footer"></slot>
          </template>
        </customize-table-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed, defineProps, nextTick, onMounted, onUnmounted, ref, watch} from "vue";

import CustomizeTableView from "@/views/admin/components/table/customize/CustomizeTableView.vue";
import KeywordQuery from "@/views/admin/components/query/keyword/KeywordQuery.vue";

const props = defineProps<{
  modelName: string,
  uri?: string,
  ignoreTableField?: string,
  ignoreTableColumn?: string[],
  queryField?: string,
  keyWordQuery?: boolean,
  treeField?: string,
  queryable?: Record<string, any>,
  sortable?: Record<string, string>,
  spanRowField?: string[],
  multipleColumn?: boolean
}>();
const customizeTableView=ref();
const headerView = ref<HTMLElement>();
const contentView = ref<HTMLElement>();
const keyWord = ref<string>("");
const treeView = ref<HTMLElement>();
const tableView = ref<HTMLElement>();
const queryable = ref<Record<string, any>>({});

const calculateHeaderHeight = () => {
  if (headerView.value && contentView.value) {
    contentView.value.style.height = `calc(100% - ${headerView.value.offsetHeight}px)`;
  }
  if (tableView.value) {
    if (treeView.value) {
      tableView.value.style.width = `calc(100% - 240px)`;
    } else {
      tableView.value.style.width = `100%`;
    }

  }
}
const tableViewWidth = computed(() => props.treeField ? (treeView.value ? `calc(100% - 240px)` : '100%') : '100%');
onMounted(() => {
  calculateHeaderHeight();
  window.addEventListener("resize", calculateHeaderHeight);
})
onUnmounted(() => {
  window.removeEventListener("resize", calculateHeaderHeight);
});
watch(()=>keyWord.value, () => {
  customizeTableView.value.resetPage();
  customizeTableView.value.loadData();
})
watch(() => queryable.value, () => {
  customizeTableView.value.resetPage();
  customizeTableView.value.loadData();
}, {deep: true})
//监控modelName变化，重置分页参数
watch(() => props.modelName, () => {
  customizeTableView.value?.resetPage();
  customizeTableView.value?.loadData();
}, {immediate: true})

watch(() => props.treeField, () => {
  nextTick(() => {
    calculateHeaderHeight();
  })
}, {immediate: true})
</script>
<style lang="scss" scoped>
.customize-manage-view {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .customize-manage-view-header {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;

    .header-left {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .customize-form-item {
        margin-left: 10px;
      }

      .key-word-query {
        margin-left: 10px;
      }
    }

    .header-right {
      height: 100%;
      box-sizing: border-box;
      padding-right: 10px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }

  .customize-manage-view-content {
    width: 100%;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    padding-top: 10px;

    .tree-view {
      width: 240px;
      height: 100%;
      box-sizing: border-box;
    }

    .table-view {
      width: v-bind(tableViewWidth);
      padding-left: 10px;
      height: 100%;
      box-sizing: border-box;
    }
  }
}
</style>