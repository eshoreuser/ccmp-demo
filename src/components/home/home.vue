<template>
	<div>
		<header class="home-header">
			<div class="nav-header">
				<span class="logo"></span><span class="text">容器管理平台</span>
			</div>
			<ul class="menu-ul">
				<li v-for="item in roleAuthority" @click="clickHeadNav(item.id, $event)" :class="{ current: currentMainMenu.id === item.id}" class="menu-item">
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
				currentMainMenu: {},
				// 从session中获取权限对象
				roleAuthority: JSON.parse(window.sessionStorage.getItem('roleAuthority')),
				currentSideMenu: {}
			};
		},
		methods: {
			clickHeadNav(menuid, event) {
				for (var i = 0; i < this.roleAuthority.length; i++) {
					if (this.roleAuthority[i].id === menuid) {
						this.currentMainMenu = this.roleAuthority[i];
						this.currentSideMenu = this.currentMainMenu.children[0];
						// 将菜单信息放到session中
						window.sessionStorage.setItem('currentMainMenu', JSON.stringify(this.currentMainMenu));
						window.sessionStorage.setItem('currentSideMenu', JSON.stringify(this.currentSideMenu));
						this.$router.push(this.currentSideMenu);
						break;
					}
				}
			},
			clickSideNav(menuid, event) {
				for (var i = 0; i < this.currentMainMenu.children.length; i++) {
					if (this.currentMainMenu.children[i].id === menuid) {
						this.currentSideMenu = this.currentMainMenu.children[i];
						window.sessionStorage.setItem('currentSideMenu', JSON.stringify(this.currentSideMenu));
						this.$router.push(this.currentSideMenu);
						break;
					}
				}
			}
		},
		created() {
			// 从sessionStorage中获取当前选中的菜单信息
			let currentMainMenu = JSON.parse(window.sessionStorage.getItem('currentMainMenu'));
			let currentSideMenu = JSON.parse(window.sessionStorage.getItem('currentSideMenu'));
			// 如果不存在，则默认选择第一个一级菜单的第一个二级菜单
			if (!currentSideMenu || !currentMainMenu) {
				this.currentMainMenu = this.roleAuthority[0];
				this.currentSideMenu = this.currentMainMenu.children[0];
			} else {
				this.currentMainMenu = currentMainMenu;
				this.currentSideMenu = currentSideMenu;
			}
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.home-header
		width: 100%
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
				margin: 5px
				width: 42px
				height: 40px
				background-image: url('./logo2.png')
				background-size: cover
			.text
				line-height: 60px
				font-size: 18px			
		.menu-ul
			display: inline-block
			margin-top: 24px
			margin-left: 20px
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
