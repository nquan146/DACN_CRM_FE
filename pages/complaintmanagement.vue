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
    </div>
    <div>
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="Đang Phê Duyệt">
          <a-table
            :columns="columns"
            :data-source="dataComplaint"
            :rowKey="(data) => data.id"
            bordered
          >
           <span slot="statusName" slot-scope="statusName,record">
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
          <a-icon
            type="mail"
            @click="showEdit(record.id)"
            style="font-size: 18px"
          />
           <a-divider type="vertical" />
          <a-popconfirm
            v-if="dataComplaint.length"
            title="Bạn có chắc muốn xóa khiếu nại này?"
            @confirm="() => onDelete(record.id)"
          >
            <a-icon type="delete" style="font-size: 18px; cursor: pointer" />
          </a-popconfirm>
         </span>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Đã Duyệt">
          <a-table
            :columns="columns"
            :data-source="dataComplaint1"
            :rowKey="(data) => data.id"
            bordered
          >
           <span slot="statusName" slot-scope="statusName">
           <a-tag color="green" style="font-size: 14px">
            {{ statusName }}
          </a-tag>
        </span>
         <span slot="action" slot-scope="text, record">
          <a-popconfirm
            v-if="dataComplaint1.length"
            title="Bạn có chắc muốn xóa khiếu nại này?"
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
import { IComplaintResonse } from '@/src/enums/response/IComplaintResonse'
import { WrappedFormUtils } from 'ant-design-vue/types/form/form'
import {SearchComplain} from "@/src/enums/response/SearchComplain"
import {IdComplain} from "@/src/enums/response/IdComplain"
@Component({
  layout: 'menu',
  name: 'complaint',
  async asyncData (context:Context) {
    const dataComplaint = await context.$axios.$get('/Complaint/getallcomplainstatus2')
    const dataComplaint1 = await context.$axios.$get('/Complaint/getallcomplainstatus1')
    const dataEmployee = await context.$axios.$get('/Employee/GetEmployees')
    return {
      dataComplaint,
      dataComplaint1,
      dataEmployee
    }
  }
})
export default class Complaint extends Vue {
    private visible: boolean = false
    private dataComplaint: Array<IComplaintResonse> =[]
    private dataComplaint1: Array<IComplaintResonse> =[]
    private formComplaint!: WrappedFormUtils
    private complain: IComplaintResonse;
    private tabkey:number = 1;
    statusComplain:IdComplain = {
      id:0
    }
    private deleteComplain:IdComplain ={
      id: 0
    }
    private searchComplain:SearchComplain = {
      name: ''
    }
    $notification: any

    private loading:boolean = false
    private columns: Array<any> = [
      {
        title: 'STT',
        key:'id',
        align:'center',
        dataIndex: 'id',
      },
      {
        title: 'Khách hàng',
        key:'customerName',
        align:'center',
        dataIndex: 'customerName'
      },
      {
        title: 'Khiếu nại',
         key:'complainName',
         align:'center',
        dataIndex: 'complainName'
      },
      {
        title: 'Ngày nhận',
         key:'receivedDate',
         align:'center',
        dataIndex: 'receivedDate'
      },
      {
        title: 'Trạng thái',
         key:'statusName',
         align:'center',
        dataIndex: 'statusName',
        scopedSlots: { customRender: 'statusName' }
      },
       {
      title: "Hành động",
      key: "action",
      scopedSlots: { customRender: "action" },
      align: "center",
    },
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
   onDelete(key:number) {      
        this.deleteComplain={
        id:key
        }
        this.$axios.$post('/Complain/deletecomplain',this.deleteComplain).then((response)=>{
            this.dataComplaint=this.dataComplaint.filter(item => item.id !== key)
            this.dataComplaint1=this.dataComplaint1.filter(item => item.id !==key)
            this.openNotification(response);
         }).catch((error)=>{
             this.openNotification(error);
         }) 
    }
     onStatus(key:number) {      
        this.statusComplain.id = key
        this.$axios.$post('/Complain/updatestatus',this.statusComplain).then(async (response)=>{
            this.dataComplaint=await this.$axios.$get('/Complain/getallcomplainstatus2')
            this.dataComplaint1=await this.$axios.$get('/Complain/getallcomplainstatus1')
            this.openNotification(response);
         }).catch((error)=>{
             this.openNotification(error);
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
    callback(key:number) {
      console.log(key);
      this.tabkey = key;
    }
    onSubmitComplaint (e: any) {
      e.preventDefault()
    }
      async onSearch(values: string) {
    this.searchComplain.name = values;
    console.log(this.tabkey)
    if(this.tabkey == 1){
      this.$axios
      .$post("/Complain/searchcomplainstatus2", this.searchComplain)
      .then((response) => {
        this.dataComplaint = response;
      })
      .catch((error) => {
         this.openNotification(error);
      });
    }
    else{
      this.$axios
      .$post("/Complain/searchcomplainstatus1", this.searchComplain)
      .then((response) => {
        this.dataComplaint1 = response;
      })
      .catch((error) => {
         this.openNotification(error)
      });
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
