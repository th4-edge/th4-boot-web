<template>
  <template v-if="map.value.type.number">
    <el-input v-model.number="data" size="default"></el-input>
  </template>
  <template v-else-if="map.value.type.bool">
    <el-switch v-model="data"
               active-text="是"
               class="wl-switch"
               inline-prompt
               size="large"
               width="42"></el-switch>
  </template>
  <template v-else-if="map.value.type.enumerated">

    <el-select
        v-model="data"
        class="input-item"
        clearable
        value-key="key"
    >
      <el-option
          v-for="item in options"
          :key="item.key"
          :label="item.name"
          :value="item"
      />
    </el-select>

  </template>
  <template v-else>

    <el-input v-model="data" size="default" type="text"></el-input>

  </template>
</template>
<script lang="ts" setup>
import {defineModel, defineProps, ref, watch} from "vue";
import {ElInput, ElOption, ElSelect, ElSwitch} from "element-plus";
import {modelEnums} from "@/store/th4/framework/service/api/API.ts";

const props = defineProps<{
  modelName: string,
  formItem: th4.admin.ui.EditFormItem,
  map: th4.admin.ui.MapProperty<th4.admin.ui.EditFormItem>
}>();
const data = defineModel<any>('data', {required: true})
const options = ref<{ name: string, value: any, key: string }[]>([])

const loadOptions = async (modelName: string, fieldName: string) => {
  return await modelEnums(modelName, fieldName);
}
watch(() => props.map.value, () => {
  loadOptions(props.modelName, props.formItem.property).then(data => {
    options.value = data;
  })
}, {immediate: true})
</script>
<style lang="scss" scoped>

</style>