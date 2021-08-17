<template>
  <div class="living">
    <my-header
      ref="myHeader"
      @changHeader="changHeader"
      @History="goHistory"
      @GoBack="goBack"
    />
    <div class="mark-wrapper">
      <div class="mark" @click="goSearch" data-sensors-click></div>
      <search class="search" placeholder="搜索直播名称/讲师" :disabled="true" />
    </div>
    <type-search
      ref="typeSearch"
      :hidden="hideGood"
      :typeItem="typeList"
      :hiddenDrop.sync="hiddenDrop"
      :IsLive="IsLive"
      @searchByTab="searchByTab"
      @search="search"
    />
    <scroll
      class="scroll-wrapper"
      ref="scrollWrapper"
      :data="liveData"
      :listenScroll="true"
      :pullup="true"
      :pullDown="true"
      @scroll="scrolling"
      @scrollToEnd="scrollToEnd"
    >
      <list-wrapper
        :data="liveData"
        :IsLive="IsLive"
        class="list-wrapper"
        @clickItem="clickItem"
      />
      <loading v-show="hasMore"></loading>
      <no-more v-if="!hasMore && liveData.length"></no-more>
    </scroll>
    <no-result v-if="liveData.length == 0"></no-result>
    <first-loading
      :showFirstLoading="showFirstLoading"
      :key="showFirstLoading"
    ></first-loading>
    <check-password
      ref="password"
      :visible.sync="visible"
      :psdError.sync="psdError"
      @submit="_initPwd"
    />
  </div>
</template>

<script>
import { OK_CODE, PULL_NUM, PAGESIZE } from "@/common/js/config";
import {
  GetLiveInfoList,
  GetLabels,
  GetLabelsGF,
  CheckLivePwd,
  GetLiveInfoListGF
} from "@/api/lee-sever";
import storage from "good-storage";
import checkpassword from "./components/checkpswmixins";
import { addHistory } from "./components/history";
import util from "@/common/js/util.js";

export default {
  mixins: [checkpassword],
  components: {
    MyHeader: () => import("./components/live-header"),
    Search: () => import("@/base/search"),
    TypeSearch: () => import("./components/type-search"),
    ListWrapper: () => import("./components/list-wrapper"),
    FirstLoading: () => import("@/base/first-loading.vue"),
    loading: () => import("@/base/loading.vue"),
    NoMore: () => import("@/base/NoMore.vue"),
    scroll: () => import("@/base/Scroll.vue"),
    NoResult: () => import("@/base/noResult")
  },
  data() {
    return {
      liveData: [],
      hideGood: true,
      pageIndex: 1,
      label: 0,
      IsMostPopular: 0,
      IsMostComment: 0,
      IsLive: 1,
      typeList: [],
      hiddenDrop: false,
      showFirstLoading: true,
      downing: false, // 是否正在下拉
      loading: false, // 页面加载
      hasMore: false, // 是否还有更多数据
      liveObj: {},
      LabelIndex: 0,
      tabIndexNow: 0
    };
  },
  watch: {
    tabIndexNow(newVal, oldVal) {
      if ((newVal == 0 && oldVal == 1) || (newVal == 0 && oldVal == 2)) {
        this.hiddenDrop = false;
      }
    }
  },
  computed: {
    IsGFLive() {
      const IsGFLive = this.$route.query.from == "tool";
      storage.set("IsGFLive", IsGFLive);
      return IsGFLive;
    }
  },
  methods: {
    // 返回上一页
    goBack() {
      if (storage.session.get("_goHome_")) {
        this.$router.replace(`/home`);
        storage.session.set("_goHome_", null);
        return;
      }
      const url = this.$route.query.from || "enterprise";
      this.$router.push(`/${url}`);
      storage.session.set("_goHome_", null);
    },
    /**
     * @function 去搜索页
     */
    goSearch() {
      // TODO: SearchClick 点击搜索框
      this._SearchClickMD("直播");
      const url = this.$route.query.from || "enterprise";
      this.$router.push({
        path: "/search",
        query: { type: 13, IsLive: this.IsLive, from: `${url}` }
      });
    },
    /**
     * @function 获取标签
     */
    async _GetLabels() {
      const FN = this.IsGFLive ? GetLabelsGF : GetLabels;
      const { Code, Data } = await FN({
        pageIndex: 1,
        pageSize: 99
      });
      if (Code == OK_CODE) {
        this.typeList = Data.length
          ? [{ LabelId: 0, LabelName: "全部" }, ...Data]
          : [];
      }
    },
    /**
     * @function 获取直播列表
     * @params  label 直播标签
     * @params IsMostPopular 人气最旺，是1，0否
     * @params IsMostComment 好评优先，是1，0否
     * @params IsLive 直播1，回放0
     */
    async _GetLiveInfoList() {
      const FN = this.IsGFLive ? GetLiveInfoListGF : GetLiveInfoList;
      let { Code, Data, Count } = await FN({
        pageIndex: this.pageIndex,
        pageSize: PAGESIZE,
        label: this.label,
        IsMostPopular: this.IsMostPopular,
        IsMostComment: this.IsMostComment,
        IsLive: this.IsLive
      });
      if (Code == OK_CODE) {
        this.showFirstLoading = false;
        this.loading = false;
        this.$refs.scrollWrapper.finishPullDown();
        Data.forEach(
          item => (item.CoverUrl = util._initHeaderImg(item.CoverUrl))
        );
        this.liveData = this._initLive(
          this.downing ? Data : this.liveData.concat(Data)
        );
        this.downing = false;
        this.hasMore = this.liveData.length < Count ? true : false;
      } else if (Code == 5001) {
        this.showFirstLoading = false;
        $(".scroll-wrapper").html(Data);
      } else if (Code == 401) {
        this.goBack();
      }
    },
    /**
     * @function 过滤当前数据防止直播/回放快速来回切换时,上一次接口返回的数据和第二次返回的数据混在一起的BUG
     */
    // 切换直播和回放
    _initLive(data) {
      return data.filter(item => item.IsLive == this.IsLive);
    },
    changHeader(val) {
      this.IsLive = val == 1 ? 0 : 1;
      this.label = this.IsLive
        ? this.$refs.typeSearch.lableName[0].id
        : this.$refs.typeSearch.lableName[1].id;
      this.hideGood = val == 1 ? false : true;
      this.hiddenDrop = false;
      this.downing = false;
      this.pageIndex = 1;
      this.liveData = [];
      this.hasMore = false;
      this.showFirstLoading = true;
      this._GetLiveInfoList();
    },
    /**
     * @function 切换tab搜索数据
     * @param {Number} index 1 人气最旺 IsMostPopular = 1  2 好评优先 IsMostComment = 1
     */
    searchByTab(index) {
      this.tabIndexNow = index;
      this.label = 0;
      this.downing = false;
      this.hasMore = false;
      if (index == 1) {
        this.IsMostPopular = 1;
        this.IsMostComment = 0;
        this.hiddenDrop = false;
      } else if (index == 2) {
        this.IsMostPopular = 0;
        this.IsMostComment = 1;
        this.hiddenDrop = false;
      } else {
        this.IsMostPopular = 0;
        this.IsMostComment = 0;
        this.label = this.typeList[this.LabelIndex]
          ? this.typeList[this.LabelIndex].LabelId
          : 0;
      }
      this.liveData = [];
      this.loading = true;
      this.pageIndex = 1;
      this._GetLiveInfoList();
    },
    // 观看历史
    goHistory() {
      this.hiddenDrop = false;
      // 设置缓存为false
      this.$router.options.routes.forEach((item, index) => {
        if (item.name == "living") {
          this.$router.options.routes[index].children.forEach(
            (item2, index2) => {
              if (item2.name == "history-list") {
                this.$router.options.routes[index].children[
                  index2
                ].meta.keepAlive = false;
              }
            }
          );
        }
      });
      this.$router.push({
        path: "/history-list",
        query: {
          IsLive: this.IsLive
        }
      });
    },
    /**
     * @function 点击一个live
     * @params LiveID id   IsLive  1 直播 0 回放
     * @params IsPwd  是否需要验证密码
     */
    clickItem(item) {
      this.IsLive = item.IsLive;
      this.LiveID = item.LiveID;
      if (!item.IsPwd) {
        if (this.IsGFLive) addHistory(item);
        this.$router.push({
          path: "/play-live",
          query: { LiveID: item.LiveID, IsLive: item.IsLive }
        });
      } else {
        this.liveObj = item;
        this.visible = true;
      }
    },
    /**
     * @function 通过标签搜索
     */
    search({ LabelId }, index) {
      this.LabelIndex = index;
      this.pageIndex = 1;
      this.label = LabelId;
      this.liveData = [];
      this.loading = true;
      this._GetLiveInfoList();
    },
    // 监听列表滑动 下拉更新
    scrolling(pos) {
      this.hiddenDrop = false;
      if (pos.y >= PULL_NUM && !this.downing) {
        this.downing = true;
        this.$refs.scrollWrapper.showLoading = true;
        this.$refs.scrollWrapper.stop();
        setTimeout(() => {
          this.pageIndex = 1;
          this._GetLiveInfoList();
        }, 1000);
      }
    },
    // 上拉加载
    scrollToEnd() {
      if (this.hasMore) {
        this.downing = false;
        this.pageIndex++;
        this._GetLiveInfoList();
      }
    }
  },
  created() {},
  mounted() {
    // 假如是从首页配置进来的
    if (this.$route.query.goHome) {
      storage.session.set("_goHome_", true);
    }
    this._GetLiveInfoList();
    this._GetLabels();
  }
};
</script>
<style lang="scss" scoped>
.living {
  .mark-wrapper {
    position: relative;
    padding: 0 0.4rem;
    .mark {
      padding: 0.2rem 0;
      width: 6.8rem;
      height: 100%;
      z-index: 10000;
      position: absolute;
    }
  }

  .search {
    padding: 0.2rem 0;
  }
  .scroll-wrapper {
    height: calc(100vh - 0.88rem - 1rem - 0.63rem);
    overflow: hidden;
    position: relative;
  }
  .list-wrapper {
    padding: 0.22rem 0.3rem 0 0.3rem;
  }
}
</style>
