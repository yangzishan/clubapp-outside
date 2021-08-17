<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop>
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <mu-icon
            class="icon"
            :value="iconValue"
            v-if="iconValue"
            data-sensors-click
            @click="iconClick"
          ></mu-icon>
          <div class="text" v-if="text">
            {{ text }}
            <p class="second-text" v-if="secondText">{{ secondText }}</p>
          </div>
          <p class="text" v-else>
            <mu-form ref="form" :model="validateForm" class="mu-demo-form">
              <mu-form-item
                label="请输入密码"
                prop="password"
                :rules="passwordRules"
              >
                <mu-text-field
                  type="text"
                  v-model="validateForm.password"
                  prop="password"
                  :error-text="errorText"
                ></mu-text-field>
              </mu-form-item>
            </mu-form>
          </p>
          <div class="operate">
            <div @click="cancel" class="operate-btn left" v-if="cancelBtn">
              {{ cancelBtnText }}
            </div>
            <div @click="confirm" class="operate-btn" v-if="confirmBtn">
              {{ confirmBtnText }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="es6">
export default {
  props: {
    iconValue: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    secondText: {
      type: String,
      default: ""
    },
    confirmBtnText: {
      type: String,
      default: "确定"
    },
    cancelBtnText: {
      type: String,
      default: "取消"
    },
    cancelBtn: {
      type: Boolean,
      default: true
    },
    confirmBtn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showFlag: false,
      passwordRules: [
        { validate: val => !!val, message: "必须填写密码" }
        // { validate: (val) => val.length >= 4 , message: '密码长度不能小于4位'}
      ],
      validateForm: {
        password: ""
      },
      errorText: ""
    };
  },
  methods: {
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    },
    cancel() {
      this.hide();
      this.$emit("cancel");
    },
    confirm() {
      //  this.hide();
      this.$emit("confirm");
    },
    iconClick() {
      this.hide();
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/stylus">
.mu-form-item {
  margin-bottom: 0;
}

.confirm {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.3);
}

.confirm-fade-enter-active {
  animation: confirm-fadein 0.3s;
  .confirm-content {
    animation: confirm-zoom 0.3s;
  }
}

.confirm-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;

  .confirm-content {
    width: 4.96rem;
    border-radius: 14px;
    background: #fff;

    .text {
      padding: 0.6rem 0.04rem 0.6rem 0.04rem;
      line-height: 22px;
      text-align: center;
      font-size: 0.34rem;
      font-weight: bold;
      color: #505050;
    }

    .icon {
      display: flex;
      justify-content: center;
      font-size: 1.8rem;
      padding-top: 0.44rem;
      color: #3a6db7;
    }

    .second-text {
      display: flex;
      justify-content: center;
      font-size: 0.22rem;
      font-weight: 300;
      color: rgba(153, 153, 153, 1);
      //padding-bottom: 0.28rem;
    }

    .operate {
      display: flex;
      align-items: center;
      text-align: center;
      font-size: rgba(255, 255, 255, 0.5);

      .operate-btn {
        font-size: 0.3rem;
        flex: 1;
        line-height: 22px;
        padding: 10px 0;
        border-top: 1px solid #d8d8d8;
        color: #2f54eb;
      }

      .left {
        border-right: 1px solid#d8d8d8;
        color: #505050;
      }
    }
  }
}

@keyframes confirm-fadein {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes confirm-zoom {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

.mu-form {
  padding: 0.1rem;
}
</style>
