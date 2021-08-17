/**
 * @description 记录官方直播、录播的观看记录本地存储一个月
 * @author Lee
 */
import storage from "good-storage";
import moment from "moment";
const LIVE_HISTORY_LIST = "LIVE_HISTORY_LIST";
import util from "@/common/js/util";

// 添加一个记录
export const addHistory = list => {
  list.AttendTime = moment().format();
  let historyList = storage.get(LIVE_HISTORY_LIST) || [];
  const index = historyList.findIndex(item => {
    return item.LiveID == list.LiveID;
  });
  list.u = util.getCookie("u");
  // 之前数组没有
  if (index < 0) {
    historyList.unshift(list);
  } else {
    historyList.splice(index, 1);
    historyList.unshift(list);
  }
  storage.set(LIVE_HISTORY_LIST, historyList);
};
// 获取历史记录
export const getHistory = () => {
  return storage.get(LIVE_HISTORY_LIST) || [];
};
// 清空历史
export const clearHistory = () => {
  storage.set(LIVE_HISTORY_LIST, []);
};
