<template>
  <div>
    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="dataservice"
      :pagination="{ pageSize: 5 }"
      bordered
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <span slot="speed" slot-scope="text, record">
        {{ record.speed }} Mbps
      </span>
      <span slot="action" slot-scope="text, record">
        <div style="justify-content: center; display: flex; flex-wrap: wrap; align-items: center">
          <a href="#" @click="showEditService(record.id)"> <a-icon type="eye" style="font-size: 20px" /> </a>
          <a-divider type="vertical" />
          <a-popconfirm
            v-if="dataservice.length"
            title="Chắc chắn muốn xóa?"
            @confirm="() => onDeleteCustomer(record.id)"
          >
            <a href="#"><a-icon type="delete" style="font-size: 20px" /></a>
          </a-popconfirm>
        </div>
      </span>
    </a-table>
    <a-modal
      v-model="visible"
      title="Thông tin dịch vụ"
      on-ok="closeModal"
    >
      <template slot="footer">
        <div style="display: flex; justify-content: space-between">
          <a-button style="margin-left: 10px" @click="closeModal()">
            Hủy
          </a-button>
          <a-button type="primary" @click="onSubmitService">
            Lưu
          </a-button>
        </div>
      </template>
      <a-form
        :form="formService"
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
          <a-input
            v-decorator="[
              'Name',
              {
                rules: [{ required: true, message: 'Trường này không được trống' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item
          label="Loại dịch vụ"
        >
          <a-select
            v-decorator="[
              'type',
              {
                rules: [{ required: true , message: 'Trường này không được trống'}],
              },
            ]"
          >
            <a-select-option value="1">
              Cá nhân/Hộ gia đình
            </a-select-option>
            <a-select-option value="2">
              Doanh nghiệp
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Tốc độ">
          <a-input
            v-decorator="[
              'speed',
              {
                rules: [{ required: true, message: 'Trường này không được trống' }],
              },
            ]"
            addon-after="Mpbs"
          />
        </a-form-item>
        <a-form-item label="Giá cước">
          <a-input
            v-decorator="[
              'price',
              {
                rules: [{ required: true, message: 'Trường này không được trống' }
                ],
              },
            ]"
            addon-after="/ Tháng"
          />
        </a-form-item>
        <a-form-item label="Mô tả">
          <a-textarea
            v-decorator="[
              'description',
              {
                rules: [{}],
              },
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator'
import { IService } from '@/src/models/response/serviceRespone'
import { WrappedFormUtils } from 'ant-design-vue/types/form/form'
@Component({
  name: 'servicecompany'
})
export default class ServiceFamily extends Vue {
    @PropSync('servicecompany', { type: Array })
    private dataservice!: Array<IService>

    private visible: boolean = false
    private dataSource: any
    private formService!: WrappedFormUtils
    $notification: any

    created () {
      this.formService = this.$form.createForm(this)
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

    showEditService (key: number) {
      this.showModal()
      this.dataSource = this.dataservice.find(x => x.id === key)
      this.formService.getFieldDecorator('id', { initialValue: undefined })
      this.formService.getFieldDecorator('Name', { initialValue: '' })
      this.formService.getFieldDecorator('type', { initialValue: '' })
      this.formService.getFieldDecorator('speed', { initialValue: '' })
      this.formService.getFieldDecorator('price', { initialValue: '' })
      this.formService.getFieldDecorator('description', { initialValue: '' })
      this.formService.setFields({
        id: { value: this.dataSource.id },
        Name: { value: this.dataSource.name },
        type: { value: this.dataSource.type },
        speed: { value: this.dataSource.speed },
        price: { value: this.dataSource.price },
        description: { value: this.dataSource.description }
      })
    }

    onSubmitService (e: any) {
      e.preventDefault()
      this.formService.validateFields((err: any, values: any) => {
        if (!err) {
          this.$axios.$put('/Service/update-service/' + values.id, values).then(async (response) => {
            if (response === true) {
              this.openNotification(response)
              this.dataservice = await this.$axios.$get('/Service/get-all-service-by-type/2')
            } else {
              this.openNotification(response)
            }
          })
        }
        this.closeModal()
      })
    }

    showModal () {
      this.formService.resetFields()
      this.visible = true
    }

    closeModal () {
      this.formService.resetFields()
      this.visible = false
    }

    private columns: Array<any> = [
      {
        title: 'STT',
        scopedSlots: { customRender: 'serial' }
      },
      {
        title: 'Tên dịch vụ',
        dataIndex: 'name'
      },
      {
        title: 'Tốc độ',
        dataIndex: 'speed',
        scopedSlots: { customRender: 'speed' }
      },
      {
        title: 'Giá',
        dataIndex: 'price'
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

</style>
