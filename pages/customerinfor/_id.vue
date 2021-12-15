<template>
  <a-card class="card" title="Thông tin khách hàng" :bordered="false">
    <div class="buttonback">
      <nuxt-link to="/customerinfor">
        <a-button> <a-icon type="left" />Trở lại danh sách </a-button>
      </nuxt-link>
    </div>
    <a-tabs
      :active-key="tabActive"
      :tab-bar-style="{ textAlign: 'left', borderBottom: 'unset' }"
      @change="changeTab"
    >
      <a-tab-pane key="tab1" :tab="'Thông tin'">
        <a-form :form="formCustomer" class="form" @submit="handleSubmit">
          <a-form-item hidden>
            <a-input v-decorator="['id']" />
          </a-form-item>
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
                    {rules: [{ required: true, pattern: /^[\+]?[(]?[0-9]{10}$/,
                               message: 'Hãy nhập số điện thoại'}]}
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
      </a-tab-pane>
      <a-tab-pane key="tab2" :tab="'Hợp đồng'">
        <Contract :contract.sync="dataContract" @changeData="changeData" />
      </a-tab-pane>
      <a-tab-pane key="tab3" :tab="'Lịch sử giao dịch'">
        <Transaction :transaction.sync="dataTransaction" :contract.sync="dataContract" />
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>
<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'
import { ICustomer } from '@/src/models/response/customerResponse'
import { WrappedFormUtils } from 'ant-design-vue/types/form/form'
import { Context } from '@nuxt/types'
import Contract from '@/components/contract/contract.vue'
import Transaction from '@/components/transtaction/transaction.vue'

@Component({
  layout: 'menu',
  components: {
    Contract,
    Transaction
  },
  async asyncData (context:Context) {
    const customer = await context.$axios.$get('/Customer/get-customer/' + context.route.params.id)
    const dataContract = await context.$axios.$get('/Contract/get-all-contract/' + context.route.params.id)
    const dataTransaction = await context.$axios.$get('/Transaction/get-all-transaction/' + context.route.params.id)
    return {
      customer,
      dataContract,
      dataTransaction
    }
  }
})
export default class Customer extends Vue {
    private formCustomer!: WrappedFormUtils
    customer!: ICustomer
    dataContract:Array<any>=[]
    dataTransaction:Array<any>=[]
    $notification: any
    $message: any
    private tabActive: string = 'tab1'
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
      this.setFieldFrom()
    }

    @Emit()
    async changeData () {
      this.dataTransaction = await this.$axios.$get('/Transaction/get-all-transaction/' + this.$route.params.id)
    }

    setFieldFrom () {
      this.formCustomer.getFieldDecorator('id', { initialValue: undefined })
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
      this.formCustomer.setFields({
        id: { value: this.customer.id },
        name: { value: this.customer.name },
        age: { value: this.customer.age },
        phoneNumber: { value: this.customer.phoneNumber },
        email: { value: this.customer.email },
        gender: { value: this.customer.gender + '' },
        ward: { value: this.customer.ward },
        address: { value: this.customer.address },
        customerGroupId: { value: this.customer.customerGroupId + '' },
        district: { value: this.customer.district },
        city: { value: this.customer.city },
        identificationCardID: { value: this.customer.identificationCardID },
        purpose: { value: this.customer.purpose },
        taxCode: { value: this.customer.taxCode }
      })
    }

    handleSubmit (e: any) {
      e.preventDefault()
      this.formCustomer.validateFields((err: any, values: any) => {
        if (!err) {
          if (values.id === undefined) {
            this.openNotification(false)
          } else {
            this.$axios.$put('/Customer/update-customer/' + this.$route.params.id, values).then(async (response) => {
              this.openNotification(response)
              if (response) {
                this.customer = await this.$axios.$get('/Customer/get-customer/' + this.$route.params.id)
              }
            }).catch((error) => {
              this.$message.warning('Bạn không có quyền thực hiện')
            })
          }
        }
      })
    }

    private changeTab (key: string) {
      this.tabActive = key
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
}
.buttonfunc .ant-btn {
  margin-right: 15px;
}
.buttonback{
  display: flex;
  justify-content: right;
  align-items: right;
  text-align: center;
  margin: 0;
}
</style>
