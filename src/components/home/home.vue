<template>
	<div>
		<header class="home-header">
			<div class="nav-header">
				<span class="logo"></span><span class="text">容器管理平台</span>
			</div>
			<ul class="menu-ul">
				<li v-for="item in roleAuthority" v-if="!item.hidden" @click="clickHeadNav(item.id, $event)" :class="{ current: currentMainMenu.id === item.id}" class="menu-item">
					{{item.name}}
				</li>	
			</ul>
			<div class="">退出</div>
		</header>
		<div class="home-body">
			<nav class="nav">
				<ul class="nav-ul">
					<li class='nav-item' v-for="item in currentMainMenu.children" @click="clickSideNav(item.id, $event)" :class="{ current: currentSideMenu.id === item.id}">{{item.name}}</li>
				</ul>
			</nav>
			<main class="content-wrapper"><router-view></router-view></main>
		</div>	
	</div>	
</template>
<script>
	export default {
		data() {
			return {
				// 此处应该是created的时候就去查询权限的第一个菜单
				currentMainMenu: {},
				roleAuthority: {},
				currentSideMenu: {}
			};
		},
		methods: {
			clickHeadNav(menuid, event) {
				for (var i = 0; i < this.roleAuthority.length; i++) {
					if (this.roleAuthority[i].id === menuid) {
						this.currentMainMenu = this.roleAuthority[i];
						this.currentSideMenu = this.currentMainMenu.children[0];
						break;
					}
				}
				// this.$router.push(this.currentSideMenu.path);
			},
			clickSideNav(menuid, event) {
				for (var i = 0; i < this.currentMainMenu.children.length; i++) {
					if (this.currentMainMenu.children[i].id === menuid) {
						this.currentSideMenu = this.currentMainMenu.children[i];
						break;
					}
				}
				// this.$router.push(this.currentSideMenu.path);
			}
		},
		watch: {
			currentSideMenu: function() {
				this.$router.push(this.currentSideMenu.path);
			}
		},
		created() {
			// 假设返回的权限实体为roleAuthority
			this.roleAuthority = [{
					name: '监控警报',
					id: 1,
					children: [{ name: '监控总览', id: 1, path: '/monitorModule' }, { name: '警报', id: 2, path: '/alarmModule' }]
				}, {
					name: '集群管理',
					id: 2,
					children: [{ name: '集群管理', id: 1, path: '/clusterModule' }, { name: '节点管理', id: 2, path: '/nodeModule' }]
				}];
			this.currentMainMenu = this.roleAuthority[0];
			this.currentSideMenu = this.currentMainMenu.children[0];
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.home-header
		width: 1366px
		height: 60px
		background: #0475e8
		font-size: 0
		color: #fff
		.nav-header
			display: inline-block
			width: 170px
			padding-left: 10px
			.logo
				display: inline-block
				vertical-align: top
				width: 50px
				height: 50px
				background: url('./logo2.png') 50px 50px
			.text
				line-height: 60px
				font-size: 18px			
		.menu-ul
			display: inline-block
			margin-top: 24px
			margin-left: 10px
			font-size: 16px	
			.menu-item
				display: inline-block
				margin-right: 20px
				padding-left: 5px
				color: #fff
				cursor: pointer
				opacity: 0.8
				border-left: 2px solid #0375e8
				&.current
					opacity: 1
					border-left: 2px solid #fff
				&:hover
					opacity: 1	
	.home-body
		display: flex
		.nav
			flex: 0 0 180px
			.nav-ul
				margin-left: 20px
				.nav-item
					margin-top: -1px
					padding: 12px 20px
					cursor: pointer
					color: #666
					background: #e4e4e4
					border: 1px solid #abb0b3
					font-size: 14px
					&.current
						background: #d1d1d1 none repeat scroll 0 0
		.content-wrapper
			flex: 1
			padding: 15px 35px 15px 20px
</style>
