<template>
	<div class="monitorSummary">
		<div class="title">监控总览</div>
		<div class="content">
			<div class="clusterPicker">
				<span class="text">资源池信息</span>
				<el-select size="mini" v-model="selectedCluster" class="selector">
					<el-option v-if="clusters" v-for="cluster in clusters" :label="cluster.name" :value="cluster"></el-option>
				</el-select>
			</div>
			<div class="clusterSum"></div>
			<div></div>
			<div></div>
		</div>
	</div>	
</template>
<script>
	const QUERYCLUSTER_URL = 'ccmp-center/clusterModule/queryCluster.do?';
	export default {
		data() {
			return {
				clusters: {},
				selectedCluster: {}
			};
		},
		mounted() {
			// 查询集群信息
			let _this = this;
			_this.$http.get(QUERYCLUSTER_URL + 'clusterStatus=1&pageSize=999999').then(
				(res) => {
					let response = res.body;
					if (response.returnDto.status === true) {
						_this.clusters = response.clusterInfo.results;
						_this.selectedCluster = _this.clusters[0];
					} else {
						_this.$alert(response.returnDto.description, '查询集群信息失败', {
							type: 'error'
						});
					}
				});
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.monitorSummary
		.title
			border-bottom: 1px solid #e0e0e0
			font-size: 24px
			padding: 5px 0
		.content
			padding: 10px 0	
			.clusterPicker
				.selector
					display: inline-block
					margin: auto 10px
					width: 100px
				.text
					font-size: 14px		
</style>