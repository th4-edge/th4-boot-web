
<template>
  <div class="fashion-menu" @click="fireMenuClick" :class="{'fashion-menu-active':active}">
    <div class="icon">
      <x-icon v-if="menu.icon" :name="menu.icon"/>
      <template v-else>
        <el-icon><Grid /></el-icon>
      </template>
    </div>
    <div class="text">{{menu.name}}</div>
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
.fashion-menu-active{

  background-color: oklab(0.999994 0.0000455678 0.0000200868 / 0.2);
}
.fashion-menu{
  width: 100px;
  height: 100%;
  margin:0 10px;
  border-radius: 0;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  box-sizing: border-box;
  color: oklab(0.999994 0.0000455677 0.0000200868 / 0.8);
  cursor: pointer;
  .icon{
    width: 100%;
    height: calc(100% - 28px - 3px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }
  .text{
    width: 100%;
    height: 28px;
    font-weight: 500;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 20px;
    color: #FFFFFF;
  }
  &:hover{
    //border-bottom-width: 3px;
    background-color: oklab(0.999994 0.0000455678 0.0000200868 / 0.2);
  }
}

</style>