

<template>
  <div class="dashboard-table-content-header-view">
    <keyword-query :model-name="modelName" v-model:keyword="keyword"/>
  </div>
</template>
<script setup lang="ts">

import KeywordQuery from "@/views/admin/components/query/keyword/KeywordQuery.vue";
defineProps<{modelName: string;}>();
const keyword = defineModel<string>('keyword', {required: true});

</script>
<style scoped lang="scss">
.dashboard-table-content-header-view{
  display: flex;
  align-items: center;
  .icon-box{
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    .x-icon{
      font-size: 20px;
    }
    padding-top: 2px;
  }
  .keyword-query{
    margin-right: 12px;
    height: 36px;
    :deep(.input-item) {
      width: 400px;
      --el-component-size: 24px;
    }
  }
}
</style>