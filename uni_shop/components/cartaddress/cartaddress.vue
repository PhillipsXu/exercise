<template>
	<view>
		<view class="address-choose-box line" v-if="JSON.stringify(address) == '{}'">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddr">请选择收货地址</button>
		</view>
		<view class="address-info-box line" v-else @click="chooseAddr">
			<view class="row1">
				<view class="row1-left">
					<view class="username">收货人：<text>{{address.userName}}</text></view>
				</view>
				<view class="row1-right">
					<view class="phone">电话：<text>{{address.telNumber}}</text></view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">
					{{address.provinceName}}-{{address.cityName}}-{{address.countyName}}-{{address.detailInfo}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "cartaddress",
		data() {
			return {
				address: {}
			}
		},
		methods: {
			async chooseAddr() {
				const [err, res] = await uni.chooseAddress().catch(err => err);
				if (res && res.errMsg === 'chooseAddress:ok') {
					this.address = res;
					this.$store.commit('user/ADDADDRESS', this.address);
				}
				if (err && err.errMsg === "chooseAddress:cancel") return uni.$showMsg('请重新选择地址！');
				
				if (err && (err.errMsg == 'chooseAddress:fail auth deny' ||
						'chooseAddress:fail authorize no response')) {
					console.log(err);
					this.getAuth();
				}
			},
			async getAuth() {
				const [err, res] = await uni.showModal({
					content: '检测到您没打开地址权限，是否去设置打开？',
					confirmText: "确认",
					cancelText: "取消"
				}).catch(err => err)

				if (err) return

				if (res.cancel) return uni.$showMsg('您取消了地址授权!')

				if (res.confirm) return uni.openSetting({
					success: (res) => {
						if (res.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
						if (!res.authSetting['scope.address']) return uni.$showMsg('授权失败！请重新授权')
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		.line {
			border-bottom: 2px dashed #c00000;
		}

		.address-border {
			display: block;
			width: 100%;
			height: 5px;
		}

		.address-choose-box {
			height: 90px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.address-info-box {
			font-size: 12px;
			height: 90px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 0 5px;

			.row1 {
				display: flex;
				justify-content: space-between;

				.row1-right {
					display: flex;
					align-items: center;

					.phone {
						margin-right: 5px;
					}
				}
			}

			.row2 {
				display: flex;
				align-items: center;
				margin-top: 10px;

				.row2-left {
					white-space: nowrap;
				}
			}
		}
	}
</style>
