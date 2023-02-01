<template>
	<view class="my-settle-container">
		<label class="radio">
			<radio color="#C00000" :checked="isAllCheck" @click="checkAll" :disabled="isZero" /><text>全选</text>
		</label>

		<view class="amount-box">
			合计:<text class="amount">￥{{totalPrice}}.00</text>
		</view>

		<view class="btn-settle" @click="check">结算({{checkCount}})</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';

	export default {
		name: "settle",
		data() {
			return {

			}
		},
		methods: {
			checkAll() {
				this.$store.commit('cart/CHECKALL');
			},
			check() {
				if (!this.checkCount) return uni.$showMsg('请选择要结算的商品！')
				if (!this.address) return uni.$showMsg('请选择地址！')
				if (!this.token) {
					uni.$showMsg('请先登录！');
					this.$store.commit('user/ISFROMCART', true);
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/mine/mine'
						})
					}, 1500)
				}
				this.payment();
			},
			async payment() {
				const payInfo = {
					// order_price: this.totalPrice,
					order_price: 0.01,
					consignee_addr: this.address,
					goods: this.cartInfo.filter(e => e.goods_state).map(e => ({goods_id: e.goods_id, goods_number: e.goods_count, goods_price: e.goods_price}))
				}
				const res = await uni.$http.post('/api/public/v1/my/orders/create', payInfo);
				console.log(res);
			}
		},
		computed: {
			...mapGetters('cart', ['total', 'checkCount', 'totalPrice']),
			isAllCheck() {
				if (this.total === 0) return false
				return this.total === this.checkCount
			},
			isZero() {
				if (this.total === 0) return true
				return false
			},
			address() {
				return this.$store.state.user.address;
			},
			token() {
				return this.$store.state.user.token;
			},
			cartInfo() {
				return this.$store.state.cart.cartInfo;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-settle-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		// 将背景色从 cyan 改为 white
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		font-size: 14px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount {
			color: #c00000;
		}

		.btn-settle {
			height: 50px;
			min-width: 100px;
			background-color: #c00000;
			color: white;
			line-height: 50px;
			text-align: center;
			padding: 0 10px;
		}
	}
</style>
