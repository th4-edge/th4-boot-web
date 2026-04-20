
<template>
  <basic-manage-view model-name="menu">
    <template #query="{queryable,loadData}">
      <field-enum-radio-query model-name="menu" property-name="type" :load-data="loadData" :queryable="queryable"/>
    </template>
    <template #tree="{loadData,queryable}">
      <model-tree-query model-name="menu" property-name="parent" :uri-queryable="{parentIsNull:''}" :load-data="loadData" :queryable="queryable"/>
    </template>
  </basic-manage-view>
</template>
<script setup lang="ts">
import BasicManageView from "@/views/admin/components/view/manage/basic/BasicManageView.vue";
import ModelTreeQuery from "@/views/admin/components/query/tree/model/ModelTreeQuery.vue";
import FieldEnumRadioQuery from "@/views/admin/components/query/field/enum/FieldEnumRadioQuery.vue";
</script>

<style scoped lang="scss">

</style>