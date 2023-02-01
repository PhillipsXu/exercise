<template>
	<view class="goods-item">
		<view class="goods-item-left" @click="toGoodDetail(item.goods_id)">
			<image class="goods-pic" :src="item.goods_small_logo || defaultPic" mode="widthFix"></image>
		</view>
		<view class="goods-item-right">
			<view class="goods-name" @click="toGoodDetail(item.goods_id)">
				{{item.goods_name}}
			</view>
			<view class="goods-price">
				￥{{saveNumber(item.goods_price)}}
			</view>
			<view class="num-box" v-if="showRadio">
				<view class="decrease" :style="{color: (item.goods_count > 1 ? 'black' : 'gainsboro')}"
					@click="decrease(item.goods_id)">-</view>
				<view class="number">{{item.goods_count}}</view>
				<view class="increase" @click="increase(item.goods_id)">+</view>
			</view>
			<radio :checked="item.goods_state" color="#C00000" v-if="showRadio" @click="clickHandler"></radio>
		</view>
	</view>
</template>

<script>
	export default {
		name: "goods-item",
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			}
		},
		props: {
			item: {
				type: Object
			},
			showRadio: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			saveNumber(n) {
				return n.toFixed(2)
			},
			toGoodDetail(id) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + id
				})
			},
			clickHandler() {
				this.$emit('raido-change', {
					goods_id: this.item.goods_id,
					goods_state: !this.item.goods_state
				})
			},
			decrease(id) {
				this.$store.commit('cart/DECREASE', id);
			},
			increase(id) {
				this.$store.commit('cart/INCREASE', id);
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.goods-item-left {
			margin-right: 5px;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			position: relative;

			.goods-name {
				font-size: 13px;
			}

			.goods-price {
				font-size: 16px;
				color: #c00000;
			}

			.num-box {
				position: absolute;
				right: 60px;
				bottom: 0;

				view {
					display: inline-block;
					width: 20px;
					height: 20px;
					box-sizing: border-box;
					font-size: 16px;
					line-height: 20px;
					text-align: center;
				}

				.number {
					background-color: #ebebeb;
					width: 40px;
					border-radius: 5px;
				}

				.decrease,
				.increase {
					font-weight: 600;
				}
			}

			radio {
				position: absolute;
				right: 0;
				bottom: 0;
			}
		}
	}
</style>
