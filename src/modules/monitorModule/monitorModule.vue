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
			<div class="clusterState">
				<div class="row">
					<div class="cell">
						<div class="icon-wrapper cluster-icon-wrapper">
							<i class="icon-rqgl-jiqun"></i>
						</div>	
						<div class="text-wrapper">集群总数<div class="count">{{allClusterState.clusterNum}}</div></div>
					</div>
					<div class="cell">
						<div class="icon-wrapper host-icon-wrapper">
							<i class="icon-rqgl-yunzhuji"></i>
						</div>	
						<div class="text-wrapper">主机总数<div class="count">{{allClusterState.hostNum}}</div></div>
					</div>
					<div class="cell">
						<div class="icon-wrapper business-icon-wrapper">
							<i class="icon-rqgl-fuzhuyewu"></i>
						</div>	
						<div class="text-wrapper">业务总数<div class="count">{{allClusterState.businessNum}}</div></div>
					</div>
					<div class="cell">
						<div class="icon-wrapper deploy-icon-wrapper">
							<i class="icon-rqgl-fuwu"></i>
						</div>	
						<div class="text-wrapper">服务总数<div class="count">{{allClusterState.deploymentNum}}</div></div>
					</div>
					<div class="cell">
						<div class="icon-wrapper pod-icon-wrapper">
							<i class="icon-rqgl-zhixingjihua"></i>
						</div>	
						<div class="text-wrapper">实例总数<div class="count">{{allClusterState.podNum}}</div></div>
					</div>
				</div>
				<div class="row">
					<div class="cell">
						<div class="icon-wrapper cpu-icon-wrapper">
							<i class="icon-rqgl-cpuchuliqiyingjian"></i>
						</div>
						<div class="text-wrapper">CPU(核)
							<div class="usageInfo">
								<div class="col total">
									<div class="text">总数</div>
									<div class="count">{{allClusterState.cpuTotalNum}}</div>
								</div>
								<div class="col used">
									<div class="text">已用</div>
									<div class="count">{{allClusterState.cpuUsed}}</div>
								</div>
								<div class="col left">
									<div class="text">剩余</div>
									<div class="count">{{allClusterState.cpuTotalNum-allClusterState.cpuUsed}}</div>
								</div>
							</div>
						</div>
					</div>	
					<div class="cell">
						<div class="icon-wrapper cpu-icon-wrapper">
							<i class="icon-rqgl-neicun"></i>
						</div>
						<div class="text-wrapper">内存(GB)
							<div class="usageInfo">
								<div class="col total">
									<div class="text">总数</div>
									<div class="count">{{allClusterState.memTotalNum | changeFloat}}</div>
								</div>
								<div class="col used">
									<div class="text">已用</div>
									<div class="count">{{allClusterState.memUsed | changeFloat}}</div>
								</div>
								<div class="col left">
									<div class="text">剩余</div>
									<div class="count">{{allClusterState.memTotalNum - allClusterState.memUsed | changeFloat }}</div>
								</div>
							</div>
						</div>
					</div>
					<div class="cell">
						<div class="icon-wrapper cpu-icon-wrapper">
							<i class="icon-rqgl-iconset0236"></i>
						</div>
						<div class="text-wrapper">存储(GB)
							<div class="usageInfo">
								<div class="col total">
									<div class="text">总数</div>
									<div class="count">{{allClusterState.hdTotalNum | changeFloat}}</div>
								</div>
								<div class="col used">
									<div class="text">已用</div>
									<div class="count">{{allClusterState.hdUsed | changeFloat}}</div>
								</div>
								<div class="col left">
									<div class="text">剩余</div>
									<div class="count">{{allClusterState.hdTotalNum - allClusterState.hdUsed | changeFloat }}</div>
								</div>
							</div>
						</div>
					</div>	
				</div>
			<div></div>
			<div></div>
		</div>
	</div>	
</template>
<script>
	const QUERY_CLUSTER_URL = 'ccmp-center/clusterModule/queryCluster.do';
	const QUERY_ALL_CLUSTER_STATE_URL = 'ccmp-center/monitor/queryAllClusterStat.do';

	export default {
		data() {
			return {
				clusters: {},
				selectedCluster: {},
				allClusterState: {
					memTotalNum: 0
				}
			};
		},
		mounted() {
			// 查询集群信息
			let _this = this;
			_this.$http.get(QUERY_CLUSTER_URL + '?clusterStatus=1&pageSize=999999').then(
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
		},
		watch: {
			selectedCluster: function(selectedCluster) {
				let _this = this;
				_this.$http.get(QUERY_ALL_CLUSTER_STATE_URL).then(
					(res) => {
						let response = res.body;
						if (response.returnDto.status === true) {
							_this.allClusterState = response.allClusterStat;
						} else {
							_this.$alert(response.returnDto.description, '查询集群资源统计信息失败', {
								type: 'error'
							});
						}
					});
			}
		},
		filters: {
			changeFloat: function(value) {
				if (!value) {
					return 0;
				}
				return Math.round(value * 100) / 100;
			}
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
					vertical-align: top
					width: 100px
				.el-select	
					.el-input__inner
						height: 20px
				.text
					font-size: 14px
					line-height: 14px
			.clusterState
				margin: 10px auto
				width: 100%
				min-width: 900px
				.row
					display: flex
					.cell
						flex: 1
						display: flex
						vertical-align: top
						box-sizing: border-box
						margin: 3px
						padding: 20px 15px
						height: 100px
						border: 1px solid #eee
						.icon-wrapper
							flex: 0 0 60px
							height: 60px
							line-height: 60px
							border-radius: 50%
							border: 1px solid
							text-align: center
							font-size: 30px
							&.cluster-icon-wrapper
								color: #4eb2c3
								border-color: #4eb2c3
								background: rgba(78, 178, 195, 0.2)
							&.host-icon-wrapper
								color: #3cb58e
								border-color: #3cb58e
								background: rgba(60, 181, 142, 0.2)	
							&.business-icon-wrapper
								color: #c9a07e
								border-color: #c9a07e
								background: rgba(201, 160, 126, 0.2)
							&.deploy-icon-wrapper
								color: #adc244
								border-color: #adc244
								background: rgba(173, 194, 68, 0.2)
							&.pod-icon-wrapper
								color: #f19684
								border-color: #f19684
								background: rgba(241, 150, 132, 0.2)
							&.cpu-icon-wrapper
								color: #78a6e7
								border-color: #78a6e7
								background: rgba(120, 166, 231, 0.2)							
						.text-wrapper
							flex: 1
							margin :10px
							text-align: right
							font-size: 14px
							font-weight: 700
							float: right
							.count
								text-align: right
								color: #0475e8
								font-size: 14px
								font-weight: 700
								margin-top: 10px
							.usageInfo
								display: flex
								margin: 5px
								.col
									flex: 1	
									.text
										color: #97a6ad		
														
</style>