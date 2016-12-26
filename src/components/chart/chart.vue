<template>
	<div class="chartWrapper">
		<div v-show="showChart" ref="chart" class="chart"></div>
		<div class="erroInfo" v-show = "!showChart">数据有误，初始化失败</div>
	</div>	
</template>
<script>
import ECharts from 'echarts';

export default {
	data() {
		return {
			showChart: true
		};
	},
	methods: {
		// 开始渲染
		startRender: function(option) {
			let _this = this;
			_this.$nextTick(function() {
				let chart = ECharts.init(_this.$refs.chart);
				try {
					if (!option) { // 如果页面切换太快需要渲染的组件可能已经销毁
						return;
					}
					chart.setOption(option);
				} catch (e) {
					_this.showChart = false;
				}
			});
		}
	}
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.chartWrapper
		width: 100%
		height: 100%
		position: relative
		.chart
			width: 100%
			height: 100%
		.erroInfo
			position: absolute
			top: 50%
			left: 50%
			transform: translateX(-50%) translateY(-50%);
			color: #97a6ad
</style>
