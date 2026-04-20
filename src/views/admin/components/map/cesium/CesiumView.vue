

<template>
  <div class="cesium-view" ref="cesiumContainer">
    <template v-if="map">
      <div class="cesium-map-slot">
        <slot :map="map"></slot>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref, shallowRef,defineExpose} from "vue";
import {CesiumMap} from "@/store/th4/map/cesium/CesiumMap.ts";
// import {ImageLayerShaderRender} from "@/store/th3/map/cesium/plugin/ImageLayerShaderRender.ts";

const cesiumContainer=ref<HTMLDivElement>()
const map=shallowRef<th4.map.Map>();
const props=defineProps<{mapOption?:th4.map.MapOption}>();
onMounted(()=>{
  if(cesiumContainer.value){
    map.value=new CesiumMap(cesiumContainer.value,props.mapOption||{})
    //new ImageLayerShaderRender([0,50,100]).install(map.value)
  }
})

defineExpose({
  map,
})
</script>
<style scoped lang="scss">
.cesium-view {
  width: 100%;
  height: 100%;
  position: relative;
  .cesium-map-slot {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    pointer-events: none;
  }
}
</style>