<template>
	<view class="search" :style="{'background-color': bgcolor}" @click="goSearch">
		<view class="search-box" :style="{'border-radius': radius + 'px'}">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="text">{{search}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "search",
		data() {
			return {
				search: '搜索'
			}
		},
		props: {
			bgcolor: {
				type: String,
				default: '#c00000'
			},
			radius: {
				type: Number,
				default: 15
			}
		},
		methods: {
			goSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		// background-color: #c00000; props控制
		height: 50px;
		padding: 0 10px;
		display: flex;
		align-items: center;
		position: sticky;
		top: 0;
		z-index: 99;

		.search-box {
			height: 36px;
			background-color: #ffffff;
			// border-radius: 15px; props控制
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.text {
				font-size: 15px;
				margin-left: 5px;
			}
		}
	}
</style>
