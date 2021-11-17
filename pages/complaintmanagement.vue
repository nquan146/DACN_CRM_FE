<template>
  <section class="TableList">
    <a-divider orientation="left">
      Danh sách khiếu nại của khách hàng
    </a-divider>
    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="dataComplaint"
      :pagination="{ pageSize: 10 }"
      :loading="loading"
      bordered
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <template slot="status" slot-scope="text,record">
        <a-tag v-if="record.status === false" :color="'volcano'">
          Chưa hỗ trợ
        </a-tag>
        <a-tag v-else :color="'green'">
          Đã hỗ trợ
        </a-tag>
      </template>
      <span slot="action" slot-scope="text, record">
        <div style="justify-content: center; display: flex; flex-wrap: wrap; align-items: center">
          <a href="#" @click="changeStatus(record.id)">
            <a-icon v-if="record.status===false" type="check-circle" style="font-size: 18px" />
            <a-icon v-else type="stop" style="font-size: 18px" />
          </a>
          <a-divider type="vertical" />
          <a href="#" @click="showEditComplaint(record.id)"> <a-icon type="eye" style="font-size: 20px" /> </a>
        </div>
      </span>
    </a-table>
    <a-modal
      v-model="visible"
      title="Thông tin khiếu nại"
      on-ok="handleCancel"
    >
      <template slot="footer">
        <div style="display: flex; justify-content: space-between">
          <a-button style="margin-left: 10px" @click="handleCancel">
            Hủy
          </a-button>
          <a-button type="primary" @click="onSubmitComplaint">
            Lưu
          </a-button>
        </div>
      </template>
      <div class="pop-up">
        <a-form
          :form="formComplaint"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 15 }"
          :label-align="'right'"
        >
          <a-form-item hidden>
            <a-input v-decorator="['id']" />
          </a-form-item>
          <a-form-item label="Khách hàng">
            {{ dataSource.customerName }}
          </a-form-item>
          <a-form-item label="Loại khiếu nại">
            {{ dataSource.complainName }}
          </a-form-item>
          <a-form-item label="Ngày nhận khiếu nại">
            {{ dataSource.receivedDate }}
          </a-form-item>
          <a-form-item label="Chi tiết">
            <span>{{ dataSource.description }}</span>
          </a-form-item>
          <a-form-item label="Nhân viên hỗ trợ">
            <a-select
              v-decorator="[
                'employeeID',
                {
                  rules: []
                },
              ]"
            >
              <a-select-option
                v-for="item in dataEmployee"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </section>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Vue, Component } from 'vue-property-decorator'
import { IComplaint } from '@/src/models/response/complaintResponse'
import { WrappedFormUtils } from 'ant-design-vue/types/form/form'
@Component({
  layout: 'menu',
  name: 'complaint',
  async asyncData (context:Context) {
    const dataComplaint = await context.$axios.$get('/Complaint/get-all-complaint')
    const dataEmployee = await context.$axios.$get('/Employee/GetEmployees')
    return {
      dataComplaint,
      dataEmployee
    }
  }
})
export default class Complaint extends Vue {
    private visible: boolean = false
    private dataComplaint: Array<IComplaint> =[]
    private formComplaint!: WrappedFormUtils
    $notification: any
    private dataSource: IComplaint = {
      id: 0,
      customerID: 0,
      customerName: '',
      complainID: 0,
      complainName: '',
      description: '',
      receivedDate: '',
      status: false,
      employeeID: 0,
      employeeName: ''
    }

    private loading:boolean = false
    private columns: Array<any> = [
      {
        title: 'STT',
        scopedSlots: { customRender: 'serial' }
      },
      {
        title: 'Khách hàng',
        dataIndex: 'customerName'
      },
      {
        title: 'Khiếu nại',
        dataIndex: 'complainName'
      },
      {
        title: 'Ngày nhận',
        dataIndex: 'receivedDate'
      },
      {
        title: 'Tình trạng',
        dataIndex: 'status',
        scopedSlots: { customRender: 'status' }
      },
      {
        title: 'Hành động',
        scopedSlots: { customRender: 'action' },
        key: 'action'
      }
    ];

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
      this.formComplaint = this.$form.createForm(this)
    }

    showModal () {
      this.formComplaint.resetFields()
      this.visible = true
    }

    closeModal () {
      this.formComplaint.resetFields()
      this.visible = false
    }

    handleCancel () {
      this.visible = false
    }

    changeStatus (key: number) {
      this.$axios.$post('/Complaint/change-status-complaint/' + key).then((response) => {
        if (response !== null) {
          this.openNotification(true)
          this.dataComplaint = response
        } else {
          this.openNotification(false)
        }
      })
    }

    showEditComplaint (key: number) {
      this.showModal()
      this.dataSource = this.dataComplaint.find(x => x.id === key)
      this.formComplaint.getFieldDecorator('id', { initialValue: undefined })
      this.formComplaint.getFieldDecorator('employeeID', { initialValue: undefined })
      this.formComplaint.setFields({
        id: { value: this.dataSource.id },
        employeeID: { value: this.dataSource.employeeID }
      })
    }

    onSubmitComplaint (e: any) {
      e.preventDefault()
    }
}
</script>

<style scoped lang="less">
.TableList {
  background: #fff;
  padding: 30px;
  .button-view {
    margin-bottom: 30px;
    button {
      margin-right: 20px;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
}
.buttonback{
  display: flex;
  justify-content: right;
  align-items: right;
  text-align: center;
  margin-bottom: 10px;
}
</style>
