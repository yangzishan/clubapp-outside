<template>
  <ul class="type-search">
    <template v-for="(item, index) in typeList">
      <li
        class="item-list"
        :key="index"
        :class="{ active: index == activeIndex }"
        v-if="!item.hidden"
        data-sensors-click
        @click="checkActive(index)"
      >
        <p class="one-hang fl">
          {{ _initText(item.lable, index) }}
          <!-- 选中（蓝） 未选中（灰色） 向下  -->
          <!-- 展开（蓝）上  -->
          <img
            class="bg"
            v-if="index == 0 && typeItem.length != 0"
            :src="imgUrl"
            alt=""
          />
        </p>
        <!-- <mu-expand-transition> -->
        <div class="scroll-wrapper" v-show="index == 0 && IsLive == 1">
          <ul
            class="drop-wrapper"
            v-show="showDrop && typeItem.length"
            data-mu-loading-size="16"
          >
            <li
              class="drop-item scrollX"
              v-for="(item, index) in typeItem"
              :class="{ active: dropIndex == index }"
              :key="index"
              :LabelId="item.LabelId"
              data-sensors-click
              @click.stop="checkDrop(item, index)"
            >
              <p class="drop-item">{{ item.LabelName }}</p>
            </li>
          </ul>
        </div>
        <div class="scroll-wrapper" v-show="index == 0 && IsLive == 0">
          <ul
            class="drop-wrapper"
            v-show="showDrop && typeItem.length"
            data-mu-loading-size="16"
          >
            <li
              class="drop-item scrollX"
              v-for="(item, index) in typeItem"
              :class="{ active: dropIndex1 == index }"
              :key="index"
              :LabelId="item.LabelId"
              data-sensors-click
              @click.stop="checkDrop(item, index)"
            >
              <p class="drop-item">{{ item.LabelName }}</p>
            </li>
          </ul>
        </div>
        <!-- </mu-expand-transition> -->
      </li>
    </template>
    <p class="line"></p>
  </ul>
</template>

<script>
export default {
  components: {
    Scroll: () => import("@/base/Scroll.vue")
  },
  props: {
    hidden: {
      type: Boolean,
      default: true
    },
    typeItem: {
      type: Array,
      default: []
    },
    hiddenDrop: {
      type: Boolean,
      default: false
    },
    showType: {
      type: Boolean,
      default: false
    },
    IsLive: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      typeList: [
        { lable: "全部", hidden: false },
        { lable: "人气最旺", hidden: false },
        { lable: "好评优先", hidden: this.hidden }
      ],
      activeIndex: -1,
      dropIndex: 0,
      loading: true,
      time: "",
      dropIndex1: 0,
      lableName: [
        { name: "全部", id: 0 },
        { name: "全部", id: 0 }
      ]
    };
  },
  computed: {
    showDrop() {
      return this.hiddenDrop;
    },
    imgUrl() {
      // 选中（蓝） 未选中（灰色） 向下
      // 展开（蓝）上
      if (this.activeIndex == 0) {
        // 选中
        // 展开
        if (this.showDrop) {
          return require("../img/up1.png");
        }
        return require("../img/down.png");
      } else {
        return require("../img/down2.png");
      }
    }
  },
  watch: {
    hidden() {
      this.$set(this.typeList[2], "hidden", this.hidden);
      this._initStyle();
      this.activeIndex = -1;
    },
    activeIndex() {
      this._initStyle();
    }
  },

  methods: {
    checkActive(index) {
      if (index == 0) {
        if (this.showDrop) {
          this.$emit("update:hiddenDrop", false);
        } else {
          this.$emit("update:hiddenDrop", true);
        }
        this.time ? clearTimeout(this.time) : "";
        this.time = setTimeout(() => {
          this.loading = false;
        }, 200);
      } else {
        this.loading = true;
      }
      this.activeIndex = index;
      this.$emit("searchByTab", index);
    },
    // 计算横线的位置
    _initStyle() {
      const tabWidth =
        $(".type-search").width() /
        this.typeList.filter(item => !item.hidden).length;
      const line = $(".line").width();
      const left = tabWidth * this.activeIndex + (tabWidth - line) / 2;
      $(".line").css({ left: `${left}px` });
    },
    // 点击下拉栏中的分类
    checkDrop(item, index, flag = true) {
      // this.$set(this.typeList[0], "lable", item.LabelName);
      if (this.IsLive) {
        this.$set(this.lableName[0], "name", item.LabelName);
        this.$set(this.lableName[0], "id", item.LabelId);
      } else {
        this.$set(this.lableName[1], "name", item.LabelName);
        this.$set(this.lableName[1], "id", item.LabelId);
      }
      if (flag) {
        this.$emit("update:hiddenDrop", false);
        this.IsLive ? (this.dropIndex = index) : (this.dropIndex1 = index);
        this.$emit("search", item, index);
      }
    },
    // 处理lable
    _initText(lable, index) {
      if (index != 0) return lable;
      let lable1 = this.IsLive
        ? this.lableName[0].name
        : this.lableName[1].name;
      if (lable1.length > 5) {
        const string = lable1.slice(0, 5);
        return string + "...";
      } else {
        return lable1;
      }
    }
  },
  created() {},
  mounted() {
    this._initStyle();
  }
};
</script>
<style lang="scss" scoped>
.type-search {
  display: flex;
  position: relative;
  .item-list {
    flex: 1;
    text-align: center;
    font-size: 0.3rem;
    color: #333;
    padding: 0.1rem 0;
    position: relative;
    p {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 0.42rem;
      .bg {
        margin-left: 0.08rem;
        width: 0.16rem;
        height: 0.12rem;
      }
    }
    &.active {
      flex-wrap: 600;
      color: #2f54eb;
    }
    .scroll-wrapper {
      text-align: center;
      max-height: 3.9rem;
      overflow-y: auto;
      position: absolute;
      top: 0.88rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99999999;
      border-radius: 0.2rem;
      background: #fff;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
    }
    .scroll-wrapper::-webkit-scrollbar {
      display: none;
    }
    .scrollX {
      text-align: center;
      overflow-x: auto;
    }
    .drop-wrapper {
      width: 2.06rem;
      overflow-x: auto;
      color: #848484;
      // padding: 0.24rem 0;
      .drop-item {
        overflow-x: auto;
        display: block;
        white-space: nowrap;
        font-size: 0.26rem;
        text-align: center;
        line-height: 0.77rem;
        display: block;
        height: 0.77rem;
        padding-bottom: 0 0.14rem;
        &.active {
          .drop-item {
            color: #2f54eb;
          }
        }
      }
    }
    .drop-item::-webkit-scrollbar {
      display: none;
    }
  }
  .line {
    position: absolute;
    width: 0.6rem;
    height: 0.06rem;
    border-radius: 0.04rem;
    background: #2f54eb;
    transition: all 0.2s;
    bottom: 0;
    left: 0;
  }
  .fl {
    white-space: nowrap;
  }
}
</style>
