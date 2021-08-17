import axios from "axios"; // 引入axios
import QS from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
import util from "@/common/js/util.js";
import { strError } from "./error";
import { noEnterpriseInfo } from "./noEnterpriseInfo";
import router from "@/router/index";
// -----------------------主域名接口配置START----------------------------------------
let url = window.location.href;
let baseAjax = {};
var checkLogin = false;
// 测试
if (url.indexOf("m3.xlxt.net") > 0) {
  baseAjax = {
    lms: "https://www3.xlxt.net/",
    sso: "https://sso3.xlxt.net/",
    mq2: "https://mq3.xlxt.net/",
    jbk: "https://Medicalview3.xlxt.net/",
    yydq: "https://medical3.xlxt.net/",
    oss: "https://ossnew3.xlxt.net/",
    sale: "https://sale3.xlxt.net/",
    vote: "https://votenew3.xlxt.net/",
    userSso: "https://sso3.xlxt.net",
    view: "https://exam3.xlxt.net",
    courseOss: "https://ossnew3.xlxt.net",
    voteNew: "https://votenew3.xlxt.net/",
    mallUrl: "https://mall3.xlxt.net",
    wwwUrl: "https://www3.xlxt.net",
    examUrl: "https://newexam3.xlxt.net",
    exam: "https://exam3.xlxt.net/",
    learnMapUrl: "https://studymap3.xlxt.net",
    eMarketing: "https://marketing3.xlxt.net/",
    live: "https://live3.xlxt.net/",
    live2: "https://livechathub3.xlxt.net",
    class: "https://zhjk3.xlxt.net",
    tcm3:"https://tcm3.xlxt.net",
  };
} else if (url.indexOf("mbeta.xlxt.net") > 0) {
  // 正式
  baseAjax = {
    lms: "https://wwwbeta.xlxt.net/",
    sso: "https://ssobeta.xlxt.net/",
    mq2: "https://mqbeta.xlxt.net/",
    jbk: "https://Medicalviewbeta.xlxt.net/",
    yydq: "https://medicalbeta.xlxt.net/",
    oss: "https://ossbeta.xlxt.net/",
    sale: "https://salebeta.xlxt.net/",
    vote: "https://votenewbeta.xlxt.net/",
    userSso: "https://ssobeta.xlxt.net",
    view: "https://exambeta.xlxt.net",
    courseOss: "https://ossnewbeta.xlxt.net",
    voteNew: "https://votenewbeta.xlxt.net/",
    mallUrl: "https://mallbeta.xlxt.net",
    wwwUrl: "https://wwwbeta.xlxt.net",
    examUrl: "https://exambeta.xlxt.net",
    exam: "https://exambeta.xlxt.net/",
    learnMapUrl: "https://studymapbeta.xlxt.net",
    live: "https://livebeta.xlxt.net/",
    live2: "https://livechatbeta.xlxt.net",
    eMarketing: "https://marketingbeta.xlxt.net/",
    class: "https://zhjkbeta.xlxt.net",
    tcm3:"https://tcmbeta.xlxt.net",
  };
} else if (url.indexOf("m8.xlxt.net") > 0) {
  // 仿真
  baseAjax = {
    lms: "https://www8.xlxt.net/",
    sso: "https://sso8.xlxt.net/",
    mq2: "https://mq8.xlxt.net/",
    jbk: "https://Medicalview8.xlxt.net/",
    yydq: "https://medical8.xlxt.net/",
    oss: "https://ossnew8.xlxt.net/",
    sale: "https://sale8.xlxt.net/",
    vote: "https://votenew8.xlxt.net/",
    userSso: "https://sso8.xlxt.net",
    view: "https://exam8.xlxt.net",
    courseOss: "https://ossnew8.xlxt.net",
    voteNew: "https://votenew8.xlxt.net/",
    examUrl: "https://newexam8.xlxt.net/",
    mallUrl: "https://mall8.xlxt.net",
    wwwUrl: "https://www8.xlxt.net",
    exam: "https://exam8.xlxt.net/",
    learnMapUrl: "https://studymap8.xlxt.net"
  };
} else if (url.indexOf("m6.xlxt.net") > 0) {
  // 新版仿真
  baseAjax = {
    lms: "https://www6.xlxt.net/",
    sso: "https://sso6.xlxt.net/",
    mq2: "https://mq6.xlxt.net/",
    jbk: "https://Medicalview6.xlxt.net/",
    yydq: "https://medical6.xlxt.net/",
    oss: "https://ossnew6.xlxt.net/",
    sale: "https://sale6.xlxt.net/",
    vote: "https://votenew6.xlxt.net/",
    userSso: "https://sso6.xlxt.net",
    view: "https://exam6.xlxt.net",
    courseOss: "https://ossnew6.xlxt.net",
    voteNew: "https://votenew6.xlxt.net/",
    examUrl: "https://exambeta6.xlxt.net/",
    mallUrl: "https://mall6.xlxt.net",
    wwwUrl: "https://www6.xlxt.net",
    exam: "https://exam6.xlxt.net/",
    learnMapUrl: "https://studymap6.xlxt.net",
    live: "https://live6.xlxt.net/",
    live2: "https://livechathub6.xlxt.net",
    eMarketing: "https://marketing6.xlxt.net/",
    class: "https://zhjk6.xlxt.net",
    tcm3:"https://tcm6.xlxt.net",
  };
} else {
  // 本地
  baseAjax = {
    lms: "",
    sso: "",
    mq2: "",
    jbk: "",
    yydq: "",
    oss: "",
    sale: "",
    vote: "",
    userSso: "https://sso3.xlxt.net",
    view: "",
    courseOss: "https://ossnew2.xlxt.net",
    voteNew: "https://Votenew3.xlxt.net",
    examUrl: "https://newexam3.xlxt.net/",
    mallUrl: "",
    wwwUrl: "",
    exam: "",
    learnMapUrl: "",
    eMarketing: "https://marketing3.xlxt.net/",
    live: "",
    live2: "https://livechathub3.xlxt.net",
    class: "https://zhjk3.xlxt.net",
    tcm3:"",
  };
}
export let baseUrl = baseAjax;
if (localStorage.getItem('u')) {
  util.setCookie("k", localStorage.getItem('k'));
  util.setCookie("u", localStorage.getItem('u'));
  localStorage.removeItem('u')
  localStorage.removeItem('k')
}
// -----------------------主域名接口配置END----------------------------------------
axios.defaults.timeout = 30000;
// axios.defaults.headers = headers
// 请求的url
let urls = "";
let paramsInfo = "";
//http request 请求拦截器
axios.interceptors.request.use(
  config => {
    const headers = {
      // 'k': '801e991b0c7f0a4086d83aeb037a8f1c',
      // 'u': 'ab9dffa992068effa60ed58bb0946c71',
      // 考试测试UK
      // k: "ccf9df3605f105db78cb5ae03a72aedb",
      // u: "d4fd0616fab084ffec432fdd91c11629",
      // 讲师iD
      // 'k': '1b9b5a3de05ea404f3ba03a77fbfc8e8',
      // 'u': '13d20943730b48471e24aa7e9c772334',
      // 企业test
      // k: "33385dc6fbe07973d006564b075d1ab4",
      // u: "BEBA7CE2-EC72-482F-BAC9-6DB5A8BADA97",  
      u: util.getCookie("u"),
      k: util.getCookie("k"),
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    };
    for (const key in headers) {
      if (!headers[key]) {
        delete headers[key];
      }
    }
    config.headers = headers;
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);
// 响应拦截器即异常处理
axios.interceptors.response.use(
  response => {
    if (response.headers.k) {
      util.setCookie("k", response.headers.k);
      util.setCookie("u", response.headers.u);
    }
    urls = "";
    paramsInfo = "";
    if (response.data.Code == 401) {
      util.outLogin();
    }
    if (
      response.data.Code == 401 &&
      checkLogin &&
      window.location.href.indexOf("ReturnUrl") === -1
    ) {
      util.outLogin();
    }
    if (response.data.Code == 403) {
      response.data.noEnterpriseInfo = noEnterpriseInfo;
      return response;
    }
    return response;
  },
  err => {
    window.hideProgress ? window.hideProgress() : "";
    let errorObj = {
      data: {
        Code: 5001, //显示网络错误
        Data: strError
      }
    };
    urls = "";
    paramsInfo = "";
    // 处理断网情况，带有响应类名都会显示断网提示页
    let net = document.querySelector(".is-network");
    if (net) {
      net.innerHTML = strError;
      net.querySelector(".wrapper").style.top = "0.88rem";
    }
    return Promise.resolve(errorObj);
  }
);

// get方法， 对应get请求 param {
//  String
// }
// url[请求的url地址] *
// param {
//    Object
//  }
// params[请求时携带的参数]
export function get(url, params, login = false) {
  // 防止并发
  if (urls == url && paramsInfo == JSON.stringify(params)) {
    return;
  }
  checkLogin = login;
  urls = url;
  paramsInfo = JSON.stringify(params);
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params, login = false) {
  checkLogin = login;
  // 防止并发
  if (urls == url && paramsInfo == JSON.stringify(params)) {
    return;
  }
  urls = url;
  paramsInfo = JSON.stringify(params);
  return new Promise((resolve, reject) => {
    axios
      .post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
