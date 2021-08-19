<template>
  <div id="app">
    <transition :name="transitionName">
      <!-- <keep-alive> -->
      <router-view class="child-view" />
      <!-- </keep-alive> -->
    </transition>
    <audio
      v-if="mp3Url"
      ref="audio"
      :src="mp3Url"
      @ended="end"
      @play="ready"
      @timeupdate="updateTime"
    ></audio>
  </div>
</template>

<script>
import util from "@/common/js/util";
import storage from "good-storage";
import { mapGetters, mapActions, mapMutations } from "Vuex";
import { GetAppMemberInfo, GetAppEnterpriseInfo } from "@/api/lee-sever.js";
import { GetSessionUserInfo } from "@/api/rf-sever";
export default {
  name: "App",
  components: {},
  data() {
    return {
      index: 0,
      transitionName: "slide-left",
      timer: "",
      imgURL: "",
      mp3Url: ""
    };
  },
  computed: {
    ...mapGetters(["playState", "mp3Info", "percent", "songReady"])
  },
  mounted() {
    let noSleep = new this.$NoSleep();
    document.addEventListener(
      "click",
      function enableNoSleep() {
        noSleep.enable();
        document.removeEventListener("click", enableNoSleep, false);
      },
      false
    );
  },
  //实现路由得前进后退动画
  watch: {
    $route(to, from, next) {
      document.title = to.name;
      this.Key = new Date().getTime();
      if (to.meta.index < from.meta.index) {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    },
    playState(newPlaying) {
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause();
      });
    },
    mp3Info(newVal) {
      const audio = this.$refs.audio;
      this.mp3Url = "https://img.xlxt.net/" + newVal.Url;
      if (newVal.Type == 4 && newVal.Url)
        this.$nextTick(() => {
          audio && audio.play();
          setTimeout(() => {
            this.setSongTime(newVal.TimeLength.toFixed(0));
          }, 500);
        });
      else {
        this.$refs.openSnack.openColorSnackbar(
          2,
          "课件为空,无法播放,已自动切换"
        );
        this.nextSong();
      }
    },
    percent(newVal) {
      const audio = this.$refs.audio;
      const currentTime = audio.duration * newVal;
      audio.currentTime = currentTime;
    }
  },
  async created() {
    let enterpriseInfo = await GetAppEnterpriseInfo();
    let memberInfo = await GetAppMemberInfo();
    if (memberInfo.Code == 200) {
      let member = storage.get(memberInfo)
        ? storage.get(memberInfo).AppUserID
        : "";
      if (memberInfo.Data.AppUserID !== member) {
        storage.remove("memberInfo");
        storage.remove("UserDep");
      }
      storage.set("memberInfo", memberInfo.Data);
      if (memberInfo.Data.Type != 1) {
        let userdep = storage.get("UserDep");
        if (!userdep) {
          let dep = await GetSessionUserInfo();
          if (dep.Code === 200 && dep.Data) {
            storage.set("UserDep", dep.Data);
          }
        }
      }
    } else {
      util.delCookie("u");
      util.delCookie("k");
      storage.remove("memberInfo");
      storage.remove("UserDep");
      this.$router.push("/knowledge");
    }
  },
  methods: {
    //监听mp3 播放
    end() {
      this.setPlay(false);
      this.nextSong();
      if (this.mp3Info.Type != 4 || !this.mp3Info.Url) {
        this.$refs.openSnack.openColorSnackbar(2, "课件为空,已自动切换");
        setTimeout(() => {
          this.end();
        }, 300);
      }
    },
    ready() {
      this.setSongReady(true);
    },
    error() {
      this.setSongReady(true);
    },
    //监听mp3 播放
    updateTime(e) {
      const currentTime = e.target.currentTime;
      this.setCurrentTime(currentTime);
    },
    ...mapActions(["nextSong"]),
    ...mapMutations({
      setSongTime: "SET_SONG_TIME",
      setCurrentTime: "SET_CURRENTTIME",
      setPlay: "SET_PLAY_STATE",
      setSongReady: "SET_SONG_READY"
    })
  }
};
</script>
<style>
.mu-raised-button {
  box-shadow: none !important;
}
</style>
<style lang="scss">
@import "common/css/index.scss";
#nprogress /deep/ .bar {
  top: 0.88rem !important;
}

#nprogress /deep/ .peg {
  display: none;
}

#app {
  height: 100%;
  .bottom-nav {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}

.child-view {
  position: absolute;
  top: 0;
  width: 100%;
  overflow: hidden;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    display: none;
  }
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
