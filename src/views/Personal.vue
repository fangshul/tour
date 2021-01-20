<template>
	<div class="personal">
		<header class="personalHead">
			<Nav :white = "'white'"></Nav>
			<div class="text_1">正年轻的我们就应该</div>
			<div class="text_2">要有说走就走的旅行</div>
		</header>
		<div class="personalBar">
			<div class="textbar" :class='{foucsbar:info}' @click="selectInfo">我的资料</div>
			<div class="per_line"></div>
			<div class="textbar" :class='{foucsbar:mypushstra || mypushcompa}'>
				我发布的
				<div class="subBar">
					<div @click="selectmypushcompa">旅游结伴</div>
					<div @click="selectmypushstra">旅游攻略</div>
				</div>
			</div>
			<div class="per_line"></div>
			<div class="textbar" :class='{foucsbar:myfocus || myfans}'>
				我的互动
				<div class="subBar">
					<div @click="selectmyfocus">我的关注</div>
					<div @click="selectmyfans">我的粉丝</div>
				</div>
			</div>
			<div class="per_line"></div>
			<div class="textbar" @click="selectcollect" :class='{foucsbar:collect}'>收藏的攻略</div>
			<div class="per_line"></div>
			<div class="textbar" @click="selectreplay" :class='{foucsbar:replay}'>我的回复</div>
		</div>
		<div class="personalBody">
			<PersonalInfo v-show="info" @nickName="nickName"></PersonalInfo>
			<PersonPushCompa v-show="mypushcompa" :nick_name = "nick_name"></PersonPushCompa>
			<PersonPushStra v-show="mypushstra  " :nick_name = "nick_name"></PersonPushStra>
			<MyFocus v-show="myfocus" :nick_name = "nick_name"></MyFocus>
			<MyFans v-show="myfans" :nick_name = "nick_name"></MyFans>
			<CollectStra v-show="collect" :nick_name = "nick_name" ></CollectStra>
			<Replay v-show="replay" @ifchange ="changeBar"></Replay>
		</div>
		<Foot></Foot>

	</div>
</template>

<script type="text/javascript">
	import Nav from '../components/Nav.vue'
	import Foot from '../components/Foot.vue'
	import PersonalInfo from '../components/PersonalInfo.vue'
	import PersonPushCompa from '../components/PersonPushCompa.vue'
	import PersonPushStra from '../components/PersonPushStra.vue'
	import MyFocus from '../components/MyFocus.vue'
	import MyFans from '../components/MyFans.vue'
	import Replay from '../components/Replay.vue'
	import CollectStra from '../components/CollectStra.vue'
	export default {
		name: 'Personal',
	  	components: {
	    	Nav,
	    	Foot,
	    	PersonalInfo,
	    	PersonPushCompa,
	    	PersonPushStra,
	    	MyFocus,
	    	MyFans,
	    	Replay,
	    	CollectStra
		},
		data () {
			return {
				info :true,
				mypushcompa: false,
				mypushstra:false,
				myfocus: false,
				myfans: false,
				collect: false,
				replay: false,
				nick_name: ''
			}
		},
		methods:{
			selectInfo () {
				this.info = true
				this.mypushcompa = 
				this.mypushstra = 
				this.myfocus = 
				this.myfans = 
				this.collect = 
				this.replay = false
			},
			selectmypushcompa () {
				this.mypushcompa = true
				this.info = 
				this.mypushstra = 
				this.myfocus = 
				this.myfans = 
				this.collect = 
				this.replay = false
			},
			selectmypushstra () {
				this.mypushstra = true
				this.info = 
				this.mypushcompa = 
				this.myfocus = 
				this.myfans = 
				this.collect = 
				this.replay = false

			},
			selectmyfocus () {
				this.myfocus = true
				this.mypushcompa = 
				this.mypushstra = 
				this.info = 
				this.myfans = 
				this.collect = 
				this.replay = false
			},
			selectmyfans () {
				this.myfans = true
				this.mypushcompa = 
				this.mypushstra = 
				this.info = 
				this.myfocus = 
				this.collect = 
				this.replay = false
			},
			selectcollect () {
				this.collect = true
				this.mypushcompa = 
				this.mypushstra = 
				this.info = 
				this.myfocus = 
				this.myfans = 
				this.replay = false
			},
			selectreplay () {
				this.replay = true
				this.mypushcompa = 
				this.mypushstra = 
				this.info = 
				this.myfocus = 
				this.collect = 
				this.myfans = false
			},
			nickName (data) {
				this.nick_name = data
				// console.log(data)
			},
			changeBar (data){
				if (data) {
					this.MyFans =true
					this.replay = false
				}
			}
		},
		mounted () {
			
		}
	}
</script>

<style type="text/css" scoped>
	.personalBody{
		padding-bottom: 30px;
		padding-top: 75px;
	}
	.personal{
		position: relative;
		min-width: 1000px;
	}
	.personalHead{
		height: 460px;
		background: url(../../public/images/personal_bg.png);
		background-size: 100% 100%;
	}
	/deep/ #nav a{
		color: #fff;
	}
	.personalHead>div{
		color: #fff;
		font-size: 24px;
		cursor: default;
	}
	.text_1{
		margin-top: 85px;
		margin-left: 107px;
	}
	.text_2{
		margin-top: 24px;
		margin-left: 220px;
	}
	.personalBar>div{
		display: inline-block;
		vertical-align: top;
		
	}
	.per_line{
		height: 20px;
		width: 1px;
		background: #000;
		margin-top: 15px;
	}
	.personalBar{
		height: 50px;
		width: 624px;
		border-radius: 15px;
		background-color: #fff;
		margin-top: -25px;
		left: 50%;
		position: absolute;
		margin-left: -312px;
		line-height: 50px;
		padding-left: 45px;
		box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.16);
	}
	.textbar{
		width: 112px;
		text-align: center;
		cursor: pointer;
	}
	.textbar:hover .subBar{
		display: block;
	}
	.subBar{
		width: 112px;
		background: #fff;
		display: none;
	}
	.subBar>div{
		height: 50px;
	}
	.subBar>div:hover{
		background-color: #7086c6;
    	color: #fff;
	}
	.foucsbar{
		border-bottom: 2px solid #7086c6;
	}
</style>
