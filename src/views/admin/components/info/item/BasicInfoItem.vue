<template>

  <template v-if="!parentInfoItem&&modelName.concat(infoItem.property).toLowerCase() in CustomizeInfoItemStore">
    <component :is="CustomizeInfoItemStore[modelName.concat(infoItem.property).toLowerCase()]"
               v-model:model="model"
               :info-item="infoItem" :label-width="props.labelWidth" :model-name="modelName" class="component-wrapper"/>
  </template>
  <template v-else>
    <div :class="{'basic-info-item':!infoItem.parent}">
      <template v-if="infoItem.file">
        <template v-if="infoItem.type.collection">
          <file-collection-info-item v-model:model="model" :info-item="infoItem" :label-width="props.labelWidth"
                                     :model-name="modelName"/>
        </template>
        <template v-else>
          <file-info-item v-model:model="model" :info-item="infoItem" :label-width="props.labelWidth"
                          :model-name="modelName"/>
        </template>
      </template>
      <template v-else-if="infoItem.type.enumerated">
        <enum-info-item v-model:model="model" :info-item="infoItem" :label-width="props.labelWidth"
                        :model-name="modelName"/>
      </template>
      <template v-else-if="infoItem.type.bool">
        <boolean-info-item v-model:model="model" :info-item="infoItem" :label-width="props.labelWidth"
                           :model-name="modelName"/>
      </template>
      <template v-else-if="infoItem.type.number">
        <number-info-item v-model:model="model" :info-item="infoItem" :label-width="props.labelWidth"
                          :model-name="modelName"/>
      </template>
      <template v-else-if="infoItem.type.model">
        <template v-if="infoItem.children&&infoItem.children.length==1">
          <basic-info-item v-model:model="model"
                           :info-item="{...infoItem.children[0],label:infoItem.label,parent:infoItem}"
                           :label-width="props.labelWidth" :model-name="modelName" :parent-info-item="infoItem"/>
        </template>
        <template v-else>
          <template v-if="infoItem.type.features.includes('Embeddable')">
            <embeddable-info-item v-model:model="model" :info-item="infoItem" :label-width="props.labelWidth"
                                  :model-name="modelName"/>
          </template>
          <template v-else>
            <model-info-item v-model:model="model" :info-item="infoItem" :label-width="props.labelWidth"
                             :model-name="modelName"/>
          </template>
        </template>
      </template>
      <template v-else-if="infoItem.type.collection">
        <template v-if="infoItem.genericTypes">
          <template v-if="infoItem.genericTypes[0].enumerated">
            <enum-collection-info-item v-model:model="model" :info-item="infoItem" :label-width="props.labelWidth"
                                       :model-name="modelName"/>
          </template>
          <template v-else-if="infoItem.genericTypes[0].model">
            <template v-if="infoItem.genericTypes[0].features.includes('Embeddable')">
              <embeddable-collection-info-item v-model:model="model" :info-item="infoItem"
                                               :label-width="props.labelWidth"
                                               :model-name="modelName"/>
            </template>
            <template v-if="infoItem.genericTypes[0].features.includes('Enumerable')">
              <model-collection-select-info-item v-model:model="model" :info-item="infoItem"
                                               :label-width="props.labelWidth"
                                               :model-name="modelName"/>
            </template>
            <template v-else>
              <model-collection-info-item v-model:model="model" :info-item="infoItem" :label-width="props.labelWidth"
                                          :model-name="modelName"/>
            </template>
          </template>
          <template v-else>
            <text-collection-info-item v-model:model="model" :info-item="infoItem" :label-width="props.labelWidth"
                                       :model-name="modelName"/>
          </template>
        </template>
      </template>
      <template v-else-if="infoItem.type.map">
        <template v-if="infoItem.genericTypes&&infoItem.genericTypes.length==2">
          <template v-if="infoItem.genericTypes[0].model">
            <template v-if="infoItem.genericTypes[1].model">
              <template v-if="infoItem.genericTypes[1].features.includes('Embeddable')">
                <map-model-embeddable-info-item v-model:model="model" :info-item="infoItem" :label-width="props.labelWidth"
                                                :model-name="modelName"/>
              </template>
              <template v-else>
                <map-model-model-info-item v-model:model="model" :info-item="infoItem" :label-width="props.labelWidth"
                                                :model-name="modelName"/>
              </template>
            </template>
          </template>
          <template v-else>
            <map-info-item v-model:model="model" :info-item="infoItem" :label-width="props.labelWidth"
                                            :model-name="modelName"/>
          </template>
        </template>
      </template>
      <template v-else>
        <text-info-item v-model:model="model" :info-item="infoItem" :label-width="props.labelWidth"
                        :model-name="modelName"/>
      </template>
    </div>
  </template>

</template>
<script lang="ts" setup>
import {computed, defineModel, defineProps} from 'vue';
import TextInfoItem from "@/views/admin/components/info/item/TextInfoItem.vue";
import CustomizeInfoItemStore from "@/views/admin/components/info/item/CustomizeInfoItemStore.ts";
import BooleanInfoItem from "@/views/admin/components/info/item/BooleanInfoItem.vue";
import EnumInfoItem from "@/views/admin/components/info/item/EnumInfoItem.vue";
import NumberInfoItem from "@/views/admin/components/info/item/NumberInfoItem.vue";
import ModelInfoItem from "@/views/admin/components/info/item/ModelInfoItem.vue";
import EmbeddableInfoItem from "@/views/admin/components/info/item/EmbeddableInfoItem.vue";
import EnumCollectionInfoItem from "@/views/admin/components/info/item/EnumCollectionInfoItem.vue";
import TextCollectionInfoItem from "@/views/admin/components/info/item/TextCollectionInfoItem.vue";
import ModelCollectionInfoItem from "@/views/admin/components/info/item/ModelCollectionInfoItem.vue";
import EmbeddableCollectionInfoItem from "@/views/admin/components/info/item/EmbeddableCollectionInfoItem.vue";
import MapModelEmbeddableInfoItem from "@/views/admin/components/info/item/MapModelEmbeddableInfoItem.vue";
import MapInfoItem from "@/views/admin/components/info/item/MapInfoItem.vue";
import MapModelModelInfoItem from "@/views/admin/components/info/item/MapModelModelInfoItem.vue";
import FileCollectionInfoItem from "@/views/admin/components/info/item/FileCollectionInfoItem.vue";
import FileInfoItem from "@/views/admin/components/info/item/FileInfoItem.vue";
import ModelCollectionSelectFormItem
  from "@/views/admin/components/form/components/item/ModelCollectionSelectFormItem.vue";
import ModelCollectionSelectInfoItem from "@/views/admin/components/info/item/ModelCollectionSelectInfoItem.vue";
//import ModelNameCollectionInfoItem from "@/views/admin/components/info/item/ModelNameCollectionInfoItem.vue";

const props = defineProps<{
  modelName: string,
  infoItem: th4.admin.ui.InfoItem,
  parentInfoItem?: th4.admin.ui.InfoItem,
  labelWidth?: string,
  maxWidth?: string,
}>();
const model = defineModel<Record<string, any>>('model', {required: true})

const infoItemWidth = computed(() => {
  if (props.maxWidth) {
    return props.maxWidth
  }
  if (props.infoItem.lob) {
    return '100%'
  }
  if (props.infoItem.type.model) {
    if (props.infoItem.children && props.infoItem.children.length == 1) {
      return '50%'
    }
    return '100%'
  }
  if (props.infoItem.type.collection || props.infoItem.type.map) {
    return '100%'
  }
  return '50%'
})

</script>

<style lang="scss" scoped>
.component-wrapper {
  :deep(.el-form-item__label,label) {
    font-family: 'PingFangHK-Regular', 'PingFang HK', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #999999;
    white-space: nowrap;
    text-transform: none;
    width: v-bind(labelWidth)
  }

  :deep(.el-form-item__content) {
    font-family: 'PingFangHK-Regular', 'PingFang HK', sans-serif;
    color: #333333;
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
  }
}

.basic-info-item {
  width: v-bind(infoItemWidth);

  :deep(.el-form-item__label,label) {
    font-family: 'PingFangHK-Regular', 'PingFang HK', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #999999;
    white-space: nowrap;
    text-transform: none;
    width: v-bind(labelWidth)
  }

  :deep(.el-form-item__content) {
    font-family: 'PingFangHK-Regular', 'PingFang HK', sans-serif;
    color: #333333;
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
  }
}

</style>