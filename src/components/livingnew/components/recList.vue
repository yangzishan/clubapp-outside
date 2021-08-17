<template>
  <div class="rec-wrapper">
    <ul class="wrapper">
      <li
        v-for="(item, index) in data"
        :key="index"
        class="item-list"
        @click="clickItem(item)"
      >
        <img
          class="img"
          v-lazy="item.CoverUrl ? item.CoverUrl : '../img/11.jpg'"
          alt=""
        />
        <p class="text one-hang">{{ item.LiveName }}</p> 
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    data: {
      type: Array,
      defult: () => []
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    clickItem(item) {
      this.$emit("clickItem", item);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.rec-wrapper {
  margin-top: 0.5rem;
  padding: 0 0.3rem;
  padding-bottom: 0.3rem;
  .wrapper {
    display: flex;
    .item-list {
      flex: 0 0 30%;
      .img {
        width: 2.1rem;
        height: 1.18rem;
        border-radius: 0.2rem;
      }
      .text {
        padding-top: 0.04rem;
        font-size: 0.26rem;
        color: #333333;
        line-height: 0.44rem;
        font-weight: 400;
      }
      margin-right: 0.3rem;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
