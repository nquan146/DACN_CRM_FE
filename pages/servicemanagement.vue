<template>
  <div>
    <section class="TableList">
      <a-divider orientation="left">
        Danh sách dịch vụ
      </a-divider>
      <div class="buttonback">
        <a href="#" @click="showModal()"><a-button> <a-icon type="plus" />Thêm dịch vụ </a-button></a>
      </div>
      <a-tabs
        :active-key="tabActive"
        :tab-bar-style="{ textAlign: 'left', borderBottom: 'unset' }"
        @change="changeTab"
      >
        <a-tab-pane key="tab1" :tab="'Cho hộ gia đình'">
          <ServiceFamily :servicefamily.sync="dataservicefamily" />
        </a-tab-pane>
        <a-tab-pane key="tab2" :tab="'Cho hộ doanh nghiệp'">
          <ServiceCompany :servicecompany="dataservicecompany" />
        </a-tab-pane>
      </a-tabs>
    </section>
    <a-modal
      v-model="visible"
      title="Thông tin hợp đồng"
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
import { Vue, Component } from 'vue-property-decorator'
import ServiceCompany from '@/components/service/servicecompany.vue'
import ServiceFamily from '@/components/service/servicefamily.vue'
import { Context } from '@nuxt/types'
import { WrappedFormUtils } from 'ant-design-vue/types/form/form'
import { IService } from '~/src/models/response/serviceRespone'
@Component({
  layout: 'menu',
  components: {
    ServiceFamily,
    ServiceCompany
  },
  async asyncData (context:Context) {
    const dataservicefamily = await context.$axios.$get('/Service/get-all-service-by-type/1')
    const dataservicecompany = await context.$axios.$get('/Service/get-all-service-by-type/2')
    return {
      dataservicefamily,
      dataservicecompany
    }
  }
})
export default class Service extends Vue {
  private tabActive: string = 'tab1'
  private visible: boolean = false
  $notification: any
  private formService!: WrappedFormUtils
  dataservicefamily: Array<IService> =[]
  dataservicecompany: Array<IService> =[]
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

  onSubmitService (e: any) {
    e.preventDefault()
    this.formService.validateFields((err: any, values: any) => {
      if (!err) {
        if (values.id === undefined) {
          this.$axios.$post('/Service/create-service', values).then(async (response) => {
            if (response === true) {
              this.openNotification(response)
              if (values.type === 1) {
                this.dataservicefamily = await this.$axios.$get('/Service/get-all-service-by-type/1')
              } else {
                this.dataservicecompany = await this.$axios.$get('/Service/get-all-service-by-type/2')
              }
            } else {
              this.openNotification(response)
            }
          })
        }
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

  private changeTab (key: string) {
    this.tabActive = key
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
</style>
