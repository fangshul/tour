<template>
	<div class="perreplay">
		<p>共<span>{{ replayLen }}</span>条回复</p>
		<div class="replayBox">
			<div class="replayItem_1" v-for="item in dataList" :promptid= "item.prompt_id">
				<p v-show="item.type == '1'">
					<span>{{ item.from_who }}</span> 关注了您 <span @click="viewDetail">点击查看</span>
				</p>
				<p v-show="item.type == '2'">
					您发布的攻略目前有1条来自 <span>{{ item.from_who }}</span> 的评论 <router-link :to="'/strategydetail?id='+item.strategy_id"  @click.native="read(item.prompt_id)">点击查看</router-link>
				</p>
				<p v-show="item.type == '3'">
					您发布的攻略目前有1条来自 <span> {{ item.from_who }} </span> <router-link :to="'/strategydetail?id='+item.strategy_id" @click.native="read(item.prompt_id)">点击查看</router-link>
				</p>
				<!-- 您发布的 <span>【凤凰古城三日游】</span>目前有 1 条来自 <span>K先生</span> 的评论。 -->
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
				replayLen: 0,
				dataList: ''
			}
		},
		methods: {
			viewDetail (e) {
				let id = e.currentTarget.parentNode.parentNode.getAttribute
				this.read(id)

				this.$emit('ifchange',true)
			},
			read (id) {
				this.$http.post('https://wy.lujiahaoo.cn/tour/published.php',{
					"action":"prompt_read",
					"prompt_id": id
				},{}).then(result => {
					console.log(result)
				})
			}
		},
		mounted () {
			this.$http.post('https://wy.lujiahaoo.cn/tour/published.php',{
				"action":"prompt_list",
			},{}).then(result => {
				console.log(result)
				
				if (result.body.code == '1') {
					if (result.body.data) {
						this.replayLen = result.body.data.length
						this.dataList = result.body.data
					}
					
				}else {
					this.replayLen = 0
				}
			})
		}
	}
</script>
<style type="text/css">
	.replayBox{
		width: 715px;
		min-height: 449px;
		border:1px solid #ccc;
		padding: 20px;
		margin-bottom: 20px;
	}
	.perreplay{
		width: 756px;
		margin: 0 auto;
	}
	.perreplay>p{
		margin-bottom: 20px;
	}
	.replayItem_1>span,
	.replayItem_2>span{
		color: #7086c6;
		cursor: pointer;
	}
	.replayItem_1,
	.replayItem_2{
		height: 40px;
		line-height: 40px;
		display: inline-block;
		border-bottom:1px solid #000;
	}
</style>