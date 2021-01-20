<template>
	<div class="straDetialBox">
		<header class="straDetialHead">
			<Nav></Nav>
			<div class="StraLxText">旅行</div>
			<div class="StraJbText">从<span>认识</span>开始</div>
		</header>
		<div class="straDetialContentBox">
			<div class="straDetial">
				<div class="straDetialTitle">
					<p>【攻略标题】{{ datalist.strategy_title }}</p>
					<div class="shareIcon" @click="clickHeart">
						<i class="iconfont " :class="{'icon-heart': heart,'icon-heart1':!heart}"></i>
						<div style="margin-top: 9px;">点赞</div>
					</div>
					<div class="shareIcon" style="margin-right: 2px" @click="clickCollet">
						<i class="iconfont ":class="{'icon-star': collect,'icon-shoucang0':!collect}"></i>
						<div style="margin-top: 9px;">收藏</div>
					</div>
					<div class="shareIcon" @click="share = !share" style="margin-right: 2px">
						<i class="iconfont icon-fenxiang"></i>
						<div>分享</div>
						<div class="selectShareIcon" v-show="share">
							<i class="iconfont icon-qq"></i>
							<i class="iconfont icon-weibo-copy"></i>
							<i class="iconfont icon-weixin-copy"></i>
						</div>
					</div>
				</div>
				<div class="strategyDetialInfo">
					<router-link
						tag="img"
						:src=" datalist.strategy_headimg"
						:to="'/other?name='+datalist.strategy_nickname">
					</router-link>
					<!-- <img :src=" datalist.strategy_headimg"> -->
					<div id="straDetialUser">{{ datalist.strategy_nickname }}</div>
					<div class="pusharea">在<span>{{ datalist.strategy_ip }}</span>发布的攻略</div>
					<div>最后回复于{{datalist.strategy_lastreply}}</div>
				</div>
				<div class="strategyDetialPage" v-html="datalist.strategy_html">
					
				</div>
				<p class="pagend">The End.</p>
				<!-- 评论开始 -->
				<div class="comments">
					<div class="commentsTitle"><span>评论攻略</span></div>
					<div class="textareaBox">
						<textarea v-model="replayContent">
							
						</textarea>
						<i class="iconfont icon-evaluate"></i>
					</div>
					
					<div class="pushcomments" @click="pushcom">发表评论</div>
					<div class="commentsInfos">
						<div class="noteInfo" v-show="ifNote" style="top: 1045px;">{{ noteInfo }}</div>
						<p>评论 {{ commentList.count }}</p>
						<!-- 一条评论 -->
						<div class="commentsInfoItem" v-for="item in commentList.list" :rootid="item.root_id" :id="item.id">
							<div class="commentHead">
								<img :src="item.user_headimg">
								<div class="commentsUserInfo">
									<p>{{ item.user_nickname }}</p>
									<p class="time">{{ item.ctime }}</p>
								</div>
								<div class="replayComment" @click="replay($event)">回复</div>
							</div>
							<p>{{ item.content }}</p>
							<div class="replayCommentInput">
								<input type="text" name="">
								<div @click="replayCom">发送</div>
							</div>
							
							<div class="commentChildren">
								<div class="commnetChildrenItem" v-for="child in item.child" :rootid="child.root_id" >
									<div>
										<div class="commnetChildrenItemHead">
											<div>
												<span class="reuser">{{ child.user_nickname }}:</span>回复<span class="bered">{{ child.object }}</span>:
											</div>
											<div class="bereplayTime">{{ child.ctime }}</div>
										</div>
										
										<div class="bereplayinfo">{{ child.content }}</div>
										<div class="comChildReplay" @click="childrenReplay($event)">回复</div>
									</div>
								
									<div class="comReplyImput" ref="replayChildComment">
										<input type="text" name="">
										<div @click="childReply">发送</div>
									</div>
								</div>
								
							</div>
							
						</div>
						
						<!-- 一条评论结束 -->
					</div>
				</div>
				<!-- 评论结束 -->

			</div>
			<Recommend></Recommend>
		</div>
		<Foot></Foot>
		<!-- <div class="noteInfo" v-show="ifNote">{{ noteInfo }}</div> -->
	</div>
</template>

<script type="text/javascript">
	import Nav from '../components/Nav.vue'
	import Foot from '../components/Foot.vue'
	import Recommend from '../components/Recommend.vue'

	export default {
		name: 'Strtegy',
		components: {
			Nav,
			Foot,
			Recommend
		},
	 	data () {
	 		return {
	 			share : false,
	 			datalist:'',
	 			heart: true,
	 			collect: true,
	 			noteInfo: '',
	 			ifNote: false,
	 			replayContent: '',
	 			commentNum: 0,
	 			commentList:''
	 		}
	 	},
	 	methods: {
	 		childrenReplay (e) {
	 			
	 			var targetInput = e.currentTarget.parentNode.parentNode.children[1]
	 			targetInput.style.display = "block"
	 			
	 			var pushreplay = e.currentTarget
	 			document.addEventListener('click', (e) => {
	 				
	 				if( !targetInput.contains(e.target) && !pushreplay.contains(e.target)){
	 					
	 					targetInput.style.display="none"
	 				}
	 			})
	 			
	 		},
	 		replay (e) {
	 			
	 			var replayInput = e.currentTarget.parentNode.parentNode.children[2]
	 			var mainpushreplay = e.currentTarget
	 		
	 			replayInput.style.display = "block"

	 			document.addEventListener('click', (e) => {
	 				
	 				if( !mainpushreplay.contains(e.target) && !replayInput.contains(e.target)){
	 					
	 					replayInput.style.display="none"
	 				}
	 			})

	 		},
	 		//点击点赞
	 		clickHeart () {
	 			this.heart = !this.heart
	 			console.log(this.$route.query.id)
	 			this.$http.post('https://wy.lujiahaoo.cn/tour/likeorcollect.php',{
		 			"action":"like",
	            	"strategy_id":this.$route.query.id
				},{}).then(result => {
					console.log(result)
					if (result.body.code == '1') {
						this.heart = false
					}else if (result.body.code == '2') {
						this.heart = true
					}else if (result.body.code == '-1') {
						this.heart = false
					}else if (result.body.code == '0') {
						this.heart = true
					}
					this.ifNote = true
					this.noteInfo = result.body.message
					setTimeout(()=>{
						this.ifNote = false
					},1000)
				})
	 		},
	 		//点击收藏
	 		clickCollet () {
	 			console.log( this.datalist.strategy_title)
	 			console.log(this.datalist.strategy_headimg)
	 			this.collect = !this.collect
	 			this.$http.post('https://wy.lujiahaoo.cn/tour/likeorcollect.php',{
		 			"action":"collect_add",
	            	"strategy_id":this.$route.query.id,
	            	"strategy_title": this.datalist.strategy_title,
                	"strategy_titleimg":this.datalist.strategy_titleimg
				},{}).then(result => {
					console.log(result)
					this.ifNote = true
					this.noteInfo = result.body.message
					setTimeout(()=>{
						this.ifNote = false
					},1000)

					if (result.body.code == '1') {
						this.collect = false
					}else if (result.body.code == '2') {
						this.collect = true
					}else if (result.body.code == '0') {
						this.collect = true
					}
				})
	 		},
	 		//发表评论
	 		pushcom () {
	 			console.log(this.datalist.strategy_nickname)
	 			console.log(this.replayContent)
	 			this.$http.post('https://wy.lujiahaoo.cn/tour/strategy.php',{
		 			"action":"comment_reply",
	            	"strategy_id":this.$route.query.id,
	            	"type":'1',
		            "content": this.replayContent,
		            "object": this.datalist.strategy_nickname
				},{}).then(result => {
					console.log(result)
					this.ifNote = true
					this.noteInfo = result.body.message
					setTimeout(()=>{
						this.ifNote = false
					},1000)
					this.getcomment(0)
				})
				this.replayContent = ''
	 		},
	 		//获得评论
	 		getcomment (commentNum) {

				this.$http.post('https://wy.lujiahaoo.cn/tour/strategy.php',{
		 			"action":"comment_list",
		            "strategy_id":this.$route.query.id,
		            "num":commentNum
				
				},{}).then(result => {
					// console.log('success')
					if(result.body.code === '1'){
						this.commentList = result.body.data
						
						
					}else{
						
					}
					
					console.log(result)
				})
	 		},
	 		//回复评论
	 		replayCom (e) {

	 			let content = e.currentTarget.previousElementSibling.value
	 			let object = e.currentTarget.parentNode.parentNode.children[0].children[1].children[0].innerText
	 			let rootId = e.currentTarget.parentNode.parentNode.getAttribute('id')
	 			// console.log(object)
	 			// console.log(e.currentTarget.parentNode.parentNode.children[0].children[1].children[0])
	 			// console.log(rootId)
	 			let parent = e.currentTarget.parentNode
	 			let border = e.currentTarget.previousElementSibling
	 			this.$http.post('https://wy.lujiahaoo.cn/tour/strategy.php',{
		 			"action":"comment_reply",
	                "strategy_id": this.$route.query.id,
	                "type":'2',
	                "content": content,
	                "object": object,
	                "root_id": rootId
				},{}).then(result => {
					console.log(result)
					this.ifNote = true
					this.noteInfo = result.body.message
					setTimeout(()=>{
						this.ifNote = false
					},1000)
					if (result.body.code == '1') {
						// console.log(e.currentTarget)
						parent.style.display="none"	
						border.value = ''
						this.getcomment(0)
					}
				})
				
	 		},
	 		childReply (e) {
	 			let content = e.currentTarget.previousElementSibling.value
	 			let object = e.currentTarget.parentNode.previousElementSibling.children[0].children[0].children[0].innerText
	 			let rootId = e.currentTarget.parentNode.parentNode.parentNode.parentNode.getAttribute('id')
	 			let parent = e.currentTarget.parentNode
	 			let border = e.currentTarget.previousElementSibling
	 			console.log(object)
	 			console.log(content)
	 			console.log(rootId)
	 			this.$http.post('https://wy.lujiahaoo.cn/tour/strategy.php',{
		 			"action":"comment_reply",
	                "strategy_id": this.$route.query.id,
	                "type":'2',
	                "content": content,
	                "object": object,
	                "root_id": rootId
				},{}).then(result => {
					console.log(result)
					this.ifNote = true
					this.noteInfo = '发送成功'
					setTimeout(()=>{
						this.ifNote = false
					},1000)
					
					parent.style.display="none"	
					border.value = ''
					this.getcomment(0)
				})	
	 		}
	 	},
	 	mounted () {
	 		// 获得结伴的信息
	 		this.$http.post('https://wy.lujiahaoo.cn/tour/search.php',{
	 			 "action":"strategy_detail",
            	"strategy_id":this.$route.query.id
				
			
			},{}).then(result => {
				// console.log('success')
				if(result.body.code === '1'){
					this.datalist = result.body.data
					console.log(this.datalist)
					// this.compList = result.body.data
					// this.nowList = result.body.data.slice(0,12)
					// console.log(this.nowList)
					
				}else{
					// this.ifNote = true
					// this.noteInfo s result.body.message
					// setTimeout(()=>{
					// 	this.ifNote = false
					// },1000)
				}
				
				console.log(result)
			})
			this.getcomment(0)
	 	},
	 	created () {
	 		document.addEventListener('click',(e) => {
	 			// console.log(this.$refs.replayChildComment.contains(e.target))
	 			// if( !this.$refs.replayChildComment.contains(e.target) ){
	 			// 	console.log("ooo")
	 			// 	this.$refs.replayChildComment.style.display="none"
	 			// }
	 		})
	 	}
	  
	}
</script>

<style type="text/css" scoped>
	.straDetialBox{
		min-width: 1058px;
	}
	.straDetialHead{
		height: 413px;
	    background-image: url(../../public/images/Strtegy_bg.png);
	    background-repeat: no-repeat;
	    background-size: 91% 116%;

	}
	.straDetialContentBox{
		width: 1058px;
		margin: 0 auto;
		padding-bottom: 30px;
	}
	.straDetialContentBox>div{
		display: inline-block;
		vertical-align: top;
	}
	.straDetial{
		width: 745px;
	}
	.straDetialTitle>p{
		font-size: 24px;
		font-weight: bold;
		width: 530px;
	    word-break: break-all;
	    display: inline-block;
	}
	.straDetialTitle{
		height: 65px;
		border-bottom: 1px solid #ccc;
	}

	.icon-fenxiang{
		font-size: 21px;
	}
	.shareIcon>div{
		font-size: 14px;
	}
	.shareIcon{
		margin-top: 10px;
		cursor: pointer;
	}
	.strategyDetialInfo>img{
		width: 32px;
	    height: 32px;
	    border-radius: 100%;
	    margin-right: 10px;
	}
	.strategyDetialInfo>div{
		display: inline-block;
		vertical-align: top;
		font-size: 14px;
		color: #747474;
	}
	.strategyDetialInfo{
		height: 32px;
		line-height: 32px;
		margin-top: 21px;
		margin-left: 2px;
		margin-bottom: 25px;
	}
	.strategyDetialInfo>div>span{
		border-bottom: 1px solid #747474;
		padding-bottom: 3px;
	}
	.pusharea{
		margin-right: 10px;
	}
	#straDetialUser{
		color: #000;
		margin-right: 10px;
		font-weight: bold;
	}
	.pagend{
		text-align: center;
		margin-top: 20px;
	}
	.textareaBox>textarea{
		resize: none;
	    outline: none;
	    width: 732px;
	    height: 119px;
	   
	    border-radius: 5px;
	    border: 1px solid #7086c6;
	    padding: 5px;
	    padding-bottom: 37px;
	}
	.commentsTitle{
		border-bottom: 1px solid #c8c8c8;
		margin-top: 18px;
		color: #7086c6;
		padding-bottom: 2px;
	}
	.commentsTitle>span{
		border-bottom: 1px solid #7086c6;
		padding-bottom: 2px;
	}
	.textareaBox{
		position: relative;
		 margin-top: 21px;
	}
	.textareaBox>i{
		position: absolute;
		right: 16px;
		font-size: 23px;
		color: #7086c6;
		bottom: 13px;

	}
	.pushcomments{
		width: 131px;
	    height: 37px;
	    color: #fff;
	    background-color: #7086c6;
	    border-radius: 5px;
	    line-height: 37px;
	    text-align: center;
	    margin-left: 614px;
    	margin-top: 10px;
    	cursor: pointer;
	}
	.replayComment{
		
		float: right;
		margin-right: 10px;
    	margin-top: 11px;
	}
	.commentHead>div{
		display: inline-block;
		vertical-align: top;
	}
	.commentHead>img{
		height: 51px;
		width: 51px;
		border-radius:  50%;
	}
	.commentsUserInfo{
		font-size: 16px;
		margin-left: 10px;
		margin-top: 5px;
	}
	.commentsUserInfo>.time{
		color: #c1c1c1;
		font-size: 16px;
		margin-top: 3px;
	}
	.commentsInfoItem>p{
		padding-left: 54px;
		padding-right: 20px;
		/*margin-top: 10px;*/
	}
	.replayCommentInput>input{
		width: 535px;
	    height: 30px;
	    border: 1px solid #7086c6;
	    border-radius: 5px;
    	outline: none;
    	margin-left: 59px;
    	margin-right: 38px;
    	padding: 0 8px;
	}
	.replayCommentInput>div{
		display: inline-block;
		vertical-align: top;
		

	}
	.replayCommentInput>div,
	.replayComment,
	.comChildReplay,
	.comReplyImput>div{
		font-size: 16px;
		text-align: center;
		width: 81px;
		height: 29px;
		line-height: 29px;
		background-color: #fff;
		border:1px solid #7086c6;
		color: #7086c6;
		letter-spacing: 1px;
		border-radius: 2px;
		cursor: pointer;
	}
	.replayCommentInput{
		margin: 9px 0;
		display: none;
	}
	.commentChildren{
		padding-left: 70px;
		margin-top: 12px;
	}
	.commnetChildrenItem>div>div{
		display: inline-block;
		vertical-align: top;
	}
	.comReplyImput>div,
	.comChildReplay{
		width: 71px;
		height: 22px;
		line-height: 23px;
		font-size: 14px;
		float: right;
		margin-right: 24px;
		margin-top: 3px;
	}

	.commnetChildrenItemHead>div>span{
		color: #7086c6;
		/*margin-right: 5px;*/
	}
	.reuser{
		margin-right: 5px;
	}
	.bered{
		margin-left: 5px;
	}
	.bereplayinfo{
		margin-left: 5px;
		font-size: 18px;
	}
	.bereplayTime{
		font-size: 15px;
		margin-top: 2px;
		color: #c1c1c1;
	}
	.comReplyImput>input{
		width: 535px;
	    height: 25px;
	    border: 1px solid #7086c6;
	    border-radius: 5px;
	    outline: none;
	    padding: 0 8px;
	    margin-top: 2px;
	}
	.comReplyImput{
		margin-top: 5px;
		display: none;
	}
	.commnetChildrenItem{
		margin-bottom:10px;
	}
	.commentsInfoItem{
		margin-top: 20px;
	}
	.icon-heart,
	.icon-heart1{
		color: red;
	}

	.icon-star,
	.icon-shoucang0{
		color: skyblue;
	}
</style>