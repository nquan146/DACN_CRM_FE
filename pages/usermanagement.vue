<template>
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
        <a-tag v-if="record.active === false" :color="'volcano'">
          Không cho phép
        </a-tag>
        <a-tag v-else :color="'green'">
          Cho phép
        </a-tag>
      </template>
      <span slot="action" slot-scope="text, record">
        <div style="justify-content: center; display: flex; flex-wrap: wrap; align-items: center">
          <a href="#" @click="showEditTrans(record.id)"> <a-icon type="eye" style="font-size: 20px" /> </a>
          <a-divider type="vertical" />
        </div>
      </span>
    </a-table>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  layout: 'menu',
  async asyncData (context:Context) {
    const datauser = await context.$axios.$get('/Users')
    return {
      datauser
    }
  }
})
export default class UserManagement extends Vue {
  private columns: Array<any> = [
    {
      title: 'STT',
      scopedSlots: { customRender: 'serial' }
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Nhóm',
      dataIndex: 'permission_Name'
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
