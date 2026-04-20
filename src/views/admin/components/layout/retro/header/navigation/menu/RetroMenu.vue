

<template>
    <div class="retro-menu">
      <div class="menu-box" :class="{'active':active}" @click="fireMenuClick">
        <div class="icon">
          <x-icon :name="menu.icon"/>
        </div>
        <div class="text">{{menu.name}}</div>
      </div>
    </div>
</template>
<script setup lang="ts">
import XIcon from "@/views/admin/components/icon/XIcon.vue";
const props=defineProps<{menu:th4.admin.system.Menu,active?:boolean}>();
const emits=defineEmits<{'menuClick':[th4.admin.system.Menu]}>();
const fireMenuClick=()=>{
  emits('menuClick',props.menu)
}
</script>
<style scoped lang="scss">
.retro-menu{
  height: 100%;
  margin: 0 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  .active{
    .text{
      color: #0089FF !important;
    }
    color: #0089FF !important;
  }
  .menu-box{
    cursor: pointer;
    width: 100%;
    display: flex;
    .icon{
      font-size: 18px;
      width: 24px;
      height: 24px;
      box-sizing: border-box;
      background-position: center;
      background-size: cover;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .text{
      margin-left: 5px;
      font-size: 20px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0;
      font-variation-settings: "opsz" auto;
      /* 主色 0089FF */
      color: #4E5969;
    }
    &:hover{
      .text{
        color: #0089FF;
      }
      color: #0089FF !important;
    }
  }
}
</style>