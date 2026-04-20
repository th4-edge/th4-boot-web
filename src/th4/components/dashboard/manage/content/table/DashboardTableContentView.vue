<template>
  <div class="dashboard-table-content-view">
    <dashboard-table-content-header-view :model-name="modelName" v-model:keyword="keyword"/>
    <dashboard-table-content-table-view :model-name="modelName"
                                        :page="page"
                                        :pageable="pageable"
                                        :queryable="queryable"
                                        :sortable="sortable"
                                        @size-change="emit('size-change', $event)"
                                        @page-change="emit('page-change', $event)"/>
  </div>
</template>
<script setup lang="ts">

import DashboardTableContentHeaderView
  from "@th4/components/dashboard/manage/content/table/header/DashboardTableContentHeaderView.vue";
import {defineEmits} from "vue";
import DashboardTableContentTableView
  from "@th4/components/dashboard/manage/content/table/table/DashboardTableContentTableView.vue";
defineProps<{
  modelName:string,
  page: th4.framework.Page<any>
  pageable: { page: number; size: number }
}>()
const keyword = defineModel<string>('keyword', { required: true })
const queryable = defineModel<Record<string, string>>('queryable', {
  required: true
})

const sortable = defineModel<Record<string, number>>('sortable', {
  required: true
})
const emit = defineEmits<{
  'size-change': [number]
  'page-change': [number]
}>()
</script>
<style scoped lang="scss">
.dashboard-table-content-view {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  .dashboard-table-content-header-view {
    width: 100%;
    height: 56px;
    box-sizing: border-box;
  }
  .dashboard-table-content-table-view {
    margin-top: 10px;
    width: 100%;
    height: calc(100% - 66px);
    box-sizing: border-box;
  }
}
</style>