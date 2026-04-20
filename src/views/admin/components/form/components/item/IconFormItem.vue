<template>
  <el-form-item :label="props.formItem.label" :prop="buildProps(props.formItem)">
    <div class="icon-container input-item" @click="dialogVisible = true">
      <x-icon v-if="formModel[props.formItem.property]" :name="formModel[props.formItem.property]" :size="18"
              style="margin-right: 5px"/>
      {{ formModel[props.formItem.property] }}
      <div v-if="formModel[props.formItem.property]" class="close"
           @click.stop="formModel[props.formItem.property]=undefined">
        <el-icon>
          <CircleClose/>
        </el-icon>
      </div>
    </div>
    <el-dialog
        v-model="dialogVisible"
        :show-close="false"
        append-to-body
        class="model-select-dialog"
        top="15vh"
        width="60%"
    >
      <template #header>
        <title-header :title="'选择'+props.formItem.label" style="padding-bottom: 20px;padding-top: 10px;height:50px"/>
      </template>
      <basic-icon-select @select="handleSelect"/>
    </el-dialog>
  </el-form-item>
</template>
<script lang="ts" setup>
import {ElDialog, ElFormItem, ElIcon} from 'element-plus';
import {defineModel, defineProps, ref} from 'vue';
import TitleHeader from "@/views/admin/components/layout/classic/container/view/header/TitleHeader.vue";
import XIcon from "@/views/admin/components/icon/XIcon.vue";


const props = defineProps<{ modelName: string, formItem: th4.admin.ui.EditFormItem }>()
const formModel = defineModel<Record<string, any>>('formModel', {required: true})
const dialogVisible = ref<boolean>(false)
const buildProps = (formItem: th4.admin.ui.EditFormItem) => {
  let prop = formItem.property;
  let parent = formItem.parent;
  while (parent) {
    prop = parent.property + '.' + prop;
    parent = parent.parent
  }
  return prop;
}
const handleSelect = (icon: string) => {
  formModel.value[props.formItem.property] = icon
  dialogVisible.value = false
}
</script>
<style lang="scss" scoped>
.input-item{
  --el-component-size: 36px;
  --el-border-radius-base: 8px;
  --el-input-focus-border-color: var(--el-color-primary);
}
.icon-container {
  width: 280px;
  height: 34px;
  align-items: center;
  background-color: var(--el-input-bg-color, var(--el-fill-color-blank));
  background-image: none;
  border-radius: var(--el-border-radius-base);
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
  cursor: pointer;
  display: inline-flex;
  justify-content: start;
  padding: 1px 12px;
  transform: translateZ(0);
  transition: var(--el-transition-box-shadow);
  color: var(--el-text-color-regular);
  line-height: 32px;

  &:hover {
    box-shadow: 0 0 0 1px var(--el-color-primary) inset;
  }

  .close {
    width: 34px;
    height: 34px;
    position: absolute;
    right: 10px;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--el-text-color-secondary);
    transition: var(--el-transition-color);

    &:hover {
      color: var(--el-color-primary);
    }
  }

  .icon {
    width: 34px;
    height: 34px;
    position: absolute;
    right: 10px;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--el-text-color-regular);
  }
}


</style>