<template>
  <section class="TableList">
    <a-divider orientation="left">
      Danh sách khiếu nại của khách hàng
    </a-divider>
    <div class="header-tongquan">
      <a-input-search
        placeholder="Nhập thông tin khiếu nại"
        style="width: 20%"
        @search="onSearch"
      />
      <a-icon
        type="plus-square"
        style="font-size: 28px; margin-left: 10px"
        @click="showAdd()"
      />
      <a-modal v-model="visibleAdd" title="Thêm Khiếu Nại" on-ok="handleOk">
        <template slot="footer">
          <div style="display: flex; justify-content: space-between">
            <a-button style="margin-left: 10px" @click="handleCancel">
              Hủy
            </a-button>
            <a-button
              :loading="isSubmit"
              type="primary"
              @click="handleSubmitAdd"
            >
              Lưu
            </a-button>
          </div>
        </template>
        <div
          style="
            position: relative;
            top: 50%;
            left: 60%;
            transform: translateX(-50%);
          "
        >
          <a-form
            :form="formAdd"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-form-item label="Tên khiếu nại">
              <a-input
                v-decorator="[
                  'complainName',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Nhập trường tên khiếu nại',
                      },
                    ],
                  },
                ]"
                placeholder="Tên khiếu nại"
              />
            </a-form-item>
            <a-form-item
              label="Tên Khách Hàng"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 12 }"
            >
              <div style="display: flex">
                <a-select
                  v-decorator="[
                    'customerName',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Chọn Khách Hàng',
                        },
                      ],
                    },
                  ]"
                  placeholder="Chọn Khách Hàng"
                  @change="handleSelectChangeAddCustomerSelect"
                >
                  <a-select-option
                    v-for="customer in datacustomer"
                    :key="customer.id"
                    :value="customer.id"
                  >
                    {{ customer.name }}
                  </a-select-option>
                </a-select>
              </div>
            </a-form-item>
            <a-form-item
              label="Ngày Gửi"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 11 }"
            >
              <a-date-picker
                v-decorator="[
                  'receivedDate',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Chọn Ngày Gửi',
                      },
                    ],
                  },
                ]"
                type="date"
                placeholder="Chọn ngày"
                style="width: 100%"
                format="YYYY-MM-DD"
              />
            </a-form-item>
            <a-form-item
              label="Nội Dung"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 11 }"
            >
              <a-input
                v-decorator="[
                  'description',
                  {
                    rules: [{ required: true, message: 'Nhập Nội Dung' }],
                  },
                ]"
                placeholder="Nội Dung"
                type="textarea"
              />
            </a-form-item>
            <a-form-item label="Trạng Thái">
              <a-input
                placeholder="Trạng Thái"
                default-value="Đang Phê Duyệt"
                disabled="true"
              />
            </a-form-item>
          </a-form>
        </div>
      </a-modal>
    </div>
    <div>
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="Đang Phê Duyệt">
          <a-table
            :columns="columns"
            :data-source="dataComplaint"
            :row-key="(data) => data.id"
            bordered
          >
            <span slot="statusName" slot-scope="statusName, record">
              <a-popconfirm
                v-if="dataComplaint.length"
                title="Bạn có chắc muốn phê duyệt khiếu nại này?"
                @confirm="() => onStatus(record.id)"
              >
                <a-tag color="volcano" style="font-size: 14px; cursor: pointer">
                  {{ statusName }}
                </a-tag>
              </a-popconfirm>
            </span>
            <span slot="action" slot-scope="text, record">
              <a-icon type="mail" style="font-size: 18px" @click="sendEmail(record.customerEmail)" />
              <a-divider type="vertical" />
              <a-icon
                type="eye"
                style="font-size: 18px"
                @click="showEdit(record.id)"
              />
              <a-modal
                v-model="visible2"
                title="Chi Tiết Khiếu Nại"
                :confirm-loading="confirmLoading"
                @ok="handleOk"
              >
                <template slot="footer">
                  <div style="display: flex; justify-content: space-between">
                    <a-button style="margin-left: 10px" @click="handleCancel">
                      Hủy
                    </a-button>
                    <a-button
                      :loading="isSubmit"
                      type="primary"
                      @click="handleSubmitEdit"
                    >
                      Lưu
                    </a-button>
                  </div>
                </template>
                <div
                  style="
                    position: relative;
                    top: 50%;
                    left: 60%;
                    transform: translateX(-50%);
                  "
                >
                  <a-form
                    :form="formEdit"
                    :label-col="{ span: 6 }"
                    :wrapper-col="{ span: 12 }"
                  >
                    <a-form-item label="Tên khiếu nại">
                      <a-input
                        v-decorator="[
                          'complainName',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Nhập trường tên khiếu nại',
                              },
                            ],
                          },
                        ]"
                        placeholder="Tên khiếu nại"
                      />
                    </a-form-item>
                    <a-form-item
                      label="Tên Khách Hàng"
                      :label-col="{ span: 6 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <div style="display: flex">
                        <a-select
                          v-decorator="[
                            'customerName',
                            {
                              rules: [
                                {
                                  required: true,
                                  message: 'Chọn Khách Hàng',
                                },
                              ],
                            },
                          ]"
                          placeholder="Chọn Khách Hàng"
                          @change="handleSelectChangeEditCustomerSelect"
                        >
                          <a-select-option
                            v-for="customer in datacustomer"
                            :key="customer.id"
                            :value="customer.id"
                          >
                            {{ customer.name }}
                          </a-select-option>
                        </a-select>
                      </div>
                    </a-form-item>
                    <a-form-item
                      label="Ngày Gửi"
                      :label-col="{ span: 6 }"
                      :wrapper-col="{ span: 11 }"
                    >
                      <a-date-picker
                        v-decorator="[
                          'receivedDate',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Chọn Ngày Gửi',
                              },
                            ],
                          },
                        ]"
                        type="date"
                        placeholder="Chọn ngày"
                        style="width: 100%"
                        format="MM-DD-YYYY"
                      />
                    </a-form-item>
                    <a-form-item
                      label="Nội Dung"
                      :label-col="{ span: 6 }"
                      :wrapper-col="{ span: 11 }"
                    >
                      <a-input
                        v-decorator="[
                          'description',
                          {
                            rules: [
                              { required: true, message: 'Nhập Nội Dung' },
                            ],
                          },
                        ]"
                        placeholder="Nội Dung"
                        type="textarea"
                      />
                    </a-form-item>
                    <a-form-item label="Trạng Thái">
                      <a-select
                        v-decorator="[
                          'statusName',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Chọn Trạng Thái',
                              },
                            ],
                          },
                        ]"
                        placeholder="Chọn Trạng Thái"
                        @change="handleSelectChangeEditStatusSelect"
                      >
                        <a-select-option
                          v-for="datastatuss in datastatus"
                          :key="datastatuss.name"
                          :value="datastatuss.name"
                        >
                          {{ datastatuss.name }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-form>
                </div>
              </a-modal>
              <a-divider type="vertical" />
              <a-popconfirm
                v-if="dataComplaint.length"
                title="Bạn có chắc muốn xóa khiếu nại này?"
                @confirm="() => onDelete(record.id)"
              >
                <a-icon
                  type="delete"
                  style="font-size: 18px; cursor: pointer"
                />
              </a-popconfirm>
            </span>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Đã Duyệt">
          <a-table
            :columns="columns"
            :data-source="dataComplaint1"
            :row-key="(data) => data.id"
            bordered
          >
            <span slot="statusName" slot-scope="statusName">
              <a-tag color="green" style="font-size: 14px">
                {{ statusName }}
              </a-tag>
            </span>
            <span slot="action" slot-scope="text, record">
              <a-icon
                type="eye"
                style="font-size: 18px"
                @click="showEdit1(record.id)"
              />
              <a-modal
                v-model="visible3"
                title="Chi Tiết Khiếu Nại"
                :confirm-loading="confirmLoading"
                @ok="handleOk"
              >
                <template slot="footer">
                  <div style="display: flex; justify-content: space-between">
                    <a-button style="margin-left: 10px" @click="handleCancel">
                      Hủy
                    </a-button>
                    <a-button
                      :loading="isSubmit"
                      type="primary"
                      @click="handleSubmitEdit1"
                    >
                      Lưu
                    </a-button>
                  </div>
                </template>
                <div
                  style="
                    position: relative;
                    top: 50%;
                    left: 60%;
                    transform: translateX(-50%);
                  "
                >
                  <a-form
                    :form="formEdit1"
                    :label-col="{ span: 6 }"
                    :wrapper-col="{ span: 12 }"
                  >
                    <a-form-item label="Tên khiếu nại">
                      <a-input
                        v-decorator="[
                          'complainName',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Nhập trường tên khiếu nại',
                              },
                            ],
                          },
                        ]"
                        placeholder="Tên khiếu nại"
                      />
                    </a-form-item>
                    <a-form-item
                      label="Tên Khách Hàng"
                      :label-col="{ span: 6 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <div style="display: flex">
                        <a-select
                          v-decorator="[
                            'customerName',
                            {
                              rules: [
                                {
                                  required: true,
                                  message: 'Chọn Khách Hàng',
                                },
                              ],
                            },
                          ]"
                          placeholder="Chọn Khách Hàng"
                          @change="handleSelectChangeEditCustomer1Select"
                        >
                          <a-select-option
                            v-for="customer in datacustomer"
                            :key="customer.id"
                            :value="customer.id"
                          >
                            {{ customer.name }}
                          </a-select-option>
                        </a-select>
                      </div>
                    </a-form-item>
                    <a-form-item
                      label="Ngày Gửi"
                      :label-col="{ span: 6 }"
                      :wrapper-col="{ span: 11 }"
                    >
                      <a-date-picker
                        v-decorator="[
                          'receivedDate',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Chọn Ngày Gửi',
                              },
                            ],
                          },
                        ]"
                        type="date"
                        placeholder="Chọn ngày"
                        style="width: 100%"
                        format="MM-DD-YYYY"
                      />
                    </a-form-item>
                    <a-form-item
                      label="Nội Dung"
                      :label-col="{ span: 6 }"
                      :wrapper-col="{ span: 11 }"
                    >
                      <a-input
                        v-decorator="[
                          'description',
                          {
                            rules: [
                              { required: true, message: 'Nhập Nội Dung' },
                            ],
                          },
                        ]"
                        placeholder="Nội Dung"
                        type="textarea"
                      />
                    </a-form-item>
                    <a-form-item label="Trạng Thái">
                      <a-select
                        v-decorator="[
                          'statusName',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Chọn Trạng Thái',
                              },
                            ],
                          },
                        ]"
                        placeholder="Chọn Trạng Thái"
                        @change="handleSelectChangeEditStatus1Select"
                      >
                        <a-select-option
                          v-for="datastatuss in datastatus"
                          :key="datastatuss.name"
                          :value="datastatuss.name"
                        >
                          {{ datastatuss.name }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-form>
                </div>
              </a-modal>
              <a-divider type="vertical" />

              <a-popconfirm
                v-if="dataComplaint1.length"
                title="Bạn có chắc muốn xóa khiếu nại này?"
                @confirm="() => onDelete(record.id)"
              >

                <a-icon
                  type="delete"
                  style="font-size: 18px; cursor: pointer"
                />

              </a-popconfirm>
            </span>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </div>
    <!-- <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="dataComplaint"
      :pagination="{ pageSize: 10 }"
      :loading="loading"
      bordered
    >
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
    </a-modal> -->
  </section>
</template>

<script lang="ts">

import { Context } from '@nuxt/types'
import { Vue, Component } from 'vue-property-decorator'
import { IComplaintResonse } from '@/src/enums/response/IComplaintResonse'
import { WrappedFormUtils } from 'ant-design-vue/types/form/form'
import { SearchComplain } from '@/src/enums/response/SearchComplain'
import { IdComplain } from '@/src/enums/response/IdComplain'
import { CustomerSelectResponse } from '~/src/enums/response/CustomerSelectResponse'
import { IEmail } from '~/src/models/request/emailRequest'
@Component({
  layout: 'menu',
  name: 'complaint',
  async asyncData (context: Context) {
    const dataComplaint = await context.$axios.$get(
      '/Complaint/getallcomplainstatus2'
    )
    const dataComplaint1 = await context.$axios.$get(
      '/Complaint/getallcomplainstatus1'
    )
    const datacustomer = await context.$axios.$get('/Complaint/getallcustomercomplaint')
    const datastatus = await context.$axios.$get('/Complaint/getallstatuscomplaint')
    return {
      dataComplaint,
      dataComplaint1,
      datastatus,
      datacustomer
    }
  }
})
export default class Complaint extends Vue {
  private visible: boolean = false;
  private visible2: boolean = false;
     private $message: any;
  private visible3: boolean = false;
  private isSubmit: boolean = false;
  private dataComplaint: Array<IComplaintResonse> = [];
  private dataComplaint1: Array<IComplaintResonse> = [];
  private formComplaint!: WrappedFormUtils;
  private complainInfo: any;
  private datacustomer: Array<CustomerSelectResponse> = [];
  private formAdd!: WrappedFormUtils;
  private formEdit!: WrappedFormUtils;
  private formEdit1!: WrappedFormUtils;
  private visibleAdd: boolean = false;
  private complainId: number = 0;
  private datastatus: Array<String> = []
  private customerComplainId: number = 0;
  private customerId: number = 0;
  private confirmLoading: boolean = false;
  private tabkey: number = 1;
  private email!:IEmail
  statusComplain: IdComplain = {
    id: 0
  };

  private deleteComplain: IdComplain = {
    id: 0
  };

  private searchComplain: SearchComplain = {
    name: ''
  };

  $notification: any;

  private loading: boolean = false;
  private columns: Array<any> = [
    {
      title: 'STT',
      key: 'id',
      align: 'center',
      dataIndex: 'id'
    },
    {
      title: 'Khách hàng',
      key: 'customerName',
      align: 'center',
      dataIndex: 'customerName'
    },
    {
      title: 'Khiếu nại',
      key: 'complainName',
      align: 'center',
      dataIndex: 'complainName'
    },
    {
      title: 'Ngày nhận',
      key: 'receivedDate',
      align: 'center',
      dataIndex: 'receivedDate'
    },
    {
      title: 'Trạng thái',
      key: 'statusName',
      align: 'center',
      dataIndex: 'statusName',
      scopedSlots: { customRender: 'statusName' }
    },
    {
      title: 'Hành động',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      align: 'center'
    }
  ];

  openNotification (result: boolean): void {
    this.$notification.config({
      duration: 1
    })
    if (result) {
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
    this.formEdit = this.$form.createForm(this)
    this.formAdd = this.$form.createForm(this)
    this.formComplaint = this.$form.createForm(this)
    this.formEdit1 = this.$form.createForm(this)
  }

  showAdd () {
    this.isSubmit = false
    this.visibleAdd = true
    this.formAdd.resetFields()
  }

  showEdit (key: number) {
    this.isSubmit = false
    this.visible2 = true
    this.formEdit.resetFields()
    this.complainInfo = this.dataComplaint.find(x => x.id == key)
    this.complainId = this.complainInfo.complainId
    this.customerComplainId = this.complainInfo.id
    this.customerId = this.complainInfo.customerId
    this.formEdit.getFieldDecorator('complainName', { initialValue: '' })
    this.formEdit.getFieldDecorator('customerName', { initialValue: '' })
    this.formEdit.getFieldDecorator('description', { initialValue: '' })
    this.formEdit.getFieldDecorator('receivedDate', { initialValue: '' })
    this.formEdit.getFieldDecorator('statusName', { initialValue: '' })
    this.formEdit.setFields({
      name: { value: this.complainInfo.name }
    })
    this.formEdit.setFields({
      complainName: { value: this.complainInfo.complainName }
    })
    this.formEdit.setFields({
      customerName: { value: this.complainInfo.customerName }
    })
    this.formEdit.setFields({
      description: { value: this.complainInfo.description }
    })
    this.formEdit.setFields({
      receivedDate: { value: this.complainInfo.receivedDate }
    })
    this.formEdit.setFields({
      statusName: { value: this.complainInfo.statusName }
    })
  }

  showEdit1 (key: number) {
    this.isSubmit = false
    this.visible3 = true
    this.formEdit1.resetFields()
    this.complainInfo = this.dataComplaint1.find(x => x.id == key)
    this.complainId = this.complainInfo.complainId
    this.customerComplainId = this.complainInfo.id
    this.customerId = this.complainInfo.customerId
    this.formEdit1.getFieldDecorator('complainName', { initialValue: '' })
    this.formEdit1.getFieldDecorator('customerName', { initialValue: '' })
    this.formEdit1.getFieldDecorator('description', { initialValue: '' })
    this.formEdit1.getFieldDecorator('receivedDate', { initialValue: '' })
    this.formEdit1.getFieldDecorator('statusName', { initialValue: '' })
    this.formEdit1.setFields({
      name: { value: this.complainInfo.name }
    })
    this.formEdit1.setFields({
      complainName: { value: this.complainInfo.complainName }
    })
    this.formEdit1.setFields({
      customerName: { value: this.complainInfo.customerName }
    })
    this.formEdit1.setFields({
      description: { value: this.complainInfo.description }
    })
    this.formEdit1.setFields({
      receivedDate: { value: this.complainInfo.receivedDate }
    })
    this.formEdit1.setFields({
      statusName: { value: this.complainInfo.statusName }
    })
  }

  handleOk (e: any) {
    this.confirmLoading = true
    setTimeout(() => {
      this.visibleAdd = false
      this.visible2 = false
      this.confirmLoading = false
    }, 200)
  }

  showModal () {
    this.formComplaint.resetFields()
    this.visible = true
  }

  handleSubmitAdd (e: any) {
    e.preventDefault()
    this.formAdd.validateFields((err: any, values: IComplaintResonse) => {
      if (!err) {
        this.isSubmit = true
        values.customerId = this.customerId
        this.$axios
          .$post('/Complain/createcomplain', values)
          .then(async (response) => {
            this.visibleAdd = false
            this.isSubmit = false
            this.openNotification(true)
            this.dataComplaint = response
          })
          .catch((error) => {
            this.visibleAdd = false
            this.isSubmit = false
             this.$message.warning('Bạn không có quyền thực hiện')
          })
      }
    })
  }

  handleSubmitEdit (e: any) {
    e.preventDefault()
    this.formEdit.validateFields((err: any, values: IComplaintResonse) => {
      if (!err) {
        this.isSubmit = true
        values.customerId = this.customerId
        values.complainId = this.complainId
        values.id = this.customerComplainId
        this.$axios
          .$post('/Complain/updatecomplain', values)
          .then(async (response) => {
            this.visible2 = false
            this.isSubmit = false
            this.dataComplaint = await this.$axios.$get('/Complaint/getallcomplainstatus2')
            this.dataComplaint1 = await this.$axios.$get('/Complaint/getallcomplainstatus1')
            this.openNotification(true)
          })
          .catch((error) => {
            this.visible2 = false
            this.isSubmit = false
            this.$message.warning('Bạn không có quyền thực hiện')
          })
      }
    })
  }

  handleSubmitEdit1 (e: any) {
    e.preventDefault()
    this.formEdit1.validateFields((err: any, values: IComplaintResonse) => {
      if (!err) {
        this.isSubmit = true
        values.customerId = this.customerId
        values.complainId = this.complainId
        values.id = this.customerComplainId
        this.$axios
          .$post('/Complaint/updatecomplain', values)
          .then(async (response) => {
            this.visible3 = false
            this.isSubmit = false
            this.dataComplaint = await this.$axios.$get('/Complaint/getallcomplainstatus2')
            this.dataComplaint1 = await this.$axios.$get('/Complaint/getallcomplainstatus1')
            this.openNotification(true)
          })
          .catch((error) => {
            this.visible3 = false
            this.isSubmit = false
            this.$message.warning('Bạn không có quyền thực hiện')
          })
      }
    })
  }

  closeModal () {
    this.formComplaint.resetFields()
    this.visible = false
  }

  handleCancel () {
    this.visible = false
    this.visible2 = false
    this.visibleAdd = false
    this.visible3 = false
  }

  onDelete (key: number) {
    this.deleteComplain = {
      id: key
    }
    this.$axios
      .$post('/Complaint/deletecomplain', this.deleteComplain)
      .then((response) => {
        this.dataComplaint = this.dataComplaint.filter(
          item => item.id !== key
        )
        this.dataComplaint1 = this.dataComplaint1.filter(
          item => item.id !== key
        )
        this.openNotification(response)
      })
      .catch((error) => {
        this.$message.warning('Bạn không có quyền thực hiện')
      })
  }

  onStatus (key: number) {
    this.statusComplain.id = key
    this.$axios
      .$post('/Complaint/updatestatus', this.statusComplain)
      .then(async (response) => {
        this.dataComplaint = await this.$axios.$get(
          '/Complaint/getallcomplainstatus2'
        )
        this.dataComplaint1 = await this.$axios.$get(
          '/Complaint/getallcomplainstatus1'
        )
        this.openNotification(response)
      })
      .catch((error) => {
        this.$message.warning('Bạn không có quyền thực hiện')
      })
  }

  sendEmail (email:string) {
    this.email = { email }
    this.$axios.$post('/Mail/send-mail', this.email)
      .then((response) => {
        if (response === true) {
          this.$notification.success({
            message: 'Gửi thành công'
          })
        } else {
          this.$notification.error({
            message: 'Gửi không thành công'
          })
        }
      })
  }
  // changeStatus (key: number) {
  //   this.$axios.$post('/Complaint/change-status-complaint/' + key).then((response) => {
  //     if (response !== null) {
  //       this.openNotification(true)
  //       this.dataComplaint = response
  //     } else {
  //       this.openNotification(false)
  //     }
  //   })
  // }

  // showEditComplaint (key: number) {
  //   this.showModal()
  //   this.dataSource = this.dataComplaint.find(x => x.id === key)
  //   this.formComplaint.getFieldDecorator('id', { initialValue: undefined })
  //   this.formComplaint.getFieldDecorator('employeeID', { initialValue: undefined })
  //   this.formComplaint.setFields({
  //     id: { value: this.dataSource.id },
  //     employeeID: { value: this.dataSource.employeeID }
  //   })
  // }
  callback (key: number) {
    console.log(key)
    this.tabkey = key
  }

  onSubmitComplaint (e: any) {
    e.preventDefault()
  }

  async onSearch (values: string) {
    this.searchComplain.name = values
    console.log(this.tabkey)
    if (this.tabkey == 1) {
      this.$axios
        .$post('/Complaint/searchcomplainstatus2', this.searchComplain)
        .then((response) => {
          this.dataComplaint = response
        })
        .catch((error) => {
          this.openNotification(error)
        })
    } else {
      this.$axios
        .$post('/Complaint/searchcomplainstatus1', this.searchComplain)
        .then((response) => {
          this.dataComplaint1 = response
        })
        .catch((error) => {
          this.openNotification(error)
        })
    }
  }

  handleSelectChangeEditCustomerSelect (value: any) {
    console.log(value)
    this.customerId = value
    this.formEdit.setFieldsValue({ value })
  }

  handleSelectChangeAddCustomerSelect (value: any) {
    console.log(value)
    this.customerId = value
    this.formAdd.setFieldsValue({ value })
  }

  handleSelectChangeEditCustomer1Select (value: any) {
    console.log(value)
    this.customerId = value
    this.formEdit1.setFieldsValue({ value })
  }

  handleSelectChangeEditStatus1Select (value: any) {
    console.log(value)
    this.formEdit1.setFieldsValue({ value })
  }

  handleSelectChangeEditStatusSelect (value: any) {
    this.formEdit.setFieldsValue({ value })
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
.buttonback {
  display: flex;
  justify-content: right;
  align-items: right;
  text-align: center;
  margin-bottom: 10px;
}
.header-tongquan {
  display: flex;
  justify-content: flex-end;
  margin: 25px 5px;
  align-items: center;
}
</style>
