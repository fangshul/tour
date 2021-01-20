<template>
	<div class="loginBox">
		<p class="loginTitle">登录</p>
		<div id="phone">
			<label for="phonei" >
				<i class="iconfont icon-yonghu1"></i>
			</label>
			<input type="text" name=""  placeholder="手机号码" maxlength="11" id="phonei" v-model="name">
		</div>
		
		<div id="password">
			<label for="passwordi">
				<i class="iconfont icon-yanzhengma"></i>
			</label>
			<input type="password" name="" placeholder="密码" maxlength="16" id="passwordi" v-model="password">
		</div>
		
		<router-link to="/changepassword" tag="div" class="forget">忘记密码</router-link>
		<div class="loginBtn" @click="login">登录</div>
		<div class="noteInfo" v-show="ifNote">{{ noteInfo }}</div>

	</div>
</template>


<script type="text/javascript">
	export default {
		name : 'login',
		methods: {
			login () {
					this.$http.post('https://wy.lujiahaoo.cn/tour/user.php',{
						"action":"login",
						"user_idorphone":this.name,
						"user_password":this.password

					
					},{}).then(result => {
						console.log(result)
						if(result.body.code === '1'){
							this.ifNote = true
							this.noteInfo = result.body.message
							setTimeout(()=>{
								this.ifNote = false
								this.$router.push("/")
								this.$router.go(0)
							},1000)
							
						}else{
							this.ifNote = true
							this.noteInfo = result.body.message
							setTimeout(()=>{
								this.ifNote = false
							},1000)
						}
						
					})
			}
		},
		data () {
			return {
				ifNote:false,
				noteInfo: '',
				password:'',
				name: ''
			}
		}
	}
</script>


<style type="text/css">
	
	.loginTitle{
		font-size: 24px;
		color: #7086c6;
		text-align: center;
		padding-top: 45px;
	}
	#phone,
	#password{
		margin: 0 auto;
		width: 284px;
	    height: 31px;
	    position: relative;
	}
	#phone>label,
	#password>label{
		position: absolute;
		/*left: 0;*/
	}
	#phone>input,
	#password>input{
		width: 251px;
	    height: 31px;
	    outline: none;
	    border: 1px solid #7086c6;
	    border-radius: 3px;
	    padding-left: 33px;
	    font-size: 14px;
	}
	.loginBtn{
		width: 286px;
    	height: 33px;
    	background: #7078C6;
    	border-radius: 3px;
    	color: #fff;
    	text-align: center;line-height: 33px;
    	margin: 0 auto;
    	cursor: pointer;
	}
	.forget{
		width: 286px;
		margin: 10px auto;
		text-align: right;
		font-size: 12px;
		cursor: pointer;
	}
	#phone{
		margin-top: 30px;
	}
	#password{
		margin-top: 22px;
	}
	.icon-yonghu1{
		font-size: 26px;
	}
	.icon-yanzhengma{
		font-size: 19px;
	}
	#phone>label{
		left: 5px;
		top: 4px;
	}
	#password>label{
		top: 7px;
		left: 8px;
	}
	.forget:hover{
		color: red;
	}
</style>
