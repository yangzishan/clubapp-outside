<template>
  <div class="live-message" v-if="data.length">
    <!-- <div class="line"></div> -->
    <ul class="message-wrap">
      <li class="list-item" v-for="(item, index) in data" :key="index">
        <p class="time">{{ turnTime(item.SendTime) }}</p>
        <template v-if="_initIsMe(item)">
          <div class="message-con isself">
            <div class="message-info">
              <p class="name one-hang" :class="{ isboss: item.IsHost }">
                {{
                  item.IsHost
                    ? "主持人"
                    : item.UserName
                    ? item.UserName
                    : "匿名"
                }}
              </p>
              <p
                class="text"
                :class="{
                  isboss: item.IsHost,
                  textPostion: _initPosition(item)
                }"
              >
                {{ item.Content }}
              </p>
            </div>
            <div class="header-img">
              <img
                v-lazy="
                  item.UserImg
                    ? _initHeaderImg(`${item.UserImg}`)
                    : 'https://img.xlxt.net//defaultphotos/10-01.png'
                "
                alt=""
              />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="message-con">
            <div class="header-img">
              <img
                v-lazy="
                  item.UserImg
                    ? _initHeaderImg(`${item.UserImg}`)
                    : 'https://img.xlxt.net//defaultphotos/10-01.png'
                "
                alt=""
              />
            </div>
            <div class="message-info">
              <p class="name one-hang" :class="{ isboss: item.IsHost }">
                {{
                  item.IsHost
                    ? "主持人"
                    : item.UserName
                    ? item.UserName
                    : "匿名"
                }}
              </p>
              <p class="text" :class="{ isboss: item.IsHost }">
                {{ item.Content }}
              </p>
            </div>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import util from "@/common/js/util.js";
import storage from "good-storage";

export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {},
  data() {
    return {
      time: null,
      time2: null
    };
  },
  mounted() {
    // 处理在苹果浏览器中的兼容
    if (util.isSafari() && !util.isWeiXin()) {
      $(".message-wrap").css("padding-bottom", "1.68rem");
    }
    this.time2 = setTimeout(() => {
      this._time();
    }, 2000);
  },
  methods: {
    /**
     * @function 实时更新时间
     */
    _time() {
      this.time = setInterval(() => {
        this.data.forEach((item, index) => {
          // eslint-disable-next-line no-undef
          let text = util.dateFormat(item.SendTime);
          if (text != "刚刚") {
            text = `${text}之前`;
          }
          $(".list-item > .time")
            .eq(index)
            .html(this.turnTime(item.SendTime));
          // .html(this.isiOS() ? text : this.getDate(item.SendTime));
        });
      }, 10000);
    },
    turnTime(time) {
      let text = util.dateFormat(time);
      if (text != "刚刚") {
        text = `${text}之前`;
      }
      if (this.isiOS() && text.includes("date")) {
        text = "刚刚";
      }
      let val = this.isiOS() ? text : this.getDate(time);
      return val;
    },
    checkBoss(AppUserID) {
      return this.bossList.includes(AppUserID);
    },
    // 处理头像地址
    _initHeaderImg(imgUrl) {
      return util._initHeaderImg(imgUrl);
    },
    // 检查是不是我自己
    _initIsMe({ UserID }) {
      const memberInfo = storage.get("memberInfo");
      if (memberInfo && memberInfo.AppUserID == UserID) {
        return true;
      }
      return false;
    },
    getDate(dateTimeStamp) {
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
    // 让文字靠左还是靠右
    _initPosition({ Content }) {
      if (Content.length < 16) return true;
    },
    _initWidth({ Content }) {
      let width = "";
      if (Content.length < 18) {
        let width = Content.length * 20 + 10;
        // return `width:${width}px`;
        return `width:auto`;
      }
    },
    // 判断是不是ios
    isiOS() {
      const u = navigator.userAgent;
      return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    }
  },
  destroyed() {
    this.time && clearInterval(this.time);
    this.time2 && clearTimeout(this.time2);
  }
};
</script>
<style scoped="scoped" lang="scss">
.message-wrap {
  overflow: hidden;
  padding: 0.3rem 0.3rem 0.88rem 0.3rem;
  .list-item {
    margin-bottom: 0.5rem;
    display: block;
    &:last-child {
      margin-bottom: 0.8rem;
    }
    .time {
      text-align: center;
      font-size: 0.24rem;
      color: #848484;
      line-height: 0.33rem;
      margin-bottom: 0.2rem;
    }
    .message-con {
      display: flex;
      .header-img {
        width: 0.9rem;
        height: 0.9rem;
        margin-right: 0.2rem;
        flex: 0 0 0.9rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .message-info {
        width: 100%;
        position: relative;
        padding-right: 0.2rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 0;
        .name {
          font-size: 0.26rem;
          color: #666666;
          line-height: 0.37rem;
          margin-bottom: 0.1rem;
          span {
            padding: 0.04rem;
            display: inline-block;
            border-radius: 0.1rem;
          }
          &.isboss {
          }
        }
        .text {
          // position: absolute;
          bottom: 0;
          bottom: -0.1rem;
          font-size: 0.3rem;
          color: #333333;
          line-height: 0.37rem;
          background: #f9f9f9;
          padding: 0.11rem 0.14rem;
          border-radius: 0px 0.16rem 0.16rem 0.16rem;
          word-break: break-all;
          word-wrap: break-word;
          span {
            display: inline-block;
            max-width: 4.6rem;
            text-align: justify;
            text-justify: newspaper;
            word-break: break-all;
          }
          &.isboss {
            background: #2f54eb;
            color: #fff;
          }
        }
      }
      &.isself {
        justify-content: flex-end;
        .message-info {
          align-items: flex-end;
        }
        .name {
          text-align: right;
        }
        .text {
          right: 0;
          text-align: left;
          border-radius: 0.16rem 0px 0.16rem 0.16rem;
          // &:first-line {
          //   text-align: right;
          // }
          &.textPostion {
            text-align: right;
          }
        }
        .header-img {
          margin-right: 0;
          margin-left: 0.2rem;
        }
        .message-info {
          padding: 0;
        }
      }
    }
  }
}
</style>
