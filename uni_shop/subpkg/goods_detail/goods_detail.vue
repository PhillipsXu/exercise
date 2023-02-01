<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true"
			indicator-color="white" indicator-active-color="gray">
			<swiper-item v-for="(item, index) in goodInfo.pics" :key="index">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		<view class="goods-info-box" v-if="goodInfo.goods_price">
			<view class="price">￥{{goodInfo.goods_price}}</view>
			<view class="goods-info-body">
				<view class="goods-name">{{goodInfo.goods_name}}</view>
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="yf">快递：免运费</view>
		</view>
		<view class="goods-detail">
			<rich-text :nodes="goodInfo.goods_introduce"></rich-text>
		</view>
		<view class="goods-nav" :class="{isFull: isFullScreen}">
			<uni-goods-nav fill="true" :options="options" @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isFullScreen: false,
				goodInfo: {},
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 0,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		computed: {
			count() {
				return this.$store.getters['cart/total'];
			}
		},
		watch: {
			count: {
				immediate: true,
				handler(val) {
					this.options[2].info = val;
				}
			}
		},
		methods: {
			async getGood(id) {
				let res = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id: id
				})
				if (res.statusCode !== 200) return uni.$showMsg();
				res = res.data.message;
				res.goods_introduce = res.goods_introduce.replace(/<img/g, '<img style="display:block;" ').replace(
					/^webp$/g, 'jpg');
				this.goodInfo = res;
			},
			preview(index) {
				const urls = this.goodInfo.pics.map(item => {
					return item.pics_big
				})
				uni.previewImage({
					urls,
					current: index
				})
			},
			onClick(e) {
				switch (e.content.text) {
					case '购物车':
						uni.switchTab({
							url: '/pages/cart/cart'
						})
						break;
				}
			},
			buttonClick(e) {
				switch (e.content.text) {
					case '加入购物车':
						this.$store.dispatch('cart/addCart', {
							goods_id: this.goodInfo.goods_id,
							goods_name: this.goodInfo.goods_name,
							goods_price: this.goodInfo.goods_price,
							goods_small_logo: this.goodInfo.goods_small_logo,
							goods_state: true,
							goods_count: 1
						});
						break;
					case '立即购买':
						break;
				}
			}
		},
		onLoad(options) {
			this.getGood(options.goods_id);
			const info = uni.getSystemInfoSync();
			if (info.screenHeight - info.safeArea.height > 40) {
				this.isFullScreen = true;
			}
		}
	}
</script>

<style lang="scss">
	view {
		$main-color: #c00000;

		swiper {
			height: 750rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.goods-info-box {
			padding: 10px;
			padding-right: 0;

			.price {
				color: $main-color;
				font-size: 18px;
				margin: 10px 0;
			}

			.goods-info-body {
				display: flex;
				justify-content: space-between;

				.goods-name {
					font-size: 13px;
					padding-right: 10px;
				}

				.favi {
					width: 120px;
					font-size: 12px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border-left: 1px solid #efefef;
					color: gray;
				}
			}

			.yf {
				margin: 10px 0;
				font-size: 12px;
				color: gray;
			}
		}

		.goods-detail {
			padding-bottom: 50px;
		}

		.goods-nav {
			background-color: white;
			position: sticky;
			bottom: 0;
		}

		.isFull {
			padding-bottom: 20px;
		}
	}
</style>
