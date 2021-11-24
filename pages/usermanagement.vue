<template>
  <div>
    <section class="TableList">
      <a-divider orientation="left">
        Danh sách người dùng
      </a-divider>
      <div class="buttonback">
        <a @click="showModal()"><a-button> <a-icon type="plus" />Thêm người dùng </a-button></a>
      </div>
      <a-table
        :columns="columns"
        :row-key="(record) => record.id"
        :data-source="datauser"
        :pagination="{ pageSize: 10 }"
        :loading="loading"
        bordered
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <template slot="active" slot-scope="text, record">
          <a-popconfirm
            v-if="datauser.length"
            title="Bạn có chắc muốn đổi?"
            @confirm="() => onStatus(record.id)"
          >
            <a-tag v-if="record.active === false" :color="'volcano'">
              Không cho phép
            </a-tag>
            <a-tag v-else :color="'green'">
              Cho phép
            </a-tag>
          </a-popconfirm>
        </template>
        <span slot="action" slot-scope="text, record">
          <div style="justify-content: center; display: flex; flex-wrap: wrap; align-items: center">
            <a href="#" @click="showEditUser(record.id)"> <a-icon type="eye" style="font-size: 20px" /> </a>
          </div>
        </span>
      </a-table>
    </section>
    <a-modal
      v-model="visible"
      title="Thông tin tài khoản"
      on-ok="closeModal"
    >
      <template slot="footer">
        <div style="display: flex; justify-content: space-between">
          <a-button style="margin-left: 10px" @click="closeModal()">
            Hủy
          </a-button>
          <a-button type="primary" @click="onSubmitUser">
            Lưu
          </a-button>
        </div>
      </template>
      <a-form
        :form="formUser"
        :label-col="{ span: 9 }"
        :wrapper-col="{ span: 15 }"
        :label-align="'left'"
      >
        <a-form-item hidden>
          <a-input v-decorator="['id']" />
        </a-form-item>
        <a-form-item
          label="Tên đăng nhập"
        >
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: 'Trường này không được trống' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item
          label="Nhóm người dùng"
        >
          <a-select
            v-decorator="[
              'group',
              {
                rules: [{ required: true , message: 'Trường này không được trống'}],
              },
            ]"
          >
            <a-select-option
              v-for="position in dataGroup"
              :key="position.id"
              :value="position.id"
            >
              {{ position.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="Email"
        >
          <a-input
            v-decorator="[
              'email',
              {
                rules: [{ required: true, message: 'Trường này không được trống' }],
              },
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { Context } from '@nuxt/types'
import { WrappedFormUtils } from 'ant-design-vue/types/form/form'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  layout: 'menu',
  async asyncData (context:Context) {
    const dataGroup = await context.$axios.$get('/UserPermission/get-permission')
    const datauser = await context.$axios.$get('/Users')
    return {
      datauser,
      dataGroup
    }
  }
})
export default class UserManagement extends Vue {
  private visible: boolean = false
  private formUser!: WrappedFormUtils
  private dataSource: any
  private loading:boolean = false
  datauser!: Array<any>
  $notification: any

  created () {
    this.formUser = this.$form.createForm(this)
  }

  private columns: Array<any> = [
    {
      title: 'STT',
      scopedSlots: { customRender: 'serial' }
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'userName'
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'name'
    },
    {
      title: 'Nhóm',
      dataIndex: 'group'
    },
    {
      title: 'Được hoạt động',
      dataIndex: 'active',
      scopedSlots: { customRender: 'active' }
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

  showModal () {
    this.formUser.resetFields()
    this.visible = true
  }

  closeModal () {
    this.formUser.resetFields()
    this.visible = false
  }

  showEditUser (key:number) {
    this.showModal()
    this.dataSource = this.datauser.find(x => x.id === key)
    this.formUser.getFieldDecorator('id', { initialValue: undefined })
    this.formUser.getFieldDecorator('name', { initialValue: '' })
    this.formUser.getFieldDecorator('email', { initialValue: '' })
    this.formUser.getFieldDecorator('group', { initialValue: '' })
    this.formUser.setFields({
      id: { value: this.dataSource.id },
      name: { value: this.dataSource.userName },
      email: { value: this.dataSource.email },
      group: { value: this.dataSource.group }
    })
  }

  onSubmitUser (e: any) {
    e.preventDefault()
  }

  private active!:boolean
  onStatus (key:number) {
    this.$axios.$post('/Users/change-active-user/' + key).then((response) => {
      if (response === true) {
        this.active = this.datauser.find(item => item.id === key).active
        if (this.active === true) {
          this.datauser.find(item => item.id === key).active = false
        } else {
          this.datauser.find(item => item.id === key).active = true
        }
      }
      this.openNotification(response)
    }).catch((error) => {
      this.openNotification(error)
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
</style>
