// components/Iconfont.vue
<template>
  <i class="iconfont" :class="name" :style="iconStyle" aria-hidden="true"></i>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { pxToRem } from '@th4/pxToRem'

interface Props {
  /** 图标名称（对应 iconfont 项目中的图标 class） */
  name: string
  /** 图标大小，支持数字单位px */
  size?: number
  /** 图标颜色 */
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  size: 16,
  color: 'inherit',
})

// 验证图标名称格式
// const isValidIconName = (name: string) => /^[a-zA-Z0-9_-]+$/.test(name)
// if (!isValidIconName(props.name)) {
//   console.warn(`Invalid icon name: ${props.name}`)
// }

const iconStyle = computed(() => {
  const style: Record<string, string> = {
    color: props.color,
    fontSize: `${pxToRem(props.size)}`,
  }
  return style
})
</script>

<style scoped>
.iconfont {
  display: inline-block;
  font-style: normal;
  line-height: 1;
  vertical-align: middle;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
