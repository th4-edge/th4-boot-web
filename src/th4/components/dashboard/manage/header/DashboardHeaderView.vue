
<template>
  <div class="dashboard-header-view">
    <div class="title-box">
      <div class="correlate-title">{{title||'全部'}}</div>
      <div class="state-title" v-if="subTitle">
        /
      </div>
      <div class="state-title" v-if="subTitle">
        {{subTitle}}
      </div>
      <div class="state-title">
        ( {{totalElements||0}} )
      </div>
      <div class="star">
        <!-- <el-icon><Star /></el-icon> -->
      </div>
    </div>
    <div class="tool-box">
      <slot name="tool-box"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{title?:string,subTitle?:string,totalElements:number}>();
</script>
<style scoped lang="scss">
.dashboard-header-view{
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title-box{
    display: flex;
    align-items: center;
    .correlate-title{
      font-size: 16px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0;
      /* 主要文字 1F2D3D */
      color: #1F2D3D;
    }
    .state-title{
      margin-left: 8px;
      font-size: 16px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0;
      /* 提示文字 86909C */
      color: #86909C;
    }
    .star{
      margin-left: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      line-height: 20px;
      color: #FFA300;
    }
  }
  .tool-box{
    display: flex;
    align-items: center;
    gap: 20px;
    .text{
      height: 20px;
      font-size: 14px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0;
      /* 次要 4E5969 */
      color: #4E5969;
      display: flex;
      align-items: center;
      padding-right: 16px;
      box-sizing: border-box;
      border-right: 1px solid #E4E4E4;
    }
  }
}
</style>