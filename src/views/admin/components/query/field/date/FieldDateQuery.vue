<template>
  <div class="field-date-query">
  <el-date-picker v-model="date"

                  placeholder="按日期筛选"
                  type="date"
                  value-format="YYYY-MM-DD"
  />
    </div>
</template>
<script lang="ts" setup>
import {defineModel, defineProps, ref, watch} from "vue";
import {ElDatePicker} from "element-plus";

const queryable = defineModel<Record<any, any>>('queryable', {required: true})
const props = defineProps<{
  modelName: string,
  propertyName: string,
  loadData: Function
}>()
const date = ref<string>()
watch(date, () => {
  if (date.value) {
    queryable.value[props.propertyName.concat('.dateEq')] = date.value?.replace(/-/g, "");
  } else {
    delete queryable.value[props.propertyName.concat('.dateEq')]
  }
  props.loadData();
})
</script>
<style lang="scss" scoped>
.field-date-query {
  display:flex;
  align-items:center;
  justify-content:center;
  :deep(.el-input){
    width: 260px;
    --el-component-size: 33px;
    --el-border-radius-base: 8px;
    --el-input-focus-border-color: var(--el-color-primary);
  }
}
</style>