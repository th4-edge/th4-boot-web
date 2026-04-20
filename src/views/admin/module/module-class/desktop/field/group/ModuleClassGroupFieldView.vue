

<template>
  <div class="module-class-group-field-view">
    <div class="module-class-field-group">
      <div class="module-class-field-group-icon" @click="collapse = !collapse">
        <el-icon :class="{'rotate': collapse&&!groupEditable}"><ArrowLeft /></el-icon>
      </div>
      <div class="module-class-field-group-title" @click="collapse = !collapse">
        <template v-if="groupEditable">
          <el-input @blur="fireUpdateGroup" v-model="moduleClass.groups[index]" placeholder="请输入分组名称" @click.stop></el-input>
        </template>
        <template v-else>
          {{moduleClass.groups[index]}}
        </template>
      </div>
      <div class="module-class-field-group-edit" v-if="!groupEditable" @click="fireEditableClick">
        <el-icon><Edit /></el-icon>
      </div>
      <div class="module-class-field-group-delete" v-if="index != 0 && !groupEditable && !moduleClass.fields.filter(moduleField => moduleField.group == group).length" @click="fireDeleteGroup(group)">
        <el-icon><Delete /></el-icon>
      </div>
    </div>
    <div class="module-class-field-group-content">
      <template v-if="moduleClass.fields">
<!--        <template v-for="(moduleField,index) in moduleClass.fields">-->
        <draggable v-model="moduleClass.fields"
          class="module-class-field-group-content-draggable"
                   item-key="name"
                   @end="fireDragEnd"
        >
          <template #item="{element,index}">
            <template v-if="element.group==group">
              <module-field-card-view :module-field="element"
                                      :style="{'transition-delay': (20*index)+'ms'}"
                                      :class="{'collapse-form-item':collapse}"
                                      class="field-item"
                                      @edit="fireModuleFieldEdit"
                                      @delete="fireModuleFieldDelete"
              />
            </template>
          </template>
        </draggable>
<!--        </template>-->
      </template>
      <div class="module-class-field-add-box field-item"
           :style="{'transition-delay': (20*(moduleClass.fields?moduleClass.fields.length:1))+'ms'}"
           :class="{'collapse-form-item':collapse}" @click="fireModuleFieldAdd">
        <div class="icon-box">
          <el-icon><Plus /></el-icon>
        </div>
        <div class="text-box">
          添加字段
        </div>
      </div>
    </div>
    <el-drawer v-model="drawerVisible" size="40%">
      <module-field-form-view v-if="moduleField" v-model:module-field="moduleField" :mode="drawerMode" @formSubmit="fireFormSubmit"/>
    </el-drawer>
  </div>

</template>
<script setup lang="ts">
import {ref} from "vue";
import {modelCreate, modelUpdate} from "@/store/th4/framework/service/api/API.ts";
import {ElMessage,ElMessageBox} from "element-plus";
import ModuleFieldFormView from "@/views/admin/module/module-class/desktop/field/form/ModuleFieldFormView.vue";
import ModuleFieldCardView from "@/views/admin/module/module-class/desktop/field/card/ModuleFieldCardView.vue";
import draggable from 'vuedraggable';
enum Mode {
  Save,
  Update
}
const props=defineProps<{index:number,group:string}>()
const moduleClass=defineModel<th4.admin.module.ModuleClass>('moduleClass',{required:true});
const collapse=ref<boolean>(false);
const original=ref<string>();
const groupEditable=ref<boolean>(false);
const drawerVisible=ref<boolean>(false);
const drawerMode=ref<Mode>(Mode.Save)
let moduleField=ref<any>();
const fireModuleFieldAdd=()=>{
  moduleField=ref<any>();
  drawerMode.value=Mode.Save;
  drawerVisible.value=true;
  modelCreate('module-class','fields').then(data=>{
    moduleField.value=data;
    moduleField.value.group=moduleClass.value.groups[props.index]
  })
}
const fireModuleFieldEdit=(item:any)=>{
  moduleField=ref<any>();
  drawerMode.value=Mode.Update;
  drawerVisible.value=true;
  moduleField.value=item;
}
const fireModuleFieldDelete=(moduleField:any)=>{
  ElMessageBox.confirm('确定要删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    moduleClass.value.fields.splice(moduleClass.value.fields.findIndex(item=>item.name==moduleField.name),1);
    modelUpdate('module-class',{clzId:moduleClass.value.clzId,fields:moduleClass.value.fields}).then(()=>{
    })
  }).catch(() => {
  });

}
const fireFormSubmit=(moduleField:any)=>{

  if(drawerMode.value==Mode.Save){
    if(!moduleClass.value.fields){
      moduleClass.value.fields=[];
    }
    if(moduleClass.value.fields.some(field=>field.name==moduleField.name)){
      ElMessage.error('字段标识重复,请确认字段标识的唯一性。');
    }else {
      moduleClass.value.fields.push(moduleField);
      modelUpdate('module-class', {clzId: moduleClass.value.clzId, fields: moduleClass.value.fields}).then(() => {
        drawerVisible.value = false;
      })
    }
  }else if(drawerMode.value==Mode.Update){
    modelUpdate('module-class', {clzId: moduleClass.value.clzId, fields: moduleClass.value.fields}).then(() => {
      drawerVisible.value = false;
    })
  }
}
const fireDeleteGroup=(group:string)=>{
  moduleClass.value.groups.splice(moduleClass.value.groups.findIndex(item=>item==group),1);
  modelUpdate('module-class',{clzId:moduleClass.value.clzId,groups:moduleClass.value.groups}).then(()=>{
  })
}
const fireEditableClick=()=>{
  original.value=props.group;
  groupEditable.value=true
  collapse.value=false
}
const fireUpdateGroup=()=>{
  if(!props.group){
    ElMessage.warning('分组名称不能为空')
    if(original.value){
      moduleClass.value.groups[props.index]=original.value
    }
  }else{
    if(moduleClass.value.fields){
      moduleClass.value.fields.forEach(field=>{
        if(field.group==original.value){
          field.group=props.group
        }
      })
    }
    modelUpdate('module-class',{clzId:moduleClass.value.clzId,groups:moduleClass.value.groups,fields:moduleClass.value.fields}).then(()=>{
    })
    groupEditable.value=false;
  }
}
const fireDragEnd=()=>{
  modelUpdate('module-class',{clzId:moduleClass.value.clzId,fields:moduleClass.value.fields}).then(()=>{
  })
}
</script>
<style scoped lang="scss">
.module-class-group-field-view{
  width: 100%;
  .module-class-field-group{
    height: 56px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    line-height: 16px;
    cursor: pointer;
    .rotate {
      transform: rotate(-90deg);
    }
    .module-class-field-group-icon{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-icon{
        transition: transform .3s ease;
      }
    }
    .module-class-field-group-title{
      font-weight: 600;
      .el-input{
        --el-component-size: 32px !important;
        --el-border-radius-base: 4px !important;
      }
    }
    .module-class-field-group-edit{
      display: none;
    }
    .module-class-field-group-delete{
      display: none;
      color: #FF4D4F;
    }
    &:hover{
      color: var(--el-color-primary);
      .module-class-field-group-edit{
        display: flex;
      }
      .module-class-field-group-delete{
        display: flex;
      }
    }
  }
  .module-class-field-group-content{
    width: 100%;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    box-sizing: border-box;
    .module-class-field-group-content-draggable {
      overflow: auto;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    .collapse-form-item {
      flex: 0 !important;
      height: 0 !important;
      font-size: 0;
      padding: 0;
    }
    .field-item {
      width: 320px;
      height: 120px;
      background: #F5F7FA;
      border-radius: 8px;
      transition: all 0.3s ease-in-out;
      box-sizing: border-box;
      overflow: auto;

      &:hover {
        background: #E9E9E9;
        color: var(--el-color-primary);
        font-weight: 600;
      }
    }
    .module-class-field-add-box {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      line-height: 16px;
      gap: 10px;
      cursor: pointer;
      color: #1F2D3D;
      border: 1px dashed #1F2D3D;
      background: none;
      &:hover {
        background: #E9E9E9;
      }
      .icon-box {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
.drawer-form{
  padding: 20px;
  box-sizing: border-box;
}
</style>