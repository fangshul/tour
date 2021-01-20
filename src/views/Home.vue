<template>
  <div class="home">
    <Nav :ifscroll="ifscroll" ></Nav>
	<!-- <a href="/other">##</a> -->
    <!-- 标签云 -->
    <div class="wrapper">
	    <div class="tagcloud" ref="tagcloud">

	      <!-- bo大小 co颜色 -->
	      <!-- <a class="b01 co01 cloud" href="backflacker.html"  >广东</a>
	      <a class="b02 co02 cloud" href="backflacker.html" index ="0">湖南</a>
	      <a class="b03 co05 cloud" href="backflacker.html" index ="1">广西</a>
	      <a class="b04 co02 cloud" href="backflacker.html" index ="2">江西</a>
	      <a class="b03 co05 cloud" href="backflacker.html" index ="3">吐鲁番</a>
	      <a class="b02 co06 cloud" href="backflacker.html" index ="4" >重庆</a>
	      <a class="b03 co07 cloud" href="backflacker.html" index ="5" >武汉</a>
	      <a class="b04 co01 cloud" href="backflacker.html" index ="6" >南京</a>
	      <a class="b03 co02 cloud" href="backflacker.html" index ="7" >北京</a>
	      <a class="b04 co03 cloud" href="backflacker.html" index ="8" >福州</a>
	      <a class="b03 co04 cloud" href="backflacker.html" index ="9" >济南</a>
	      <a class="b04 co05 cloud" href="backflacker.html" index ="10" >西安</a>
	      <a class="b04 co06 cloud" href="backflacker.html" index ="11" >南昌 </a>
	      <a class="b02 co07 cloud" href="backflacker.html" index ="12" >长沙</a>
	      <a class="b03 co01 cloud" href="backflacker.html" index ="13" >深圳</a>
	      <a class="b04 co02 cloud" href="backflacker.html" index ="14" >上海</a>
	      <a class="b01 co01 cloud" href="backflacker.html" index ="15" >成都</a>
	      <a class="b03 co06 cloud" href="backflacker.html" index ="16" >石家庄</a>
	      <a class="b03 co05 cloud" href="backflacker.html" index ="17" >保定</a>
	      <a class="b04 co06 cloud" href="backflacker.html" index ="18" >哈尔滨</a> -->
	      <!-- <a class="b02 co02 cloud" :class="[item.count == '1' ? 'b04 co04' : (item.count ==)]" href="backflacker.html" index ="0" v-for="item in  couldDate">item.weight_key</a> -->
	    </div>
	</div>
	<!-- 搜索 -->
	<div class="searchBox">
		<div class="searchSelect" @click="select">
			<span ref="searHot">结伴</span>
			<i class="iconfont icon-ai-arrow-down"></i>
			<div class="selectItem" v-show="ifSelect"  >
				<div @click="compa">结伴</div>
				<div @click="stra">攻略</div>
			</div>
		</div>
		<input type="text" name="" placeholder="请输入关键字" v-model="homesearchText">
		<div class="searchBtn" @click="homeSearch">搜索</div>
	</div>
	<!-- 进入结伴 -->
	<div class="compBox">
		<div class="compLtext lx">旅行</div>
		<div class="compLtext ks">从<span>结伴</span>开始</div>
		<router-link 
				to="/companion" 
				tag="div" 
				class="goComp" 
				:class="{ dis: flag , none: !flag ,change: flag }"
				>前往结伴中心
		</router-link> 
		<router-link
			to="/pushcompanion" 
			tag="div" 
			class="pushComp"
			:class="{ dis: flag , none: !flag ,change: flag }">
			立即发起结伴
		</router-link>
	</div>
	<!-- 进入攻略 -->
	<div class="straBox">
		<div class="stratextlx ">旅行</div>
		<div class="stratextks">从<span>认识</span>开始</div>
		<div class="straBtnBox">
			<router-link 
				:class="{ dis: flagbottom , none: !flagbottom ,change: flagbottom }"
				to="/strategy" 
				tag="div" 
				class="goStra">
				前往攻略中心
			</router-link>
			<router-link 
				:class="{ dis: flagbottom , none: !flagbottom ,change: flagbottom }"
				to="/pushstrategy" 
				tag="div" 
				class="pushStra">
				立即发起攻略
			</router-link>
		</div>
	</div>
	<Foot :ifhome="ifhome"></Foot>
  </div>
</template>

<script>
// @ is an alias to /src
import  '../assets/Bubble.js'
import Nav from '../components/Nav.vue'
import Foot from '../components/Foot.vue'

window.onload = function(){
　　　
	// 标签云
	tagcloud({
        selector: ".tagcloud",  //元素选择器
        fontsize: 16,       //基本字体大小, 单位px
        radius: 140,         //滚动半径, 单位px 页面宽度和高度的五分之一
        mspeed: "slow",   //滚动最大速度, 取值: slow, normal(默认), fast
        ispeed: "slow",   //滚动初速度, 取值: slow, normal(默认), fast
        direction: 135,     //初始滚动方向, 取值角度(顺时针360): 0对应top, 90对应left, 135对应right-bottom(默认)...
        keep: false          //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
    });
}

export default {
  	name: 'Home',
  	components: {
    	Nav,
    	Foot
	},
	data () {
      return {
        ifSelect: false,
        ifscroll: true,
        flag:false,
        ifhome: true,
        flagbottom:false,
   		homesearchText:''
      }
    },
	methods: {
		// 搜索选择结伴/攻略
    	select () {
    		this.ifSelect = !this.ifSelect
    	},
    	// 搜索切换成结伴
    	compa () {
    		this.$refs.searHot.innerHTML = "结伴"
    	},
    	// 搜索切换成攻略
    	stra () {
    		this.$refs.searHot.innerHTML = "攻略"
    	},
    	// 按钮淡出动画
    	inputani () {
    		
    		var top = document.querySelector('.goComp').offsetTop
    		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop ||  window.pageYOffset
    		var bottomBtn = document.querySelector('.goStra').offsetTop
    		
    		if((top - scrollTop)<580){
    			this.flag = true
    		}
    		if((bottomBtn - scrollTop)<580){
    			this.flagbottom = true
    		}
    	},
    	cloud () {
    		this.$http.post('https://wy.lujiahaoo.cn/tour/search.php',{
				"action":'weight',
			},{}).then(result => {
				console.log(result)
				if(result.body.code === '1'){
					let data = result.body.data

					for(var i = 0;i < data.length;i++){
						let couldCount = parseInt(data[i].count)
						let couldSize,couldColor
						if (couldCount <= 2) {
							couldSize = 'b04'
							couldColor = 'co04'
						}else if (couldCount <= 3) {
							couldSize = 'b03'
							couldColor = 'co03'
						}else if (couldCount <= 5) {
							couldSize = 'b02'
							couldColor = 'co02'
						}else{
							couldSize = 'b01'
							couldColor = 'co01'
						}
						let a = document.createElement('a')
						a.innerHTML = data[i].weight_key
						a.classList.add(couldSize)
						a.classList.add(couldColor)
						a.classList.add('cloud')
						a.setAttribute('index',i)
						a.setAttribute('href','/tour/companion?search='+data[i].weight_key)
						// a.setAttribute('tag','a')
						this.$refs.tagcloud.appendChild(a)
					}
					// this.$router.go(0)	
				}
			})
    	},
    	homeSearch () {
    		// console.log('xx')
    		if (this.$refs.searHot.innerHTML == '结伴') {
    			// console.log('jie')
    			this.$router.push('/companion?search='+this.homesearchText)
    		}else{
    			this.$router.push('/strategy?search='+this.homesearchText)

    		}
    		// console.log(this.$refs.searHot.innerHTML)
    	}
	},
	mounted () {
		window.addEventListener('scroll', this.inputani)
		this.cloud()
		// this.$router.go(0)	
	},
	destroyed () {
		window.removeEventListener('scroll', this.inputani)
		
	}
}

</script>

<style>
	@import "../../public/css/Bubble.css"
</style>

<style type="text/css" scoped>
	 .icon-ai-arrow-down{
		margin-left: 15px;
	}
</style>

<style type="text/css">
	.none{
		opacity: 0;
	}
	.dis{
		opacity: 1;
	}
	/*搜索*/
	.searchBox{
		width: 735px;
		margin: 0 auto;
		margin-top: 120px;
		font-size: 16px;
	}
	.searchSelect{
		width: 100px;
		height: 35px;
		border: 1px solid #7f7f7f;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		text-align: center;
		line-height: 35px;
		display: inline-block;
		
		vertical-align: top;
		cursor: pointer;
		position: relative;
	}
	.selectItem{
		position: absolute;
		top: 35px;
		width: 99px;
		border: 1px solid #7f7f7f;
		border-bottom-right-radius: 5px;
		border-bottom-left-radius: 5px;
	}
	.selectItem>div:hover{
		background: #7086c6;
		color: #fff;
	}
	.searchBox>input{
		width: 420px;
		height: 15px;
		padding: 10px 19px;
		outline: none;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		border: 1px solid #7f7f7f;
		display: inline-block;
		vertical-align: top;
		border-left: none;
	}
	
	.searchBtn{
		width: 100px;
		height: 35px;
		background: #7086c6;
		color: #fff;
		text-align: center;
		line-height: 35px;
		display: inline-block;
		vertical-align: top;
		border-radius: 5px;
		margin-left: 20px;
		cursor: pointer;
	}
	/*搜索结束*/
	/*进入结伴*/
	.compBox{
		background-image: url(../../public/images/home_bg1.png);
		width: 100%;
		height: 670px;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.compLtext{
		font-size: 30px;
		font-weight: bold;
	}
	.compLtext>span,
	.stratextks>span{
		color: #7086c6;
	}
	.lx{
		margin-left: 12.73vw;
		padding-top: 245px;
	}
	.ks{
		margin-top: 25px;
		margin-left: 19.98vw;
	}
	.goComp,
	.pushComp,
	.goStra,
	.pushStra{
		width: 160px;
		height: 50px;
		text-align: center;
		line-height: 50px;
		display: inline-block;
		margin-top: 124px;
		cursor: pointer;
		letter-spacing: 1px;
		border-radius: 5px;
	}
	.goComp{
		background: #d6dced;
		color: #7086c6;
		margin-left: 11.85vw;
	}
	.pushComp{
		background: #7086c6;
		color: #fff;
		margin-left: 3.29vw;
	}
	/*进入结伴结束*/
	/*进入攻略*/
	.straBox{
		background-image: url(../../public/images/home_bg2.png);
		width: 100%;
		height: 610px;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.stratextlx,
	.stratextks{
		font-size: 30px;
		font-weight: bold;
	}
	.straBtnBox{
		width: 378px;
		margin-left: 61.85vw;
	}
	.stratextlx{
		margin-left: 60.98vw;
		padding-top: 135px;
	}
	.stratextks{
		margin-left: 68.22vw;
		margin-top: 35px;
	}
	.goStra{
		background: #d6dced;
		color: #7086c6;
	}
	.pushStra{
		background: #7086c6;
		color: #fff;
		margin-left: 35px;
	}
	/*进入攻略结束*/
	.preFoot{
		width: 100%;
		height: 30px;
		background: #f4f4f4;
	}
	/*页脚开始*/
	/* .footerTop{
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
	} */
	/*出现的动画*/
	@keyframes change {
		from{
			transform: scale(0);
		}
		to{
			transform: scale(1);
		}
	}

	.change{
		animation: change 1s;
	}
</style>





