import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store/index.js";
import "muse-ui/dist/muse-ui.css";
import moment from "moment";
import VueClipboard from "vue-clipboard2";
import MuseUI from "muse-ui";
import NoSleep from "nosleep.js/dist/NoSleep.min.js";
Vue.prototype.$NoSleep = NoSleep;
Vue.use(MuseUI);
import $ from "jquery";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
// element 按需加载
import {
  Button,
  Select,
  Radio,
  RadioGroup,
  CheckboxGroup,
  Checkbox,
  Input,
  Rate,
  Progress
} from "element-ui";
Vue.use(Button);
Vue.use(Select);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);
Vue.use(Input);
Vue.use(Rate);
Vue.use(Progress);
import VueTouch from "vue-touch";
Vue.use(VueTouch, {
  name: "v-touch"
});
VueTouch.config.swipe = {
  threshold: 50 //设置左右滑动的距离
};
Vue.use(VueClipboard);
moment.locale("zh-cn");
Vue.prototype.$moment = moment;
//查看图片插件
import preview from "vue-photo-preview";
import "vue-photo-preview/dist/skin.css";
Vue.use(preview);
import Vconsole from "vconsole";
//全局过滤器
import * as filters from "@/filters/index.js";
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
// ---------------------------主域名 等环境配置  开始-----------------------------
let url = window.location.href;
// 测试环境
if (url.indexOf("m3.xlxt.net") > 0) {
  new Vconsole();
  Vue.prototype._ENV = 3;
  Vue.prototype.aliossHost = "https://img.xlxt.net/";
  Vue.prototype.serverHost = "https://www3.xlxt.net/AliyunOSS/GetOssSignature/";
} else if (url.indexOf("mbeta.xlxt.net") > 0) {
  // 正式环境
  Vue.prototype._ENV = 4;
  Vue.prototype.aliossHost = "https://img.xlxt.net/";
  Vue.prototype.serverHost =
    "https://wwwbeta.xlxt.net/AliyunOSS/GetOssSignature/";
} else if (url.indexOf("m6.xlxt.net") > 0) {
  // 仿真环境
  // new Vconsole();
  Vue.prototype.aliossHost = "https://img.xlxt.net/";
  Vue.prototype.serverHost = "https://www6.xlxt.net/AliyunOSS/GetOssSignature/";
  Vue.prototype.urlPath = "https://m6.xlxt.net";
} else {
  Vue.prototype.urlPath = "";
  new Vconsole();
  Vue.prototype._ENV = 3;
  // 本地环境
  //上传配置
  Vue.prototype.aliossHost = "https://img.meinianuniversity.com/";
  Vue.prototype.serverHost =
    "https://lms.meinianuniversity.com/AliyunOSS/GetOssSignature";
}
// ---------------------------主域名 等环境配置  结束-----------------------------
Vue.prototype.imgURL = "https://img.xlxt.net/";
//图片懒加载
import VueLazyLoad from "vue-lazyload";
Vue.use(VueLazyLoad, {
  loading: require("./assets/loading.png"),
  error: require("./assets/loading.png")
});
// 跳转保存上一级路由
let backBtn = true // 解决按钮快速点击造成路由死循环BUG
Vue.prototype.setBaseUrl = (backUrl = "backUrl") => {
  if (!backBtn) {
    return
  }
  backBtn = false
  localStorage.removeItem("examRuleKeep");
  localStorage.removeItem(backUrl);
  let isRouter = {
    path: router.app.$route.path,
    name: router.app.$route.name,
    query: router.app.$route.query
  };
  localStorage.setItem(backUrl, JSON.stringify(isRouter));
  setTimeout(() => {
    backBtn = true
  }, 500)
};
// 输入框过滤
Vue.prototype.inputFormat = (text, max) => {
  text = text
    .replace(
      /[^.\\,/，。!@#$%^&*()\-+=_\[\]{}|~`;:"'《》？、；“”‘’（）【】{}！￥……\s0-9a-zA-Z\u4e00-\u9fa5]+/gi,
      ""
    )
    .trim();
  let len = getByteLen(text);
  if (len > max) {
    text = text.substring(0, text.length - 1);
  }
  return text.substring(0, max);
};
// 检测是否有网络
Vue.prototype.isOnLine =()=> {
  return window.navigator.onLine
}
function getByteLen(val) {
  var len = 0;
  for (var i = 0; i < val.length; i++) {
    var a = val.charAt(i);
    if (a.match(/[^\x00-\xff]/gi) != null) {
      len += 2;
    } else {
      len += 1;
    }
  }
  return len;
}
new Vue({
  el: "#app",
  router,
  store,
  components: {
    App
  },
  template: "<App/>"
});
