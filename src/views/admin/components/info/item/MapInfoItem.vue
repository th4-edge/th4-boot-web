

<template>
  <div class="map-info-item">
    <title-line :title="infoItem.label"></title-line>
    <div class="model-collection-info-content">
      <div class="model-table-view-wrapper">
        <el-table :data="tableData" border stripe>
          <el-table-column label="序号" type="index" width="80"/>
          <el-table-column :label="props.infoItem.map?.key.clazz.note" prop="key" width="240"/>
          <el-table-column :label="props.infoItem.map?.value.clazz.note" prop="value" />
          <template #empty>
            <el-empty :description="'暂无'.concat(props.infoItem.label)"/>
          </template>
        </el-table>
      </div>
      <div class="bottom-line"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed, defineModel, defineProps} from "vue";
import {ElEmpty, ElTable, ElTableColumn} from "element-plus";
import TitleLine from "@/views/admin/components/layout/classic/container/view/header/TitleLine.vue";
const props = defineProps<{
  modelName: string,
  infoItem: th4.admin.ui.InfoItem,
  labelWidth?: string,
}>();
const model = defineModel<Record<string, any>>('model', {required: true})
const tableData = computed(() => Object.entries(model.value[props.infoItem.property]).map(([key, value]) => ({key, value})));
const paddingLeft = computed(() => props.labelWidth ? (parseInt(props.labelWidth.replace('px', '')) / 2) + 'px' : '0');

</script>
<style scoped lang="scss">
.map-info-item {
  width: 100%;
  box-sizing: border-box;

  .more-info {
    margin-right: 5px;
    margin-left: 10px;
    font-weight: 500;
    font-style: normal;
    color: #2561EF;
    cursor: pointer;
  }

  .title-line {
    padding-left: v-bind(paddingLeft);
  }

  .model-collection-info-content {
    padding-left: v-bind(paddingLeft);
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;

    .model-table-view-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 20px 10px 30px;
      .el-table {
        width: 70%;
      }
    }

    .bottom-line {
      width: 100%;
      height: 1px;
      border-bottom: 1px dashed var(--el-border-color);
      margin-bottom: 10px;
    }
  }
}
</style>