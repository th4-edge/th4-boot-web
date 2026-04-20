<template>
  <div class="classic-indicator">
    <div class="indicator-prefix">
      <div style="font-weight: bolder;padding-right: 5px;">当前位置:</div>
      <template v-if="menu">
        <div v-if="rootMenu" style="padding-right: 5px;">{{ rootMenu.name + ' > ' }}</div>
      </template>
      <div v-else-if="currentRoute" style="padding-right: 5px;">{{ currentRoute.meta['title'] }}</div>
    </div>
    <div v-if="menu" class="indicator-content">
      {{ menu?.name || '' }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed, defineProps} from "vue";
import {useRouter} from "vue-router";

defineProps<{ menu?: th4.admin.system.Menu, rootMenu?: th4.admin.system.Menu }>();
const router = useRouter();

const currentRoute = computed(() => router.currentRoute.value);

</script>
<style lang="scss" scoped>
.classic-indicator {
  margin-top: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: start;
  color: #999999;
  font-weight: 400;
  font-style: normal;
  font-size: 13px;

  .indicator-prefix {
    display: flex;
    align-items: center;
    justify-content: start;
  }

  .indicator-content {
    color: #333333;
  }
}
</style>