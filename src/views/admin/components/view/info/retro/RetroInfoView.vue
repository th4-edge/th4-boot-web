

<template>
  <div class="retro-info-view">
    <div class="retro-info-header">
      <div class="header">
        <template v-if="$slots&&$slots['title']">
          <slot name="title" :model="model" :modelName="modelName"></slot>
        </template>
        <template v-else>
          <div class="title">
            {{model.name}}
          </div>
          <div class="status">
          </div>
        </template>
      </div>
      <div class="tool-bar">
        <div class="tool-box" @click="fireUpdate">
          <x-icon name="Edit"/>
          编辑
        </div>
        <div class="tool-box" @click="fireDelete">
          <x-icon name="Delete"/>
          删除
        </div>
      </div>
    </div>
    <div class="retro-info-container">
      <el-form
          label-position="left"
          label-suffix=":"
      >
        <embed-info-view :model-name="modelName" :model="model"/>
      </el-form>
    </div>
    <div class="retro-info-footer">

    </div>
  </div>
</template>
<script setup lang="ts">
import {defineProps} from "vue";
import EmbedInfoView from "@/views/admin/components/view/info/embed/EmbedInfoView.vue";
import XIcon from "@/views/admin/components/icon/XIcon.vue";

const props = defineProps<{
  modelName: string,
  ignoredFieldNames?: string,
  model: any,
  uri?: string,
  auth?: string,
  labelWidth?: string
}>();
const emit = defineEmits<{ 'fireUpdate':[any],'fireDelete':[any] }>()

const fireUpdate=()=>{
  emit('fireUpdate', props.model)
}
const fireDelete=()=>{
  emit('fireDelete', props.model)
}
</script>
<style scoped lang="scss">
.retro-info-view{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .retro-info-header{
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    box-sizing: border-box;
    /* 纯白 */
    background: #FFFFFF;
    .header{
      display: flex;
      align-items: center;
      .title{
        font-size: 20px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0;
        /* 主要文字 1F2D3D */
        color: #1F2D3D;
        margin-right: 8px;
      }
      .status{
      }
    }
    .tool-bar{
      display: flex;
      .tool-box{
        cursor: pointer;
        width: 70px;
        height: 36px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 10px;
        gap: 6px;
        margin-left: 8px;

        /* 背景色 */
        background: #F5F7FA;
        border-radius: 4px;
        box-sizing: border-box;
        /* 边框色 */
        border: 1px solid #E4E4E4;
        font-size: 14px;
        font-weight: 500;
        line-height: 14px;
        letter-spacing: 0em;

        font-variation-settings: "opsz" auto;
        /* 次要 4E5969 */
        color: #4E5969;
      }
    }
  }
  .retro-info-container{
    width: 100%;
    height: calc(100% - 80px - 20px);
    padding: 40px;
    box-sizing: border-box;
    :deep(.basic-info-item){
      width: 100%;
    }
    :deep(.el-form-item__label,label) {
      font-size: 14px;
      font-weight: normal;
      letter-spacing: 0;
      /* 次要 4E5969 */
      color: #4E5969;
      white-space: nowrap;
      text-transform: none;
      width: 84px;
    }
    :deep(.el-form-item__content) {
      font-size: 14px;
      font-weight: normal;
      letter-spacing: 0;
      /* 次要 4E5969 */
      color: #4E5969;
    }
  }
}
</style>