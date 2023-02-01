<template>
	<view>
		<search></search>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true"
			indicator-color="white"  indicator-active-color="gray">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<navigator :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id"
					:open_type="item.open_type">
					<image :src="item.image_src" />
				</navigator>
			</swiper-item>
		</swiper>
		<view class="nav-list">
			<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navHandler(item)">
				<img :src="item.image_src">
			</view>
		</view>
		<view class="floor" v-for="(item, index) in floorList" :key="index">
			<view class="floor-title">
				<img :src="item['floor_title'].image_src">
			</view>
			<view class="floor-content">
				<view class="content-left">
					<image :src="item.product_list[0].image_src"
						:style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"
						@click="floorImgHandler(item.product_list[0].url)"></image>
				</view>
				<view class="content-right">
					<image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"
						v-for="(item2, index2) in item.product_list" :key="index2" v-if="index2 !== 0"
						@click="floorImgHandler(item2.url)"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cartbadge from '../../mixin/tabbar-badge.js';
	export default {
		mixins: [cartbadge],
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		onLoad() {
			this.getSwiper();
			this.getNav();
			this.getFloor();
		},
		methods: {
			// 获取轮播图
			async getSwiper() {
				let res = await uni.$http.get('/api/public/v1/home/swiperdata');
				if (res.statusCode !== 200) return uni.$showMsg();
				this.swiperList = res.data.message;
			},
			// 获取分类导航
			async getNav() {
				let res = await uni.$http.get('/api/public/v1/home/catitems');
				if (res.statusCode !== 200) return uni.$showMsg();
				this.navList = res.data.message;
			},
			navHandler(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/category/category'
					})
				}
			},
			// 获取楼层信息
			async getFloor() {
				let res = await uni.$http.get('/api/public/v1/home/floordata');
				if (res.statusCode !== 200) return uni.$showMsg();
				res = res.data.message;
				res.forEach(item => {
					item.product_list.forEach(item2 => {
						item2.url = '/subpkg/goods_list/goods_list?' + item2.navigator_url.split('?')[1];
					})
				})
				this.floorList = res;
			},
			floorImgHandler(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		swiper {
			width: 100%;
			height: 330rpx;

			swiper-item {
				width: 100%;

				image {
					width: 100%;
					height: 330rpx;
				}
			}
		}

		.nav-list {
			margin: 15px 0;
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.nav-item {
				width: 25%;
				display: flex;

				img {
					width: 128rpx;
					height: 140rpx;
					margin: auto;
				}
			}
		}

		.floor {
			width: 100%;
			margin: 10px 0;

			.floor-title {
				width: 100%;
				height: 60rpx;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.floor-content {
				display: flex;
				justify-content: space-around;
				padding-left: 10rpx;

				.content-left {
					float: left;
				}

				.content-right {
					float: right;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
					align-items: center;
				}
			}
		}
	}
</style>
