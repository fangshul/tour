<template>
	<div class="iconBox">
			<i class="iconfont icon-caidan"></i>
				<!--  @click="barleave" -->
			<div class="quitBox" @click="ifquit = !ifquit">
				<i class="iconfont icon-xitongguanliyuan"></i>
				<div class="quit" v-show="ifquit">
					退出登录
					<div></div>
				</div>
			</div>
		</div>
</template>
<script type="text/javascript">
	export default {
		name: 'RmsTopBar',
		data () {
			return {
				ifquit: false,
				// ifBar :true
			}
		},
		methods: {
			barout () {
				// this.$refs.theleftBar.classList.add('barout')
				// this.$refs.theleftBar.classList.remove('barleave')
				
			},
			barleave () {
				// this.$refs.theleftBar.classList.add('barleave')
				// this.$refs.theleftBar.classList.remove('barout')
				
			}
 
		}
	}
</script>