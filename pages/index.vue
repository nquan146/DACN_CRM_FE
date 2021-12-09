<template>
  <div>
    <!-- Counter Widgets -->
    <a-row :gutter="20">
      <a-col :span="24" :lg="8" :xl="8" class="mb-24">
        <!-- Widget 1 Card -->
        <WidgetCounter
          :title="'Khách hàng mới tháng này'"
          :value="dataNewCustomer.quantity"
          :suffix="dataNewCustomer.ratio < 0 ? dataNewCustomer.ratio + '%' : '+' + dataNewCustomer.ratio + '%' "
          :icon="iconCustomer"
          :status="dataNewCustomer.ratio <= 0 ?'danger':''"
        />
        <!-- / Widget 1 Card -->
      </a-col>
      <a-col :span="24" :lg="8" :xl="8" class="mb-24">
        <!-- Widget 1 Card -->
        <WidgetCounter
          :title="'Cơ hội mới tháng này'"
          :value="dataNewLead.quantity"
          :suffix="dataNewLead.ratio < 0 ? dataNewLead.ratio + '%' : '+' + dataNewLead.ratio + '%' "
          :icon="iconLead"
          :status="dataNewLead.ratio <= 0 ? 'danger': ''"
        />
        <!-- / Widget 1 Card -->
      </a-col>
      <a-col :span="24" :lg="8" :xl="8" class="mb-24">
        <!-- Widget 1 Card -->
        <WidgetCounter
          :title="'Hợp đồng mới tháng này'"
          :value="dataNewContract.quantity"
          :suffix="dataNewContract.ratio < 0 ? dataNewContract.ratio + '%' : '+' + dataNewContract.ratio + '%' "
          :icon="iconContract"
          :status="dataNewContract.ratio <= 0 ? 'danger': ''"
        />
        <!-- / Widget 1 Card -->
      </a-col>
    </a-row>
    <a-row :gutter="20" type="flex" align="stretch">
      <a-col :span="24" :lg="12" :md="24" class="mb-24">
        <a-card :bordered="false" class="dashboard-bar-chart">
          <p style="font-size:16px;font-weight:bold">
            Tổng Số Doanh Thu Năm Nay <span class="text-success"> {{ current.getFullYear() }} </span>
          </p>
          <chart-bar :height="300" :data="barChartData" />
        </a-card>
        <!-- / Widget 1 Card -->
      </a-col>
      <a-col :span="24" :lg="12" :md="24" class="mb-24">
        <a-card :bordered="false" class="dashboard-bar-chart">
          <p style="font-size:16px;font-weight:bold">
            Số Lượng Sử Dụng Dịch Vụ Năm Nay <span class="text-success">{{ current.getFullYear() }}</span>
          </p>
          <chart-bar
            :height="300"
            :data="barChartService"
            text="Tổng tiền"
          />
        </a-card>
        <!-- / Widget 1 Card -->
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { IChartData } from '@/src/models/response/barChartDataResponse'
// Bar chart for "Active Users" card.
import { Context } from '@nuxt/types'
import CardBarChart from '../components/Cards/CardBarChart.vue'
import ChartBar from '../components/Charts/ChartBar.vue'
// Line chart for "Sales Overview" card.
import CardLineChart from '../components/Cards/CardLineChart.vue'

// Counter Widgets
import WidgetCounter from '../components/Widgets/WidgetCounter.vue'
import { IService } from '~/src/models/response/serviceRespone'
// "Projects" table component.

// Counter Widgets stats

// "Projects" table list of columns and their properties.
// import MenuItem from 'ant-design-vue/types/menu/menu-item'
@Component({
  layout: 'menu',
  name: 'index',
  components: {
    CardBarChart,
    CardLineChart,
    ChartBar,
    WidgetCounter
  },
  async asyncData (context:Context) {
    const dataNewCustomer = await context.$axios.$get('/Statistic/statistic-new-customer')
    const dataNewLead = await context.$axios.$get('/Statistic/statistic-new-lead')
    const dataRevenue = await context.$axios.$get('/Statistic/statistic-revenue')
    const dataService = await context.$axios.$get('/Statistic/get-all-service')
    const dataStatisticService = await context.$axios.$get('/Statistic/statistic-service')
    const dataNewContract = await context.$axios.$get('/Statistic/statistic-contract')
    return {
      dataNewCustomer,
      dataRevenue,
      dataService,
      dataStatisticService,
      dataNewLead,
      dataNewContract
    }
  }
})
export default class IndexPage extends Vue {
  iconCustomer:string = '<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
'<path fill-rule="evenodd" clip-rule="evenodd" d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z" fill="#111827"/>' +
'</svg>'

  iconLead:string ='<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
'<path d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z" fill="#111827"/>' +
'<path d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z" fill="#111827"/>' +
'<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z" fill="#111827"/>' +
'</svg>'

  iconContract:string ='<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
'<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="#111827"/>' +
'</svg>'

current:Date = new Date()
private dataRevenue!:IChartData
private dataStatisticService!:IChartData
private dataService: Array<IService> =[]

private barChartData:any = {
  labels: [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ],
  datasets: [
    {
      label: 'Doanh thu',
      backgroundColor: '#fff',
      borderWidth: 0,
      borderSkipped: false,
      borderRadius: 3,
      data: [],
      maxBarThickness: 25
    }
  ]
}

private barChartService:any = {
  labels: [],
  datasets: [
    {
      label: 'Hợp đồng sử dụng',
      backgroundColor: '#fff',
      borderWidth: 0,
      borderSkipped: false,
      borderRadius: 3,
      data: [],
      maxBarThickness: 25
    }
  ]
}

created () {
  this.barChartData.datasets[0].data = this.dataRevenue.data
  this.barChartService.datasets[0].data = this.dataStatisticService.data
  this.barChartService.labels = this.dataService.map(s => s.name)
}

// "Projects" table list of rows and their properties.
data () {
  return {
    barChartData3: {
      labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
      datasets: [
        {
          label: 'Sales',
          backgroundColor: '#fff',
          borderWidth: 0,
          borderSkipped: false,
          borderRadius: 3,
          data: [850, 600, 500, 620, 900, 500, 900, 630, 900, 500],
          maxBarThickness: 20
        }
      ]
    }
    // Associating table data with its corresponding property.

    // Counter Widgets Stats
  }
}
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.chartbar{
    border: 1px solid #eee;
    border-radius: 3px;
    margin-bottom: 20px;
    height: 260px;
}
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
