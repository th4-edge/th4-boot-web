<template>
  <template v-if="infoItem.children">
    <template v-if="infoItem.children.length===1">
      <basic-table-column :ignored-table-columns="ignoredTableColumns" :info-item="{...infoItem.children[0],parent:infoItem}"
                          :multiple="multiple" :data="data"/>
    </template>
    <template v-else>
      <template v-if="multiple">
        <el-table-column :label="infoItem.label" align="center">
          <template v-for="childItem in infoItem.children">
            <basic-table-column :ignored-table-columns="ignoredTableColumns" :info-item="{...childItem,parent:infoItem}"
                                :multiple="multiple" :data="data"/>
          </template>
        </el-table-column>
      </template>
      <template v-else>
        <template v-for="childItem in infoItem.children">
          <basic-table-column :ignored-table-columns="ignoredTableColumns" :info-item="{...childItem,parent:infoItem}"
                              :multiple="multiple" :data="data"/>
        </template>
      </template>
    </template>
  </template>
</template>
<script lang="ts" setup>
import {ElTableColumn} from "element-plus";
import {defineProps} from "vue";
import BasicTableColumn from "@/views/admin/components/info/item/components/table/column/BasicTableColumn.vue";

defineProps<{ infoItem: th4.admin.ui.InfoItem, multiple?: boolean, ignoredTableColumns?: string[], data: any[] }>();
</script>
<style lang="scss" scoped>

</style>