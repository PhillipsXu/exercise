<template>
	<view class="search-container">
		<view class="search">
			<uni-search-bar @input="getInfo" @clear="delInfo" @confirm="toGoodsList(keyword)" :radius="15"
				cancelButton="none" clearButton="auto" focus maxlength="30" />
		</view>
		<view class="history" v-if="historyList.length > 0">
			<view class="top">
				<text>搜索历史</text>
				<uni-icons type="trash" size="18" @click="delHistory"></uni-icons>
			</view>
			<view class="bottom">
				<view class="item" v-for="(item, index) in historyList" :key="index" @click="toGoodsList(item)">{{item}}
				</view>
			</view>
		</view>
		<scroll-view class="suggest-list">
			<view class="suggest-item" v-for="(item, index) in SearchSuggest" :key="index"
				@click="toGoodsDetail(item.goods_id)">
				<text class="text">{{item.goods_name}}</text>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				keyword: '',
				SearchSuggest: [],
				historyList: JSON.parse(uni.getStorageSync('keyword') || '[]')
			}
		},
		methods: {
			getInfo(e) {
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.keyword = e.trim();
					this.getSearchSuggest();
					if (this.keyword.trim() !== '') {
						this.saveHistory();
					}
				}, 500)
			},
			delInfo() {
				this.SearchSuggest = [];
			},
			saveHistory() {
				if (this.keyword.trim() !== '') {
					this.historyList.unshift(this.keyword);
					let hSet = new Set(this.historyList);
					this.historyList = Array.from(hSet);
					uni.setStorageSync('keyword', JSON.stringify(this.historyList));
				}
			},
			delHistory() {
				this.historyList = [];
				uni.removeStorageSync('keyword');
			},
			async getSearchSuggest() {
				let res = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: this.keyword
				});
				if (res.statusCode !== 200) return uni.$showMsg();
				res = res.data.message;
				this.SearchSuggest = res;
			},
			toGoodsDetail(id) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + id
				})
			},
			toGoodsList(e) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + e
				})
				this.saveHistory();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-container {
		$main-color: #c00000;
		width: 100%;

		.history {

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 10px;
				padding-bottom: 10px;
				border-bottom: 1px solid #ccc;
			}

			.bottom {
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;
				align-items: center;
				margin: 0 10px;

				.item {
					background-color: rgba(200, 200, 200, 0.2);
					padding: 5px;
					margin: 0 5px;
					border-radius: 10%;
				}
			}
		}

		.search {
			position: sticky;
			top: 0;
			z-index: 99;
			width: 100%;
		}

		.suggest-list {
			width: 100%;
			padding: 0 10px;
			box-sizing: border-box;

			.suggest-item {
				font-size: 14px;
				line-height: 28px;
				border-bottom: .5px solid #ccc;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 10px 0;

				.text {
					width: 90%;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>
