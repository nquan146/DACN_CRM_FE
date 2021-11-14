<template>
  <section class="TableList">
    <a-divider orientation="left">
      Danh sách giao dịch
    </a-divider>
    <div class="buttonback">
      <a @click="showModal()"><a-button> <a-icon type="plus" />Tạo giao dịch </a-button></a>
    </div>
    <a-table
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
      title="Thông tin hợp đồng"
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
            label="Tên dịch vụ"
          >
            <a-select
              v-decorator="[
                'IDService',
                {
                  rules: [{ required: true, message: 'Trường này không được trống' }],
                },
              ]"
            />
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
import { Vue, Component, PropSync } from 'vue-property-decorator'
import { ITransaction } from '@/src/models/response/transactionResponse'
import { WrappedFormUtils } from 'ant-design-vue/types/form/form'
@Component({
  name: 'transaction'
})
export default class Transaction extends Vue {
    @PropSync('transaction', { type: Array })
    private datatransaction!: Array<ITransaction>

    private dataSource: any
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
        dataIndex: 'price'
      },
      {
        title: 'Ngày đóng',
        dataIndex: 'paymentDate'
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

    onSubmitTrans (e: any) {
      e.preventDefault()
    }

    handleCancel () {
      this.visible = false
    }

    showEditTrans (key: number) {

    }

    onDeleteTrans (key: number) {

    }
}

</script>

<style>

</style>
