<template>
	<div class="other">
		<header class="otherHead">
			<router-link to="/" tag="div" class="homeA" @click.native="refresh">
				<div class="homeAicon"><i class="iconfont icon-xiangzuo"></i></div>
				<div class="homeText">HOME</div>
			</router-link>
			<!-- <div class=>
				
			</div> -->
			<img :src="img">
			<p>{{ this.$route.query.name }}</p>
			<div class="focus" @click="clickFocus">{{ focusdata }}</div>
		</header>
		<div class="bar">
			<!-- <div class="barInBox"> -->
				<div :class="{barfocus: ifOtherInfo}" @click="barclick('ifOtherInfo')">基本资料</div>
				<div :class="{barfocus: ifOtherCompanion}" @click="barclick('ifOtherCompanion')">旅游结伴</div>
				<div :class="{barfocus: ifOtherStrategy}"  @click="barclick('ifOtherStrategy')">旅游攻略</div>
				<div :class="{barfocus: ifOtherFocus}"  @click="barclick('ifOtherFocus')">关注列表</div>
			<!-- </div> -->
		</div>
		<div class="otherBox">
			<div class="otherBody">
				<OtherInfo v-show="ifOtherInfo" @focus ="getfocus"  @img ="getimg"></OtherInfo>
				<OtherCompanion v-show="ifOtherCompanion"></OtherCompanion>
				<OtherStrategy v-show="ifOtherStrategy"></OtherStrategy>
				<OtherFocus v-show="ifOtherFocus"></OtherFocus>
			</div>
		</div>
		<div class="noteInfo" v-show="ifNote">{{ noteInfo }}</div>
	</div>
</template>
<script type="text/javascript">
	import OtherInfo from '../components/OtherInfo.vue'
	import OtherCompanion from '../components/OtherCompanion.vue'
	import OtherStrategy from '../components/OtherStrategy.vue'
	import OtherFocus from '../components/OtherFocus.vue'

		export default {
			name: 'Other',
			components: {
				OtherInfo,
				OtherCompanion,
				OtherStrategy,
				OtherFocus
			},
			data () {
				return {
					ifOtherInfo: true,
					ifOtherCompanion: false,
					ifOtherStrategy: false,
					ifOtherFocus: false,
					iffocus: false,
					focusdata: '关注',
					img: '',
					ifNote:false,
					noteInfo: ''
				}
			},
			methods: {
				refresh () {
					console.log('refresh')
					this.$router.go(0)
				},
				barclick ( name ) {
					if (name === 'ifOtherInfo') {
						this.ifOtherInfo = true
						this.ifOtherCompanion = this.ifOtherStrategy = this.ifOtherFocus = false
					}else if (name === 'ifOtherCompanion'){
						this.ifOtherCompanion = true
						this.ifOtherInfo = this.ifOtherStrategy = this.ifOtherFocus = false
					}else if (name === 'ifOtherStrategy') {
						this.ifOtherStrategy = true
						this.ifOtherInfo = this.ifOtherCompanion = this.ifOtherFocus = false
					}else if (name === 'ifOtherFocus') {
						this.ifOtherFocus = true
						this.ifOtherInfo = this.ifOtherCompanion = this.ifOtherStrategy = false
					}

				},
				getfocus (data) {
					console.log(data)
					this.iffocus = data
					if (data) {
						this.focusdata = '已关注'
					}
					else {
						this.focusdata = '关注'
					}
				},
				
				getimg (data) {
					this.img = data
					console.log(data)
				},
				clickFocus () {
					if (this.iffocus == false ){
						this.$http.post('https://wy.lujiahaoo.cn/tour/focus.php',{
							"action":"focus_add",
							"user_nickname": this.$route.query.name,
							 "focused_headimg": this.img
						},{}).then(result => {
							console.log(result)
							
							if (result.body.code == '1') {
								this.iffocus = true
								this.focusdata = '已关注'
								this.ifNote = true
								this.noteInfo = result.body.message
								setTimeout(()=>{
									this.ifNote = false
								},1000)
							}
							
						})
					}else {
						this.$http.post('https://wy.lujiahaoo.cn/tour/focus.php',{
							"action":"focus_delete",
							"user_nickname": this.$route.query.name,
							
						},{}).then(result => {
							console.log(result)

							this.ifNote = true
							this.noteInfo = result.body.message
							setTimeout(()=>{
								this.ifNote = false
							},1000)
							if (result.body.code == '1') {
								this.iffocus = false
								this.focusdata = '关注'
							}
						})
					}
					
				}
			}
		}
</script>

<style type="text/css">
	.other{
		min-width: 633px;
		position: relative;
	}
	.otherHead{
		height: 283px;
		background-image: url(../../public/images/other_bg.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.otherHead>p{
		text-align: center;
	    font-size: 14px;
	    color: #fff;
	}
	.otherHead>img{
		border-radius: 100%;
	    width: 75px;
	    height: 75px;
	    display: block;
	    margin: 14px auto;
	}
	.focus{
		width: 60px;
	    height: 30px;
	    background: #7086c6;
	    text-align: center;
	    line-height: 30px;
	    color: #fff;
	    border-radius: 10px;
	    margin: 14px auto;
	    cursor: pointer;
	}
	.homeA{
		color: #fff;
	    font-size: 20px;
	    margin-left: 29px;
	    padding-top: 25px;
	    height: 30px;
	    line-height: 30px;
	    cursor: pointer;
	}
	.homeA>div{
		display: inline-block;
		vertical-align: top;
	}
	.homeAicon{
		width: 26px;
		height:26px;
		border-radius: 100%;
		border:2px solid #fff;
		text-align: center;
		line-height: 26px;
	}
	.bar{
		width: 633px;
	    height: 50px;
	    background: #fff;
	    border-radius: 15px;
	    margin-top: -25px;
	    position: absolute;
    	left: 50%;
    	margin-left: -317px;
	}
	.homeText{
		margin-left: 10px;
	}
	.bar>div{
		display: inline-block;
		vertical-align: top;
		width: 113px;
		text-align: center;
		line-height: 50px;
		
		margin-left: 35px;
		cursor: pointer;
	}
	.barfocus{
		border-bottom: 3px solid #7086c6;
	}
	.otherBox{
		height: 817px;
    	background-color: #f2f2f2;
    	padding-top: 86px;
	}
	.otherBody{
		background-color: #fff;
	    width: 966px;
	    height: 630px;
	    border-radius: 12px;
	    margin: 0 auto;
	}
</style>