<template>
	<div>
		<p class="signTitle">注册</p>
		<div class="signPhone">
			<label for="signPhonei">
				<i class="iconfont icon-shouji"></i>
			</label>
			<input type="text" name="" id="signPhonei" maxlength="11" placeholder="手机号码" v-model="phone">
		</div>
		<div class="code">
			<label for="codei">
				<i class="iconfont icon-xiaoxi"></i>
			</label>
			<input type="text" name="" id="codei" maxlength="8" placeholder="短信验证码" v-model="code"> 
			<div class="getcode" @click="getcode" :class="{ notcode:!ifcode }">获取验证码 {{ time }}</div>
		</div>
		
		
		<div class="signPassword">
			<label for="signPasswordi">
				<i class="iconfont icon-yanzhengma"></i>
			</label>
			<input type="password" name="" id="signPasswordi" maxlength="16" placeholder="密码" v-model="password">
		</div>
		<div class="signInBtn" @click="signIn">注册</div>
		<div class="noteInfo" v-show="ifNote">{{ noteInfo }}</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name: 'SignIn',
		data () {
			return {
				phone: '',
				code: '',
				password: '',
				ifNote: false,
				noteInfo: '',
				ifcode: true,
				time: ''
			}
		},
		methods: {
			getcode () {
				if (this.ifcode) {
					this.time = 30
					this.ifcode = false
					
					this.$http.post('https://wy.lujiahaoo.cn/tour/user.php',{
						"action":'duanxin',
						"user_phone": this.phone,
					},{}).then(result => {
						
						this.ifNote = true
						this.noteInfo = result.body.message
						setTimeout(()=>{
							this.ifNote = false
						},1000)
					
					})

					var settime = setInterval(() => {
						this.time--
					},1000)
					
					setTimeout(() => {
						this.ifcode = true
						clearInterval(settime)
						this.time = ''
					},30000)
					
				}
				
			},
			signIn () {
				console.log(this.code)
				console.log(this.phone)
				console.log(this.password)
				this.$http.post('https://wy.lujiahaoo.cn/tour/user.php',{
					"action":"register",
					"code":this.code,
					"user_phone":this.phone,
					"user_password":this.password
				},{}).then(result => {
					console.log(result)
					if(result.body.code === '1'){
						this.ifNote = true
						this.noteInfo = result.body.message
						setTimeout(()=>{
							this.ifNote = false
							this.$router.push("/personal")
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
		}
	}
</script>
<style type="text/css">
	.signTitle{
		font-size: 24px;
		color: #7086c6;
		text-align: center;
		padding-top: 45px;
	}
	.signInBtn{
		width: 286px;
    	height: 33px;
    	background: #7078C6;
    	border-radius: 3px;
    	color: #fff;
    	text-align: center;line-height: 33px;
    	margin: 0 auto;
    	margin-top: 18px;
    	cursor: pointer;
	}
	.getcode{
		width: 119px;
		background-color: rgb(112, 134, 198);
		color: #fff;
		height: 28px;
    	border-radius: 3px;
    	cursor: pointer;
    	text-align: center;
    	line-height: 28px;
    	font-size: 14px;
    	letter-spacing: 1px;
    	display: inline-block;
    	margin-left: 12px;
	}
	#signPhonei,
	#signPasswordi{
		height: 31px;
	    width: 252px;
	    padding-left: 32px;
	    outline: none;
	    border-radius: 3px;
	    border: 1px solid #7086c6;
	    font-size: 14px;
	   
	}
	.signPhone>label,
	.code>label,
	.signPassword>label{
		position: absolute;
		/*left: 0*/
	}
	.signPhone,
	.code,
	.signPassword{
		margin: 0 auto;
		width: 284px;
		position: relative;
	}
	#codei{
		width: 119px;
		height: 31px;
		padding-left: 32px;
	    outline: none;
	    border-radius: 3px;
	    border: 1px solid #7086c6;
	    display: inline-block;
	}
	.icon-shouji{
		font-size: 21px;
	}
	.icon-xiaoxi{
		font-size: 25px;
	}
	.signPhone>label{
		top: 6px;
   		left: 7px;
	}
	.code>label{
		top: 4px;
    	left: 5px;
	}
	.signPassword>label{
		top: 7px;
		left: 8px;
	}
	.signPhone{
		margin-top: 27px;
	}
	.code,
	.signPassword{
		margin-top: 16px;
	}
	.notcode{
		background: #ccc;
	}
</style>