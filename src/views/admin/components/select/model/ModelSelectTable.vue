<template>
  <div class="model-select-table">
      <div v-if="keywordPlaceholder" class="keyword-box">
        <keyword-query v-model:keyword="keyword" :keyword-placeholder="keywordPlaceholder"
                       :model-name="props.modelName"
                       class="keyword-query"/>
      </div>
      <customize-table-view ref="table"
                            :auth="props.auth" :ignore-table-column="props.ignoreTableColumn" :ignore-table-field="props.ignoreTableField"
                            :keyword="keyword"
                            :model-name="props.modelName"
                            :multiple-column="props.multipleColumn"
                            :queryable="props.queryable"
                            :span-method="props.spanMethod"
                            :uri="props.uri"
                            auto-load
                            highlight-current-row
                            @row-click="currentChange"
      />
  </div>
</template>
<script lang="ts" setup>
import {defineEmits, defineProps, nextTick, onMounted, ref, watch} from "vue";
import CustomizeTableView from "@/views/admin/components/table/customize/CustomizeTableView.vue";
import KeywordQuery from "@/views/admin/components/query/keyword/KeywordQuery.vue";
import {uiModelQueryKeyword} from "@/store/th4/admin/ui/api/API.ts";
import {TableColumnCtx} from "element-plus";

const props = defineProps<{
  modelName: string,
  queryable?: Record<string, any>,
  ignoreTableField?: string,
  ignoreTableColumn?: string[],
  uri?: string,
  auth?: string,
  multipleColumn?: boolean;
  spanMethod?: ({row, column, rowIndex, columnIndex}: {
    row: any,
    column: TableColumnCtx<any>,
    rowIndex: number,
    columnIndex: number
  }) => any
}>();
const keyword = ref<string>('');
const keywordPlaceholder = ref<string>();
const table = ref();
const emit = defineEmits<{
  'selected': [any],
}>();
const currentChange = (item: any) => {
  emit('selected', item)
}
const loadQueryKeyword = () => {
  uiModelQueryKeyword(props.modelName).then((placeholder: string) => {
    keywordPlaceholder.value = placeholder
  })
}
onMounted(() => {
  loadQueryKeyword()
})
watch(keyword, () => {
  //等待keyword值域更新到表格控件后进行数据刷新
  nextTick(() => {
    table.value.loadData()
  })
}, {immediate: true})
watch(() => props.queryable, () => {
  if (table.value) {
    nextTick(() => {
      table.value.loadData()
    })
  }
}, {deep: true})
</script>
<style lang="scss" scoped>
.model-select-table {
  height: 100%;

  .keyword-box {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .input-item{
      --el-input-width: 320px;
      --el-input-height: 36px;
      --el-input-border-radius: 4px;
    }
  }

  .customize-table-view {
    margin-top: 10px;
    width: 100%;
    height: 600px;
  }
}
</style>