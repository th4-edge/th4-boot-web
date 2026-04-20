<template>
  <div class="basic-icon-select">
    <el-tabs tab-position="left">
      <el-tab-pane label="系统图标">
        <el-scrollbar style="height: 600px;">
          <div class="icon-picker">
            <template v-for="icon in globalProperties.$ElIcons" :key="icon">
              <div class="icon">
                <x-icon   :name="icon" :size="24"
                        @click="emit('select', icon)"/>
              </div>
            </template>

          </div>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="扩展图标">
        <el-scrollbar style="height: 600px;">
          <div class="icon-picker">
            <template v-for="icon in svgIcons" :key="icon">
              <div class="icon">
                <x-icon   :name="icon" :size="24"
                          @click="emit('select', icon)"/>
              </div>
            </template>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import {defineEmits, getCurrentInstance} from "vue";
import {ElScrollbar, ElTabPane, ElTabs} from "element-plus";
import XIcon from "@/views/admin/components/icon/XIcon.vue";

const svgIcons = Object.keys(import.meta.glob('/public/svg/*.svg')).map(fileName => fileName.split('.')[0].replace('/public/svg/', ''));
const {appContext: {app: {config: {globalProperties}}}} = getCurrentInstance()!;
const emit = defineEmits<{
  'select': [model: any]
}>();

</script>
<style lang="scss" scoped>
.basic-icon-select {
  width: 100%;
  height: 600px;

  .el-tabs {
    width: 100%;
    height: 100%;
  }

  .icon-picker {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .icon {
      box-sizing: content-box;
      width: 30px;
      height: 30px;
      color: var(--el-text-color-secondary);
      font-size: 14px;
      border-radius: 4px;
      cursor: pointer;
      text-align: center;
      line-height: 48px;
      padding: 5px;
      margin: 5px;
      border: 1px;
      .x-icon {
        padding: 5px;
      }
      &:hover {
        .x-icon {
          color: var(--el-color-primary);
          fill: var(--el-color-primary);
          border: 1px solid var(--el-color-primary);
          background-color: var(--el-border-color);
        }
      }
    }
  }
}
</style>