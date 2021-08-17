<template>
  <div class="player" :style="BgStyle">
    <div class="prism-player" id="J_prismPlayer"></div>
    <slot name="tipe"></slot>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    LiveInfo: {
      type: Object,
      default: {
        AttendID: "",
        BarrageCount: 0,
        CoverUrl: "",
        DepartMentId: 0,
        DepartMents: null,
        DepartmentName: null,
        EndTime: "",
        FirePower: 0,
        Host: "",
        Introduction: "",
        IsCode: 0,
        IsLive: 1,
        IsOnline: 0,
        IsPwd: false,
        Labels: "",
        LabelsName: null,
        LiveName: "",
        LivePlayBackCount: 0,
        LiveSeeCount: 0,
        LiveStatus: 2,
        MajorNames: "",
        OnlinePeople: 0,
        Price: null,
        Pwd: null,
        Sort: 0,
        StartTime: "",
        TeacherID: 0,
        TeacherImg: "",
        TeacherIntroduce: "",
        TeacherName: "",
        Uid: ""
      }
    },
    // 直播流
    StreamName: {
      type: String,
      default: ""
    },
    // 弹幕组件list
    messageList: {
      trpe: Array,
      default: () => []
    },
    // 录播ID
    VideoID: {
      type: String,
      default: ""
    },
    // 播放鉴权
    PlayAuth: {
      type: String,
      default: ""
    },
    videoListArry: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return { player: null, played: true };
  },
  watch: {
    StreamName() {
      // 直播
      this._initLive(1);
    },
    PlayAuth() {
      // 录播
      this._initLive(0);
    }
  },
  computed: {
    BgStyle() {
      return {
        background: `url(${this.LiveInfo.CoverUrl}) center no-repeat`
      };
    }
  },
  methods: {
    /**
     * @function 初始化player
     * @param {Number} type 1 直播 0 录播
     */
    _initLive(type) {
      const _this = this;
      const liveConfig = {
        isLive: true,
        source: this.StreamName,
        liveRetry: 30,
        skinLayout: [
          {
            name: "bigPlayButton",
            align: "cc",
            x: 30,
            y: 80
          },
          {
            name: "controlBar",
            align: "blabs",
            x: 0,
            y: 0,
            children: [
              {
                name: "liveDisplay",
                align: "tlabs",
                x: 15,
                y: 6
              },
              {
                name: "fullScreenButton",
                align: "tr",
                x: 10,
                y: 10
              },
              {
                name: "volume",
                align: "tr",
                x: 5,
                y: 10
              },
              { name: "progress", align: "tlabs", x: 10000, y: 0 }
            ]
          }
        ]
      };
      const videoConfig = {
        isLive: false,
        vid: this.VideoID,
        playauth: this.PlayAuth,
        qualitySort: "asc",
        format: "mp4",
        mediaType: "video",
        isLive: false,
        rePlay: false,
        playsinline: true,
        preload: true,
        cover: this.LiveInfo.CoverUrl,
        skinLayout: [
          {
            name: "bigPlayButton",
            align: "cc",
            x: 30,
            y: 80
          },
          {
            name: "controlBar",
            align: "blabs",
            x: 0,
            y: 0,
            children: [
              {
                name: "progress",
                align: "blabs",
                x: 0,
                y: 44
              },
              {
                name: "playButton",
                align: "tl",
                x: 15,
                y: 12
              },
              {
                name: "timeDisplay",
                align: "tl",
                x: 10,
                y: 7
              },
              {
                name: "fullScreenButton",
                align: "tr",
                x: 10,
                y: 12
              },
              {
                name: "volume",
                align: "tr",
                x: 5,
                y: 10
              },
              {
                name: "setting",
                align: "tr",
                x: 15,
                y: 12
              }
            ]
          }
        ]
      };
      const baseConfig = {
        id: "J_prismPlayer",
        width: "100%",
        height: "3.92rem",
        autoplay: false,
        useH5Prism: true,
        x5_fullscreen: false,
        // x5_type: "h5", // 不启用同层播放，设置为h5 则为启用 安卓手机不能配置改选项
        qualitySort: true,
        controlBarVisibility: "click",
        showBarTime: "5000" //配合click使用
        // components: [
        //   {
        //     name: "AliplayerDanmuComponent",
        //     // eslint-disable-next-line no-undef
        //     type: AliPlayerComponent.AliplayerDanmuComponent,
        //     args: [[]]
        //   }
        // ]
      };
      let params = {};
      // type 1 live 0 video 2 只显示弹幕
      if (type == 1) {
        params = Object.assign(baseConfig, liveConfig);
      } else if (type == 0) {
        params = Object.assign(baseConfig, videoConfig);
      } else {
        params = Object.assign(baseConfig, {
          skinLayout: [
            {
              name: "bigPlayButton",
              align: "cc",
              x: 3000,
              y: 8110
            },
            {
              name: "controlBar",
              align: "blabs",
              x: 0,
              y: 10000
            }
          ]
        });
      }
      this.player = new Aliplayer(params, function(player) {
        $(".ali-danmuku-control").hide();
        // 解决屏幕控件BUG
        _this._setScreenError();
      });
      // 视频由暂停恢复为播放时触发。
      this.player.on("play", () => {
        this.$emit("clickPlay");
      });
      // 监听开始播放
      this.player.on("playing", () => {
        // $(".player").css("background", "#000000");
        this.$emit("setMark", false);
        if (_this.played) {
          _this.played = false;
          // 抛出当前播放时间
          this.$emit("playing");
        }
      });
      // 将字幕对象抛出 在移动端 如果在 new Aliplayer 中会抛出一个错误导致弹幕无法显示
      this.player.on("canplay", () => {
        const DMModel = _this.player.getComponent("AliplayerDanmuComponent");
        _this.$emit("canplay");
        _this.$emit("AliMessage", DMModel);
      });
      // 当前视频播放完毕时触发显示点击播放下一个 所有都播放玩了 就显示播放结束 显示封面
      this.player.on("ended", function() {
        const DMModel = _this.player.getComponent("AliplayerDanmuComponent");
        // 清空上一次的弹幕
        DMModel.CM.timeline = [];
        $(".current-time").html("00:00");
        _this.played = true;
        _this.$emit("changeVID");
      });
      // 监听播放出错
      this.player.on("error", function(err) {
        _this.$emit("liveError", -1);
      });
      // 直播流中断时触发m3u8/flv/rtmp在重试5次未成功后触发。  直播断流会触发
      this.player.on("liveStreamStop", () => {
        _this.$emit("liveError", -1);
      });
      // m3u8直播流中断后重试事件，直播断网会触发
      this.player.on("onM3u8Retry", () => {
        _this.$emit("liveError", -1);
      });
      // 控制栏自动隐藏事件。
      this.player.on("hideBar", () => {
        this.$emit("showOrHideBar", false);
        if (_this.player.getVolume() == 0) {
          _this.$emit("requestFullScreen", "静音");
        }
      });
      // 控制栏自动显示事件
      this.player.on("showBar", () => {
        _this.$emit("showOrHideBar", true);
      });
      // 全屏事件，仅H5支持。
      this.player.on("requestFullScreen", () => {
        _this.$emit("requestFullScreen", "全屏");
      });
      // 取消全屏事件，iOS下不会触发，仅H5支持。
      this.player.on("cancelFullScreen", () => {
        _this.$emit("requestFullScreen", "取消全屏");
      });
      // 开始拖拽，参数返回拖拽点的时间。
      this.player.on("startSeek", () => {
        _this.$emit("requestFullScreen", "拖动进度条");
      });

      if (type == 2) {
        $(".prism-player").css({
          background: "none"
        });
        setTimeout(() => {
          const DMModel = _this.player.getComponent("AliplayerDanmuComponent");
          $(".prism-player").css({
            background: "none"
          });
          $(".aliplayer-danmuku.abp .danmu").css("z-index", "100");
          _this.$emit("AliMessage", DMModel, type);
        }, 2000);
      }
    },
    // 解决屏幕控件BUG
    _setScreenError() {
      const _this = this;
      $(".aliplayer-danmuku").click(() => {
        const state = $(".prism-setting-list").css("display");
        state == "block" ? $(".prism-setting-list").hide() : "";
      });
      $(".prism-setting-speed").click(() => {
        setTimeout(() => {
          $(".selector-list li").click(() => {
            _this.$emit("requestFullScreen", "倍速播放");
            $(".prism-speed-selector").hide();
          });
        }, 100);
      });
      $("video").css({
        width: "4.2rem",
        height: "100%"
      });
      // 解决安卓手机 出现一个大的播放按钮
      setTimeout(() => {
        $("#J_prismPlayer video")
          .attr("poster", _this.LiveInfo.CoverUrl)
          .css({
            width: "100%",
            height: "100%"
          });
      }, 20);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss">
.player {
  .prism-setting-list {
    width: 170px;
    z-index: 10;
    .prism-setting-cc {
      display: none;
    }
    .prism-setting-audio {
      display: none;
    }
  }
  .prism-setting-selector {
    .header {
      display: none !important;
    }
  }
  .prism-player .ali-danmuku-control {
    display: none;
  }
  video {
    object-fit: contain;
  }
}
</style>
