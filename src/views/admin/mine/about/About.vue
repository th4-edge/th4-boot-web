

<template>
  <classic-title-view title="关于系统">
    <div class="about-content">
      <div class="system-overview">
        <div class="system-box">
        <div class="system-name">{{setting.title}}</div>
        <div class="company-logo"></div>
        </div>
      </div>
      <div class="company-info">
          {{setting.copyright}} {{setting.version}}
      </div>
    </div>
  </classic-title-view>
</template>
<script setup lang="ts">
import {setting} from "@/th4/setting.ts";
import ClassicTitleView from "@/views/admin/components/layout/classic/container/view/ClassicTitleView.vue";
</script>
<style scoped lang="scss">
.about-content{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .system-overview{
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    .system-box{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .system-name{
        text-align: center;
        width: 420px;
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 50px;
      }
      .company-logo{
        width: 280px;
        height: 60px;
        background-image: url('/logo.svg');
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
      }
    }
  }
  .company-info{

    width: 100%;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;


  }
}
</style>