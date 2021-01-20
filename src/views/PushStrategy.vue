<template>
	<div>
		<header class="pushStraHead">
			<Nav :white="'white'"></Nav>
			<!-- <div>
				<i class="iconfont icon-tianjiatupian" @click="choiceImg"></i>
				<div>设置攻略头图</div>
				<input type="file" name="" v-show="false" ref="straImg" @change="pushImg">  
			</div> -->
			<input type="text" name="" placeholder="填写攻略标题" v-model="title">
		</header>
		<div class="pub-str-content">
			<div class="pub-box">
				<mavon-editor class="edit" v-model="content" @change="change" @imgAdd="$imgAdd" ref="md"/>
				<div class="pub-str" @click="pushStra">发布攻略</div>
			</div>
		</div>
		<Foot></Foot>
		<div class="noteInfo" v-show="ifNote">{{ noteInfo }}</div>
	</div>
</template>

<script type="text/javascript">
	import Nav from '../components/Nav.vue'
	import Foot from '../components/Foot.vue'
	import { mavonEditor } from 'mavon-editor'
	import 'mavon-editor/dist/css/index.css'
	// import marked from 'marked'

	export default {
	  name: 'PushStrtegy',
	  components: {
	    Nav,
	    Foot,
	    mavonEditor
	  },
	  data () {
	  	return {
	  		title: '',
	  		content: '',
	  		html: '',
	  		noteInfo: '',
	  		ifNote: false
	  	}
	  },
	  methods: {
	  	pushStra () {
	  		console.log(this.content)
	  		this.ifNote = true
			this.noteInfo = '正在发布请稍等'
			setTimeout(()=>{
				this.ifNote = false
				// this.$router.push('/strategy')
			},1000)
	  		// console.log(marked(this.content))
	  		this.$http.post('https://wy.lujiahaoo.cn/tour/md.php',{
				"action":"strategy_release",
                "strategy_title": this.title,
                "strategy_html": this.html,
                "strategy_md": this.content
			},{}).then(result => {
				console.log(result)
				this.ifNote = true
				this.noteInfo = result.body.message
				setTimeout(()=>{
					this.ifNote = false
					this.$router.push('/strategy')
				},1000)
				// this.$router.push('/strategy')
			})
	  	},
	  	change (value, render) {
	  		console.log(render)
	  		this.html = render
	  	},
	  	$imgAdd (pos,$file) {
	  		var formdata = new FormData();
           	formdata.append('editormd-image-file', $file)
           	this.$http.post('https://wy.lujiahaoo.cn/tour/upload.php',formdata,{
				headers: { 'Content-Type': 'multipart/form-data' }
			}).then(result => {
				console.log(result)
				 this.$refs.md.$img2Url(pos, result.body.url)
				// this.$router.push('/strategy')
			})
	  	}
	  }
	}
</script>

<style type="text/css" >
	/*@import ''*/
</style>
<style type="text/css" scoped>
	.pushStraHead{
		height: 288px;
		background-image: url(../../public/images/publish_strategy_bg.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	/deep/ #nav a{
		color: #fff;
	}
	.pub-str{
		width: 116px;
		height: 45px;
		background: #768bc8;
		color: #fff;
		text-align: center;
		line-height: 45px;
		cursor: pointer;
		border-radius: 5px;
		margin: 0 auto;
		margin-bottom: 40px;
	}
	.edit{
		width: 1136px;
		height: 656px;
		margin: 50px auto;
		/*margin-top: 50px;*/
	}
	.pushStraHead>input{
		width: 850px;
		height: 45px;
		margin: 0 auto;
		display: block;
		padding: 0 40px;
		font-size: 18px;
		border-radius: 3px;
		border:none;
	}
	.pushStraHead>div>div{
		display: inline-block;
		vertical-align: top;
		color: #fff;
		font-size: 24px;
		height: 60px;
		line-height: 60px;
	}
	.icon-tianjiatupian{
		font-size: 60px;
		color:#fff;
		cursor: pointer;
	}
	.pushStraHead>div{
		width: 266px;
		margin: 0 auto;
		margin-bottom: 35px;
	}
	.noteInfo{
		z-index: 10000;
		width: 220px;
	}
</style>