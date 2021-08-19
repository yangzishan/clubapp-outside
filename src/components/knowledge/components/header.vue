<template>
  <div class="header">
    <span class="back">
      <img src="@/assets/back.png" />
    </span>
    <span class="head-title"> </span>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
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
.header{
  background: #ffffff;
  position: relative;
  width: 100%; height: .88rem; font-size: .34rem; line-height: .88rem;
  .back{ float: left;
    width: .52rem; height: .88rem; padding: .24rem 0;
    text-align: center;
    img{width: .22rem; height: .4rem; vertical-align: top;}
  }
  .head-title{
    position: absolute; 
    width: 100%; left: 0; text-align: center; font-weight: 600;
  }
}
</style>
