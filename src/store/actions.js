//提交定义得动作
import * as types from "./mutations-type";

export const nextSong = ({ commit, state }, status) => {
  //当前所在的章节
  let nowIndex = state.activeIndex;
  //当前所在的章节下的课件
  let nowIndex2 = state.activeIndex2;

  //最大的章节数
  let maxLength = state.playList.length - 1;
  //当前章节做的的课件数
  let maxCourseLength = state.playList[nowIndex].cw.length - 1;
 
  //点击下一首
  let nextIndex = nowIndex2 + 1;
  //假如点击下一首 大于当前章节的课件数
  if (nextIndex > maxCourseLength) {
    //假如是章节的最后一个课件
    //去下一章节
    if (nowIndex + 1 <= maxLength) {
      //没有超过章节数
      commit(types.SET_ACTIVE_INDEX, nowIndex + 1);
      commit(types.SET_ACTIVE_INDEX2, 0);
      commit(types.SET_MP3INFO, state.playList[nowIndex + 1].cw[0]);
    } else {
      //在最后一章的最后一个课件点击下一首
      // return
      commit(types.SET_ACTIVE_INDEX, 0);
      commit(types.SET_ACTIVE_INDEX2, 0);
      commit(types.SET_MP3INFO, state.playList[0].cw[0]);
    }
  } else {
    //假如不是是章节的最后一个课件
    commit(types.SET_ACTIVE_INDEX2, nextIndex);
    commit(types.SET_MP3INFO, state.playList[nowIndex].cw[nextIndex]);
  }
  commit(types.SET_PERCENT, 0);
  commit(types.SET_CURRENTTIME, 0);
  commit(types.SET_PLAY_STATE, true);
};

export const prevSong = ({ commit, state }, status) => {
  //当前所在的章节
  let nowIndex = state.activeIndex;
  //当前所在的章节下的课件
  let nowIndex2 = state.activeIndex2;

  //最大的章节数
  let maxLength = state.playList.length - 1;
  //当前章节做的的课件数
  let maxCourseLength = state.playList[nowIndex].cw.length - 1;

  // if(nowIndex==0&&nowIndex2==0) return
  //假如点击上一首 等于0  已经是当前章节的第一首歌 去上一章节的 第一首歌
  if (nowIndex2 == 0) {
    if (nowIndex != 0) {
      //不是第一章
      commit(types.SET_ACTIVE_INDEX, nowIndex - 1);
      commit(
        types.SET_ACTIVE_INDEX2,
        state.playList[nowIndex - 1].cw.length - 1
      );
      commit(
        types.SET_MP3INFO,
        state.playList[nowIndex - 1].cw[
          state.playList[nowIndex - 1].cw.length - 1
        ]
      );
    } else {
      // 是第一章 就去最后一章的最后一首歌
      commit(types.SET_ACTIVE_INDEX, maxLength );
      commit(types.SET_ACTIVE_INDEX2, state.playList[maxLength].cw.length - 1);
      commit(
        types.SET_MP3INFO,
        state.playList[maxLength].cw[state.playList[maxLength].cw.length - 1]
      );
    }
  } else {
    //不是当前章节的第一首歌
    commit(types.SET_ACTIVE_INDEX2, nowIndex2 - 1);
    commit(types.SET_MP3INFO, state.playList[nowIndex].cw[nowIndex2 - 1]);
  }
  commit(types.SET_PERCENT, 0);
  commit(types.SET_CURRENTTIME, 0);
  commit(types.SET_PLAY_STATE, true);
};
