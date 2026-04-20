<template>
  <div class="classic-title-view">
    <title-header ref="titleHeader" :title="title">
      <slot name="action-bar"/>
    </title-header>
    <div ref="classicViewContent" class="classic-view-content">
      <slot class="classic-view-slot"/>
    </div>

  </div>
</template>
<script lang="ts" setup>
import {computed, defineProps, ref} from "vue";
import TitleHeader from "@/views/admin/components/layout/classic/container/view/header/TitleHeader.vue";


const titleHeader = ref<InstanceType<typeof TitleHeader>>();
const classicViewContent = ref<HTMLDivElement>();
const props = defineProps<{ title: string, backgroundColor?: string }>();


const bgColor = computed(() => {
  return props.backgroundColor || "#FFFFFF";
});

</script>
<style lang="scss" scoped>
.classic-title-view {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: v-bind(bgColor);
  .title-header{
   max-height: 60px;
  }
  //display: flex;
  //flex-direction: column;
  //padding: v-bind(padding);
  border-radius: 8px;
  .classic-view-content {
    //flex: 1;
    width: 100%;
    height: calc(100% - 60px);
    box-sizing: border-box;
    overflow: auto;
    .classic-view-slot {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }
  }
}
</style>