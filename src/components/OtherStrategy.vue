<template>
	<div class="otherStrategy">
		<router-link :to="'/strategydetail?id='+item.strategy_id" class="otherStrategyItem" v-for="item in dataList ">
			<img :src="item.strategy_headimg">
			<div>
				<p>{{ item.strategy_title }}</p>
				<p><span>发布时间：</span>{{ item.strategy_time }}</p>
				<p>
					<i class="iconfont icon-redu"></i>
					{{ item.strategy_hot }}
				</p>
			</div>
		</router-link>
		<!-- <div class="otherStrategyItem">
			<img src="../../public/images/qiao.png">
			<div>
				<p>这是一个攻略标题</p>
				<p><span>发布时间：</span></p>
				<p>
					<i class="iconfont icon-redu"></i>
					100
				</p>
			</div>
		</div>
		<div class="otherStrategyItem">
			<img src="../../public/images/qiao.png">
			<div>
				<p>这是一个攻略标题</p>
				<p><span>发布时间：</span></p>
				<p>
					<i class="iconfont icon-redu"></i>
					100
				</p>
			</div>
		</div>
		<div class="otherStrategyItem">
			<img src="../../public/images/qiao.png">
			<div>
				<p>这是一个攻略标题</p>
				<p><span>发布时间：</span></p>
				<p>
					<i class="iconfont icon-redu"></i>
					100
				</p>
			</div>
		</div>
		<div class="otherStrategyItem">
			<img src="../../public/images/qiao.png">
			<div>
				<p>这是一个攻略标题</p>
				<p><span>发布时间：</span></p>
				<p>
					<i class="iconfont icon-redu"></i>
					100
				</p>
			</div>
		</div> -->
		
		<div class="otherSelectPage">
			<i class="iconfont icon-fanhui" @click="prePage"></i>
			<span>第{{ nowPage }}/{{ maxlength }}页</span>
			<i class="iconfont icon-xiangyoujiantou" @click="nextPage"></i>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
				dataList: '',
				nowPage: 1,
				maxlength: '',
				nowList: ''
			}
		},
		methods: {
			prePage () {
				if (this.nowPage != 1){
					this.nowPage-- 
					this.nowList = this.dataList.slice(this.nowPage*4-3,this.nowPage*4)
				}
			},
			nextPage () {
				if (this.nowPage != this.maxlength) {
					this.nowPage++
					this.nowList = this.dataList.slice(this.nowPage*4-3,this.nowPage*4)
				}
			}
		},
		mounted () {
			this.$http.post('https://wy.lujiahaoo.cn/tour/published.php',{
				"action":"strategy_list",
            	"user_nickname": this.$route.query.name
			},{}).then(result => {
				console.log(result)
				this.dataList = result.body.data
				console.log( this.dataList)
				// this.nowList = this.dataList.slice(1,4)
				this.maxlength = Math.ceil((result.body.data.count)/4)
			})
		}
	}
</script>
<style type="text/css">
	.otherStrategy{
		padding-top: 38px;
	}
	.otherStrategyItem>img{
		width: 129px;
    	height: 85px; 
    	margin-right: 14px;
	}
	.otherStrategyItem>div{
		display: inline-block;
		vertical-align: top;
	}
	.otherStrategyItem{
		height: 85px;
	    margin-bottom: 22px;
	    margin-left: 66px;
	}
	.otherStrategyItem>div>p{
		margin-bottom: 11px;
	}
</style>