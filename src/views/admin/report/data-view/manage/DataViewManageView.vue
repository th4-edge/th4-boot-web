

<template>
  <basic-manage-view model-name="data-view">
    <template #query="{loadData,queryable}">
      <field-enum-query model-name="data-view" property-name="type" :load-data="loadData" :queryable="queryable"/>
    </template>
    <template #tree="{loadData,queryable}">
      <field-enum-tree-query model-name="data-view" property-name="type" :load-data="loadData" :queryable="queryable"/>
    </template>
  </basic-manage-view>
</template>
<script setup lang="ts">

import BasicManageView from "@/views/admin/components/view/manage/basic/BasicManageView.vue";
import FieldEnumQuery from "@/views/admin/components/query/field/enum/FieldEnumQuery.vue";
import FieldEnumTreeQuery from "@/views/admin/components/query/tree/enum/FieldEnumTreeQuery.vue";
</script>
<style scoped lang="scss">

</style>