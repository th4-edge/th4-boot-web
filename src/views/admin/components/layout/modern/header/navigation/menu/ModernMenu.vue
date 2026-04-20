
<template>
  <div class="modern-menu" @click="fireMenuClick" :class="{'modern-menu-active':active}">
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
.modern-menu-active{
  border-bottom-style: solid;
  border-bottom-color: #FFFFFF !important;
  background-color: rgba(0, 51, 204, 0.498039215686275);
}
.modern-menu{
  width: 100px;
  height: 100%;
  margin:0 10px;
  border-radius: 0;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-weight: 500;
  font-style: normal;
  border-bottom-width: 3px;
  box-sizing: border-box;
  border-bottom-style: solid;
  border-bottom-color: #2561EF;
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
  }
  &:hover{
    //border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottom-color: #FFFFFF;
    background-color: rgba(0, 51, 204, 0.498039215686275);
  }
}

</style>