<template>
  <div ref="wrapper">
    <div>
      <div
        class="loading-img"
        :class="{ hide: !showLoading }"
        v-if="showLoading"
      >
        <img src="../assets/down.gif" alt="" />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script type="es6">
import BScroll from 'better-scroll'
// 下拉刷新功能  需要传入 pullDown true  开启下拉刷新 listenScroll true 开启监听实时滚动    子组件 监听 @scroll 事件 具体实现查看 read-index 页
export default {
	props: {
		probeType: {
			type: Number,
			default: 1
		},
		click: {
			type: Boolean,
			default: true
		},
		listenScroll: {
			type: Boolean,
			default: false
		},
		data: {
			type: Array,
			default: null
		},
		pullup: {
			type: Boolean,
			default: false
		},
		beforeScroll: {
			type: Boolean,
			default: false
		},
		refreshDelay: {
			type: Number,
			default: 20
		},
		scrollX: {
			type: Boolean,
			default: false
		},
		scrollY: {
			type: Boolean,
			default: true
		},
		pullDown: {
			type: Boolean,
			default: false
		},
		bounce: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			showLoading: false
		}
	},
	mounted() {
		setTimeout(() => {
			this._initScroll()
		}, 20)
	},
	methods: {
		_initScroll() {
			if (!this.$refs.wrapper) {
				return
			}
			var initObg = {
				probeType: this.probeType,
				click: this.click,
				useTransition: false,
				scrollY: this.scrollY,
				scrollX: this.scrollX,
				bounce: this.bounce
			}
			if (this.pullDown) {
				initObg = {
					probeType: this.probeType,
					click: this.click,
					scrollY: this.scrollY,
					useTransition: false,
					scrollX: this.scrollX,
					bounce: this.bounce,
					pullDownRefresh: {
						threshold: 40,
						stop: 40 //向下的距离
					},
				}
			}
			if(this.pullup) {
                Object.assign(initObg, {
					pullUpLoad: {
						threshold: 50
					 }
				})
			}
			this.scroll = new BScroll(this.$refs.wrapper, initObg);
			if (this.listenScroll) {
				let me = this;
				this.scroll.on('scroll', (pos) => {
					me.$emit('scroll', pos)
				})
			}
			if (this.pullup) {
				this.scroll.on('scrollEnd', () => {
					if (this.scroll.y != 0 && this.scroll.y <= (this.scroll.maxScrollY + 50)) {
						this.$emit('scrollToEnd')
					}
				})
			}
			if (this.beforeScroll) {
				this.scroll.on('beforeScrollStart', () => {
					this.$emit('beforeScroll')
				})
			}
		},
		disable() {
			this.scroll && this.scroll.disable()
		},
		enable() {
			this.scroll && this.scroll.enable()
		},
		refresh() {
			this.scroll && this.scroll.refresh()
		},
		scrollTo() {
			this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
		},
		scrollToElement() {
			this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
		},
		finishPullDown() {
			this.scroll && this.scroll.finishPullDown()
			this.showLoading = false
			this.refresh()
		},
		stop() {
			this.scroll && this.scroll.stop()
		},
	},
	watch: {
		data: {
			immediate: true,
			handler(val) {
				setTimeout(() => {
					let imgs = document.querySelectorAll('img')
					imgs.forEach(item => {
						item.onload =()=> {
							this.refresh && this.refresh()
						}
					})
				}, this.refreshDelay)
			}
		}
	}
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
.loading-img {
  transition: height 2s;
  width: 100%;
  height: 0.3rem;
  text-align: center;
  img {
    height: 0.3rem;
  }
  &.showLoading {
    height: 0;
  }
}
</style>
