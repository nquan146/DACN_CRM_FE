<template>
  <div>
    <div class="buttonback">
      <nuxt-link to="/customerinfor"><a-button> <a-icon type="left" />Trở lại danh sách </a-button></nuxt-link>
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
                type="number"
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
                  {rules: [{ required: true, pattern: /^[\+]?[(]?[0-9]{10}$/,
                             message: 'Hãy nhập số điện thoại',}]}
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
            <a-form-item label="Tỉnh/Thành">
              <a-select
                v-decorator="[
                  'city',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Chọn Tỉnh/Thành',
                      },
                    ],
                  },
                ]"
                placeholder="Chọn Tỉnh/Thành"
                @change="handleSelectCities"
              >
                <a-select-option
                  v-for="city in cities"
                  :key="city.name"
                  :value="city.name"
                >
                  {{ city.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Quận/Huyện">
              <a-select
                v-decorator="[
                  'district',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Chọn Quận/Huyện',
                      },
                    ],
                  },
                ]"
                placeholder="Chọn Quận/Huyện"
                @change="handleSelectDistricts"
              >
                <a-select-option
                  v-for="district in districts"
                  :key="district.name"
                  :value="district.name"
                >
                  {{ district.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Phường/Xã">
              <a-select
                v-decorator="[
                  'ward',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Chọn Phường/Xã',
                      },
                    ],
                  },
                ]"
                placeholder="Chọn Phường/Xã"
              >
                <a-select-option
                  v-for="ward in wards"
                  :key="ward.name"
                  :value="ward.name"
                >
                  {{ ward.name }}
                </a-select-option>
              </a-select>
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
import { IWardsResponse } from '~/src/enums/response/IWardsResponse'
import { IDisctrictsResponse } from '~/src/enums/response/IDisctrictsResponse'
@Component({
  layout: 'menu',
  name: 'customerManagement'
})
export default class Customer extends Vue {
    private formCustomer!: WrappedFormUtils
    customer!: ICustomer
    private cityname: String = ''
    private cities: Array<String> = [];
    private districts: Array<String> = [];
    private warded: IWardsResponse = {
      citied: '',
      districted: ''
    }

    private wards: Array<String> = [];
    private districted: IDisctrictsResponse = {
      name: ''
    }

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

    async created () {
      this.formCustomer = this.$form.createForm(this)
      this.cities = await this.$axios.$get('/Employee/GetCity')
      this.setFieldFrom()
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

    handleSelectCities (value: any) {
      this.cityname = value
      this.districted.name = value
      this.$axios
        .$post('/Employee/GetDistricts', this.districted)
        .then((response) => {
          this.districts = response
        })
        .catch()
    }

    handleSelectDistricts (value: any) {
      this.warded.citied = this.cityname
      this.warded.districted = value
      this.$axios
        .$post('/Employee/GetWards', this.warded)
        .then((response) => {
          this.wards = response
        })
        .catch()
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
