<template>
	<div id="mapData">
		<div id="allmap" ref="allmap">
			
		</div>
		<div class="theBox">
			<div class="router">
				<div class="boxHead">
					<i class="iconfont icon-fanhui"></i>
					<div>路线查询</div>
					<i class="iconfont icon-jiudian"></i>
				</div>
				<div class="routerBody">
					<div class="startArea">出发地</div>
					<input type="text" name="" placeholder="（必填）" v-model="startArea">
					<div class="routeEndArea">目的地</div>
					<input type="text" name="" placeholder="（必填）" v-model="endArea">
					<div class="searchLine" @click="searchLine">查询</div>
				</div>
				
			</div>
			<div class="recomArea" ref="bigrecom">
				<div class="boxHead">
					<i class="iconfont icon-fanhui" @click="small" ref="comarea"></i>
					<div>推荐景点</div>
				
				</div>
				<p ref="note" v-show="false" style="text-align: center;">请先进行路线查询</p>
				<div class="spinner" v-show="!ifsearchSuccess">
	              <div class="dot1"></div>
	              <div class="dot2"></div>
	            </div>
				<div class="recomAreaBody" v-show="ifsearchSuccess ">
					<div class="recomAreaItem"  v-for="item in beauty ">
						<img :src="item.imageUrls">
						<div>
							<p>{{item.title}}</p>
							<p><span>评分：</span>{{item.rating}}分</p>
							<p><span>地址：</span>{{ item.location }}</p>

						</div>
					</div>
				</div>
			</div>
			<div class="recomAreaTwo" ref="smallcom" v-show="false" @click="bigrecomArea">
				推荐</br>
				景点
			</div>
			<div class="recomStra" ref="bigrecomStra">
				<div class="boxHead">
					<i class="iconfont icon-fanhui" @click="smallstra" ref="recomStraIcon"></i>
					<div>推荐攻略</div>
				
				</div>
				<p ref="note" v-show="ifmess" style="text-align: center;">暂无信息</p>

				<div class="recomAreaBody" v-show="!ifmess">
					<router-link :to="'/strategydetail?id='+item.strategy_id"  v-for="item in straList "  class="recomAreaItem">
						<img :src="item.strategy_titleimg">
						<div>
							<p>{{item.strategy_title}}</p>
							<p><span>点赞：</span>{{ item.strategy_hot }}</p>
							<!-- <p><span>发布：</span>{{item.issue_endplace}}</p> -->

						</div>
					</router-link>
					<!-- <div class="recomAreaItem"  v-for="item in straList ">
						<img :src="item.strategy_titleimg">
						<div>
							<p>{{item.strategy_title}}</p>
							<p><span>点赞：</span>{{ item.strategy_hot }}</p>
							<p><span>发布：</span>{{item.issue_endplace}}</p>
					
						</div>
					</div>
					 -->
				</div>
			</div>
			<div class="recomAreaTwo" ref="smallrecom" v-show="false" @click="bigstra">
				推荐</br>
				攻略
			</div>
			<div class="recomCompa" ref="bigcompa">
				<div class="boxHead">
					<i class="iconfont icon-fanhui" @click="smallCompa" ref="recomCompaicon"></i>
					<div>推荐结伴</div>
				
				</div>
				<p ref="note" v-show="ifrecompa" style="text-align: center;">暂无结伴信息</p>
				<div class="recomAreaBody" v-show="!ifrecompa">
					
					<router-link :to="'/companiondetail?id='+item.issue_id" class="recomAreaItem" v-for="item in compaList">
						<img :src="item.issue_titleimg">
						<div>
							<p>{{item.issue_title}}</p>
							<p><span>浏览量：</span>{{item.issue_viewcount}}</p>
							<p><span>目的地：</span>{{item.issue_endplace}}</p>

						</div>
					</router-link>
					<!-- <div class="recomAreaItem" v-for="item in compaList">
						<img :src="item.issue_titleimg">
						<div>
							<p>{{item.issue_title}}</p>
							<p><span>浏览量：</span>{{item.issue_viewcount}}</p>
							<p><span>目的地：</span>{{item.issue_endplace}}</p>

						</div>
					</div> -->
				</div>
			</div>
			<div class="recomAreaTwo" ref="smallcompa" v-show="false" @click="bigrecompa">
				推荐</br>
				结伴
			</div>
		</div>
		
		<router-link to="/" tag="div" class="gobackHome" @click.native="refresh">
			<i class="iconfont icon-shouye"></i>
		</router-link>
		<div class="noteInfo" v-show="ifNote">{{ noteInfo }}</div>
		<!-- <div class="gobackHome"></div> -->
	</div>
</template>

<script type="text/javascript">
	

	
	export default {
		name: 'RouteQuery',
		mounted () {
	
		},
		data() {
			return {
				startArea:'',
				endArea:'',
				ifNote:false,
				noteInfo:'',
				beauty: '',
				ifsearchSuccess:false,
				ifmess:true,
				straList: '',
				ifrecompa:true,
				compaList:''
			}
		},
		methods: {
			refresh () {
				this.$router.go(0)
			},
			map () {
				let map = new window.BMap.Map(this.$refs.allmap) // 创建Map实例
				 map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 11) // 初始化地图,设置中心点坐标和地图级别
				 map.addControl(new window.BMap.MapTypeControl({ // 添加地图类型控件
					mapTypes: [
			          window.BMAP_NORMAL_MAP,
			          window.BMAP_HYBRID_MAP
			        ]
			      }))
			      map.setCurrentCity('韶关') // 设置地图显示的城市 此项是必须设置的
			      map.enableScrollWheelZoom(true)// 开启鼠标滚轮缩放
			      

			},
			searchLine () {
				this.$http.post('https://wy.lujiahaoo.cn/tour/map.php',{
					"action":"map",
            		"address":this.startArea+"&"+this.endArea

				
				},{}).then(result => {
					// console.log('success')
					if(result.body.code === '1'){
						let map = new window.BMap.Map(this.$refs.allmap)
						var driving = new window.BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
						
						let start = result.body.data[0]
						let end = result.body.data[1]

						let startArr = start.split(',')
						let endArr = end.split(',')
						let p1 = new BMap.Point(parseInt(startArr[0]),parseInt(startArr[1]))
						let p2 = new BMap.Point(parseInt(endArr[0]),parseInt(endArr[1]))
						driving.search(p1,p2)
						
						this.ifNote = true
						this.noteInfo = result.body.message
						setTimeout(()=>{
							this.ifNote = false
						},1000)

						this.$refs.smallcom.click()

						this.serchStra ()
						this.searchCompa ()

					}else{
						this.ifNote = true
						this.noteInfo = result.body.message
						setTimeout(()=>{
							this.ifNote = false
						},1000)
					}
					
					console.log(result)
				})
			},
			small () {
				this.$refs.bigrecom.style.display = "none"
				this.$refs.smallcom.style.display = "inline-block"
				this.$refs.smallcom.classList.remove("outbig")
				this.$refs.smallcom.classList.add("insmall")

			},
			smallstra () {
				this.$refs.bigrecomStra.style.display="none"
				this.$refs.smallrecom.style.display="inline-block"
				this.$refs.smallrecom.classList.remove("outbig")
				this.$refs.smallrecom.classList.add("insmall")
			},
			smallCompa () {
				this.$refs.bigcompa.style.display="none"
				this.$refs.smallcompa.style.display="inline-block"
				this.$refs.smallcompa.classList.remove("outbig")
				this.$refs.smallcompa.classList.add("insmall")
			},
			bigrecomArea () {
				this.$refs.smallcom.classList.remove("insmall")
				this.$refs.smallcom.classList.add("outbig")
				setTimeout(()=>{
					this.$refs.smallcom.style.display = "none"
					this.$refs.bigrecom.style.display = "inline-block"
				},900)

				// if (this.noteInfo == '查询成功') {
					this.$http.post('https://wy.lujiahaoo.cn/tour/map.php',{
						"action":"beauty",
    				    "end_place": this.endArea
					
					},{}).then(result => {
						console.log(result)
						if (result.body != '') {
								this.$refs.note.style.display="none"
							this.ifsearchSuccess=false
							setTimeout(() => {
								this.ifsearchSuccess = true
							},2000)
							this.beauty = result.body.data
							console.log(this.beauty)
						}else{
							this.ifsearchSuccess = false
							this.$refs.note.style.display="block"
						}
					})
				
				
				
			},
			bigstra () {

				this.$refs.smallrecom.classList.remove("insmall")
				this.$refs.smallrecom.classList.add("outbig")
				setTimeout(()=>{
					this.$refs.smallrecom.style.display = "none"
					this.$refs.bigrecomStra.style.display = "inline-block"
				},900)
			},
			bigrecompa () {
				this.$refs.smallcompa.classList.remove("insmall")
				this.$refs.smallcompa.classList.add("outbig")
				setTimeout(()=>{
					this.$refs.smallcompa.style.display = "none"
					this.$refs.bigcompa.style.display = "inline-block"
				},900)
			},
			serchStra () {
				this.$http.post('https://wy.lujiahaoo.cn/tour/search.php',{
					
				    "action":"strategy_search_list",
                    "key": this.endArea
				
				},{}).then(result => {
					if (result.body.code == '1') {
						// this.$refs.note.style.innerHTML = result.body.message
						this.ifmess = false
						this.straList = result.body.data
					}
					console.log(result)
				})
			},
			searchCompa () {
				this.$http.post('https://wy.lujiahaoo.cn/tour/search.php',{
					
				    "action":"issue_search_list",
                    "value": this.endArea+"&"+""
				
				},{}).then(result => {
					if (result.body.code == '1') {
						// this.$refs.note.style.innerHTML = result.body.message
						this.ifrecompa = false
						this.compaList = result.body.data
					}
					console.log(result)
				})
			}
		},
		mounted () {
			this.map()
			this.$refs.comarea.click()
			this.$refs.recomCompaicon.click()
			this.$refs.recomStraIcon.click()
		}

	}
</script>

<style type="text/css">
	#allmap {
  		height: 100vh;
  		/*position: relative;
    	z-index: 0;*/
  /*overflow: hidden;*/
	}
	.gobackHome{
		height: 50px;
	    width: 50px;
	    background-color: rgba(112,134,198,0.7);
	    border-radius: 100%;
	    float: right;
	    position: absolute;
	    z-index: 9999;
	    top: 30px;
	    right: 30px;
	    text-align: center;
	    line-height: 50px;
	    color: #fff;
		cursor: pointer;
	}
	.icon-shouye{
		font-size: 25px;
	}
	.router{
		width: 287px;
    	height: 282px;
	}
	.boxHead{
		width: 100%;
		height: 47px;
	    background-color: #7086c6;
	    border-top-left-radius: 5px;
	    border-top-right-radius: 5px;
	    color: #fff;
	    text-align: center;
	    line-height: 47px;
	}
	.theBox{
		position: absolute;
		z-index: 9999;
		top: 2px;
		left: 2px;
	}
	.theBox>div{
		display: inline-block;
		vertical-align: top;
		margin-left: 5px;
		margin-top: 10px;
	}
	.recomArea,
	.recomStra,
	.recomCompa{
		width: 363px;
    	height: 355px;
	}
	.boxHead>div{
		display: inline-block;
		vertical-align: top;
	}
	.routerBody,
	.recomArea,
	.recomStra,
	.recomCompa{
		background: #fff;
	}
	.routerBody>input{
		width: 230px;
	    height: 35px;
	    border: none;
	    background-color: #f2f2f2;
	    margin-left: 21px;
	    padding-left: 18px;
	    border-radius: 5px;
	    outline: none;
	}
	.startArea,
	.routeEndArea{
	    padding: 10px 0;
    	padding-left: 22px;
    	color: #7086c6;
	    font-size: 12px;
	    font-weight: bold;
	}
	.searchLine{
		margin: 0 auto;
		background-color: #7086c6;
	    color: #fff;
	    cursor: pointer;
	    width: 230px;
	    height: 35px;
	    border-radius: 5px;
	    text-align: center;
	    line-height: 35px;
	    margin-bottom: 11px;
    	margin-top: 18px;
	}
	.routerBody{
		padding-bottom: 10px;
		padding-top: 7px;
	}
	.router>.boxHead>div{
		margin: 0 73px;
	}
	.boxHead>i{
		float: left;
    	margin-left: 20px;
	}
	.router>.boxHead>i{
		float: none;
		margin-left: 0;
	}
	.icon-fanhui{
		cursor: pointer;
	}
	.recomAreaItem>div{
		display: inline-block;
		vertical-align: top;
		margin-left: 10px;
		font-size: 14px;
		width: 150px;
	}
	.recomAreaItem>div>p>span{
		margin-right: 3px;
	}
	.recomAreaItem>div>p{
		margin-bottom: 5px;
	}
	.recomAreaItem>img{
		width: 145px;
		height: 97px;
		margin-left: 10px;
	}
	.recomAreaItem{
		margin-bottom: 5px;
	}
	.recomAreaBody{
		padding-top: 10px;
		overflow: auto;
		width: 100%;
		height: 285px;
	}
	/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
	::-webkit-scrollbar
	{
	    width: 10px;
	    height: 12px;
	    background-color: #F5F5F5;
	}
	 
	/*定义滚动条轨道 内阴影+圆角*/
	::-webkit-scrollbar-track
	{
	    /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
	    border-radius: 10px;
	    background-color: #fff;
	}
	 
	/*定义滑块 内阴影+圆角*/
	::-webkit-scrollbar-thumb
	{
	    border-radius: 10px;
	    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	    background-color: rgba(191,191,191,0.2);
	}
	@keyframes insmall {
		from {
			width: 363px;
			height: 355px;
		}
		to {
			width: 70px;
			height: 58px;

		}
	}
	@keyframes outbig {
		from {
			width: 70px;
			height: 58px;
		}
		to {
			
			width: 363px;
			height: 355px;

		}
	}
	.insmall {
		animation: insmall 1s forwards;
	}
	.outbig{
		animation: outbig 1s forwards;
	}
	.recomAreaTwo{
		width: 363px;
		height: 345px;
		background: #7086c6;
		text-align: center;
		color: #fff;
		cursor: pointer;
		padding-top: 10px;
    	border-radius: 10px
	}
	/*加载动画*/
.spinner {
  margin: 100px auto;
  width: 90px;
  height: 90px;
  position: relative;
  text-align: center;
   
  -webkit-animation: rotate 2.0s infinite linear;
  animation: rotate 2.0s infinite linear;
}
 
.dot1, .dot2 {
  width: 60%;
  height: 60%;
  display: inline-block;
  position: absolute;
  top: 0;
  background-color: #7086c6;
  border-radius: 100%;
   
  -webkit-animation: bounce 2.0s infinite ease-in-out;
  animation: bounce 2.0s infinite ease-in-out;
}
 
.dot2 {
  top: auto;
  bottom: 0px;
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
 
@-webkit-keyframes rotate { 100% { -webkit-transform: rotate(360deg) }}
@keyframes rotate { 100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }}
 
@-webkit-keyframes bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}
 
@keyframes bounce {
  0%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>