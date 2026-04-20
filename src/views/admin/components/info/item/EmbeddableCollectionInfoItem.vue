<template>
  <div class="embeddable-collection-info-item">
    <title-line :title="infoItem.label"></title-line>
    <div class="embeddable-collection-info-content">
      <div class="embeddable-table-view-wrapper">
        <embeddable-table-view v-if="infoItem.children" :data="modelValue" :info-items="infoItem.children"/>
      </div>
      <div class="bottom-line"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed, defineModel, defineProps} from 'vue';
import EmbeddableTableView from "@/views/admin/components/info/item/components/table/EmbeddableTableView.vue";
import TitleLine from "@/views/admin/components/layout/classic/container/view/header/TitleLine.vue";

const props = defineProps<{
  modelName: string,
  infoItem: th4.admin.ui.InfoItem,
  labelWidth?: string,
}>();
const model = defineModel<Record<string, any>>('model', {required: true})

const paddingLeft = computed(() => props.labelWidth ? (parseInt(props.labelWidth.replace('px', '')) / 2) + 'px' : '0');

const modelValue = computed(() => {
  let value = model.value;
  let parent = props.infoItem.parent;
  while (parent) {
    value = value[parent.property];
    parent = parent.parent;
  }
  return value ? value[props.infoItem.property] : [];
})
</script>
<style lang="scss" scoped>
.embeddable-collection-info-item {
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
    //padding-left: v-bind(paddingLeft);
  }

  .embeddable-collection-info-content {
    //padding-left: v-bind(paddingLeft);
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;

    .embeddable-table-view-wrapper {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 20px 10px 30px;
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