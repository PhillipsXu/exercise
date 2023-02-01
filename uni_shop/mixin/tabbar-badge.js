export default {
	computed: {
		total() {
			return this.$store.getters['cart/total'];
		}
	},
	methods: {
		setCartNum() {
			uni.setTabBarBadge({
				index: 2,
				text: this.total.toString()
			})
		}
	},
	watch: {
		total: {
			handler() {
				this.setCartNum();
			}
		}
	},
	onShow() {
		this.setCartNum();
	}
}