<script setup lang="ts">

import BasicManageView from "@/views/admin/components/view/manage/basic/BasicManageView.vue";
import NodeTreeQuery from "@/views/admin/components/query/tree/node/NodeTreeQuery.vue";
</script>

<template>
  <basic-manage-view model-name="route">
    <template #tree="{queryable,loadData}">
      <node-tree-query
          model-name="route" property-name="dir" :queryable="queryable" :load-data="loadData"/>
    </template>
  </basic-manage-view>
</template>

<style scoped lang="scss">

</style>