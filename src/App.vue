<template>
  <el-config-provider :locale="zh_cn">
  <div class="app">
    <router-view v-slot="{ Component }">
      <component :is="Component"  />
    </router-view>
  </div>
  </el-config-provider>
</template>
<script lang="ts" setup>
import {ElConfigProvider} from "element-plus";
// @ts-expect-error
import zh_cn from "element-plus/dist/locale/zh-cn.mjs";
import { onMounted, onUnmounted } from 'vue';

const disableSwipeBack = () => {
  document.addEventListener('touchmove', preventDefault, { passive: false });
  document.addEventListener('touchstart', preventDefault, { passive: false });
};

const enableSwipeBack = () => {
  document.removeEventListener('touchmove', preventDefault);
  document.removeEventListener('touchstart', preventDefault);
};

const preventDefault = (e:any) => {
  e.preventDefault();
};

onMounted(() => {
  disableSwipeBack();
});

onUnmounted(() => {
  enableSwipeBack();
});

</script>
<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  position: relative;
  box-sizing: border-box;
  background-size: 100vw 100vh;
  //background-position: center;
  //background: radial-gradient(50% 50% at 50% 50%, #0B333D 0%, #0C2126 100%);;
  //background-image: url("/theme/classic/app/img.png");
  z-index: 999;
}
</style>
