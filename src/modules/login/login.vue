<template>
    <div class="login-wrapper">
        <header class="login-header">
            <span class="logo"></span>
            <span class="title">容器管理平台</span>
        </header>
        <article class="login-body">
        	<div class="form-wrapper">
				<div class="form-title">
					<span class="icon"></span><span class="text">账户登录</span>
				</div>
        		<el-form :model="loginInfo" :rules="rules" ref='loginForm' label-position="left" label-width="60px">
					<el-form-item label="账户" prop="account">
						<el-input v-model="loginInfo.account"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input type="password" v-model="loginInfo.password"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitLoginForm" class="button">登录</el-button>
					</el-form-item>
				</el-form>
        	</div>
        </article>
        <footer class="login-footer">
        	<span class="copyright">广东亿迅科技有限公司版权所有 | 粤ICP备05081621号</span>
        </footer>
    </div>
</template>
<script>
const LOGIN_URL = '/ccmp-center/auth/login.do?';

export default {
	data() {
		return {
			loginInfo: {
				account: '',
				password: ''
			},
			rules: {
				account: [
					{ required: true, message: '请输入账户名称', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				]
			}
		};
	},
	methods: {
		submitLoginForm() {
			let _this = this;
			_this.$refs.loginForm.validate((valid) => {
				if (valid) {
					_this.$http.post(LOGIN_URL, _this.loginInfo)
						.then((res) => {
							let response = res.body;
							if (response.returnDto.status) {
								// TODO: 将用户信息存入session中
								_this.$router.replace('/monitorModule');
							} else {
								_this.$notify.error(response.returnDto.description);
							}
						});
				} else {
					return false;
				}
			});
		}
	}
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.login-wrapper
		.login-header
			box-sizing:border-box;
			padding-left: 7%
			padding-right: 15px
			width: 100% 
			height: 80px
			background: #fff
			font-size: 0
			.logo
				display: inline-block
				margin: 15px 5px
				vertical-align: top
				line-height: 80px
				width: 50px
				height: 50px
				background-image: url('./logo2.png')
				background-size: 50px 50px
			.title
				line-height: 80px
				color: #0475e8
				font-weight: 500
				font-size: 24px	
		.login-body
			height: 520px
			background: #2274e6 url('./login_bg.jpg') no-repeat center 0
			.form-wrapper
				float: right
				margin-top: 40px
				margin-bottom: 20px
				margin-right: 7%
				padding: 10px 25px
				width: 350px
				background: #fff
				.form-title
					margin: 10px auto
					.icon
						display: inline-block
						width: 38px
						height: 38px
						vertical-align: top
						background-image: url('./logo.png')
						background-size: 38px, 38px
					.text
						line-height: 38px
						color: #0375e8
						font-size: 16px
				.button
					width: 250px				
		.login-footer
			float: right
			margin: 10px 15% 10px auto
			color: #8d8d8d
			font-size: 12px 
</style>
