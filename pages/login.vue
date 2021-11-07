<template>
  <div class="main">
    <a-form
      id="formLogin"
      ref="formLogin"
      class="user-layout-login"
      :form="form"
      @submit="handleSubmit"
    >
      <a-tabs
        :active-key="tabActive"
        :tab-bar-style="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="changeTab"
      >
        <a-tab-pane key="tab1" :tab="'Credentials'">
          <a-alert
            v-if="isLoginError"
            type="error"
            show-icon
            style="margin-bottom: 24px;"
            :message="'Tên đăng nhập hoặc mật khẩu không đúng'"
          />
          <a-form-item>
            <a-input
              v-decorator="[
                'username',
                {rules: [{ required: true, message: 'username is required' }], validateTrigger: 'change'}]"
              size="large"
              type="text"
              :placeholder="'Username'"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input-password
              v-decorator="[
                'password',
                {rules: [{ required: true, message: 'Password is require' }], validateTrigger: 'blur'}
              ]"
              size="large"
              :placeholder="'Password'"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input-password>
          </a-form-item>
        </a-tab-pane>

        <a-tab-pane key="tab2" :tab="'Mobile number'">
          <a-form-item>
            <a-input v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: 'Phone number is require'}], validateTrigger: 'change'}]" size="large" type="text" :placeholder="'Phone number'">
              <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input v-decorator="['captcha', {rules: [{ required: true, message: 'verification code is require' }], validateTrigger: 'blur'}]" size="large" type="text" :placeholder="'verification code'">
                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                tabindex="-1"
                :disabled="true"
                @click.stop.prevent="getCaptcha"
                v-text="'Get Code'"
              />
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">
          Remember me
        </a-checkbox>
        <router-link
          :to="{ name: 'recover', params: { user: 'aaa'} }"
          class="forge-password"
          style="float: right;"
        >
          Forgot your password?
        </router-link>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          html-type="submit"
          class="login-button"
          :loading="isLoaddingLogin"
          :disabled="isLoaddingLogin"
        >
          Login
        </a-button>
      </a-form-item>

      <div class="user-login-other">
        <span>Sign in with</span>
        <a>
          <a-icon class="item-icon" type="facebook" theme="filled" />
        </a>
        <a>
          <a-icon class="item-icon" type="google-circle" theme="filled" />
        </a>
        <!-- <nuxt-link class="register" :to="{ name: 'register' }">
          Sign up
        </nuxt-link> -->
        <a href="#">Sign up</a>
      </div>
    </a-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import { WrappedFormUtils } from 'ant-design-vue/types/form/form'

@Component({
  layout: 'user',
  name: 'login-page'
})
export default class LoginPage extends Vue {
  private form!: WrappedFormUtils

  private isLoaddingLogin: boolean = false

  private isLoginError: boolean = false

  private tabActive: string = 'tab1'

  created () {
    this.form = this.$form.createForm(this)
  }

  private changeTab (key: string) {
    this.tabActive = key
  }

  handleSubmit (e: any) {
    e.preventDefault()
    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.$auth.loginWith('local', { data: values })
          .catch(() => {
            this.isLoginError = true
          })
      }
    })
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
