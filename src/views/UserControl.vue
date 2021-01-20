<template>
	<div class="UserControl">
		<div class="RmsBar">	
			<div class="leftBar" ref="theleftBar">
				<div class="leftIcon">
					<img src="../../public/images/LOGO.png" >
					<i class="iconfont icon-caidan" @click="barout"></i>
				</div>
				<div @click="getUserInfo" :class="{focusLeft:user}" ref="usercontrolDiv">
					<div class="barIconBox" :class="{focusLeftIcon:user}">
						<i class="iconfont icon-yonghu2"></i>
					</div>
					<div>用户管理</div>
				</div>
				<div :class="{focusLeft:admini}" @click="getAminiInfo" ref="adminControlDiv">
					<div class="barIconBox" :class="{focusLeftIcon:admini}">
						<i class="iconfont icon-xitongguanliyuan"></i>
					</div>
					<div>管理员管理</div>
				</div>
				<div :class="{focusLeft:compa}" @click="getCompaInfo" ref="adminCompaDiv">
					<div class="barIconBox" :class="{focusLeftIcon:compa}">
						<i class="iconfont icon-jieban"></i>
					</div>
					<div>结伴管理</div>
				</div>
				<div :class="{focusLeft:stra}" @click="getStraInfo" ref="adminStraDiv">
					<div class="barIconBox" :class="{focusLeftIcon:stra}">
						<i class="iconfont icon-gonglve"></i>
					</div>
					<div>攻略管理</div>
				</div>
				<div :class="{focusLeft:statiscs}" @click="getStatiscsInfo">
					<div class="barIconBox"  :class="{focusLeftIcon:statiscs}">
						<i class="iconfont icon-tongji-"></i>
					</div>
					<div>统计分析</div>
				</div>
			</div>
			<div class="iconBox">
				<i class="iconfont icon-caidan" @click="barleave"></i>
					
				<div class="quitBox" @click="ifquit = !ifquit">
					<i class="iconfont icon-xitongguanliyuan"></i>
					<div class="quit" v-show="ifquit" @click="quit">
						退出登录
						<div></div>
					</div>
				</div>
			</div>
			<div class="userBBox" >
				<!-- 用户 -->
				<div class="userBox" v-show="user">
					
					<div class="userBoxTop">
						<div class="addUser"  @click="adduser">
							 添加用户 
						</div>
						<div class="searchUser">
							<input type="text" name="" placeholder="请输入用户名" v-model="searchUser">
							<i class="iconfont icon-search" @click="searchUserclick"></i>
						</div>
					</div>
					<div class="userList" >
						<div class="userListHead">
							<div class="index">#</div>
							<div class="userName">用户名</div>
							<div class="userPhone">手机号码</div>
							<div class="userPassword">密码</div>
							<div class="editUser"></div>
							<div class="deleteUser"></div>
						</div>
						<div v-for="item in nowList" key="item.index">
							<div class="index" >{{ item.index + 1 }}</div>

							<input type="text" name="" class="userName" v-show="false" v-model="item.user_nickname">
							<div class="userName"  >{{ item.user_nickname }}</div>

							<input type="text" name="" class="userPhone" v-show="false" v-model="item.user_phone">
							<div class="userPhone" >{{ item.user_phone }}</div>

							<input type="text" name="" class="userPassword" v-show="false" v-model="item.user_password">
							<div class="userPassword" >{{ item.user_password }}</div>

							<div class="editUser">
								<i class="iconfont icon-evaluate" @click="changeUserDate($event)" v-show="false"></i>
								<div v-show="false" @click="ifconfirm($event)">确认</div>
							</div>
							<div class="deleteUser">
								<i class="iconfont icon-delete" @click="deteleUser($event)"></i>
								
							</div>
						</div>

					</div>
					<div class="pageChange">
							<div class="left" @click="preData">
								<i class="iconfont icon-fanhui"></i>
							</div>
							<div class="page">
								<span>{{ nowpage }}</span>/
								<span>{{ maxpage }}</span>
							</div>
							<div class="right" @click="nextData">
								<i class="iconfont icon-xiangyoujiantou"></i>
							</div>
					</div>
				</div>
				<!-- 管理员 -->
				<div class="userBox"  v-show="admini">
				
					<div class="userBoxTop">
						<div class="addUser" @click="addAdmin">
							 添加管理员 
						</div>
					</div>
					
					 <div class="userList" ref="editAdmin">
						<div class="userListHead">
							<div class="index">#</div>
							<div class="userName">用户名</div>
							<div class="userPassword">密码</div>
							<div class="editUser"></div>
							<div class="deleteUser"></div>
						</div>
						<div v-for="item in nowList" key="item.index">
							<div class="index">{{ item.index + 1 }}</div>
							<input type="text" name="" class="userName" v-show="false" v-model="item.admin_nickname">
							<div class="userName" >{{ item.admin_nickname }}</div>
					
							<input type="text" name="" class="userPassword" v-show="false" v-model="item.admin_password">
							<div class="userPassword">{{ item.admin_password }}</div>
					
							<div class="editUser" >
								<i class="iconfont icon-evaluate" @click="changeAdmin($event)" v-show="false"></i>
								<div v-show="false" @click="confirmAdmin($event)">确认</div>
							</div>
							<div class="deleteUser">
								<i class="iconfont icon-delete" @click="deleteAdmin($event)"></i>
								
							</div>
						</div>
						
					</div> 
					
					<div class="pageChange">
							<div class="left" @click="preData">
								<i class="iconfont icon-fanhui"></i>
							</div>
							<div class="page">
								<span>{{ nowpage }}</span>/
								<span>{{ maxpage }}</span>
							</div>
							<div class="right" @click="nextData">
								<i class="iconfont icon-xiangyoujiantou"></i>
							</div>
					</div>
				</div>
				<!-- 结伴管理 -->
				<div class="userBox strategy"  v-show="compa">
					<div class="userBoxTop">
						<div class="searchUser">
							<input type="text" name="" placeholder="请输入结伴名" v-model="searchCompas">
							<i class="iconfont icon-search" @click="searchcompa" ></i>
						</div>
					</div>
					
					<div class="userList" >
						<div class="userListHead">
							<div class="index">#</div>
							<div class="userName">标题</div>
							<div class="userPhone">发布时间</div>
							<div class="userPassword">目的地</div>
							<div class="editUser"></div>
							<div class="deleteUser"></div>
						</div>
						<div v-for="item in nowList" key="item.index">
							<div class="index">{{ item.index + 1 }}</div>
							<!-- <input type="text" name="" class="userName" v-show="false"> -->
							<!-- <div class="userName" >{{ item.issue_title }}</div> -->
							<router-link :to="'/companiondetial?id='+item.issue_id" tag="div" class="userName">
								{{ item.issue_title }}
							</router-link>
					
							<!-- <input type="text" name="" class="userPhone" v-show="false"> -->
							<div class="userPhone">{{ item.issue_time }}</div>
					
							<!-- <input type="text" name="" class="userPassword" v-show="false"> -->
							<div class="userPassword">{{ item.issue_endplace}}</div>
					
							<!-- <div class="editUser">
								<i class="iconfont icon-evaluate"></i>
							</div> -->
							<div class="deleteUser">
								<i class="iconfont icon-delete" @click="deletecompa($event)" :compaid="item.issue_id"></i>
								
							</div>
						</div>
					
					</div>
				
					<div class="pageChange">
							<div class="left" @click="preData">
								<i class="iconfont icon-fanhui"></i>
							</div>
							<div class="page">
								<span>{{ nowpage }}</span>/
								<span>{{ maxpage }}</span>
							</div>
							<div class="right" @click="nextData">
								<i class="iconfont icon-xiangyoujiantou"></i>
							</div>
					</div>
				</div>
				<!-- 攻略管理 -->
				<div class="userBox strategy" v-show="stra">
					
					<div class="userList" >
						<div class="userListHead">
							<div class="index">#</div>
							<div class="userName">标题</div>
							<div class="userPhone">发布时间</div>
							<div class="userPassword">发布地</div>
							<div class="editUser"></div>
							<div class="deleteUser"></div>
						</div>
						<div v-for="item in nowList" key="item.index">
							<div class="index">{{ item.index + 1 }}</div>

							<router-link :to="'/strategydetail?id='+item.strategy_id" tag="div" class="userName">
								{{ item.strategy_title }}
							</router-link>
					
							<div class="userPhone">{{ item.strategy_time }}</div>
					
							<div class="userPassword">{{ item.strategy_ip}}</div>
					
							<div class="deleteUser">
								<i class="iconfont icon-delete" @click="deletestra($event)" :straid="item.strategy_id"></i>
								
							</div>
						</div>
					
					</div>
					<div class="pageChange">
							<div class="left" @click="preData">
								<i class="iconfont icon-fanhui"></i>
							</div>
							<div class="page">
								<span>{{ nowpage }}</span>/
								<span>{{ maxpage }}</span>
							</div>
							<div class="right" @click="nextData">
								<i class="iconfont icon-xiangyoujiantou"></i>
							</div>
					</div>
				</div>
				<div class="statiscs"  v-show="statiscs">
					<div class="statiscsTop">
						<div class="statiscsTopLeft">
							<div class="someStatiscs">
								<div class="allUser">
									<p>用户总量</p>
									<div>
										<div>{{ user_count }}</div>
										<div class="percent">{{ percent }}</div>
									</div>
								</div>
								<div class="staLine"></div>
								<div class="allcompa">
									<p>结伴总数</p>
									<div>{{ compa_count }}</div>
								</div>
								<div class="staLine"></div>

								<div class="straall">
									<p>攻略总数</p>
									<div>{{ stra_count }}</div>
								</div>
							</div>
							<div class="map" id="map" ></div>
						</div>
						<div class="statiscsTopRight">
							<div class="fenxi" id="fenxi"></div>
							<div class="sex" id="sex"></div>
						</div>
					</div>
					
				</div>
				
			</div>
		</div>
		<div class="noteInfo" v-show="ifNote">{{ noteInfo }}</div>
	</div>
</template>

<script type="text/javascript">
	import global from '../assets/global.vue'
	import echarts from 'echarts'
    require('echarts/map/js/china')

	export default {
		name: 'UserControl',
		data () {
			return {
				ifquit: false,
				ifBar :true,
				user: true,
				admini: false,
				stra: false,
				compa: false,
				statiscs: false,
				userList: '',
				ifNote: false,
				noteInfo: '',
				nowpage: 1,
				maxpage: 5,
				nowList: '',
				maxindex:'',
				ifnew: false,
				mapData:[],
				gd: 20,
				user_fenxi:[],
				user_sex:[],
				user_count:'',
				percent:'',
				stra_count:'',
				compa_count:'',
				searchUser:'',
				searchCompas:''
			}
		},
		mounted () {
			
			this.$refs.usercontrolDiv.click()

			this.getdataMap() 
			this.getfenxidata()
			this.getsexdata()

			setTimeout(() => {
				//用户分布
				this.getpie('fenxi')
				// 用户性别数据
				this.getsexpie()
				// 用户结伴数地图
				this.getmap()
			},1500)

			// 用户总量等统计
			this.gettype()
			
		},
		methods: {
			barout () {
				// 左侧导航栏出现
				this.$refs.theleftBar.classList.add('barout')
				this.$refs.theleftBar.classList.remove('barleave')
				
			},
			barleave () {
				// 左侧导航栏隐藏
				this.$refs.theleftBar.classList.add('barleave')
				this.$refs.theleftBar.classList.remove('barout')
				
			},
			changeFocus (type) {
				// 切换模块
				switch (type) {
					case 'user':
						this.user = true
						this.admini = this.stra = this.compa = this.statiscs = false
						break
					case 'admini': 
						this.admini = true
						this.user = this.stra = this.compa = this.statiscs = false
						break
					case 'stra': 
						this.stra = true
						this.user = this.admini = this.statiscs = this.compa =false
						break
					case 'compa': 
						this.compa = true
						this.user = this.stra = this.admini = this.statiscs = false
						break
					case 'statiscs': 
						this.statiscs = true
						this.user = this.stra =this.compa = this.admini = false
						break
				}
			},
			getdatalist (data) {
				let list = []
				// maxindex 点击一页时用 maxindex 来开始给 index 赋值
				this.maxindex = data.length-1
				// maxpage 最大的页数
				this.maxpage = Math.ceil(data.length/7)
				// 把所有数据赋值给 list 二维数据 每页的数据为一个数组 datalist
				for (var i = 0;i < this.maxpage;i++){
					let datalist = []
					for (var j = i*7; j < (i+1)*7;j++){
						//如果最大页的数据不是满的则提前退出
						if (data[j] === undefined){
							break 
						}
						let newObj = data[j]
						//给每天数据添加 index 属性
						newObj['index'] = j
						datalist.push(newObj)
					}
					list.push(datalist)
				}
				this.userList = list
				this.nowList = this.userList[0]
			},
			getUserInfo () {
				//用户管理赋值

				this.nowpage = 1
				this.changeFocus('user')
				this.$http.post('https://wy.lujiahaoo.cn/tour/admin.php',{
					"action":"user_list"
				
				},{}).then(result => {
					if(result.body.code === '1'){

						this.getdatalist(result.body.data)
						
					}else{
						this.ifNote = true
						this.noteInfo = result.body.message
						setTimeout(()=>{
							this.ifNote = false
						},1000)
					}
					
				})
				
			},
			getAminiInfo () {
				//管理员管理赋值

				this.nowpage = 1
				this.changeFocus('admini')
				this.$http.post('https://wy.lujiahaoo.cn/tour/admin.php',{
					"action":"admin_list"
				},{}).then(result => {
					if(result.body.code === '1'){

						this.getdatalist(result.body.data)
						
					}else{
						this.ifNote = true
						this.noteInfo = result.body.message
						setTimeout(()=>{
							this.ifNote = false
						},1000)
					}

				})
			},
			getCompaInfo () {
				//结伴管理赋值

				this.changeFocus('compa')
				this.nowpage = 1
				this.$http.post('https://wy.lujiahaoo.cn/tour/admin.php',{
					"action":"issue_list"
				},{}).then(result => {
					if(result.body.code === '1'){

						this.getdatalist(result.body.data)
						
					}else{
						this.ifNote = true
						this.noteInfo = result.body.message
						setTimeout(()=>{
							this.ifNote = false
						},1000)
					}
					
				})
			},
			getStraInfo () {
				//攻略管理赋值

				this.changeFocus('stra')
				this.nowpage = 1
				this.$http.post('https://wy.lujiahaoo.cn/tour/admin.php',{
					"action":"strategy_list"
				},{}).then(result => {
					if(result.body.code === '1'){

						this.getdatalist(result.body.data)
						
					}else{
						this.ifNote = true
						this.noteInfo = result.body.message
						setTimeout(()=>{
							this.ifNote = false
						},1000)
					}
				
				})
			},
			getStatiscsInfo () {
				this.changeFocus('statiscs')
			},
			preData () {
				//点击上一页
				if(this.nowpage != 1){
					this.nowList = this.userList[this.nowpage-2]
					this.nowpage--
				}
			},
			nextData () {
				//点击下一页
				if(this.nowpage != this.maxpage){
					this.nowList = this.userList[this.nowpage]
					this.nowpage++
				}
			},
			adduser () {
				
				// 添加用户
				this.pushNew({
						'user_nickname':'',
						'user_password':'',
						'user_phone':'',
						'index':this.maxindex+1
					})

				this.nowList = this.userList[this.nowpage-1]

				let lastdoms = document.getElementsByClassName('icon-evaluate')

				var lastdom =''

				if((this.maxindex+1)%7 == 0){
					lastdom = lastdoms[6]
				}else{
					lastdom = lastdoms[(this.maxindex+1)%7-1]
				}
				//点击新增加的信息的修改
				lastdom.click()
				this.ifnew = true

			},
			changeUserDate (e) {

				// 修改信息
				let _this = e.currentTarget


				_this.parentNode.parentNode.children[1].style.display = 
				_this.parentNode.parentNode.children[3].style.display = 
				_this.parentNode.parentNode.children[5].style.display = 
				_this.parentNode.children[1].style.display = "inline-block"

				_this.parentNode.parentNode.children[2].style.display = 
				_this.parentNode.parentNode.children[4].style.display = 
				_this.parentNode.parentNode.children[6].style.display = 
				_this.style.display = "none"

			},
			ifconfirm (e) { 
				// 确认修改
				let _this = e.currentTarget
				// _this.parentNode.children[0].style.display = 
				_this.parentNode.parentNode.children[2].style.display = 
				_this.parentNode.parentNode.children[4].style.display = 
				_this.parentNode.parentNode.children[6].style.display = 'inline-block'
				_this.style.display = 
				_this.parentNode.parentNode.children[1].style.display = 
				_this.parentNode.parentNode.children[3].style.display = 
				_this.parentNode.parentNode.children[5].style.display = "none"

				if(this.ifnew === true){
					this.ifnew = false
					this.$http.post('https://wy.lujiahaoo.cn/tour/admin.php',{
						"action":"user_add",
				        "user_nickname": _this.parentNode.parentNode.children[2].innerHTML,
				        "user_password": _this.parentNode.parentNode.children[6].innerHTML,
				        "user_phone": _this.parentNode.parentNode.children[4].innerHTML
					
					},{}).then(result => {
	
							this.ifNote = true
							this.noteInfo = result.body.message
							setTimeout(()=>{
								this.ifNote = false
								this.$refs.usercontrolDiv.click()
							},1000)	
						

					})
				}
		
			},
			deteleUser (e) {
				//删除用户
				this.$http.post('https://wy.lujiahaoo.cn/tour/admin.php',{
					"action":"user_delete",
	   				"user_nickname":e.currentTarget.parentNode.parentNode.children[2].innerHTML
				
				},{}).then(result => {
					this.ifNote = true
						this.noteInfo = result.body.message
						setTimeout(()=>{
							this.ifNote = false
							this.$refs.usercontrolDiv.click()
						},1000)
			
				})
			},
			changeAdmin (e) {
				// 修改管理员信息
				let _this = e.currentTarget

				_this.parentNode.children[1].style.display = 
				_this.parentNode.parentNode.children[1].style.display = 
				_this.parentNode.parentNode.children[3].style.display = 'inline-block'
				_this.style.display = 
				_this.parentNode.parentNode.children[2].style.display = 
				_this.parentNode.parentNode.children[4].style.display = "none"
			},
			deleteAdmin (e) {
				this.postRequest({
					action: "admin_delete",
					"admin_nickname": e.currentTarget.parentNode.parentNode.children[2].innerHTML
				},'admin',(result) => {
						this.ifNote = true
						this.noteInfo = result.body.message
						setTimeout(()=>{
							this.ifNote = false
							this.$refs.adminControlDiv.click()
						},1000)	
				})
			},
			confirmAdmin (e) {
				//确认管理员信息
				let _this = e.currentTarget

				// _this.parentNode.children[0].style.display = 
				_this.parentNode.parentNode.children[2].style.display = 
				_this.parentNode.parentNode.children[4].style.display = 'inline-block'
				_this.style.display = 
				_this.parentNode.parentNode.children[1].style.display = 
				_this.parentNode.parentNode.children[3].style.display = "none"

				if(this.ifnew == true){
					this.ifnew = false

					this.postRequest({
						"action": "admin_add",
						"admin_nickname": _this.parentNode.parentNode.children[2].innerHTML,
						"admin_password": _this.parentNode.parentNode.children[4].innerHTML
					},'admin',(result) => {
						this.ifNote = true
						this.noteInfo = result.body.message
						setTimeout(()=>{
							this.ifNote = false
							this.$refs.adminControlDiv.click()
						},1000)	
					})
				}
			},
			pushNew (newdata) {
				if(this.userList[this.maxpage-1].length<7){
					this.nowpage = this.maxpage
				
					this.maxindex++
					this.userList[this.maxpage-1].push(newdata)

					
				}else if(this.userList[this.maxpage-1].length=7){
					this.maxpage++
					this.nowpage = this.maxpage
					let newarr = []
	
					this.maxindex++
					
					newarr.push(newdata)
					this.userList.push(newarr)
					
					
					
				}
			},
			addAdmin () {
				// 添加用户
				this.pushNew({'admin_nickname':'',
						'admin_password':'',
						'index':this.maxindex+1})
			
				this.nowList = this.userList[this.nowpage-1]

				let parent = document.getElementsByClassName('userBox')[1]

				setTimeout(() => {
					let changIcon = parent.children[1].children[parent.children[1].children.length-1].children[5]
					changIcon.children[0].click()

				},100)
				
				this.ifnew = true
			},
			getdataMap () {
				this.$http.post('https://wy.lujiahaoo.cn/tour/admin.php',{
					 "action":"map"
				},{}).then(result => {
					

					for(var i = 0;i < result.body.data.length;i++){
						let mapdataobj = {
								"name": result.body.data[i].chart_province.substring(0,result.body.data[i].chart_province.length-1),
						        "value":parseInt(result.body.data[i].count), 
							}
							
							this.mapData.push(mapdataobj)

						
					}
						this.mapData = JSON.stringify(this.mapData)
						
						global.mapitem = JSON.parse(this.mapData)
					
				})
			},
			getmap () {
			
				// 初始化echarts实例
  				this.chinachart = echarts.init(document.getElementById('map'))
  				// 进行相关配置
  				this.chartOption = { 
  					title: {
				        text: '结伴分布情况',
				        left: 'left',
				        top: 20,
				        left: 20,
				        textStyle: {
				            color: '#000'
				        }
				    },
  					tooltip: { // 鼠标移到图里面的浮动提示框
						// formatter详细配置： https://echarts.baidu.com/option.html#tooltip.formatter
      					formatter (params, ticket, callback) { 	
 							// params.data 就是series配置项中的data数据遍历
					        let localValue,
					        	perf,
					        	downloadSpeep,
					        	usability,
					        	point
    						if (params.data) {
					          localValue = params.data.value
					          perf = params.data.perf
					          downloadSpeep = params.data.downloadSpeep
					          usability = params.data.usability
					          point = params.data.point
					        } else { // 为了防止没有定义数据的时候报错写的
					          localValue = 0
					          perf = 0
					          downloadSpeep = 0
					          usability = 0
					          point = 0
					        }
						     let htmlStr = `
						          <div style='font-size:18px;'> ${params.name}</div>
						          <p style='text-align:left;margin-top:10px;'>
							         结伴数量：${localValue}<br/>
							         
						          </p>
						        `
							         // 性能perf：${perf}<br/>
						        		
						         	// 	下载速度downloadSpeep：${downloadSpeep}<br/>
							         //  可用性usability：${usability}<br/>
							         //  监测点数point：${point}<br/> 
        					return htmlStr
      					}
			      	// backgroundColor:"#ff7f50",//提示标签背景颜色
			      	// textStyle:{color:"#fff"} //提示标签字体颜色
    				}, 
				    // visualMap的详细配置解析：https://echarts.baidu.com/option.html#visualMap
				    visualMap: { // 左下角的颜色区域
				      type: 'piecewise', // 定义为分段型 visualMap
				      min: 0,
				      max: 1000,
				      itemWidth: 40,
				      bottom: 60,
				      left: 20,
				      pieces: [ // 自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
				        {gt: 500, lte: 1000, label: '500-1000', color: '#FF4500'}, // (900, 1000]
				        {gt: 200, lte: 500, label: '200-500', color: '#FFA200'}, // (500, 900]
				        {gt: 100, lte: 200, label: '100-200', color: '#E5F436'}, // (310, 500]
				        {gt: 20, lte: 100, label: '20-100', color: '#B0DFA5'}, // (200, 300]
				        {gt: 0, lte: 20, label: '0-20', color: '#8ED1EC'}, // (10, 200]
				        {value: 0, label: '无数据', color: '#999'} // [0]
				      ]
				    },
				    // geo配置详解： https://echarts.baidu.com/option.html#geo
				    geo: { // 地理坐标系组件用于地图的绘制
				      map: 'china', // 表示中国地图
				      // roam: true, // 是否开启鼠标缩放和平移漫游
				      zoom: 1.2, // 当前视角的缩放比例（地图的放大比例）
				      label: {
				        show: true
				      },
				      itemStyle: { // 地图区域的多边形 图形样式。
				        borderColor: 'rgba(0, 0, 0, 0.2)',
				        emphasis: { // 高亮状态下的多边形和标签样式
				          shadowBlur: 20,
				          shadowColor: 'rgba(0, 0, 0, 0.5)'
				        }
				      }
				    },
    				series: [
					    {
					        name: '', // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
					        type: 'map',
					        geoIndex: 0,
					        label: {
					          show: true
					        },
					        // 这是需要配置地图上的某个地区的数据，根据后台的返回的数据进行拼接（下面是我定义的假数据）
					        data: global.mapitem
					      
					     }
    				]
  				}
	  			// 使用刚指定的配置项和数据显示地图数据
  				this.chinachart.setOption(this.chartOption)	
				
			},
			getfenxidata () {
				this.$http.post('https://wy.lujiahaoo.cn/tour/admin.php',{
					"action":"pie1"
				},{}).then(result => {
					if(result.body.code == 1){
						for (var i = result.body.data.length - 1; i >= 0; i--) {
							let user_item = {
								value:parseInt(result.body.data[i].count),
								name:result.body.data[i].user_province
							}
							
							this.user_fenxi.push(user_item)

						}
						this.user_fenxi = JSON.stringify(this.user_fenxi)
						global.user_fenxi = JSON.parse(this.user_fenxi)
					}
					
				})
			},
			getpie (id) {
			
				this.charts = echarts.init(document.getElementById(id))
				 this.charts.setOption({
                 	backgroundColor: '#fff',
				    title: {
				        text: '用户分布情况',
				        left: 'left',
				        top: 20,
				        left: 20,
				        textStyle: {
				            color: '#000'
				        }
				    },
				    tooltip: {
				        trigger: 'item',
				        formatter: '{a} <br/>{b} : {c} ({d}%)'
				    },
				    visualMap: {
				        show: false,
				        min: 1,
				        max: 100,
				        inRange: {
				            colorLightness: [1, 0.5]
				        }
				    },
				    series: [
				        {
				            name: '用户分布情况',
				            type: 'pie',
				            radius: '55%',
				            center: ['50%', '50%'],
				            data: global.user_fenxi.sort(function (a, b) { return a.value - b.value; }),
				            roseType: 'radius',
				            label: {
				                // color: 'rgba(255, 255, 255, 0.3)'
				                color: 'rgba(0,0,0,1)'
				            },
				            labelLine: {
				                lineStyle: {
				                    // color: 'rgba(255, 255, 255, 0.3)'
				                    color: 'rgba(0,0,0,1)'
				                },
				                smooth: 0.2,
				                length: 10,
				                length2: 20
				            },
				            itemStyle: {
				                color: '#c23531',
				                // shadowBlur: 200,
				                // shadowColor: 'rgba(0, 0, 0, 0.5)'
				            },

				            animationType: 'scale',
				            animationEasing: 'elasticOut',
				            animationDelay: function (idx) {
				                return Math.random() * 200;
				            }
				        }
				    ]
               })

			},
			getsexdata () {
				this.postRequest({
					"action":"pie2"
				},
				'admin',
				(result) => {

					if(result.body.code == 1){
						for (var i = result.body.data.length - 1; i >= 0; i--) {
							let user_item = {
								value:parseInt(result.body.data[i].COUNT),
								name:result.body.data[i].user_sex
							}
							
							this.user_sex.push(user_item)

						}
						this.user_sex = JSON.stringify(this.user_sex)
						global.sex = JSON.parse(this.user_sex)
					}
				})
			},
			getsexpie () {
				this.charts = echarts.init(document.getElementById('sex'))
				this.charts.setOption( {
				    title: {
				        text: '男女比例',
				        subtext: '',
				        left: 'left',
				        top: '20',
				        left: '20'
				    },
				    tooltip: {
				        trigger: 'item',
				        formatter: '{a} <br/>{b} : {c} ({d}%)'
				    },
				    legend: {
				        // orient: 'vertical',
				        // top: 'middle',
				        bottom: 10,
				        left: 'center',
				        data: ['男生', '女生']
				    },
				    series: [
				        {
				            type: 'pie',
				            radius: '65%',
				            center: ['50%', '50%'],
				            selectedMode: 'single',
				            data:global.sex,
				            emphasis: {
				                itemStyle: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    ]
				})
			},
			gettype () {
				this.postRequest({
					"action":"type_count"
				},
				'admin',
				(result) => {
					if(result.body.code == 1){
						this.user_count = result.body.data.user_count
						this.percent = result.body.data.percent
						this.compa_count = result.body.data.issue_count
						this.stra_count = result.body.data.strategy_count
					}
				})
			}, 
			postRequest (obj,src,fun) {
				this.$http.post('https://wy.lujiahaoo.cn/tour/'+src+'.php',obj,{}).then(fun)
			},
			searchcompa () {
				this.postRequest({
					"action":"issue_search_list",
	            	"key":this.searchCompas
				},
				'admin',
				(result) => {
					if(result.body.code == '1'){
						this.ifNote = true
						this.noteInfo = result.body.message
						setTimeout(()=>{
							this.ifNote = false
						},1000)
						// this.userList = result.body.data
						this.getdatalist(result.body.data)

					}else{
						this.ifNote = true
						this.noteInfo = result.body.message
						setTimeout(()=>{
							this.ifNote = false
						},1000)
					}
				})
				this.searchCompas = ''
				
			},
			searchUserclick () {
				this.postRequest({
					"action":"user_search_list",
	            	"user_nickname":this.searchUser
				},
				'admin',
				(result) => {
					this.ifNote = true
					this.noteInfo = result.body.message
					setTimeout(()=>{
						this.ifNote = false
					},1000)
					if(result.body.code == '1'){
						
						this.getdatalist(result.body.data)

					}

				})
				this.searchUser = ''
			},
			deletecompa (e) {
				//删除结伴
				let compaId = e.currentTarget.getAttribute("compaid")

				this.postRequest(
				{
					"action": "issue_delete",
				   	"issue_id": compaId
				},
				'admin',
				(result) => {
					this.ifNote = true
					this.noteInfo = result.body.message
					setTimeout(()=>{
						this.ifNote = false
						
						this.$refs.adminCompaDiv.click()
					
					},1000)
				})

			},
			deletestra (e) {
				let straid = e.currentTarget.getAttribute('straid')

				this.postRequest({
					"action": "strategy_delete",
					"strategy_id": straid
				},'admin',(result) => {
					this.ifNote = true
					this.noteInfo = result.body.message
					setTimeout(()=>{
						this.ifNote = false
						
						this.$refs.adminStraDiv.click()
					
					},1000)
				})
			},
			quit () {
				//退出登录
				this.postRequest({
					 "action":"logout"
				},'admin',(result) => {
					
					this.ifNote = true
					this.noteInfo = result.body.message
					setTimeout(()=>{
						this.ifNote = false
						this.$router.push('/administratorlogin')
						// this.$refs.adminStraDiv.click()
					
					},1000)
				})

			} 
 
		}
	}

	
</script>


<style type="text/css">
	.UserControl{
			background-color: #ededed;
			min-height: 100vh;
			min-width: 1339px;
	}
	.iconBox>i{
		font-size: 29px;
		color: #7086c6;
		display: inline-block;
		margin-left: 43px;
		margin-top: 20px;
	}
	.iconBox{
		height: 70px;
		background: #fff;
	}
	.barIconBox{
		width: 35px;
		height: 35px;
		border-radius: 5px;
		background-color: #e5e5e5;
		margin-top: 12px;
   		margin-left: 20px;
		text-align: center;
		line-height: 35px;
		margin-right: 10px;
	}
	.quitBox{
		display: inline-block;
		vertical-align: top;
		float: right;
		margin-right: 51px;
		margin-top: 20px;
		position: relative;
		cursor: pointer;
	}
	.leftIcon>img{
		margin-left: 18px;
		margin-top: 15px;
	}
	.leftIcon>i{
		font-size: 29px;
		color: #7086c6;
		margin-left: 62px;
	}
	.quitBox>i{
		font-size: 29px;
	}
	.quit{
		background: #fff;
		position: relative;
		width: 114px;
		height: 27px;
		border-radius: 5px;
		text-align: center;
		line-height: 28px;
		position: absolute;
		top: 69px;
    	left: -77px;
	}
	.quit>div{
		width: 20px;
	    height: 20px;
	    transform: rotate(45deg);
	    background-color: #fff;
		position: absolute;
		top: -8px;
    	right: 6px;

	}
	.leftBar{
		width: 234px;
		display: inline-block;
		vertical-align: top;
		background: #fff;
		position: absolute;
		display: inline-block;
		z-index: 2;
		height:100vh;
	}
	.leftBar>div{
		height: 59px;
		line-height: 59px;
	}
	.leftBar>div:hover{
		background: rgb(186, 193, 214);
		border-radius: 5px;
		cursor: pointer;
		color: #fff;
	}
	.leftBar>div:hover .barIconBox{
		background: rgb(112, 134, 198);
	}
	.leftBar>div>div{
		display: inline-block;
		vertical-align: top;
	}
	.icon-jieban{
		font-size: 19px;
	}
	.icon-yonghu2{
		font-size: 16px;
	}
	.icon-caidan{
		cursor: pointer;
	}
	.RmsBar{
		min-height: 100vh;
		position: relative;
	}

	.leftBar>.leftIcon{
		height: 70px;
	}
	.leftBar>.leftIcon:hover{
		background: #fff;
		cursor: unset;
		/*color: #000;*/
	}
	.barout{
		animation: barout 1s alternate ease-in-out forwards;
	}
	.barleave{
		animation: barleave 1s alternate ease-in-out forwards;

	}
	@keyframes barout{
		from{
			left: 0px;
		}
		to{
			left: -234px;
		}
	}
	@keyframes barleave{
		from{
			left: -234px;
			
		}
		to{
			left: 0px;
		}
	}
	.userBBox{
		display: inline-block;
		vertical-align: top;
		padding-left: 234px;
		position: relative;
	}
	.userBox{
		margin-left: 117px;
		margin-top: 45px;
	}
	.addUser{
		width: 108px;
		height: 36px;
		background: #7086c6;
		color: #fff;
		text-align: center;
		line-height: 36px;
		font-size: 16px;
		border-radius: 5px;
		cursor: pointer;
	}
	.searchUser{
		position: relative;
		margin-left: 308px;
	}
	.searchUser>input{
		width: 340px;
		height: 30px;
		background: #fff;
		padding: 0 30px;
		outline: none;
		border-radius: 15px;
		border: none;
	}
	.searchUser>i{
		position: absolute;
		font-size: 20px;
	    top: 4px;
	    cursor: pointer;
	    right: 12px;
	}
	.userBoxTop>div{
		display: inline-block;
		vertical-align: top;
	}
	.userList>div>div{
		display: inline-block;
		vertical-align: top;
		
		
	}
	.userList>div{
		border-bottom: 1px solid #ccc;
		padding:  0 5px;
		padding-bottom: 10px;
		margin-top: 10px;
	}
	.index{
		width: 80px;
	}
	.userList{
		margin-top: 16px;
	}
	.userName{
		width: 200px;
	}
	.userPhone{
		width: 127px;
	}
	.userPassword{
		width: 361px;
	}
	.editUser{
		width: 70px;
	}
	.icon-delete{
		font-size: 23px;
		cursor: pointer;
		color: #7086c6;
	}
	.editUser>i{
		cursor: pointer;
		color: #7086c6;
	}
	
	.allUser,
	.allcompa,
	.straall{
		width: 228px;
		height: 105px;

	}
	.allUser>p,
	.allcompa>p,
	.straall>p{
		margin-left: 26px;
		margin-top: 15px;
	}
	.allUser>div,
	.allcompa>div,
	.straall>div{
		font-size: 30px;
		margin-top: 16px;
		text-align: center;
	}
	.someStatiscs>div,
	.statiscsTop>div{
		display: inline-block;
		vertical-align: top;

	}
	.staLine{
		height: 70px;
		width: 1px;
		background: #ccc;
		margin-top: 17px;
	}
	.statiscs{
		margin-left: 65px;
    	margin-top: 24px;
	}
	
	.someStatiscs{
		background: #fff;

	}
	.percent{
		width: 54px;
		height: 19px;
		color: #fff;
		line-height: 19px;
		text-align: center;
		background: #18af5b;
		font-size: 14px;
		border-radius: 5px;
		margin-left: 10px;
	}
	.allUser>div>div{
		display: inline-block;
		vertical-align: top;
	}
	.map{
		width: 686px;
		height: 513px;
		margin-top: 15px;
		background: #fff;
	}
	.fenxi,
	.sex,
	.seasons,
	.month{
		width: 316px;
		height: 309px;
		background: #fff;
		
		margin-bottom: 10px;
	}
	.statiscinfo{
		width: 686px;
		height: 628px;
		background: #fff;
	}
	.statiscsTopRight{
		margin-left: 20px;
	}
	.statiscsBottom>div{
		display: inline-block;
		vertical-align: top;
	}
	.statiscsBottompRight{
		margin-left: 20px;
	}
	.statiscsBottom{
		margin-top: 20px;
	}
	.focusLeft{
		background: rgb(186, 193, 214);
		color: #fff;
		border-radius: 5px;
	}
	.focusLeftIcon{
		background: rgb(112, 134, 198);
	}
	.left{
		cursor: pointer;
	}
	.right{
		cursor: pointer;
	}
	.pageChange > .page{
		/*min-width: 40px;*/
		width: auto;
		padding: 0 3px;
	}
	.pageChange{
		width: 172px;
	}
	.editUser>div{
		cursor: pointer;
	}
	.strategy>.userBoxTop>.searchUser{
		margin-left: 426px;
	}
	.strategy .userName{
		cursor: pointer;
	}
</style>