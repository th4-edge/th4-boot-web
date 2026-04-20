<template>
  <template v-if="tableColumn.children && tableColumn.children.filter(item => item.visible).length > 1">
    <template v-if="multipleColumn">
      <el-table-column :label="tableColumn.label" align="center">
        <template v-for="itemColumn in tableColumn.children">
          <template v-if="itemColumn.visible">
            <basic-table-column :ignore-table-column="ignoreTableColumn"
                                :model-name="modelName"
                                :parent-columns="parentColumns? parentColumns.concat(tableColumn) : [tableColumn]" :table-column="itemColumn"/>
          </template>
        </template>
      </el-table-column>
    </template>
    <template v-else>
      <template v-for="itemColumn in tableColumn.children">
        <template v-if="itemColumn.visible">
          <basic-table-column :ignore-table-column="ignoreTableColumn"
                              :model-name="modelName"
                              :parent-columns="parentColumns? parentColumns.concat(tableColumn) : [tableColumn]" :table-column="itemColumn"/>
        </template>
      </template>
    </template>
  </template>
  <template v-else>
    <basic-table-column :model-name="modelName"
                        :parent-columns="parentColumns? parentColumns.concat(tableColumn) : [tableColumn]"
                        :table-column="{...tableColumn.children!.filter(item => item.visible)[0],label:tableColumn.label}"/>
  </template>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue';
import {ElTableColumn} from 'element-plus';
import BasicTableColumn from "@/views/admin/components/table/column/BasicTableColumn.vue";

defineProps<{
  tableColumn: th4.admin.ui.TableColumn,
  parentColumns?: th4.admin.ui.TableColumn[],
  modelName: string,
  ignoreTableColumn?: string[],
  multipleColumn?: boolean
}>();
</script>
<style lang="scss" scoped>

</style>