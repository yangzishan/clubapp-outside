<!--
 * @Author: your name
 * @Date: 2020-09-25 17:23:28
 * @LastEditTime: 2020-09-27 12:34:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xlxt-app\src\components\livingnew\components\live-header.vue
-->
<template>
  <div class="live-header">
    <span class="throw-left left" @click="goBack" data-sensors-click></span>
    <span class="throw-left play" @click="goHistory" data-sensors-click></span>
    <tabs
      el=".live-header"
      :tabs="tabs"
      :active="active"
      @changeTabs="changeTab"
    ></tabs>
  </div>
</template>

<script>
export default {
  components: {
    tabs: () => import("@/base/Tabs")
  },
  props: {
    active: {
      type: Number,
      default: 0
    }
  },
  data() {
    return { tabs: ["在线直播", "精彩回放"] };
  },
  watch: {},
  computed: {
    activeIndex() {
      return this.active;
    }
  },
  methods: {
    goBack() {
      this.$emit("GoBack");
    },
    goHistory() {
      this.$emit("History");
    },
    changeTab(val) {
      this.$emit("changHeader", val);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.live-header {
  position: relative;
  top: 0;
  right: 0;
  padding: 0 0.88rem;
  z-index: 999;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #f9f9f9;

  .throw-left {
    background-repeat: no-repeat;
    position: absolute;
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    z-index: 99;
    top: 50%;
    transform: translateY(-50%);

    &.left {
      left: 0.34rem;
      background-size: 0.22rem 0.4rem;
      background-image: url("../../../assets/back.png");
    }

    &.play {
      right: 0.34rem;
      background-size: 0.4rem 0.4rem;
      background-image: url("../../../assets/live/play.png");
    }
  }
}
</style>
