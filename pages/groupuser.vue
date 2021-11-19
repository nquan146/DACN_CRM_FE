<template>
  <div class="TableList">
    <div class="account-settings-info-main">
      <div class="account-settings-info-left">
        <a-divider orientation="left">
          Thiết lập nhóm người dùng
        </a-divider>
        <a-menu
          :style="{ border: '0', width: 'auto'}"
          type="inner"
          theme="light"
          mode="inline"
        >
          <a-menu-item v-for="item in dataGroup" :key="item.id" @click="showTablePermission(item.id)">
            {{ item.name }}
            <a-popconfirm
              title="Chắc chắn muốn xóa?"
              @confirm="() => onDeleteGroup(item.id)"
            >
              <a-icon type="delete" style="font-size: 20px; float:right; margin-top:10px;" />
            </a-popconfirm>
          </a-menu-item>
        </a-menu>
        <a-form :form="formGroup" :layout="'inline'" @submit="handleSubmit">
          <a-form-item style="width:70%; margin-top:15px;">
            <a-input
              v-decorator="[
                'name',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Hãy nhập tên nhóm',
                    },
                  ],
                },
              ]"
              placeholder="Thêm nhóm mới"
            />
          </a-form-item>
          <a-button html-type="submit" style="margin-top:20px;">
            <a-icon type="plus" />
          </a-button>
        </a-form>
      </div>
      <div class="account-settings-info-right">
        <a-divider orientation="left">
          Thiết lập quyền
        </a-divider>
        <a-table
          :columns="columnsAction"
          :row-key="(record) => record.id"
          :data-source="dataSourceAction"
          :pagination="false"
          :loading="loading"
          bordered
          :style="'display:' + visible "
        >
          <span slot="checkactionview" slot-scope="text, record" @change="changeActiveView(record.id)">
            <a-checkbox :checked="record.active_View" />
          </span>
          <span slot="checkactionedit" slot-scope="text, record" @change="changeActiveEdit(record.id)">
            <a-checkbox :checked="record.active_Edit" />
          </span>
          <span slot="checkactionadd" slot-scope="text, record" @change="changeActiveAdd(record.id)">
            <a-checkbox :checked="record.active_Add" />
          </span>
          <span slot="checkactiondelete" slot-scope="text, record" @change="changeActiveDelete(record.id)">
            <a-checkbox :checked="record.active_Delete" />
          </span>
        </a-table>
      </div>
    </div>
    <div class="buttonback">
      <a-button type="primary" @click="submitAction">
        Lưu
      </a-button>
    </div>
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
    const dataAction = await context.$axios.$get('/UserPermission/get-action-permission')
    return {
      dataGroup,
      dataAction
    }
  }
})
export default class GroupUser extends Vue {
    private formGroup!: WrappedFormUtils
    private visible:string = 'none'
    private loading:boolean = false
    dataAction:Array<any> =[]
    dataGroup:Array<any> =[]

    created () {
      this.formGroup = this.$form.createForm(this)
    }

    $notification: any
    private columnsPermission: Array<any> = [
      {
        title: 'Tên nhóm',
        dataIndex: 'name',
        scopedSlots: { customRender: 'serial' },
        width: '90%'
      },
      {
        title: 'Hành động',
        scopedSlots: { customRender: 'action' },
        key: 'action'
      }
    ];

    private columnsAction: Array<any> = [
      {
        title: 'Chức năng',
        dataIndex: 'acion_Name',
        align: 'center',
        width: '20%'
      },
      {
        title: 'Truy cập',
        dataIndex: 'active_View',
        scopedSlots: { customRender: 'checkactionview' },
        align: 'center',
        width: '16%'
      },
      {
        title: 'Thêm',
        dataIndex: 'active_Add',
        scopedSlots: { customRender: 'checkactionadd' },
        align: 'center',
        width: '16%'
      },
      {
        title: 'Sửa',
        dataIndex: 'active_Edit',
        scopedSlots: { customRender: 'checkactionedit' },
        align: 'center',
        width: '16%'
      },
      {
        title: 'Xóa',
        dataIndex: 'active_Delete',
        scopedSlots: { customRender: 'checkactiondelete' },
        align: 'center',
        width: '16%'
      }
    ];

    dataSourceAction:Array<any> =[]
    showTablePermission (id: number) {
      this.visible = ''
      this.dataSourceAction = this.dataAction.filter(item => item.permissionID === id)
    }

    private active!:boolean
    changeActiveAdd (id: number) {
      this.active = this.dataAction.find(item => item.id === id).active_Add
      if (this.active === true) {
        this.dataAction.find(item => item.id === id).active_Add = false
      } else {
        this.dataAction.find(item => item.id === id).active_Add = true
      }
    }

    changeActiveView (id: number) {
      this.active = this.dataAction.find(item => item.id === id).active_View
      if (this.active === true) {
        this.dataAction.find(item => item.id === id).active_View = false
      } else {
        this.dataAction.find(item => item.id === id).active_View = true
      }
    }

    changeActiveEdit (id: number) {
      this.active = this.dataAction.find(item => item.id === id).active_Edit
      if (this.active === true) {
        this.dataAction.find(item => item.id === id).active_Edit = false
      } else {
        this.dataAction.find(item => item.id === id).active_Edit = true
      }
    }

    changeActiveDelete (id: number) {
      this.active = this.dataAction.find(item => item.id === id).active_Delete
      if (this.active === true) {
        this.dataAction.find(item => item.id === id).active_Delete = false
      } else {
        this.dataAction.find(item => item.id === id).active_Delete = true
      }
    }

    submitAction () {
      this.$axios.$post('/UserPermission/update-action-permission', this.dataAction)
        .then((response) => {
          this.openNotification(response)
        })
    }

    openNotification (result: boolean): void {
      this.$notification.config({
        duration: 1
      })
      if (result === true) {
        this.$notification.success({
          message: 'Lưu thành công'
        })
      } else {
        this.$notification.error({
          message: 'Lưu không thành công'
        })
      }
    }

    handleSubmit (e: any) {
      e.preventDefault()
      this.formGroup.validateFields((err: any, values: any) => {
        if (!err) {
          this.$axios.$post('/UserPermission/add-action-permission', values).then(async (response) => {
            if (response !== null) {
              this.dataGroup = await this.$axios.$get('/UserPermission/get-permission')
              this.dataAction = response
              this.openNotification(true)
            } else {
              this.openNotification(false)
            }
          }).catch(() => this.openNotification(false))
          this.formGroup.resetFields()
        }
      }
      )
    }

    onDeleteGroup (key:any) {
      this.$axios.$delete('/UserPermission/delete-permission/' + key)
        .then((response) => {
          if (response === true) {
            this.dataGroup = this.dataGroup.filter(item => item.id !== key)
          }
          this.openNotification(response)
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
 .account-settings-info-main {
    width: 100%;
    display: flex;
    height: 100%;
    overflow: auto;

    &.mobile {
      display: block;

      .account-settings-info-left {
        border-right: unset;
        border-bottom: 1px solid #e8e8e8;
        width: 100%;
        height: 50px;
        overflow-x: auto;
        overflow-y: scroll;
      }
      .account-settings-info-right {
        padding: 20px 40px;
      }
    }

    .account-settings-info-left {
      border-right: 1px solid #e8e8e8;
      width: 224px;
    }

    .account-settings-info-right {
      flex: 1 1;
      padding: 8px 40px;

      .account-settings-info-title {
        color: rgba(0,0,0,.85);
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        margin-bottom: 12px;
      }
      .account-settings-info-view {
        padding-top: 12px;
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
