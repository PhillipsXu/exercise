import {
	$http
} from '@escook/request-miniprogram';

wx.$http = $http;
uni.$http = $http;

$http.baseUrl = 'https://www.uinav.com';

// 请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: 'Loading...'
	})
	if (options.url.indexOf('/my/') !== -1) {
		options.header = {
			Authorization: store.state.user.token
		}
	}
}

// 响应拦截器
$http.afterRequest = function() {
	uni.hideLoading()
}

export default $http;
