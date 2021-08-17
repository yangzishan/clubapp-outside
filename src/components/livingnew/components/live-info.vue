<template>
  <div class="live-info">
    <div class="info-text">
      <p class="live-name">
        {{ LiveInfo.LiveName }}
      </p>
      <p class="live-time">
        <span class="time">开始时间:{{ turntime(LiveInfo) }}</span>
        <span class="num"
          ><span class="bj"></span> {{ LiveInfo.LivePlayBackCount }}</span
        >
      </p>
    </div>
    <p class="line"></p>
    <div class="live-teacher">
      <div class="teacher-con">
        <img v-lazy="LiveInfo.TeacherImg" alt="" class="herder" />
        <p class="teacher-text">
          <span class="name one-hang">{{ LiveInfo.TeacherName }}</span>
          <span class="liyu one-hang">{{ LiveInfo.MajorNames }}</span>
        </p>
      </div>
      <div class="teacher-wrapper">
        <p class="teacher-info two-hang" :style="style">
          {{ LiveInfo.TeacherIntroduce }}
        </p>
        <p class="showmore" v-if="showTeacher">
          <span data-sensors-click @click="openTeacher">{{
            !isAllT ? "展开" : "收起"
          }}</span>
        </p>
      </div>

      <p class="course-con">直播简介</p>
      <p class="course-info " :style="style" v-html="LiveInfo.Introduction"></p>
    </div>
  </div>
</template>

<script>
import util from "@/common/js/util.js";
export default {
  computed: {},
  props: {
    LiveInfo: {
      type: Object,
      default: {
        AttendID: "",
        BarrageCount: 0,
        CoverUrl: "",
        DepartMentId: 0,
        DepartMents: null,
        DepartmentName: null,
        EndTime: "",
        FirePower: 0,
        Host: "",
        Introduction: "",
        IsCode: 0,
        IsLive: 1,
        IsOnline: 0,
        IsPwd: false,
        Labels: "",
        LabelsName: null,
        LiveName: "",
        LivePlayBackCount: 0,
        LiveSeeCount: 0,
        LiveStatus: 2,
        MajorNames: "",
        OnlinePeople: 0,
        Price: null,
        Pwd: null,
        Sort: 0,
        StartTime: "",
        TeacherID: 0,
        TeacherImg: "",
        TeacherIntroduce: "",
        TeacherName: "",
        Uid: ""
      }
    }
  },
  data() {
    return {
      showBtn: false,
      isAll: false,
      style: {
        "-webkit-line-clamp": 5
      },
      isAllT: false,
      showTeacher: false
    };
  },
  watch: {
    "LiveInfo.TeacherIntroduce"() {
      if (this.LiveInfo.TeacherIntroduce.length > 120) {
        this.showTeacher = true;
      }
    }
  },
  methods: {
    turntime(item) {
      return this.$moment(item.StartTime).format("YYYY-MM-DD HH:mm");
    },
    openTeacher() {
      this.isAllT = !this.isAllT;
      this.style["-webkit-line-clamp"] = this.isAllT ? 10004 : 5;
    }
  }
};
</script>

<style scoped="scoped" lang="scss">
.info-text {
  padding: 0.5rem 0.3rem;
  font-size: 0;

  .live-name {
    color: #333333;
    font-size: 0.34rem;
    line-height: 0.48rem;
    font-weight: 600;
    padding-bottom: 0.3rem;
  }

  .live-time {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0;

    .time {
      font-size: 0.28rem;
      color: #848484;
      line-height: 0.4rem;
    }

    .num {
      display: flex;
      align-items: center;
      color: #848484;
      font-size: 0.28rem;
      .bj {
        display: block;
        width: 0.24rem;
        height: 0.28rem;
        margin-right: 0.08rem;
        background: url("../img/hot.png") center no-repeat;
        background-size: 0.24rem 0.28rem;
      }
    }
  }
}

.line {
  width: 100%;
  height: 0.16rem;
  background: #f9f9f9;
}

.live-teacher {
  padding: 0.5rem 0.34rem 0.5rem 0.3rem;

  .teacher-con {
    font-size: 0;
    display: flex;

    .herder {
      width: 0.8rem;
      flex: 0 0 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      margin-right: 0.3rem;
    }

    .teacher-text {
      margin-bottom: 0.36rem;
      font-size: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .name {
        font-size: 0.28rem;
        color: #333333;
        line-height: 0.42rem;
        font-weight: 600;
      }

      .liyu {
        font-size: 0.24rem;
        color: #848484;
        line-height: 0.37rem;
      }
    }
  }

  .teacher-info {
    font-size: 0.28rem;
    color: #848484;
    line-height: 0.44rem;
  }
  .teacher-wrapper {
    margin-bottom: 0.5rem;
  }
  .course-con {
    font-size: 0.32rem;
    color: #333;
    line-height: 0.45rem;
    font-weight: 600;
  }
  .course-info {
    margin-top: 0.3rem;
    font-size: 0.3rem;
    color: #333;
    line-height: 0.44rem;
  }
  .showmore {
    margin-top: 0.08rem;
    text-align: right;
    font-size: 0.26rem;
    color: #2f54eb;
  }
}
</style>
