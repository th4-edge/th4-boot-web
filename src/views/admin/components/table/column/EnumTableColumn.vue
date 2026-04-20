<template>
  <el-table-column
      :column-key="props.tableColumn.property"
      :filter-method="filterMethod"
      :filters="filterData"
      :fixed="(props.parentColumns&&props.parentColumns[0]&&props.parentColumns[0].fixed)||props.tableColumn.fixed? 'left' : false"
      :label="props.tableColumn.label"
      :prop="props.parentColumns? `${props.parentColumns.map(c => c.property).join('.')}.${props.tableColumn.property}` : props.tableColumn.property"
      :sortable="props.tableColumn.sortable? 'custom' : false"
      :width="props.tableColumn.width+'px'">
    <template #default="{row}">
      <el-tag>{{ getRowValue(row) }}</el-tag>
    </template>
  </el-table-column>
</template>
<script lang="ts" setup>
import {defineProps, onMounted, ref, watch} from 'vue';
import {ElTableColumn} from 'element-plus';
import {modelEnums} from "@/store/th4/framework/service/api/API.ts";

const props = defineProps<{
  tableColumn: th4.admin.ui.TableColumn,
  parentColumns?: th4.admin.ui.TableColumn[],
  modelName?: string
}>();
const filterData = ref<any[]>([]);

const getRowValue = (row: any) => {
  if (props.parentColumns) {
    for (let parentColumn of props.parentColumns) {
      row = row[parentColumn.property];
      if (!row) {
        return "";
      }
    }
  }
  return row[props.tableColumn.property]?.name;
}
const filterMethod = (value: any, row: any) => row[props.tableColumn.property].value === value;
onMounted(() => {

});
watch(() => props.tableColumn, () => {
  if (props.modelName) {
    modelEnums(props.parentColumns && props.parentColumns.length == 1?
            props.parentColumns[0].type.name.substring(0, 1).toLowerCase().concat(props.parentColumns[0].type.name.substring(1))
            :props.modelName
        ,
        props.parentColumns && props.parentColumns.length == 1?
            props.tableColumn.property
        :props.tableColumn.property
    ).then(enums=>{
      filterData.value = enums.map(e => ({text: e.name, value: e.value}));
    })
  }
}, {immediate: true})

</script>
<style lang="scss" scoped>

</style>