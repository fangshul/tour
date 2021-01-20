<template>
	<div>
		<header id="straHead">
			<Nav></Nav>
			<div class="StraLxText">旅行</div>
			<div class="StraJbText">从<span>认识</span>开始</div>
			<router-link to="/pushstrategy" class="StragoToBtn" tag="div">前往发布攻略</router-link>
			<!-- <div class="StragoToBtn" @click="gotopush">前往发布攻略</div> -->
			<div class="StraSerchBox">
				<input type="text" name="" placeholder="请输入关键字" v-model="searchData">
				<div class="StraSerchBtn" @click="searchStra(searchData)">搜索</div>
			</div>
		</header>
		<div class="StraContent">
			<div class="StraContentItem" v-for="item in datalist" :key="item.strategy_id">
				<div class="ItemHead">
					<router-link 
					tag="img"
					:to="'/other?name='+item.strategy_nickname"
					:src="item.strategy_headimg">
					</router-link>
					<!-- <img :src="item.strategy_headimg"> -->
					<div class="id">{{item.strategy_nickname}}</div>
					<div class="address">在<span>{{item.strategy_ip}}</span> 发布的攻略</div>
					<div class="replay"><i class="iconfont icon-clock"></i>最后回复于 {{item.strategy_lastreply}}</div>
				</div>
				<router-link :to="'/strategydetail?id='+item.strategy_id" tag="div"  class="ItemBody">
					<div class="detialText">
						<p class="detailTitle">【攻略标题】{{item.strategy_title}}</p>
						<div>
							<div class="lQuo">
								<i class="iconfont icon-quotation"></i>
							</div>
							<div class="section">{{item.strategy_html}}</div>
							<div class="rQuo">

								<i class="iconfont icon-quotation"></i>
							</div>
						</div>
						<p class="pageHot">热度{{item.strategy_hot}}</p>
					</div>
					<img :src="item.strategy_titleimg" class="pageImg">
				</router-link>
				
			</div>
			<div id="preloader_1" v-show="nextdata" style="margin-top: 20px;">
			    <span></span>
			    <span></span>
			    <span></span>
			    <span></span>
			    <span></span>
			</div>
			<p v-show="ifmore" style="text-align: center; margin-bottom: 20px;">暂无更多数据</p>
		</div>
		
		<Foot></Foot>
	</div>
</template>

<script type="text/javascript">
	import Nav from '../components/Nav.vue'
	import Foot from '../components/Foot.vue'

	export default {
	  name: 'Strtegy',
	  components: {
	    Nav,
	    Foot
	  },
	  methods: {
	  	getdate (num) {
	  		this.search = false
	  		this.$http.post('https://wy.lujiahaoo.cn/tour/strategy.php',{
				"action":"strategy_list",
        		"num":num
			},{}).then(result => {
				
				if(result.body.code === '1'){
					let nowdata = result.body.data
					this.datalist = this.lastdata.concat(nowdata)
					this.lastdata = this.datalist
					
					
				}else{
					this.ifmore = true
				
				}
				
				console.log(result)
			})
	  	},
	  	getmore () {
	  		//滚动条滚动的距离
	 		let scrollTop = document.body.scrollTop || document.documentElement.scrollTop ||  window.pageYOffset
	 		//窗口大小
	 		let clientHeight = document.documentElement.clientHeight
	 		//可视高度加上溢出高度
   			let scrollHeight = document.documentElement.scrollHeight

   			let len = scrollHeight - scrollTop - clientHeight

   			if (len < 250 && this.lock && !this.search) {
   				this.lock = false
   				this.num++

   				this.getdate(this.num)

   				if (this.ifmore != true) {
   					this.nextdata = true
   					setTimeout(() => {
   						this.lock = true
   						this.nextdata = false
   					},1000)
   				}
   			}
	  	},
	  	//搜索攻略
	  	searchStra (data) {
	  		this.search = true
	  		this.$http.post('https://wy.lujiahaoo.cn/tour/search.php',{
				"action":"strategy_search_list",
        		"key": data
			},{}).then(result => {
				console.log(result)
				this.datalist = result.body.data
			})
	  	}
	  },
	  data () {
	  	return {
	  		num: 0,
	  		datalist:'',
	  		lastdata: [],
	  		ifmore: false,
	  		lock: true,
	  		nextdata: false,
	  		searchData: '',
	  		search: false
	  	}
	  },
	  mounted () {
	  	if (this.$route.query.search != undefined) {
	  		this.searchData = this.$route.query.search
	  		this.searchStra(this.$route.query.search)
	  	} else {
	  		this.getdate(this.num)
	  	}
	  	
	  	window.addEventListener('scroll', this.getmore)
	  },
	  watch: {
	  	'searchData': function () {
	  		if (this.searchData === '') {
	  			this.lastdata = []
		  		this.getdate(0)
		  	}
	  	}
	  }
	}
</script>

<style type="text/css">
	/*头部*/
	#straHead{
		height: 552px;
		background: url(../../public/images/Strtegy_bg.png);
		background-repeat: no-repeat;
	
	}
	.StraLxText,
	.StraJbText{
		font-size: 30px;
		letter-spacing: 15px;
	}
	.StraJbText>span{
		color: #7086c6;
	}
	.StraLxText{
		margin-top: 99px;
		
	}
	.StragoToBtn,
	.StraJbText{
		margin-top: 45px;
	}
	.StraLxText,
	.StraJbText,
	.StragoToBtn{
		margin-left: 252px;
	}
	.StragoToBtn{
		width: 160px;
	    height: 48px;
	    background-color: #7086c6;
	    color: #fff;
	    border-radius: 5px;
	    cursor: pointer;
	    text-align: center;
	    line-height: 48px;
	    letter-spacing: 1px;
		
	}
	.StraSerchBox{
		width: 756px;
		height: 97px;
		border-radius: 5px;
    	background-color: rgba(200,223,234,0.3);
    	margin: 0 auto;
    	margin-top: 54px;
	}
	.StraSerchBtn{
		width: 112px;
		height: 42px;
		background-color: #7086c6;
		border-radius: 5px;
    	color: #fff;
    	text-align: center;
    	line-height: 42px;
    	display: inline-block;
    	margin-left: 21px;
    	cursor: pointer;
	}
	.StraSerchBox>input{
		height: 40px;
	    width: 536px;
	    border-radius: 5px;
	    border: 1px solid #757075;
	    background-color: rgba(255,255,255,0);
	    padding-left: 20px;
	    outline: none;
	    margin-top: 27px;
   		 margin-left: 31px;
	}
	/*头部结束*/
	/*内容开始*/
	.StraContentItem{
		width: 977px;
		margin: 0 auto;
	}
	.ItemHead>img{
		width: 61px;
		height: 61px;
		border-radius: 100%;
		cursor: pointer;
	}
	.ItemHead>div{
		display: inline-block;
		vertical-align: top;
		margin-top: 22px;
		font-size: 14px;
	}
	.id{
		margin-left: 16px;
		
		font-weight: bold;
	}
	.address,
	.replay{
		margin-left: 28px;
		color: #747474;
	}
	.address>span{
		/*text-decoration:underline;*/
		border-bottom:1px solid #747474;
		padding-bottom: 2px;
	}
	.icon-clock{
		color: #ccc;
		font-size: 14px;
		margin-right: 5px;
	}

	.icon-quotation{
		color: #768bc8;
	}
	.ItemBody{
		border-left: 1px solid  #ccc;
		margin-left: 30px;
		cursor: pointer;
		padding-bottom: 26px;
	}
	.ItemHead{
		height: 61px;
	}
	.detialText{
		width: 620px;
		display: inline-block;
	}
	.detailTitle{
		padding-left: 65px;
		font-size: 18px;
		color: #768bc8;
	}
	.detialText>div{
		margin-top: 18px;
		font-size: 15px;

		/*display: inline-block;*/
		/*vertical-align: top;*/
		/*height: */
	}
	.lQuo{
		margin-left: 15px;
	}
	.section{
		margin-left: 37px;
		line-height: 30px;
	}
	.rQuo{
		text-align: right;
	
	
	}
	.rQuo>i{
		transform: scale(-1,1);
		
	    transform: rotate(180deg);
	    display: inline-block;
	}
	.pageImg{
		width: 279px;
		height: 189px;
		margin-left: 40px;
	}
	.pageHot{
		text-align: right;
		margin-top: 42px;
	}
	.StraContentItem:last-child .ItemBody{
		/*background: red;*/
		border:none;
	}
</style>