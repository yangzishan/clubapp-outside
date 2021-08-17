<template>
  <div class="send-con" @click="showInputView">
    <p class="input-con">
      <span class="login">登录</span>
      <span>{{ textTip }}</span>
    </p>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    textTip: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    showInputView() {
      this.$emit("showLogin");
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.send-con {
  right: 0;
  position: fixed;
  bottom: 0;
  width: 100vw;
  background: rgba(248, 248, 248, 1);
  height: 0.98rem;
  padding: 0.14rem 0.2rem;
  align-items: center;
  display: flex;
  z-index: 10;
  img {
    width: 0.7rem;
    height: 0.7rem;
    margin-right: 0.2rem;
    flex: 0 0 0.7rem;
  }

  .input-con {
    flex: 1;
    text-align: center;
    height: 0.6rem;
    border-radius: 0.1rem;
    padding-left: 0.1rem;
    font-size: 0.24rem;
    color: #cdcdcd;
    background: rgba(255, 255, 255, 1);
    line-height: 0.6rem;
  }
  .login {
    color: #2f54eb;
  }
}
</style>
