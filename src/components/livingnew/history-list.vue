<template>
  <div class="history-list">
    <my-header
      title="观看历史"
      rightText="清空"
      :rightTextColor="rightTextColor"
      @clickRight="clickRight"
      @goBack="goBack"
    />
    <scroll
      class="scroll-wrapper"
      ref="scrollWrapper"
      :listenScroll="true"
      :pullup="true"
      :pullDown="true"
      @scroll="scrolling"
      @scrollToEnd="scrollToEnd"
    >
      <historys
        class="history-wrapper"
        :data="historyList"
        @clickOne="clickOne"
        @recommend="recommend"
      />
      <loading v-show="hasMore"></loading>
      <no-more v-if="!hasMore && historyList.length"></no-more>
    </scroll>
    <no-result
      v-if="historyList.length == 0"
      icon="no-history-icon"
      title="目前还没有任何记录"
    ></no-result>
    <first-loading
      :showFirstLoading="showFirstLoading"
      :key="showFirstLoading"
    />
    <check-password
      ref="password"
      :visible.sync="visible"
      :psdError.sync="psdError"
      @submit="_initPwd"
    />
    <confirm
      ref="confirm"
      text="是否清空历史记录？"
      confirmBtnText="确认"
      @confirm="clear"
    />
    <toast :visible.sync="visibleToast" text="历史记录已清空" />
  </div>
</template>

<script>
import {
  GetWatchList,
  DeleteWatchList,
  GetWatchListGF,
  DeleteWatchListGF
} from "@/api/lee-sever";
import { OK_CODE, PULL_NUM, PAGESIZE } from "@/common/js/config";
import checkpassword from "./components/checkpswmixins";
import storage from "good-storage";
import { addHistory, getHistory, clearHistory } from "./components/history";
import util from "@/common/js/util";
export default {
  mixins: [checkpassword],
  components: {
    MyHeader: () => import("@/base/Header"),
    historys: () => import("./components/historys"),
    Scroll: () => import("@/base/Scroll"),
    FirstLoading: () => import("@/base/first-loading.vue"),
    loading: () => import("@/base/loading.vue"),
    NoMore: () => import("@/base/NoMore.vue"),
    NoResult: () => import("@/base/noResult"),
    Confirm: () => import("@/base/confirm"),
    Toast: () => import("@/base/Toast")
  },
  props: {},
  data() {
    return {
      historyList: [],
      pageIndex: 1,
      showFirstLoading: true,
      downing: false, // 是否正在下拉
      hasMore: false, // 是否还有更多数据
      Timeout: "",
      visibleToast: false,
      liveObj: {}
    };
  },
  watch: {},
  computed: {
    rightTextColor() {
      return this.historyList.length ? "#333333" : "#CCCCCC";
    },
    IsGFLive() {
      return storage.get("IsGFLive");
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    clickRight() {
      this.historyList.length ? this.$refs.confirm.show() : "";
    },
    // 清空历史记录
    async clear() {
      const FN = this.IsGFLive ? DeleteWatchListGF : DeleteWatchList;
      const { Code } = await FN({
        IsLive: 2
      });
      if (Code == OK_CODE) {
        this._baseSet();
      }
    },
    _baseSet() {
      this.$refs.confirm.hide();
      this.visibleToast = true;
      this.historyList = [];
      this.hasMore = false;
    },
    // 找相似
    recommend({ Labels, LiveID }) {
      this.$router.push({
        path: "/recommend",
        query: {
          Labels,
          LiveID
        }
      });
      this.setKeepLive(false);
    },
    // 点击某一个
    clickOne(item) {
      this.LiveID = item.LiveID;
      this.IsLive = item.IsLive;
      // 需要密码
      if (item.IsPwd) {
        this.liveObj = item;
        this.visible = true;
      } else {
        if (this.IsGFLive) addHistory(item);
        this.$router.push({
          path: "/play-live",
          query: { LiveID: item.LiveID, IsLive: item.IsLive }
        });
      }
    },
    // 获取观看历史 IsLive
    async _GetWatchList() {
      const FN = this.IsGFLive ? GetWatchListGF : GetWatchList;
      const { Code, Data, Count } = await FN({
        pageIndex: this.pageIndex,
        pageSize: PAGESIZE,
        IsLive: 2
      });
      if (Code == OK_CODE) {
        this.showFirstLoading = false;
        this.$refs.scrollWrapper && this.$refs.scrollWrapper.finishPullDown();
        Data.forEach(
          item => (item.CoverUrl = util._initHeaderImg(item.CoverUrl))
        );
        this.historyList = this.downing ? Data : this.historyList.concat(Data);
        this.downing = false;
        this.hasMore = this.historyList.length < Count ? true : false;
        this.setKeepLive(true);
      } else if (Code == 5001) {
        this.showFirstLoading = false;
        $(".scroll-wrapper").html(Data);
      }
    },
    // 监听列表滑动 下拉更新
    scrolling(pos) {
      if (pos.y >= PULL_NUM && !this.downing) {
        this.downing = true;
        this.$refs.scrollWrapper.showLoading = true;
        this.$refs.scrollWrapper.stop();
        this.Timeout ? clearTimeout(this.Timeout) : "";
        this.Timeout = setTimeout(() => {
          this.pageIndex = 1;
          this._GetWatchList();
        }, 1000);
      }
    },
    setKeepLive(name, flag) {
      // 设置缓存为false
      this.$router.options.routes.forEach((item, index) => {
        if (item.name == "living") {
          this.$router.options.routes[index].children.forEach(
            (item2, index2) => {
              if (item2.name == "history-list") {
                this.$router.options.routes[index].children[
                  index2
                ].meta.keepAlive = flag;
              }
            }
          );
        }
      });
    },
    // 上拉加载
    scrollToEnd() {
      if (this.hasMore) {
        this.downing = false;
        this.pageIndex++;
        this._GetWatchList();
      }
    }
  },
  created() {
    this._GetWatchList();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.history-list {
  .scroll-wrapper {
    height: calc(100vh - 0.88rem);
    .history-wrapper {
      padding: 0.3rem;
    }
  }
}
</style>
