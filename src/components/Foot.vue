<template>
	<div>
		<div class="preFoot"></div>
		<div class="footer">
			<div class="footerTop">
				<div 
					class="about"
					:class="{ dis: flagfoot , none: !flagfoot ,change: flagfoot }">
					<div class="tie">关于我们</div>
					<div>网站简介</div>
					<div>加入我们</div>
					<div>联系我们</div>
					<div>公司地图</div>
				</div>
				<div 
					class="fresh"
					:class="{ dis: flagfoot , none: !flagfoot ,change: flagfoot }">
					<div class="tie">新手上路</div>
					<div>隐私政策</div>
					<div>商标声明</div>
					<div>帮助中心</div>
				</div>
				<div 
					class="serve"
					:class="{ dis: flagfoot , none: !flagfoot ,change: flagfoot }">
					<div class="tie">旅行服务</div>
					<div>结伴中心</div>
					<div>旅游攻略</div>
				</div>
				<div 
					class="hotLine"
					:class="{ dis: flagfoot , none: !flagfoot ,change: flagfoot }">
					<div class="tie">客服热线</div>
					<div>
						<span>电话</span>
						1234-1234567
					</div>
					<div>
						<span>手机</span>
						+86 12345678910
					</div>
				</div>
			</div>
			<div class="footerShare">
				<i class="iconfont icon-qq"></i>
				<i class="iconfont icon-weibo-copy"></i>
				<i class="iconfont icon-weixin-copy"></i>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		props:['ifhome'],
		name: 'Foot',
		data () {
			return {
				 flagfoot:false,
				 home: true
			}
		},
		methods: {
			inputani () {
    			
	    		if(this.ifhome){
	    			var scrollTop = document.body.scrollTop || document.documentElement.scrollTop ||  window.pageYOffset
		    		var footText = document.querySelector('.about').offsetTop
		    		
		    		if((footText - scrollTop)<580){
		    			this.flagfoot = true
		    		}
	    		}
	    		

    		}
		},
		mounted () {
			window.addEventListener('scroll', this.inputani)
			if (this.ifhome === undefined) {
				this.flagfoot = true
			}

		},
		destroyed () {
			window.removeEventListener('scroll', this.inputani)
			
		}
	}
</script>

<style type="text/css">
	.preFoot{
		width: 100%;
		height: 30px;
		background: #f4f4f4;
	}
	/*页脚开始*/
	.footerTop{
		width: 942px;
		margin: 0 auto;
		border-bottom: 1px solid #ccc;
		padding-bottom: 20px;
	}
	.footerTop>div{
		display: inline-block;
		vertical-align: top;
	}
	
	.about>div,
	.fresh>div,
	.serve>div,
	.hotLine>div{
		margin-bottom: 10px;
	}
	.about>.tie,
	.fresh>.tie,
	.serve>.tie,
	.hotLine>.tie{
		font-weight: bold;
		margin-top: 33px;
		margin-bottom: 25px;
	}
	.about{
		margin-left: 70px;
	}
	.fresh,
	.serve{
		margin-left: 150px;
	}
	.hotLine{
		margin-left: 155px;
	}
	.hotLine>div>span{
		border: 1px solid #000;
		display: inline-block;
		padding: 2px 5px;
		border-radius: 10px;
		margin-right: 3px;
	}
	.footerShare{
		text-align: center;
		padding: 20px 0;
	}
	.icon-qq
	{
		font-size: 30px;
		color: #7f7f7f;
		margin: 10px;
		cursor: pointer;
	}
	.icon-weibo-copy,
	.icon-weixin-copy{
		font-size: 32px;
		color: #7f7f7f;
		margin: 10px;
		cursor: pointer;
	}
</style>