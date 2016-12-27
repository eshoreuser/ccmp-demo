<template>
	<div class="clusterManage">
		<v-title title="集群管理"></v-title>
		<div class="content">
			<div class="search-bar">搜索栏</div>
			<!-- 表格主体 -->
			<div class="table-wrapper">
				<el-table :data="clusters" stripe highlight-current-row @current-change="showClusterDetail" style="width: 100%">
					<el-table-column v-for="column in columns" v-bind="column"></el-table-column>
					<el-table-column inline-template width="200" label="操作">
						<div>
							<div v-show="row.clusterStatus === 'SEWER'">
								<el-button size="small" @click="handleEdit($index, row)">取消纳管</el-button>
								<el-button size="small" @click="handleEdit($index, row)" type="info">同步</el-button>
							</div>
							<div v-show="row.clusterStatus !== 'SEWER'">
								<el-button size="small" @click="handleEdit($index, row)" type="info">纳管</el-button>
							</div>
						<div>	
					</el-table-column>
				</el-table>
				<v-pagination :option="clusterTableOption" @changePagination="queryCluster"></v-pagination>
				<div class="clusterDetailPanel">
					
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import title from 'components/title/title';
	import {CTX} from 'static/properties/properties.js';
	import pagination from 'components/pagination/pagination';

	const QUERY_CLUSTER_URL = CTX + '/clusterModule/queryCluster.do';

	export default{
		data() {
			return {
				clusterTableOption: {
					total: 0,
					currentPage: 1,
					pageSize: 5,
					pageSizes: [5, 10, 20, 50, 100]
				},
				clusters: [],
				// 指定表格列表头以及对应的数据
				columns: [{
					prop: 'name',
					label: '集群名称'
				}, {
					prop: 'machineRoomName',
					label: '所属机房'
				}, {
					prop: 'hostList',
					label: '节点数',
					// 取hostlist的长度
					formatter: function(row, column) {
									return row.hostList ? row.hostList.length : 0;
								}
				}, {
					prop: 'businessList',
					label: '业务数',
					// 取businesslist的长度
					formatter: function(row, column) {
									return row.businessList ? row.businessList.length : 0;
								}
				}, {
					prop: 'podList',
					label: '实例数',
					formatter: function(row, column) {
									return row.podList ? row.podList.length : 0;
								}
				}, {
					prop: 'clusterStatus',
					label: '纳管状态',
					formatter: function(row, column) {
									return row.clusterStatus === 'SEWER' ? '纳管' : '未纳管';
								}
				}]
			};
		},
		components: {
			'v-title': title,
			'v-pagination': pagination
		},
		methods: {
			// TODO: 纳管/同步/取消纳管
			handleEdit() {},
			queryCluster() {
				// 查询集群信息
				let _this = this;
				_this.$http.get(QUERY_CLUSTER_URL + '?clusterStatus=1&pageSize=' + _this.clusterTableOption.pageSize + '&curPage=' + _this.clusterTableOption.currentPage).then(
					(res) => {
						let response = res.body;
						if (response.returnDto.status === true) {
							_this.clusters = response.clusterInfo.results;
							_this.clusterTableOption.total = response.clusterInfo.total;
							_this.clusterTableOption.pageSize = response.clusterInfo.perPageSize;
							_this.clusterTableOption.currentPage = response.clusterInfo.pageNumber;
						} else {
							_this.$alert(response.returnDto.description, '查询集群信息失败', {
								type: 'error'
							});
						}
					});
			},
			showClusterDetail() {}
		},
		mounted() {
			this.queryCluster();
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
</style>