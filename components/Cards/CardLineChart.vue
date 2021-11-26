<template>

	<a-card :bordered="false" class="dashboard-bar-line header-solid">
		<template #title>
			<p>Biểu Đồ Tổng số Doanh Thu <span class="text-success">+20%</span></p>	
		</template>
		<template #extra>
			<a-badge color="primary" class="badge-dot-secondary"/>
		</template>
		<chart-line :height="310" :data="lineChartData"></chart-line>
	</a-card>

</template>

<script>

	// Bar chart for "Active Users" card.
	import ChartLine from '../Charts/ChartLine' ;

	export default ({
		components: {
			ChartLine,
		},
		data() {
			return {

				// Data for line chart.
				lineChartData: {
					labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9","Tháng 10",'Tháng 11','Tháng 12'],
					datasets: [{
						label: "Mobile apps",
						tension: 0.4,
						borderWidth: 0,
						pointRadius: 0,
						borderColor: "#1890FF",
						borderWidth: 3,
						data: [50, 100, 80, 200, 300, 250, 200, 300, 250,350,400,450],
						maxBarThickness: 6

					},],
				},
			}
		},
	})

</script>