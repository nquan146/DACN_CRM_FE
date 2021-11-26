<template>

	<!-- Active Users Card -->
	<a-card :bordered="false" class="dashboard-bar-chart">
		<div class="card-title">
			<p style="font-size:16px;font-weight:bold">Tổng Số Doanh Thu <span class="text-success">+23%</span></p>
		</div>
		<chart-bar :height="220" :data="barChartData"></chart-bar>
		<div class="card-content">
			<p style="font-size:16px;font-weight:bold">Doanh thu quý này đầy biến động</p>
		</div>
		<a-row class="card-footer" type="flex" justify="center" align="top">
			<a-col :span="6">
				<h4>3,6%</h4>
				<span>Giảm</span>
			</a-col>
			<a-col :span="6">
				<h4>2%</h4>
				<span>Tăng</span>
			</a-col>
			<a-col :span="6">
				<h4>3,5%</h4>
				<span>Giảm</span>
			</a-col>
			<a-col :span="6">
				<h4>10%</h4>
				<span>Tăng</span>
			</a-col>
		</a-row>
	</a-card>
	<!-- Active Users Card -->

</template>

<script>

	// Bar chart for "Active Users" card.
	import ChartBar from '../Charts/ChartBar' ;

	export default ({
		components: {
			ChartBar,
		},
		data() {
			return {
				// Data for bar chart.
				barChartData: {
					labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9","Tháng 10",'Tháng 11','Tháng 12'],
					datasets: [{
						label: "Doanh Thu",
						backgroundColor: '#fff',
						borderWidth: 0,
						borderSkipped: false,
						borderRadius: 6,
						data: [850, 600, 500, 620, 900, 500, 900, 630, 900,500,400,700],
						maxBarThickness: 20,
					}, ],
				},
			}
		},
	})

</script>