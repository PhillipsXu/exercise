<template>
	<view>
		<cartaddress></cartaddress>
		<view class="empty" v-if="total === 0">
			购物车空空如也...
		</view>
		<uni-swipe-action v-else>
			<block v-for="(item, index) in cart" :key="index">
				<uni-swipe-action-item :right-options="options" @click="swipeHandler(item.goods_id)">
					<goods-item :item="item" :showRadio="true" @raido-change="raidoChangeHandler"></goods-item>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<settle></settle>
	</view>
</template>

<script>
	import cartbadge from '../../mixin/tabbar-badge.js';

	export default {
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}],
			}
		},
		computed: {
			cart() {
				return this.$store.state.cart.cartInfo;
			},
			total() {
				return this.$store.getters['cart/total'];
			}
		},
		methods: {
			raidoChangeHandler(e) {
				this.$store.commit('cart/UPDATECHECKED', e)
			},
			swipeHandler(id) {
				this.$store.commit('cart/DELGOOD', id);
			}
		},
		mixins: [cartbadge]
	}
</script>

<style lang="scss">
	view {
		.empty {
			width: 100%;
			height: 500rpx;
			line-height: 500rpx;
			text-align: center;
		}
		
		.cart-title {
			height: 40px;
			display: flex;
			align-items: center;
			font-size: 14px;
			padding-left: 5px;
			border-bottom: 1px solid #efefef;

			.cart-title-text {
				margin-left: 10px;
			}
		}
	}
</style>
