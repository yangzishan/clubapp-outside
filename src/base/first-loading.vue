<template>
  <transition name="fade">
    <div class="wrapper" v-show="showFirst">
      <img :src="require('../assets/first-loading.gif')" alt="" />
      <p class="text" v-if="text">{{ text }}</p>
    </div>
  </transition>
</template>
<script>
/*
 * @Author:Lee
 * @Date: 2019-12-13 13:20:05
 * @info: 列表页首次加载loading页 loading最小loading时间为 400ms
 * showFirstLoading 默认进入显示loading  接口有返回后 将 showFirstLoading 设置为false
 */
export default {
  components: {},
  props: {
    showFirstLoading: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      show: true,
      showFirst: true,
      timeOut: null
    };
  },
  methods: {
    _initTime() {
      this.timeOut = setTimeout(() => {
        this.show = false;
      }, 400);
    }
  },
  watch: {
    showFirstLoading() {
      //接口已返回
      if (!this.show) {
        this.showFirst = false;
      }
    },

    show() {
      //最小 loading 时间已结束
      if (!this.showFirstLoading) {
        this.showFirst = false;
      }
    }
  },
  mounted() {
    this._initTime();
  },
  destroyed() {
    //销毁定时器
    clearTimeout(this.timeOut);
  }
};
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 1990;
  img {
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .text {
    text-align: center;
    width: 100%;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.3rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #848484;
  }
}
</style>
