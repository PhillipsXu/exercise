<template>
	<view>
		<userinfo v-if="token"></userinfo>
		<login v-else></login>
	</view>
</template>

<script>
	import cartbadge from '../../mixin/tabbar-badge.js';

	export default {
		mixins: [cartbadge],
		data() {
			return {

			}
		},
		computed: {
			token() {
				return this.$store.state.user.token;
			},
			userInfo() {
				return this.$store.state.user.userInfo;
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">

</style>
