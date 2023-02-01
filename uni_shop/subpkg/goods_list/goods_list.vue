<template>
	<view class="goods-container">
		<goods-item :item="item" v-for="(item, index) in goodsList" :key="index"></goods-item>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsInfo: {},
				goodsList: [],
				pageNum: 1,
				query: '',
				id: 0,
				isLoading: false
			}
		},
		methods: {
			async getGoods(query, id = 0, page = 1) {
				this.isLoading = true;
				let res;
				if (id) {
					res = await uni.$http.get('/api/public/v1/goods/search', {
						query: query,
						cid: id,
						pagenum: page
					}, )
				} else {
					res = await uni.$http.get('/api/public/v1/goods/search', {
						query: query,
						pagenum: page
					})
				}
				if (res.statusCode !== 200) return uni.$showMsg();
				res = res.data.message;
				this.goodsInfo = res;
				this.goodsList = this.goodsList.concat(this.goodsInfo.goods);
				setTimeout(() => {
					this.isLoading = false;
				}, 500)
			},
			saveNumber(n) {
				return n.toFixed(2)
			}
		},
		onLoad(options) {
			this.query = options.query;
			this.id = options.id;
			this.getGoods(this.query, this.id);
		},
		onReachBottom() {
			if (this.isLoading) return
			if (this.goodsList.length < this.goodsInfo.total) {
				this.pageNum++;
				this.getGoods(this.query, this.id, this.pageNum);
			}
		},
		onPullDownRefresh() {
			if (this.isLoading) return
			this.pageNum = 1;
			this.goodsInfo = {};
			this.goodsList = [];
			this.getGoods(this.query, this.id);
			uni.stopPullDownRefresh();
		}
	}
</script>

<style lang="scss" scoped>

</style>
