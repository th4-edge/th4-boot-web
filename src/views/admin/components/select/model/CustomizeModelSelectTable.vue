<template>
  <div class="model-select-table">
    <template v-if="modelName.toLowerCase() in CustomizeModelSelectStore">
      <component :is="CustomizeModelSelectStore[modelName.toLowerCase()]"
                 :auth="props.auth" :ignore-table-column="props.ignoreTableColumn" :ignore-table-field="props.ignoreTableField"
                 :model-name="props.modelName"
                 :multiple-column="props.multipleColumn"
                 :queryable="props.queryable"
                 :span-method="props.spanMethod"
                 :uri="props.uri"
                 auto-load
                 highlight-current-row
                 @selected="currentChange"/>
    </template>
    <template v-else>
      <model-select-table :auth="props.auth" :ignore-table-column="props.ignoreTableColumn" :ignore-table-field="props.ignoreTableField"

                             :model-name="props.modelName"
                             :multiple-column="props.multipleColumn"
                             :queryable="props.queryable"
                             :span-method="props.spanMethod"
                             :uri="props.uri"
                             auto-load
                             highlight-current-row
                             @selected="currentChange"/>
    </template>
  </div>
</template>
<script lang="ts" setup>
import {defineEmits, defineProps, nextTick, onMounted, ref, watch} from "vue";
import CustomizeTableView from "@/views/admin/components/table/customize/CustomizeTableView.vue";
import KeywordQuery from "@/views/admin/components/query/keyword/KeywordQuery.vue";
import {uiModelQueryKeyword} from "@/store/th4/admin/ui/api/API.ts";
import {TableColumnCtx} from "element-plus";
import CustomizeModelSelectStore from "@/views/admin/components/select/model/CustomizeModelSelectStore.ts";
import MaterialModelSelect from "@/views/dr/components/bim/material/model-select/MaterialModelSelect.vue";
import ModelSelectTable from "@/views/admin/components/select/model/ModelSelectTable.vue";

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

const table = ref();
const emit = defineEmits<{
  'selected': [any],
}>();
const currentChange = (item: any) => {
  emit('selected', item)
}

</script>
<style lang="scss" scoped>
.model-select-table {
  height: 100%;

  .keyword-box {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .customize-table-view {
    height: 600px;
  }
}
</style>