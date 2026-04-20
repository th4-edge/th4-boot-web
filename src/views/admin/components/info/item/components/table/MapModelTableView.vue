<template>
  <div class="map-model-table-view" v-if="props.data&&props.data.key&&props.data.value">
    <el-table :data="props.data.key" :span-method="spanMethod" border stripe>
      <template v-if="map.key.children">
        <template v-for="infoItem in map.key.children">
          <basic-table-column :ignored-table-columns="props.ignoredTableColumns" :info-item="infoItem"
                              :multiple="props.multiple" :data="props.data.key"/>
        </template>
      </template>
      <template v-if="map.value.type.enumerated">
        <el-table-column :label="props.map.value.clazz.note"  align="center">
          <template #default="row">
            {{ props.data.value[row.$index] ? props.data.value[row.$index].name : "" }}
          </template>
        </el-table-column>
      </template>
      <template v-if="map.value.children">
        <template v-for="infoItem in map.value.children">
          <basic-table-column :data="props.data.value" :ignored-table-columns="props.ignoredTableColumns" :info-item="infoItem"
                              :multiple="props.multiple"/>
        </template>
      </template>
      <template v-if="map.value.type.number">
        <el-table-column :label="props.map.value.clazz.note" align="center">
          <template #default="row">
            {{ props.data.value[row.$index].toFixed(2) }}{{props.map.value.unit}}
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import {ElTable, ElTableColumn, TableColumnCtx} from "element-plus";
import BasicTableColumn from "@/views/admin/components/info/item/components/table/column/BasicTableColumn.vue";

const props = defineProps<{
  data: { key: any[], value: any[] },
  map: th4.admin.ui.MapProperty<th4.admin.ui.InfoItem>,
  multiple?: boolean,
  spanMethod?: ({row, column, rowIndex, columnIndex}: {
    row: any,
    column: TableColumnCtx<any>,
    rowIndex: number,
    columnIndex: number
  }, page: th4.framework.Page<any>) => any,
  ignoredTableColumns?: string[]
}>();
</script>
<style lang="scss" scoped>

</style>