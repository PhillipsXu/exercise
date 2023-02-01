<template>
	<view>
		<search :searchList="cateInfo"></search>
		<view class="cate-container">
			<scroll-view class="cate-left" scroll-y style="height: 300px;" :style="{height: height + 'px'}">
				<view class="left-item" v-for="(c1, i1) in cateInfo" :key="i1" :class="{active: i1 === active}" @click="changeLevel(i1)">
					{{c1.cat_name}}</view>
			</scroll-view>
			<scroll-view class="cate-right" scroll-y style="height: 300px;" :style="{height: height + 'px'}" enable-flex :scroll-top="scrollTop">
				<view class="right" v-for="(c2, i2) in cateLevel_2" :key="i2">
					<view class="right-title">/&emsp;{{c2.cat_name}}&emsp;/</view>
					<view class="right-content">
						<view class="right-item" v-for="(c3, i3) in c2.children" :key="i3" @click="toGoodsList(c3)">
							<!-- <image :src="c3.cat_icon" mode=""></image> -->
							<view>{{c3.cat_name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import cartbadge from '../../mixin/tabbar-badge.js';
	export default {
		mixins: [cartbadge],
		data() {
			return {
				height: 0,
				cateInfo: [],
				cateLevel_2: [],
				active: 0,
				scrollTop: 0
			};
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync();
			this.height = sysInfo.windowHeight - 50;
			this.getCate();
		},
		methods: {
			async getCate() {
				let res = await uni.$http.get('/api/public/v1/categories');
				if (res.statusCode !== 200) return uni.$showMsg();
				res = res.data.message;
				this.cateInfo = res;
				this.cateLevel_2 = this.cateInfo[0].children;
			},
			changeLevel(index) {
				this.active = index;
				this.cateLevel_2 = this.cateInfo[index].children;
				this.scrollTop = this.scrollTop ? 0 : 1;
			},
			toGoodsList(c3) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + c3.cat_id + '&query=' + c3.cat_name
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		$main-color: #c00000;
		
		.cate-container {
			display: flex;

			.cate-left {
				width: 240rpx;

				.left-item {
					background-color: #F7F7F7;
					line-height: 60px;
					text-align: center;
					font-size: 14px;
				}

				.active {
					background-color: #FFF;
					position: relative;

					&::before {
						content: '';
						display: block;
						background-color: $main-color;
						width: 3px;
						height: 30px;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
					}
				}
			}

			.cate-right {
				display: flex;
				flex-direction: column;

				.right {
					.right-title {
						width: 100%;
						text-align: center;
						padding: 20px 0;
						font-size: 18px;
						line-height: 40px;
						color: $main-color;
					}

					.right-content {
						display: flex;
						flex-wrap: wrap;
						justify-content: space-around;
						align-items: center;

						.right-item {
							text-align: center;
							line-height: 90px;
							width: 33.33%;
							height: 90px;
						}
					}
				}
			}
		}
	}
</style>
