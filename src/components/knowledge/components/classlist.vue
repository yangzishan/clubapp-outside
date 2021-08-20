<template>
  <div class="nav-list">
    <button class="li" :class="{on:styleLight == onlight}" @click="choseAll">全部</button>
    <button class="li" 
      v-for="item in dataList" 
      :key="item.CommonTypeID"
      @click="handleClass(item.CommonTypeID)"
      :class="{on:styleLight == item.CommonTypeID}"
    >
      {{item.Name}}
    </button>
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
    },
    onlight:{
      type: [Number,String],
      default() {
        return 0;
      }
    }
  },
  data() {
    return {
      styleLight:0
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleClass(id){
      this.$emit("choseClass",id)
      this.styleLight = id
    },
    choseAll(){
      this.styleLight = this.onlight
      this.$emit("choseClass",this.onlight)
    }
  },
  created() {
    //console.log(this.onlight)
    this.styleLight = this.onlight
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
button{ margin: 0; padding: 0; border: 0; background: 0;}
.nav-list{
  width: 1.8rem;
  .li{ 
    width: 100%;
    text-align: left;
    padding: .3rem .2rem .3rem; line-height: .4rem; 
    font-size: .28rem; color: #666666;
    border-bottom:#f2f2f2 solid .01rem;
  }
  .on{ 
    background: #ffffff url(../../../assets/border-left-bj.png) no-repeat left center;
    background-size: .1rem 100%; 
    color: #333333; font-weight: 600;
    }
}
</style>
