<template>
  <ul class="live-list-wrapper">
    <li
      class="item-info"
      v-for="(item, index) in data"
      :key="index"
      data-sensors-click
      @click.stop="clickItem(item, index)"
    >
      <div class="img-com" data-sensors-click>
        <img class="live-url" v-lazy="item.CoverUrl" data-sensors-click />
        <div
          v-show="item.IsLive == 1"
          class="top"
          :class="initClass(item.LiveStatus)"
        >
          <span class="bg" alt="" />
          <p class="info">
            <img
              v-if="item.LiveStatus == 1"
              class="living-bg"
              src="../img/living.gif"
              alt=""
            /><span class="text" v-if="item.LiveStatus != -1">{{
              liveType[item.LiveStatus].lable
            }}</span>
          </p>
        </div>
        <div class="bottom" v-if="item.IsLive == 1">
          <p class="live-info">直播时间：{{ initTime(item.StartTime) }}</p>
        </div>
      </div>

      <p class="title one-hang">{{ item.LiveName }}</p>
      <div class="teacher">
        <p class="left one-hang name">{{ item.TeacherName }}</p>
        <p class="right">
          <span class="hot"></span
          ><span class="num">{{ item.LivePlayBackCount }}</span>
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
import util from "@/common/js/util.js";

export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    IsLive: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      liveType: [
        {
          img: "../img/live.png",
          lable: "即将开始"
        },
        {
          img: "../img/living.png",
          lable: "正在直播"
        },
        {
          img: "../img/end.png",
          lable: "已结束"
        }
      ]
    };
  },
  filters: {},
  methods: {
    clickItem(item, index) {
      this.$emit("clickItem", item, index);
      this.$emit("searchItemClickMD", "直播", item.LiveName, index);
    },
    initTime(time) {
      const day = time.split(" ")[0];
      const hoser = this.$moment(time).format("LT");
      const week = this.$moment(time)
        .format("dddd")
        .slice(2);
      return `${day} (周${week}) ${hoser}`;
    },
    initClass(LiveStatus) {
      return `top-${LiveStatus}`;
    }
  }
};
</script>

<style scoped="scoped" lang="scss">
.live-list-wrapper {
  width: 100%;
  .item-info {
    margin-bottom: 0.4rem;
    .img-com {
      position: relative;
      font-size: 0;
    }
    .live-url {
      width: 100%;
      height: 3.86rem;
      border-radius: 0.2rem;
    }
    .title {
      margin: 0.2rem 0;
      font-size: 0.32rem;
      font-weight: 600;
      color: #333;
      line-height: 0.45rem;
    }
    .teacher {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #848484;
      font-size: 0;
      .left {
        font-size: 0.24rem;
        line-height: 0.33rem;
      }
      .right {
        display: flex;
        align-items: center;
        padding-right: 0.14rem;
        .hot {
          width: 0.24rem;
          height: 0.28rem;
          display: inline-block;
          background: url("../img/hot.png") center no-repeat;
          background-size: 0.24rem 0.28rem;
          margin-right: 0.14rem;
        }
        .num {
          font-size: 0.24rem;
        }
      }
    }
    .top {
      position: absolute;
      top: 0;
      right: 0;
      height: 0.5rem;
      .bg {
        display: inline-block;
        height: 0.5rem;
        width: 100%;
      }
      .info {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        font-size: 0;
        text-align: center;
        .living-bg {
          width: 0.25rem;
          height: 0.25rem;
          margin-right: 0.09rem;
        }
      }
      .text {
        font-size: 0.24rem;
        line-height: 0.5rem;
        color: #fff;
      }
      &.top-0 {
        width: 1.56rem;
        .bg {
          background: url("../img/live.png") center no-repeat;
          background-size: 1.56rem 0.5rem;
        }
      }
      &.top-1 {
        width: 1.96rem;
        .bg {
          background: url("../img/living.png") center no-repeat;
          background-size: 1.96rem 0.5rem;
        }
      }
      &.top-2 {
        width: 1.32rem;
        .bg {
          background: url("../img/end.png") center no-repeat;
          background-size: 1.32rem 0.5rem;
        }
      }
    }
    .bottom {
      width: 100%;
      height: 0.56rem;
      display: flex;
      align-items: center;
      position: absolute;
      border-radius: 0 0 0.2rem 0.2rem;
      background: rgba($color: #0f0f0f, $alpha: 0.7);
      padding-left: 0.3rem;
      bottom: 0px;
      .live-info {
        position: absolute;
        font-size: 0.3rem;
        color: #fff;
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
