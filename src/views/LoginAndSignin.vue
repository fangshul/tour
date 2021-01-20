<template>
	<div class="login" ref="login">
		<Nav :white = "'white'"></Nav>
		<!-- 登陆 -->
		<div class="backBox">
			<Login v-if="def"></Login>
			<router-view>
				
			</router-view>
			<p ref="botomP" class="botomP">
				<span>没有账号？</span> <router-link :to="router">注册</router-link>
			</p>
		</div>
	</div>
</template>

<style scoped>
	/deep/ #nav .person{
		display: none;
	}
	/deep/ #nav a{
		color: #fff;
	}

	.login{
		height: 100vh;
		width: 100vw;
		background-size: 100% 100%;
		background-image: url(../../public/images/login-bg.png);
	}	
	.backBox{
		width: 408px;
    	height: 350px;
    	border-radius: 10px;
   		background-color: rgba(255,255,255,0.8);
   		margin: 0 auto;
   		margin-top: 180px;
	}
	.botomP{
		text-align: center;
		margin-top: 19px;
	}
</style>

<script type="text/javascript">
	import Nav from '../components/Nav.vue'
	import Login from '../components/Login.vue'
	import SignIn from '../components/SignIn.vue'

	export default {
		name: 'Home',
		components: {
			Nav,
			Login,
			SignIn
		},
		data () {
			return {
				router : 'signin',
				def : true,
				ifscroll : true
			}
		},
		methods: {
		
		},
		watch : {
			'$route.path': function (from,to) {
			
				if(this.$route.path === '/login'){
					this.$refs.botomP.children[0].innerHTML = "没有账号？"
					this.$refs.botomP.children[1].innerHTML = "注册"
					this.router = 'signin'
					this.def = false
					this.$refs.login.style.backgroundImage = "url("+require("../../public/images/login-bg.png")+")"
					
				}else if(this.$route.path === '/signin'){
					this.$refs.botomP.children[0].innerHTML = "已有账号？"
					this.$refs.botomP.children[1].innerHTML = "登录"
					this.router = 'login'
					this.def = false
					
					this.$refs.login.style.backgroundImage = "url("+require("../../public/images/register-bg.png")+")"
				}


				
				
			}
		},
		mounted () {
			if(this.$route.path === '/login' || this.$route.path === '/signin'){
					this.def = false
			}else{
				this.def = true
			}
			
			
		}
	}
</script>