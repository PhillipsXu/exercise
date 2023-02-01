export default {
	namespaced: true,
	actions: {
		
	},
	mutations: {
		SAVEADDRESS(state) {
			uni.setStorageSync('address', JSON.stringify(state.addres));
		},
		ADDADDRESS(state, val) {
			state.addres = val;
			this.commit('user/SAVEADDRESS');
		},
		SAVEUSERINFO(state) {
			uni.setStorageSync('userInfo', JSON.stringify(state.userInfo));
		},
		GETUSERINFO(state, val) {
			state.userInfo = val;
			this.commit('user/SAVEUSERINFO');
		},
		SAVETOKEN(state) {
			uni.setStorageSync('token', state.token);
		},
		ADDTOKEN(state, val) {
			state.token = val;
			this.commit('user/SAVETOKEN');
		},
		ISFROMCART(state, val) {
			state.isFromCart = val;
		}
	},
	state: () => ({
		token: uni.getStorageSync('token') || '',
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
		isFromCart: false
	}),
	getters: {
		
	}
}