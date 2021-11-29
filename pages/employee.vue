<template>
  <div class="TableList">
    <a-divider orientation="left">
      Danh sách nhân viên
    </a-divider>
    <div class="header-tongquan">
      <a-input-search
        placeholder="Nhập nhân viên"
        style="width: 14%"
        @search="onSearch"
      />
      <a-icon
        type="plus-square"
        style="font-size: 28px; margin-left: 10px"
        @click="showAdd()"
      />
      <a-modal v-model="visibleAdd" title="Thêm Nhân Viên" on-ok="handleOk">
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
            top: 0;
            left: 60%;
            transform: translateX(-50%);
          "
        >
          <a-form
            :form="formAdd"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-form-item label="Tài khoản">
              <a-input
                v-decorator="[
                  'username',
                  {
                    rules: [{ required: true, message: 'Nhập Tên Tài Khoản' }],
                  },
                ]"
                placeholder="Tài khoản"
              />
            </a-form-item>
            <a-form-item label="Mật khẩu">
              <a-input-password
                v-decorator="[
                  'password',
                  {
                    rules: [{ required: true, message: 'Nhập Mật Khẩu' }],
                  },
                ]"
                placeholder="Mật khẩu"
              />
            </a-form-item>
            <a-form-item
              label="Tên nhân viên"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 11 }"
            >
              <a-input
                v-decorator="[
                  'name',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Nhập Tên Nhân Viên',
                      },
                      {
                        pattern:
                          /^[A-Z a-z ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]{1,50}$/,
                        message: 'Chỉ nhập ký tự',
                      },
                    ],
                  },
                ]"
                placeholder="Tên nhân viên"
              />
            </a-form-item>
            <a-form-item
              label="Số điện thoại"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 11 }"
            >
              <a-input
                v-decorator="[
                  'phone',
                  {
                    rules: [
                      {
                        required: true,
                        pattern: /^[\+]?[(]?[0-9]{10}$/,
                        message: 'Nhập Số Điện Thoại',
                      },
                    ],
                  },
                ]"
                placeholder="Số điện thoại"
              />
            </a-form-item>
            <a-form-item label="Email">
              <a-input
                v-decorator="[
                  'email',
                  {
                    rules: [{ required: true, message: 'Nhập Email' }],
                  },
                ]"
                placeholder="abc@gmail.com"
                type="email"
              />
            </a-form-item>
            <a-form-item label="Chức vụ">
              <a-select
                v-decorator="[
                  'position',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Chọn Chức Vụ',
                      },
                    ],
                  },
                ]"
                placeholder="Chọn chức vụ"
                @change="handleSelectChangeAdd"
              >
                <a-select-option
                  v-for="position in positioned"
                  :key="position.name"
                  :value="position.name"
                >
                  {{ position.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Địa chỉ">
              <a-input
                v-decorator="[
                  'department',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Nhập Địa Chỉ',
                      },
                    ],
                  },
                ]"
                placeholder="Địa chỉ"
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
                @change="handleSelectChangeAdd"
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
          </a-form>
        </div>
      </a-modal>
    </div>
    <div>
      <a-table
        :columns="columns"
        :data-source="dataSource"
        bordered
        :row-key="(data) => data.id"
      >
        <span slot="names" slot-scope="names, record">
          <a-tag
            color="geekblue"
            style="cursor: pointer"
            @click="showModalFeedBack(record.id)"
          >
            {{ names }}
          </a-tag>
          <a-modal
            width="90%"
            title="Đánh Giá Nhân Viên"
            :visible="visibleFeedBack"
            @cancel="handleCancel"
          >
            <template slot="footer">
              <a-button type="primary" @click="handleOk"> Đóng </a-button>
            </template>
            <a-table
              :columns="columnsFeedBack"
              :data-source="dataFeedBack"
              bordered
              :row-key="(data) => data.id"
            >
              <span slot="employeenames" slot-scope="employeenames">
                <a-tag color="geekblue">
                  {{ employeenames }}
                </a-tag>
              </span>
              <span slot="customernames" slot-scope="customernames">
                <a-tag color="geekblue">
                  {{ customernames }}
                </a-tag>
              </span>
            </a-table>
          </a-modal>
        </span>
        <span slot="positions" slot-scope="positions">
          <a-tag
            :color="
              positions === 'Giám đốc'
                ? 'volcano'
                : positions == 'Chức khác'
                  ? 'geekblue'
                  : 'green'
            "
          >
            {{ positions }}
          </a-tag>
        </span>
        <span slot="action" slot-scope="text, record">
          <a-icon
            type="eye"
            style="font-size: 18px"
            @click="showEdit(record.id)"
          />
          <a-modal
            v-model="visible2"
            title="Chi Tiết Nhân Viên"
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
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-form-item label="Tài khoản">
                  <a-input
                    v-decorator="[
                      'username',
                      {
                        rules: [
                          { required: true, message: 'Nhập Tên Tài Khoản' },
                        ],
                      },
                    ]"
                    placeholder="Tài khoản"
                    :disabled="true"
                  />
                </a-form-item>
                <a-form-item
                  label="Mật khẩu"
                  :label-col="{ span: 5 }"
                  :wrapper-col="{ span: 12 }"
                >
                  <div style="display: flex">
                    <a-input-password
                      v-decorator="[
                        'password',
                        {
                          rules: [{ required: true, message: 'Nhập Mật Khẩu' }],
                        },
                      ]"
                      placeholder="Mật khẩu"
                      :disabled="disabled"
                    />
                    <a-button
                      type="primary"
                      :wrapper-col="{ span: 1 }"
                      style="margin-left: 4px"
                      @click="toggle"
                    >
                      Edit
                    </a-button>
                  </div>
                </a-form-item>
                <a-form-item
                  label="Tên nhân viên"
                  :label-col="{ span: 6 }"
                  :wrapper-col="{ span: 11 }"
                >
                  <a-input
                    v-decorator="['name']"
                    placeholder="Tên nhân viên"
                    :disabled="true"
                  />
                </a-form-item>
                <a-form-item
                  label="Số điện thoại"
                  :label-col="{ span: 6 }"
                  :wrapper-col="{ span: 11 }"
                >
                  <a-input
                    v-decorator="[
                      'phone',
                      {
                        rules: [
                          {
                            required: true,
                            pattern: /^[\+]?[(]?[0-9]{10}$/,
                            message: 'Nhập Số Điện Thoại',
                          },
                        ],
                      },
                    ]"
                    placeholder="Số điện thoại"
                  />
                </a-form-item>
                <a-form-item label="Email">
                  <a-input
                    v-decorator="[
                      'email',
                      {
                        rules: [{ required: true, message: 'Nhập Email' }],
                      },
                    ]"
                    placeholder="abc@gmail.com"
                    type="email"
                  />
                </a-form-item>
                <a-form-item label="Chức vụ">
                  <a-select
                    v-decorator="[
                      'position',
                      {
                        rules: [
                          {
                            required: true,
                            message: 'Chọn Chức Vụ',
                          },
                        ],
                      },
                    ]"
                    placeholder="Chọn chức vụ"
                    @change="handleSelectChangeAdd"
                  >
                    <a-select-option
                      v-for="position in positioned"
                      :key="position.name"
                      :value="position.name"
                    >
                      {{ position.name }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="Địa chỉ">
                  <a-input
                    v-decorator="[
                      'department',
                      {
                        rules: [
                          {
                            required: true,
                            message: 'Nhập Địa Chỉ',
                          },
                        ],
                      },
                    ]"
                    placeholder="Địa chỉ"
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
                    @change="handleSelectChangeAdd"
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
              </a-form>
            </div>
          </a-modal>
          <a-divider type="vertical" />
          <a-popconfirm
            v-if="dataSource.length"
            title="Bạn có chắc muốn xóa hồ sơ này?"
            @confirm="() => onDelete(record.id)"
          >
            <a-icon type="delete" style="font-size: 18px; cursor: pointer" />
          </a-popconfirm>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { WrappedFormUtils } from 'ant-design-vue/types/form/form'
import moment from 'moment'
import { IEmployeeResponse } from '~/src/enums/response/IEmployeeResponse'
import { IEmployeeSearchResponse } from '~/src/enums/response/IEmployeeSearchResponse'
import { IEmployeeIdResponse } from '~/src/enums/response/IEmployeeIdResponse'
import { IDisctrictsResponse } from '~/src/enums/response/IDisctrictsResponse'
import { IPositionsResponse } from '~/src/enums/response/IPositionsResponse'
import { IWardsResponse } from '~/src/enums/response/IWardsResponse'
import { IFeedBacksResponse } from '~/src/enums/response/IFeedBacksResponse'
import { IFeedBackIdResponse } from '~/src/enums/response/IFeedBackIdResponse'
// import MenuItem from 'ant-design-vue/types/menu/menu-item'
@Component({
  layout: 'menu',
  name: 'employee',
  async fetch () {
    this.dataSource = await this.$axios.$get('Employee/GetEmployees')
  }
})
export default class Employee extends Vue {
  private isDownloading: boolean = false;
  private isSubmit: boolean = false;
  private visibleAdd: boolean = false;
  private visibleFeedBack: boolean = false;
  private visible2: boolean = false;
  private $message: any;
  private cities: Array<String> = [];
  private districts: Array<String> = [];
  private warded: IWardsResponse = {
    citied: '',
    districted: ''
  };

  private wards: Array<String> = [];
  private districted: IDisctrictsResponse = {
    name: ''
  };

  private employeeInfo: any;
  private formEdit!: WrappedFormUtils;
  private formAdd!: WrappedFormUtils;
  private employeeId: number = 0;
  private cityname: String = '';
  private positioned: Array<IPositionsResponse> = [];
  private confirmLoading: boolean = false;
  private disabled: boolean = true;
  private feedBackValue:IFeedBackIdResponse = {
    id: 0
  }

  private delete: IEmployeeIdResponse = {
    id: 0
  };

  private dataSource: Array<IEmployeeResponse> = [];
  data () {
    return {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
      formLayout: 'horizontal',

      headers: {
        authorization: 'authorization-text'
      }
    }
  }

  private search: IEmployeeSearchResponse = {
    value: ''
  };

  private columns: Array<any> = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      sorter: (a: any, b: any) => a.id.length - b.id.length
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      scopedSlots: { customRender: 'names' },
      sorter: (a: any, b: any) => a.name.length - b.name.length
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      sorter: (a: any, b: any) => a.receivedDate.length - b.receivedDate.length
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      sorter: (a: any, b: any) => a.studentName.length - b.studentName.length
    },
    {
      title: 'Chức vụ',
      dataIndex: 'position',
      key: 'position',
      align: 'center',
      scopedSlots: { customRender: 'positions' },
      sorter: (a: any, b: any) => a.receiver.length - b.receiver.length
    },
    {
      title: 'Địa chỉ',
      key: 'address',
      dataIndex: 'address',
      align: 'center',
      sorter: (a: any, b: any) => a.type.length - b.type.length
    },
    {
      title: 'Hành động',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      align: 'center'
    }
  ];

  private columnsFeedBack: Array<any> = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      sorter: (a: any, b: any) => a.id.length - b.id.length
    },
    {
      title: 'Tên Nhân Viên',
      dataIndex: 'employeeName',
      key: 'employeeName',
      align: 'center',
      scopedSlots: { customRender: 'employeenames' },
      sorter: (a: any, b: any) => a.name.length - b.name.length
    },
    {
      title: 'Tên Khách Hàng',
      dataIndex: 'customerName',
      key: 'customerName',
      align: 'center',
      scopedSlots: { customRender: 'customernames' },
      sorter: (a: any, b: any) => a.name.length - b.name.length
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      sorter: (a: any, b: any) => a.receivedDate.length - b.receivedDate.length
    },
    {
      title: 'Ngày Gửi',
      dataIndex: 'recievedDate',
      key: 'recievedDate',
      align: 'center',
      sorter: (a: any, b: any) => a.studentName.length - b.studentName.length
    },
    {
      title: 'Nội Dung',
      dataIndex: 'content',
      key: 'content',
      align: 'center',
      sorter: (a: any, b: any) => a.studentName.length - b.studentName.length
    }
  ];

  private dataFeedBack: Array<IFeedBacksResponse> = [];
  async created () {
    this.formEdit = this.$form.createForm(this)
    this.formAdd = this.$form.createForm(this)
    this.cities = await this.$axios.$get('/Employee/GetCity')
    this.positioned = await this.$axios.$get('/Employee/GetPositions')
  }

  async onSearch (values: string) {
    this.search.value = values
    this.dataSource = []
    this.$axios
      .$post('Employee/SearchEmployee', this.search)
      .then((response) => {
        this.dataSource = response
      })
      .catch((error) => {
        console.log(error)
      })
  }

  showModalFeedBack (key: number) {
    this.visibleFeedBack = true
    this.feedBackValue.id = key
    this.$axios
      .$post('/Employee/GetFeedBackEmployee', this.feedBackValue)
      .then((response) => {
        this.dataFeedBack = response
      })
      .catch((error) => {
        this.visibleFeedBack = false
        this.isSubmit = false
        this.openNotificationWithEror(error)
      })
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
    this.employeeInfo = this.dataSource.find(x => x.id == key)
    this.employeeId = this.employeeInfo.id
    this.formEdit.getFieldDecorator('username', { initialValue: '' })
    this.formEdit.getFieldDecorator('password', { initialValue: '' })
    this.formEdit.getFieldDecorator('name', { initialValue: '' })
    this.formEdit.getFieldDecorator('phone', { initialValue: '' })
    this.formEdit.getFieldDecorator('email', { initialValue: '' })
    this.formEdit.getFieldDecorator('position', { initialValue: '' })
    this.formEdit.getFieldDecorator('city', { initialValue: '' })
    this.formEdit.getFieldDecorator('district', { initialValue: '' })
    this.formEdit.getFieldDecorator('ward', { initialValue: '' })
    this.formEdit.getFieldDecorator('department', { initialValue: '' })
    this.formEdit.setFields({
      username: { value: this.employeeInfo.username }
    })
    this.formEdit.setFields({
      password: { value: this.employeeInfo.password }
    })
    this.formEdit.setFields({
      name: { value: this.employeeInfo.name }
    })
    this.formEdit.setFields({
      phone: { value: this.employeeInfo.phone }
    })
    this.formEdit.setFields({
      email: { value: this.employeeInfo.email }
    })
    this.formEdit.setFields({
      position: { value: this.employeeInfo.position }
    })
    this.formEdit.setFields({
      city: { value: this.employeeInfo.city }
    })
    this.formEdit.setFields({
      district: { value: this.employeeInfo.district }
    })
    this.formEdit.setFields({
      ward: { value: this.employeeInfo.ward }
    })
    this.formEdit.setFields({
      department: { value: this.employeeInfo.department }
    })
  }

  handleCancel (e: any) {
    console.log(e)
    this.visibleAdd = false
    this.visible2 = false
    this.visibleFeedBack = false
  }

  handleOk (e: any) {
    this.confirmLoading = true
    setTimeout(() => {
      this.visibleFeedBack = false
      this.visibleAdd = false
      this.visible2 = false
      this.confirmLoading = false
    }, 200)
  }

  handleSubmitAdd (e: any) {
    e.preventDefault()
    this.formAdd.validateFields((err: any, values: IEmployeeResponse) => {
      if (!err) {
        this.isSubmit = true
        this.$axios
          .$post('/Employee/CreateEmployee', values)
          .then(async (response) => {
            this.visibleAdd = false
            this.isSubmit = false
            this.openNotificationWithSuccess('Thêm nhân viên thành công')
            this.dataSource = response
          })
          .catch((error) => {
            this.visibleAdd = false
            this.isSubmit = false
            this.openNotificationWithEror(error)
          })
      }
    })
  }

  handleSubmitEdit (e: any) {
    e.preventDefault()
    this.formEdit.validateFields((err: any, values: IEmployeeResponse) => {
      if (!err) {
        this.isSubmit = true
        values.id = this.employeeId
        this.$axios
          .$post('/Employee/UpdateEmployee', values)
          .then((response) => {
            this.visible2 = false
            this.isSubmit = false
            this.openNotificationWithSuccess(
              'Cập nhập thông tin nhân viên thành công'
            )
            this.dataSource = response
          })
          .catch((error) => {
            this.visible2 = false
            this.isSubmit = false
            this.openNotificationWithEror(error)
          })
      }
    })
  }

  handleSelectChangeEdit (value: any) {
    console.log(value)
    this.formEdit.setFieldsValue({ value })
  }

  handleSelectChangeAdd (value: any) {
    console.log(value)
    this.formAdd.setFieldsValue({ value })
  }

  handleSelectCities (value: any) {
    this.formEdit.setFieldsValue({ value })
    this.cityname = value
    this.districted.name = value
    this.$axios
      .$post('/Employee/GetDistricts', this.districted)
      .then((response) => {
        this.districts = response
      })
      .catch((error) => {})
  }

  handleSelectDistricts (value: any) {
    this.formEdit.setFieldsValue({ value })
    this.warded.citied = this.cityname
    this.warded.districted = value
    this.$axios
      .$post('/Employee/GetWards', this.warded)
      .then((response) => {
        this.wards = response
      })
      .catch((error) => {})
  }

  onDelete (key: number) {
    this.delete.id = key
    this.$axios
      .$post('Employee/DeleteEmployee', this.delete)
      .then((response) => {
        this.dataSource = response.filter((item: any) => item.id !== key)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  private openNotificationWithSuccess (description: string) {
    this.$notification.success({
      message: 'Thao tác thành công',
      description
    })
  }

  private openNotificationWithEror (description: string) {
    this.$notification.error({
      message: 'Có lỗi gì đó đã xãy ra',
      description
    })
  }

  toggle () {
    this.disabled = !this.disabled
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
.header-tongquan {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  align-items: center;
}
.header-text {
  font-size: 30px;
  margin: 10px 0 16px 24px;
}
</style>
