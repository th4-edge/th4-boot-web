<template>
  <cesium-view/>
</template>
<script setup lang="ts">
import {defineProps} from "vue";
import CesiumView from "@/views/admin/components/map/cesium/CesiumView.vue";
defineProps<{
  modelName:string
}>();
</script>
<style scoped lang="scss">

</style>