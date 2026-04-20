

<template>
  <template v-if="name in ElementPlusIconsVue">
    <el-icon  v-bind="$attrs" class="x-icon">
      <component :is="name" v-bind="$attrs"/>
    </el-icon>
  </template>
  <template v-else>
    <svg-icon class="x-icon" :name="name" v-bind="$attrs"/>
  </template>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import { ElIcon } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import SvgIcon from "./svg/SvgIcon.vue";
defineProps<{name: string,size?: number,color?: string}>();
</script>
<style scoped lang="scss">
.x-icon {
  display: inline-block;
}
</style>