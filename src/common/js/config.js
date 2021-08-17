/**
 * @file 定义全局公共常量
 * @author Lee
 */

export const OK_CODE = 200; // 成功code
export const PULL_NUM = 40; // scroll下拉距离
export const PAGESIZE = 10; // 每页条数
export const LIVE_FONT_SIZE = 20; // 直播弹幕大小
export const LIVE_MES_COLOR = ["FFFFFF", "1890FF", "FA8C15", "02C6AB"]; // 直播弹幕颜色 随机选一

/**
 * @class 弹幕类
 * @param mode  表示弹幕的类型，
 * @param text  表示弹幕的文字内容
 * @param stime 表示弹幕相对于视频位置的开始时间（ms），0即在视频开始立即出现 毫秒
 * @param size 弹幕的文字大小
 * @param color 文字颜色
 * @param dur 表示弹幕的总生存时间（ms）。默认情况下，对于滚动弹幕这个数字是 4000
 * @param shadow 是否显示弹幕描边/阴影
 */
export class dmClass {
  constructor(
    mode,
    text,
    stime,
    size,
    dur = 4000,
    color,
    shadow = false,
    absolute = false
  ) {
    this.mode = mode;
    this.text = text;
    this.stime = stime;
    this.size = size;
    this.color = color ? color : checkOne();
    this.dur = dur;
    this.shadow = shadow;
  }
}
// 随机选择一个颜色
function checkOne() {
  return LIVE_MES_COLOR[parseInt(Math.random() * LIVE_MES_COLOR.length)];
}
