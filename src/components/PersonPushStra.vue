<template>
	<div class="personPushStra">
		<p>共<span>{{ straLen }}</span>个攻略</p>
		<div class="straItemBox">
			<div class="StraContentItem" v-for="item in straData " :key="item.strategy_id">
				<div class="ItemHead">
					<img :src="item.strategy_headimg">
					<div class="id">{{ item.strategy_nickname }}</div>
					<div class="address">在<span>{{ item.strategy_ip }}</span> 发布的攻略</div>
					<div class="replay"><i class="iconfont icon-clock"></i>最后回复于 {{ item.strategy_lastreply }}</div>
				</div>
				<router-link :to="'/strategydetail?id='+item.strategy_id"  class="ItemBody">
					<div class="detialText">
						<p class="detailTitle">【攻略标题】{{ item.strategy_title }}</p>
						<div>
							<div class="lQuo">
								<i class="iconfont icon-quotation"></i>
							</div>
							<div class="section">{{ item.strategy_html }}</div>
							<div class="rQuo">

								<i class="iconfont icon-quotation"></i>
							</div>
						</div>
						<p class="pageHot">热度 {{ item.strategy_hot }}</p>
					</div>
					<img :src="item.strategy_titleimg" class="pageImg">
				</router-link>
			</div>
		
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name: 'personPushStra',
		props:['nick_name'],
		data () {
			return {
				straData: '',
				straLen: ''
			}
		},
		mounted () {
			// console.log(this.nick_name)
			

		},
		watch: {
			'nick_name': function () {
				
				this.$http.post('https://wy.lujiahaoo.cn/tour/published.php',{
					"action":"strategy_list",
					"user_nickname": this.nick_name
				},{}).then(result => {
					// console.log(result)
					this.straData = result.body.data
					if (result.body.code == '1') {
						
						this.straLen = result.body.data.count
					}else {
						this.straLen = 0
					}
				})
			}
		}
	}
</script>
<style type="text/css">
	.personPushStra>p{
		/*padding-left: 200px;*/
		width: 947px;
		margin: 0 auto;
		margin-bottom: 20px;
	}
	.personPushStra>p>span{
		color: #7086c6;
		margin: 0 5px;
	}
</style>