<template>
  <div class="no-more">
    <p class="more-title">{{ title }}</p>
  </div>
</template>
<script>
export default {
  name: "noMore",
  props: {
    title: {
      type: String,
      default: "我是有底线的"
    }
  }
};
</script>
<style lang="css" scoped>
.no-more {
  width: 100%;
  display: flex;
  min-height: 0.8rem;
  justify-content: center;
  align-items: center;
}
.more-title {
  font-size: 0.26rem;
  color: #cdcdcd;
  position: relative;
}
.more-title::after,
.more-title::before {
  content: "";
  position: absolute;
  top: 50%;
  margin-left: 0.2rem;
  width: 1rem;
  height: 1px;
  background-color: #cdcdcd;
}
.more-title::before {
  margin-left: -1.2rem;
}
</style>
