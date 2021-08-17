import * as types from "./mutations-type.js";
// 定义修改得动作
const mutations = {
  [types.SET_MP3INFO](state, status) {
    state.mp3Info = Object.assign({}, status);
  },
  [types.SET_PLAY_STATE](state, flag) {
    state.playState = flag;
  },
  [types.SET_PLAY_LIST](state, list) {
    state.playList = list;
  },
  [types.SET_ACTIVE_INDEX](state, index) {
    state.activeIndex = index;
  },
  [types.SET_ACTIVE_INDEX2](state, index2) {
    state.activeIndex2 = index2;
  },
  [types.SET_SONG_TIME](state, time) {
    state.durationTime = time;
  },
  [types.SET_PERCENT](state, num) {
    state.percent = num;
  },
  [types.SET_CURRENTTIME](state, time) {
    state.currentTime = time;
  },
  [types.SET_COURSE_INFO](state, info) {
    state.courseInfo = info;
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag;
  },
  [types.SET_SONG_READY](state, flag) {
    state.songReady = flag;
  }
};

export default mutations;
