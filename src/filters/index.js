/*
 * @Author: 李环玉
 * @Date: 2020-11-06 08:57:12
 * @LastEditTime: 2021-02-02 15:10:50
 * @LastEditors: Please set LastEditors
 * @Description: 全局过滤器,在这里按照格式定义可在组件中直接用，不用引入，例如： 组件中可以直接这样写 {{time | formattingTime}}
 * @FilePath: \xlxt-app\src\filters\index.js
 */

//2020-10-10 12:00:00格式日期格式化 输出 2020-10-10 12:00
let formattingTime = time => {
  if (time) {
    let date = new Date(time.replace(/\-/g, "/"));
    let year = date.getFullYear();
    let month =
      date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let seconds =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return `${year}-${month}-${day}  ${hours}:${minutes}`;
  }
};
//2020-10-10 12:00:00格式日期格式化   输出2020.07.04 12:00
let formatTime = time => {
  if (time) {
    let date = new Date(time.replace(/\-/g, "/"));
    let year = date.getFullYear();
    let month =
      date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return `${year}.${month}.${day}  ${hours}:${minutes}`;
  }
};
let capitalize = value => {
  if (!value) return "";
  value = value.toString();
  if (value.length > 10) {
    return value.substr(0, 10);
  } else {
    return value;
  }
};
/**
 * @function 格式化图片兼容长/短路径图片
 * @param {String} formatImg 图片地址
 */
const formatImg = formatImg => {
  const hostUrl = "img.xlxt.net";
  if (hostUrl.includes(formatImg)) {
    return formatImg;
  } else {
    return `https://img.xlxt.net/${formatImg}`;
  }
};
//处理提现手续费
let poundage = value => {
  if(value.toString().includes('.')) {
    let val = value.toString()
    if(value.toString().length <= 4){
      return value
    } else {
      let result = Math.ceil(value*100)
      return result/100
    }
  } else {
    return value
  }
}
export { formattingTime, formatTime, capitalize,poundage,formatImg };