

<template>
  <div class="route-container" style="width: 100%;height: 100%">
    <template v-for="(slot) in slots.default()" v-if="slots.default">
      <component :is="slot" v-if="slot.props?.key===active">
      </component>
    </template>
  </div>
</template>
<script setup lang="ts">
import {defineModel, useSlots} from 'vue'

const active = defineModel<string>('active')
const slots = useSlots()

</script>
<style scoped lang="scss">
.route-container{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>