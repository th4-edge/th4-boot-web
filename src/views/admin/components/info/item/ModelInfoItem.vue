<template>
  <div class="model-info-item">
    <title-line :title="infoItem.label">
      <div class="more-info">...</div>
    </title-line>
    <div class="model-info-item-content">
      <template v-if="props.infoItem.children">
        <template v-for="index in props.infoItem.children.length">
          <template v-if="index*2-2>=0">
            <basic-info-item v-if="props.infoItem.children[index*2-2]"
                             :info-item="{...props.infoItem.children[index*2-2],parent:props.infoItem}"
                             :label-width="props.labelWidth"
                             :model="model"
                             :model-name="modelName" :parent-info-item="props.infoItem"
                             class="basic-info-item"/>
            <basic-info-item v-if="props.infoItem.children[index*2-1]"
                             :info-item="{...props.infoItem.children[index*2-1],parent:props.infoItem}"
                             :label-width="props.labelWidth"
                             :model="model"
                             :model-name="modelName" :parent-info-item="props.infoItem"
                             class="basic-info-item"/>
          </template>
        </template>
      </template>
      <div class="bottom-line"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed, defineModel, defineProps} from 'vue';
import BasicInfoItem from "@/views/admin/components/info/item/BasicInfoItem.vue";
import TitleLine from "@/views/admin/components/layout/classic/container/view/header/TitleLine.vue";

const props = defineProps<{
  modelName: string,
  infoItem: th4.admin.ui.InfoItem,
  labelWidth?: string,
}>();
const model = defineModel<Record<string, any>>('model', {required: true})

const paddingLeft = computed(() => props.labelWidth ? (parseInt(props.labelWidth.replace('px', '')) / 2) + 'px' : '0');

</script>
<style lang="scss" scoped>
.model-info-item {
  width: 100%;
  box-sizing: border-box;

  .more-info {
    margin-right: 20px;
    margin-left: 10px;
    font-weight: 500;
    font-style: normal;
    color: #2561EF;
    cursor: pointer;
    font-size: 12px;
  }

  .title-line {
    padding-left: v-bind(paddingLeft);
  }

  .model-info-item-content {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;

    .basic-info-item {
      width: 50%;
    }

    .bottom-line {
      width: 100%;
      margin-left: v-bind(paddingLeft);
      height: 1px;
      border-bottom: 1px dashed var(--el-border-color);
      margin-bottom: 10px;
    }
  }
}
</style>