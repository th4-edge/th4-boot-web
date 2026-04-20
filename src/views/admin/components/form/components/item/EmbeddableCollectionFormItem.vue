<template>
  <div ref="embeddableCollectionFormItem" class="embeddable-collection-form-item">
    <el-form-item :label="formItem.label" :prop="props.formItem.property">
      <div class="embeddable-form-item-content">
        <template
            v-if="formModel[props.formItem.property]&&formModel[props.formItem.property].length>0&&props.formItem.children">

          <data-table-edit-view :data="formModel[props.formItem.property]" :table-columns="props.formItem.children"
                                @edit="fireEdit">
            <template #default>
              <el-button link icon="plus" @click="showDialog=true"></el-button>
            </template>
          </data-table-edit-view>

          <el-dialog v-if="showDialog"
                     v-model="showDialog"
                     :show-close="false"
                     append-to-body
                     class="model-select-dialog"
                     top="25vh"
                     width="60%"
          >
            <template #header>
              <title-header :title="'新增'+props.formItem.label"
                            style="padding-bottom: 20px;padding-top: 10px;height:50px"/>
            </template>
            <div style="display:flex; justify-content: center;align-items: center;">
            <embeddable-model-form v-if="props.formItem.children" v-model:form-model="itemValue"
                                   :form-item="props.formItem" style="width: 60%;"
                                   :form-items="props.formItem.children"
                                   :model-name="props.modelName"
                                   :label-position="labelPosition"
                                   label-width="140px"
                                   @form-submit="addItem"/>
            </div>

          </el-dialog>
          <el-dialog v-if="showEditDialog"
                     v-model="showEditDialog"
                     :show-close="false"
                     append-to-body
                     class="model-select-dialog"
                     top="25vh"
                     width="60%"
          >
            <template #header>
              <title-header :title="'编辑'+props.formItem.label"
                            style="padding-bottom: 20px;padding-top: 10px;height:50px"/>
            </template>
            <div style="display:flex; justify-content: center;align-items: center;">
              <embeddable-model-form v-if="props.formItem.children" style="width: 60%"
                                     v-model:form-model="formModel[props.formItem.property][editeIndex]"
                                     :form-item="props.formItem"
                                     :form-items="props.formItem.children"
                                     :model-name="props.modelName"
                                     :label-position="labelPosition"
                                     label-width="140px"
                                     @form-submit="editItem"/>
            </div>

          </el-dialog>
        </template>
        <template v-else>
          <template v-if="props.formItem.children&&props.formItem.children.length>0">
            <embeddable-model-form v-model:form-model="itemValue" :form-item="props.formItem"
                                   :form-items="props.formItem.children"
                                   :model-name="props.modelName" label-width="120px"
                                   @form-submit="addItem"/>
          </template>
        </template>
      </div>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
import {ElButton, ElDialog, ElFormItem} from "element-plus";
import {defineModel, defineProps, ref, toRaw} from "vue";
import TitleHeader from "@/views/admin/components/layout/classic/container/view/header/TitleHeader.vue";
import DataTableEditView from "@/views/admin/components/form/components/item/components/DataTableEditView.vue";
import EmbeddableModelForm from "@/views/admin/components/form/components/item/components/EmbeddableModelForm.vue";

const embeddableCollectionFormItem = ref<HTMLElement>();
const props = defineProps<{ modelName: string, formItem: th4.admin.ui.EditFormItem,labelPosition?:string }>()
const formModel = defineModel<Record<string, any>>('formModel', {required: true})
const itemValue = ref<any>({});
const showDialog = ref<boolean>(false)
const showEditDialog = ref<boolean>(false)
const editeIndex = ref<number>(0);

const addItem = () => {
  //验证必填项
  if (!formModel.value[props.formItem.property]) {
    formModel.value[props.formItem.property] = []
  }
  formModel.value[props.formItem.property].push({...toRaw(itemValue.value)})
  itemValue.value = {}
  showDialog.value = false
}

const fireEdit = (index: number) => {
  editeIndex.value = index
  showEditDialog.value = true
}
const editItem = () => {
  showEditDialog.value = false
}

</script>
<style lang="scss" scoped>
.embeddable-collection-form-item {
  width: 100%;

  .embeddable-form-item-content {
    width: 100%;
    background: inherit;
    //background-color: rgba(26, 107, 232, 0.0470588235294118);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: #E4E4E4;
    border-radius: 8px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;

    .data-table-edit-view {
      width: 100%;
      height: 280px;
    }


  }
}

</style>