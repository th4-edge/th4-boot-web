
<template>
  <div class="module-field-card-view">
    <div class="module-field-card-left">
      <div class="module-field-label-box">
        <div class="module-field-label">{{moduleField.label}}</div>
        <div class="module-field-required" v-if="moduleField.required">*</div>
        <div class="module-field-unique" v-if="moduleField.unique">
          <el-icon><Flag /></el-icon>
        </div>
      </div>
      <div class="module-field-tip-box">
        <div class="module-field-tip">{{moduleField.tip||'无说明'}}</div>
      </div>
      <div class="module-field-type-box">
        <div class="module-field-type">{{moduleField.type?.name}}</div>
      </div>
    </div>
    <div class="module-field-card-right">
      <div class="tool-box">
        <div class="icon-box" @click="$emit('edit', moduleField)">
          <el-icon><Edit /></el-icon>
        </div>
        <div class="icon-box remove" @click="$emit('delete', moduleField)">
          <el-icon><Delete /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{moduleField:any}>();
defineEmits<{'delete':[any],'edit':[any]}>()
</script>

<style scoped lang="scss">
.module-field-card-view{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  cursor: pointer;
  .module-field-card-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    .module-field-label-box {
      //width: 100%;
      display: flex;
      gap: 5px;

      .module-field-label {
        font-size: 16px;
        font-weight: 600;
        color: #1F2D3D;
      }

      .module-field-required {
        font-size: 16px;
        font-weight: 600;
        color: #FF4D4F;
      }
      .module-field-unique{
        display: flex;
        //align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 600;
        color: #FF4D4F;
      }
    }

    .module-field-tip-box {
      //width: 100%;
      height: 10px;

      .module-field-tip {
        font-size: 10px;
        color: #86909C;
      }
    }

    .module-field-type-box {
      //width: 100%;
      .module-field-type {
        font-size: 14px;
        color: #4E5969;
      }
    }
  }
  .module-field-card-right{
    .tool-box{
      display: flex;
      gap: 10px;
      .icon-box{
        width: 0;
        height: 0;
        overflow: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        border: 1px solid #e4e4e4;
        border-radius: 4px;
        transition: all .3s cubic-bezier(.645,.045,.355,1);
      }
      .remove{
        &:hover{
          color: #FF4D4F;
        }
      }
    }
  }
  &:hover{
    .module-field-card-right{
      .tool-box{
        .icon-box{
          width: 24px;
          height: 24px;
        }
      }
    }
  }
}
</style>