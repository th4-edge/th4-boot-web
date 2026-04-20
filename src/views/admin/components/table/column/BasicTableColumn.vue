<template>
  <template v-if="!ignoreTableColumn|| !ignoreTableColumn.includes(columnName())">
    <template v-if="modelName.concat(columnName()).toLowerCase() in CustomizeTableColumnStore">
      <component :is="CustomizeTableColumnStore[modelName.concat(columnName()).toLowerCase()]" :model-name="modelName"
                 :parent-columns="parentColumns" :table-column="tableColumn"/>
    </template>
    <template v-else>
      <template v-if="tableColumn.type.name==='String'&&tableColumn.property==='icon'">
        <icon-table-column :parent-columns="parentColumns" :table-column="tableColumn"/>
      </template>
      <template v-else-if="tableColumn.type.name==='String'&&tableColumn.property==='color'">
      </template>
      <template v-else-if="tableColumn.type.name==='String'&&tableColumn.property==='avatar'">
      </template>
      <template v-else-if="tableColumn.type.name==='String'&&tableColumn.property==='name'">
        <name-table-column :parent-columns="parentColumns" :table-column="tableColumn" :model-name="modelName">
          <template v-if="tableColumns&&tableColumns.some(item=>item.property=='avatar')" #default="{row}">
            <template v-if="row.avatar">
              <el-image class="avatar-box" :src="`/api/${modelName}/download/avatar?file=${row.avatar}`" fit="cover"/>
            </template>
            <template v-else>
              <div class="avatar-box" :style="{backgroundColor: 'rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+',0.8)'}">
                <template v-if="tableColumns&&tableColumns.some(item=>item.property=='color')">
                  <el-tag :color="row['color']">{{row['name']}}</el-tag>
                </template>
                <template v-else>
                  {{row['name']}}
                </template>
              </div>
            </template>
          </template>
          <template v-if="tableColumns&&tableColumns.some(item=>item.property=='color')" #default="{row}">
            <el-tag :color="row['color']">
              <span style="color: #FFFFFF">{{row['name']}}</span>
            </el-tag>
          </template>
        </name-table-column>
      </template>
      <template v-else-if="tableColumn.type.enumerated">
        <enum-table-column :model-name="modelName" :parent-columns="parentColumns" :table-column="tableColumn"/>
      </template>
      <template v-else-if="tableColumn.type.number">
        <number-table-column :parent-columns="parentColumns" :table-column="tableColumn"/>
      </template>
      <template v-else-if="tableColumn.type.bool">
        <boolean-table-column :parent-columns="parentColumns" :table-column="tableColumn"/>
      </template>
      <template v-else-if="tableColumn.type.collection">
        <template v-if="tableColumn.genericTypes&&tableColumn.genericTypes[0].name==='String'">
          <text-collection-table-column :parent-columns="parentColumns" :table-column="tableColumn"/>
        </template>
        <template v-else-if="tableColumn.genericTypes&&tableColumn.genericTypes[0].enumerated">
          <enum-collection-table-column :parent-columns="parentColumns" :table-column="tableColumn"/>
        </template>
        <template v-else-if="tableColumn.genericTypes&&tableColumn.genericTypes[0].features.includes('Embeddable')">
          <embeddable-collection-table-column :parent-columns="parentColumns" :table-column="tableColumn"/>
        </template>
        <template v-else>
          <model-collection-table-column :parent-columns="parentColumns" :table-column="tableColumn"/>
        </template>
      </template>
      <template v-else-if="tableColumn.children&&tableColumn.children.length>0">
        <multi-table-column :ignore-table-column="ignoreTableColumn" :model-name="modelName" :multiple-column="multipleColumn"
                            :parent-columns="parentColumns" :table-column="tableColumn"/>
      </template>
      <template v-else-if="tableColumn.type.name==='String'">
        <text-table-column :parent-columns="parentColumns" :table-column="tableColumn"/>
      </template>
    </template>
  </template>
</template>
<script lang="ts" setup>
import CustomizeTableColumnStore from "@/views/admin/components/table/column/CustomizeTableColumnStore.ts";
import {defineProps} from "vue";
import {ElImage} from "element-plus";
import MultiTableColumn from "@/views/admin/components/table/column/MultiTableColumn.vue";
import EnumTableColumn from "@/views/admin/components/table/column/EnumTableColumn.vue";
import NumberTableColumn from "@/views/admin/components/table/column/NumberTableColumn.vue";
import BooleanTableColumn from "@/views/admin/components/table/column/BooleanTableColumn.vue";
import TextTableColumn from "@/views/admin/components/table/column/TextTableColumn.vue";
import IconTableColumn from "@/views/admin/components/table/column/IconTableColumn.vue";
import TextCollectionTableColumn from "@/views/admin/components/table/column/TextCollectionTableColumn.vue";
import EnumCollectionTableColumn from "@/views/admin/components/table/column/EnumCollectionTableColumn.vue";
import EmbeddableCollectionTableColumn from "@/views/admin/components/table/column/EmbeddableCollectionTableColumn.vue";
import ModelCollectionTableColumn from "@/views/admin/components/table/column/ModelCollectionTableColumn.vue";
import NameTableColumn from "@/views/admin/components/table/column/NameTableColumn.vue";
import DateTimeTableColumn from "@/views/admin/components/table/column/DateTimeTableColumn.vue";

const props = defineProps<{
  tableColumn: th4.admin.ui.TableColumn,
  tableColumns?: th4.admin.ui.TableColumn[],
  parentColumns?: th4.admin.ui.TableColumn[],
  modelName: string,
  multipleColumn?: boolean,
  ignoreTableColumn?: string[]
}>();
const columnName = () => {
  let columnName = "";
  if (props.parentColumns) {
    for (let parentColumn of props.parentColumns) {
      columnName = columnName.concat(parentColumn.property).concat(".");
    }
  }
  return columnName.concat(props.tableColumn.property);
}
</script>
<style lang="scss" scoped>
.avatar-box{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border:2px solid #FFFFFF;
  font-size: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  transition: all .5s cubic-bezier(.25,.8,.25,1);
  &:hover{
    transform: scale(1.2);
  }
}
</style>