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
    </div>
    <div>
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="Sản Phẩm">
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
                @click="showEdit(record.id)"
              />
              <a-divider type="vertical" />
              <a-popconfirm
                v-if="dataFeedBack2.length"
                title="Bạn có chắc muốn xóa phản hồi này?"
                @confirm="() => onDelete(record.id)"
              >
                <a-icon type="delete" style="font-size: 18px; cursor: pointer" />
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
                @click="showEdit(record.id)"
              />
              <a-divider type="vertical" />
              <a-popconfirm
                v-if="dataFeedBack1.length"
                title="Bạn có chắc muốn xóa phản hồi này?"
                @confirm="() => onDelete(record.id)"
              >
                <a-icon type="delete" style="font-size: 18px; cursor: pointer" />
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
@Component({
  layout: 'menu',
  name: 'complaint',
  async asyncData (context:Context) {
    const dataFeedBack1 = await context.$axios.$get('/FeedBacks/GetFeedBack1')
    const dataFeedBack2 = await context.$axios.$get('/FeedBacks/GetFeedBack2')
    const dataEmployee = await context.$axios.$get('/Employee/GetEmployees')
    return {
      dataFeedBack1,
      dataFeedBack2,
      dataEmployee
    }
  }
})
export default class Complaint extends Vue {
    private visible: boolean = false
    private dataFeedBack2: Array<IFeedBackResponse> =[]
    private dataFeedBack1: Array<IFeedBackResponse> =[]
    private formComplaint!: WrappedFormUtils
    private tabkey:number = 1;
    private searchFeedBack:SearchFeedBack = {
      value: ''
    }

    private deleteFeedBack: IdFeedBack = {
      id: 0
    }

    $notification: any

    private loading:boolean = false
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

    onDelete (key:number) {
      this.deleteFeedBack = {
        id: key
      }
      this.$axios.$post('/FeedBacks/removefeedback', this.deleteFeedBack).then((response) => {
        this.dataFeedBack2 = this.dataFeedBack2.filter(item => item.id !== key)
        this.dataFeedBack1 = this.dataFeedBack1.filter(item => item.id !== key)
        this.openNotification(response)
      }).catch((error) => {
        this.openNotification(error)
      })
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
    callback (key:number) {
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
.header-tongquan {
  display: flex;
  justify-content: flex-end;
  margin: 25px 5px;
  align-items: center;
}
</style>
