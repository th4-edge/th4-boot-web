

<template>
  <div class="nav-group-card">
      <div class="group-card-content" v-if="!menu.children">
        <div class="menu-item"  @click="fireMenuClick(menu)">
          <x-icon :name="menu.icon"/>
          <div class="text">
            {{menu.name}}
          </div>
        </div>
      </div>
      <div class="group-card-content" v-else>
        <template v-if="menu.children.length>0">
          <template v-for="item in menu.children">
            <div class="menu-item" :class="{'active':menu?.name==item.name}" @click="fireMenuClick(item)">
              <x-icon :name="item.icon"/>
              <div class="text">
                {{item.name}}
              </div>
            </div>
          </template>
        </template>
      </div>
  </div>
</template>
<script setup lang="ts">
import XIcon from "@/views/admin/components/icon/XIcon.vue";
defineProps<{menu:th4.admin.system.Menu}>()
const emits=defineEmits<{'menu-click':[th4.admin.system.Menu]}>();
const fireMenuClick=(menu:th4.admin.system.Menu)=>{
  emits('menu-click',menu)
}
</script>
<style scoped lang="scss">
.nav-group-card{
  width: 100%;
  .group-card-header{
    font-size: 16px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0;
    font-variation-settings: "opsz" auto;
    /* 主要文字 1F2D3D */
    color: #1F2D3D;
  }
  .group-card-content{

    .active{
      background: #F5F7FA;
    }
    .menu-item{
      cursor: pointer;
      width: 100%;
      height: 40px;
      margin-bottom: 2px;
      display: flex;
      align-items: center;
      color: #86909C;
      padding-left: 8px;
      font-size: 16px;
      .text{
        margin-left: 12px;
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
        letter-spacing: 0;
        font-variation-settings: "opsz" auto;
        /* 次要 4E5969 */
        color: #4E5969;
      }
      &:hover{
        background: #F5F7FA;
      }
    }
  }
}
</style>