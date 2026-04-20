<template>
  <div class="login-container w_h_100">
    <el-form ref="form" :model="loginFormModel" :rules="rules" @submit.native.prevent>
    <div class="login-box">
      <div class="login-box-logo">
        <div class="logo-image"></div>
      </div>
      <div class="login-box-title">
        <div class="title">
          登 录
        </div>
        <div class="desc">
          欢迎登录{{ setting.title }}
        </div>
      </div>
      <div class="login-box-form">
        <div class="el-form">
          <el-form-item prop="userName">
            <el-input v-model="loginFormModel.username" placeholder="请输入账号" type="text">
              <template #prefix>
                <el-icon>
                  <User/>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginFormModel.password" placeholder="请输入密码" type="password">
              <template #prefix>
                <el-icon>
                  <Lock/>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </div>
      </div>
      <div class="login-box-agreement">
        <div class="agreement">

          <div style="color:#C9C9C9;">
            <el-checkbox v-model="agreement" size="large"/>
            <span style="margin-left: 5px;">我已阅读并同意</span>
          </div>
          <div style="color:#2561EF;">《用户隐私政策》</div>
        </div>
      </div>
      <div class="login-box-btn">
        <el-button native-type="submit" auto-insert-space type="primary" @click="login">登 录</el-button>
      </div>
      <div class="login-box-other">
        <div class="other">
          忘记密码请联系管理人员
        </div>
      </div>
    </div>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import {
  ElButton,
  ElCheckbox,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElMessage,
  FormInstance,
  FormRules
} from 'element-plus'
import {reactive, ref} from "vue";
import {useRouter} from 'vue-router';
import {useTh4AdminSystem} from "@/store/th4/admin/system/system.ts";
import {setting} from "@/th4/setting.ts";

const agreement = ref(true);
const router = useRouter();
const adminStore = useTh4AdminSystem();
const form = ref<FormInstance>()
const loginFormModel = reactive({username: '', password: '',admin:''})
const rules: FormRules = {
  username: [{required: true, message: "请输入用户账号", trigger: "blur"}],
  password: [{required: true, message: "请输入用户密码", trigger: "blur"}]
};
const login = () => {
  form.value?.validate((valid) => {
    if (valid) {
      adminStore
          .login(loginFormModel)
          .then()
          .catch((e) => {
            ElMessage.error(e.message);
            console.log(e)
            loginFormModel.password = "";
          });
    }
  });
};
</script>
<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  background-image: url("/theme/classic/app/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  .login-box {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 440px;
    height: 600px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    border: none;
    border-radius: 16px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-sizing: border-box;
    box-shadow: none;

    .login-box-logo {
      width: 100%;
      height: 140px;
      box-sizing: border-box;
      padding-top: 46px;
      display: flex;
      justify-content: center;
      align-items: center;

      .logo-image {
        width: 88px;
        height: 88px;
        background-image: url('/theme/classic/login/logo.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      }
    }

    .login-box-title {
      width: 100%;
      height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .title {
        border-width: 0;
        width: 100%;
        height: 33px;
        font-family: 'PingFangSC-Medium', 'PingFang SC Medium', 'PingFang SC', serif;
        font-weight: 500;
        font-style: normal;
        font-size: 30px;
        text-align: center;
      }

      .desc {
        padding-top: 15px;
        border-width: 0;
        width: 100%;
        height: 37px;
        font-family: 'PingFangSC-Regular', 'PingFang SC', serif;
        font-weight: 400;
        font-style: normal;
        font-size: 16px;
        color: #999999;
        text-align: center;
      }
    }

    .login-box-form {
      margin-top: 30px;
      width: 100%;
      height: 120px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      :deep(.el-input__inner){
        height: 0;
        padding:20px 10px;
        background-clip: content-box;
      }
      :deep(.el-input__inner::first-line){
        color: var(--el-input-text-color);
      }
      .el-form {
        width: 335px;
        height: 100%;

        .el-input {
          margin-bottom: 12px;

        }
      }
    }

    .login-box-agreement {
      width: 100%;
      height: 30px;
      margin-top: 30px;
      font-family: 'PingFangSC-Regular', 'PingFang SC', serif;
      font-weight: 400;
      font-style: normal;
      font-size: 14px;
      color: #999999;
      display: flex;
      justify-content: center;
      align-items: center;

      .agreement {
        width: 335px;
        height: 44px;
        display: flex;
        justify-content: start;
        align-items: center;
        text-align: center;
      }
    }

    .login-box-btn {
      width: 100%;
      height: 50px;
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;

      .el-button {
        width: 335px;
        height: 100%;
        font-family: 'PingFangSC-Medium', 'PingFang SC Medium', 'PingFang SC', serif;
        font-size: 16px;
        box-shadow: 0px 5px 30px rgba(41, 132, 248, 0.298039215686275);
      }
    }

    .login-box-other {
      width: 100%;
      height: 15px;
      margin-top: 20px;
      font-family: 'PingFangSC-Regular', 'PingFang SC', serif;
      display: flex;
      justify-content: center;
      align-items: center;

      .other {
        width: 335px;
        height: 15px;
        font-size: 14px;
        text-align: center;
        font-weight: 400;
        font-style: normal;
        color: #CCCCCC;
      }
    }
  }
}
</style>