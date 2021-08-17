<template>
  <div class="play-live" v-loading="Infoloading">
    <div class="play-wrapper">
      <mu-slide-top-transition>
        <div class="play-header" v-if="showHeader">
          <div class="header-left">
            <span
              class="right click-btn"
              @click="goBack"
              data-sensors-click
            ></span>
          </div>
          <div class="header-right">
            <span
              class="message"
              :class="{ noshow: showMessage }"
              data-sensors-click
              @click="hideDM"
            ></span>
            <span class="fx" data-sensors-click @click="showShare"></span>
          </div>
        </div>
      </mu-slide-top-transition>
      <player
        ref="player"
        :LiveInfo="Info"
        :StreamName="StreamName"
        :messageList="dmList"
        :VideoID="VideoID"
        :PlayAuth="PlayAuth"
        :videoListArry="videoListArry"
        @clickPlay="clickPlay"
        @playing="playing"
        @AliMessage="AliMessage"
        @changeVID="changeVID"
        @liveError="liveError"
        @showOrHideBar="showOrHideBar"
        @setMark="showMark = false"
      >
        <p v-show="tipText" class="tipText" slot="tipe">{{ tipText }}</p>
      </player>
      <live-state
        :state="state"
        :time="Info.time"
        v-if="showMark"
        @reloadPage="reloadPage"
        @_clickState="showOrHideBar(true)"
      />
    </div>
    <div class="live-wrapper">
      <tabs
        el=".play-live"
        :tabs="tabs"
        :active="tabsIndex"
        @changeTabs="changeTabs"
      ></tabs>
      <tab-swiper
        :swiperList="swiperList"
        :activeIndex="tabsIndex"
        @slideChangeSwiper="slideChangeSwiper"
      >
        <scroll slot="live-info" :data="recList" class="info-wrapper">
          <live-info :LiveInfo="Info" />
          <div v-if="!IsLive && recList.length">
            <p class="line"></p>
            <rec-list :data="recList" @clickItem="clickItem" />
          </div>
        </scroll>
        <div slot="comment">
          <scroll
            class="comment-wrapper"
            ref="messageScroll"
            :data="[...commentList, ...liveMessages]"
            :listenScroll="true"
            :pullup="true"
            @scrollToEnd="scrollToEnd"
          >
            <comment
              v-if="Number($route.query.IsLive) == 0"
              :commentList="commentList"
              @replyComment="replyComment"
              @reviewLike="reviewLike"
              @replayLike="replayLike"
            />
            <live-message :data="liveMessages" v-else />
            <loading v-show="hasMore"></loading>
            <no-more v-if="!hasMore && commentList.length && !IsLive"></no-more>
          </scroll>
          <no-result
            v-if="
              (commentList.length == 0 && !IsLive) ||
                (liveMessages.length == 0 && IsLive)
            "
            icon="no-message-icon"
            title="目前还没有任何互动"
          ></no-result>
        </div>
      </tab-swiper>
    </div>
    <mu-slide-bottom-transition>
      <div v-show="tabsIndex && isLogin">
        <div class="btn-input" v-show="!isFocus" @click="setFocus">
          <p>{{ textTip }}</p>
        </div>
        <input-con
          v-show="isFocus"
          ref="inputCon"
          :isFocus.sync="isFocus"
          :text="inputText"
          :maxlength="200"
          @sendMasage="sendMessage"
        />
      </div>
    </mu-slide-bottom-transition>
    <mu-slide-bottom-transition>
      <login-btn
        v-show="tabsIndex && !isLogin"
        :textTip="textTip"
        @showLogin="showLoginBtn"
      />
    </mu-slide-bottom-transition>
    <share
      :isShow.sync="shareVisible"
      :sharetitle="Info.LiveName"
      :shareimgurl="Info.CoverUrl"
      :sharedesc="Info.Introduction"
      :otherParams="otherParams"
      @copyUrl="copyUrl"
    />
    <check-password
      ref="password"
      :visible.sync="visible"
      :psdError.sync="psdError"
      :recLIveID="recLIveID"
      @submit="_initPwd"
    />
    <toast :visible.sync="visibleToast" :text="toastText" />
    <login
      :isShow.sync="showLogin"
      @callback="loginSuccess"
      @closed="closedLogin"
    />
    <tip-button
      tipText="您暂无权限使用此功能"
      :showTip.sync="showTip"
      @click="clickTip"
    />
  </div>
</template>

<script>
import {
  GetLiveInfo,
  GetLiveInfoGF,
  GetPullLiveUrl,
  GetPullLiveUrlGF,
  GetBarrageInfoByUid,
  GetBarrageInfoByUidGF,
  GetComments,
  LivePlayBackLocal,
  LivePlayBackLocalGF,
  GetVideoPlayAuth,
  GetVideoPlayAuthGF,
  GetRecommendLive,
  GetRecommendLiveGF,
  GetLivePlayCount,
  GetLivePlayCountGF,
  GetIsHost,
  GetIsHostGF,
  LeaveRoom
} from "@/api/lee-sever";
import { addLikeNumCommon } from "@/api/lcc-server";
import {
  OK_CODE,
  PULL_NUM,
  PAGESIZE,
  dmClass,
  LIVE_FONT_SIZE
} from "@/common/js/config";
import messageMixin from "./components/massageMixins";
import updateLoginInfo from "@/components/mixins/updateLoginInfo";
import storage from "good-storage";
import checkpassword from "./components/checkpswmixins";
import util from "@/common/js/util";
export default {
  mixins: [messageMixin, checkpassword, updateLoginInfo],
  components: {
    Scroll: () => import("@/base/Scroll"),
    Tabs: () => import("@/base/Tabs"),
    liveInfo: () => import("./components/live-info"),
    TabSwiper: () => import("@/base/tabSwiper"),
    Player: () => import("./components/player"),
    Comment: () => import("@/base/comment"),
    NoResult: () => import("@/base/noResult"),
    InputCon: () => import("@/base/inputCon"),
    LiveState: () => import("./components/live-state"),
    LiveMessage: () => import("./components/live-message"),
    loading: () => import("@/base/loading.vue"),
    NoMore: () => import("@/base/NoMore.vue"),
    Share: () => import("@/base/Share.vue"),
    Toast: () => import("@/base/Toast"),
    RecList: () => import("./components/recList"),
    LoginBtn: () => import("./components/loginBtn"),
    Login: () => import("@/base/Login"),
    TipButton: () => import("@/base/TipButton")
  },
  props: {},
  data() {
    return {
      tabsIndex: 0,
      Info: {
        CoverUrl: "",
        DepartMentId: 0,
        EndTime: "",
        Host: "",
        Introduction: "",
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
        Pwd: null,
        StartTime: "",
        TeacherID: 0,
        TeacherImg: "",
        TeacherIntroduce: "",
        TeacherName: "",
        Uid: "",
        time: ""
      },
      swiperList: [{ name: "live-info" }, { name: "comment" }],
      Infoloading: true,
      StreamName: "",
      commentList: [],
      state: 0, // 直播状态 0 即将开始 1 正在直播 2 已结束 3 讲师准备中… 4 直播已下架 5 网络不给力
      showMark: false,
      dmList: [],
      liveMessages: [],
      dmModel: null,
      commentPage: 1,
      inputText: "大家一起交流互动吧~",
      isReply: false,
      replyIndex: 0,
      CommentID: 0,
      VideoID: "",
      PlayAuth: "",
      hasMore: false,
      showMessage: true,
      VideoIndex: 0,
      VideoList: [],
      tipText: "",
      updateTime: null,
      shareVisible: false,
      visibleToast: false,
      recList: [],
      visible: false,
      recLIveID: 0,
      IsHost: 0,
      LiveID: 0,
      showLogin: false,
      toastText: "链接已复制",
      isFocus: false,
      noBackUrl: false,
      showHeader: true,
      showTip: false,
      hideRec: true,
      videoListArry: []
    };
  },
  beforeRouteEnter(to, from, next) {
    // 假如没有来源 分享出去的链接 回到企业大学或者效率工具
    if (from.path == "/") {
      next(vm => {
        vm.noBackUrl = true;
      });
    }
    next();
  },
  watch: {
    VideoID() {
      this._GetVideoPlayAuth();
    },
    watchLiveID() {
      this.LiveID = this.watchLiveID;
      this.Infoloading = true;
      // 销毁播放器
      this.$refs.player && this.$refs.player.player.dispose();
      $("#J_prismPlayer").empty();
      this._GetLiveInfo();
    }
  },
  computed: {
    uid() {
      return this.Info.Uid;
    },
    IsLive() {
      return this.$route.query.IsLive == 1;
    },
    tabs() {
      return this.$route.query.IsLive == 1
        ? ["直播详情", "交流互动"]
        : ["详情", "评论"];
    },
    watchLiveID() {
      return this.$route.query.LiveID;
    },
    isLogin() {
      const flag = storage.get("memberInfo") || false;
      return !flag ? false : true;
    },
    IsGFLive() {
      return storage.get("IsGFLive");
    },
    otherParams() {
      if (storage.get("IsGFLive")) {
        return {
          IsGFLive: true
        };
      }
      return {};
    },
    textTip() {
      if (this.isLogin) {
        return Number(this.$route.query.IsLive) == 1
          ? "快来一起交流互动吧~"
          : "发表您的评论...";
      } else {
        return Number(this.$route.query.IsLive) == 1
          ? "后和大家一起交流互动吧~"
          : "后发表您的评论...";
      }
    }
  },
  methods: {
    // 刷新当前页
    reloadPage() {
      this.Infoloading = true;
      this.showMark = false;
      this._GetPullLiveUrl(true);
    },
    // 获取直播详情
    async _GetLiveInfo() {
      this.showOrHideBar(true);
      // 是否登录 是否是GF
      const FN = this.IsGFLive ? GetLiveInfoGF : GetLiveInfo;
      const { Code, Data } = await FN({
        LiveID: this.LiveID
      });
      if (Code == OK_CODE) {
        this.Infoloading = false;
        this.Info = Object.assign(this.Info, Data, {
          StartTime: Data.StartTime.split(".")[0],
          time: this.$moment(Data.StartTime.split(".")[0]).format(
            "MMM Do HH:mm"
          ),
          CoverUrl: util._initHeaderImg(Data.CoverUrl),
          TeacherImg: util._initHeaderImg(Data.TeacherImg)
        });
        if (Data.IsLive == 1) this.state = Data.LiveStatus;
        this._GetBarrageInfoByUid(Data.Uid);
        // 获取推荐数据
        this._GetRecommendLive(Data.Labels);
        // 初始化长连接消息
        this._initSignalR(Data.Uid);
        // 是否下架，0是，1否
        if (Data.IsOnline == 0) {
          this.showMark = true;
          this.state = 4;
          return;
        }
        if (Data.IsLive == 1) {
          // 直播
          // LiveStatus 0 即将开始 1 正在直播 2 已结束
          if (Data.LiveStatus == 1) {
            this._GetPullLiveUrl();
          } else {
            this.showMark = true;
            // 当视频不能播放是也需要显示弹幕
            this.$refs.player._initLive(2);
          }
        } else {
          this._LivePlayBackLocal();
        }
        this.$nextTick(() => {
          $(".player").css({
            backgroundSize: "100% 100%"
          });
        });
        // 更新观看人数  5 分钟一次
        this._updateLookNum();
      } else if (Code == 401) {
        this.Infoloading = false;
        this.showLogin = true;
        this.mustLogin = true;
      } else if (Code == 5001) {
        this.Infoloading = false;
        $(".live-wrapper").html(Data);
      } else {
        this.Infoloading = false;
        this.showTip = true;
      }
    },
    // 更新观看人数  5 分钟一次
    _updateLookNum() {
      const FN = this.IsGFLive ? GetLivePlayCountGF : GetLivePlayCount;
      this.updateTime && clearInterval(this.updateTime);
      this.updateTime = setInterval(() => {
        const { Code, Data } = FN({
          LiveID: this.LiveID
        }).then(({ Code, Data }) => {
          if (Code == OK_CODE) {
            this.Info.LivePlayBackCount = Data;
          }
        });
      }, 1000 * 60 * 5);
    },
    // 获取拉流地址
    async _GetPullLiveUrl(flag) {
      const FN = this.IsGFLive ? GetPullLiveUrlGF : GetPullLiveUrl;
      const { Code, Data } = await FN({
        LiveID: this.LiveID
      });
      if (Code == 200) {
        this.StreamName = Data.Url;
        this.Infoloading = false;
        if (flag) {
          if (Data.LiveStatus != 1) {
            this.showMark = true;
            this.state = Data.LiveStatus;
            return;
          }
          $(".player").css("background", "#000000");
        }
      }
    },
    // 获取回放视频列表
    async _LivePlayBackLocal() {
      const FN = this.IsGFLive ? LivePlayBackLocalGF : LivePlayBackLocal;
      const { Code, Data } = await FN({
        uid: this.uid
      });
      if (Code == OK_CODE) {
        this.VideoList = Data;
        if (Data.length) {
          this.VideoIndex = 0;
          this.VideoID = Data[0].VideoID;
        }
      }
    },
    /**
     * @function 依据VideoID获取播放鉴权
     */
    async _GetVideoPlayAuth() {
      if (!this.VideoID) return;
      const FN = this.IsGFLive ? GetVideoPlayAuthGF : GetVideoPlayAuth;
      const { Code, Data } = await FN({
        vid: this.VideoID
      });
      if (Code == OK_CODE) {
        if (this.VideoIndex == 0) {
          this.PlayAuth = Data.PlayAuth;
        } else {
          this.$refs.player.player.replayByVidAndPlayAuth(
            // 播完上一个 切换到下一个视频  需要手动点播放
            this.VideoList[this.VideoIndex].VideoID,
            Data.PlayAuth
          );
        }
      }
    },
    // 返回上一页
    goBack() {
      this.$refs.player.played = true;
      this.VideoID = "";
      this.showMark = false;
      // 没有回退  官方和企业
      if (this.noBackUrl) {
        this.$router.push({
          path: "/live",
          query: {
            from: this.IsGFLive ? "tool" : "enterprise"
          }
        });
        return;
      }
      this.$router.back();
    },
    // 切换选项卡
    changeTabs(val) {
      this.tabsIndex = val;
      if (!this.IsLive && val == 1 && this.commentList.length == 0) {
        this._GetComments();
      }
    },
    /**
     * @function 获取录播评论列表
     */
    async _GetComments() {
      const { Code, Data, Count } = await GetComments({
        entityID: this.LiveID,
        commentsType: 13,
        pageindex: this.commentPage,
        pagesize: PAGESIZE
      });
      if (Code == OK_CODE) {
        this.commentsCount = Count;
        this.commentList = [...this.commentList, ...this._initComments(Data)];
        this.hasMore = this.commentList.length < Count ? true : false;
      }
    },
    /**
     * @function 通过vid获取当前录播id的所有评论
     */
    async _GetCommentsByVid() {
      const { Code, Data } = await GetComments({
        entityID: this.LiveID,
        commentsType: 13,
        videoID: this.VideoID
      });
      if (Code == OK_CODE) {
        if (Data.length) {
          // initData
          this.videoListArry = [];
          Data.forEach(item => {
            // return new dmClass(
            //   1,
            //   item.Comment,
            //   item.SendTime * 1000,
            //   LIVE_FONT_SIZE,
            //   item.Comment.length > 50 ? 8000 : 4000
            // );
            // this.dmModel.CM.load(newDMList);  // load 后 insert 无效
            let DM = new dmClass(
              1,
              item.Comment,
              item.SendTime * 1000,
              LIVE_FONT_SIZE,
              item.Comment.length > 50 ? 8000 : 4000
            );
            this.videoListArry.push(DM);
            this.dmModel.CM.insert(DM);
          });
        }
      }
    },
    // 格式化评论数据
    _initComments(data) {
      return data.map(item => {
        return {
          AddTime: item.AddTime,
          HeadImg: item.UserImg,
          Name: item.UserName,
          LikeNum: item.LikeSum,
          IsLike: item.Like,
          ArticleCommentID: item.CommentsID,
          Content: item.Comment,
          ReviewReply: item.Replies.map(replie => {
            return {
              AddTime: replie.AddTime,
              HeadImg: replie.UserImg,
              Name: replie.UserName,
              LikeNum: replie.LikeSum,
              IsLike: replie.Like,
              Content: replie.Reply,
              CommentsReplyID: replie.CommentsReplyID
            };
          })
        };
      });
    },

    // swiper 滑动
    slideChangeSwiper(index) {
      this.changeTabs(index);
    },
    /**
     * @funciton 获取最新的直播弹幕
     */
    async _GetBarrageInfoByUid(liveUid) {
      const FN = this.IsGFLive ? GetBarrageInfoByUidGF : GetBarrageInfoByUid;
      const { Code, Data } = await FN({
        liveUid
      });
      if (Code == OK_CODE) {
        this.liveMessages = Data.reverse();
        this._showNews();
      }
    },
    // 隐藏或显示弹幕
    hideDM() {
      this.showMessage = !this.showMessage;
      this.showMessage ? $(".danmu").show() : $(".danmu").hide();
    },
    // 分享
    showShare() {
      this.shareVisible = true;
    },
    /**
     * @function 获取字幕对象
     * @param {Object} 字幕对象
     * @param {Number} type 0 live 1 video 2 只有字幕
     */
    AliMessage(obj, type) {
      this.dmModel = obj;
      type == 2 && this._showOnlyDM();
    },
    // 显示弹幕并防止弹幕重叠
    _showOnlyDM() {
      this.dmModel.CM.start();
    },
    /**
     * @function playing 播放器开始播放，只触发一次 将最新的信息push给他弹幕组
     */
    playing() {
      this.showDM();
      this._GetCommentsByVid();
    },
    /**
     * @description 监听播放器播放时出错 3 讲师准备中…
     * @param {Number} type -1 "讲师准备中..."; 5 网络不给力
     */
    liveError(type) {
      // 检查直播是否结束
      if (Date.now() > Date.parse(this.Info.EndTime)) {
        this.state = 2;
      } else {
        this.state = type;
      }
      //  检查直播是否开始 未
      if (Date.now() < Date.parse(this.Info.StartTime)) {
        this.state = 0;
      }
      this.showHeader = true;
      this.showMark = true;
      $(".prism-player").css({
        background: "none"
      });
      $("#J_prismPlayer video").hide();
    },
    /**
     * @description 视频由暂停恢复为播放时触发。五秒后将头部收起
     */
    clickPlay() {
      this.tipText = "";
    },
    // 显示隐藏头部
    showOrHideBar(falg) {
      this.showHeader = falg;
    },
    /**
     * @function 监听视频播放结束自动切换下一段视频
     * @description 存在Video有多个的情况
     */
    changeVID() {
      // 只有一个视频
      if (this.VideoList.length <= 1) return;
      if (this.VideoIndex + 1 < this.VideoList.length) {
        this.VideoIndex++;
        this.VideoID = this.VideoList[this.VideoIndex].VideoID;
        this.tipText = "播放下一段视频";
      } else {
        this.tipText = "播放结束";
        $(".prism-big-play-btn").hide();
        $(".prism-play-btn").hide();
        $(".tipText").css("top", "50%");
      }
    },
    /**
     * @function 评论点赞
     * @param entityID 实体ID 评论ID
     * @param likeType 1
     *
     */
    async reviewLike({ IsLike, LikeNum, ArticleCommentID }, index) {
      if (!this.isLogin) {
        this.showLogin = true;
        return;
      }
      const { Code, Data } = await addLikeNumCommon({
        entityID: ArticleCommentID,
        likeType: 1
      });
      if (Code == OK_CODE) {
        this.$set(this.commentList[index], "IsLike", !IsLike);
        this.$set(
          this.commentList[index],
          "LikeNum",
          IsLike ? LikeNum - 1 : LikeNum + 1
        );
      }
    },
    /**
     * @function 回复点赞
     * @param entityID 实体ID 评论ID
     * @param likeType 2 评论回复
     */
    async replayLike(
      item,
      { CommentsReplyID, IsLike, LikeNum },
      index,
      sindex
    ) {
      if (!this.isLogin) {
        this.showLogin = true;
        return;
      }
      const { Code, Data } = await addLikeNumCommon({
        entityID: CommentsReplyID,
        likeType: 2
      });
      if (Code == OK_CODE) {
        this.$set(
          this.commentList[index].ReviewReply[sindex],
          "IsLike",
          !IsLike
        );
        this.$set(
          this.commentList[index].ReviewReply[sindex],
          "LikeNum",
          IsLike ? LikeNum - 1 : LikeNum + 1
        );
      }
    },
    /**
     * @function 点击回复按钮
     * @param {Number} index 回复的是第几条评论
     */
    replyComment({ Name, ArticleCommentID }, index) {
      if (!this.isLogin) {
        this.showLogin = true;
        return;
      }
      this.setFocus();
      this.isReply = true;
      this.CommentID = ArticleCommentID;
      this.replyIndex = index;
      this.inputText = `回复${Name}`;
    },
    // 上拉加载
    scrollToEnd() {
      if (this.hasMore) {
        this.hasMore = false;
        this.commentPage++;
        this._GetComments();
      }
    },
    // 复制链接
    copyUrl() {
      // TODO: LiveDetailAction 播放页操作
      this._LiveDetailActionMD("分享");
      this.shareVisible = false;
      this.toastText = "链接已复制";
      this.visibleToast = true;
    },
    // 让input focus
    setFocus() {
      this.isFocus = true;
      this.$nextTick(() => {
        $(".textareaInput").focus();
      });
    },
    // 获取推荐数据
    async _GetRecommendLive(labels) {
      if (this.$route.query.hideRec) {
        this.recList = [];
        return;
      }
      const FN = this.IsGFLive ? GetRecommendLiveGF : GetRecommendLive;
      const { Data, Code, Count } = await FN({
        pageIndex: this.pageIndex,
        pageSize: 3,
        labels,
        LiveID: this.LiveID
      });
      if (Code == OK_CODE) {
        Data.forEach(
          item => (item.CoverUrl = util._initHeaderImg(item.CoverUrl))
        );
        this.recList = Data;
      }
    },
    // 点击推荐数据
    clickItem({ LiveID, IsPwd, IsLive }) {
      this.hideRec = true;
      if (this.LiveID == LiveID) return;
      this.$refs.player.played = true;
      this.showMark = false;
      this.recLIveID = LiveID;
      // 需要密码
      if (IsPwd) {
        this.visible = true;
      } else {
        this.$router.push({
          path: "/play-live",
          query: {
            LiveID: LiveID,
            IsLive: this.IsLive ? 1 : 0,
            hideRec: true
          }
        });
      }
    },
    // 检查是不是主持人
    async _GetIsHost() {
      const FN = this.IsGFLive ? GetIsHostGF : GetIsHost;
      const { Code, Data } = await FN({
        liveId: this.LiveID
      });
      if (Code == OK_CODE) {
        this.IsHost = Data;
      }
    },
    // 显示登录框
    showLoginBtn() {
      this.showLogin = true;
    },
    // 登录成功
    loginSuccess() {
      if (this.mustLogin) {
        this._GetLiveInfo();
      }
      this.updateLogin();
      this.showLogin = false;
    },
    // 是否是必须登陆
    closedLogin() {
      if (this.mustLogin) {
        this.goBack();
      }
    },
    // 点击我知道了
    clickTip() {
      this.goBack();
      this.showTip = false;
    }
  },
  created() {
    this.LiveID = this.$route.query.LiveID;
  },
  mounted() {
    this.nowTimeMD = Date.parse(new Date());
    if (this.$route.query.IsGFLive) {
      storage.set("IsGFLive", true);
      this.IsGFLive = true;
    }
    this._GetLiveInfo();
    if (this.IsLive) this._GetIsHost();
  },
  beforeDestroy() {
    // TODO: ExitLiveDetail 退出直播
    this._ExitLiveDetailMD();
    clearInterval(this.updateTime);
    clearInterval(this.setInt);
    // 销毁播放器
    this.$refs.player.player && this.$refs.player.player.dispose();
    // 断开websocket 连接
    this.connection && this.connection.connectionClosed();
    LeaveRoom({
      uid: this.uid,
      attendID: this.Info.AttendID
    });
  }
};
</script>
<style lang="scss" scoped>
.play-live {
  .play-wrapper {
    position: relative;
    width: 100%;
    height: 3.92rem;
    .play-header {
      z-index: 9999;
      width: 100%;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.3rem 0.26rem 0.3rem 0.3rem;
      background: linear-gradient(
        0deg,
        rgba(9, 9, 9, 0) 0%,
        rgba(51, 51, 51, 0.1) 48%,
        rgba(51, 51, 51, 0.47) 100%
      );
      .header-left {
        display: flex;
        align-items: center;
        font-size: 0;

        span {
          display: inline-block;
        }

        .right {
          width: 0.2rem;
          height: 0.4rem;
          background: url("./img/back.png");
          background-repeat: no-repeat;
          background-size: 0.2rem 0.4rem;
          margin-right: 0.3rem;
        }

        .live-name {
          font-size: 0.34rem;
          color: #fff;
          line-height: 0.48rem;
        }
      }

      .header-right {
        font-size: 0;
        display: flex;
        align-items: center;

        span {
          width: 0.44rem;
          height: 0.44rem;
          display: inline-block;
          background-repeat: no-repeat;
          background-size: 0.44rem 0.44rem;
        }

        .message {
          width: 0.5rem;
          height: 0.47rem;
          background-image: url("./img/massage.png");
          margin-right: 0.34rem;
          background-size: 0.5rem 0.47rem;
        }
        .noshow {
          width: 0.5rem;
          height: 0.47rem;
          background-image: url("./img/show.png");
          margin-right: 0.34rem;
          background-size: 0.5rem 0.47rem;
        }
        .pl {
          background-image: url("./img/pl.png");
          margin-right: 0.34rem;
        }

        .fx {
          width: 0.44rem;
          height: 0.44rem;
          background-image: url("./img/fx.png");
        }
      }
    }
    .play-foot {
      z-index: 99;
      width: 100%;
      padding: 0.3rem 0.26rem 0.26rem 0.3rem;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: space-between;
      bottom: 0rem;
      background: linear-gradient(
        180deg,
        rgba(9, 9, 9, 0) 0%,
        rgba(51, 51, 51, 0.1) 48%,
        rgba(51, 51, 51, 0.47) 100%
      );
      img {
        width: 0.4rem;
        height: 0.4rem;
      }
    }
    .player {
      width: 100%;
      height: 3.92rem;
      background-size: 100% 3.92rem;
    }
  }
  .comment-wrapper {
    height: calc(100vh - 3.92rem - 0.88rem - 1.2rem);
    > div {
      min-height: 100%;
    }
  }
  .info-wrapper {
    height: calc(100vh - 3.92rem - 0.88rem);
  }
  .tipText {
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    color: #333;
    font-weight: 600;
  }
  .btn-input {
    right: 0;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #f8f8f8;
    max-height: 1.9rem;
    padding: 0.3rem;
    z-index: 112;
    p {
      font-size: 0.28rem;
      color: #c8c6c6;
      background: #ffffff;
      text-align: center;
      line-height: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>
