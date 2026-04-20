

<template>
  <div class="keyword-query">
    <el-input v-if="keywordPlaceholder" v-model="keyword"
              :placeholder="keywordPlaceholder"
              class="input-item"
              clearable
              prefix-icon="Search"
    />
  </div>
</template>
<script setup lang="ts">
import {ElInput} from "element-plus";
import {defineModel, defineProps, ref, watch} from 'vue';
import {uiModelQueryKeyword} from "@/store/th4/admin/ui/api/API.ts";

const props = defineProps<{ modelName: string ,keywordPlaceholder?:string}>();
const keyword = defineModel<string>('keyword', {required: true})
const keywordPlaceholder = ref(props.keywordPlaceholder);
const loadQueryKeyword = () => {
  uiModelQueryKeyword(props.modelName).then((placeholder: string) => {
    keywordPlaceholder.value = placeholder
  })
}

watch(() => props.modelName, () => {
  if(!keywordPlaceholder.value){
    loadQueryKeyword()
  }
}, {immediate: true})
</script>
<style scoped lang="scss">
.keyword-query{
  display: flex;
  align-items: center;
  .input-item {
    --el-input-width: 320px;
    --el-input-height: 36px;
    --el-input-border-radius: 4px;
    --el-input-focus-border-color: var(--el-color-primary);
  }
}

</style>