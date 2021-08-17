import Vue from "vue";
import Router from "vue-router";
// import Living from "./modules/living.js";
import Test from "./modules/test.js";

Vue.use(Router);

export default new Router({
  routes: [
    // 直播模块
    // Living
    Test
  ]
});
// 解决快速点击路由连续跳转报错
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};
const RouterReplace = Router.prototype.replace;
Router.prototype.replace = function replace(to) {
  return RouterReplace.call(this, to).catch(err => err);
};
