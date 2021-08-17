<template>
	<div class="loading">
		<img width="24" height="24" :src="require('../assets/loading.gif')">
		<p class="desc">{{title}}</p>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		props: {
			title: {
				type: String,
				default: '正在努力加载...'
			}
		}
	}
</script>
<style scoped lang="scss" scoped rel='stylesheet/scss'>
	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.2rem 0;
		width: 100%;
		img{
			margin-right: 0.1rem;
		}
		.desc {
			line-height: 0.24rem;
			font-size: 0.22rem;
			color: #414040;
		}
	}
</style>
