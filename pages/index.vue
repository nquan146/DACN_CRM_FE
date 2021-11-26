<template>
  <div>
    <!-- Counter Widgets -->
    <a-row :gutter="20">
      <a-col :span="24" :lg="8" :xl="8" class="mb-24">
        <a-card :bordered="false" class="chartbar">
          <p style="font-size:16px;font-weight:bold">Tổng Số Doanh Thu <span class="text-success">+23%</span></p>
          <chart-bar :height="180" :data="barChartData"></chart-bar>
        </a-card>
        <!-- / Widget 1 Card -->
      </a-col>
      <a-col :span="24" :lg="10" :xl="8" class="mb-24">
        <a-card :bordered="false" class="chartbar">
           <p style="font-size:16px;font-weight:bold">Tổng Số Doanh Thu  <span class="text-success">+23%</span></p>
          <chart-bar
            :height="180"
            :data="barChartData2"
            text="Tổng tiền"
          ></chart-bar>
        </a-card>
        <!-- / Widget 1 Card -->
      </a-col>
      <a-col :span="24" :lg="10" :xl="8" class="mb-24">
        <a-card :bordered="false" class="chartbar">
           <p style="font-size:16px;font-weight:bold">Tổng Số Doanh Thu  <span class="text-success">+23%</span></p>
          <chart-bar :height="180" :data="barChartData3"></chart-bar>
        </a-card>
        <!-- / Widget 1 Card -->
      </a-col>
    </a-row>
    <!-- / Counter Widgets -->

    <!-- Charts -->
    <a-row :gutter="20" type="flex" align="stretch">
      <a-col :span="24" :lg="10" class="mb-24">
        <!-- Active Users Card -->
        <CardBarChart></CardBarChart>
        <!-- Active Users Card -->
      </a-col>
      <a-col :span="24" :lg="14" class="mb-24">
        <!-- Sales Overview Card -->
        <CardLineChart></CardLineChart>
        <!-- / Sales Overview Card -->
      </a-col>
    </a-row>
    <!-- / Charts -->

    <!-- Table & Timeline -->
    <!-- / Table & Timeline -->

    <!-- / Cards -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// Bar chart for "Active Users" card.
import CardBarChart from "../components/Cards/CardBarChart.vue";
import ChartBar from "../components/Charts/ChartBar.vue";
// Line chart for "Sales Overview" card.
import CardLineChart from "../components/Cards/CardLineChart.vue";

// Counter Widgets
// "Projects" table component.

// Counter Widgets stats

// "Projects" table list of columns and their properties.
// import MenuItem from 'ant-design-vue/types/menu/menu-item'
@Component({
  layout: "menu",
  name: "index",
  components: {
    CardBarChart,
    CardLineChart,
    ChartBar,
  },
})
export default class IndexPage extends Vue {
  created() {}
  // "Projects" table list of rows and their properties.
  data() {
    return {
      barChartData: {
        labels: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ],
        datasets: [
          {
            label: "Sales",
            backgroundColor: "#fff",
            borderWidth: 0,
            borderSkipped: false,
            borderRadius: 3,
            data: [850, 600, 500, 620, 900, 500, 900, 630, 900, 500],
            maxBarThickness: 20,
          },
        ],
      },
      barChartData2: {
        labels: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ],
        datasets: [
          {
            label: "Sales",
            backgroundColor: "#fff",
            borderWidth: 0,
            borderSkipped: false,
            borderRadius: 3,
            data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,1100,1200],
            maxBarThickness: 20,
          },
        ],
      },
      barChartData3: {
        labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
        datasets: [
          {
            label: "Sales",
            backgroundColor: "#fff",
            borderWidth: 0,
            borderSkipped: false,
            borderRadius: 3,
            data: [850, 600, 500, 620, 900, 500, 900, 630, 900, 500],
            maxBarThickness: 20,
          },
        ],
      },
      // Associating table data with its corresponding property.

      // Counter Widgets Stats
    };
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
