<template>
  <div class="map-form-item">
    <el-form-item :label="props.formItem.label" :prop="props.formItem.property">
      <div class="map-content">
        <div class="action-form-save" @click="dialogVisible=true">
          <el-icon class="el-icon" size="14">
            <Plus/>
          </el-icon>
          添加{{ props.formItem.label }}
        </div>
        <div v-if="props.formItem.map" class="map-container">
          <el-table :data="tableData" border stripe>
            <el-table-column label="序号" type="index" width="80"/>
            <el-table-column :label="props.formItem.map.key.clazz.note" prop="key" width="240"/>
            <el-table-column :label="props.formItem.map.value.clazz.note" prop="value" width="360"/>
            <el-table-column label="操作">
              <template #default="{row}">
                <el-icon @click="handleDeleteMap(row.key)">
                  <Delete/>
                </el-icon>
              </template>
            </el-table-column>
            <template #empty>
              <el-empty :description="'暂无'.concat(props.formItem.label)"/>
            </template>
          </el-table>
        </div>
      </div>
      <el-dialog
          v-model="dialogVisible"
          :show-close="false"
          top="25vh"
          width="40%">
        <template #header>
          <title-header :title="'添加'+props.formItem.label"
                        style="padding-bottom: 20px;padding-top: 10px;height:50px"/>
        </template>
        <div v-if="props.formItem.map" class="dialog-content">
          <el-form ref="mapForm" :model="mapFormItem" :rules="rules" class="form" label-width="150px">
            <el-form-item :label="props.formItem.map.key.clazz.note" prop="key">
              <el-input v-model="mapFormItem.key" class="input-item" :placeholder="'请输入'+props.formItem.map.key.clazz.note"/>
            </el-form-item>
            <el-form-item :label="props.formItem.map.value.clazz.note" prop="value" style="margin-top: 20px">
              <el-input v-model="mapFormItem.value" class="input-item" :placeholder="'请输入'+props.formItem.map.value.clazz.note"/>
            </el-form-item>
          </el-form>
          <div class="dialog-footer">
            <el-button icon="finished" type="primary" @click="handleAddMap">添加{{ props.formItem.label }}</el-button>
            <el-button @click="dialogVisible=false">取消</el-button>
          </div>
        </div>
      </el-dialog>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
import {computed, defineModel, defineProps, ref} from "vue";
import {
  ElButton,
  ElDialog,
  ElEmpty,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElTable,
  ElTableColumn,
  FormInstance
} from "element-plus";
import TitleHeader from "@/views/admin/components/layout/classic/container/view/header/TitleHeader.vue";

const props = defineProps<{ modelName: string, formItem: th4.admin.ui.EditFormItem }>()
const formModel = defineModel<Record<string, any>>('formModel', {required: true})
const dialogVisible = ref<boolean>(false)
const tableData = computed(() => Object.entries(formModel.value[props.formItem.property]||[]).map(([key, value]) => ({key, value})));
const mapForm = ref<FormInstance>();
const mapFormItem = ref<{ key: any, value: any }>({key: undefined, value: undefined});
const rules = ref({
  'key': [
    {required: true, message: '请输入' + props.formItem.map?.key.clazz.note, trigger: 'blur'},
    {
      validator: (_rule: any, value: any, callback: any) => {
        if (formModel.value[props.formItem.property] && formModel.value[props.formItem.property][value]) {
          callback('已存在相同的'.concat(props.formItem.map?.key.clazz.note || ''))
        } else {
          callback()
        }
      }, trigger: 'blur'
    }
  ],
  'value': [
    {required: true, message: '请输入' + props.formItem.map?.value.clazz.note, trigger: 'blur'},
  ],
})
const handleAddMap = () => {
  mapForm.value?.validate().then(() => {
    if (!formModel.value[props.formItem.property]) {
      formModel.value[props.formItem.property] = {}
    }
    formModel.value[props.formItem.property][mapFormItem.value.key] = mapFormItem.value.value
    dialogVisible.value = false
    mapFormItem.value = {key: undefined, value: undefined}
  })
}
const handleDeleteMap = (key: any) => {
  delete formModel.value[props.formItem.property][key]
}
</script>
<style lang="scss" scoped>
.map-form-item {
  .map-content {
    box-sizing: border-box;

    .action-form-save {
      font-size: 14px;
      font-weight: 500;
      color: var(--el-color-primary);
      padding: 2px 10px;
      box-sizing: border-box;
      height: 40px;
      display: flex;
      align-items: center;
      cursor: pointer;
      border-radius: 4px;

      .el-icon {
        width: 14px;
        height: 14px;
        font-size: 14px;
        font-weight: 500;
      }
    }

    .map-container {
      width: 960px;
      height: 480px;
      background: inherit;
      background-color: rgba(26, 107, 232, 0.0470588235294118);
      box-sizing: border-box;
      border-width: 1px;
      border-style: solid;
      border-color: rgba(242, 242, 242, 1);
      border-radius: 8px;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      padding: 20px;

      .el-table {
        width: 100%;
        height: 100%;
      }
    }
  }

  :deep(.dialog-content) {
    width: 100%;
    height: 240px;
  }

  :deep(.dialog-footer) {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    margin-right: 40px;
  }

  :deep(.form) {
    padding: 20px;
  }

  :deep(.input-item) {
    width: 320px;
    --el-component-size: 36px;
    --el-border-radius-base: 8px;
    --el-input-focus-border-color: var(--el-color-primary);
  }
}

</style>