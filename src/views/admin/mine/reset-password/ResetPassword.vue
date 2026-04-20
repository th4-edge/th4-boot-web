<template>
  <classic-title-view title="重置密码">
    <template #action-bar>
      <el-button background icon="back" round size="small" @click="router.go(-1)"></el-button>
    </template>
    <div class="form-container">
      <el-form ref="form" :model="formModel" :rules="rules" label-width="200px">
        <el-form-item label="原密码" prop="password">
          <el-input v-model="formModel.password" class="input-item" placeholder="请输入新密码"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="formModel.newPassword" class="input-item" placeholder="请输入新密码"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="formModel.confirmPassword" class="input-item" placeholder="请确认密码"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 40px;">
          <el-button icon="finished" type="primary" @click="handleSubmit">修改密码</el-button>
          <el-button icon="RefreshLeft" @click="handleReset">重置信息</el-button>
        </el-form-item>
      </el-form>
    </div>
  </classic-title-view>
</template>
<script lang="ts" setup>
import {ElButton, ElForm, ElFormItem, ElInput} from "element-plus";
import {useRouter} from "vue-router";
import {reactive, ref} from "vue";
import {Md5} from "ts-md5/dist/esm/md5";
import {useTh4AdminSystem} from "@/store/th4/admin/system/system.ts";
import ClassicTitleView from "@/views/admin/components/layout/classic/container/view/ClassicTitleView.vue";
const systemAdminStore=useTh4AdminSystem();
const router = useRouter();
const form = ref<InstanceType<typeof ElForm>>();
const formModel = reactive({
  password: '',
  newPassword: '',
  confirmPassword: ''
})
const rules = {
  password: [
    {required: true, message: '请输入新密码', trigger: 'blur'},
    {min: 6, max: 16, message: '密码长度在 6 到 16 个字符', trigger: 'blur'}
  ],
  newPassword: [
    {required: true, message: '请输入新密码', trigger: 'blur'},
    {min: 6, max: 16, message: '密码长度在 6 到 16 个字符', trigger: 'blur'}
  ],
  confirmPassword: [
    {required: true, message: '请确认密码', trigger: 'blur'},
    {min: 6, max: 16, message: '密码长度在 6 到 16 个字符', trigger: 'blur'},
    {
      validator: (_rule: any, value: string, callback: (error?: Error) => void) => {
        if (value !== formModel.newPassword) {
          callback(new Error('两次输入的密码不一致!'));
        } else {
          callback();
        }
      }, trigger: 'blur'
    }
  ]
}
const handleSubmit = () => {
  Md5.hashStr(formModel.password)

  systemAdminStore.resetPassword(Md5.hashStr(formModel.password), Md5.hashStr(formModel.newPassword),Md5.hashStr(formModel.confirmPassword)).then(() => {
    router.push('/login');
  })
}
const handleReset = () => {
  form.value?.resetFields();
}
</script>
<style lang="scss" scoped>
.form-container {
  max-width: 600px;
  padding-top: 40px;

  .input-item {
    --el-component-size: 36px;
    --el-border-radius-base: 8px;
    --el-input-focus-border-color: rgba(24, 119, 242, 1);
  }
}
</style>