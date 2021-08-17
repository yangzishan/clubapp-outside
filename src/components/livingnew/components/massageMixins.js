/**
 * @description 弹幕相关
 * @author Lee
 */
import {
  addEnterpriseCommentsReply,
  addEnterpriseComments
} from "@/api/lcc-server";
import { OK_CODE, dmClass, LIVE_FONT_SIZE } from "@/common/js/config";
import * as signalR from "@aspnet/signalr";
import storage from "good-storage";
import util from "@/common/js/util";
import { baseUrl } from "@/api/index";
export default {
  computed: {
    memberInfo() {
      return storage.get("memberInfo");
    },
    enterpriseInfo() {
      return storage.get("enterpriseInfo");
    }
  },
  data() {
    return {
      connection: null,
      startTime: null,
      IsHost: 1
    };
  },
  methods: {
    /**
     * @function 初始化弹幕
     */
    _initSignalR() {
      // 防止重复初始化
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(`${baseUrl.live2}/chatHub?uid=${this.uid}`)
        .build();
      this.start();
    },
    // 开始链接
    async start() {
      this._onMessage();
      await this.connection.start();
    },
    /**
     * @function 监听消息websocket
     */
    _onMessage() {
      const _this = this;
      this.connection.on("ReceiveMessage", ({ data }) => {
        _this._pushMessage(data);
      });
    },
    /**
     * @function 将监听到的信息push到对话框中(直播和录播)并显示到弹幕
     * @param {data} 消息obj
     */
    _pushMessage(data) {
      if (this.IsLive) {
        // 直播 交流区
        this.liveMessages.push({
          SendTime: this.$moment().format("YYYY-MM-DD, HH:mm:ss"),
          UserName: data.userName,
          UserImg: data.userImg,
          Content: data.content,
          IsHost: data.isHost,
          UserID: data.userID
        });
        this._showNews();
      }
      var time = 0;
      if (!this.IsLive) {
        time = parseInt(data.sendSecond) * 1000;
      }
      this._sendDMToScreen(data.content, time);
    },
    /**
     * @function 点击发送按钮分直播和录播两种情况 1 直播 0 录播
     */
    sendMessage(message) {
      if (!this.IsLive) {
        // 录播添加一条评论或回复 isReply 是回复
        if (this.isReply) {
          this._AddReply(message);
        } else {
          this._AddComments(message);
        }
      } 
      this._invoke(message);
    },
    /**
     * @function 向websocket发送一条信息,SendMessage方法名,obj参数
     * @param {String} Content
     * @description 不管是什么消息 只要发送了就发送一条
     */
    async _invoke(Content) {
      const obj = JSON.stringify({
        LiveUid: this.uid,
        UserID: this.memberInfo.AppUserID,
        UserName: this.memberInfo.Name,
        UserImg: this.memberInfo.HeadImg,
        Content,
        Type: 0,
        Num: 0,
        PType: 0,
        IsHost: this.IsHost,
        Contacts: this.enterpriseInfo.length
          ? this.enterpriseInfo[0].Contacts
          : "",
        UserPhone: this.memberInfo.LoginMobile,
        SendSecond: this.IsLive ? 0 : this.$refs.player.player.getCurrentTime()
      });
      await this.connection.invoke("Send", obj);
    },
    /**
     * @function 添加一条评论
     */
    async _AddComments(comment) {
      const { Code, Data } = await addEnterpriseComments({
        commentsType: 13,
        comment,
        entityID: this.LiveID,
        videoID: this.VideoID,
        sendTime: parseInt(
          this.$refs.player && this.$refs.player.player.getCurrentTime()
        )
      });
      if (Code == OK_CODE) {
        this.commentList.unshift({
          AddTime: Data.AddTime,
          HeadImg: Data.UserImg,
          Name: Data.UserName,
          LikeNum: 0,
          IsLike: false,
          ArticleCommentID: Data.CommentsID,
          Content: comment,
          ReviewReply: []
        });
        // 将消息发给弹幕
        if (this.$refs.player.player.getCurrentTime()) {
          this.dmModel.CM.send(
            new dmClass(
              1,
              comment,
              0,
              LIVE_FONT_SIZE,
              comment.length > 50 ? 8000 : 4000
            )
          );
        }
      }
    },
    /**
     * @function 添加一条回复
     * @param message 文本
     * @param replyIndex 回复的第几条
     * @param CommentID 回复的ID
     */
    async _AddReply(comment) {
      const { Code, Data } = await addEnterpriseCommentsReply({
        commentsID: this.CommentID,
        reply: comment
      });
      if (Code == OK_CODE) {
        this.commentList[this.replyIndex].ReviewReply.unshift({
          AddTime: Data.AddTime,
          HeadImg: Data.UserImg,
          Name: Data.UserName,
          LikeNum: 0,
          IsLike: false,
          Content: comment
        });
        this.isReply = false;
        this.inputText = "快来一起交流互动吧~";
      }
    },
    showDM() {
      // 解决弹幕多时 造成弹幕重叠 setInterval
      let index = 0;
      this.setInt = setInterval(() => {
        if (index == this.liveMessages.length) {
          clearTimeout(this.setInt);
        } else {
          var Content = this.liveMessages[index].Content;
          this.dmList.push(
            new dmClass(
              1,
              Content,
              0,
              LIVE_FONT_SIZE,
              Content > 50 ? 4000 : 2000,
              0xffff
            )
          );
          index++;
        }
      }, 100);
    },
    /**
     * @function 去列表最新的一条数据
     */
    _showNews() {
      const dom = this.IsLive
        ? ".message-wrap> .list-item"
        : ".comment> .comment-item";
      setTimeout(() => {
        const el = this.IsLive
          ? document.querySelectorAll(dom)[this.liveMessages.length - 1]
          : document.querySelectorAll(dom)[0];
        this.$refs.messageScroll.scrollToElement(el, 400);
      }, 300);
    },
    /**
     * @function  将消息发给弹幕
     * @param {String} comment
     * @param {Number} sendTime 弹幕出现时间 0 立即出现 other 按时间出现 毫秒
     */
    _sendDMToScreen(comment, sendTime = 0) {
      const dmClassObj = new dmClass(
        1,
        comment,
        parseInt(sendTime),
        LIVE_FONT_SIZE,
        comment.length > 50 ? 8000 : 4000
      );
      if (!this.IsLive) {
        this.dmModel && this.dmModel.CM.insert(dmClassObj);
        this.dmModel && this.dmModel.CM.start();
        return;
      }
      this.dmModel && this.dmModel.CM.send(dmClassObj);
    }
  }
};
