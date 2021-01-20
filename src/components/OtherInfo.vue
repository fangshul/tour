<template>
	<div class="otherInfo">
		<p><span>用户名：</span>{{ dataList.user_nickname }}</p>
		<p><span>性别：</span>{{ sex }}</p>
		<p><span>所在省份：</span>{{ dataList.user_province }}</p>
		<p><span>个人简介：</span>{{ dataList.user_introduce }}</p>
	</div>
</template>
<script type="text/javascript">
	export default{
		mounted () {

			this.$http.post('https://wy.lujiahaoo.cn/tour/user.php',{
				"action":"other_info",
            	"user_nickname": this.$route.query.name
			},{}).then(result => {
				console.log(result)
				this.dataList = result.body.data
				if (this.dataList.user_sex == '1') {
					this.sex = '男'
				}else {
					this.sex = '女'
				}
				// this.$emit('nickName',dataList.user_nickname)
				this.$emit('img',this.dataList.user_headimg)
				if (this.dataList.yet == '1') {
					this.$emit('focus',true)
				}else {
					this.$emit('focus',false)
				}
				
			})
		},
		data () {
			return{
				dataList: '',
				sex: ''
			}
		}
	}
</script>
<style type="text/css">
	.otherInfo{
		width: 834px;
		margin: 0 auto;
		padding-top: 38px;
	}
	.otherInfo>p>span{
		margin-right: 10px;
	}
	.otherInfo>p{
		margin-bottom: 38px;
	}
</style>