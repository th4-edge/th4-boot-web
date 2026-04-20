

<template>
  <div class="dashboard-manage-view">
    <dashboard-header-view :total-elements="page.totalElements">
      <template #tool-box v-if="$slots['tool-box']">
        <slot name="tool-box"></slot>
      </template>
    </dashboard-header-view>
    <dashboard-content-view
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
import DashboardHeaderView from "@th4/components/dashboard/manage/header/DashboardHeaderView.vue";
import DashboardContentView from "@th4/components/dashboard/manage/content/DashboardContentView.vue";
import ClassicCustomerLayoutView
  from "@/views/crm/consultant/customer/console/customer/content/classic/ClassicCustomerLayoutView.vue";
import CardCustomerLayoutView
  from "@/views/crm/consultant/customer/console/customer/content/card/CardCustomerLayoutView.vue";
import {ref, watch} from "vue";
import {modelPage} from "@/store/th4/framework/service/api/API.ts";
import {ElMessage} from "element-plus";
const customerContentViewMapping: Record<string, any> = {
  classic: ClassicCustomerLayoutView,
  card: CardCustomerLayoutView
}

const props = defineProps<{
  modelName: string,
  auth?: string,
  activeEnv?: crm.customer.env.Env,
  activeState?: th4.framework.Enumerated<string>
}>()
const layout = ref<ViewLayout>()

const keyword = ref<string>('')
const queryable = ref<Record<string, any>>({
  stateEq: 'Resolved'
})
const sortable = ref<Record<string, number>>({})
const pageable = ref<{ page: number; size: number }>({
  page: 1,
  size: 10
})
const page = ref<th4.framework.Page<crm.customer.customer.Customer>>({
  first: true,
  last: true,
  number: 1,
  size: 10,
  totalElements: 0,
  totalPages: 1,
  content: []
})
const loadData = () => {
  modelPage(props.modelName, {
    keyword: keyword.value.trim(),
    ...queryable.value,
    ...sortable.value,
    ...pageable.value
    // incIdDesc: ''
  },undefined,props.auth)
      .then((thePage: th4.framework.Page<any>) => {
        page.value = thePage
      })
      .catch((e) => {
        ElMessage.error(e.message)
      })
}
const firePageChange = (page: number) => (pageable.value.page = page)
const fireSizeChange = (size: number) => (pageable.value.size = size)



watch(
    () => props.activeEnv,
    () => {
      queryable.value['envs.envIdEq'] = props.activeEnv?.envId || ''
    }
)
watch(
    () => props.activeState,
    () => {
      queryable.value['stateEq'] = props.activeState?.key || ''
    }
)
watch(
    [
      () => queryable.value,
      () => sortable.value,
      () => keyword.value,
      () => pageable.value
    ],
    () => {
      loadData()
    },
    { deep: true, immediate: true }
)

const refresh = () => {
  loadData()
}


</script>
<style scoped lang="scss">
.dashboard-manage-view {
  width: 100%;
  height: 100%;
  .dashboard-header-view {
    width: 100%;
    height: 64px;
    padding: 0 24px;
    box-sizing: border-box;
    /* 背景色 */
    background: #f5f7fa;
  }
  .dashboard-content-view {
    width: 100%;
    height: calc(100% - 64px);
    background-color: #ffffff;
    box-sizing: border-box;
  }
}
</style>