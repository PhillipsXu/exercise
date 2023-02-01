<template>
	<view>
		<view class="login-container">
			<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
			<button type="primary" class="btn-login" open-type="getUserProfile" @click="getUserInfo">一键登录</button>
			<view class="tips-text">登录后尽享更多权益</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "login",
		data() {
			return {

			}
		},
		methods: {
			getUserInfo() {
				uni.getUserProfile({
					desc: '用于登录',
					success: (info) => {
						if (info.errMsg === 'getUserProfile:fail auth deny') return uni.$showMsg('您取消了授权！');
						this.$store.commit('user/GETUSERINFO', info.userInfo);
						this.getToken(info);
					}
				})
			},
			async getToken(info) {
				const [err, res] = await uni.login().catch(err => err);
				if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！');

				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				
				const { data: loginRes } = await uni.$http.post('/api/public/v1/users/wxlogin', query);
				// if (loginRes.meta.status !== 200) return uni.$showMsg('登录失败！');
				uni.$showMsg('登录成功！');
				
				this.$store.commit('user/ADDTOKEN', loginRes.meta.msg.split(':')[2]);
			}
		},
		computed: {
			userInfo() {
				return this.$store.state.user.userInfo;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-container {
		height: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f8f8f8;
		position: relative;
		overflow: hidden;

		&::after {
			content: '';
			display: block;
			position: absolute;
			width: 100%;
			height: 40px;
			left: 0;
			bottom: 0;
			background-color: white;
			border-radius: 100%;
			transform: translateY(50%);
		}

		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #c00000;
		}

		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>
