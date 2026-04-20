<template>
  <div class="basic-form-item">
    <template v-if="!parentFormItem&&modelName.concat(formItem.property).toLowerCase() in CustomizeFormItemStore">
      <component :is="CustomizeFormItemStore[modelName.concat(formItem.property).toLowerCase()]"
                 v-model:form="form" v-model:form-model="formModel" v-model:form-rules="formRules"
                 :form-item="formItem" :model-name="modelName" :auth="auth"/>
    </template>
    <template v-else>
      <template v-if="formItem.property==='icon'&&formItem.type.name==='String'">
        <icon-form-item v-model:form="form" v-model:form-model="formModel" v-model:form-rules="formRules"
                        :form-item="formItem" :model-name="modelName"/>
      </template>
      <template v-else-if="formItem.property==='color'&&formItem.type.name==='String'">
        <color-form-item v-model:form="form" v-model:form-model="formModel" v-model:form-rules="formRules"
                          :form-item="formItem" :model-name="modelName"/>
      </template>
      <template v-else-if="formItem.property==='avatar'&&formItem.type.name==='String'">
        <avatar-form-item v-model:form="form" v-model:form-model="formModel" v-model:form-rules="formRules"
                        :form-item="formItem" :model-name="modelName"/>
      </template>
      <template v-else-if="formItem.type.file">
        <template v-if="formItem.type.collection">
          <file-collection-form-item v-model:form="form" v-model:form-model="formModel" v-model:form-rules="formRules"
                                     :form-item="formItem" :model-name="modelName"/>
        </template>
        <template v-else>
          <file-form-item v-model:form="form" v-model:form-model="formModel" v-model:form-rules="formRules"
                          :form-item="formItem" :model-name="modelName"/>
        </template>
      </template>
      <template v-else-if="formItem.type.file">
        <template v-if="formItem.type.collection">
          <file-collection-form-item v-model:form="form" v-model:form-model="formModel" v-model:form-rules="formRules"
                                     :form-item="formItem" :model-name="modelName"/>
        </template>
        <template v-else>
          <file-form-item v-model:form="form" v-model:form-model="formModel" v-model:form-rules="formRules"
                          :form-item="formItem" :model-name="modelName"/>
        </template>
      </template>
      <template v-else-if="formItem.type.map">
        <template v-if="formItem.genericTypes&&formItem.genericTypes.length==2">

          <template v-if="formItem.genericTypes[0].model">
            <template v-if="formItem.genericTypes[1].model">
              <template v-if="formItem.genericTypes[1].features.includes('Embeddable')">
                <map-model-embeddable-form-item v-model:form="form" v-model:form-model="formModel"
                                                v-model:form-rules="formRules"
                                                :form-item="formItem" :model-name="modelName"/>
              </template>
              <template v-else>
                <map-model-model-form-item v-model:form="form" v-model:form-model="formModel"
                                           v-model:form-rules="formRules"
                                           :form-item="formItem" :model-name="modelName"/>
              </template>
            </template>
            <template v-else-if="formItem.genericTypes[1].enumerated">
              <map-model-enum-form-item v-model:form="form" v-model:form-model="formModel"
                                        v-model:form-rules="formRules"
                                        :form-item="formItem" :model-name="modelName"/>
            </template>
            <template v-else-if="formItem.genericTypes[1].number">
              11
              <map-model-number-form-item v-model:form="form" v-model:form-model="formModel"
                                          v-model:form-rules="formRules"
                                          :form-item="formItem" :model-name="modelName"/>
            </template>
            <template v-else-if="formItem.genericTypes[1].bool">
              <map-model-boolean-form-item v-model:form="form" v-model:form-model="formModel"
                                           v-model:form-rules="formRules"
                                           :form-item="formItem" :model-name="modelName"/>
            </template>
            <template v-else>
              <map-model-text-form-item v-model:form="form" v-model:form-model="formModel"
                                        v-model:form-rules="formRules"
                                        :form-item="formItem" :model-name="modelName"/>
            </template>
          </template>
          <template v-else-if="formItem.genericTypes[0].enumerated">
            <template v-if="formItem.genericTypes[1].model">
              <template v-if="formItem.genericTypes[1].features.includes('Embeddable')">
                枚举-嵌入
              </template>
              <template v-else>
                枚举-对象
              </template>
            </template>
          </template>
          <template v-else>
            <map-form-item v-model:form="form" v-model:form-model="formModel"
                           v-model:form-rules="formRules"
                           :form-item="formItem" :model-name="modelName"/>
          </template>
        </template>
      </template>
      <template v-else-if="formItem.type.collection">
        <template v-if="formItem.genericTypes&&formItem.genericTypes[0].model">
          <template v-if="formItem.genericTypes&&formItem.genericTypes[0].features.includes('Embeddable')">
            <embeddable-collection-form-item v-model:form="form" v-model:form-model="formModel"
                                             v-model:form-rules="formRules" :labelPosition="labelPosition"
                                             :form-item="formItem" :model-name="modelName"/>
          </template>
          <template v-if="formItem.genericTypes&&formItem.genericTypes[0].features.includes('Enumerable')">
            <model-collection-select-form-item v-model:form="form" v-model:form-model="formModel"
                                             v-model:form-rules="formRules" :labelPosition="labelPosition"
                                             :form-item="formItem" :model-name="modelName"/>
          </template>
          <template v-else>
            <model-collection-form-item v-model:form="form" v-model:form-model="formModel"
                                        v-model:form-rules="formRules"
                                        :form-item="formItem" :model-name="modelName"/>
          </template>
        </template>
        <template v-else-if="formItem.genericTypes&&formItem.genericTypes[0].enumerated">
          <enum-collection-form-item v-model:form="form" v-model:form-model="formModel" v-model:form-rules="formRules"
                                     :form-item="formItem" :model-name="modelName"/>
        </template>

        <template v-else-if="formItem.genericTypes&&formItem.genericTypes[0].name==='String'">
          <text-collection-form-item v-model:form="form" v-model:form-model="formModel" v-model:form-rules="formRules"
                                     :form-item="formItem" :model-name="modelName"/>
        </template>
      </template>
      <template v-else-if="formItem.type.name==='DateTime'">
        <date-time-form-item v-model:form="form" v-model:form-model="formModel" v-model:form-rules="formRules"
                             :form-item="formItem" :model-name="modelName"/>
      </template>
      <template v-else-if="formItem.type.name==='Date'">
        <date-form-item v-model:form="form" v-model:form-model="formModel" v-model:form-rules="formRules"
                        :form-item="formItem" :model-name="modelName"/>
      </template>
      <template v-else-if="formItem.type.model">
        <template v-if="formItem.type.features.includes('Embeddable')">
          <embeddable-form-item v-model:form="form" v-model:form-model="formModel" v-model:form-rules="formRules"
                                :form-item="formItem" :model-name="modelName"/>
        </template>
        <template v-else-if="formItem.type.features.includes('Enumerable')">
          <model-select-form-item v-model:form="form" v-model:form-model="formModel" v-model:form-rules="formRules"
                                     :form-item="formItem" :model-name="modelName"/>
        </template>
        <template v-else>
          <model-table-form-item v-model:form="form" v-model:form-model="formModel" v-model:form-rules="formRules"
                           :form-item="formItem" :model-name="modelName" :auth="auth"/>
        </template>
      </template>
      <template v-else-if="formItem.type.number">
        <number-form-item v-model:form="form" v-model:form-model="formModel" v-model:form-rules="formRules"
                          :form-item="formItem" :model-name="modelName"/>
      </template>
      <template v-else-if="formItem.type.bool">
        <boolean-form-item v-model:form="form" v-model:form-model="formModel" v-model:form-rules="formRules"
                           :form-item="formItem" :model-name="modelName"/>
      </template>
      <template v-else-if="formItem.type.enumerated">
        <template v-if="formItem.parent">
          <enum-select-form-item v-model:form="form" v-model:form-model="formModel" v-model:form-rules="formRules"
                                 :form-item="formItem" :model-name="modelName"/>
        </template>
        <template v-else>
<!--          <enum-radio-form-item v-model:form="form" v-model:form-model="formModel" v-model:form-rules="formRules"-->
<!--                                :form-item="formItem" :model-name="modelName"/>-->
          <enum-select-form-item v-model:form="form" v-model:form-model="formModel" v-model:form-rules="formRules"
                                 :form-item="formItem" :model-name="modelName"/>
        </template>
      </template>
      <template v-else>
        <text-form-item v-model:form="form" v-model:form-model="formModel" v-model:form-rules="formRules"
                        :form-item="formItem" :model-name="modelName"/>
      </template>
    </template>
  </div>
</template>
<script lang="ts" setup>
import CustomizeFormItemStore from "@/views/admin/components/form/components/item/CustomizeFormItemStore.ts";
import {computed, defineModel, defineProps} from "vue";
import TextFormItem from "@/views/admin/components/form/components/item/TextFormItem.vue";
import BooleanFormItem from "@/views/admin/components/form/components/item/BooleanFormItem.vue";
import NumberFormItem from "@/views/admin/components/form/components/item/NumberFormItem.vue";
import ModelTableFormItem from "@/views/admin/components/form/components/item/ModelTableFormItem.vue";
import DateTimeFormItem from "@/views/admin/components/form/components/item/DateTimeFormItem.vue";
import DateFormItem from "@/views/admin/components/form/components/item/DateFormItem.vue";
import EnumCollectionFormItem from "@/views/admin/components/form/components/item/EnumCollectionFormItem.vue";
// import EmbeddableFormItem from "@/views/admin/components/form/components/item/EmbeddableFormItem.vue";
import TextCollectionFormItem from "@/views/admin/components/form/components/item/TextCollectionFormItem.vue";
import EmbeddableCollectionFormItem from "@/views/admin/components/form/components/item/EmbeddableCollectionFormItem.vue";
import EnumSelectFormItem from "@/views/admin/components/form/components/item/EnumSelectFormItem.vue";
// import EnumRadioFormItem from "@/views/admin/components/form/components/item/EnumRadioFormItem.vue";
import {FormInstance} from "element-plus";
// import ModelCollectionFormItem from "@/views/admin/components/form/components/item/ModelCollectionFormItem.vue";
import MapModelEmbeddableFormItem from "@/views/admin/components/form/components/item/MapModelEmbeddableFormItem.vue";
import MapModelNumberFormItem from "@/views/admin/components/form/components/item/MapModelNumberFormItem.vue";
import MapModelEnumFormItem from "@/views/admin/components/form/components/item/MapModelEnumFormItem.vue";
import MapModelBooleanFormItem from "@/views/admin/components/form/components/item/MapModelBooleanFormItem.vue";
import MapModelTextFormItem from "@/views/admin/components/form/components/item/MapModelTextFormItem.vue";
import MapFormItem from "@/views/admin/components/form/components/item/MapFormItem.vue";
import IconFormItem from "@/views/admin/components/form/components/item/name-item/IconFormItem.vue";
import AvatarFormItem from "@/views/admin/components/form/components/item/name-item/AvatarFormItem.vue";
import MapModelModelFormItem from "@/views/admin/components/form/components/item/MapModelModelFormItem.vue";
import FileFormItem from "@/views/admin/components/form/components/item/FileFormItem.vue";
import FileCollectionFormItem from "@/views/admin/components/form/components/item/FileCollectionFormItem.vue";
// import ModelCollectionSelectFormItem
//  from "@/views/admin/components/form/components/item/ModelCollectionSelectFormItem.vue";
import EmbeddableListFormItem from "@/views/admin/components/form/components/item/EmbeddableListFormItem.vue";
import ModelCollectionFormItem from "@/views/admin/components/form/components/item/ModelCollectionFormItem.vue";
import ModelSelectFormItem from "@/views/admin/components/form/components/item/ModelSelectFormItem.vue";
import ModelCollectionSelectFormItem
  from "@/views/admin/components/form/components/item/ModelCollectionSelectFormItem.vue";
import ColorFormItem from "@/views/admin/components/form/components/item/name-item/ColorFormItem.vue";
import EmbeddableFormItem from "@/views/admin/components/form/components/item/EmbeddableFormItem.vue";

const props=defineProps<{ modelName: string, formItem: th4.admin.ui.EditFormItem, parentFormItem?: th4.admin.ui.EditFormItem,auth?:string,labelWidth?:string,maxWidth?:boolean,labelPosition?:string }>()
const formModel = defineModel<any>('formModel', {required: true})
const formRules = defineModel<Record<string, any[]>>('formRules', {})
const form = defineModel<FormInstance>('form');
const itemWidth = computed(() => {
  if(props.maxWidth){
    return '100%'
  }
  if (props.formItem.lob) {
    return '100%'
  }
  if (props.formItem.type.model) {
    if (props.formItem.children && props.formItem.children.length == 1) {
      return '50%'
    }
    return '100%'
  }
  if (props.formItem.type.collection || props.formItem.type.map ||props.formItem.type.enumerated) {
    return '100%'
  }
  return '49%'
})
const labelWidth = computed(() => {
  return props.labelWidth? props.labelWidth : '200px'
})
</script>
<style lang="scss" scoped>
.basic-form-item {
  width: v-bind(itemWidth);
  :deep(.el-form-item__label,label) {
    font-family: 'PingFangHK-Regular', 'PingFang HK', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #333333;
    white-space: nowrap;
    text-transform: none;
    width: v-bind(labelWidth);
  }
}
</style>