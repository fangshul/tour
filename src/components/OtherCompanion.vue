<template>
	<div class="otherCompanion">
		<router-link :to="'/compamiondetail?id='+item.issue_id" v-for="item in nowList" class="otherCompanionItem" tag="div">
			<img :src="item.issue_titleimg">
			<div class="otherCompanionInfo">
				<p>
					<span>【结伴标题】</span> {{ item.issue_title }}
				</p>
				<!-- <p>
					<span>【目的地】</span> {{ item. }}
				</p> -->
				<p>
					<span>【结伴时间】</span> {{ item.issue_traveldate }}
				</p>
			</div>
		</router-link>
		
		<div class="otherSelectPage">
			<i class="iconfont icon-fanhui" @click="prePage"></i>
			<span>第{{ nowPage }}/{{ maxlength }}页</span>
			<i class="iconfont icon-xiangyoujiantou" @click="nextPage"></i>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
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
					this.nowList = this.dataList.slice(this.nowPage*6-5,this.nowPage*6)
				}
			},
			nextPage () {
				if (this.nowPage != this.maxlength) {
					this.nowPage++
					this.nowList = this.dataList.slice(this.nowPage*6-5,this.nowPage*6)
				}
			}
		},
		mounted () {
			this.$http.post('https://wy.lujiahaoo.cn/tour/published.php',{
				"action":"issue_list",
            	"user_nickname": this.$route.query.name
			},{}).then(result => {
				console.log(result)
				this.dataList = result.body.data
				this.nowList = this.dataList.slice(1,6)
				this.maxlength = Math.ceil((result.body.data.length)/6)
			})
		}
	}
</script>
<style type="text/css">
	.otherCompanion{
		/*width: 834px;
		margin: 0 auto;*/
		padding-top: 5px;
	}
	.otherCompanionInfo{
		display: inline-block;
		vertical-align: top;
		width: 195px;
	}
	.otherCompanionItem{
		width: 407px;
    	height: 131px;
    	margin-top: 33px;
    	margin-left: 58px;
    	display: inline-block;
    	vertical-align: top;
	}
	.otherCompanionItem>img{
		width: 196px;
		height: 131px;
		margin-right: 10px;
	}
	.otherCompanionInfo>p>span{
		margin-right: 8px;
	}
	.otherCompanionInfo>p{
		font-size: 14px;
    	margin-bottom: 17px;
    	text-overflow: ellipsis;
    	overflow: hidden;
    	white-space: nowrap;


	}
	.otherSelectPage{
		margin-top: 66px;
		text-align: center;
	}
	.otherSelectPage>i{
		cursor: pointer;
	}
	.otherSelectPage>span{
		margin: 0 10px;
	}
</style>