<template>
  <div class="live-state" @click="clickState">
    <div class="wrapper">
      <p class="info-text">{{ liveText }}</p>
      <p class="time" v-if="state == 0">{{ time }}</p>
      <p class="btn" v-if="state == -1 || state == 3 || state == 5">
        <span class="text" @click.stop="reload">刷新</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    // state 0 即将开始 1 正在直播 2 已结束
    state: {
      type: Number,
      defaule: 0
    },
    time: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    // state 0 即将开始 1 正在直播 2 已结束 -1 未推流
    liveText() {
      switch (this.state) {
        case -1:
          return "讲师准备中...";
          break;
        case 0:
          return "直播开始时间";
          break;
        case 2:
          return "直播已结束";
          break;
        case 3:
          return "讲师准备中…";
          break;
        case 4:
          return "直播已下架";
          break;
        case 5:
          return "网络不给力";
          break;
      }
    }
  },
  methods: {
    // 刷新当前页
    reload() {
      this.$emit("reloadPage");
    },
    // 点击了转态蒙版
    clickState() {
      this.$emit("_clickState");
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.live-state {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba($color: #000000, $alpha: 0.5);
  z-index: 110;
  .wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    z-index: 11;
    font-size: 0;
    text-align: center;
    .info-text,
    .time {
      font-size: 0.3rem;
      line-height: 0.42rem;
    }
    .time {
      margin-top: 0.08rem;
    }
    .btn {
      text-align: center;
      .text {
        margin-top: 0.34rem;
        width: 1.5rem;
        height: 0.5rem;
        line-height: 0.5rem;
        color: #2f54eb;
        border-radius: 0.25rem;
        background: #fff;
        font-size: 0.3rem;
        display: inline-block;
      }
    }
  }
}
</style>
