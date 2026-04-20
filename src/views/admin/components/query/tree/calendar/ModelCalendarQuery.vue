<script setup lang="ts">

</script>

<template>
  <div class="model-calendar-query">
    <div class="calendar-container">
      <el-calendar>
        <template #dateCell="{ data }">
          <p>{{ data.day.split('-').slice(-1)[0] }}</p>
        </template>
      </el-calendar>
    </div>
  </div>
</template>

<style scoped lang="scss">
.model-calendar-query{
  width: 280px;
  height: 100%;
  margin-right: 20px;
  border-right: 1px solid rgb(242, 242, 242);
  border-top: 1px solid rgb(242, 242, 242);
  box-sizing: border-box;
  font-size: 12px;
  .calendar-container{
    width: 100%;
    height: 200px;
    background-color: #E4B47C;
    box-sizing: border-box;
  }
}
</style>