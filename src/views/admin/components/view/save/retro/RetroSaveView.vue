<template>
  <div class="retro-save-view">
    <div class="retro-save-header">
      <div class="icon">
        <x-icon name="PlusIcon" />
      </div>
      <div class="title">
        {{ title || '新增'.concat(modelClazz?.note || '') }}
      </div>
    </div>
    <div class="retro-save-container">
      <div class="retro-save-content">
        <basic-form
          :model-name="props.modelName"
          :style="{ width: $slots && $slots['preview'] ? '100%' : '50%' }"
          v-model:form="form"
          v-model:form-model="formModel"
          v-model:from-items="formItems"
          :auth="auth"
          label-position="top"
        />
      </div>
      <div v-if="$slots && $slots['preview']" class="retro-save-preview">
        <slot
          :form-model="formModel"
          :model-name="modelName"
          name="preview"
        ></slot>
      </div>
    </div>
    <div class="retro-save-footer">
      <el-button @click="formReset">取 消</el-button>
      <el-button type="primary" @click="formSubmit">
        创建{{ modelClazz?.note }}
      </el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import XIcon from '@/views/admin/components/icon/XIcon.vue'
import BasicForm from '@/views/admin/components/form/basic/BasicForm.vue'
import { defineEmits, defineProps, ref, watch } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import {
  modelBuild,
  modelSave
} from '@/store/th4/framework/service/api/API.ts'
import {
  uiModelFormSave,
  uiModelViewLayout
} from '@/store/th4/admin/ui/api/API.ts'

const props = defineProps<{
  title?: string
  modelName: string
  uri?: string
  note?: string
  auth?: string
  ignoredFieldNames?: string
  submitText?: string
  data?: Record<any, any>
  back?: Function
}>()
const emits = defineEmits<{ formSubmit: [any] }>()
const form = ref<FormInstance>()
const formModel = ref<any>({})
const formItems = ref<th4.admin.ui.EditFormItem[]>([])
const modelClazz = ref<th4.admin.ui.Clazz>()
let isValid = true
const isValidRegex = (regexStr: string) => {
  try {
    new RegExp(regexStr) // 尝试创建正则表达式对象
  } catch (e) {
    if (e instanceof SyntaxError) {
      isValid = false // 捕获到SyntaxError异常，说明正则表达式不合法
    }
  }
  return isValid
}
const formSubmit = () => {
  form.value?.validate((success: boolean) => {
    if (success) {      
      let _isValidRegex = true
      if (props.modelName === 'tag') {
        _isValidRegex = isValidRegex(formModel.value.regex)
      }
      if (_isValidRegex) {
        modelSave(props.modelName, formModel.value, props.uri, props.auth)
          .then((data: any) => {
            ElMessage({
              message:
                (props.submitText || '新增') +
                (props.note ? props.note : '信息') +
                '成功',
              type: 'success'
            })
            formReset()
            emits('formSubmit', data)
          })
          .catch((errorCode: th4.framework.ErrorCode) => {
            ElMessage({
              message:
                (props.submitText || '新增') +
                (props.note ? props.note : '信息') +
                '失败：' +
                errorCode.message,
              type: 'error'
            })
          })
      } else {
        ElMessage({
          message: '正则表达式不合法，请重新输入',
          type: 'error'
        })
      }
    }
  })
}
const formReset = () => {
  form.value?.resetFields()
  props.back && props.back()
}
watch(
  () => props.modelName,
  () => {
    uiModelViewLayout(props.modelName).then((clazz) => {
      modelClazz.value = clazz
    })
    modelBuild(props.modelName).then((model) => {
      formModel.value = { ...model, ...props.data }
    })
    uiModelFormSave(props.modelName, props.ignoredFieldNames).then((list) => {
      formItems.value = list
    })
  },
  { immediate: true }
)
</script>
<style lang="scss" scoped>
.retro-save-view {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #ffffff;
  .retro-save-header {
    height: 56px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px;
    border-width: 0 0 1px 0;
    border-style: solid;
    border-color: #e4e4e4;
    box-sizing: border-box;
    .icon {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #1f2d3d;
      margin-right: 8px;
    }
    .title {
      height: 16px;
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
      text-align: right;
      letter-spacing: 0;
      /* 重点 1F2D3D */
      color: #1f2d3d;
    }
    &:hover {
      .icon {
        color: #2561ef;
      }
    }
  }
  .retro-save-container {
    width: 100%;
    height: calc(100% - 56px - 66px);
    display: flex;
    box-sizing: border-box;
    .retro-save-content {
      flex: 1;
      height: 100%;
      padding: 20px;
      overflow: auto;
      border-width: 0 1px 0 0;
      border-style: solid;
      border-color: #e4e4e4;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
    }
    .retro-save-preview {
      flex: 2;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      overflow: auto;
    }
  }

  .retro-save-footer {
    height: 66px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 20px 20px 20px;
    box-sizing: border-box;
  }
}
</style>
