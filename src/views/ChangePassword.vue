<template>
	<div class="changPassword">
		<Nav :white = "'white'"></Nav>
		<div class="backBox">
			<p >修改密码</p>
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
				<div class="getcode" @click="changeCode" :class="{ notcode:!ifcode }">获取验证码 {{ time }}</div>
			</div>
			<div class="newpassword">
				<label for="newpasswordi"><i class="iconfont icon-yanzhengma"></i></label>
				<input type="password" name="" id="newpasswordi" maxlength="16" placeholder="新密码" v-model="newpassword">
			</div>
			<div class="oldpassword">
				<label for="oldpasswordi"><i class="iconfont icon-yanzhengma"></i></label>
				<input type="password" name="" id="oldpasswordi" maxlength="16" placeholder="确认新密码" v-model="confirmPassword" @blur="confirm">
			</div>
			<div class="changePasswordBtn" @click="changepass">修改密码</div>
		</div>
		<div class="noteInfo" v-show="ifNote">{{ noteInfo }}</div>
	</div>
</template>

<script type="text/javascript">
	import Nav from '../components/Nav.vue'

	export default {
		name: 'ChangePassword',
		components: {
				Nav
		},
		data () {
			return {
				ifNote: false,
				noteInfo: '',
				phone: '',
				code: '',
				newpassword: '',
				confirmPassword: '',
				ifcode: true,
				time: ''

			}
		},
		methods: {
			changeCode () {

				if (this.ifcode) {
					this.time = 30
					this.ifcode = false

					this.$http.post('https://wy.lujiahaoo.cn/tour/user.php',{
						"action":'findduanxin',
						"user_phone": this.phone
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
			confirm () {
				
				if (this.confirmPassword != this.newpassword) {
					this.ifNote = true
					this.noteInfo = '确认密码与新密码不相同'
					setTimeout(()=>{
						this.ifNote = false
					},1000)
				}
			},
			changepass () {
				this.$http.post('https://wy.lujiahaoo.cn/tour/user.php',{
					"action":'findpassword',
					"user_phone": this.phone,
					"user_password": this.newpassword,
					"code": this.code
				},{}).then(result => {
					this.ifNote = true
					this.noteInfo = result.body.message
					setTimeout(()=>{
						this.ifNote = false
						if(result.body.code === '1'){
							this.$router.push("/loginandsignin")
						}
					},1000)

					
				})
			}
		}
	}
</script>
<style type="text/css" scoped>
	/deep/ #nav .person{
		/*display: none;*/
	}
	/deep/ #nav a{
		color: #fff;
	}
	.backBox{
		width: 408px;
    	height: 350px;
    	border-radius: 10px;
   		background-color: rgba(255,255,255,0.8);
   		margin: 0 auto;
   		margin-top: 180px;
	}
	.changPassword{
		background-image: url(../../public/images/register-bg.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		height: 100vh;
	}
	.backBox>p{
		font-size: 24px;
		color: #7086c6;
		text-align: center;
		padding-top: 25px;
	}
	#oldpasswordi,
	#newpasswordi{
		height: 31px;
	    width: 252px;
	    padding-left: 32px;
	    outline: none;
	    border-radius: 3px;
	    border: 1px solid #7086c6;
	    font-size: 14px;
	}
	.newpassword,
	.oldpassword{
		margin: 0 auto;
	    width: 284px;
	    position: relative;
	    margin-top: 16px;
	}
	.newpassword>label,
	.oldpassword>label{
		position: absolute;
		top: 7px;
    	left: 8px;
	}
	.changePasswordBtn{
		height: 31px;
		width: 286px;
		background-color: #7086c6;
		color: #fff;
		border-radius: 3px;
		text-align: center;
		line-height: 31px;
		margin: 0 auto;
		margin-top: 20px;
		cursor: pointer;
	}
	/deep/.signPhone {
		margin-top: 25px;
	}

</style>
<style type="text/css" >
	

</style>