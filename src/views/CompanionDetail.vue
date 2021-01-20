<template>
	<div class="compDetial">
		<header class="compDetialHead">
			<Nav></Nav>
			<div class="lxText">旅行</div>
			<div class="jbText">从<span>结伴</span>开始</div>
		</header>
		<div class="contentBox">
			<div class="compacontent">
				<router-link 
					:to="'/other?name='+compaData.issue_nickname" 
					tag="img" 
					:src="compaData.issue_headimg " 
					class="userImg" alt="用户头像">
				</router-link>
				<!-- <img :src=" compaData.issue_headimg " class="userImg" alt="用户头像"> -->
				<p class="userId">{{ compaData.issue_nickname }}</p>
				<div class="companionTitle">
					<p>【结伴标题】{{compaData.issue_title}}</p>
					<div class="shareIcon" @click="share = !share">
						<i class="iconfont icon-fenxiang"></i>
						<div>分享</div>
						<div class="selectShareIcon" v-show="share">
							<i class="iconfont icon-qq"></i>
							<i class="iconfont icon-weibo-copy"></i>
							<i class="iconfont icon-weixin-copy"></i>
						</div>
					</div>
				</div>
				<div class="startAddress">
					<span>出发地：</span>{{ compaData.issue_startplace }}
				
				</div>
				<div class="endAddress">
					<span>目的地：</span>{{ compaData.issue_endplace }}
				</div>
				<div class="companionLine">
					<span>结伴路线：</span>
					<div class="pathItem" v-for=" item in compaData.issue_line  ">
						<div class="pathItemLine"></div>
						<div class="pathItemInput" >{{item}}</div>
					</div>
				</div>
				<div class="contact">
					<span>联系方式：</span>
					<div class="watchCode">查看二维码<i class="iconfont icon-code"></i>
						<div class="qrcode-box">
							<div class="qrcode-sjx"></div>
							<img :src=" compaData.issue_qrcode ">
						 </div>
					</div>
				</div>
				<div class="companionInfos">
					<span>结伴详情：</span>{{ compaData.issue_content }}
				</div>
			</div>
			<Recommend></Recommend>
			
		</div>
		
		<Foot></Foot>
	</div>
</template>
<script type="text/javascript">
	import Nav from '../components/Nav.vue'
	import Foot from '../components/Foot.vue'
	import Recommend from '../components/Recommend.vue'


	export default {
		name: 'CompanionDetial',
		components: {
			Nav,
	   	 	Foot,
	   	 	Recommend
		},
		data () {
			return {
				share : false,
				compaData:''
			}
		},
		methods: {
			
		},
		mounted () {
			
			this.$http.post('https://wy.lujiahaoo.cn/tour/search.php',{
				"action":"issue_detail",
                "issue_id": this.$route.query.id
			
			},{}).then(result => {
				// console.log('success')
				if(result.body.code === '1'){
					this.compaData = result.body.data
					//增加阅读量
					setTimeout(() => {
						this.$http.post('https://wy.lujiahaoo.cn/tour/issue.php',{
							 "action":"viewcount",
			                "issue_id": this.$route.query.id
						
						},{}).then(result => {
							console.log(result)
						})
					},5000)
		
				}
				
				console.log(result)
			})
		}
	}
</script>
<style scoped type="text/css">
	.compDetial{
		min-width: 1073px;
	}
	.pathItem{
		margin-bottom: 0;
		display: inline-block;
	}
	.pathItemInput{
		margin-top: 18px;
	}
	.pathItemLine{
		margin-top: 34px;
	}
	.pathItem:nth-of-type(1) .pathItemLine
	{
		display: none;
		
	}
</style>
<style type="text/css" >
	.compDetialHead{
		height: 389px;
		background: url(../../public/images/companion_bg.png);
		background-size: 100% 110%;
	}
	.compacontent{
		width: 768px;
		min-height: 658px;
		border: 1px solid #ccc;
	}
	.userImg{
		width: 61px;
		height: 61px;
		border-radius: 50%;
		margin-top: -30px;
	    margin-left: -2px;
	    cursor: pointer;
	}
	.contentBox{
		width: 1073px;
		margin: 0 auto;
		margin-bottom: 53px;
		margin-top: 66px;
	}
	.recomcomp,
	.recomstra{
		width: 272px;
		height: 328px;
		border: 1px solid #ccc;

	}
	.recomstra{
		border-top: none;
	}
	.contentBox>div{
		display: inline-block;
		vertical-align: top;
	}
	.recommend{
		margin-left: 23px;
	}
	.userId{
		padding-left: 75px;
    	margin-top: -22px;
	}
	.companionTitle{
		font-size: 20px;
    	color: #7086c6;
    	height: 89px;
    	line-height: 89px;
    	/*padding-left: 89px;
    	border-bottom: 1px dashed #c7c7c7;*/

	}
	.shareIcon{
		display: inline-block;
		vertical-align: top;
		line-height: normal;
		font-size: 14px;
		width: 51px;
		text-align: center;
		float: right;
		margin-right: 41px;
		position: relative;
	}
	.selectShareIcon{
		width: 154px;
	    height: 40px;
	    background: #fff;
	    z-index: 2;
	    position: absolute;
	    border-radius: 5px;
	    line-height: 40px;
	    top: -59px;
    	left: -51px;
    	/*display: none;*/
	}

	.companionTitle>p{
		vertical-align: top;
		display: inline-block;
	}
	.icon-fenxiang {
		color: #fce5a9;
		font-size: 26px;
	}
	.shareIcon>div{
		margin-top: 5px;
		color: #000;
	}
	.startAddress,
	.companionTitle,
	.endAddress,
	.contact,
	.companionLine
	{
		padding-left: 89px;

    	border-bottom: 1px dashed #c7c7c7;
	}
	.startAddress,
	.endAddress,
	.contact{
		min-height: 65px;
		line-height: 65px;
		font-size: 16px;
	}
	.startAddress>span,
	.endAddress>span,
	.contact>span,
	.companionLine>span,
	.companionInfos>span{
		font-weight: bold;
	}
	.companionLine{
		min-height: 65px;
		line-height: 65px;
	}
	.companionInfos{
		padding-left: 89px;
		min-height: 65px;
		line-height: 65px;
		padding-right: 80px; 
		/*padding-top: 17px;*/
		/*line-height: 35px;*/
	}
	.startAddress,
	.endAddress,
	.contact,
	.companionLine{
		padding-right: 70px;
	}
	.watchCode{
		display: inline-block;
		text-align: center;
    	border-radius: 20px;
		width: 146px;
	    height: 32px;
	    background-color: #7086c6;
	    color: #fff;
	    line-height: 32px;
	    margin-left: 5px;
	    cursor: pointer;
	}
	.icon-code{
		margin-left: 2px;
	}
	.watchCode:hover .qrcode-box{
		display: inline-block;
	}
	.qrcode-box{
		float: right;
	    width: 170px;
	    height: 170px;
	    margin-top: -212px;
	    background-color: #fff;
	    position: relative;
	    -webkit-box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.16);
	    box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.16);
	    margin-right: -110px;
    	display: none;
	}
	
	.qrcode-box>img {
		 width: 150px;
	    height: 150px;
	    margin-top: 10px;
	}
	 .qrcode-sjx {
	    width: 10px;
	    height: 10px;
	    background-color: #fff;
	    transform: rotate(45deg);
	    display: inline-block;
	    position: absolute;
	    bottom: -5px;
	    left: 2px;
	    box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.16);
	}

</style>