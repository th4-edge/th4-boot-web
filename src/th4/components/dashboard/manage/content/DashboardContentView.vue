<template>
  <div class="dashboard-content-view">
  <dashboard-table-content-view
      :model-name="modelName"
      :page="page"
      :pageable="pageable"
      v-model:sortable="sortable"
      v-model:queryable="queryable"
      v-model:keyword="keyword"
      @size-change="fireSizeChange"
      @page-change="firePageChange"/>
  </div>
</template>
<script setup lang="ts">

import DashboardTableContentView from "@th4/components/dashboard/manage/content/table/DashboardTableContentView.vue";
import {defineEmits} from "vue";
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
}>();
const firePageChange = (page: number) => {
  emit('page-change', page)
}
const fireSizeChange = (size: number) => {
  emit('size-change', size)
}

</script>
<style scoped lang="scss">

</style>