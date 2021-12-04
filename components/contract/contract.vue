<template>
  <section class="TableList">
    <a-divider orientation="left">
      Danh sách hợp đồng
    </a-divider>
    <div class="buttonback">
      <a @click="showModal()"><a-button> <a-icon type="plus" />Tạo hợp đồng </a-button></a>
    </div>
    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="dataContract"
      :pagination="{ pageSize: 2 }"
      :loading="loading"
      bordered
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <span slot="contract" slot-scope="text, record">
        {{ 'HD' + record.id }}
      </span>
      <template slot="method" slot-scope="text, record">
        <span v-if="record.idMethod === 1"> Tại địa chỉ thông báo cước </span>
        <span v-else-if="record.idMethod === 2"> Tại điểm giao dịch viễn thông </span>
        <span v-else>Qua ngân hàng</span>
      </template>
      <span slot="action" slot-scope="text, record">
        <div style="justify-content: center; display: flex; flex-wrap: wrap; align-items: center">
          <a href="#" @click="showEditContract(record.id)"> <a-icon type="eye" style="font-size: 20px" /> </a>
          <a-divider type="vertical" />
          <a-popconfirm
            v-if="dataContract.length"
            title="Chắc chắn muốn xóa?"
            @confirm="() => onDeleteContract(record.id)"
          >
            <a href="#"><a-icon type="delete" style="font-size: 20px" /></a>
          </a-popconfirm>
        </div>
      </span>
    </a-table>
    <a-modal
      v-model="visible"
      title="Thông tin hợp đồng"
      on-ok="handleCancel"
    >
      <template slot="footer">
        <div style="display: flex; justify-content: space-between">
          <a-button style="margin-left: 10px" @click="handleCancel">
            Hủy
          </a-button>
          <a-button type="primary" @click="onSubmitContract">
            Lưu
          </a-button>
        </div>
      </template>
      <div class="pop-up">
        <a-form
          :form="formContract"
          :label-col="{ span: 9 }"
          :wrapper-col="{ span: 15 }"
          :label-align="'left'"
        >
          <a-form-item hidden>
            <a-input v-decorator="['id']" />
          </a-form-item>
          <a-form-item
            label="Tên dịch vụ"
          >
            <a-select
              v-decorator="[
                'IDService',
                {
                  rules: [{ required: true, message: 'Trường này không được trống' }],
                },
              ]"
            >
              <a-select-option
                v-for="item in dataService"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="Phương thức thanh toán"
          >
            <a-select
              v-decorator="[
                'IDMethod',
                {
                  rules: [{ required: true , message: 'Trường này không được trống'}],
                },
              ]"
            >
              <a-select-option value="1">
                Tại địa chỉ thông báo cước
              </a-select-option>
              <a-select-option value="2">
                Tại điểm giao dịch viễn thông
              </a-select-option>
              <a-select-option value="3">
                Qua ngân hàng
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="Ngày ký">
            <a-date-picker
              v-decorator="[
                'signday',
                {
                  rules: [{ required: true, message: 'Trường này không được trống' }],
                },
              ]"
              :format="'DD/MM/yyyy'"
              placeholder=""
            />
          </a-form-item>
          <a-form-item label="Thời hạn trả trước">
            <a-input
              v-decorator="[
                'prepaymentTerm',
                {
                  rules: [{ required: true, message: 'Trường này không được trống' }
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item label="Số tháng khuyến mãi">
            <a-input
              v-decorator="[
                'promotion',
                {
                  rules: [{ required: true, message: 'Trường này không được trống' }],
                },
              ]"
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </section>
</template>
<script lang="ts">
import { WrappedFormUtils } from 'ant-design-vue/types/form/form'
import { Vue, Component, PropSync } from 'vue-property-decorator'
import moment from 'moment'
import { IContract } from '~/src/models/response/contractResponse'
@Component({
  name: 'contract'
})
export default class Contract extends Vue {
  @PropSync('contract', { type: Array })
  private dataContract!: Array<IContract>

  private dataService:Array<any>=[]
  $notification: any
  $message: any
  private dataSource: any
  private loading:boolean = false
  private visible: boolean = false
  private formContract!: WrappedFormUtils

  async created () {
    this.formContract = this.$form.createForm(this)
    this.dataService = await this.$axios.$get('/Service/get-all-service')
  }

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

  showModal () {
    this.formContract.resetFields()
    this.visible = true
  }

  closeModal () {
    this.formContract.resetFields()
    this.visible = false
  }

  handleCancel () {
    this.visible = false
  }

  showEditContract (key: number) {
    this.showModal()
    this.dataSource = this.dataContract.find(x => x.id === key)
    this.formContract.getFieldDecorator('id', { initialValue: undefined })
    this.formContract.getFieldDecorator('IDService', { initialValue: undefined })
    this.formContract.getFieldDecorator('IDMethod', { initialValue: '' })
    this.formContract.getFieldDecorator('signday', { initialValue: null })
    this.formContract.getFieldDecorator('prepaymentTerm', { initialValue: '' })
    this.formContract.getFieldDecorator('promotion', { initialValue: '0' })
    this.formContract.setFields({
      id: { value: this.dataSource.id },
      IDService: { value: this.dataSource.idService },
      IDMethod: { value: this.dataSource.idMethod + '' },
      signday: { value: moment(this.dataSource.signday, 'DD/MM/yyyy') },
      prepaymentTerm: { value: this.dataSource.prepaymentTerm },
      promotion: { value: this.dataSource.promotion }
    })
  }

  onSubmitContract (e: any) {
    e.preventDefault()
    this.formContract.validateFields((err: any, values: any) => {
      if (!err) {
        if (values.id === undefined) {
          this.$axios.$post('/Contract/create-contract/' + this.$route.params.id, values).then((response) => {
            if (response !== null) {
              this.openNotification(true)
              this.dataContract = response
              this.$emit('changeData')
            } else {
              this.openNotification(false)
            }
          }).catch((error) => {
            this.$message.warning('Bạn không có quyền thực hiện')
          })
        } else {
          this.$axios.$put('/Contract/update-contract/' + values.id, values).then(async (response) => {
            if (response !== null) {
              this.openNotification(true)
              this.dataContract = await this.$axios.$get('/Contract/get-all-contract/' + this.$route.params.id)
              this.$emit('changeData')
            } else {
              this.openNotification(false)
            }
          }).catch((error) => {
            this.$message.warning('Bạn không có quyền thực hiện')
          })
        }
      }
      this.closeModal()
    })
  }

  onDeleteContract (key:any) {
    this.$axios.$delete('/Contract/delete-contract/' + key)
      .then((response) => {
        if (response === true) {
          this.dataContract = this.dataContract.filter(item => item.id !== key)
        }
        this.openNotification(response)
      }).catch((error) => {
        this.$message.warning('Bạn không có quyền thực hiện')
      })
  }

  private columns: Array<any> = [
    {
      title: 'STT',
      scopedSlots: { customRender: 'serial' }
    },
    {
      title: 'Mã hợp đồng',
      dataIndex: 'id',
      scopedSlots: { customRender: 'contract' }
    },
    {
      title: 'Dịch vụ',
      dataIndex: 'idService'
    },
    {
      title: 'Ngày ký',
      dataIndex: 'signday',
      sorter: (a:any, b:any) => moment(a.signday, 'DD/MM/YYYY').toDate().getDate() - moment(b.signday, 'DD/MM/YYYY').toDate().getDate(),
      sortDirections: ['ascend', 'descend']
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'idMethod',
      scopedSlots: { customRender: 'method' }
    },
    {
      title: 'Hành động',
      scopedSlots: { customRender: 'action' },
      key: 'action'
    }
  ];
}
</script>
<style>
  .buttonback{
  display: flex;
  justify-content: right;
  align-items: right;
  text-align: center;
  margin-bottom: 10px;
}
</style>
