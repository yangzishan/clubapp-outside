import { CheckLivePwdGF, CheckLivePwd } from "@/api/lee-sever";
import { OK_CODE } from "@/common/js/config";
import { addHistory } from "./history";
export default {
  components: {
    CheckPassword: () => import("@/base/PasswordBox")
  },
  data() {
    return {
      visible: false, // 是否显示密码框
      LiveID: 0,
      psdError: false
    };
  },
  methods: {
    /**
     * @function 验证密码
     */
    async _initPwd(pwd) {
      const FN = this.IsGFLive ? CheckLivePwdGF : CheckLivePwd;
      const { Code, Data } = await FN({
        liveId: this.recLIveID ? this.recLIveID : this.LiveID,
        pwd
      });
      if (Code == OK_CODE) {
        if (Data) {
          if (this.IsGFLive) addHistory(this.liveObj);
          this.$router.push({
            path: "/play-live",
            query: {
              LiveID: this.recLIveID ? this.recLIveID : this.LiveID,
              IsLive: this.IsLive ? 1 : 0,
              hideRec: this.hideRec
            }
          });
          this.visible = false;
        } else {
          this.psdError = true;
        }
      }
    }
  }
};
