

<template>
  <div class="welcome">
    <span style="font-family:'AppleColorEmoji', 'Apple Color Emoji';font-weight:400;">
        👏

      </span>
    <span>
      {{greet}},
        {{name}}
    </span>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
defineProps<{
  name:string
}>()
const greet=ref<string>('');

const update=()=>{

  const now = new Date();
  const hours = now.getHours();
  if (hours >= 6 && hours < 12) {
    greet.value = '早上好';
  } else if (hours >= 12 && hours < 14) {
    greet.value = '中午好';
  } else if (hours >= 14 && hours < 18){
    // 可以根据需要添加更多时间段的判断，例如下午、晚上等
    greet.value = '下午好';
  }else if (hours >= 18 && hours < 23){
    // 可以根据需要添加更多时间段的判断，例如下午、晚上等
    greet.value = '晚上好';
  }else if (hours >= 23 || hours < 6){
    // 可以根据需要添加更多时间段的判断，例如下午、晚上等
    greet.value = '这么晚了，辛苦了';
  }
}
onMounted(()=>{
  update()
  setInterval(update,60*1000)
})
</script>
<style scoped lang="scss">
.welcome{
  font-weight: bold;
  font-size: 16px;
  font-weight: 800;
  padding:10px 10px;
}
</style>