<template>
	<div class="admLogin">
		<div class="admloginBox">
			<p class="admLoginText">登录</p>
			<div class="adName">
				<label for="adNamei"><i class="iconfont icon-yonghu1"></i></label>
				<input type="text" name="" id="adNamei" maxlength="11" placeholder="昵称" ref="adNamei">
			</div>
			<div class="adPassword">
				<label for="adPasswordi"><i class="iconfont icon-yanzhengma"></i></label>
				<input type="password" name="" id="adPasswordi" placeholder="密码" ref="adPasswordi">
			</div>
			<div class="adBtn" @click="admiLogin">登录</div>
		</div>
		<div class="noteInfo" v-show="ifNote">{{ noteInfo }}</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'admiLogin',
		methods: {
			admiLogin () {

				this.$http.post('https://wy.lujiahaoo.cn/tour/admin.php',{
					"action":"login",
					"admin_nickname":this.$refs.adNamei.value,
					"admin_password":this.$refs.adPasswordi.value,
				
				},{}).then(result => {
					
					this.noteInfo = result.body.message
					this.ifNote = true
					setTimeout(() => {
						this.ifNote = false
						if(result.body.code === '1'){
							this.$router.push("/usercontrol")
						}
					},1000)
				})
			}
		},
		data () {
			return {
				noteInfo: '',
				ifNote: false
			}
		}
	}
</script>

<style type="text/css">
	.admLogin{
		background-image: url(../../public/images/RMSbg.jpg);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		height: 100vh;
		position: relative;
	}
	.admLoginText{
		font-size: 24px;
		color: #7086c6;
		text-align: center;
		padding-top: 45px;
		margin-bottom: 25px;
	}
	.adName,
	.adPassword{
		margin: 0 auto;
	    width: 284px;
	    position: relative;
	    margin-top: 16px;
	}
	#adPasswordi,
	#adNamei{
		height: 31px;
	    width: 252px;
	    padding-left: 32px;
	    outline: none;
	    border-radius: 3px;
	    border: 1px solid #7086c6;
	    font-size: 14px;
	}
	.adName>label,
	.adPassword>label{
		position: absolute;
		
	}
	.admloginBox{
		width: 408px;
		height: 295px;
		margin: 0 auto;
		background-color: rgba(255,255,255,0.8);
		border-radius: 10px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	.adPassword>label{
		top: 7px;
    	left: 8px;
	}
	.adName>label{
		top: 2px;
		left: 2px;
	}
	.adBtn{
		width: 286px;
    	height: 33px;
    	margin: 0 auto;
    	border-radius: 3px;
    	background: #7078C6;
    	color: #fff;
    	text-align: center;
    	line-height: 33px;
    	margin-top: 20px;
    	cursor: pointer;
	}
	.noteInfo{
		width: 180px;
		height: 80px;
		background: rgba(0,0,0,0.5);
		color: #fff;
		text-align: center;
		line-height: 80px;
		font-size: 18px;
		border-radius: 5px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -90px;
		margin-top: -40px;
	}
</style>