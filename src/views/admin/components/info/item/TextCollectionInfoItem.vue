<template>
  <el-form-item :label="infoItem.label">
    <div class="text-info-item">
      <template v-if="modelValue">
        <!-- <template v-for="item in modelValue">
          <div class="content">{{ item }},</div>
        </template> -->
        <div
          v-for="(item, idx) in modelValue"
          :key="idx"
          class="list-item sub-text"
        >
          {{ item }}
          <span v-if="idx !== modelValue.length - 1" class="separator"></span>
        </div>
      </template>
    </div>
  </el-form-item>
</template>
<script lang="ts" setup>
import { ElFormItem } from 'element-plus'
import { computed, defineModel, defineProps } from 'vue'

const props = defineProps<{
  modelName: string
  infoItem: th4.admin.ui.InfoItem
}>()
const model = defineModel<Record<string, any>>('model', { required: true })

const modelValue = computed(() => {
  let value = model.value
  if (value) {
    const parents: th4.admin.ui.InfoItem[] = []
    let parent = props.infoItem.parent
    while (parent) {
      parents.push(parent)
      parent = parent.parent
    }
    if (parents.length > 0) {
      for (let item of parents.reverse()) {
        value = value[item.property]
        if (!value) {
          break
        }
      }
    }
  }
  return value ? value[props.infoItem.property] : undefined
})
</script>
<style lang="scss" scoped>
.text-info-item {
  display: flex;
  flex-wrap: wrap;

  .content {
    //font-size: 13px;
    ////color: #999;
    //border-bottom: 1px dashed #eee;
    //padding-right: 20px;
    //padding-left: 10px;
  }
  .list-item {
    display: flex;
    align-items: center;

    .separator {
      display: inline-block;
      width: 1px;
      height: 10px;
      background-color: #ccc;
      margin: 0 8px;
      margin-top: 3px;
    }
  }
}
</style>
