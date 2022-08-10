<script setup lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userStore } from '../../store/modules/user'

const router = useRouter()

const accountData = reactive({
  name: '',
  password: '',
})
const phoneData = reactive({
  phoneNum: undefined,
  verifyCode: undefined,
})
const activeTabName = ref('first')
const isRemember = ref(true)

const loginRules = {
  name: [{ required: true, message: '请输入账号', trigger: 'change' }],
  password: [{ required: true, message: '请输入密码', trigger: 'change' }],
}
const loginAction = async () => {
  const result = await userStore().login()
  result.isSuccess() && router.push('/')
}
</script>

<template>
  <div class="login">
    <transition enter-active-class="animate__ animate__backInDown">
      <div class="login-panel">
        <div class="title">
          <h1>系统登录</h1>
        </div>
        <el-form :model="accountData" :rules="loginRules">
          <el-tabs v-model="activeTabName" stretch>
            <el-tab-pane label="账号密码登录" name="first">
              <el-form-item prop="name">
                <el-input v-model="accountData.name" />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="accountData.password"
                  show-password
                />
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="手机验证登录" name="second">
              <el-form-item prop="name">
                <el-input
                  v-model="phoneData.phoneNum"
                  placeholder="请输入您的手机号"
                />
              </el-form-item>
              <el-form-item prop="password">
                <div class="verify-code">
                  <el-input
                    v-model="phoneData.verifyCode"
                    placeholder="请输入您的验证码"
                    maxlength="6"
                    show-word-limit
                    show-password
                  />
                  <el-button>获取验证码</el-button>
                </div>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
          <div class="operation">
            <el-checkbox v-model="isRemember">
              记住我
            </el-checkbox><el-link type="primary">
              忘记密码?
            </el-link>
          </div>
          <el-form-item>
            <el-button class="login-btn" type="primary" @click="loginAction">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  width: 100%;
  height: 100%;
  // background: url('../../assets/img/login-bg.png');
  background-size: cover;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .login-panel {
    width: 320px;
    padding: 20px;
    margin-bottom: 50px;
    text-align: center;
    background-color: #fff;

    .title {
      p {
        font-size: 12px;
        color: #999;
      }
    }

    .verify-code {
      display: flex;

      .el-button {
        margin-left: 10px;
      }
    }

    .operation {
      display: flex;
      justify-content: space-between;
    }

    .login-btn {
      width: 100%;
      margin-top: 15px;
    }
  }
}
</style>
