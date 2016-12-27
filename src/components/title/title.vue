<template>
	<div class="titleWrppaer">
		<h1 class="title">{{title}}</h1>
	</div>
</template>
<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			}
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.title
			border-bottom: 1px solid #e0e0e0
			font-size: 24px
			padding: 5px 0
</style>
