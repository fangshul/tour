<template>
	<div class="PersonPushCompa">
		<p>共<span>{{ compaLen }}</span>个结伴</p>
		<div class="compaItemBox">
			<router-link 
				:to="'/companiondetail?id='+item.issue_id" 
				class="contentItem" 
				v-for="item in compaData">
				<div class="itemHead">
					
					<img :src="item.issue_titleimg" alt="结伴图片">
				</div>
				<div class="itemBottom">
					<p class="end">
						<span>出发时间：{{ item.issue_traveldate }}</span>
					</p>
					<p class="title">
						<span>标题：{{ item.issue_title }}</span>
					</p>
					<p class="view">浏览</p>
				</div>
			</router-link>
		
		</div>
		
	</div>
</template>
<script type="text/javascript">
	
	export default{
		name:'PersonPushCompa',
		props:['nick_name'],
		data () {
			return {
				compaData: '',
				compaLen:''
			}
		},
		mounted () {
			// console.log(this.nick_name)
			// this.$http.post('https://wy.lujiahaoo.cn/tour/published.php',{
			// 	"action":"issue_list",
			// 	"user_nickname": this.nick_name
			// },{}).then(result => {
			// 	console.log(result)
			// 	this.compaData = result.body.data
			// 	if (result.body.code == '2') {
			// 		this.compaLen = 0
			// 	}else if (result.body.code == '1') {
			// 		this.compaLen = result.body.data.length
			// 	}
			// })
		},
		watch: {
			'nick_name' :function () {
				this.$http.post('https://wy.lujiahaoo.cn/tour/published.php',{
					"action":"issue_list",
					"user_nickname": this.nick_name
				},{}).then(result => {
					// console.log(result)
					this.compaData = result.body.data
					if (result.body.code == '2') {
						this.compaLen = 0
					}else if (result.body.code == '1') {
						this.compaLen = result.body.data.length
					}
				})
			}
		} 

	}
</script>
<style type="text/css">
	.PersonPushCompa{
		width: 1000px;
		margin: 0 auto;
	}
	.compaItemBox{
		width: 1000px;
		display: flex;
		flex-wrap: wrap;
	}
	.PersonPushCompa>p{
		padding-left: 20px;
		margin-bottom: 10px;
	}
	.PersonPushCompa>p>span{
		color: #7086c6;
		margin: 0 5px;
	}
</style>