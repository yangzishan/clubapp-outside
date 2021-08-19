<template>
  <div class="nav-list">
    <p class="li" :class="{on:styleLight == 0}" @click="choseAll">全部</p>
    <p class="li" 
      v-for="item in dataList" 
      :key="item.CommonTypeID"
      @click="handleClass(item)"
      :class="{on:styleLight == item.CommonTypeID}"
    >
      {{item.Name}}
    </p>
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
    return {
      styleLight:0
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleClass(item){
      this.$emit("choseClass",item)
      this.styleLight = item.CommonTypeID
    },
    choseAll(){
      this.styleLight = 0
      //this.$emit("choseClass",0)
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.nav-list{
  width: 1.8rem;
  p.li{ 
    // height: 1rem; 
    padding: .3rem .2rem .3rem; line-height: .4rem; 
    font-size: .28rem; color: #666666;
    border-bottom:#f2f2f2 solid .01rem;
  }
  p.on{ background: #ffffff; color: #333333; font-weight: 600;}
}
</style>
