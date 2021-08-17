<template>
  <div class="recommend">
    <my-header title="相似推荐" @goBack="goBack" />
    <scroll
      ref="scrollWrapper"
      class="scroll-wrapper"
      :data="liveData"
      :listenScroll="true"
      :pullup="true"
      :pullDown="true"
      @scroll="scrolling"
      @scrollToEnd="scrollToEnd"
    >
      <list-wrapper
        :data="liveData"
        class="list-wrapper"
        @clickItem="clickItem"
      />
      <loading v-show="hasMore"></loading>
      <no-more v-if="!hasMore && liveData.length"></no-more>
    </scroll>
    <no-result
      v-if="liveData.length == 0"
      title="目前还没有相似推荐内容"
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
  </div>
</template>

<script>
import { GetRecommendLive, GetRecommendLiveGF } from "@/api/lee-sever";
import { OK_CODE, PULL_NUM, PAGESIZE } from "@/common/js/config";
import checkpassword from "./components/checkpswmixins";
import { addHistory } from "./components/history";
import storage from "good-storage";
export default {
  mixins: [checkpassword],
  components: {
    MyHeader: () => import("@/base/Header"),
    Scroll: () => import("@/base/Scroll"),
    ListWrapper: () => import("./components/list-wrapper"),
    FirstLoading: () => import("@/base/first-loading.vue"),
    loading: () => import("@/base/loading.vue"),
    NoMore: () => import("@/base/NoMore.vue"),
    NoResult: () => import("@/base/noResult")
  },
  props: {},
  data() {
    return {
      liveData: [],
      pageIndex: 1,
      showFirstLoading: true,
      hasMore: false,
      downing: false,
      liveObj: {}
    };
  },
  watch: {},
  computed: {
    IsGFLive() {
      return storage.get("IsGFLive");
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    async _GetRecommendLive() {
      const FN = this.IsGFLive ? GetRecommendLiveGF : GetRecommendLive;
      const { Data, Code, Count } = await FN({
        pageIndex: this.pageIndex,
        pageSize: PAGESIZE,
        labels: this.$route.query.Labels,
        LiveID: this.$route.query.LiveID
      });
      if (Code == OK_CODE) {
        this.showFirstLoading = false;
        this.$refs.scrollWrapper.finishPullDown();
        this.liveData = this.downing ? Data : this.liveData.concat(Data);
        this.downing = false;
        this.hasMore = this.liveData.length < Count ? true : false;
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
          this._GetRecommendLive();
        }, 1000);
      }
    },
    // 上拉加载
    scrollToEnd() {
      if (this.hasMore) {
        this.downing = false;
        this.pageIndex++;
        this._GetRecommendLive();
      }
    },
    // 点击某一个
    clickItem(item) {
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
    }
  },
  created() {
    this._GetRecommendLive();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.recommend {
  .scroll-wrapper {
    height: calc(100vh - 0.88rem);
    overflow: hidden;
  }
  .list-wrapper {
    padding: 0.22rem 0.3rem 0 0.3rem;
  }
}
</style>
