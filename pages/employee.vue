<template>
  <div class="container">
    <h1 class="header-text">Quản lý Nhân Viên</h1>
    <div class="header-tongquan">
      <a-input-search
        placeholder="Nhập nhân viên"
        style="width: 14%"
        @search="onSearch"
      />
      <a-icon
        type="plus-square"
        @click="showAdd()"
        style="font-size: 28px; margin-left: 10px"
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
                placeholder="Tài khoản"
                v-decorator="[
                  'username',
                  {
                    rules: [{ required: true, message: 'Nhập Tên Tài Khoản' }],
                  },
                ]"
              />
            </a-form-item>
            <a-form-item label="Mật khẩu">
              <a-input-password
                placeholder="Mật khẩu"
                v-decorator="[
                  'password',
                  {
                    rules: [{ required: true, message: 'Nhập Mật Khẩu' }],
                  },
                ]"
              />
            </a-form-item>
            <a-form-item
              label="Tên nhân viên"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 11 }"
            >
              <a-input
                placeholder="Tên nhân viên"
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
              />
            </a-form-item>
            <a-form-item
              label="Số điện thoại"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 11 }"
            >
              <a-input
                placeholder="Số điện thoại"
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
              />
            </a-form-item>
            <a-form-item label="Email">
              <a-input
                placeholder="abc@gmail.com"
                type="email"
                v-decorator="[
                  'email',
                  {
                    rules: [{ required: true, message: 'Nhập Email' }],
                  },
                ]"
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
                  v-for="type in typeDocuments"
                  :key="type.type"
                  :value="type.type"
                >
                  {{ type.type }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Địa chỉ">
              <a-input
                placeholder="Địa chỉ"
                v-decorator="[
                  'department',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Nhập Địa Chỉ',
                      },
                      {
                        pattern:
                          /^[A-Z a-z ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]?[0-9]{1,50}$/,
                        message: 'Chỉ nhập ký tự',
                      },
                    ],
                  },
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
                @change="handleSelectChangeAdd"
              >
                <a-select-option
                  v-for="type in typeDocuments"
                  :key="type.type"
                  :value="type.type"
                >
                  {{ type.type }}
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
                @change="handleSelectChangeAdd"
              >
                <a-select-option
                  v-for="type in typeDocuments"
                  :key="type.type"
                  :value="type.type"
                >
                  {{ type.type }}
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
                  v-for="type in typeDocuments"
                  :key="type.type"
                  :value="type.type"
                >
                  {{ type.type }}
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
        :rowKey="(data) => data.id"
      >
        <span slot="names" slot-scope="names, record">
          <a-tag
            color="geekblue"
            @click="showModalFeedBack(record.id)"
            style="cursor: pointer"
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
              <a-button
                type="primary"
                @click="handleOk"
              >
                Đóng
              </a-button>
            </template>
            <a-table
              :columns="columnsFeedBack"
              :data-source="dataFeedBack"
              bordered
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
            @click="showEdit(record.id)"
            style="font-size: 18px"
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
                    placeholder="Tài khoản"
                    disabled="true"
                    v-decorator="[
                      'username',
                      {
                        rules: [
                          { required: true, message: 'Nhập Tên Tài Khoản' },
                        ],
                      },
                    ]"
                  />
                </a-form-item>
                <a-form-item
                  label="Mật khẩu"
                  :label-col="{ span: 5 }"
                  :wrapper-col="{ span: 12 }"
                >
                  <div style="display: flex">
                    <a-input-password
                      placeholder="Mật khẩu"
                      :disabled="disabled"
                      v-decorator="[
                        'password',
                        {
                          rules: [{ required: true, message: 'Nhập Mật Khẩu' }],
                        },
                      ]"
                    />
                    <a-button
                      type="primary"
                      @click="toggle"
                      :wrapper-col="{ span: 1 }"
                      style="margin-left: 4px"
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
                    placeholder="Tên nhân viên"
                    disabled="true"
                    v-decorator="['name']"
                  />
                </a-form-item>
                <a-form-item
                  label="Số điện thoại"
                  :label-col="{ span: 6 }"
                  :wrapper-col="{ span: 11 }"
                >
                  <a-input
                    placeholder="Số điện thoại"
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
                  />
                </a-form-item>
                <a-form-item label="Email">
                  <a-input
                    placeholder="abc@gmail.com"
                    type="email"
                    v-decorator="[
                      'email',
                      {
                        rules: [{ required: true, message: 'Nhập Email' }],
                      },
                    ]"
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
                      v-for="type in typeDocuments"
                      :key="type.type"
                      :value="type.type"
                    >
                      {{ type.type }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="Địa chỉ">
                  <a-input
                    placeholder="Địa chỉ"
                    v-decorator="[
                      'department',
                      {
                        rules: [
                          {
                            required: true,
                            message: 'Nhập Địa Chỉ',
                          },
                          {
                            pattern:
                              /^[A-Z a-z ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]?[0-9]{1,50}$/,
                            message: 'Nhập Địa Chỉ',
                          },
                        ],
                      },
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
                    @change="handleSelectChangeAdd"
                  >
                    <a-select-option
                      v-for="type in typeDocuments"
                      :key="type.type"
                      :value="type.type"
                    >
                      {{ type.type }}
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
                    @change="handleSelectChangeAdd"
                  >
                    <a-select-option
                      v-for="type in typeDocuments"
                      :key="type.type"
                      :value="type.type"
                    >
                      {{ type.type }}
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
                      v-for="type in typeDocuments"
                      :key="type.type"
                      :value="type.type"
                    >
                      {{ type.type }}
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
          <a-divider type="vertical" />
        </span>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { IEmployeeResponse } from "~/src/enums/response/IEmployeeResponse";
import { IEmployeeSearchResponse } from "~/src/enums/response/IEmployeeSearchResponse";
import { IEmployeeIdResponse } from "~/src/enums/response/IEmployeeIdResponse";
import { IDocumentFilterResponse } from "~/src/enums/response/IDocumentFilterResponse";
import { WrappedFormUtils } from "ant-design-vue/types/form/form";
import moment from "moment";
import { IReceiverResponse } from "~/src/enums/response/IReceiverResponse";
import { IDataDocumentResponse } from "~/src/enums/response/IDataDocumentResponse";
// import MenuItem from 'ant-design-vue/types/menu/menu-item'
@Component({
  layout: "menu",
  name: "employee",
  async fetch() {
    this.dataSource = await this.$axios.$get("Employee/GetEmployees");
  },
})
export default class overviewProfile extends Vue {
  private isDownloading: boolean = false;
  private isSubmit: boolean = false;
  private visibleAdd: boolean = false;
  private visibleFeedBack: boolean = false;
  private visible2: boolean = false;
  private startValue: any = null;
  private endValue: any = null;
  private endOpen: any = false;
  private $message: any;
  private employeeInfo: any;
  private formEdit!: WrappedFormUtils;
  private formFilter!: WrappedFormUtils;
  private formAdd!: WrappedFormUtils;
  private receivers: Array<String> = [];
  private typeDocuments: Array<String> = [];
  private studentNames: Array<String> = [];
  private studentId: number = 0;
  private fileData: File = {};
  private fileList: any[];
  private confirmLoading: boolean = false;
  private disabled: boolean = true;
  private delete: IEmployeeIdResponse = {
    id: 0,
  };
  private dataSource: Array<IEmployeeResponse> = [];
  data() {
    return {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
      formLayout: "horizontal",

      headers: {
        authorization: "authorization-text",
      },
    };
  }
  private search: IEmployeeSearchResponse = {
    value: "",
  };
  private columns: Array<any> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      align: "center",
      sorter: (a: any, b: any) => a.id.length - b.id.length,
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      align: "center",
      scopedSlots: { customRender: "names" },
      sorter: (a: any, b: any) => a.name.length - b.name.length,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      align: "center",
      sorter: (a: any, b: any) => a.receivedDate.length - b.receivedDate.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      sorter: (a: any, b: any) => a.studentName.length - b.studentName.length,
    },
    {
      title: "Chức vụ",
      dataIndex: "position",
      key: "position",
      align: "center",
      scopedSlots: { customRender: "positions" },
      sorter: (a: any, b: any) => a.receiver.length - b.receiver.length,
    },
    {
      title: "Địa chỉ",
      key: "address",
      dataIndex: "address",
      align: "center",
      sorter: (a: any, b: any) => a.type.length - b.type.length,
    },
    {
      title: "Hành động",
      key: "action",
      scopedSlots: { customRender: "action" },
      align: "center",
    },
  ];
  private columnsFeedBack: Array<any> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      align: "center",
      sorter: (a: any, b: any) => a.id.length - b.id.length,
    },
    {
      title: "Tên Nhân Viên",
      dataIndex: "employeename",
      key: "employeename",
      align: "center",
      scopedSlots: { customRender: "employeenames" },
      sorter: (a: any, b: any) => a.name.length - b.name.length,
    },
    {
      title: "Tên Khách Hàng",
      dataIndex: "customername",
      key: "customername",
      align: "center",
      scopedSlots: { customRender: "customernames" },
      sorter: (a: any, b: any) => a.name.length - b.name.length,
    },
    {
      title: "Tiêu đề",
      dataIndex: "tilte",
      key: "tilte",
      align: "center",
      sorter: (a: any, b: any) => a.receivedDate.length - b.receivedDate.length,
    },
    {
      title: "Ngày Gửi",
      dataIndex: "receivedDate",
      key: "receivedDate",
      align: "center",
      sorter: (a: any, b: any) => a.studentName.length - b.studentName.length,
    },
    {
      title: "Nội Dung",
      dataIndex: "content",
      key: "content",
      align: "center",
      sorter: (a: any, b: any) => a.studentName.length - b.studentName.length,
    },
  ];
  private dataFeedBack: Array<any> = [
    {
      id: "1",
      tilte: "Đánh giá nhân viên",
      employeename: "Phạm Minh Đức",
      customername: "Nguyễn Hoàng Quân",
      receivedDate: '09/11/2021',
      content: "Thái độ làm việc chuyên nghiệp,thân thiện hòa đồng",
    },
    {
      id: "2",
      employeename: "Nguyễn Hoàng Quân",
      tilte: "Đánh giá nhân viên",
      customername: "Phạm Minh Đức",
      receivedDate: '20/11/2021',
      content: "nói chuyện vui vẻ,thân thiện hòa đồng",
    },
  ];
  async created() {
    this.formFilter = this.$form.createForm(this);
    this.formEdit = this.$form.createForm(this);
    this.formAdd = this.$form.createForm(this);
    // this.receivers = await this.$axios.$get("/Document/Receiver");
    // this.typeDocuments = await this.$axios.$get("/Document/Type");
    // this.studentNames = await this.$axios.$get("/Document/StudentName");
  }

  async onSearch(values: string) {
    this.search.value = values;
    this.dataSource = [];
    this.$axios
      .$post("Employee/SearchEmployee", this.search)
      .then((response) => {
        this.dataSource = response;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  showModalFeedBack() {
    this.visibleFeedBack = true;
  }
  showAdd() {
    this.isSubmit = false;
    this.visibleAdd = true;
    this.formAdd.resetFields();
    this.fileList = [];
  }
  showEdit(key: number) {
    this.isSubmit = false;
    this.visible2 = true;
    this.formEdit.resetFields();
    this.employeeInfo = this.dataSource.find((x) => x.id == key);
    this.formEdit.getFieldDecorator("username", { initialValue: "" });
    this.formEdit.getFieldDecorator("password", { initialValue: "" });
    this.formEdit.getFieldDecorator("name", { initialValue: "" });
    this.formEdit.getFieldDecorator("phone", { initialValue: "" });
    this.formEdit.getFieldDecorator("email", { initialValue: "" });
    this.formEdit.getFieldDecorator("position", { initialValue: "" });
    this.formEdit.getFieldDecorator("city", { initialValue: "" });
    this.formEdit.getFieldDecorator("district", { initialValue: "" });
    this.formEdit.getFieldDecorator("ward", { initialValue: "" });
    this.formEdit.getFieldDecorator("department", { initialValue: "" });
    this.formEdit.setFields({
      username: { value: this.employeeInfo.username },
    });
    this.formEdit.setFields({
      password: { value: this.employeeInfo.password },
    });
    this.formEdit.setFields({
      name: { value: this.employeeInfo.name },
    });
    this.formEdit.setFields({
      phone: { value: this.employeeInfo.phone },
    });
    this.formEdit.setFields({
      email: { value: this.employeeInfo.email },
    });
    this.formEdit.setFields({
      position: { value: this.employeeInfo.position },
    });
    this.formEdit.setFields({
      city: { value: this.employeeInfo.city },
    });
    this.formEdit.setFields({
      district: { value: this.employeeInfo.district },
    });
    this.formEdit.setFields({
      ward: { value: this.employeeInfo.ward },
    });
    this.formEdit.setFields({
      department: { value: this.employeeInfo.department },
    });
  }
  showFilter() {
    this.visibleFilter = true;
    this.formFilter.resetFields();
  }
  //   handleFilter(e: any) {
  //     e.preventDefault();
  //     this.formFilter.validateFields(
  //       (err: any, values: IDocumentFilterResponse) => {
  //         if (!err) {
  //           this.$axios
  //             .$post("/Document/Filter", values)
  //             .then((response) => {
  //               this.dataSource = response;
  //             })
  //             .catch((error) => {
  //               console.log(error);
  //             });
  //         }
  //         this.visibleFilter = false;
  //       }
  //     );
  //   }
  handleCancel(e: any) {
    console.log(e);
    this.visibleAdd = false;
    this.visible2 = false;
    this.visibleFeedBack = false;
  }
  handleOk(e: any) {
    this.confirmLoading = true;
    setTimeout(() => {
      this.visibleFeedBack = false;
      this.visibleAdd = false;
      this.visible2 = false;
      this.confirmLoading = false;
    }, 200);
  }
  //   handleSubmitAdd(e: any) {
  //     var a: any;
  //     e.preventDefault();
  //     this.formAdd.validateFields((err: any, values: IDataDocumentResponse) => {
  //       if (!err) {
  //         this.isSubmit = true;
  //         const formData = new FormData();
  //         formData.append("name", values.name);
  //         formData.append("fileProfile", this.fileData);
  //         formData.append("submitter", values.submitter);
  //         formData.append("receiver", values.receiver);
  //         var reDate = new Date(values.receivedDate).toUTCString();
  //         formData.append("receivedDate", reDate);
  //         formData.append("note", values.note);
  //         formData.append("type", values.type);
  //         formData.append("studentName", values.studentName);
  //         var stdId = values.studentId + "";
  //         formData.append("studentId", stdId);
  //         this.$axios
  //           .$post("/Document/AddDocument", formData, {
  //             headers: {
  //               "Content-Type": "multipart/form-data",
  //             },
  //           })
  //           .then(async (response) => {
  //             this.visibleAdd = false;
  //             this.isSubmit = false;
  //             this.openNotificationWithSuccess("Thêm thông tin hồ sơ thành công");
  //             this.dataSource = await this.$axios.$get("/Document/getall");
  //           })
  //           .catch((error) => {
  //             this.visibleAdd = false;
  //             this.isSubmit = false;
  //             this.openNotificationWithEror(error);
  //           });
  //       }
  //     });
  //   }

  handleSubmitEdit(e: any) {
    e.preventDefault();
    this.formEdit.validateFields((err: any, values: IDataDocumentResponse) => {
      if (!err) {
        this.isSubmit = true;
        const formData = new FormData();
        var valueId = values.id + "";
        formData.append("id", valueId);
        formData.append("name", values.name);
        formData.append("fileProfile", this.fileData);
        formData.append("submitter", values.submitter);
        formData.append("receiver", values.receiver);
        var reDate = new Date(values.receivedDate).toUTCString();
        formData.append("receivedDate", reDate);
        formData.append("note", values.note);
        formData.append("type", values.type);
        formData.append("studentName", values.studentName);
        var stdId = values.studentId + "";
        formData.append("studentId", stdId);
        this.$axios
          .$post("/Document/Edit", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.visible2 = false;
            this.isSubmit = false;
            this.openNotificationWithSuccess("Cập nhập thông tin thành công");
            this.dataSource = response;
          })
          .catch((error) => {
            this.visible2 = false;
            this.isSubmit = false;
            this.openNotificationWithEror(error);
          });
      }
    });
  }
  handleSelectChangeFilter(value: any) {
    console.log(value);
    this.formFilter.setFieldsValue({ value: value });
  }
  handleSelectChangeEdit(value: any) {
    console.log(value);
    this.formEdit.setFieldsValue({ value: value });
  }
  handleSelectChangeAdd(value: any) {
    console.log(value);
    this.formAdd.setFieldsValue({ value: value });
  }
  handleSelectChangeStudentName(value: any) {
    console.log(value);
    this.studentId = value;
    this.formAdd.setFieldsValue({ value: value });
  }
  normFile(e: any) {
    let fileList = [...e.fileList];
    // 1. Limit the number of uploaded files
    //    Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);

    // 2. read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    this.fileList = fileList;
    if (e.file.status === "done") {
      this.fileData = e.file.originFileObj;
    }
  }
  onDelete(key: number) {
    this.delete.id = key;
    this.$axios
      .$post("Employee/DeleteEmployee", this.delete)
      .then((response) => {
        this.dataSource = response.filter((item: any) => item.id !== key);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  disabledStartDate(startValue: any) {
    const endValue = this.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }
  disabledEndDate(endValue: any) {
    const startValue = this.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return startValue.valueOf() >= endValue.valueOf();
  }
  handleStartOpenChange(open: any) {
    if (!open) {
      this.endOpen = true;
    }
  }
  handleEndOpenChange(open: any) {
    this.endOpen = open;
  }
  private openNotificationWithSuccess(description: string) {
    this.$notification["success"]({
      message: "Thao tác thành công",
      description: description,
    });
  }
  private openNotificationWithEror(description: string) {
    this.$notification["error"]({
      message: "Có lỗi gì đó đã xãy ra",
      description: description,
    });
  }
  toggle() {
    this.disabled = !this.disabled;
  }
}
</script>
<style scoped>
.header-tongquan {
  display: flex;
  justify-content: flex-end;
  margin: 25px 5px;
  align-items: center;
}
.header-text {
  font-size: 30px;
  margin: 10px 0 16px 24px;
}
</style>