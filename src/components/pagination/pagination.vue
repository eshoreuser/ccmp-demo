<template>
	<div class="pagination">
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
	      layout="total, sizes, prev, pager, next, jumper" v-bind="option">
	    </el-pagination>
    </div>
</template>
<script>
	export default {
		props: {
			option: {
				type: Object,
				default: function() {
					return {
						currentPage: 1,
						pageSizes: [5, 10, 20, 50, 100],
						pageSize: 5,
						total: 0
					};
				}
			}
		},
		methods: {
			handleSizeChange(size) {
				this.option.pageSize = size;
				this.$emit('changePagination');
			},
			handleCurrentChange(currentPage) {
				this.option.currentPage = currentPage;
				this.$emit('changePagination');
			}
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.pagination
		float: right
		margin-top: 10px
</style>
