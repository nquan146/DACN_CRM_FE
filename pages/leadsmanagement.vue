<template>
  <div>
    <section class="TableList">
      <a-divider orientation="left">
        Quản Lý Tiềm Năng
      </a-divider>
      <div class="header-tongquan">
        <a-input-search
          placeholder="Nhập thông tin"
          style="width: 14%"
          @search="onSearch"
        />
        <a-icon
          type="plus-square"
          style="font-size: 28px; margin-left: 10px"
          @click="showAdd()"
        />
        <a-modal v-model="visibleAdd" title="Thêm Tiềm Năng" on-ok="handleOk">
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
              :wrapper-col="{ span: 15 }"
            >
              <a-form-item label="Tên tiềm năng">
                <a-input
                  v-decorator="[
                    'name',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Nhập trường tên tiềm năng',
                        },
                      ],
                    },
                  ]"
                  placeholder="Tên tiềm năng"
                />
              </a-form-item>
              <a-form-item label="Tên liên hệ">
                <a-input
                  v-decorator="[
                    'contactName',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Nhập trường tên hợp đồng',
                        },
                      ],
                    },
                  ]"
                  placeholder="Tên liên hệ"
                />
              </a-form-item>
              <a-form-item
                label="Phân công"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 11 }"
              >
                <a-select
                  v-decorator="[
                    'employeeName',
                    {
                      rules: [{ required: true, message: 'Nhập Mật Khẩu' }],
                    },
                  ]"
                  placeholder="Tên nhân viên"
                  @change="handleSelectChangeAddPEmployeeSelect"
                >
                  <a-select-option
                    v-for="employee in dataemployee"
                    :key="employee.id"
                    :value="employee.id"
                  >
                    {{ employee.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                label="Email"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 11 }"
              >
                <a-input
                  v-decorator="[
                    'email',
                    {
                      rules: [{ required: true, message: 'Nhập Email' }],
                    },
                  ]"
                  placeholder="Email"
                  type="email"
                />
              </a-form-item>
              <a-form-item label="Số điện thoại">
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
              <a-form-item label="Nội dung">
                <a-textarea
                  v-decorator="[
                    'description',
                    {
                      rules: [
                      ],
                    },
                  ]"
                  placeholder="Nhập nội dung"
                />
              </a-form-item>
              <a-form-item label="Website">
                <a-input
                  v-decorator="[
                    'website',
                    {
                      rules: [
                      ],
                    },
                  ]"
                  placeholder="website"
                  addon-before="Https://"
                />
              </a-form-item>
              <a-form-item label="Mức độ ưu tiên">
                <a-select
                  v-decorator="[
                    'priority',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Chọn Mức Độ Ưu Tiên',
                        },
                      ],
                    },
                  ]"
                  placeholder="Chọn Mức Độ Ưu Tiên"
                  @change="handleSelectChangeAddPrioritySelect"
                >
                  <a-select-option
                    v-for="dataprioritys in datapriority"
                    :key="dataprioritys.name"
                    :value="dataprioritys.name"
                  >
                    {{ dataprioritys.name }}
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
          <span slot="names" slot-scope="names">
            <a-tag color="geekblue">
              {{ names }}
            </a-tag>
          </span>
          <span slot="employeeName" slot-scope="employeeName">
            <a-tag color="geekblue">
              {{ employeeName }}
            </a-tag>
          </span>
          <span slot="priority" slot-scope="priority">
            <a-tag v-for="prioritys in priority" :key="prioritys">
              <a-icon type="star" theme="filled" style="color: #fadb14" />
            </a-tag>
          </span>
          <span slot="action" slot-scope="text, record">
            <a-icon type="mail" style="font-size: 18px; cursor: pointer" />

            <a-divider type="vertical" />
            <a-icon
              type="eye"
              style="font-size: 18px"
              @click="showEdit(record.id)"
            />
            <a-modal
              v-model="visible2"
              title="Chi Tiết Tiềm Năng"
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
                  :wrapper-col="{ span: 15 }"
                >
                  <a-form-item label="Tên tiềm năng">
                    <a-input
                      v-decorator="[
                        'name',
                        {
                          rules: [
                            {
                              required: true,
                              message: 'Nhập trường tên tiềm năng',
                            },
                          ],
                        },
                      ]"
                      placeholder="Tên tiềm năng"
                    />
                  </a-form-item>
                  <a-form-item label="Tên liên hệ">
                    <a-input
                      v-decorator="[
                        'contactName',
                        {
                          rules: [
                            {
                              required: true,
                              message: 'Nhập trường tên hợp đồng',
                            },
                          ],
                        },
                      ]"
                      placeholder="Tên liên hệ"
                    />
                  </a-form-item>
                  <a-form-item
                    label="Tên nhân viên"
                    :label-col="{ span: 6 }"
                    :wrapper-col="{ span: 11 }"
                  >
                    <a-select
                      v-decorator="[
                        'employeeName',
                        {
                          rules: [{ required: true, message: 'Nhập Mật Khẩu' }],
                        },
                      ]"
                      placeholder="Tên nhân viên"
                      @change="handleSelectChangeEditEmployeeSelect"
                    >
                      <a-select-option
                        v-for="employee in dataemployee"
                        :key="employee.id"
                        :value="employee.id"
                      >
                        {{ employee.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item
                    label="Email"
                    :label-col="{ span: 6 }"
                    :wrapper-col="{ span: 11 }"
                  >
                    <a-input
                      v-decorator="[
                        'email',
                        {
                          rules: [{ required: true, message: 'Nhập Email' }],
                        },
                      ]"
                      placeholder="Email"
                      type="email"
                    />
                  </a-form-item>
                  <a-form-item label="Số điện thoại">
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
                  <a-form-item label="Nội dung">
                    <a-textarea
                      v-decorator="[
                        'description',
                        {
                          rules: [
                          ],
                        },
                      ]"
                      placeholder="Nhập nội dung"
                    />
                  </a-form-item>
                  <a-form-item label="Website">
                    <a-input
                      v-decorator="[
                        'website',
                        {
                          rules: [
                          ],
                        },
                      ]"
                      placeholder="website"
                      addon-before="Https://"
                    />
                  </a-form-item>
                  <a-form-item label="Mức độ ưu tiên">
                    <a-select
                      v-decorator="[
                        'priority',
                        {
                          rules: [
                            {
                              required: true,
                              message: 'Chọn Mức Độ Ưu Tiên',
                            },
                          ],
                        },
                      ]"
                      placeholder="Chọn Mức Độ Ưu Tiên"
                      @change="handleSelectChangeEditPrioritySelect"
                    >
                      <a-select-option
                        v-for="dataprioritys in datapriority"
                        :key="dataprioritys.name"
                        :value="dataprioritys.name"
                      >
                        {{ dataprioritys.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-form>
              </div>
            </a-modal>
            <a-divider type="vertical" />
            <a-popconfirm
              v-if="dataSource.length"
              title="Bạn có chắc muốn tiềm năng này?"
              @confirm="() => onDelete(record.id)"
            >
              <a-icon type="delete" style="font-size: 18px; cursor: pointer" />
            </a-popconfirm>
          </span>
        </a-table>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { WrappedFormUtils } from 'ant-design-vue/types/form/form'
import moment from 'moment'
import { ILeadsResponse } from '~/src/enums/response/ILeadsResponse'
import { IEmployeeResponse } from '~/src/enums/response/IEmployeeResponse'
import { SearchLeadRequest } from '~/src/enums/response/SearchLeadRequest'
import { ILeadsId } from '~/src/enums/response/ILeadsId'
import { EmployeeSelectReponse } from '~/src/enums/response/EmployeeSelectReponse'
import { ILeadEditResponse } from '~/src/enums/response/ILeadEditResponse'
import { PositionInputResponse } from '~/src/enums/response/PositionInputResponse'
// import MenuItem from 'ant-design-vue/types/menu/menu-item'
@Component({
  layout: 'menu',
  name: 'leads',
  async asyncData (context: Context) {
    const dataSource = await context.$axios.$get('/Leads/getallleads')
    const dataemployee = await context.$axios.$get('/Leads/getallemployee')
    const datapriority = await context.$axios.$get('/Leads/getallpriority')
    return {
      dataSource,
      dataemployee,
      datapriority
    }
  }
})
export default class Leads extends Vue {
  private isSubmit: boolean = false;
  private visibleAdd: boolean = false;
  private visibleFeedBack: boolean = false;
  private visible2: boolean = false;
  private $message: any;
  private leadInfo: any;
  private employeeId: number = 0;
  private employeeName: String = '';
  private priorityvalue: number = 0;
  private priorityAddvalue: number = 0;
  private searchLeads: SearchLeadRequest = {
    name: ''
  };

  private positionSelect: ILeadsId = {
    id: 0
  };

  private positionInput: Array<PositionInputResponse> = [];
  private positioned: PositionInputResponse = {
    name: ''
  };

  private formEdit!: WrappedFormUtils;
  private formAdd!: WrappedFormUtils;
  private leadId: number = 0;
  private confirmLoading: boolean = false;
  private delete: ILeadsId = {
    id: 0
  };

  private datapriority: Array<String> = [];
  private dataSource: Array<IEmployeeResponse> = [];
  private dataemployee: Array<EmployeeSelectReponse> = [];
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

  private columns: Array<any> = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      sorter: (a: any, b: any) => a.id.length - b.id.length
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      scopedSlots: { customRender: 'names' },
      sorter: (a: any, b: any) => a.name.length - b.name.length
    },
    {
      title: 'Tên liên hệ',
      dataIndex: 'contactName',
      key: 'contactName',
      align: 'center',
      sorter: (a: any, b: any) => a.contactName.length - b.contactName.length
    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'employeeName',
      key: 'employeeName',
      align: 'center',
      scopedSlots: { customRender: 'employeeName' },
      sorter: (a: any, b: any) => a.employeeName.length - b.employeeName.length
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      sorter: (a: any, b: any) => a.email.length - b.email.length
    },
    {
      title: 'Mức độ ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      align: 'center',
      scopedSlots: { customRender: 'priority' },
      sorter: (a: any, b: any) => a.priority.length - b.priority.length
    },
    {
      title: 'Nội dung',
      key: 'description',
      dataIndex: 'description',
      align: 'center',
      sorter: (a: any, b: any) => a.description.length - b.description.length
    },
    {
      title: 'Hành động',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      align: 'center'
    }
  ];

  async created () {
    this.formEdit = this.$form.createForm(this)
    this.formAdd = this.$form.createForm(this)
  }

  async onSearch (values: string) {
    this.searchLeads.name = values
    this.$axios
      .$post('/Leads/searchleads', this.searchLeads)
      .then((response) => {
        this.dataSource = response
      })
      .catch((error) => {
        console.log(error)
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
    this.leadInfo = this.dataSource.find(x => x.id == key)
    this.employeeId = this.leadInfo.employeeId
    this.priorityvalue = this.leadInfo.priority
    this.leadId = this.leadInfo.id
    this.employeeName = this.leadInfo.employeeName
    this.formEdit.getFieldDecorator('name', { initialValue: '' })
    this.formEdit.getFieldDecorator('contactName', { initialValue: '' })
    this.formEdit.getFieldDecorator('employeeName', { initialValue: '' })
    this.formEdit.getFieldDecorator('email', { initialValue: '' })
    this.formEdit.getFieldDecorator('phone', { initialValue: '' })
    this.formEdit.getFieldDecorator('description', { initialValue: '' })
    this.formEdit.getFieldDecorator('website', { initialValue: '' })
    this.formEdit.getFieldDecorator('priority', { initialValue: '' })
    this.formEdit.setFields({
      name: { value: this.leadInfo.name }
    })
    this.formEdit.setFields({
      contactName: { value: this.leadInfo.contactName }
    })
    this.formEdit.setFields({
      employeeName: { value: this.leadInfo.employeeName }
    })
    this.formEdit.setFields({
      email: { value: this.leadInfo.email }
    })
    this.formEdit.setFields({
      phone: { value: this.leadInfo.phone }
    })
    this.formEdit.setFields({
      website: { value: this.leadInfo.website }
    })
    this.formEdit.setFields({
      description: { value: this.leadInfo.description }
    })
    this.formEdit.setFields({
      priority: { value: this.leadInfo.priority + ' Sao' }
    })
  }

  handleCancel (e: any) {
    console.log(e)
    this.visibleAdd = false
    this.visible2 = false
  }

  handleOk (e: any) {
    this.confirmLoading = true
    setTimeout(() => {
      this.visibleAdd = false
      this.visible2 = false
      this.confirmLoading = false
    }, 200)
  }

  handleSubmitAdd (e: any) {
    e.preventDefault()
    this.formAdd.validateFields((err: any, values: ILeadsResponse) => {
      if (!err) {
        this.isSubmit = true
        values.employeeId = this.employeeId
        const a = this.dataemployee.find(x => x.id == this.employeeId)
        values.employeeName = a.name
        values.priority = this.priorityAddvalue
        this.$axios
          .$post('/Leads/create', values)
          .then(async (response) => {
            this.visibleAdd = false
            this.isSubmit = false
            this.dataSource = response
            this.openNotificationWithSuccess('Thêm tiềm năng thành công')
          })
          .catch((error) => {
            this.visibleAdd = false
            this.isSubmit = false
            this.openNotificationWithEror('Thêm tiềm năng không thành công')
          })
      }
    })
  }

  handleSubmitEdit (e: any) {
    e.preventDefault()
    this.formEdit.validateFields((err: any, values: ILeadsResponse) => {
      if (!err) {
        this.isSubmit = true
        values.employeeId = this.employeeId
        values.id = this.leadId
        values.priority = this.priorityvalue
        values.employeeName = this.employeeName.toString()
        this.$axios
          .$post('/Leads/Update', values)
          .then((response) => {
            this.visible2 = false
            this.isSubmit = false
            this.openNotificationWithSuccess(
              'Cập nhập thông tin tiềm năng thành công'
            )
            this.dataSource = response
          })
          .catch((error) => {
            this.visible2 = false
            this.isSubmit = false
            this.openNotificationWithEror(
              'Cập nhập thông tin tiềm năng không thành công'
            )
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

  onDelete (key: number) {
    this.delete.id = key
    this.$axios
      .$post('/Leads/removeleads', this.delete)
      .then((response) => {
        this.dataSource = this.dataSource.filter(
          (item: any) => item.id !== key
        )
        this.openNotificationWithSuccess('Xóa tiềm năng thành công')
      })
      .catch((error) => {
        console.log(error)
        this.openNotificationWithEror('Xóa tiềm năng không thành công')
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

  handleSelectChangeEditEmployeeSelect (value: any) {
    console.log(value)
    this.employeeId = value
    const a = this.dataemployee.find(x => x.id == value)
    this.employeeName = a.name
    this.positionSelect.id = value
    // this.$axios
    //   .post("/Leads/getallposition", this.positionSelect)
    //   .then((response: any) => {
    //     this.positionInput = response;
    //   })
    //   .catch((error) => {});
    // this.positioned = this.positionInput[0];
    // this.formEdit.setFields({
    //   position: { value: this.positionInput[0] },
    // });
    this.formEdit.setFieldsValue({ value })
  }

  handleSelectChangeEditPrioritySelect (value: any) {
    console.log(value)
    this.priorityvalue = value.charAt(0)
    this.formEdit.setFieldsValue({ value })
  }

  handleSelectChangeAddPEmployeeSelect (value: any) {
    console.log(value)
    this.employeeId = value
    // this.$axios
    //   .post("/Leads/getallposition", this.positionSelect)
    //   .then((response: any) => {
    //     this.positionInput = response;
    //   })
    //   .catch((error) => {});
    // this.positioned = this.positionInput[0];
    // this.formAdd.setFields({
    //   position: { value: this.positioned.name },
    // });
    this.formAdd.setFieldsValue({ value })
  }

  handleSelectChangeAddPrioritySelect (value: any) {
    this.priorityAddvalue = value.charAt(0)
    this.formAdd.setFieldsValue({ value })
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
  margin: 25px 5px;
  align-items: center;
}
.header-text {
  font-size: 30px;
  margin: 10px 0 16px 24px;
}
</style>
