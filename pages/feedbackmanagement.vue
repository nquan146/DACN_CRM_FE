<template>
  <section class="TableList">
    <a-divider orientation="left">
      Danh sách phản hồi của khách hàng
    </a-divider>
    <div class="header-tongquan">
      <a-input-search
        placeholder="Nhập thông tin phản hồi
        "
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
            <a-form-item label="Tiêu Đề">
              <a-input
                v-decorator="[
                  'title',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Nhập trường tên tiêu đề',
                      },
                    ],
                  },
                ]"
                placeholder="Tên Tiêu Đề"
              />
            </a-form-item>
            <a-form-item
              label="Ngày Gửi"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 11 }"
            >
              <a-date-picker
                v-decorator="[
                  'recievedDate',
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
                    v-for="customers in datacustomer"
                    :key="customers.id"
                    :value="customers.id"
                  >
                    {{ customers.name }}
                  </a-select-option>
                </a-select>
              </div>
            </a-form-item>
            <a-form-item
              label="Loại Phản Hồi"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 12 }"
            >
              <div style="display: flex">
                <a-select
                  v-decorator="[
                    'typeName',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Chọn Loại Phản Hồi',
                        },
                      ],
                    },
                  ]"
                  placeholder="Chọn Loại Phản Hồi"
                  @change="handleSelectChangeAddTypeSelect"
                >
                  <a-select-option
                    v-for="types in datatypefeed"
                    :key="types.id"
                    :value="types.id"
                  >
                    {{ types.name }}
                  </a-select-option>
                </a-select>
              </div>
            </a-form-item>
            <a-form-item
              label="Tên Nhân Viên"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 12 }"
            >
              <div style="display: flex">
                <a-select
                  v-decorator="['employeeName']"
                  :disabled="disabled"
                  placeholder="Chọn Nhân Viên"
                  @change="handleSelectChangeAddEmployeeSelect"
                >
                  <a-select-option
                    v-for="employee in dataEmployee"
                    :key="employee.id"
                    :value="employee.id"
                  >
                    {{ employee.name }}
                  </a-select-option>
                </a-select>
              </div>
            </a-form-item>
            <a-form-item
              label="Nội Dung"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 11 }"
            >
              <a-input
                v-decorator="[
                  'content',
                  {
                    rules: [{ required: true, message: 'Nhập Nội Dung' }],
                  },
                ]"
                placeholder="Nội Dung"
                type="textarea"
              />
            </a-form-item>
          </a-form>
        </div>
      </a-modal>
    </div>
    <div>
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="Dịch vụ">
          <a-table
            :columns="columns"
            :data-source="dataFeedBack2"
            :row-key="(data) => data.id"
            bordered
          >
            <span slot="customerName" slot-scope="customerName">
              <a-tag color="geekblue" style="font-size: 14px">
                {{ customerName }}
              </a-tag>
            </span>
            <span slot="action" slot-scope="text, record">
              <a-icon
                type="mail"
                style="font-size: 18px"
                @click="sendEmail(record.customerEmail)"
              />
              <a-divider type="vertical" />
              <a-icon
                type="eye"
                style="font-size: 18px"
                @click="showEdit(record.id)"
              />
              <a-modal
                v-model="visible2"
                title="Chi Tiết Phản Hồi"
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
                    <a-form-item label="Tiêu Đề">
                      <a-input
                        v-decorator="[
                          'title',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Nhập trường tên tiêu đề',
                              },
                            ],
                          },
                        ]"
                        placeholder="Tên Tiêu Đề"
                      />
                    </a-form-item>
                    <a-form-item
                      label="Ngày Gửi"
                      :label-col="{ span: 6 }"
                      :wrapper-col="{ span: 11 }"
                    >
                      <a-date-picker
                        v-decorator="[
                          'recievedDate',
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
                            v-for="customers in datacustomer"
                            :key="customers.id"
                            :value="customers.id"
                          >
                            {{ customers.name }}
                          </a-select-option>
                        </a-select>
                      </div>
                    </a-form-item>
                    <a-form-item
                      label="Loại Phản Hồi"
                      :label-col="{ span: 6 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <div style="display: flex">
                        <a-select
                          v-decorator="[
                            'typeName',
                            {
                              rules: [
                                {
                                  required: true,
                                  message: 'Chọn Loại Phản Hồi',
                                },
                              ],
                            },
                          ]"
                          placeholder="Chọn Loại Phản Hồi"
                          @change="handleSelectChangeEditTypeSelect"
                        >
                          <a-select-option
                            v-for="types in datatypefeed"
                            :key="types.id"
                            :value="types.id"
                          >
                            {{ types.name }}
                          </a-select-option>
                        </a-select>
                      </div>
                    </a-form-item>
                    <a-form-item
                      label="Tên Nhân Viên"
                      :label-col="{ span: 6 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <div style="display: flex">
                        <a-select
                          v-decorator="['employeeName']"
                          :disabled="disabled1"
                          placeholder="Chọn Nhân Viên"
                          @change="handleSelectChangeEditEmployeeSelect"
                        >
                          <a-select-option
                            v-for="employee in dataEmployee"
                            :key="employee.id"
                            :value="employee.id"
                          >
                            {{ employee.name }}
                          </a-select-option>
                        </a-select>
                      </div>
                    </a-form-item>
                    <a-form-item
                      label="Nội Dung"
                      :label-col="{ span: 6 }"
                      :wrapper-col="{ span: 11 }"
                    >
                      <a-input
                        v-decorator="[
                          'content',
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
                  </a-form>
                </div>
              </a-modal>
              <a-divider type="vertical" />
              <a-popconfirm
                v-if="dataFeedBack2.length"
                title="Bạn có chắc muốn xóa phản hồi này?"
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
        <a-tab-pane key="2" tab="Nhân Viên">
          <a-table
            :columns="column"
            :data-source="dataFeedBack1"
            :row-key="(data) => data.id"
            bordered
          >
            <span slot="customerName" slot-scope="customerName">
              <a-tag color="geekblue" style="font-size: 14px">
                {{ customerName }}
              </a-tag>
            </span>
            <span slot="employeeName" slot-scope="employeeName">
              <a-tag color="green" style="font-size: 14px">
                {{ employeeName }}
              </a-tag>
            </span>
            <span slot="action" slot-scope="text, record">
              <a-icon
                type="mail"
                style="font-size: 18px"
                @click="sendEmail(record.customerEmail)"
              />
              <a-divider type="vertical" />
              <a-icon
                type="eye"
                style="font-size: 18px"
                @click="showEdit1(record.id)"
              />
              <a-modal
                v-model="visible3"
                title="Chi Tiết Phản Hồi"
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
                    <a-form-item label="Tiêu Đề">
                      <a-input
                        v-decorator="[
                          'title',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Nhập trường tên tiêu đề',
                              },
                            ],
                          },
                        ]"
                        placeholder="Tên Tiêu Đề"
                      />
                    </a-form-item>
                    <a-form-item
                      label="Ngày Gửi"
                      :label-col="{ span: 6 }"
                      :wrapper-col="{ span: 11 }"
                    >
                      <a-date-picker
                        v-decorator="[
                          'recievedDate',
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
                          @change="handleSelectChangeEdit1CustomerSelect"
                        >
                          <a-select-option
                            v-for="customers in datacustomer"
                            :key="customers.id"
                            :value="customers.id"
                          >
                            {{ customers.name }}
                          </a-select-option>
                        </a-select>
                      </div>
                    </a-form-item>
                    <a-form-item
                      label="Loại Phản Hồi"
                      :label-col="{ span: 6 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <div style="display: flex">
                        <a-select
                          v-decorator="[
                            'typeName',
                            {
                              rules: [
                                {
                                  required: true,
                                  message: 'Chọn Loại Phản Hồi',
                                },
                              ],
                            },
                          ]"
                          placeholder="Chọn Loại Phản Hồi"
                          @change="handleSelectChangeEdit1TypeSelect"
                        >
                          <a-select-option
                            v-for="types in datatypefeed"
                            :key="types.id"
                            :value="types.id"
                          >
                            {{ types.name }}
                          </a-select-option>
                        </a-select>
                      </div>
                    </a-form-item>
                    <a-form-item
                      label="Tên Nhân Viên"
                      :label-col="{ span: 6 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <div style="display: flex">
                        <a-select
                          v-decorator="['employeeName']"
                          :disabled="disabled2"
                          placeholder="Chọn Nhân Viên"
                          @change="handleSelectChangeEdit1EmployeeSelect"
                        >
                          <a-select-option
                            v-for="employee in dataEmployee"
                            :key="employee.id"
                            :value="employee.id"
                          >
                            {{ employee.name }}
                          </a-select-option>
                        </a-select>
                      </div>
                    </a-form-item>
                    <a-form-item
                      label="Nội Dung"
                      :label-col="{ span: 6 }"
                      :wrapper-col="{ span: 11 }"
                    >
                      <a-input
                        v-decorator="[
                          'content',
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
                  </a-form>
                </div>
              </a-modal>

              <a-divider type="vertical" />
              <a-popconfirm
                v-if="dataFeedBack1.length"
                title="Bạn có chắc muốn xóa phản hồi này?"
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
import { IFeedBackResponse } from '@/src/enums/response/IFeedBackResponse'
import { WrappedFormUtils } from 'ant-design-vue/types/form/form'
import { IdFeedBack } from '@/src/enums/response/IdFeedBack'
import { SearchFeedBack } from '@/src/enums/response/SearchFeedBack'
import { CustomerSelectResponse } from '~/src/enums/response/CustomerSelectResponse'
import { EmployeeSelectReponse } from '~/src/enums/response/EmployeeSelectReponse'
import { ITypeFeedSelectResponse } from '~/src/enums/response/ITypeFeedSelectResponse'
import { IEmail } from '~/src/models/request/emailRequest'
@Component({
  layout: 'menu',
  name: 'feedback',
  async asyncData (context: Context) {
    const dataFeedBack1 = await context.$axios.$get('/FeedBacks/GetFeedBack1')
    const dataFeedBack2 = await context.$axios.$get('/FeedBacks/GetFeedBack2')
    const dataEmployee = await context.$axios.$get('/FeedBacks/getallemployee')
    const datatypefeed = await context.$axios.$get('/FeedBacks/getalltypeFeed')
    const datacustomer = await context.$axios.$get(
      '/Complaint/getallcustomercomplaint'
    )
    return {
      dataFeedBack1,
      dataFeedBack2,
      dataEmployee,
      datacustomer,
      datatypefeed
    }
  }
})
export default class Feedback extends Vue {
  private visible: boolean = false;
  private dataFeedBack2: Array<IFeedBackResponse> = [];
  private visible2: boolean = false;
  private visible3: boolean = false;
  private formAdd!: WrappedFormUtils;
  private isSubmit: boolean = false;
  private formEdit!: WrappedFormUtils;
  private formEdit1!: WrappedFormUtils;
  private feedbackId: number = 0;
  private dataFeedBack1: Array<IFeedBackResponse> = [];
  private formComplaint!: WrappedFormUtils;
  private visibleAdd: boolean = false;
  private tabkey: number = 1;
  private typeId: number = 0;
  private confirmLoading: boolean = false;
  private employeeID: number = 0;
  private employeename: String = '';
  private customername: String = '';
  private typefeedname: String = '';
  private feedbackInfo: any;
  private dataemployee: Array<EmployeeSelectReponse> = [];
  private datacustomer: Array<CustomerSelectResponse> = [];
  private datatypefeed: Array<ITypeFeedSelectResponse> = [];
  private disabled: boolean = true;
  private disabled2: boolean = false;
  private disabled1: boolean = true;
  private customerId: number = 0;
    private $message: any;
  private searchFeedBack: SearchFeedBack = {
    value: ''
  };

  private email!:IEmail

  private deleteFeedBack: IdFeedBack = {
    id: 0
  };

  $notification: any;

  private loading: boolean = false;
  private column: Array<any> = [
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
      dataIndex: 'customerName',
      scopedSlots: { customRender: 'customerName' }
    },
    {
      title: 'Nhân viên',
      key: 'employeeName',
      align: 'center',
      dataIndex: 'employeeName',
      scopedSlots: { customRender: 'employeeName' }
    },
    {
      title: 'Tiêu đề',
      key: 'title',
      align: 'center',
      dataIndex: 'title'
    },
    {
      title: 'Nội dung',
      key: 'content',
      align: 'center',
      dataIndex: 'content'
    },
    {
      title: 'Ngày nhận',
      key: 'recievedDate',
      align: 'center',
      dataIndex: 'recievedDate'
    },
    {
      title: 'Hành động',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      align: 'center'
    }
  ];

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
      dataIndex: 'customerName',
      scopedSlots: { customRender: 'customerName' }
    },
    {
      title: 'Tiêu đề',
      key: 'title',
      align: 'center',
      dataIndex: 'title'
    },
    {
      title: 'Nội dung',
      key: 'content',
      align: 'center',
      dataIndex: 'content'
    },
    {
      title: 'Ngày nhận',
      key: 'recievedDate',
      align: 'center',
      dataIndex: 'recievedDate'
    },
    {
      title: 'Hành động',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      align: 'center'
    }
  ];

  filterOption (input:any, option:any) {
    return (
      option.componentOptions.employeeName[0].text.toLowerCase().includes(input.toLowerCase()) >= 0
    )
  }

  onDelete (key: number) {
    this.deleteFeedBack = {
      id: key
    }
    this.$axios
      .$post('/FeedBacks/removefeedback', this.deleteFeedBack)
      .then((response) => {
        this.dataFeedBack2 = this.dataFeedBack2.filter(
          item => item.id !== key
        )
        this.dataFeedBack1 = this.dataFeedBack1.filter(
          item => item.id !== key
        )
        this.openNotification(response)
      })
      .catch((error) => {
        this.$message.warning('Bạn không có quyền thực hiện')
      })
  }

  showAdd () {
    this.isSubmit = false
    this.visibleAdd = true
    this.formAdd.resetFields()
  }

  handleSubmitAdd (e: any) {
    e.preventDefault()
    this.formAdd.validateFields((err: any, values: IFeedBackResponse) => {
      if (!err) {
        this.isSubmit = true
        values.customerId = this.customerId
        values.typeId = this.typeId
        values.employeeId = this.employeeID
        values.customerName = this.customername
        values.typeName = this.typefeedname
        values.employeeName = this.employeename
        this.$axios
          .$post('/FeedBacks/create', values)
          .then(async (response) => {
            this.visibleAdd = false
            this.isSubmit = false
            this.openNotification(response)
            this.dataFeedBack1 = await this.$axios.$get(
              '/FeedBacks/GetFeedBack1'
            )
            this.dataFeedBack2 = await this.$axios.$get(
              '/FeedBacks/GetFeedBack2'
            )
          })
          .catch((error) => {
            this.visibleAdd = false
            this.isSubmit = false
            this.$message.warning('Bạn không có quyền thực hiện')
          })
      }
    })
  }

  handleSelectChangeAddTypeSelect (value: any) {
    this.typeId = value
    if (this.typeId === 1) {
      this.disabled = !this.disabled
    } else {
      this.disabled = true
    }
    const a = this.datatypefeed.find(x => x.id === value)
    this.typefeedname = a.name
    this.formAdd.setFieldsValue({ value })
  }

  handleSelectChangeAddCustomerSelect (value: any) {
    console.log(value)
    this.customerId = value
    const a = this.datacustomer.find(x => x.id === value)
    this.customername = a.name
    this.formAdd.setFieldsValue({ value })
  }

  handleSelectChangeAddEmployeeSelect (value: any) {
    console.log(value)
    this.employeeID = value
    this.formAdd.setFieldsValue({ value })
  }

  handleSelectChangeEdit1TypeSelect (value: any) {
    console.log(value)
    this.typeId = value
    if (this.typeId == 1) {
      this.disabled2 = !this.disabled2
    } else {
      this.disabled2 = true
    }
    const a = this.datatypefeed.find(x => x.id === value)
    this.typefeedname = a.name
    this.formEdit1.setFieldsValue({ value })
  }

  handleSelectChangeEdit1CustomerSelect (value: any) {
    console.log(value)
    this.customerId = value
    const a = this.datacustomer.find(x => x.id === value)
    this.customername = a.name
    this.formEdit1.setFieldsValue({ value })
  }

  handleSelectChangeEdit1EmployeeSelect (value: any) {
    console.log(value)
    this.employeeID = value
    this.formEdit1.setFieldsValue({ value })
  }

  showEdit (key: number) {
    this.isSubmit = false
    this.visible2 = true
    this.formEdit.resetFields()
    this.feedbackInfo = this.dataFeedBack2.find(x => x.id === key)
    this.customerId = this.feedbackInfo.customerId
    this.customername = this.feedbackInfo.customerName
    this.employeename = this.feedbackInfo.employeeName
    this.typefeedname = this.feedbackInfo.typefeedname
    this.typeId = this.feedbackInfo.typeId
    this.feedbackId = key
    this.employeeID = this.feedbackInfo.employeeId
    this.formEdit.getFieldDecorator('title', { initialValue: '' })
    this.formEdit.getFieldDecorator('recievedDate', { initialValue: '' })
    this.formEdit.getFieldDecorator('customerName', { initialValue: '' })
    this.formEdit.getFieldDecorator('typeName', { initialValue: '' })
    this.formEdit.getFieldDecorator('employeeName', { initialValue: '' })
    this.formEdit.getFieldDecorator('content', { initialValue: '' })
    this.formEdit.setFields({
      title: { value: this.feedbackInfo.title }
    })
    this.formEdit.setFields({
      recievedDate: { value: this.feedbackInfo.recievedDate }
    })
    this.formEdit.setFields({
      customerName: { value: this.feedbackInfo.customerName }
    })
    this.formEdit.setFields({
      typeName: { value: this.feedbackInfo.typeName }
    })
    this.formEdit.setFields({
      employeeName: { value: this.feedbackInfo.employeeName }
    })
    this.formEdit.setFields({
      content: { value: this.feedbackInfo.content }
    })
  }

  showEdit1 (key: number) {
    this.isSubmit = false
    this.disabled2 = false
    this.visible3 = true
    this.formEdit1.resetFields()
    this.feedbackInfo = this.dataFeedBack1.find(x => x.id === key)
    this.customerId = this.feedbackInfo.customerId
    this.customername = this.feedbackInfo.customerName
    this.typefeedname = this.feedbackInfo.typefeedname
    this.employeeID = this.feedbackInfo.employeeId
    this.employeename = this.feedbackInfo.employeeName
    this.feedbackId = key
    this.typeId = this.feedbackInfo.typeId
    this.formEdit1.getFieldDecorator('title', { initialValue: '' })
    this.formEdit1.getFieldDecorator('recievedDate', { initialValue: '' })
    this.formEdit1.getFieldDecorator('customerName', { initialValue: '' })
    this.formEdit1.getFieldDecorator('typeName', { initialValue: '' })
    this.formEdit1.getFieldDecorator('employeeName', { initialValue: '' })
    this.formEdit1.getFieldDecorator('content', { initialValue: '' })
    this.formEdit1.setFields({
      title: { value: this.feedbackInfo.title }
    })
    this.formEdit1.setFields({
      recievedDate: { value: this.feedbackInfo.recievedDate }
    })
    this.formEdit1.setFields({
      customerName: { value: this.feedbackInfo.customerName }
    })
    this.formEdit1.setFields({
      typeName: { value: this.feedbackInfo.typeName }
    })
    this.formEdit1.setFields({
      employeeName: { value: this.feedbackInfo.employeeName }
    })
    this.formEdit1.setFields({
      content: { value: this.feedbackInfo.content }
    })
  }

  handleSubmitEdit (e: any) {
    e.preventDefault()
    this.formEdit.validateFields((err: any, values: IFeedBackResponse) => {
      if (!err) {
        this.isSubmit = true
        this.disabled = true
        values.customerId = this.customerId
        values.employeeId = this.employeeID
        values.id = this.feedbackId
        values.customerName = this.customername
        values.typeId = this.typeId
        values.typeName = this.typefeedname
        values.employeeName = this.employeename
        this.$axios
          .$post('/FeedBacks/UpdateFeedBack', values)
          .then(async (response) => {
            this.visible2 = false
            this.isSubmit = false
            this.dataFeedBack1 = await this.$axios.$get(
              '/FeedBacks/GetFeedBack1'
            )
            this.dataFeedBack2 = await this.$axios.$get(
              '/FeedBacks/GetFeedBack2'
            )
            this.openNotification(response)
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
    this.formEdit1.validateFields((err: any, values: IFeedBackResponse) => {
      if (!err) {
        this.isSubmit = true
        values.customerId = this.customerId
        values.employeeId = this.employeeID
        values.id = this.feedbackId
        values.customerName = this.customername
        values.typeId = this.typeId
        values.typeName = this.typefeedname
        values.employeeName = this.employeename
        this.$axios
          .$post('/FeedBacks/UpdateFeedBack', values)
          .then(async (response) => {
            this.visible3 = false
            this.isSubmit = false
            this.dataFeedBack1 = await this.$axios.$get(
              '/FeedBacks/GetFeedBack1'
            )
            this.dataFeedBack2 = await this.$axios.$get(
              '/FeedBacks/GetFeedBack2'
            )
            this.openNotification(response)
          })
          .catch((error) => {
            this.visible3 = false
            this.isSubmit = false
            this.$message.warning('Bạn không có quyền thực hiện')
          })
      }
    })
  }

  handleSelectChangeEditTypeSelect (value: any) {
    console.log(value)
    this.typeId = value
    if (this.typeId == 1) {
      this.disabled1 = !this.disabled1
    } else {
      this.disabled1 = true
    }
    const a = this.datatypefeed.find(x => x.id == value)
    this.typefeedname = a.name
    this.formEdit.setFieldsValue({ value })
  }

  handleSelectChangeEditCustomerSelect (value: any) {
    console.log(value)
    this.customerId = value
    const a = this.datacustomer.find(x => x.id == value)
    this.customername = a.name
    this.formEdit.setFieldsValue({ value })
  }

  handleSelectChangeEditEmployeeSelect (value: any) {
    console.log(value)
    this.employeeID = value
    this.formEdit.setFieldsValue({ value })
  }

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

  created () {
    this.formEdit = this.$form.createForm(this)
    this.formAdd = this.$form.createForm(this)
    this.formEdit1 = this.$form.createForm(this)
  }

  showModal () {
    this.formComplaint.resetFields()
    this.visible = true
  }

  closeModal () {
    this.formComplaint.resetFields()
    this.visible = false
  }

  handleOk (e: any) {
    this.confirmLoading = true
    setTimeout(() => {
      this.visibleAdd = false
      this.visible2 = false
      this.confirmLoading = false
    }, 200)
  }

  handleCancel () {
    this.visible = false
    this.visible2 = false
    this.visible3 = false
    this.visibleAdd = false
  }
  //  onDelete(key:number) {
  //       this.deletestudent={
  //       id:key
  //       }
  //       this.$axios.$post('/Student/remove-student',this.deletestudent).then((response)=>{response = true
  //           this.dataAll=this.dataAll.filter(item => item.studentId !== key)
  //           this.dataDaDong=this.dataDaDong.filter(item => item.studentId !==key)
  //           this.dataNoPhi=this.dataNoPhi.filter(item => item.studentId !==key)
  //           this.openNotificationWithSuccess("Thao tác thành công");
  //        }).catch((error)=>{
  //            this.openNotificationWithEror(error);
  //        })
  //   }
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
    this.searchFeedBack.value = values
    console.log(this.tabkey)
    if (this.tabkey == 1) {
      this.$axios
        .$post('/FeedBacks/searchfeedback2', this.searchFeedBack)
        .then((response) => {
          this.dataFeedBack2 = response
        })
        .catch((error) => {
          this.openNotification(error)
        })
    } else {
      this.$axios
        .$post('/FeedBacks/searchfeedback1', this.searchFeedBack)
        .then((response) => {
          this.dataFeedBack1 = response
        })
        .catch((error) => {
          this.openNotification(error)
        })
    }
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
