<template>
  <section class="TableList">
    <a-divider orientation="left">
      Danh sách khách hàng
    </a-divider>
    <a-button type="primary" @click="showModalAlert">
      Đến hạn đóng tiền
    </a-button>
    <div class="buttonback">
      <nuxt-link to="/addcustomer/"><a-button> <a-icon type="plus" />Thêm khách hàng </a-button></nuxt-link>
    </div>
    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="dataCustomers"
      :pagination="{ pageSize: 15 }"
      :loading="loading"
      bordered
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <template slot="gender" slot-scope="text, record">
        <span v-if="record.gender === 1"> Nam </span>
        <span v-else> Nữ </span>
      </template>
      <span slot="action" slot-scope="text, record">
        <div style="justify-content: center; display: flex; flex-wrap: wrap; align-items: center">
          <nuxt-link :to="{name:'customerinfor-id',params:{id:record.id}}"> <a-icon type="eye" style="font-size: 20px" /> </nuxt-link>
          <a-divider type="vertical" />
          <a-popconfirm
            v-if="dataCustomers.length"
            title="Chắc chắn muốn xóa?"
            @confirm="() => onDeleteCustomer(record.id)"
          >
            <a href="#"><a-icon type="delete" style="font-size: 20px" /></a>
          </a-popconfirm>
        </div>
      </span>
      <div
        slot="filterDropdown"
        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
        style="padding: 8px"
      >
        <a-input
          v-ant-ref="c => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block;"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          Tìm kiếm
        </a-button>
        <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
          Đặt lại
        </a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <template slot="customRender" slot-scope="text, record, index, column">
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
            <mark
              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
              :key="i"
              class="highlight"
            >{{ fragment }}</mark>
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <template v-else>
          {{ text }}
        </template>
      </template>
    </a-table>
    <a-modal v-model="visibleAlert" title="Những khách hàng đến hạn đóng tiền" :width="1000" :footer="null">
      <a-table
        :columns="columns2"
        :row-key="(record) => record.contractID"
        :data-source="dataExpire"
        :pagination="{ pageSize: 5 }"
        :loading="loading"
        bordered
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
      </a-table>
    </a-modal>
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
    const dataExpire = await context.$axios.$get('/Customer/get-customer-expires')
    return {
      dataCustomers,
      dataExpire
    }
  }
})
export default class CustomerManagement extends Vue {
    $notification: any
    private loading:boolean = false
    private dataCustomers: Array<ICustomer>=[]
    searchText:string = ''
    searchInput:any = null
    searchedColumn:string = ''
    $message: any
    private visibleAlert: boolean = false

    showModalAlert () {
      this.visibleAlert = true
    }

    private columns = [
      {
        title: 'STT',
        scopedSlots: { customRender: 'serial' }
      },
      {
        title: 'Tên khách hàng',
        dataIndex: 'name',
        sorter: (a:any, b:any) => a.name.length - b.name.length,
        sortDirections: ['ascend', 'descend'],
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender'
        },
        onFilter: (value:any, record:any) =>
          record.name
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
      },
      {
        title: 'Giới tính',
        dataIndex: 'gender',
        scopedSlots: { customRender: 'gender' },
        filters: [
          {
            text: 'Nam',
            value: 1
          },
          {
            text: 'Nữ',
            value: 0
          }
        ],
        filterMultiple: false,
        onFilter: (value:any, record:any) => record.gender.toString().indexOf(value) === 0
      },
      {
        title: 'Tuổi',
        dataIndex: 'age'
      },
      {
        title: 'Địa chỉ',
        dataIndex: 'address',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender'
        },
        onFilter: (value:any, record:any) =>
          record.address
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
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

    private columns2: Array<any> = [
      {
        title: 'STT',
        scopedSlots: { customRender: 'serial' }
      },
      {
        title: 'Tên khách hàng',
        dataIndex: 'name'
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'phoneNumber'
      },
      {
        title: 'Mã hợp đồng',
        dataIndex: 'contractID',
        scopedSlots: { customRender: 'speed' }
      },
      {
        title: 'Ngày đóng tiền gần nhất',
        dataIndex: 'paymentDate'
      },
      {
        title: 'Số ngày trễ',
        dataIndex: 'expirationDay'
      }
    ];

    onDeleteCustomer (key:any) {
      this.$axios.$delete('/Customer/delete-customer/' + key)
        .then((response) => {
          this.dataCustomers = this.dataCustomers.filter(item => item.id !== key)
          this.openNotification(response)
        }).catch((error) => { this.$message.warning('Bạn không có quyền thực hiện') })
    }

    handleSearch (selectedKeys:any, confirm:any, dataIndex:any) {
      confirm()
      this.searchText = selectedKeys[0]
      this.searchedColumn = dataIndex
    }

    handleReset (clearFilters:any) {
      clearFilters()
      this.searchText = ''
    }

    openNotification (result: boolean): void {
      this.$notification.config({
        duration: 1
      })
      if (result === true) {
        this.$notification.success({
          message: 'Xóa thành công'
        })
      } else {
        this.$notification.error({
          message: 'Xóa không thành công'
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
</style>
