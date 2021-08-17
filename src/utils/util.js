var DEFAULT_PATTERN = "yyyy-MM-dd";
import router from '@/router'
import moment from "moment";
import Vue from "vue";
import storage from "good-storage";
import CryptoJS from "crypto-js";
function padding(s, len) {
  var len = len - (s + "").length;
  for (var i = 0; i < len; i++) {
    s = "0" + s;
  }
  return s;
}

export default {
  outLogin: function() {
    storage.remove("enterpriseInfo");
    storage.remove("memberInfo");
    storage.remove("likeList");
    storage.remove("examRuleKeep");
    storage.remove("nolikeList");
    storage.remove("lastCourse");
    storage.remove("vipList");
    this.delCookie("k");
    this.delCookie("u");
    this.clearCookie()
  },
  // 清除所有cookie
  clearCookie: function (){
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
    for (var i = keys.length; i--;)
    document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
    }
  },
  // 字符串加密
  encrypt: function(word, keyStr) {
    keyStr = keyStr ? keyStr : "abcdefgabcdefg12";
    var key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  },
  //解密
  decrypt: function(word, keyStr) {
    keyStr = keyStr ? keyStr : "abcdefgabcdefg12";
    var key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    var decrypt = CryptoJS.AES.decrypt(word, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  },
  // 图片转base 64
  convertImgToBase64: function(url, callback, outputFormat) {
    var canvas = document.createElement("CANVAS"),
      ctx = canvas.getContext("2d"),
      img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL(outputFormat || "image/png");
      callback.call(this, dataURL);
      canvas = null;
    };
    img.src = url;
  },
  getCookie: function(name) {
    var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) return decodeURIComponent(arr[2]);
    else return null;
  },
  setCookie: function(name, value) {
    document.cookie = name + "=" + escape(value);
  },
  delCookie: function(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },
  getQueryStringByName: function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var context = "";
    if (r != null) context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined"
      ? ""
      : context;
  },
  formatDate: {
    format: function(date, pattern) {
      pattern = pattern || DEFAULT_PATTERN;
      return pattern.replace(SIGN_REGEXP, function($0) {
        switch ($0.charAt(0)) {
          case "y":
            return padding(date.getFullYear(), $0.length);
          case "M":
            return padding(date.getMonth() + 1, $0.length);
          case "d":
            return padding(date.getDate(), $0.length);
          case "w":
            return date.getDay() + 1;
          case "h":
            return padding(date.getHours(), $0.length);
          case "m":
            return padding(date.getMinutes(), $0.length);
          case "s":
            return padding(date.getSeconds(), $0.length);
        }
      });
    },
    parse: function(dateString, pattern) {
      var matchs1 = pattern.match(SIGN_REGEXP);
      var matchs2 = dateString.match(/(\d)+/g);
      if (matchs1.length == matchs2.length) {
        var _date = new Date(1970, 0, 1);
        for (var i = 0; i < matchs1.length; i++) {
          var _int = parseInt(matchs2[i]);
          var sign = matchs1[i];
          switch (sign.charAt(0)) {
            case "y":
              _date.setFullYear(_int);
              break;
            case "M":
              _date.setMonth(_int - 1);
              break;
            case "d":
              _date.setDate(_int);
              break;
            case "h":
              _date.setHours(_int);
              break;
            case "m":
              _date.setMinutes(_int);
              break;
            case "s":
              _date.setSeconds(_int);
              break;
          }
        }
        return _date;
      }
      return null;
    }
  },
  //����ʱ���ʽ
  jsonDateFormat: function(jsonDate) {
    try {
      var date = new Date(
        parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10)
      );
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      var milliseconds = date.getMilliseconds();
      return date.getFullYear() + "-" + month + "-" + day;
    } catch (ex) {
      return "";
    }
  },
  //特殊日期转换
  specialDateFormat: function(data) {
    var d = new Date(data);
    return d.getFullYear() + "." + (d.getMonth() + 1) + "." + d.getDate();
  },
  specialDateFormatAll: function(data) {
    var date = new Date(data);
    var month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return (
      date.getFullYear() + "." + month + "." + day + " " + hours + ":" + minutes
    );
  },
  //����ʱ���ʽ
  jsonDateFormatAllTime: function(jsonDate) {
    try {
      var date = new Date(
        parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10)
      );
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var milliseconds = date.getMilliseconds();
      return (
        date.getFullYear() +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    } catch (ex) {
      return "";
    }
  },
  jsonDateFormatAllTime2: function(jsonDate) {
    try {
      var date = new Date(
        parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10)
      );
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var milliseconds = date.getMilliseconds();
      return (
        date.getFullYear() +
        "." +
        month +
        "." +
        day +
        " " +
        hours +
        ":" +
        minutes
      );
    } catch (ex) {
      return "";
    }
  },
  jsonDateFormatAllTime3: function(jsonDate) {
    try {
      var date = new Date(
        parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10)
      );
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var milliseconds = date.getMilliseconds();
      return month + "." + day + " " + hours + ":" + minutes;
    } catch (ex) {
      return "";
    }
  },
  jsonDateFormatAllTime4: function(jsonDate) {
    try {
      var date = new Date(
        parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10)
      );
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var milliseconds = date.getMilliseconds();
      return month + "月" + day + "日  " + hours + ":" + minutes;
    } catch (ex) {
      return "";
    }
  },
  jsonDateFormatAllTime5: function(data) {
    try {
      var date = new Date(data);
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var milliseconds = date.getMilliseconds();
      return (
        month + "月" + day + "日  " + hours + ":" + minutes + ":" + seconds
      );
    } catch (ex) {
      return "";
    }
  },
  jsonDateFormatAllTime6: function(data) {
    try {
      var date = new Date(data);
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var milliseconds = date.getMilliseconds();
      return (
        date.getFullYear() +
        "年" +
        month +
        "月" +
        day +
        "日  " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    } catch (ex) {
      return "";
    }
  },
  jsonDateFormatDayTime: function(jsonDate) {
    try {
      var date = new Date(
        parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10)
      );
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var milliseconds = date.getMilliseconds();
      return date.getFullYear() + "-" + month + "-" + day;
    } catch (ex) {
      return "";
    }
  },
  //����ʱ���ʽ
  jsonDateFormatDateTime: function(jsonDate) {
    try {
      var date = new Date(
        parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10)
      );
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var milliseconds = date.getMilliseconds();
      return (
        date.getFullYear() +
        "." +
        month +
        "." +
        day +
        " " +
        hours +
        ":" +
        minutes
      );
    } catch (ex) {
      return "";
    }
  },
  jsonDateFormatDayBasicsTime: function(jsonDate) {
    try {
      var date = new Date(
        parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10)
      );
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var milliseconds = date.getMilliseconds();
      return date.getFullYear() + "." + month + "." + day;
    } catch (ex) {
      return "";
    }
  },
  //��ȡʱ��EL��ʱ��
  jsonDateFormatEL: function(date) {
    try {
      var date = date;
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds = date.getSeconds();
      var milliseconds = date.getMilliseconds();
      return (
        date.getFullYear() +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes
      );
    } catch (ex) {
      return "";
    }
  },
  //��ȡʱ��EL��ʱ��
  jsonDateFormatAll: function(date) {
    try {
      var date = date;
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var milliseconds = date.getMilliseconds();
      return (
        date.getFullYear() +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    } catch (ex) {
      return "";
    }
  },
  //��ȡʱ��EL��ʱ��
  jsonDateFormatDay: function(date) {
    try {
      var date = date;
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds = date.getSeconds();
      var milliseconds = date.getMilliseconds();
      return date.getFullYear() + "-" + month + "-" + day;
    } catch (ex) {
      return "";
    }
  },
  formatDuring: function(mss) {
    let hours =
      (mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) < 10
        ? "0" + parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        : parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes =
      (mss % (1000 * 60 * 60)) / (1000 * 60) < 10
        ? "0" + parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
        : parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    let seconds =
      (mss % (1000 * 60)) / 1000 < 10
        ? "0" + parseInt((mss % (1000 * 60)) / 1000)
        : parseInt((mss % (1000 * 60)) / 1000);
    return hours + ":" + minutes + ":" + seconds;
  },
  jsonDateFormatUpAli: function() {
    try {
      var date = new Date();
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var milliseconds = date.getMilliseconds();
      return date.getFullYear() + "/" + month + "/" + day;
    } catch (ex) {
      return "";
    }
  },
  //ʱ��ת��
  turntime: function(sec) {
    var s = sec / 1000;
    var hh = parseInt(s / 3600); //1
    var mm = parseInt((s % 3600) / 60); //995/60=16
    var ss = parseInt(s % 60); //35
    ss = ss < 10 ? "0" + ss : ss;
    mm = mm < 10 ? "0" + mm : mm;
    hh = hh < 10 ? "0" + hh : hh;
    return hh + ":" + mm + ":" + ss;
  },
  turntimeMS: function(sec) {
    var s = sec / 1000;
    var hh = parseInt(s / 3600); //1
    var mm = parseInt((s % 3600) / 60); //995/60=16
    var ss = (s % 60).toFixed(0); //35
    ss = ss < 10 ? "0" + ss : ss;
    mm = mm < 10 ? "0" + mm : mm;
    hh = hh < 10 ? "0" + hh : hh;
    return mm + ":" + ss;
  },
  turntimeAllMS: function(sec) {
    var s = sec;
    var hh = parseInt(s / 3600); //1
    var mm = parseInt((s % 3600) / 60); //995/60=16
    var ss = (s % 60).toFixed(0); //35
    ss = ss < 10 ? "0" + ss : ss;
    mm = mm < 10 ? "0" + mm : mm;
    hh = hh < 10 ? "0" + hh : hh;
    let moreMM = 0;
    if (hh >= 1) {
      moreMM = hh * 60;
      mm = parseInt(mm) + parseInt(moreMM);
    }
    return mm + ":" + ss;
  },
  turnTimeOue: function(sec) {
    var s = sec;
    var hh = parseInt(s / 3600);
    var mm = parseInt((s % 3600) / 60);
    var ss = parseInt(s % 60);
    ss = ss < 10 ? "0" + ss : ss;
    mm = mm < 10 ? "0" + mm : mm;
    hh = hh < 10 ? "0" + hh : hh;
    return hh + ":" + mm + ":" + ss;
  },
  turntimeHMS: function(sec) {
    var s = sec / 1000;
    var hh = parseInt(s / 3600); //1
    var mm = hh * 60 + parseInt((s % 3600) / 60); //995/60=16
    var ss = (s % 60).toFixed(0); //35
    ss = ss < 10 ? "0" + ss : ss;
    mm = mm < 10 ? "0" + mm : mm;
    return mm + ":" + ss;
  },
  //将一个值插入一个数组，并限制长度  arr 要插入的数组 val要插入的值 compare逻辑函数 maxLen限制长度
  insertArray: function(arr, val, compare, maxLen) {
    const index = arr.findIndex(compare); //查找有没有
    if (index === 0) {
      //假如第一个就是他 萨摩耶不干
      return;
    }
    if (index > 0) {
      // 有 先删
      arr.splice(index, 1);
    }
    arr.unshift(val); //在开头加一个
    if (maxLen && arr.length > maxLen) {
      //假如超长 在末尾删一个
      arr.pop();
    }
    return arr;
  },

  //  将数字转化成汉字数字
  toChinesNum: function(num) {
    let changeNum = [
      "零",
      "一",
      "二",
      "三",
      "四",
      "五",
      "六",
      "七",
      "八",
      "九"
    ];
    let unit = ["", "十", "百", "千", "万"];
    num = parseInt(num);
    let getWan = temp => {
      let strArr = temp
        .toString()
        .split("")
        .reverse();
      let newNum = "";
      for (var i = 0; i < strArr.length; i++) {
        newNum =
          (i == 0 && strArr[i] == 0
            ? ""
            : i > 0 && strArr[i] == 0 && strArr[i - 1] == 0
            ? ""
            : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i])) +
          newNum;
      }
      newNum = newNum.replace(/^一十/g, "十");
      return newNum;
    };
    let overWan = Math.floor(num / 10000);
    let noWan = num % 10000;
    if (noWan.toString().length < 4) {
      noWan = "0" + noWan;
    }
    return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
  },
  queryPath: function(arry) {
    var path;
    arry.forEach(item => {
      path += `${item.key}=${item.val}`;
    });
    return `?${path}`;
  },
  dateFormat: function(val) {
    moment.locale("zh-cn", {
      months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split(
        "_"
      ),
      monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split(
        "_"
      ),
      weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
      weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
      weekdaysMin: "日_一_二_三_四_五_六".split("_"),
      longDateFormat: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY-MM-DD",
        LL: "YYYY年MM月DD日",
        LLL: "YYYY年MM月DD日Ah点mm分",
        LLLL: "YYYY年MM月DD日ddddAh点mm分",
        l: "YYYY-M-D",
        ll: "YYYY年M月D日",
        lll: "YYYY年M月D日 HH:mm",
        llll: "YYYY年M月D日dddd HH:mm"
      },
      meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
      meridiemHour: function(hour, meridiem) {
        if (hour === 12) {
          hour = 0;
        }
        if (meridiem === "凌晨" || meridiem === "早上" || meridiem === "上午") {
          return hour;
        } else if (meridiem === "下午" || meridiem === "晚上") {
          return hour + 12;
        } else {
          // '中午'
          return hour >= 11 ? hour : hour + 12;
        }
      },
      meridiem: function(hour, minute, isLower) {
        const hm = hour * 100 + minute;
        if (hm < 600) {
          return "凌晨";
        } else if (hm < 900) {
          return "早上";
        } else if (hm < 1130) {
          return "上午";
        } else if (hm < 1230) {
          return "中午";
        } else if (hm < 1800) {
          return "下午";
        } else {
          return "晚上";
        }
      },
      calendar: {
        sameDay: "[今天]LT",
        nextDay: "[明天]LT",
        nextWeek: "[下]ddddLT",
        lastDay: "[昨天]LT",
        lastWeek: "[上]ddddLT",
        sameElse: "L"
      },
      dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
      ordinal: function(number, period) {
        switch (period) {
          case "d":
          case "D":
          case "DDD":
            return number + "日";
          case "M":
            return number + "月";
          case "w":
          case "W":
            return number + "周";
          default:
            return number;
        }
      },
      relativeTime: {
        future: "刚刚",
        past: "%s前",
        s: "刚刚",
        ss: "%d秒",
        m: "1分钟",
        mm: "%d分钟",
        h: "1小时",
        hh: "%d小时",
        d: "1天",
        dd: "%d天",
        M: "1个月",
        MM: "%d个月",
        y: "1年",
        yy: "%d年"
      },
      week: {
        // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
        dow: 1, // Monday is the first day of the week.
        doy: 4 // The week that contains Jan 4th is the first week of the year.
      }
    });
    return moment(val)
      .startOf("second")
      .fromNow(true);
    // return moment(new Date).fromNow()
  },
  timeFormatAll(dateTimeStamp) {
    let second = 1000;
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let month = day * 30;
    let year = month * 12;
    if (dateTimeStamp == undefined) {
      return false;
    } else {
      dateTimeStamp = dateTimeStamp.replace(/\-/g, "/");
      //把时间pretime的值转为时间戳
      let sTime = new Date(dateTimeStamp).getTime();
      //获取当前时间的时间戳
      let now = new Date().getTime();
      let diffValue = now - sTime;
      if (diffValue < 0) {
        console.log("结束日期不能小于开始日期！");
        return dateTimeStamp;
      }
      let yearC = diffValue / year;
      let dayC = diffValue / day;
      let hourC = diffValue / hour;
      let minC = diffValue / minute;
      let secondC = diffValue / second;
      if (yearC > 1) {
        let date = new Date(sTime);
        return `${date.getFullYear()}日`;
      } else if (dayC > 1) {
        let date = new Date(sTime);
        let month =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return `${month}月${day}日`;
      } else if (hourC > 1) {
        return parseInt(hourC) + "小时前";
      } else if (minC > 1) {
        return parseInt(minC) + "分钟前";
      } else if (secondC > 1) {
        return parseInt(secondC) + "秒前";
      } else {
        return "刚刚";
      }
    }
  },
  // 评论编码
  encodeUnicode(str) {
    var res = [];
    for (var i = 0; i < str.length; i++) {
      res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return "\\u" + res.join("\\u");
  },
  isSafari() {
    var ua = navigator.userAgent.toLowerCase();
    if (
      ua.indexOf("applewebkit") > -1 &&
      ua.indexOf("mobile") > -1 &&
      ua.indexOf("safari") > -1 &&
      ua.indexOf("linux") === -1 &&
      ua.indexOf("android") === -1 &&
      ua.indexOf("chrome") === -1 &&
      ua.indexOf("ios") === -1 &&
      ua.indexOf("browser") === -1
    ) {
      return true;
    } else {
      return false;
    }
  },
  // 获取vue url 的path 和query
  getVuePathParams(url) {
    if (url && url.includes("https://")) {
      let o = url;
      let urlAry = o.split("?");
      let path = urlAry[0].split("#/")[1];
      console.log(urlAry[1]);
      let params = urlAry[1] ? urlAry[1].split("&") : [];
      let parsmsObj = {};
      params.forEach(item => {
        let ary = item.split("=");
        parsmsObj[ary[0]] = ary[1];
      });
      return [path, parsmsObj];
    } else {
      throw new Error("不是一个正确的链接");
    }
  },
  // 是否是微信
  isWeiXin() {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  },
  // 判断是不是ios
  isiOS() {
    const u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  },

  // 用于emarking配置链接返回上一级页面  (获取vue url 的path 和query)
  getEmarkingPath(url) {
    // let linkArr = ['bayerapp/index.html#/home','aishu/index.html#/home','MerckApp.html#/home','AbbottAPP.html#/home']
    // linkArr.forEach(item=>url.includes(item))
      let o = url;
      let urlAry = o.split("?");
      let path = urlAry[0].split("#/")[1];
      console.log(urlAry[1]);
      let params = urlAry[1] ? urlAry[1].split("&") : [];
      let parsmsObj = {};
      params.forEach(item => {
        let ary = item.split("=");
        parsmsObj[ary[0]] = ary[1];
      });
      return [path, parsmsObj];
  },
  //emarking 配置链接跳转
  emarkingPathFrom(url){
    let urlLink = window.location.href.split("#")[0];
    let urlLinkTwo = window.location.href.split("#/")[1];
    if(url){
      let newUrl = url.split("#")[0];
      if(url.includes("http")){
        if(newUrl == urlLink){
          if(url.indexOf("?") != -1){
            router.push({
              path: (url).split("#/")[1] + '&from=' + urlLinkTwo,
            })
          }else{
            router.push({
              path: (url).split("#/")[1] + '?from=' + urlLinkTwo,
            })
          }
        }else{
          window.location.href = url;
        }
      }else if(url.indexOf("salesList") != -1 || url.indexOf("courseList") != -1 || url.indexOf("articleList") != -1 || url.indexOf("activitySign") != -1){
        router.push({
          path: url,
        })
      }else{
        window.location.href = url;
      }
    }
  }

};
