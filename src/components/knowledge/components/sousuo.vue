<template>
  <div class="sousuo">
    <div class="int">
      <span class="icon-search"></span>
      <span class="intxt">
        <input placeholder="请输入名称" v-model="keyword">
      </span>
      <span class="icon-clear" @click="clearWord" v-show="keyword"></span>
    </div>
    <span class="btn" @click="handleSearch(keyword)">搜索</span>
  </div>
</template>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      keyword:''
    };
  },
  watch: {},
  computed: {},
  methods: {
    clearWord(){
      this.keyword = ''
    },
    handleSearch(str){
      this.$emit('toSearch',str)
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.sousuo{display: flex; display:  -webkit-flex;
  height: 1rem;
  padding: .3rem .3rem 0; font-size: 0;
  .int{ flex: 1; -webkit-flex:1; 
    height: .6rem;border: 1px solid #E9E9E9; 
    border-radius: .3rem;
    display: flex; display:  -webkit-flex;
    .icon-search{width: .6rem; height: .6rem;
      background: url("../../../assets/sousuo.png ") no-repeat center;
      background-size: .3rem .3rem;
    }
    .intxt{ display: block; flex: 1; -webkit-flex:1;
      input{ width: 100%; line-height: .6rem; border: none; background: none; outline: none; font-size: .24rem;}
    }
    .icon-clear{width: .6rem; height: .6rem;
      background: url("../../../assets/del.png ") no-repeat center;
      background-size: .3rem .3rem;
    }        
  }
  .btn{ display: inline-block; vertical-align: top; width: .72rem;
    text-align: center; line-height: .6rem; font-size: .26rem; padding: 0 .1rem;
  }
}
</style>
