import Vue from 'vue'
import Vuex from 'vuex'

import cart from './cart.js';
import user from './user.js';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		cart,
		user
	}
})

export default store;
