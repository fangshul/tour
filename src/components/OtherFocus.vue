<template>
	<div class="otherFocus">
		<p>共8位关注</p>
		<div class="foucsItem" v-for="item in nowList ">
			<img :src="item.focused_headimg">
			<div>{{ item.focused_nickname }}</div>
			<div class="OtherfocusBtn" v-show="item.yet == 1">已关注</div>
			<div class="OtherfocusBtn" v-show="item.yet != 1">关注</div>
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
		data () {
			return {
				dataList: '',
				nowPage: 1,
				maxlength: '',
				nowList: '',
				focus: '',
				focusLent: 0
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
			this.$http.post('https://wy.lujiahaoo.cn/tour/focus.php',{
				"action":"focus_focus_list",
            	"user_nickname": this.$route.query.name
			},{}).then(result => {
				console.log(result)
				if (result.body.data == '1') {
					this.focusLent = result.body.data.length
				}
				this.dataList = result.body.data

				this.nowList = this.dataList.slice(1,6)
				this.maxlength = Math.ceil((result.body.data.length)/6)

			})
		}
	}
</script>
<style type="text/css">
	.otherFocus{
		width: 834px;
		margin: 0 auto;
		padding-top: 38px;
	}
	.foucsItem>img{
		width: 43px;
	    height: 43px;
	    border-radius: 100%;
	    margin-top: 17px;
	    margin-left: 29px;
	    margin-right: 20px;
	}
	.otherFocus>p{
		margin-bottom: 20px;
	}
	.foucsItem{
		height: 78px;
		border: 1px solid #ccc;
		border-top: none;
		line-height: 78px;
	}
	.foucsItem:nth-of-type(1){
		border-top: 1px solid #ccc;
	}
	.foucsItem>div{
		display: inline-block;
		vertical-align: top;
	}
	.OtherfocusBtn{
		width: 72px;
	    height: 25px;
	    background-color: #7086c6;
	    border-radius: 1px;
	    line-height: 25px;
	    color: #fff;
	    text-align: center;
	    margin-top: 26px;
	    /*margin-left: 598px;*/
	    float: right;
	    margin-right: 29px;
	    cursor: pointer;
	}
</style>
<style type="text/css" scoped="">
	.otherSelectPage{
		margin-top: 28px;
	}
</style>