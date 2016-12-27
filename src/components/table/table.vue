<template>
	<div class="table">
		<el-table :data="tableData" :stripe="option.stripe" style="width: 100%">
    		<el-table-column v-for="column in columns" v-bind="column"></el-table-column>
  		</el-table>
	</div>
</template>
<script>
	export default {
		props: {
			// 表格数据
			tableData: {
				type: Array,
				default: function() {
					return [];
				}
			},
			// 表格的列
			columns: {
				type: Array,
				default: function() {
					// 需要指定数组中的对象的prop和label属性，width可选, inline-template可选
					return [];
				}
			},
			// 表格选项
			option: {
				type: Object,
				default: function() {
					return {
						stripe: true // 斑马纹
					};
				}
			}
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
</style>
