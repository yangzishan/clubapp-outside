<template>
  <div class="wrapper">
    <!-- <kheader></kheader> -->
    <my-header :title="headTitle" @goBack="goBack"></my-header>
    <div class="mainContent">
      <div class="c_left">
        <scroll
          class="scroll-wrapper-nav"
        >
          <classlist 
            :dataList="classList"
            :onlight="parentId"
            @choseClass="choseClass"
          ></classlist>
        </scroll>
      </div>
      <div class="c_right">
        <sousuo ref="sousuo" @toSearch="toSearch"></sousuo>
        <scroll
          class="scroll-wrapper"
          ref="scrollWrapper"
          :listenScroll="true"
          :pullup="true"
          :pullDown="true"
          @scroll="scrolling"
          @scrollToEnd="scrollToEnd"
        >
          <courselist :dataList="courseList"></courselist>
          <defaultpage :type="tiptype" v-show="defaultpageshow"></defaultpage>
          <loading v-show="hasMore || tabclassing || searching"></loading>
          <no-more v-if="!hasMore && courseList.length"></no-more>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/common/js/util";
import {formatImg} from "@/filters/index";
import { OK_CODE, PULL_NUM, PAGESIZE } from "@/common/js/config";
import { GetClassChildByInfoParentID, GetCourseList } from "@/api/rj-server";
export default {
  components: {
    loading: () => import("@/base/loading.vue"),
    NoMore: () => import("@/base/NoMore.vue"),
    scroll: () => import("@/base/Scroll.vue"),
    myHeader: () => import("@/base/Header.vue"),
    defaultpage: () => import("@/base/DefaultPage.vue"),
    kheader: () => import("./components/header"),
    classlist: () => import("./components/classlist"),
    courselist: () => import("./components/courselist"),
    sousuo: () => import("./components/sousuo"),
  },
  props: {},
  data() {
    return {
      headTitle:'',
      classList:[],
      courseList:[],
      pageIndex:1,
      downing: false, // 是否正在下拉
      hasMore: false, // 是否还有更多数据
      Timeout: null,
      parentId:0,
      courseClassifyID: 0,
      keyword:'',
      tiptype: 0,
      tabclassing: false, //正在切换类
      searching: false, //正在搜索
      defaultpageshow: false,
      from:'',
      nextTryAgain: true //防止连续快速点击发送重复请求
    };
  },
  watch: {},
  computed: {},
  methods: {
    async _GetClassChildByInfoParentID() {
      const { Code, Data } = await GetClassChildByInfoParentID({
        parentId: this.parentId
      });
      if (Code == OK_CODE) {
        this.classList = Data
      }
    },
    toSearch(str){
      this.keyword = str;
      this.pageIndex = 1;
      this.courseList = [];
      this.searching = true;
      this.defaultpageshow = false;
      this.tiptype = 3;
      if(this.nextTryAgain){
        this._GetCourseList();
      }
    },
    choseClass(id){
      this.courseClassifyID = id;
      this.pageIndex = 1;
      this.keyword = '';
      this.$refs.sousuo.clearWord();
      this.courseList = [];
      this.tabclassing = true;
      this.defaultpageshow = false;
      this.tiptype = 0;
      if(this.nextTryAgain){
        this._GetCourseList();
      }
    },
    async _GetCourseList() {
      this.nextTryAgain = false;
      const { Code, Data, Count } = await GetCourseList({
        pageIndex: this.pageIndex,
        pageSize: PAGESIZE,
        courseClassifyID: this.courseClassifyID,
        keyword: this.keyword
      });
      if (Code == OK_CODE) {
        this.$refs.scrollWrapper && this.$refs.scrollWrapper.finishPullDown();
        Data.forEach(
          item => (item.Img = formatImg(item.Img))
        );
        this.courseList = (this.downing || this.tabclassing || this.searching) ? Data : this.courseList.concat(Data);
        this.downing = false;
        this.tabclassing = false;
        this.searching = false;
        this.hasMore = this.courseList.length < Count ? true : false;
        this.defaultpageshow = this.courseList.length == 0 ? true : false;
        this.nextTryAgain = true;
      }
    },
    scrolling(pos){
      if (pos.y >= PULL_NUM && !this.downing) {
        this.downing = true;
        this.$refs.scrollWrapper.showLoading = true;
        this.$refs.scrollWrapper.stop();
        this.Timeout ? clearTimeout(this.Timeout) : "";
        this.Timeout = setTimeout(() => {
          this.pageIndex = 1;
          this._GetCourseList();
        }, 1000);
      }
    },
    scrollToEnd() {
      if (this.hasMore) {
        this.downing = false;
        this.pageIndex++;
        this._GetCourseList();
      }
    },
    goBack(){
      this.$router.push({path:`/${this.from}`})
    }
  },
  created() {
    this.headTitle = (this.$route.query.title || '健康知识') // 等传值
    this.parentId = (this.$route.query.ParentID || 1616) // 1615 等传值
    this.from = (this.$route.query.from || 'clubhome') // 1615 等传值
    this.courseClassifyID = this.parentId 
    this._GetClassChildByInfoParentID();
    this._GetCourseList()
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.wrapper {
  color: #333333;
  background: #F9F9F9;
  .mainContent{
    display: flex; display: -webkit-flex;
    border-top:#f1f1f1 solid .01rem;
    .c_left{ 
      width: 1.8rem;
      .scroll-wrapper-nav{
        overflow: hidden;
        height: calc(100vh - .88rem);
      }
    }
    .c_right{
      flex: 1; -webkit-flex:1; background: #ffffff;
      .scroll-wrapper {
        overflow: hidden;
        height: calc(100vh - 1.88rem);
      }
    }
  }
}
</style>
