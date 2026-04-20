<template>
  <div class="classic-route-view">
    <template v-for="(slot) in slots.default()" v-if="slots.default">
      <component :is="slot" v-if="slot.props?.key===active" class="classic-route-view-content"/>
    </template>
    <!--    <slot :v-show="false" class="classic-route-view-slot"></slot>-->
    <!--    <component :="$attrs"  :is="slotComponents[active]" v-if="active&&slotComponents[active]" class="classic-route-view-content"></component>-->
  </div>
</template>
<script lang="ts" setup>
import {defineModel, useSlots} from 'vue'

const active = defineModel<string>('active')
const slots = useSlots()


</script>
<style lang="scss" scoped>
.classic-route-view {
  width: 100%;
  height: 100%;

  .classic-route-view-content {
    width: 100%;
    height: 100%;
  }
}
</style>