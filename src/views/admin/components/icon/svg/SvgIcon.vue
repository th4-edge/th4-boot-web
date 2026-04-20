<template>
  <span class="svg-icon" role="img">
      <svg aria-hidden="true" class="svg">
        <use :xlink:href="'#icon-'+name"></use>
      </svg>
  </span>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
defineProps<{name: string,color?: string,size?: number}>();
</script>
<style scoped lang="scss">
.svg-icon{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  .svg{
    /* 将宽高设置成1em后，svg图片就会根据父级的font-size属性来改变大小 */
    width: 1em;
    height: 1em;
    /* 将svg 的fill 属性设置成currentColor后，就会根据父级的color属性来改变颜色*/
    fill: currentColor;
  }
}

</style>