<template>
  <el-form-item :label="infoItem.label"
                :prop="infoItem.parent?infoItem.parent.property+'.'+infoItem.property:infoItem.property">
    <div class="file-info-item">
      {{ modelValue }}
    </div>
  </el-form-item>
</template>
<script lang="ts" setup>
import {ElFormItem} from 'element-plus'
import {computed, defineModel, defineProps} from 'vue';

const props = defineProps<{
  modelName: string,
  infoItem: th4.admin.ui.InfoItem
}>();
const model = defineModel<Record<string, any>>('model', {required: true})

const modelValue = computed(() => {
  let value = model.value;
  if (value) {
    const parents: th4.admin.ui.InfoItem[] = [];
    let parent = props.infoItem.parent;
    while (parent) {
      parents.push(parent);
      parent = parent.parent;
    }
    if (parents.length > 0) {
      for (let item of parents.reverse()) {
        value = value[item.property];
        if (!value) {
          break;
        }
      }
    }
  }
  return value ? value[props.infoItem.property] : undefined;
})

</script>
<style lang="scss" scoped>
.file-info-item {
  &:hover{
    color: var(--el-color-primary);
  }
}
</style>