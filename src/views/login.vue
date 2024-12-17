<script setup>
import { reactive, ref } from "vue"
import owl from '@/components/login/Owl.vue'
import { login } from '@/api/index.js'
import {useTokenStore} from '@/stores/counter';
import { storeToRefs } from "pinia";
import router from "../router";
const tokenStore = useTokenStore()
const {token ,name,limits_of_authority} = storeToRefs(tokenStore)
/** 登录表单元素的引用 */
const loginFormRef = ref(null)

/** 登录按钮 Loading */
const loading = ref(false)

/** 登录表单数据 */
const loginFormData= reactive({
  username: "admin",
  password: "123456"
})
/** 登录表单校验规则 */
const loginFormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ]
}
/** 登录逻辑 */
const handleLogin = () => {
    loading.value = true
    login(loginFormData).then((res) => {
        token.value = res.token
        name.value = res.name
        limits_of_authority.value = res.limits_of_authority
        router.push('/')
    }).catch((err) => {
        console.log(err)
    }).finally((fly) => {
      loading.value = false
    })
}
</script>

<template>
  <div class="login-container">
    <owl />
    <div class="login-card">
      <div class="title">
        <span>Ding Kai </span>
        <span>Science And Technology</span>
      </div>
      <div class="content">
        <el-form ref="loginFormRef" :model="loginFormData" :rules="loginFormRules" @keyup.enter="handleLogin">
          <el-form-item prop="username">
            <el-input
              v-model.trim="loginFormData.username"
              placeholder="用户名"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="loginFormData.password"
              placeholder="密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
              @blur="handleBlur"
              @focus="handleFocus"
            />
          </el-form-item>
          <el-button :loading="loading" type="primary" size="large" @click.prevent="handleLogin">登 录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  // background-image: url("@/assets/img/login_bg.jpg");
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
 
  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }
  .login-card {
    width: 480px;
    max-width: 90%;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: var(--bg-color);
    overflow: hidden;
    .title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 150px;
      font-family: Rainbow Party;
      font-size: 32px;
      color: var(--text-color);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      padding: 20px 50px 50px 50px;
      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;
        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }
      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}

:deep(.el-input--large .el-input__wrapper){
  background-color: var(--bg-color);
}
:deep(.el-input--large .el-input__inner){
  color: var(--text-color);
}
</style>
