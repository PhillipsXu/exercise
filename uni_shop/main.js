// #ifndef VUE3
import Vue from 'vue'
import App from './App'

import $http from './api/request.js'

import store from './store/store.js'

uni.$showMsg = function(title = '数据加载失败,请刷新！', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
