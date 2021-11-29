<template>

	<a-card :bordered="false" class="chartbar">
		<chart-bar :height="200" :data="barChartData"></chart-bar>
	</a-card>

</template>

<script>

	// Bar chart for "Active Users" card.
	import ChartBar from '../components/Charts/ChartBar.vue' ;

	export default ({
		components: {
			ChartBar,
		},
		data() {
			return {

				// Data for line chart.
				barChartData: {
					labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09","10"],
					datasets: [{
						label: "Sales",
						backgroundColor: '#fff',
						borderWidth: 0,
						borderSkipped: false,
						borderRadius: 3,
						data: [850, 600, 500, 620, 900, 500, 900, 630, 900,500],
						maxBarThickness: 20,
					}, ],
				},
			}
		},
	})

</script>
<style scoped>
.chartbar{
    border: 1px solid black;
    margin-bottom: 20px;
}
</style>