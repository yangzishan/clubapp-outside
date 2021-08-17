<template>
  <div class="default-page" :class="{ defaultTabs: isTab }">
    <div class="default-container">
      <img :src="defaultImg[type].img" />
      <p>{{ text ? text : defaultImg[type].text }}</p>
      <button v-if="btnShow" @click="btnClick">{{ btnText }}</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "defaultPage",
  props: {
    // 0 暂无内容
    // 1 未绑定企业
    // 2 没有登录
    // 3 未搜索到内容
    // 4 暂无消息
    // 5 未找到药品
    // 6 暂无记录
    // 7 暂无排行
    // 8 暂无数据
    // 9 暂无网络
    // 10 内容已下架
    type: {
      type: Number,
      default: 0
    },
    // 提示文案，不传则采用默认
    text: {
      type: String,
      default: ""
    },
    // 是否有选项卡
    isTab: {
      type: Boolean,
      default: false
    },
    btnShow: {
      type: Boolean,
      default: false
    },
    btnText: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      defaultImg: [
        {
          type: 0,
          img:
            "https://img.xlxt.net/photoManage/2020/05/22/15901184780005121.png",
          text: "目前还没有任何内容"
        },
        {
          type: 1,
          img:
            "https://img.xlxt.net/photoManage/2020/05/22/159011855700076256.png",
          text: "该账号未绑定企业，请联系企业管理员"
        },
        {
          type: 2,
          img:
            "https://img.xlxt.net/photoManage/2020/05/22/159011855700076256.png",
          text: "你还没有登录呦~"
        },
        {
          type: 3,
          img:
            "https://img.xlxt.net/photoManage/2020/05/22/159011874500019253.png",
          text: "搜索不到您想要的结果，换个关键词试试"
        },
        {
          type: 4,
          img:
            "https://img.xlxt.net/photoManage/2020/05/22/159011883400021582.png",
          text: "目前还没有任何消息"
        },
        {
          type: 5,
          img:
            "https://img.xlxt.net/photoManage/2020/05/22/159011887700059572.png",
          text: "未找到该药品"
        },
        {
          type: 6,
          img:
            "https://img.xlxt.net/photoManage/2020/05/22/159011892500043271.png",
          text: "目前还没有任何记录"
        },
        {
          type: 7,
          img:
            "https://img.xlxt.net/photoManage/2020/05/22/15901189770009760.png",
          text: "目前还没有排名，快来参加争夺第一吧~"
        },
        {
          type: 8,
          img:
            "https://img.xlxt.net/photoManage/2020/05/22/159011903800010893.png",
          text: "数据不见了，点击重新加载吧~"
        },
        {
          type: 9,
          img:
            "https://img.xlxt.net/photoManage/2020/05/22/159011911100092232.png",
          text: "网络离开了，请检查网络设置吧~"
        },
        {
          type: 10,
          img:
            "https://img.xlxt.net//ArticleManage/2020/08/13/159730541200069017.png",
          text: "暂时还没有开通该模块，请联系管理员"
        },
        {
          type: 11,
          img:
            "https://img.xlxt.net/photoManage/2020/09/28/16012566850009706.png",
          text: "内容已下架"
        },
        {
          type: 12,
          img:
            "https://img.xlxt.net/photoManage/2021/04/12/161819804700033533.png",
          text: "内容已不存在啦~"
        },
        {
          type: 13,
          img:
            "https://img.xlxt.net//photoManage/2021/04/13/161828058600029215.png",
          text: "该商品已下架"
        },
        
      ]
    };
  },
  methods: {
    btnClick() {
      this.$emit("btnClick");
    }
  }
};
</script>
<style lang="scss" scoped>
.default-page {
  width: 100%;
  height: calc(100vh - 0.88rem);
  display: flex;
  justify-content: center;
  align-items: center;
  .default-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 4.11rem;
      margin-bottom: 0.73rem;
    }
    p {
      color: #848484;
      font-size: 0.3rem;
      left: 0.42rem;
    }
    button {
      width: 1.8rem;
      background-color: #2f54eb;
      height: 0.6rem;
      border-radius: 0.31rem;
      outline: none;
      border: 0;
      color: #fff;
      font-size: 0.3rem;
      margin-top: 0.63rem;
    }
  }
}
.defaultTabs {
  height: calc(100vh - 0.88rem - 0.88rem);
}
</style>
