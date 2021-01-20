<template>
	<div class="PushCompanion">
		<header class="PushCompHead">
			<Nav></Nav>
			<div class="choiceTitleImg">
				<i class="iconfont icon-tianjiatupian" @click="pushTitleimg"></i>
				<div>设置标题图片</div>
				<input type="file" name="" accept="image/png,image/jpg,image/jpeg" ref="TitleImg" v-show="false" @change="pushIssueImg">
			</div>
			<input type="text" name="" class="TitleInput" maxlength="80" v-model="issue_title">
		</header>
		<div class="PushCompContent">
			<div class="compDataL">
				
				<div class="startAdd">
					<div class="startAddText">出发地</div>
					<div class="province" @click.self="ifstartpro = !ifstartpro">{{ startpro }}
						<div class="provinceList" v-show="ifstartpro">
								<li 
									v-for="(item,index) in provinces" 
									:key="index" 
									@click="getpro($event,'startpro',index)">
									{{ item }}
								</li>
					
						</div>
					</div>
					<div class="city" @click.self="ifstartcity = !ifstartcity">{{ startcity }}

						<div class="cityList" v-show="ifstartcity">
							<li
								v-for="(item,index) in city[startproindex]"
								:key="index"
								@click = "getcity($event,'startcity')">
								{{ item }}
							</li>
						</div>
					</div>
					
					<input type="text" name="" class="addressDetial" placeholder="输入具体地址" v-model="startArea">
				</div>
				<div class="endAdd">
					<div class="endAddText">目的地</div>
					<div class="province"  @click.self="ifendpro = !ifendpro">{{ endpro }} 
						
						<div class="provinceList" v-show="ifendpro">
								<li 
									v-for="(item,index) in provinces" 
									:key="index" 
									@click="getpro($event,'endpro',index)">
									{{ item }}
								</li>
					
						</div>
					</div>
					<div class="city" @click.self="ifendcity = !ifendcity">{{ endcity }}
					
						<div class="cityList" v-show="ifendcity">
							<li
								v-for="(item,index) in city[endproindex]"
								:key="index"
								@click = "getcity($event,'endcity')">
								{{ item }}
							</li>
						</div>	
					</div>
					
					<input type="text" name="" class="attractions" placeholder="输入具体景点名" v-model="endArea">
				</div>
				<div class="comDate">
					<div class="comDateText">结伴时间</div>
					<div class="choiceDate" @click.self="ifCalendar = !ifCalendar">
					{{ startDate }}
					<Calendar :ifCalendar="ifCalendar" @dateDataFun="getDateData" @changeDis="getchangeDis"></Calendar>
					</div>
				</div>
			
			</div>
			<div class="compDataR">
				<img src="../../public/images/qrcode.jpg" class="userDode">
				<div class="pushCodeBox">
					<div class="pushCodeImg" @click="pushcode">上传</div>
					<div class="cancelCodeImg">取消上传</div>
				</div>
				<input type="file" name="" ref="code" @change="pushcodeImg" v-show="false">
			</div>
			<div class="path">
				<div class="pathTitle">结伴路线</div>
				<div class="pathItemBox" ref="pathItemBox">
				
					<div class="pathItem" v-for="(count,index) in pathItemLen" :key="count">
						<div class="pathItemLine"></div>
						<div class="pathItemInput" contenteditable @blur="newPathItem($event,index)" @keydown.prevent.enter="inputBlur($event)" ref="lineItem"></div>
					</div>

					
				</div>
				
			</div>
			<div class="companionInfo">
				<div class="companionInfoText">
					结伴详情
				</div>
				<textarea class="InfoContent" v-model="compaDetial"></textarea>
			</div>
			<div class="PushCompanionBtn" @click="push">发布结伴</div>
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
		name: 'PushCompanion',
		components: {
			Nav,
	   	 	Foot,
	   	 	Calendar
		},
		data () {
			return {
				pathItemLen : 1,
				ifCalendar: false,
				startDate: '选择出发时间',
				startpro: '选择省',
				startproindex: '',
				endproindex: '',
				ifstartpro: false,
				ifendpro: false,
				endpro: '选择省',
				ifstartcity: false,
				ifendcity:false,
				startcity: '选择市',
				endcity: '选择市',
				issue_title: '',
				noteInfo: '',
				ifNote: false,
				code: '',
				img: '',
				startArea:'',
				endArea: '',
				compaDetial:'',
				provinces: ['北京市','上海市','天津市','重庆市','河北省','山西省','内蒙古省','辽宁省','吉林省','黑龙江省','江苏省','浙江省','安徽省','福建省','江西省','山东省','河南省','湖北省','湖南省','广东省','广西省','海南省','四川省','贵州省','云南省','西藏省','陕西省','甘肃省','宁夏省','青海省','新疆省','香港','澳门','台湾'],
				city: [
    ["东城区", "西城区", "崇文区", "宣武区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "密云县", "延庆县"],
    ["黄浦区", "卢湾区", "徐汇区", "长宁区", "静安区", "普陀区", "虹口区", "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "南汇区", "奉贤区", "崇明县"],
    ["和平区", "河东区", "河西区", "南开区", "河北区", "红桥区", "塘沽区", "汉沽区", "大港区", "东丽区", "西青区", "津南区", "北辰区", "武清区", "宝坻区", "宁河县", "静海县", "蓟县"],
    ["万州区", "涪陵区", "渝中区", "大渡口区", "江北区", "沙坪坝区", "九龙坡区", "南岸区", "北碚区", "万盛区", "双桥区", "渝北区", "巴南区", "黔江区", "长寿区", "綦江县", "潼南县", "铜梁县", "大足县", "荣昌县", "璧山县", "梁平县", "城口县", "丰都县", "垫江县", "武隆县", "忠县", "开县", "云阳县", "奉节县", "巫山县", "巫溪县", "石柱土家族自治县", "秀山土家族苗族自治县", "酉阳土家族苗族自治县", "彭水苗族土家族自治县", "江津市", "合川市", "永川市", "南川市"],
    ["石家庄市","张家口市","承德市","秦皇岛市","唐山市","廊坊市","保定市","衡水市","沧州市","邢台市","邯郸市"],
    ["太原市","朔州市","大同市","阳泉市","长治市","晋城市","忻州市","晋中市","临汾市","吕梁市","运城市"],
    ["呼和浩特市","包头市","乌海市","赤峰市","通辽市","呼伦贝尔市","鄂尔多斯市","乌兰察布市","巴彦淖尔市","兴安盟","锡林郭勒盟","阿拉善盟"],
    ["沈阳市","朝阳市","阜新市","铁岭市","抚顺市","本溪市","辽阳市","鞍山市","丹东市","大连市","营口市","盘锦市","锦州市","葫芦岛市"],
    ["长春市","白城市","松原市","吉林市","四平市","辽源市","通化市","白山市","延边州"],
    ["哈尔滨市","齐齐哈尔市","七台河市","黑河市","大庆市","鹤岗市","伊春市","佳木斯市","双鸭山市","鸡西市","牡丹江市","绥化市","大兴安岭地区"],
    ["南京市","徐州市","连云港市","宿迁市","淮安市","盐城市","扬州市","泰州市","南通市","镇江市","常州市","无锡市","苏州市"],
    ["杭州市","湖州市","嘉兴市","舟山市","宁波市","绍兴市","衢州市","金华市","台州市","温州市","丽水市"],
    ["合肥市","宿州市","淮北市","亳州市","阜阳市","蚌埠市","淮南市","滁州市","马鞍山市","芜湖市","铜陵市","安庆市","黄山市","六安市","巢湖市","池州市","宣城市"],
    ["福州市","南平市","莆田市","三明市","泉州市","厦门市","漳州市","龙岩市","宁德市"],
    ["南昌市","九江市","景德镇市","鹰潭市","新余市","萍乡市","赣州市","上饶市","抚州市","宜春市","吉安市"],
    ["济南市","青岛市","聊城市","德州市","东营市","淄博市","潍坊市","烟台市","威海市","日照市","临沂市","枣庄市","济宁市","泰安市","莱芜市","滨州市","菏泽市"],
    ["郑州市","开封市","三门峡市","洛阳市","焦作市","新乡市","鹤壁市","安阳市","濮阳市","商丘市","许昌市","漯河市","平顶山市","南阳市","信阳市","周口市","驻马店市","济源市"],
    ["武汉市","十堰市","襄樊市","荆门市","孝感市","黄冈市","鄂州市","黄石市","咸宁市","荆州市","宜昌市","随州市","省直辖县级行政单位","恩施州"],
    ["长沙市","张家界市","常德市","益阳市","岳阳市","株洲市","湘潭市","衡阳市","郴州市","永州市","邵阳市","怀化市","娄底市","湘西州"],
    ["广州市","深圳市","清远市","韶关市","河源市","梅州市","潮州市","汕头市","揭阳市","汕尾市","惠州市","东莞市","珠海市","中山市","江门市","佛山市","肇庆市","云浮市","阳江市","茂名市","湛江市"],
    ["南宁市","桂林市","柳州市","梧州市","贵港市","玉林市","钦州市","北海市","防城港市","崇左市","百色市","河池市","来宾市","贺州市"],
    ["海口市","三亚市","省直辖县级行政单位"],
    ["成都市","广元市","绵阳市","德阳市","南充市","广安市","遂宁市","内江市","乐山市","自贡市","泸州市","宜宾市","攀枝花市","巴中市","达州市","资阳市","眉山市","雅安市","阿坝州","甘孜州","凉山州"],
    ["贵阳市","六盘水市","遵义市","安顺市","毕节地区","铜仁地区","黔东南州","黔南州","黔西南州"],
    ["昆明市","曲靖市","玉溪市","保山市","昭通市","丽江市","思茅市","临沧市","德宏州","怒江州","迪庆州","大理州","楚雄州","红河州","文山州","西双版纳州"],
    ["拉萨市","那曲地区","昌都地区","林芝地区","山南地区","日喀则地区","阿里地区"],
    ["西安市","延安市","铜川市","渭南市","咸阳市","宝鸡市","汉中市","榆林市","安康市","商洛市"],
    ["兰州市","嘉峪关市","白银市","天水市","武威市","酒泉市","张掖市","庆阳市","平凉市","定西市","陇南市","临夏州","甘南州"],
    ["西宁市","海东地区","海北州","海南州","黄南州","果洛州","玉树州","海西州"],
    ["银川市","石嘴山市","吴忠市","固原市","中卫市"],
    ["乌鲁木齐市","克拉玛依市","自治区直辖县级行政单位","喀什地区","阿克苏地区","和田地区","吐鲁番地区","哈密地区","克孜勒苏柯州","博尔塔拉州","昌吉州","巴音郭楞州","伊犁州","塔城地区","阿勒泰地区"],
    ["香港"],
    ["澳门"],
    ["台北市","高雄市","台中市","花莲市","基隆市","嘉义市","金门市","连江市","苗栗市","南投市","澎湖市","屏东市","台东市","台南市","桃园市","新竹市","宜兰市","云林市","彰化市"]]

			}
		},
		methods: {
			newPathItem (e,index) {

				if (e.currentTarget.innerText != '' && index+1 == this.pathItemLen) {
					this.pathItemLen++
				}
			},
			inputBlur (e) {
				e.currentTarget.blur()
			},
			getDateData (data) {
				this.startDate = data
			},
			getchangeDis (data) {
				this.ifCalendar = data
			},
			getpro (e,con,index) {
				if (con === 'startpro') {
					this.startpro = e.currentTarget.innerText
					this.ifstartpro = false
					this.startproindex = index
				} else if (con === 'endpro') {
					this.endpro = e.currentTarget.innerText
					this.ifendpro = false
					this.endproindex = index
				}
			},
			getcity (e,con) {
				if (con === 'startcity') {
					this.startcity = e.currentTarget.innerText
					this.ifstartcity = false
				} else if (con === 'endcity') {
					this.endcity = e.currentTarget.innerText
					this.ifendcity = false
				}
			},
			pushTitleimg () {
				this.$refs.TitleImg.click()
			},
			pushcode () {
				this.$refs.code.click()
			},
			push () {
				var line = ''
				for (var i = 0; i < this.$refs.lineItem.length; i++){
					line = line + this.$refs.lineItem[i].innerText + '-'
				}

				this.$http.post('https://wy.lujiahaoo.cn/tour/issue.php',{
					"action":"issue_release",
					"issue_title": this.issue_title,
					"issue_titleimg": this.img,
					"issue_qrcode": this.code,
					"issue_startplace": this.startpro + this.startcity + this.startArea,
	                 "issue_endplace": this.endpro+"&" + this.endcity +"&" + this.endArea,
	                 "issue_traveldate":this.startDate,
	                 "issue_line":line,
	                 "issue_content": this.compaDetial

					
					},{}).then(result => {
						console.log(result)
						this.ifNote = true
						this.noteInfo = result.body.message
						setTimeout(()=>{
							this.ifNote = false
							this.$router.push('/companion')
						},1000)
					})
			},
			pushIssueImg (event) {
				//上传标题图片
				console.log(event)
				let imgForm = new FormData()
				imgForm.append('img',event.target.files[0])

				this.$http.post('https://wy.lujiahaoo.cn/tour/issueimg.php',imgForm,{
					headers: { "Content-Type": "multipart/form-data" }
				}).then(result => {
					console.log(result)
					this.ifNote = true
					this.noteInfo = result.body.message
					setTimeout(()=>{
						this.ifNote = false
						this.img = result.body.data
					},1000)
				})
			},
			pushcodeImg (event) {
				//上传二维码
				let codeImg = new FormData()
				codeImg.append('img',event.target.files[0])

				this.$http.post('https://wy.lujiahaoo.cn/tour/issueimg.php',codeImg,{
					headers: { "Content-Type": "multipart/form-data" }
				}).then(result => {
					console.log(result)
					this.ifNote = true
					this.noteInfo = result.body.message
					setTimeout(()=>{
						this.ifNote = false
						this.code = result.body.data
					},1000)
				})
			}

		},
		mounted () {

			// this.$http.post('https://wy.lujiahaoo.cn/tour/user.php',{
			// 	"action":"info"
			
			// },{}).then(result => {
			// 	console.log('success')
			// 	console.log(result)
			// })
		}
	}

	
</script>

<style type="text/css">
	.PushCompanion{
		min-width: 977px;
	}
	/*头部*/
	.PushCompHead{
		height: 286px;
		background: #95bad9;
	}
	.choiceTitleImg{
		width: 256px;
		height: 78px;
		margin: 0 auto;
		margin-top: 30px;
		color: #fff;
	}
	.icon-tianjiatupian{
		font-size: 68px;
		margin-right: 20px;
	}
	.choiceTitleImg>div{
		font-size: 22px;
		display: inline-block;
		vertical-align: top;
		line-height: 78px;
		height: 100%;

	}
	.TitleInput{
		width: 938px;
	    height: 47px;
	    border-radius: 5px;
	    background-color: rgb(233, 233, 233);
	    box-shadow: 0px 1px 6px 0px rgba(255, 255, 255, 0.57);
	    outline: none;
	    border: none;
	    font-size: 18px;
	    padding-left: 39px;
	    display: block;
	    margin: 0 auto;
	    margin-top: 28px;
	}
	/*头部结束*/
	/*内容*/
	.compDataL,
	.compDataR
	{
		display: inline-block;
		vertical-align: top;
	}
	.PushCompContent{
		width: 870px;
		margin: 0 auto;
	}
	.PushCompanionBtn{
		width: 102px;
		height: 36px;
		background-color: #7086c6;
	    border-radius: 3px;
	    color: #fff;
	    
	    margin: 0 auto;
		margin-top: 30px;
		margin-bottom: 48px;
	    line-height: 36px;
	    letter-spacing: 1px;
	}
	.compDataL{
		width: 476px;
		margin-top: 10px;
	}
	.compDataR{
		margin-top: 24px;
		margin-left: 69px;
	}
	.startAdd>div,
	.endAdd>div,
	.comDateText>div,
	.compDataR>div,
	.comDate>div,
	.companionInfo>div{
		display: inline-block;
		vertical-align: top;
		height: 32px;
		line-height: 32px; 
	}
	.pushCodeImg{
		
	   
	    background-color: #768bc8;
	    color: #fff;
	    margin-top: 20px;

	  
	}
	.cancelCodeImg{
	   
	    background-color: #e9e9e9;
	    color: #747474;
	    margin-top: 15px;
	}
	.pushCodeImg,
	.cancelCodeImg{
		line-height: 26px;
		height: 26px;
		width: 83px;
		border-radius: 3px;
		font-size: 13px;

	}
	.PushCompanionBtn,
	.pushCodeImg,
	.cancelCodeImg,
	.province,
	.city
	{
		 cursor: pointer;
		 text-align: center;
	}
	
	.userDode{
		width: 96px;
		height: 96px;
	}
	.province,
	.city{
		width: 94px;
		margin-right: 10px;
		position: relative;
		
	}
	.addressDetial,
	.attractions{
		width: 154px;
		border: none;
		display: inline-block;
		outline: none;
    	height: 32px;
    	padding-left: 19px;
	}
	.province,
	.city,
	.addressDetial,
	.attractions,
	.choiceDate{
		background-color: #dddddd;
		border-radius: 3px;
		color: #747474;
		
	}

	.choiceDate{
		width: 368px;
    	height: 32px;
    	padding-left: 12px;
    	cursor: pointer;
    	position: relative;
	}
	.startAddText,
	.endAddText{
		letter-spacing: 5px;
	}
	.compDataL>div,
	.path,
	.companionInfo{
		margin-top: 14px;
	}
	.InfoContent{
		resize: none;
	    width: 748px;
	    height: 161px;
	    background: #dddddd;
	    border: none;
	    border-radius: 3px;
	    outline: none;
	    padding: 5px;
	}
	.startAddText,
	.endAddText,
	.comDateText,
	.pathTitle,
	.companionInfoText,
	.comDateText{
		margin-right: 20px;
	}
	.pushCodeBox{
		margin-left: 46px;
	}
	.pathItem{
		margin-bottom: 10px;
	}
	.pathItemBox{
		width: 755px;
	}
	.pathItemBox>div{
		display: inline-block;
		vertical-align: top;
	}
	.pathItem>div{
		display: inline-block;
		vertical-align: top;
	}
	.pathItemInput{
		min-width: 75px;
		border: 1px solid #ddd;
		border-radius: 20px;
		outline: none;
		padding: 0 10px;
		height: 32px;
		line-height: 32px;
	}
	.pathTitle{
		height: 32px;
		line-height: 32px;
		display: inline-block;

	}
	.path>div{
		display: inline-block;
		vertical-align: top;
	}
	.pathItemLine{
		/*width: 10px;*/

		height: 1px;
		width: 30px;
		margin-top: 16px;
		background: #ddd;
	}
	.pathItem:first-child .pathItemLine{
		display: none;
	}
	/*省*/
	.provinceList,
	.cityList{
		width: 94px;
		height: 300px;
		background: #fff;
		position: absolute;
		z-index: 3;
		overflow: auto;
		-webkit-box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.16);
    	box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.16);
		
	}
	.provinceList > li ,
	.cityList>li{
		list-style: none;
	}
	.provinceList > li:hover,
	.cityList>li:hover{
		background: #ddd;
	}
	.provinceList::-webkit-scrollbar,
	.cityList::-webkit-scrollbar {
		width: 4px;
	}
	
	.provinceList::-webkit-scrollbar-thumb,
	.cityList::-webkit-scrollbar-thumb {
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
		background: rgba(0,0,0,0.2);
	}
    .provinceList::-webkit-scrollbar-track,
	.cityList::-webkit-scrollbar-track{
		-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
		border-radius: 0;
		background: rgba(0,0,0,0.1);
	}
</style>

<style type="text/css" scoped>
	.icon-tianjiatupian{
		/*color: red;*/
		cursor: pointer;
	}
	input::-webkit-input-placeholder{
	  color:#747474;
	}
	input::-moz-placeholder{   /* Mozilla Firefox 19+ */
	  color:#747474;
	}
	input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
	  color:#747474;
	}
	input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
	  color:#747474;
	}
	.calendar{
		top: 45px;
		left: 22px;
	}
</style>