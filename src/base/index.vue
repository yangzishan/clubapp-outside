<template>
	<div>
		<!-- <transition :name="transitionName">
				<keep-alive v-if="$route.meta.keepAlive">
					<router-view class='child-view' />
				</keep-alive>
				<router-view class='child-view' v-if="!$route.meta.keepAlive"/>
		</transition> -->
		<transition :name="transitionName">
			<keep-alive>
				<router-view class='child-view' v-if="$route.meta.keepAlive === true"/>
			</keep-alive>
		</transition>
		<transition :name="transitionName">
			<router-view class='child-view' v-if="!$route.meta.keepAlive"/>
		</transition>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				 transitionName: 'slide-left'
			}
		},
		//实现路由得前进后退动画
		watch: {
			'$route'(to, from) {
				if(to.meta.showBottomTabs){
					this.showBottom = true
				}else{
					this.showBottom = false
				}
				if (to.meta.index < from.meta.index) {
					this.transitionName = 'slide-left';
				} else {
					this.transitionName = 'slide-right';
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.child-view {
		transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
	}

	.slide-left-enter,
	.slide-right-leave-active {
		opacity: 0;
		transform: translate(0%, 0);
	}

	.slide-left-leave-active,
	.slide-right-enter {
		opacity: 0;
		transform: translate(100%, 0);
	}
</style>
