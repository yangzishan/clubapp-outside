<template>
  <ul class="historys">
    <li
      class="list-item"
      :key="index"
      v-for="(item, index) in data"
      data-sensors-click
      @click.stop="checkOne(item)"
    >
      <div class="left" data-sensors-click>
        <img v-lazy="item.CoverUrl ? item.CoverUrl : '../img/11.jpg'" alt="" />
        <template v-if="item.IsLive == 1">
          <p class="living" v-if="item.LiveStatus == 1">
            <span class="bg"></span>
            <span class="text">正在直播</span>
          </p>
          <p class="living living0" v-else-if="item.LiveStatus == 0">
            <span class="text">即将开始</span>
          </p>
          <p class="living living2" v-else-if="item.LiveStatus == 2">
            <span class="text">已结束</span>
          </p></template
        >
      </div>
      <div class="right">
        <p class="title two-hang">
          {{ item.LiveName }}
        </p>
        <div class="botton">
          <p class="teacher-left">
            <span class="teacher one-hang">{{
              item.TeacherName ? item.TeacherName : "暂无讲师"
            }}</span>
            <span class="time">{{ initTime(item.AttendTime) }}</span>
          </p>
          <p class="find-btn" data-sensors-click @click.stop="findSome(item)">
            找相似
          </p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import util from "@/common/js/util.js";

export default {
  components: {},
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    findSome(item) {
      this.$emit("recommend", item);
    },
    // 格式化时间
    initTime(dateTimeStamp) {
      var second = 1000;
      var minute = 1000 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      var halfamonth = day * 15;
      var month = day * 30;
      var year = month * 12;
      if (dateTimeStamp == undefined) {
        return false;
      } else {
        dateTimeStamp = dateTimeStamp.replace(/\-/g, "/");
        var sTime = new Date(dateTimeStamp).getTime();
        var now = new Date().getTime();
        var diffValue = now - sTime;
        if (diffValue < 0) {
          return dateTimeStamp;
        }
        var yearC = diffValue / year;
        var monthC = diffValue / month;
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;
        var secondC = diffValue / second;
        if (yearC > 1) {
          return util.jsonDateFormatAllTime6(sTime);
        } else if (dayC > 1) {
          return util.jsonDateFormatAllTime5(sTime);
        } else if (hourC > 1) {
          return parseInt(hourC) + "小时之前";
        } else if (minC > 1) {
          return parseInt(minC) + "分钟之前";
        } else if (secondC > 1) {
          return parseInt(secondC) + "秒之前";
        } else {
          return "刚刚";
        }
      }
    },
    // 点击someone
    checkOne(item) {
      this.$emit("clickOne", item);
    }
  },
  filters: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.historys {
  .list-item {
    margin-bottom: 0.4rem;
    display: flex;
    .left {
      width: 3.14rem;
      height: 1.76rem;
      margin-right: 0.2rem;
      flex: 0 0 3.14rem;
      position: relative;
      img {
        width: 3.14rem;
        height: 1.76rem;
        border-radius: 0.2rem;
      }
      .living {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.42rem;
        height: 0.4rem;
        background: url("../img/living.png") center no-repeat;
        background-size: 1.42rem 0.4rem;
        position: absolute;
        right: 0;
        top: 0;
        font-size: 0;
        .bg {
          display: inline-block;
          width: 0.2rem;
          height: 0.2rem;
          background: url("../img/living.gif") center no-repeat;
          background-size: 0.2rem 0.2rem;
        }
        .text {
          font-size: 0.2rem;
          color: #fff;
          margin-left: 0.04rem;
        }
      }
      .living0 {
        width: 1.22rem;
        background: url("../img/live.png") center no-repeat;
        background-size: 1.22rem 0.4rem;
      }
      .living2 {
        width: 1.22rem;
        background: url("../img/end.png") center no-repeat;
        background-size: 1.22rem 0.4rem;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      .title {
        font-size: 0.32rem;
        color: #333333;
        line-height: 0.45rem;
        font-weight: 600;
      }
      .botton {
        display: flex;
        justify-content: space-between;
        .teacher-left {
          color: #848484;
          font-size: 0;
          span {
            display: block;
          }
          .teacher {
            display: -webkit-box;
            font-size: 0.26rem;
            line-height: 0.37rem;
            margin-bottom: 0.1rem;
          }
          .time {
            font-size: 0.2rem;
            line-height: 0.28rem;
          }
        }
        .find-btn {
          flex: 0 0 1.1rem;
          align-self: flex-end;
          width: 1.1rem;
          height: 0.46rem;
          line-height: 0.46rem;
          text-align: center;
          color: #fff;
          border-radius: 0.22rem;
          font-size: 0.26rem;
          background: #2f54eb;
        }
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
