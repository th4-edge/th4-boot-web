
<template>
  <div class="title-card">
    <div class="title-card-container">
      <div class="title-card-header">
        <div class="title-card-header-box">
          <slot name="icon"/>
          <h3>{{title}}</h3>
        </div>

        <div class="tool-bar">
          <slot name="tool-bar"/>
        </div>
      </div>
      <div class="title-card-slot">
        <slot/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{title:string}>()
</script>

<style scoped lang="scss">
.title-card{
  box-sizing: border-box;
  background-image: linear-gradient(to right bottom, oklch(0.97 0.014 254.604) 0%, rgb(255, 255, 255) 50%, oklch(0.982 0.018 155.826) 100%);
  /* 收支趋势图表 */
  .title-card-container {
    //background-color: #ffffff;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    padding: 24px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    &:hover {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .title-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      .title-card-header-box{
        display: flex;
        align-items: center;
        gap: 6px;
        .icon{
          line-height: 24px;
        }
        h3 {
          font-size: 18px;
          line-height: 24px;
          font-weight: 500;
          color: #374151;
        }
      }

    }
    .title-card-slot {
      background-color: #f9fafb;
      background-image: linear-gradient(to right bottom, oklch(0.97 0.014 254.604) 0%, rgb(255, 255, 255) 50%, oklch(0.982 0.018 155.826) 100%);

      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6b7280;
      font-size: 14px;
      box-sizing: border-box;
      > *{
        width: 100%;
        height: 100%;
      }
    }
  }






}
</style>