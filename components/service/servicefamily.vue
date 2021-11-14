<template>
  <a-table
    :columns="columns"
    :row-key="(record) => record.id"
    :data-source="dataservice"
    :pagination="{ pageSize: 5 }"
    bordered
  >
    <span slot="serial" slot-scope="text, record, index">
      {{ index + 1 }}
    </span>
    <span slot="speed" slot-scope="text, record">
      {{ record.speed }} Mbps
    </span>
    <span slot="action" slot-scope="text, record">
      <div style="justify-content: center; display: flex; flex-wrap: wrap; align-items: center">
        <a :href="'/customerinfor/' + record.id"> <a-icon type="eye" style="font-size: 20px" /> </a>
        <a-divider type="vertical" />
        <a-popconfirm
          v-if="dataservice.length"
          title="Chắc chắn muốn xóa?"
          @confirm="() => onDeleteCustomer(record.id)"
        >
          <a href="#"><a-icon type="delete" style="font-size: 20px" /></a>
        </a-popconfirm>
      </div>
    </span>
  </a-table>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator'
import { IService } from '@/src/models/response/serviceRespone'
@Component({
  name: 'servicefamily'
})
export default class ServiceFamily extends Vue {
    @PropSync('servicefamily', { type: Array })
    private dataservice!: Array<IService>

    private columns: Array<any> = [
      {
        title: 'STT',
        scopedSlots: { customRender: 'serial' }
      },
      {
        title: 'Tên dịch vụ',
        dataIndex: 'name'
      },
      {
        title: 'Tốc độ',
        dataIndex: 'speed',
        scopedSlots: { customRender: 'speed' }
      },
      {
        title: 'Giá',
        dataIndex: 'price'
      },
      {
        title: 'Hành động',
        scopedSlots: { customRender: 'action' },
        key: 'action'
      }
    ];
}
</script>

<style>

</style>
