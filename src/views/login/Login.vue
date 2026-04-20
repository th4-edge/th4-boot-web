<template>
  <div class="login-container">
    <div class="left-section">
      <div class="left-bg-decoration">
        <div class="bg-blur top-blur"></div>
        <div class="bg-blur bottom-blur"></div>
      </div>
      <div class="left-content">
        <div class="logo-section">
          <div class="logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="house-icon">
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
          </div>
          <div class="logo-text">
            <h1 class="system-name">家装信任营销CRM</h1>
            <p class="system-subtitle">Trust-Based Marketing System</p>
          </div>
        </div>
        <div class="main-content">
          <h2 class="main-title">专业家装企业<br>全流程营销管理系统</h2>
          <p class="main-description">从客户获取到施工交付，全链路数字化管理<br>提升转化率，降低管理成本，实现业绩倍增</p>
        </div>
      </div>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon users-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3 class="feature-title">信任递进营销</h3>
          <p class="feature-description">L1-L5五阶客户培育</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon dollar-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
              <line x1="12" x2="12" y1="2" y2="22"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <h3 class="feature-title">智能报价系统</h3>
          <p class="feature-description">一键生成专业报价单</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon wrench-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
          </div>
          <h3 class="feature-title">施工进度管控</h3>
          <p class="feature-description">实时跟踪施工节点</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon chart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
              <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
              <path d="M18 17V9"></path>
              <path d="M13 17V5"></path>
              <path d="M8 17v-3"></path>
            </svg>
          </div>
          <h3 class="feature-title">账务财务管理</h3>
          <p class="feature-description">全流程资金监控</p>
        </div>
      </div>
      <div class="stats-section">
        <div class="stat-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stat-icon check-icon">
            <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
            <path d="m9 11 3 3L22 4"></path>
          </svg>
          <span class="stat-text">已服务 1200+ 家装企业</span>
        </div>
        <div class="stat-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stat-icon trend-icon">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
            <polyline points="16 7 22 7 22 13"></polyline>
          </svg>
          <span class="stat-text">平均提升转化率 35%</span>
        </div>
      </div>
    </div>
    <div class="right-section">
      <div class="login-form-container">
        <div class="login-card">
          <div class="login-header">
            <h2 class="login-title">欢迎登录</h2>
            <p class="login-subtitle">请输入您的账号密码</p>
          </div>
          <el-form ref="form" :model="loginFormModel" class="login-form" @submit.prevent="login" :ruless="rules">
            <div class="form-group">
              <label class="form-label">账号</label>
              <input type="text" v-model="loginFormModel.username" placeholder="请输入账号" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label">密码</label>
              <input type="password" v-model="loginFormModel.password" placeholder="请输入密码" class="form-input" required>
            </div>
            <div class="form-options">
              <label class="remember-me">
                <input type="checkbox" v-model="agreement" class="checkbox">
                <span class="remember-text">记住密码</span>
              </label>
              <a href="#" class="forgot-password">忘记密码？</a>
            </div>
            <button type="submit" class="login-button" :disabled="!loginFormModel.username || !loginFormModel.password">登录系统</button>
          </el-form>
          <div class="third-party-login">
            <div class="third-party-title">快速登录</div>
            <div class="third-party-buttons">
              <button class="third-party-button wechat">
                <div class="third-party-icon wechat-icon">微</div>
                <span class="third-party-text">微信</span>
              </button>
              <button class="third-party-button dingtalk">
                <div class="third-party-icon dingtalk-icon">钉</div>
                <span class="third-party-text">钉钉</span>
              </button>
              <button class="third-party-button qywx">
                <div class="third-party-icon qywx-icon">企</div>
                <span class="third-party-text">企微</span>
              </button>
            </div>
          </div>
          <div class="register-section">
            还没有账号？<a href="#" class="register-link">立即申请试用</a>
          </div>
        </div>
        <p class="footer-text">登录即代表同意《用户协议》和《隐私政策》</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import {useRouter} from "vue-router";
import {useTh4AdminSystem} from "@/store/th4/admin/system/system.ts";
import {ElForm, ElMessage, FormInstance, FormRules} from "element-plus";

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
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 动画定义 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes colorChange {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

/* 主容器 */
.login-container {
  min-height: 100vh;

  background-image: linear-gradient(to right bottom, oklch(0.97 0.014 254.604) 0%, rgb(255, 255, 255) 50%, oklch(0.982 0.018 155.826) 100%);
  display: flex;
  animation: fadeIn 0.8s ease-out forwards;
  opacity: 0;
}

/* 左侧信息区域 */
.left-section {
  display: none;
  width: 50%;

  background: linear-gradient(to right bottom, oklch(0.546 0.245 262.881) 0%, oklch(0.488 0.243 264.376) 50%, oklch(0.627 0.194 149.214) 100%);
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  animation: fadeInLeft 1s ease-out 0.2s forwards;
  opacity: 0;
}

/* 左侧背景装饰 */
.left-bg-decoration {
  position: absolute;
  inset: 0;
  opacity: 0.1;
}

.bg-blur {
  position: absolute;
  background: white;
  border-radius: 50%;
  filter: blur(120px);
}

.top-blur {
  top: 80px;
  left: 80px;
  width: 256px;
  height: 256px;
}

.bottom-blur {
  bottom: 80px;
  right: 80px;
  width: 384px;
  height: 384px;
}

/* 左侧内容 */
.left-content {
  position: relative;
  z-index: 10;
}

/* Logo 部分 */
.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 64px;
}

.logo {
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  animation: float 3s ease-in-out infinite;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.logo:hover {
  transform: rotate(10deg) scale(1.1);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%);
}

.house-icon {
  width: 28px;
  height: 28px;
  color: #2563eb;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.system-name {
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.system-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

/* 主要内容 */
.main-content {
  margin-bottom: 48px;
}

.main-title {
  font-size: 36px;
  font-weight: bold;
  color: white;
  margin-bottom: 16px;
  line-height: 1.2;
}

.main-description {
  font-size: 18px;
  color: oklch(0.932 0.032 255.585);
  line-height: 1.5;
}

/* 功能特点网格 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 48px;
  position: relative;
  z-index: 10;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.feature-card:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 15px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: rgba(255, 255, 255, 0.3);
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.6s ease;
}

.feature-card:hover::before {
  left: 100%;
}

.feature-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.feature-card:hover .feature-icon {
  transform: rotate(15deg) scale(1.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.feature-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.feature-card:hover .feature-icon::before {
  left: 100%;
}

.users-icon {
  background: rgb(6, 182, 212);
}

.dollar-icon {
  background: rgb(16, 185, 129);
}

.wrench-icon {
  background: rgb(245, 158, 11);
}

.chart-icon {
  background: rgb(139, 92, 246);
}

.icon {
  width: 20px;
  height: 20px;
  color: white;
}

.feature-title {
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
  transition: all 0.3s ease;
  transform: translateY(0);
  opacity: 1;
}

.feature-card:hover .feature-title {
  transform: translateY(-3px);
  opacity: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.feature-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease 0.1s;
  transform: translateY(0);
  opacity: 1;
}

.feature-card:hover .feature-description {
  transform: translateY(-2px);
  opacity: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* 统计信息 */
.stats-section {
  display: flex;
  align-items: center;
  gap: 32px;
  position: relative;
  z-index: 10;
  animation: slideInUp 1s ease-out 0.8s forwards;
  opacity: 0;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  transform: translateY(0);
}

.stat-item:hover {
  transform: translateY(-3px);
  color: white;
}

.stat-icon {
  width: 16px;
  height: 16px;
  color: white;
  transition: all 0.3s ease;
}

.stat-item:hover .stat-icon {
  transform: rotate(15deg) scale(1.2);
  color: white;
}

.stat-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.stat-item:hover .stat-text {
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* 右侧登录区域 */
.right-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  animation: fadeInRight 1s ease-out 0.4s forwards;
  opacity: 0;
}

.login-form-container {
  width: 100%;
  max-width: 400px;
}

.login-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 32px;
  border: 1px solid #f3f4f6;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-title {
  font-size: 24px;
  font-weight: bold;
  color: #111827;
  margin-bottom: 8px;
}

.login-subtitle {
  font-size: 16px;
  color: #6b7280;
}

/* 登录表单 */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  outline: none;
  transition: all 0.3s ease;
  font-size: 16px;
  position: relative;
  background: white;
}

.form-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

.form-input::placeholder {
  color: #9ca3af;
  transition: color 0.3s ease;
}

.form-input:focus::placeholder {
  color: #d1d5db;
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  accent-color: #3b82f6;
  transition: all 0.3s ease;
  cursor: pointer;
}

.checkbox:hover {
  border-color: #93c5fd;
}

.checkbox:checked {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.remember-text {
  color: #6b7280;
}

.forgot-password {
  color: #3b82f6;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  padding: 2px 0;
}

.forgot-password:hover {
  color: #2563eb;
}

.forgot-password::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #2563eb;
  transition: width 0.3s ease;
}

.forgot-password:hover::after {
  width: 100%;
}

.login-button {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  background: linear-gradient(to right, oklch(0.546 0.245 262.881) 0%, oklch(0.627 0.194 149.214) 100%);
  color: white;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.login-button:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.login-button:active {
  transform: translateY(0);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.login-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.login-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
  z-index: -1;
}

.login-button:hover::before {
  left: 100%;
}

/* 第三方登录 */
.third-party-login {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #f3f4f6;
}

.third-party-title {
  text-align: center;
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
}

.third-party-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.third-party-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.third-party-button:hover {
  background: #f9fafb;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-color: #d1d5db;
}

.third-party-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.05), transparent);
  transition: left 0.5s ease;
}

.third-party-button:hover::before {
  left: 100%;
}

.third-party-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.wechat-icon {
  background: #10b981;
}

.dingtalk-icon {
  background: #3b82f6;
}

.qywx-icon {
  background: #ef4444;
}

.third-party-text {
  font-size: 14px;
  color: #4b5563;
}

/* 注册链接 */
.register-section {
  margin-top: 24px;
  text-align: center;
  font-size: 14px;
  color: #6b7280;
}

.register-link {
  color: #3b82f6;
  font-weight: 500;
  text-decoration: none;
  margin-left: 4px;
  transition: all 0.3s ease;
  position: relative;
  padding: 2px 0;
}

.register-link:hover {
  color: #2563eb;
}

.register-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #2563eb;
  transition: width 0.3s ease;
}

.register-link:hover::after {
  width: 100%;
}

/* 页脚文本 */
.footer-text {
  text-align: center;
  font-size: 12px;
  color: #9ca3af;
  margin-top: 24px;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .left-section {
    display: none;
  }
  
  .right-section {
    flex: 1;
  }
}

@media (min-width: 1024px) {
  .left-section {
    display: flex;
  }
}
</style>