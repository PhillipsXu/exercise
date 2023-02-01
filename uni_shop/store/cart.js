export default {
	namespaced: true,
	actions: {
		addCart(context, val) {
			const res = context.state.cartInfo.find(e => e.goods_id === val.goods_id);
			if (!res) {
				context.commit('ADDCART', val);
			} else {
				context.commit('ADDNUM', val);
			}
		}
	},
	mutations: {
		ADDCART(state, val) {
			state.cartInfo.push(val);
			uni.setStorageSync('cartInfo', JSON.stringify(state.cartInfo));
		},
		ADDNUM(state, val) {
			const res = state.cartInfo.find(e => e.goods_id === val.goods_id);
			res.goods_count++;
			uni.setStorageSync('cartInfo', JSON.stringify(state.cartInfo));
		},
		UPDATECHECKED(state, val) {
			const res = state.cartInfo.find(e => e.goods_id === val.goods_id);
			if (res) res.goods_state = val.goods_state;
			uni.setStorageSync('cartInfo', JSON.stringify(state.cartInfo));
		},
		DECREASE(state, id) {
			const res = state.cartInfo.find(e => e.goods_id === id);
			if (res && res.goods_count >= 2) res.goods_count--;
			uni.setStorageSync('cartInfo', JSON.stringify(state.cartInfo));
		},
		INCREASE(state, id) {
			const res = state.cartInfo.find(e => e.goods_id === id);
			if (res) res.goods_count++;
			uni.setStorageSync('cartInfo', JSON.stringify(state.cartInfo));
		},
		DELGOOD(state, id) {
			state.cartInfo = state.cartInfo.filter(e => e.goods_id !== id);
			uni.setStorageSync('cartInfo', JSON.stringify(state.cartInfo));
		},
		CHECKALL(state) {
			state.cartInfo.forEach(e => e.goods_state = !e.goods_state);
			uni.setStorageSync('cartInfo', JSON.stringify(state.cartInfo));
		}
	},
	state: () => ({
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cartInfo: JSON.parse(uni.getStorageSync('cartInfo') || '[]')
	}),
	getters: {
		total(state) {
			let res = 0;
			state.cartInfo.forEach(e => res += e.goods_count);
			return res;
		},
		checkCount(state) {
			let res = 0;
			state.cartInfo.filter(e => e.goods_state === true).forEach(e => res += e.goods_count);
			return res;
		},
		totalPrice(state) {
			let res = 0;
			state.cartInfo.filter(e => e.goods_state === true).forEach(e => res += e.goods_price * e.goods_count);
			return res;
		}
	}
}
