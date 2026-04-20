
<template>
  <div class="module-field-form-view">
    <el-form  class="drawer-form"
             label-position="top"
              :rules="formRules"
             ref="form" :model="moduleField" label-width="auto">
      <el-form-item label="分组" prop="group">
        <div class="input-item group-box">
          {{moduleField.group}}
        </div>
      </el-form-item>
      <el-form-item label="标识" prop="name">
        <template v-if="mode==Mode.Update" >
          <div class="input-item group-box">
            {{moduleField.name}}
          </div>
        </template>
        <template v-else>
          <el-input class="input-item" v-model="moduleField.name"></el-input>
        </template>
      </el-form-item>
      <el-form-item label="名称" prop="label">
        <el-input class="input-item" v-model="moduleField.label"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select
            v-model="moduleField.type"
            class="input-item"
            clearable
            value-key="key"
        >
          <el-option
              v-for="item in options"
              :key="item.key"
              :label="item.name"
              :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="必输">
        <el-switch v-model="moduleField.required"
                   active-text="是"
                   class="wl-switch"
                   inline-prompt
                   size="large"
                   width="42"></el-switch>
      </el-form-item>
      <el-form-item label="唯一标识" v-if="moduleField.required">
        <el-switch v-model="moduleField.unique"
                   active-text="是"
                   class="wl-switch"
                   inline-prompt
                   size="large"
                   width="42"></el-switch>
      </el-form-item>
      <el-form-item label="可编辑">
        <el-switch v-model="moduleField.editable"
                   active-text="是"
                   class="wl-switch"
                   inline-prompt
                   size="large"
                   width="42"></el-switch>
      </el-form-item>
      <el-form-item label="正则">
        <el-input class="input-item" v-model="moduleField.regex"></el-input>
      </el-form-item>
      <el-form-item label="提示">
        <el-input class="input-item" v-model="moduleField.tip"></el-input>
      </el-form-item>
      <div class="foot-view">
        <el-button @click="formReset">重置</el-button>
        <el-button icon="plus" type="primary" @click="formSubmit">保存</el-button>
      </div>
    </el-form>
  </div>
</template>
<script setup lang="ts">
enum Mode {
  Save,
  Update
}
import {onMounted, ref, watch} from "vue";
import {ElButton, ElForm, ElFormItem, ElOption, ElSelect, ElSwitch, FormInstance} from "element-plus";
import {modelEnums} from "@/store/th4/framework/service/api/API.ts";
defineProps<{mode:Mode}>()
const moduleField=defineModel<th4.admin.module.ModuleField>('moduleField',{required: true});
const form=ref<FormInstance>();
const formRules={
  group: [
    {required: true, message: '请输入字段分组', trigger: 'blur'},
  ],
  name: [
    {required: true, message: '请输入字段标识', trigger: 'blur'},
  ],
  label: [
    {required: true, message: '请输入字段描述', trigger: 'blur'},
  ],
}
const options=ref<th4.framework.Enumerated<string>[]>([]);
const emit=defineEmits<{'formSubmit': [any]}>();
const formReset=()=>{
  form.value?.resetFields();
  form.value?.clearValidate();
}
const formSubmit=()=>{
  form.value?.validate((success:boolean)=>{
    if(success) {
      emit('formSubmit',moduleField.value);
    }
  })
}
onMounted(()=>{
  modelEnums('module-class','fields.type').then(data=>{
    options.value=data;
  })
  formReset();
})

watch(()=>moduleField.value,()=>{
  formReset();
},{immediate:true})
</script>

<style scoped lang="scss">
.module-field-form-view{
  padding: 40px;
  box-sizing: border-box;
  .group-box{
    width: 100%;
    height: var(--el-component-size);
    border-radius: var(--el-border-radius-base);
    border: var(--el-border);
    padding: 2px 14px;
    box-sizing: border-box;
    color: var(--el-text-color-regular);
    &:hover{
      border-color: var(--el-color-primary);
    }
  }
  .foot-view{
    height: 56px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
  }
}
</style>