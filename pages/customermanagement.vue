<template>
  <section class="TableList">
    <a-divider orientation="left">
      Danh sách khách hàng
    </a-divider>
    <div class="buttonback">
      <a :href="'/addcustomer/'"><a-button> <a-icon type="plus" />Thêm khách hàng </a-button></a>
    </div>
    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="dataCustomers"
      :pagination="{ pageSize: 15 }"
      :loading="loading"
      bordered
      @change="onChange"
    >
      <template slot="gender" slot-scope="text, record">
        <span v-if="record.gender === 1"> Nam </span>
        <span v-else> Nữ </span>
      </template>
      <span slot="action" slot-scope="text, record">
        <a :href="'/customerinfor/' + record.id"> <a-icon type="eye" style="font-size: 20px" /> </a>
        <a-divider type="vertical" />
        <a-popconfirm
          v-if="dataCustomers.length"
          title="Chắc chắn muốn xóa?"
          @confirm="() => onDeleteExp(record.id)"
        >
          <a href="#"><a-icon type="delete" style="font-size: 20px" /></a>
        </a-popconfirm>
      </span>
    </a-table>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ICustomer } from '@/src/models/response/customerResponse'
import { Context } from '@nuxt/types'
@Component({
  layout: 'menu',
  name: 'customerManagement',
  async asyncData (context:Context) {
    const dataCustomers = await context.$axios.$get('/Customer/get-all-customer')
    return {
      dataCustomers
    }
  }
})
export default class About extends Vue {
    private loading:boolean = false
    private dataCustomers: Array<ICustomer>=[]
    private columns = [
      {
        title: 'Tên khách hàng',
        dataIndex: 'name',
        sorter: (a:any, b:any) => a.name.length - b.name.length,
        sortDirections: ['ascend']
      },
      {
        title: 'Giới tính',
        dataIndex: 'gender',
        scopedSlots: { customRender: 'gender' }
      },
      {
        title: 'Tuổi',
        dataIndex: 'age'
      },
      {
        title: 'Địa chỉ',
        dataIndex: 'address'
      },
      {
        title: 'Nhóm khách hàng',
        dataIndex: 'nameGroup'
      },
      {
        title: 'Hành động',
        scopedSlots: { customRender: 'action' },
        key: 'action'
      }
    ]
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
