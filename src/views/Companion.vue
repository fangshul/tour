<template>
	<div>
		<header id="compaHead">
			<Nav></Nav>
			<div class="lxText">旅行</div>
			<div class="jbText">从<span>结伴</span>开始</div>
			<router-link to="/pushcompanion" tag="div" class="goToBtn">前往发起结伴</router-link>
			<!-- 搜索/选择不同排列方式 -->
			<div class="selectBox">
				<input type="text" placeholder="目的地" maxlength="30" class="endArea"  v-model="searchData"/>
				<div class="goDateBox"  @click.self="ifCalendar = !ifCalendar">
					{{ dateData }}
					<i class="iconfont icon-rili"></i>
					<Calendar :ifCalendar="ifCalendar" @dateDataFun="getDateData" @changeDis="getchangeDis"></Calendar>
				</div>
				
				<div class="ComSearBtn" @click="searchCompa(searchData,dateData)">搜索</div>
				<div class="sort hot" @click="choseHot">
					<span :class="{sortFocus:ifhot}">热门结伴</span>
				</div>
				<div class="sort new" @click="choseNew">
					<span :class="{sortFocus:ifnew}">最新发表</span>
				</div>
				<div class="sort now" @click="choseNow">
					<span :class="{sortFocus:ifnow}">即刻出发</span>
				</div>
			</div>
		</header>
		<div class="content">
			<!-- 加载动画 -->
			<div id="preloader_1" v-show="load">
			    <span></span>
			    <span></span>
			    <span></span>
			    <span></span>
			    <span></span>
			</div>
			<!-- 结伴盒子 -->
			<div class="itemBox" v-show="!load">
				
				<router-link :to="'/companiondetail?id='+item.issue_id" tag="div" class="contentItem" v-for="item in nowList" :key="item.issue_id">
					<div class="itemHead">
						<div class="countDown">
							<img src="../../public/images/countDown.png">
							<div><span>{{item.issue_traveldate}}</span> 天后</div>
						</div>
						<img :src="item.issue_titleimg" alt="结伴图片">
					</div>
					<div class="itemBottom">
						<p class="end">
							<span>目的地：</span>{{ item.issue_endplace }}
						</p>
						<p class="title">
							<span>标题：</span>{{ item.issue_title }}
						</p>
						<p class="view">{{item.issue_viewcount}}浏览</p>
					</div>
				</router-link>

			</div>
			<div id="preloader_1" v-show="nextdata">
			    <span></span>
			    <span></span>
			    <span></span>
			    <span></span>
			    <span></span>
			</div>
			<div v-show="notmore" style="text-align: center;margin-top: 10px;">暂无更多信息</div>
		</div>
		
		<Foot></Foot>
		<div class="noteInfo" v-show="ifNote">{{ noteInfo }}</div>
	</div>
</template>

<script type="text/javascript">
	import Nav from '../components/Nav.vue'
	import Foot from '../components/Foot.vue'
	import Calendar from '../components/Calendar.vue'

	export default {
	  name: 'Companion',
	  components: {
	    Nav,
	    Foot,
	    Calendar
	  },
	  data () {
	  	return {
	  		my_date : '',
	  		my_year: '',
	  		my_month: '',
	  		my_day: '',
	  		month_olypic: [31,29,31,30,31,30,31,31,30,31,30,31], //闰年每个月份的天数
	  		month_normal: [31,28,31,30,31,30,31,31,30,31,30,31],
	  		month_name: ["January","Febrary","March","April","May","June","July","Auguest","September","October","November","December"],
	  		pre_month: '',
	  		firstDay: '',
	  		totalDay: '',
	  		dateData:'请选择出发时间',
	  		ifCalendar: false,
	  		num: '0',
	  		compList: '',
	  		nowList: '',
	  		ifhot: true,
	  		ifnew: false,
	  		ifnow: false,
	  		searchData:'',
	  		ifNote:false,
	  		noteInfo:'',
	  		load: true,
	  		now: 0,
	  		lock: true,
	  		lastArr:[],
	  		nextdata: false,
	  		notmore: false
	  	}
	  },
	  methods: {
	  	getDateData (data) {
	  		this.dateData = data
	  	},
	  	getchangeDis (data) {
	  		this.ifCalendar = data
	  	},
	  	openDetial () {
	  		window.open('/companiondetial','_black')
	  	},
	  	//热门/最新/即刻 获取数据函数
	  	getData (num,type) {

	  		this.dateData=''

	  		switch(type){
	  			case 'hot':
	  				this.ifhot = true
	  				this.ifnew = this.ifnow = false
	  				break
	  			case 'new':
	  				this.ifnew = true
	  				this.ifnow = this.ifhot = false
	  				break
	  			case 'fast':
	  				this.ifnow = true
	  				this.ifnew = this.ifhot = false
	  		}

	  		this.$http.post('https://wy.lujiahaoo.cn/tour/issue.php',{
				"action":"issue_list",
				"num": num,
				"issue_rank": type
			},{}).then(result => {

				if(result.body.code === '1'){
					this.compList = result.body.data
					this.nowList = this.lastArr.concat(this.compList)
					this.lastArr = this.nowList
					
				}else{
					this.notmore = true
				}
				
				console.log(result)
			})

	  	},
	  	//获取热门消息
	  	getHot (num) {

	  		let theNum = num.toString()
	  		this.getData(theNum,'hot')
	  		
	  	},
	  	//获取最新发表
	  	getNew (num) {
	  		let theNum = num.toString()
	  		this.getData(theNum,'new')
	  	},
	  	//获取即刻出发
	  	getNow (num) {
	  		let theNum = num.toString()
	  		this.getData(theNum,'fast')
	  	},
	  	//点击 热门/最新/即刻 时初始的数据
	  	init () {
	  		this.now = 0
	  		this.lock = true
	  		this.notmore = false
	  		this.lastArr = []
	  		this.load = true
	  		 setTimeout(() => {
	  		 	this.load = false
	  		 },2000)
	  	},
	  	//点击热门结伴
	  	choseHot () {
	  		this.init()
	  		this.getHot(this.now)
	  	},
	  	//点击最新发布
	  	choseNew () {
	  		this.init()
	  		this.getNew(this.now)
	  	},
	  	//点击即刻出发
	  	choseNow () {
			this.init()
	  		this.getNow(this.now)
	  	},
	  	searchCompa (search,date) {
	  		console.log("search")
	  		if (this.dateData == '请选择出发时间') {
	  			this.dateData = ''
	  		}
	  		this.ifhot = this.ifnew = this.ifnow = false
	  		this.$http.post('https://wy.lujiahaoo.cn/tour/search.php',{
				"action":"issue_search_list",
				"value":search+"&"+date
			},{}).then(result => {
				// console.log('success')
				if(result.body.code === '1'){

					this.ifNote = true
					this.noteInfo = result.body.message
					setTimeout(()=>{
						this.ifNote = false
					},1000)
					this.nowList = ''
					this.nowList = result.body.data
					// this.nowList = result.body.data.slice(0,12)
					
				}else{
					this.ifNote = true
					this.noteInfo = result.body.message
					setTimeout(()=>{
						this.ifNote = false
					},1000)
					this.nowList = ''
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

   			if (len < 300 && this.lock && (this.ifhot || this.ifnew || this.ifnow)) {
   			
   				// if (this.lock) {
   					
   					this.lock = false
   					this.now++
   				
   					if (this.ifhot) {
   						this.getHot(this.now)
   					}else if (this.ifnew) {
   						this.getNew(this.now)
   					}else if (this.ifnow) {
   						this.getNow(this.now)
   					}
   					
   					if (this.notmore != true) {
   						this.nextdata = true
	   					setTimeout(() => {
	   						this.lock = true
	   						this.nextdata = false
	   					},2000)
   					}
   					
   					
   				// }
   			}
	 	}
	},
	mounted () {
		setTimeout(() => {
			this.load = false
		},2000)
		// this.homesearch()
		if (this.$route.query.search != undefined) {
	  		this.searchCompa(this.$route.query.search,'')
	  	} else {
	  		this.getHot(0)
	  	}

		
		window.addEventListener('scroll', this.getmore)
	},
	destroyed () {
		window.removeEventListener('scroll', this.getmore)
	}
	  
	 
	}


</script>

<style type="text/css">
	 #compaHead{
		background: url(../../public/images/companion_bg.png);
		height: 540px;
		width: 100%;
		background-size: 100% 100%;
		box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.16);
		min-width: 1140px;
	}
	/*内容*/
	.content{
		min-height: 200px;
		padding-bottom: 60px;
	}
	.itemBox{
		width: 1004px;
		margin:0 auto;
		margin-top: 48px;
		display: flex;
		flex-wrap: wrap;
	}
	.contentItem{
		height: 287px;
		width: 222px;
		box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.16);
		border-radius: 5px;
		margin: 14px;
		
	}
	.itemHead{
		width: 222px;
		height: 187px;
		/*background-image: url(../../public/images/huangguoshan.png);*/
		/*background-size: 100% 100%;*/
    	position: relative;
	}
	.countDown{
		width: 57px;
		height: 50px;
		position: absolute;
		top: 5px;
		right: 10px;
	}
	.countDown>div{
		position: absolute;
		top: 23px;
		left: 9px;
		font-size: 12px;
	}
	.countDown>div>span{
		color: #7086c6;
		font-size: 15px;
	}
	.end,
	.title{
		font-size: 13px;
		padding-left: 14px;
		margin: 10px 0;
	}
	.end>span,
	.title>span{
		color: #7086c6;
	}
	.view{
		font-size: 12px;
		text-align: right;
		padding-right: 14px;
		margin-top: 16px;
	}
	.itemBottom{
		height: 101px;
		width: 100%;
	}
	.pageChange{
		margin: 0 auto;
		margin-bottom: 63px;
		margin-top: 40px;
		width: 165px;
	}
	.pageChange>div
	{
		width: 40px;
		height: 40px;
		border-radius: 5px;
		background-color: #e5e5e5;
		text-align: center;
		line-height: 40px;
		display: inline-block;
		margin-left: 13px;
	}
	/*内容结束*/
	/*头部*/
	.lxText,
	.jbText,
	.goToBtn{
		margin-left: 198px;
	}
	.lxText,
	.jbText{
		font-size: 30px;
		letter-spacing: 15px;
	}
	.jbText>span{
		color: #7086c6;
	}
	.lxText{
		margin-top: 99px;
	}
	.jbText{
		margin-top: 45px;
	}
	.goToBtn{
		width: 160px;
	    height: 48px;
	    background-color: #7086c6;
	    color: #fff;
	    border-radius: 5px;
	    cursor: pointer;
	    text-align: center;
	    line-height: 48px;
	    letter-spacing: 1px;
		margin-top: 45px;
	}
	.selectBox{
		width: 1140px;
		height: 102px;
		background-color: rgba(255,255,255,0.902);
		margin: 0 auto;
		margin-top: 35px;
	}
	.endArea{
		width: 216px;
		height: 52px;
		outline: none;
		border: 1px solid #000;
		font-size: 14px;
		padding-left: 34px;
		margin-top: 25px;

	}
	.goDateBox{
		width: 216px;
		height: 52px;
		border: 1px solid #000;
		font-size: 14px;
		padding-left: 34px;
		margin-top: 25px;
		line-height: 52px;
	}
	.endArea{
		margin-left: 90px;
	}
	.goDateBox,
	.ComSearBtn{
		margin-left: 15px;
	}
	.goDateBox{
		position: relative;
	}
	.icon-rili{
		position: absolute;
		right: 17px;
		color: #4b4c4c;
		font-size: 25px;
	}
	.ComSearBtn{
		width: 110px;
		height: 46px;
		text-align: center;
		line-height: 46px;
		border-radius: 5px;
    	background-color: rgb(112, 134, 198); 
    	margin-top: 30px;
    	color: #fff;
    	font-size: 18px;
    	letter-spacing: 4px;
    	margin-right: 15px;
	}
	.selectBox >div {
		display: inline-block;
		vertical-align: top;
		/*cursor: pointer;*/
	}
	.sort{
		font-size: 18px;
		margin: 0 10px;
		margin-top: 39px;
		cursor: pointer;
	}
	.sort>span{
		/*border-bottom: 3px solid #7086c6;*/
		padding: 0 4px ;
		padding-bottom: 4px;
	}
	input::-webkit-input-placeholder { /* WebKit browsers */  
	  color: #000;  
	}  
	input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */  
	  color: #000;  
	}  
	input::-moz-placeholder { /* Mozilla Firefox 19+ */  
	  color: #000;  
	}  
	input:-ms-input-placeholder { /* Internet Explorer 10+ */  
	  color: #000;  
	} 
	.goDateBox,
	.ComSearBtn{
		cursor: pointer;
	}
	.itemHead>img{
		width: 100%;
		height: 100%;
	}
	.sortFocus{
		border-bottom: 3px solid #7086c6;
	}
	/*加载动画*/
	#preloader_1{
   		position:relative;
   		width: 100px;
   		margin: 0 auto;
   		margin-top: 48px;
	}
	#preloader_1 span{
	    display:block;
	    bottom:0px;
	    width: 9px;
	    height: 5px;
	    background:#9b59b6;
	    position:absolute;
	    animation: preloader_1 1.5s  infinite ease-in-out;
	}  
	#preloader_1 span:nth-child(2){
	    left:11px;
	    animation-delay: .2s;  
	}
	#preloader_1 span:nth-child(3){
	    left:22px;
	    animation-delay: .4s;
	}
	#preloader_1 span:nth-child(4){
	    left:33px;
	    animation-delay: .6s;
	}
	#preloader_1 span:nth-child(5){
	    left:44px;
	    animation-delay: .8s;
	}
	@keyframes preloader_1 {
	    0% {height:5px;transform:translateY(0px);background:#9b59b6;}
	    25% {height:30px;transform:translateY(15px);background:#3498db;}
	    50% {height:5px;transform:translateY(0px);background:#9b59b6;}
	    100% {height:5px;transform:translateY(0px);background:#9b59b6;}
	}
</style>