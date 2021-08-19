<template>
  <div class="info_list">
    <div class="item" v-for="item in dataList" :key="item.CourseID">
      <div class="inf">
        <p class="tit">{{item.Name}}</p>
        <p class="see">{{item.BrowseNum}}人看过</p>
      </div>
      <div class="pic">
        <img :src="item.Img">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    dataList:{
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.info_list{
  .item{ overflow: hidden; position: relative;
    height: 1.84rem;
    padding: .3rem;
    border-bottom:#f1f1f1 solid .01rem;
    .inf{ width: 2.66rem; float: left;
      .tit{ font-size: .26rem; font-weight: 600; line-height: .38rem;}
      .see{color: #848484; font-size: .24rem; position: absolute; left: .3rem; bottom:.3rem;}
    }
    .pic{float: right;  width: 2.2rem; padding: 0 ;
      img{width: 2.2rem; height: 1.24rem; border-radius: .1rem; display: block;}
    }
  }
}
</style>
