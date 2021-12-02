<template>
  <section class="TableList">
    <a-divider orientation="left">
      Danh sách giao dịch
    </a-divider>
    <div class="buttonback">
      <a @click="showModal()"><a-button> <a-icon type="plus" />Tạo giao dịch </a-button></a>
    </div>
    <a-table
      v-model="datatransaction"
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="datatransaction"
      :pagination="{ pageSize: 5 }"
      :loading="loading"
      bordered
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <span slot="contract" slot-scope="text, record">
        {{ 'HD' + record.contractID }}
      </span>
      <span slot="action" slot-scope="text, record">
        <div style="justify-content: center; display: flex; flex-wrap: wrap; align-items: center">
          <a href="#" @click="showEditTrans(record.id)"> <a-icon type="eye" style="font-size: 20px" /> </a>
          <a-divider type="vertical" />
          <a-popconfirm
            v-if="datatransaction.length"
            title="Chắc chắn muốn xóa?"
            @confirm="() => onDeleteTrans(record.id)"
          >
            <a href="#"><a-icon type="delete" style="font-size: 20px" /></a>
          </a-popconfirm>
        </div>
      </span>
    </a-table>
    <a-modal
      v-model="visible"
      title="Thông tin giao dịch"
      on-ok="handleCancel"
    >
      <template slot="footer">
        <div style="display: flex; justify-content: space-between">
          <a-button style="margin-left: 10px" @click="handleCancel">
            Hủy
          </a-button>
          <a-button type="primary" @click="onSubmitTrans">
            Lưu
          </a-button>
        </div>
      </template>
      <div class="pop-up">
        <a-form
          :form="formTransaction"
          :label-col="{ span: 9 }"
          :wrapper-col="{ span: 15 }"
          :label-align="'left'"
        >
          <a-form-item hidden>
            <a-input v-decorator="['id']" />
          </a-form-item>
          <a-form-item
            label="Mã hợp đồng"
          >
            <a-select
              v-decorator="[
                'contractID',
                {
                  rules: [{ required: true, message: 'Trường này không được trống' }],
                },
              ]"
            >
              <a-select-option
                v-for="item in dataContract"
                :key="item.id"
                :value="item.id"
              >
                {{ item.id }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="Ngày giao dịch">
            <a-date-picker
              v-decorator="[
                'paymentDate',
                {
                  rules: [{ required: true, message: 'Trường này không được trống' }],
                },
              ]"
              :format="'DD/MM/yyyy'"
              placeholder=""
            />
          </a-form-item>
          <a-form-item label="Số tiền">
            <a-input
              v-decorator="[
                'price',
                {
                  rules: [{ required: true, message: 'Trường này không được trống' }
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item label="Số tháng đóng">
            <a-input
              v-decorator="[
                'month',
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
import { Vue, Component, PropSync } from 'vue-property-decorator'
import { ITransaction } from '@/src/models/response/transactionResponse'
import { WrappedFormUtils } from 'ant-design-vue/types/form/form'
import moment from 'moment'
import { IContract } from '~/src/models/response/contractResponse'
@Component({
  name: 'transaction'
})
export default class Transaction extends Vue {
     @PropSync('contract', { type: Array })
     private dataContract!: Array<IContract>

    @PropSync('transaction', { type: Array })
    private datatransaction!: Array<ITransaction>

    private dataSource: any
    $notification: any
    private loading:boolean = false
    private visible: boolean = false
    private formTransaction!: WrappedFormUtils
    private columns: Array<any> = [
      {
        title: 'STT',
        scopedSlots: { customRender: 'serial' }
      },
      {
        title: 'Mã hợp đồng',
        dataIndex: 'contractID',
        scopedSlots: { customRender: 'contract' }
      },
      {
        title: 'Số tiền',
        dataIndex: 'price',
        sorter: (a:any, b:any) => a.price - b.price,
        sortDirections: ['ascend', 'descend']
      },
      {
        title: 'Ngày giao dịch',
        dataIndex: 'paymentDate',
        sorter: (a:any, b:any) => moment(a.paymentDate, 'DD/MM/YYYY').toDate().getDate() - moment(b.paymentDate, 'DD/MM/YYYY').toDate().getDate(),
        sortDirections: ['ascend', 'descend']
      },
      {
        title: 'Hóa đơn',
        dataIndex: 'bill'
      },
      {
        title: 'Hành động',
        scopedSlots: { customRender: 'action' },
        key: 'action'
      }
    ];

    created () {
      this.formTransaction = this.$form.createForm(this)
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
      this.formTransaction.resetFields()
      this.visible = true
    }

    closeModal () {
      this.formTransaction.resetFields()
      this.visible = false
    }

    onSubmitTrans (e: any) {
      e.preventDefault()
      this.formTransaction.validateFields((err: any, values: any) => {
        if (!err) {
          if (values.id === undefined) {
            this.$axios.$post('/Transaction/create-transaction/' + this.$route.params.id, values).then(async (response) => {
              if (response !== null) {
                this.openNotification(true)
                this.datatransaction = await this.$axios.$get('/Transaction/get-all-transaction/' + this.$route.params.id)
              } else {
                this.openNotification(false)
              }
            })
          } else {
            this.$axios.$put('/Transaction/update-transaction/' + values.id, values).then(async (response) => {
              if (response !== null) {
                this.openNotification(true)
                this.datatransaction = await this.$axios.$get('/Transaction/get-all-transaction/' + this.$route.params.id)
              } else {
                this.openNotification(false)
              }
            })
          }
          this.closeModal()
        }
      })
    }

    handleCancel () {
      this.visible = false
    }

    showEditTrans (key: number) {
      this.showModal()
      this.dataSource = this.datatransaction.find(x => x.id === key)
      this.formTransaction.getFieldDecorator('id', { initialValue: undefined })
      this.formTransaction.getFieldDecorator('contractID', { initialValue: undefined })
      this.formTransaction.getFieldDecorator('paymentDate', { initialValue: '' })
      this.formTransaction.getFieldDecorator('price', { initialValue: null })
      this.formTransaction.getFieldDecorator('month', { initialValue: '0' })
      this.formTransaction.getFieldDecorator('promotion', { initialValue: '0' })
      this.formTransaction.setFields({
        id: { value: this.dataSource.id },
        contractID: { value: this.dataSource.contractID },
        paymentDate: { value: moment(this.dataSource.paymentDate, 'DD/MM/YYYY') },
        price: { value: this.dataSource.price },
        month: { value: this.dataSource.month },
        promotion: { value: this.dataSource.promotion }
      })
    }

    onDeleteTrans (key: number) {
      this.$axios.$delete('/Transaction/delete-transaction/' + key)
        .then((response) => {
          this.datatransaction = this.datatransaction.filter(item => item.id !== key)
          this.openNotification(response)
        })
    }
}

</script>

<style>

</style>
