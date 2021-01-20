import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import vueJsonp from 'vue-jsonp'
import BaiduMap from 'vue-baidu-map'
// import ECharts from 'vue-echarts'
// import 'echarts/lib/chart/line'
// import 'echarts/lib/chart/map'
// Vue.component('chart', ECharts)
// import ajax from './assets/ajax.vue'
// Vue.prototype.$ajax = ajax


Vue.use(VueResource)
Vue.use(vueJsonp)
Vue.use(BaiduMap, {
	  /* 申请的百度密钥，可以在百度地图官网申请 */
	  ak: 'nh7URHwPbm792Y8sbwaeUCBTRq2dGt4U'
})
Vue.http.interceptors.push(function (request,next) {
	request.credentials = true
	next(function (response) {
		return response
	})
})
// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;
// Vue.http.options.xhr = { withCredentials: true };

Vue.http.options.emulateJSON = true

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


// import ajax from './assets/ajax.vue'
// Vue.prototype.$ajax = ajax

