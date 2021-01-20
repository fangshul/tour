<template>
	<div class="recommend">
				<div class="recomcomp">
					<p class="recomcompTitle">推荐结伴</p>
					<p v-show="issueData" style="text-align:  center;">暂无数据</p>
					<router-link 
						class="recommendItem"
						:to="'/companiondetail?id='+item.issue_id"
						v-for="item in  issue"
						v-show="!issueData"
						:key="item.issue_id">
						<img :src="item.issue_titleimg">
						<div>
							<p>{{ item.issue_title }}</p>
							<p><i class="iconfont icon-liulanliang"></i>{{ item.issue_viewcount }}</p>
						</div>
					</router-link>
					<!-- <div class="recommendItem">
						<img src="../../public/images/qiao.png">
						<div>
							<p>这是一个攻略标题</p>
							<p><i class="iconfont icon-liulanliang"></i>100</p>
						</div>
					</div>
					<div class="recommendItem">
						<img src="../../public/images/qiao.png">
						<div>
							<p>这是一个攻略标题</p>
							<p><i class="iconfont icon-liulanliang"></i>100</p>
						</div>
					</div>
					<div class="recommendItem">
						<img src="../../public/images/qiao.png">
						<div>
							<p>这是一个攻略标题</p>
							<p><i class="iconfont icon-liulanliang"></i>100</p>
						</div>
					</div> -->
				</div>
				<div class="recomstra">
					<p class="recomcompTitle">推荐攻略</p>
					<p v-show="straData" style="text-align:  center;">暂无数据</p>
					<router-link 
						:to="'/strategydetail?id='+item.strategy_id"  
						v-show="!straData" 
						class="recommendItem" 
						v-for="item in strate" 
						:key="item.strategy_id">
						<img :src="item.strategy_titleimg">
						<div>
							<p>{{ item.strategy_title }}</p>
							<p><i class="iconfont icon-redu"></i>{{ item.strategy_hot }}</p>
						</div>
					</router-link>
					<!-- <div v-show="!straData" class="recommendItem" v-for="item in strate" :key="item.strategy_id">
						<img :src="item.strategy_titleimg">
						<div>
							<p>{{ item.strategy_title }}</p>
							<p><i class="iconfont icon-redu"></i>{{ item.strategy_hot }}</p>
						</div>
					</div> -->
					<!-- <div class="recommendItem">
						<img src="../../public/images/qiao.png">
						<div>
							<p>这是一个攻略标题</p>
							<p><i class="iconfont icon-redu"></i>100</p>
						</div>
					</div>
					<div class="recommendItem">
						<img src="../../public/images/qiao.png">
						<div>
							<p>这是一个攻略标题</p>
							<p><i class="iconfont icon-redu"></i>100</p>
						</div>
					</div> -->
				</div>
			</div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
				issue: '',
				strate: '',
				straData: true,
				issueData: true
			}
			
		},
		mounted () {
			this.$http.post('https://wy.lujiahaoo.cn/tour/search.php',{
				"action":"right_issue"
			
			},{}).then(result => {
				// console.log('success')
				if(result.body.code === '1'){
					this.issue = result.body.data
					this.issueData = false
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
			this.$http.post('https://wy.lujiahaoo.cn/tour/search.php',{
				 "action":"right_strategy"
			
			},{}).then(result => {
				// console.log('success')
				if(result.body.code === '1'){
					this.strate = result.body.data
					this.straData = false
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
<style type="text/css">
	.recomcompTitle{
		font-size: 20px;
    	color: #7086c6;
    	margin: 0 auto;
    	padding: 20px 0;
    	text-align: center;
	}
	.recommendItem>img{
		width: 108px;
		height: 77px;
		border-radius: 5px;
		margin-left: 17px;
	}
	.recommendItem>div{
		display: inline-block;
		vertical-align: top;
		margin-left: 9px;
    	width: 123px;
    	white-space: nowrap;
    	overflow: hidden;
    	text-overflow: ellipsis;
		font-size: 13px;
	}
	.recommendItem>div>p{
		margin-top: 14px;
	}
	.icon-liulanliang{
		margin-right: 3px;
	}
	.recommendItem{
		margin-bottom: 7px;
	}
	.icon-redu{
		color: red;
	}
</style>