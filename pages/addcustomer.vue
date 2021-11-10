<template>
  <div>
    <div class="buttonback">
      <a :href="'/customermanagement/'"><a-button> <a-icon type="left" />Trở lại danh sách </a-button></a>
    </div>
    <a-card class="card" title="Thông tin khách hàng" :bordered="false">
      <a-form :form="formCustomer" class="form" @submit="handleSubmit">
        <a-row :gutter="16">
          <a-col :lg="10" :md="10" :sm="24">
            <a-form-item label="Họ và tên">
              <a-input
                v-decorator="[
                  'name',
                  {rules: [{ required: true, message: 'Trường này là bắt buộc', whitespace: true}]}
                ]"
              />
            </a-form-item>
            <a-form-item label="Tuổi">
              <a-input
                v-decorator="[
                  'age',
                  {rules: []}
                ]"
              />
            </a-form-item>
            <a-form-item label="Căn cước công dân">
              <a-input
                v-decorator="[
                  'identificationCardID',
                  {rules: [{ required: true, message: 'Trường này là bắt buộc', whitespace: true}]}
                ]"
              />
            </a-form-item>
            <a-form-item
              label="Email"
            >
              <a-input
                v-decorator="[
                  'email',
                  {rules: [{ required: true, message: 'Trường này là bắt buộc', whitespace: true}]}
                ]"
                addon-before="https://"
              />
            </a-form-item>
            <a-form-item
              label="Giới tính"
            >
              <a-select v-decorator="[ 'gender', {rules: [{ required: true, message: 'Trường này là bắt buộc'}]} ]">
                <a-select-option value="1">
                  Nam
                </a-select-option>
                <a-select-option value="0">
                  Nữ
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="Số điện thoại"
            >
              <a-input
                v-decorator="[
                  'phoneNumber',
                  {rules: [{ required: true, message: 'Trường này là bắt buộc', whitespace: true}]}
                ]"
              />
            </a-form-item>
            <a-form-item
              label="Mục đích sử dụng"
            >
              <a-input
                v-decorator="[
                  'purpose',
                  {rules: []}
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="{span: 10, offset: 3}" :lg="{span: 10}" :md="{span: 10}" :sm="24">
            <a-form-item
              label="Nhóm người dùng"
            >
              <a-select v-decorator="[ 'customerGroupId', {rules: [{ required: true, message: 'Trường này là bắt buộc'}]} ]">
                <a-select-option value="1">
                  Cá nhân
                </a-select-option>
                <a-select-option value="2">
                  Doanh nghiệp
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="Địa chỉ"
            >
              <a-input
                v-decorator="[
                  'address',
                  {rules: [{ required: true, message: 'Trường này là bắt buộc', whitespace: true}]}
                ]"
              />
            </a-form-item>
            <a-form-item
              label="Phường"
            >
              <a-input
                v-decorator="[
                  'ward',
                  {rules: [{ required: true, message: 'Trường này là bắt buộc', whitespace: true}]}
                ]"
              />
            </a-form-item>
            <a-form-item
              label="Quận"
            >
              <a-input
                v-decorator="[
                  'district',
                  {rules: [{ required: true, message: 'Trường này là bắt buộc', whitespace: true}]}
                ]"
              />
            </a-form-item>
            <a-form-item
              label="Thành phố"
            >
              <a-input
                v-decorator="[
                  'city',
                  {rules: [{ required: true, message: 'Trường này là bắt buộc', whitespace: true}]}
                ]"
              />
            </a-form-item>
            <a-form-item
              label="Mã số thuế"
            >
              <a-input
                v-decorator="[
                  'taxCode',
                  {rules: []}
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <div class="buttonfunc">
          <a-button type="primary" html-type="submit" size="large">
            Lưu
          </a-button>
        </div>
      </a-form>
    </a-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ICustomer } from '@/src/models/response/customerResponse'
import { WrappedFormUtils } from 'ant-design-vue/types/form/form'
@Component({
  layout: 'menu',
  name: 'customerManagement'
})
export default class Customer extends Vue {
    private formCustomer!: WrappedFormUtils
    customer!: ICustomer
    $notification: any
    openNotification (result: boolean): void {
      this.$notification.config({
        duration: 1
      })
      if (result === true) {
        this.$notification.success({
          message: 'Thao tác thành công'
        })
      } else {
        this.$notification.error({
          message: 'Thao tác không thành công'
        })
      }
    }

    created () {
      this.formCustomer = this.$form.createForm(this)
    }

    setFieldFrom () {
      this.formCustomer.getFieldDecorator('name', { initialValue: '' })
      this.formCustomer.getFieldDecorator('email', { initialValue: '' })
      this.formCustomer.getFieldDecorator('gender', { initialValue: '' })
      this.formCustomer.getFieldDecorator('ward', { initialValue: '' })
      this.formCustomer.getFieldDecorator('address', { initialValue: '' })
      this.formCustomer.getFieldDecorator('customerGroupId', { initialValue: '' })
      this.formCustomer.getFieldDecorator('district', { initialValue: '' })
      this.formCustomer.getFieldDecorator('city', { initialValue: '' })
      this.formCustomer.getFieldDecorator('identificationCardID', { initialValue: '' })
      this.formCustomer.getFieldDecorator('purpose', { initialValue: '' })
      this.formCustomer.getFieldDecorator('taxCode', { initialValue: '' })
      this.formCustomer.getFieldDecorator('phoneNumber', { initialValue: '' })
      this.formCustomer.getFieldDecorator('age', { initialValue: '' })
    }

    handleSubmit (e: any) {
      e.preventDefault()
      this.formCustomer.validateFields((err: any, values: any) => {
        if (!err) {
          this.$axios.$post('/Customer/create-customer', values).then((response) => {
            const url = '/customerinfor/' + response
            const link = document.createElement('a')
            link.href = url
            document.body.appendChild(link)
            this.openNotification(true)
            link.click()
          }).catch(() => this.openNotification(false))
        }
      }
      )
    }
}
</script>

<style scoped>
.card{
    margin-bottom: 24px;
  }
  .buttonfunc {
  display: flex;
  justify-content: left;
  align-items: right;
  text-align: center;
  margin: 20px 18px 0 0;
}
.buttonfunc .ant-btn {
  margin-right: 15px;
}
.buttonback{
  display: flex;
  justify-content: right;
  align-items: right;
  text-align: center;
}
</style>
