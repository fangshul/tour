<template>
	<div class="perInfo">
		<div class="perImgBox">
			<div class="perImgLeft">
				<img :src="datalist.user_headimg">
				<!-- <p>在路上</p> -->
			</div>
			<div class="perImgRight">
				<i class="iconfont icon-tianjiatupian" @click="changeUserImg"></i>
				<p>更换头像</p>
				<input type="file" name="" v-show="false" ref="user_img" @change="push_img">
			</div>
		</div>
		<div class="nick">
			<div>昵称</div>
			<div >
				<label>
					<i class="iconfont icon-yonghu1"></i>
				</label>
				<input type="text" name="" v-model="datalist.user_nickname" :readonly="ifChangeNick" @dblclick="changeNick" @blur="confirmchange">
			</div>
		</div>
		<div class="persex">
			<div>性别</div>
			<div>
				<label>
					<i class="iconfont icon-xingbie"></i>
				</label>
				<input type="text" name="" @click="ifselect = !ifselect" readonly v-model="sex">
				<div class="selectSex" v-show="ifselect">
					<div @click="changeSex('女')">女</div>
					<div @click="changeSex('男')">男</div>
				</div>
			</div>
			
		</div>
		<div class="perphone">
			<div>手机号码</div>
			<div>
				<label>
					<i class="iconfont icon-shouji"></i>
				</label>
				<input type="text" name="" readonly v-model="datalist.user_phone">
			</div>
		</div>
		<div class="perintro">
			<div>个人简介</div>
			<div>
				<label>
					<i class="iconfont icon-evaluate"></i>
				</label>
				<input type="text" name="" v-model="datalist.user_introduce" :readonly="ifChangeTro" @dblclick="changeTro" @blur="confirmTro">
			</div>
		</div>
		<div class="noteInfo" v-show="ifNote">{{ noteInfo }}</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'personalInfo',
		data () {
			return {
				ifselect: false,
				sex:'',
				datalist: '',
				ifNote: false,
				noteInfo: '',
				ifChangeNick: true,
				ifChangeTro: true
			}
		},
		methods: {
			changeSex (sex){
				this.sex = sex
				this.ifselect = false
				var val 
				if (this.sex == '男') {
					val = '1'
				} else {
					val = '0'
				}
				this.$http.post('https://wy.lujiahaoo.cn/tour/user.php',{
					"action": "updateinfo",
					"item": "user_sex",
					"value": val
				},{}).then(result => {
					console.log(result)
					this.ifNote = true
					this.noteInfo = result.body.message
					setTimeout(()=>{
						this.ifNote = false
					},1000)
				}) 
			},
			changeNick () {
				// e.currentTarget.setAttribute('readonly',false)
				// console.log(e.currentTarget)
				console.log('double')
				this.ifChangeNick = false
				
			},
			confirmchange () {
				this.$http.post('https://wy.lujiahaoo.cn/tour/user.php',{
					"action": "updateinfo",
					"item": "user_nickname",
					"value": this.datalist.user_nickname
				},{}).then(result => {
					console.log(result)
					this.ifNote = true
					this.noteInfo = result.body.message
					setTimeout(()=>{
						this.ifNote = false
						this.ifChangeNick = true
					},1000)

				}) 
			},
			changeTro () {
				this.ifChangeTro = false
				
			},
			confirmTro () {
				this.$http.post('https://wy.lujiahaoo.cn/tour/user.php',{
					"action": "updateinfo",
					"item": "user_introduce",
					"value": this.datalist.user_introduce
				},{}).then(result => {
					console.log(result)
					this.ifNote = true
					this.noteInfo = result.body.message
					setTimeout(()=>{
						this.ifNote = false
						this.ifChangeTro = true
					},1000)
					
				}) 
			},
			changeUserImg () {
				this.$refs.user_img.click()
			},
			push_img (event) {
				let reader = new FileReader()
				let user_headimg = event.target.files[0]
				
				let form = new FormData()
				form.append('img',user_headimg)

				this.$http.post('https://wy.lujiahaoo.cn/tour/headimg.php',form,{
					headers: { "Content-Type": "multipart/form-data" }
				}).then(result => {
					// console.log(result)
					this.ifNote = true
					this.noteInfo = result.body.message
					setTimeout(()=>{
						this.ifNote = false
						this.ifChangeTro = true
					},1000)
				})

			}
		},
		mounted () {
			//个人信息
			this.$http.post('https://wy.lujiahaoo.cn/tour/user.php',{
				"action":"selfinfo"
			},{}).then(result => {
				// console.log('success')
				if(result.body.code === '1'){
					this.datalist = result.body.data.info
					if (this.datalist.user_sex == '1'){
						this.sex = '男'
					}else {
						this.sex = '女'
					}
					this.$emit('nickName',result.body.data.info.user_nickname)
					// console.log(this.datalist)
					// this.compList = result.body.data
					// this.nowList = result.body.data.slice(0,12)
					// console.log(this.nowList)
					
				}else{
					// this.ifNote = true
					// this.noteInfo = result.body.message
					// setTimeout(()=>{
					// 	this.ifNote = false
					// },1000)
				}
				
				console.log(result)
			})
		}
	}
</script>
<style type="text/css" scoped>
	.perInfo{
		width: 535px;
		margin: 0 auto;
	}
	.perImgBox{
		width: 170px;
		margin: 0 auto;
		
	}
	.perImgBox>div{
		display: inline-block;
		vertical-align: top;
	}
	.perImgLeft{
		width: 82px;
		text-align: center;
	}
	.perImgLeft>p{
		margin-top: 5px;
	}
	.perImgLeft>img{
		width: 82px;
		height: 82px;
		border-radius: 50%;
	}
	.icon-tianjiatupian{
		font-size: 40px;
		margin-left: 11px;
		cursor: pointer;
	}

	.perImgRight>p{
		font-size: 14px;
		margin-top: 5px;
	}
	.perImgRight{
		margin-left: 20px;
		margin-top: 24px;
		width: 65px;
		text-align: center;
	}
	.nick{
		margin-top: 40px;
	}
	.nick,
	.persex,
	.perphone,
	.perintro{
		margin-bottom: 30px;
	}
	.nick>div,
	.persex>div,
	.perphone>div,
	.perintro>div{
		display: inline-block;
		vertical-align: top;

	}
	.nick>div:first-child,
	.persex>div:first-child,
	.perphone>div:first-child,
	.perintro>div:first-child{
		width: 70px;
		text-align: right;
		height: 40px;
		line-height: 40px;
		margin-right: 20px;
	}
	.nick>div:last-child>input,
	.persex>div:last-child>input,
	.perphone>div:last-child>input,
	.perintro>div:last-child>input{
		width: 328px;
		height: 40px;
		outline: none;
		font-size: 16px;
		padding-left: 10px;
		padding-right: 40px;
	}
	.nick>div:last-child,
	.persex>div:last-child,
	.perphone>div:last-child,
	.perintro>div:last-child{
		position: relative;
	}
	.nick>div:last-child>label,
	.persex>div:last-child>label,
	.perphone>div:last-child>label,
	.perintro>div:last-child>label{
		position: absolute;
		right: 15px;
	}
	.icon-evaluate{
		font-size: 18px;
	}
	.perintro>div:last-child>label{
		top: 10px;
	}
	.perphone>div:last-child>label{
		top: 10px;
	}
	.icon-shouji{
		font-size: 22px;
	}
	.icon-xingbie{
		font-size: 26px;
	}
	.persex>div:last-child>label{
		top: 8px;
	}
	.icon-yonghu1{
		font-size: 29px;
	}
	.nick>div:last-child>label{
		top: 6px;
	}
	.selectSex{
		text-align: center;
		position: absolute;
		background:#fff;
		width: 382px;
		z-index: 5;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.16);
	}
	.selectSex>div{
		height: 30px;
		line-height: 30px;
		cursor: pointer;
	}
	.selectSex>div:hover{
		background-color: #7086c6;
    	color: #fff;
	}
	.persex>div:last-child{
		position: relative;
	}
	.persex>div:last-child>input{
		cursor: pointer;
	}
	.perphone>div:last-child>input{
		cursor: default;
	}
</style>