<template>
  <template
      v-if="!ignoredTableColumns || !ignoredTableColumns.includes(infoItem.parent?infoItem.parent.property.concat('.').concat(infoItem.property):infoItem.property)">
    <template v-if="infoItem.type.number">
      <number-table-column :data="data" :info-item="infoItem"/>
    </template>
    <template v-else-if="infoItem.type.bool">
      <boolean-table-column :data="data" :info-item="infoItem"/>
    </template>
    <template v-else-if="infoItem.type.enumerated">
      <enum-table-column :data="data" :info-item="infoItem"/>
    </template>
    <template v-else-if="infoItem.type.collection">
      <collection-table-column :data="data" :info-item="infoItem"/>
    </template>
    <template v-else-if="infoItem.type.model">
      <template v-if="infoItem.children">
        <model-table-column :data="data" :ignored-table-columns="ignoredTableColumns" :info-item="infoItem"
                            :multiple="multiple"/>
      </template>
    </template>
    <template v-else>
      <text-table-column :data="data" :info-item="infoItem"/>
    </template>
  </template>
</template>
<script lang="ts" setup>
import {defineProps} from "vue";
import NumberTableColumn from "@/views/admin/components/info/item/components/table/column/NumberTableColumn.vue";
import BooleanTableColumn from "@/views/admin/components/info/item/components/table/column/BooleanTableColumn.vue";
import EnumTableColumn from "@/views/admin/components/info/item/components/table/column/EnumTableColumn.vue";
import TextTableColumn from "@/views/admin/components/info/item/components/table/column/TextTableColumn.vue";
import ModelTableColumn from "@/views/admin/components/info/item/components/table/column/ModelTableColumn.vue";
import CollectionTableColumn from "@/views/admin/components/info/item/components/table/column/CollectionTableColumn.vue";

defineProps<{ infoItem: th4.admin.ui.InfoItem, multiple?: boolean, ignoredTableColumns?: string[], data: any[] }>();

</script>
<style lang="scss" scoped>

</style>