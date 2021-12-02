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
        <a-tab-pane key="tab1" :tab="'Đăng nhập'">
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
                {rules: [{ required: true, message: 'Hãy nhập tên đăng nhập' }], validateTrigger: 'change'}]"
              size="large"
              type="text"
              :placeholder="'Tên đăng nhập'"
              @keydown.enter.prevent
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input-password
              v-decorator="[
                'password',
                {rules: [{ required: true, message: 'Hãy nhập mật khẩu' }], validateTrigger: 'blur'}
              ]"
              size="large"
              :placeholder="'Mật khẩu'"
              @keydown.enter.prevent
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input-password>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>
      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          html-type="submit"
          class="login-button"
          :loading="isLoaddingLogin"
          :disabled="isLoaddingLogin"
        >
          Đăng nhập
        </a-button>
      </a-form-item>
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
