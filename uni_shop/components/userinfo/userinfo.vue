<template>
	<view>
		<view class="my-userinfo-container">
			<view class="top-box">
				<image :src="userInfo.avatarUrl" class="avatar"></image>
				<view class="nickname">{{userInfo.nickName}}</view>
			</view>
		</view>
		<view class="panel-list">
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>14</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>18</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>84</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			<view class="panel">
				<view class="panel-title">我的订单</view>
				<view class="panel-body">
					<view class="panel-item">
						<uni-icons type="wallet-filled" size="30" color="#c00000"></uni-icons>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<uni-icons type="map-pin-ellipse" size="30" color="#c00000"></uni-icons>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<uni-icons type="refresh-filled" size="30" color="#c00000"></uni-icons>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<uni-icons type="list" size="30" color="#c00000"></uni-icons>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<view class="panel">
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logOut">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		name: "userinfo",
		data() {
			return {

			}
		},
		computed: {
			userInfo() {
				return this.$store.state.user.userInfo
			},
			...mapState('user', ['isFromCart'])
		},
		methods: {
			async logOut() {
				let [err, res] = await uni.showModal({
					title: '提示',
					content: '确认退出登录吗？',
					confirmText: '确认',
					cancelText: '取消'
				}).catch(err => err)
				
				if (res && res.cancel) return false
				if (res && res.confirm) {
					this.$store.commit('user/ADDADDRESS', {});
					this.$store.commit('user/GETUSERINFO', {});
					setTimeout(() => {
						this.$store.commit('user/ADDTOKEN', '');
					}, 1000)
				}
			}
		},
		created() {
			if (this.isFromCart) {
				this.$store.commit('user/ISFROMCART', false);
				uni.switchTab({
					url: '/pages/cart/cart'
				})
			}
		}
	}
</script>

<style lang="scss">
	view {
		$main-color: #c00000;

		.my-userinfo-container {
			height: 100%;
			background-color: #f4f4f4;

			.top-box {
				height: 400rpx;
				background-color: $main-color;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.avatar {
					display: block;
					width: 90px;
					height: 90px;
					border-radius: 50%;
					border: 2px solid white;
					box-shadow: 0 0 10px white;
				}

				.nickname {
					color: white;
					font-weight: bold;
					font-size: 16px;
					margin-top: 15px;
				}
			}
		}

		.panel-list {
			padding: 0 10px;
			position: relative;
			top: -10px;

			.panel {
				background-color: white;
				border-radius: 3px;
				margin-bottom: 8px;

				.panel-title {
					line-height: 45px;
					padding-left: 10px;
					font-size: 15px;
					border-bottom: 1px solid #f4f4f4;
				}

				.panel-body {
					display: flex;
					justify-content: space-around;

					.panel-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-around;
						font-size: 13px;
						padding: 10px 0;

						.icon {
							width: 35px;
							height: 35px;
						}
					}
				}
			}

			.panel-list-item {
				height: 45px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 15px;
				padding: 0 10px;
			}
		}
	}
</style>
