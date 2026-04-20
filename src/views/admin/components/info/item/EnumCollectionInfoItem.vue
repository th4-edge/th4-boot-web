<template>
  <el-form-item :label="infoItem.label">
    <div class="enum-info-item">
      <template v-if="modelValue">
        <template v-for="item in modelValue">
          <el-tag>{{ item ? item.name : '' }}{{ item ? infoItem.unit : '' }}</el-tag>
        </template>
      </template>

    </div>
  </el-form-item>
</template>
<script lang="ts" setup>
import {ElFormItem, ElTag} from 'element-plus'
import {computed, defineModel, defineProps} from 'vue';

const props = defineProps<{
  modelName: string,
  infoItem: th4.admin.ui.InfoItem
}>();
const model = defineModel<Record<string, any>>('model', {required: true})
const modelValue = computed(() => {
  let value = model.value;
  let parent = props.infoItem.parent;
  while (parent && value) {
    value = value[parent.property];
    parent = parent.parent;
  }
  return value ? value[props.infoItem.property] : undefined;
})

</script>
<style lang="scss" scoped>
.enum-info-item {
  display: flex;
  flex-wrap: wrap;

  .el-tag {
    margin: 5px;
  }
}
</style>