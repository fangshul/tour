<template>
	<div id="nav" ref="nav">
		<img :src="navimg" alt="logo" />
		<router-link to="/" @click.native="refresh" >首页</router-link>
		<router-link to="/companion" >结伴</router-link>
		<router-link to="/strategy" >攻略</router-link>
		<router-link to="/routequery" >路线查询</router-link>
		<router-link to="/loginandsignin" class="person" v-show="!ifuser"><i class="iconfont icon-yonghu"></i></router-link>
		<router-link to="/personal" class="person NavUserImg"  v-show="ifuser">
			<img :src="userInfo.user_headimg" id="NavUserPic">
		</router-link>
	</div>
</template>

<style type="text/css">
	#nav{
		height: 70px;
		width: 100%;
		z-index: 100;
	}
	#nav a{
		color: #000;
		margin-left: 30px;
		margin-top: 22px;
		display: inline-block;
		vertical-align: top;
		font-size: 22px;
		text-decoration: none;
	}
	#nav img{
		display: inline-block;
		margin-left: 30px;
		margin-top: 12px;
	}
	#nav a.router-link-exact-active {
  		/*color: #d6dced;*/
	}
	.person{
		float: right;
		margin-right: 30px;
	}
	#nav .person{
		margin-top: 20px;
	}
	.icon-yonghu{
		font-size: 30px;
		font-weight: bold;
	}
	.NavUserImg{
		height: 30px;
		width: 30px;
		border-radius: 50%;
		border: 2px solid #000;
	}
	.NavUserImg>#NavUserPic{
		width: 30px;
		height: 30px;
		margin: 0;
		border-radius: 50%;
	}
</style>

<script type="text/javascript">
	export default {
		props:['ifscroll','white'],
		name: 'Nav',
		data () {
			return {
				navimg: require('../../public/images/LOGO.png'),
				ifuser: false,
				userInfo:''
			}
		},
		methods: {
			// 进入首页刷新
			refresh () {
				console.log('refresh')
				this.$router.go(0)
			},
			// 导航栏置顶
			navTop () {
	    		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
	    		var topscroll = Math.floor(scrollTop)
				var scrolldist = 600
				if (topscroll<=scrolldist){
					this.$refs.nav.style.background = "rgba(112,134,198,"+(topscroll/scrolldist)+")"
				}
				else{
					this.$refs.nav.style.background = "rgba(112,134,198,1)"
				}
				if (scrollTop > 50) {

					this.$refs.nav.style.position = 'fixed'
					this.$refs.nav.style.top = '0'
					for(var i = 1;i < this.$refs.nav.children.length;i++){
						this.$refs.nav.children[i].style.color="#fff"
					}
					this.navimg = require('../../public/images/LOGO-white.png')
				}
				else{
					for(var i = 1;i < this.$refs.nav.children.length;i++){
						this.$refs.nav.children[i].style.color="#000"
					}
					this.navimg = require('../../public/images/LOGO.png')
				}
				
				
	    	},
	    	getinfo () {
    		this.$http.post('https://wy.lujiahaoo.cn/tour/user.php',{
					"action":'info',
				},{}).then(result => {
					
					console.log(result)
					if (result.body.code == '0') {
						this.ifuser = false
					}else {
						this.ifuser = true
						this.userInfo = result.body.data

					}
				})
	    	}
		},
		created () {

		} ,
		mounted () {
			this.getinfo()

			if(this.ifscroll){
				window.addEventListener('mousewheel',this.navTop) || window.addEventListener("DOMMouseScroll",this.navTop)
			}
			// 登录注册 logo 换成白色
			if(this.white === 'white'){
					this.navimg = require('../../public/images/LOGO-white.png')
			}

		}
	}
</script>