<template>
  <div class="module-class-title-view">
    <div class="module-class-title-left">

      <div class="icon-box" @click="iconDialogVisible=true">
        <template v-if="moduleClass.icon">
          <el-badge value="自定义" class="icon-dot" type="warning">
          <x-icon :name="moduleClass.icon"/>
          </el-badge>
        </template>
        <template v-else>
          <el-badge value="自定义" class="icon-dot" type="warning">
            <el-icon>
              <Odometer/>
            </el-icon>
          </el-badge>
        </template>
      </div>

      <div class="name-box">
        <div class="name-label">分组</div>
        <div class="name-value-box">
          <div class="name-value">
            <template v-if="typeEditable">
              <el-select
                  v-model="moduleClass.type"
                  class="input-item"
                  value-key="typeId"
                  @change="fireUpdateType"
                  @blur="fireUpdateType"
              >
                <el-option
                    v-for="moduleType in moduleTypes"
                    :key="moduleType.typeId"
                    :label="moduleType.name"
                    :value="moduleType"
                />
              </el-select>
            </template>
            <template v-else>
              {{ moduleClass.type.name }}
            </template>
          </div>
          <div class="name-icon" v-if="!typeEditable" @click.stop="typeEditable=true">
            <el-icon>
              <EditPen/>
            </el-icon>
          </div>
        </div>
      </div>
      <div class="primary-box">
        <div class="primary-label">标识</div>
        <div class="primary-value">{{ moduleClass.code }}</div>
      </div>
      <div class="name-box">
        <div class="name-label">名称</div>
        <div class="name-value-box">
          <div class="name-value">
            <template v-if="nameEditable">
              <el-input @blur="fireUpdateName" v-model="moduleClass.name" placeholder="请输入名称"></el-input>
            </template>
            <template v-else>
              {{ moduleClass.name }}
            </template>
          </div>
          <div class="name-icon" v-if="!nameEditable" @click.stop="nameEditable=true">
            <el-icon>
              <EditPen/>
            </el-icon>
          </div>
        </div>
      </div>
      <div class="instance-box">
        <div class="instance-label">实例数量</div>
        <div class="instance-value-box">
          <div class="instance-value">
            {{ instanceCount }}
          </div>
          <div class="instance-icon">
            <el-icon>
              <Link/>
            </el-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="module-class-title-right">
      <template v-if="moduleClass.status.key=='Enable'">
        <div class="tool-box" @click.stop="fireUpdateStatus({key:'Disable'})">
          <div class="tool-box-icon">
            <el-icon><TurnOff /></el-icon>
          </div>
          <div class="tool-box-text">
            停用
          </div>
        </div>
      </template>
      <template v-if="moduleClass.status.key=='Disable'">
        <div class="tool-box" @click.stop="fireUpdateStatus({key:'Enable'})">
          <div class="tool-box-icon">
            <el-icon><Open /></el-icon>
          </div>
          <div class="tool-box-text">
            启用
          </div>
        </div>
      </template>
      <div class="tool-box delete" @click.stop="()=>$emit('delete', moduleClass)">
        <div class="tool-box-icon">
          <el-icon><Delete /></el-icon>
        </div>
        <div class="tool-box-text">
          删除
        </div>
      </div>
    </div>
    <el-dialog
        v-model="iconDialogVisible"
        :show-close="false"
        append-to-body
        class="model-select-dialog"
        top="15vh"
        width="60%"
    >
      <template #header>
        <title-header :title="'选择'" style="padding-bottom: 20px;padding-top: 10px;height:50px"/>
      </template>
      <x-icon-select @select="handleSelect"/>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import XIcon from "@/views/admin/components/icon/XIcon.vue";
import {ref, watch} from "vue";
import {ElDialog, ElMessage, ElOption, ElSelect} from "element-plus";
import {modelList, modelUpdate} from "@/store/th4/framework/service/api/API.ts";
import TitleHeader from "@/views/admin/components/layout/classic/container/view/header/TitleHeader.vue";
import XIconSelect from "@/views/admin/components/select/icon/XIconSelect.vue";

const moduleClass=defineModel<th4.admin.module.ModuleClass>('moduleClass',{required:true})
const nameEditable = ref<boolean>(false);
const typeEditable = ref<boolean>(false);
const instanceCount = ref<number>(0);
const iconDialogVisible=ref<boolean>(false);
const moduleTypes=ref<th4.admin.module.ModuleType[]>([]);
defineEmits<{'delete':[any]}>();
const handleSelect = (icon: string) => {
  moduleClass.value.icon = icon
  iconDialogVisible.value = false
}
const fireUpdateName=()=>{
  if(moduleClass.value.name.trim().length==0){
    ElMessage.warning('名称不能为空')
  }else{
    modelUpdate('module-class',{clzId:moduleClass.value.clzId,name:moduleClass.value.name}).then(()=>{
    })
    nameEditable.value=false;
  }
}
const fireUpdateType=()=>{
  if(!moduleClass.value.type){
    ElMessage.warning('类型不能为空')
  }else{
    modelUpdate('module-class',{clzId:moduleClass.value.clzId,type:moduleClass.value.type}).then(()=>{
    })
    typeEditable.value=false;
  }
}
const fireUpdateStatus=(status:any)=>{
  modelUpdate('module-class',{clzId:moduleClass.value.clzId,status:status}).then(()=>{
      moduleClass.value.status=status;
  })
}
watch(()=>moduleClass.value,()=>{
  if(moduleClass.value){
    //modelCount('')
  }
},{immediate:true})
watch(()=>typeEditable.value,()=>{
  if(typeEditable.value){
    modelList('module-type').then(data=>{
      moduleTypes.value=data;
    })
  }
})
</script>
<style lang="scss" scoped>
.module-class-title-view {
  width: 100%;
  height: 120px;
  background: rgba(24, 144, 255, 0.08);
  border: 1px solid rgba(229, 231, 235);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  box-sizing: border-box;
  .module-class-title-left {
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 40px;
    box-sizing: border-box;
    .icon-box {
      width: 80px;
      height: 80px;
      margin-right: 40px;
      cursor: pointer;
      border-radius: 50%;
      background: rgba(24, 144, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      border: 1px solid rgba(229, 231, 235);
      .icon-dot{
        .el-badge__content{
          top: -10px;
          left: 30px;
        }
      }
    }
    .primary-box {
      height: 100%;
      padding-top: 40px;
      box-sizing: border-box;
      min-width: 160px;
      display: flex;
      flex-direction: column;
      font-size: 16px;
      gap: 10px;

      .primary-label {
        color: #1F2D3D;
        font-weight: 600;
      }
      .primary-value {
        font-size: 14px;
        color: #4E5969;
      }
    }
    .name-box {
      height: 100%;
      padding-top: 40px;
      box-sizing: border-box;
      min-width: 160px;
      display: flex;
      flex-direction: column;
      font-size: 16px;
      gap: 10px;
      .name-label {
        display: flex;
        align-items: center;
        color: #1F2D3D;
        font-weight: 600;
      }
      .name-value-box {
        display: flex;
        gap: 10px;
        font-size: 14px;
        .name-value {
          color: #4E5969;
          display: flex;
          align-items: center;
          .el-input {
            width: 140px;
            --el-component-size: 32px !important;
            --el-border-radius-base: 4px !important;
          }
          :deep(.el-select__wrapper){
            width: 140px;
            height: 32px;
          }
        }
        .name-icon {
          display: flex;
          align-items: center;
          color: #4E5969;
          cursor: pointer;
          font-size: 12px;
          &:hover {
            color: #409EFF;
          }
        }
      }
    }
    .instance-box {
      height: 100%;
      padding-top: 40px;
      box-sizing: border-box;
      min-width: 140px;
      display: flex;
      flex-direction: column;
      font-size: 16px;
      gap: 10px;
      .instance-label {
        color: #1F2D3D;
        font-weight: 600;
      }
      .instance-value-box {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: flex-start;
        font-size: 14px;
        .instance-value {
          display: flex;
          align-items: center;
          color: var(--el-color-primary);
        }
        .instance-icon {
          color: #4E5969;
          cursor: pointer;
          display: flex;
          align-items: center;
          &:hover {
            color: #409EFF;
          }
        }
      }
    }
  }
  .module-class-title-right{
    display: flex;
    align-items: center;
    gap: 20px;
    .tool-box{
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #1F2D3D;
      .tool-box-icon{
        display: flex;
        align-items: center;
        font-size: 16px;
      }
      .tool-box-text{
        display: flex;
        align-items: center;
        font-size: 16px;
      }
    }
    .delete{
      &:hover{
        color: #FF4D4F;
      }
    }
  }
}
</style>