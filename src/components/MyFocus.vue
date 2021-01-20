<template>
	<div class="myfocus">
		<p>共<span>{{ focusLen }}</span>位关注</p>
		<div class="foucsItem" v-for="item in nowList">
			<img :src="item.focused_headimg">
			<div>{{ item.focused_nickname }}</div>
			<div class="OtherfocusBtn">取消关注</div>
		</div>
		<!-- <div class="foucsItem">
			<img src="../../public/images/user_img.jpg">
			<div>k显示k显示k显示</div>
			<div class="OtherfocusBtn">关注</div>
		</div>
		<div class="foucsItem">
			<img src="../../public/images/user_img.jpg">
			<div>k显示k显示k显示</div>
			<div class="OtherfocusBtn">关注</div>
		</div>
		<div class="foucsItem">
			<img src="../../public/images/user_img.jpg">
			<div>k显示k显示k显示</div>
			<div class="OtherfocusBtn">关注</div>
		</div>
		<div class="foucsItem">
			<img src="../../public/images/user_img.jpg">
			<div>k显示k显示k显示</div>
			<div class="OtherfocusBtn">关注</div>
		</div>
		<div class="foucsItem">
			<img src="../../public/images/user_img.jpg">
			<div>k显示k显示k显示</div>
			<div class="OtherfocusBtn">关注</div>
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
		props:['nick_name'],
		data () {
			return {
				focusList: '',
				nowList: '',
				maxlength: 1,
				nowPage: 1,
				focusLen: ''
			}
		},
		methods: {
			prePage () {
				if (this.nowPage != 1){
					this.nowPage-- 
					this.nowList = this.focusList.slice(this.nowPage*6-5,this.nowPage*6)
				}
			},
			nextPage () {
				if (this.nowPage != this.maxlength) {
					this.nowPage++
					this.nowList = this.focusList.slice(this.nowPage*6-5,this.nowPage*6)
				}
			}
		},
		watch: {
			'nick_name': function () {
				// console.log(this.nick_name)
				this.$http.post('https://wy.lujiahaoo.cn/tour/focus.php',{
					"action":"focus_focus_list",
					"user_nickname": this.nick_name
				},{}).then(result => {
					if (result.body.code == '1') {
						this.focusLen = result.body.data.length
						this.focusList = result.body.data

						this.nowList = this.focusList.slice(1,6)
						this.maxlength = Math.ceil((result.body.data.length)/6)
					}else {
						this.focusLen = 0
					}
					console.log(result)

				})
			}
		}
	}
</script>
<style type="text/css" scoped>
	.myfocus{
		width: 965px;
		margin: 0 auto;
	}
	.myfocus>p>span{
		color: #7086c6;
		margin: 0 5px;
	}
	.myfocus>p{
		margin-bottom: 20px;
	}
	.OtherfocusBtn{
		width: 100px;
	}
</style>