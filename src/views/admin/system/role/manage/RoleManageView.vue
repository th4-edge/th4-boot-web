<script setup lang="ts">

import BasicManageView from "@/views/admin/components/view/manage/basic/BasicManageView.vue";
import FieldEnumRadioQuery from "@/views/admin/components/query/field/enum/FieldEnumRadioQuery.vue";
</script>

<template>
  <basic-manage-view model-name="role">
    <template #query="{loadData,queryable}">
      <field-enum-radio-query model-name="role" property-name="type" :load-data="loadData" :queryable="queryable"/>
    </template>
  </basic-manage-view>
</template>

<style scoped lang="scss">

</style>