"use strict";
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
let lms = "https://www3.xlxt.net/";
let sso = "https://sso3.xlxt.net/";
let yydq = "https://medical3.xlxt.net/";
let oss = "https://ossnew3.xlxt.net/";
let sale = "https://sale3.xlxt.net/";
// let exam = 'https://exambeta3.xlxt.net/'
let exam = "https://newexam3.xlxt.net/";
let view = "https://exam3.xlxt.net/";
let vote = "https://votenew3.xlxt.net/";
let map = "https://studymap3.xlxt.net";
let eMarketing = "https://marketing3.xlxt.net/";
let live = "https://live3.xlxt.net/";

// let lms = "https://www6.xlxt.net/";
// let sso = "https://sso6.xlxt.net/";
// let yydq = "https://medical6.xlxt.net/";
// let oss = "https://ossnew6.xlxt.net/";
// let sale = "https://sale6.xlxt.net/";
// // let exam = 'https://exambeta3.xlxt.net/'
// let exam = "https://exambeta6.xlxt.net/";
// let view = "https://exam6.xlxt.net/";
// let vote = "https://votenew6.xlxt.net/";
// let live = "https://live6.xlxt.net/";

// let lms = "https://www6.xlxt.net/";
// let sso = "https://sso6.xlxt.net/";
// let yydq = "https://medical6.xlxt.net/";
// let oss = "https://ossnew6.xlxt.net/";
// let sale = "https://sale6.xlxt.net/";
// let exam = "https://exambeta3.xlxt.net/";
// let exam = "https://exambeta6.xlxt.net/";
// let view = "https://exam6.xlxt.net/";
// let vote = "https://votenew6.xlxt.net/";
const path = require("path");
const IP = require("./get-ip");
module.exports = {
  dev: {
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      "/enterprise/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Course/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Medicalview/*": {
        target: oss,
        secure: false,
        changeOrigin: true
      },
      "/app/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Member/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Order/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/AD/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Enterprise/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Notice/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/yydq/*": {
        target: yydq,
        secure: false,
        changeOrigin: true
      },
      "/CourseEnterprise/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/ArticleEnterprise/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/DocumentEnterprise/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/ReviewArticle/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/StarTeacher/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/LikeNum/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Comments/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/ReviewCourse/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Task/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/CourseStudy/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Training/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/CourseIndex/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Default/*": {
        target: 'https://mall3.xlxt.net',
        secure: false,
        changeOrigin: true
      },
      "/default/*": {
        target: sso,
        secure: false,
        changeOrigin: true
      },
      "/SalePK/*": {
        target: sale,
        secure: false,
        changeOrigin: true
      },
      "/InnerDefault/*": {
        target: sale,
        secure: false,
        changeOrigin: true
      },
      "/view/*": {
        target: vote,
        secure: false,
        changeOrigin: true
      },
      "/View": {
        target: view,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/View": ""
        }
      },
      "/admin/*": {
        target: exam,
        secure: false,
        changeOrigin: true
      },
      "/LiveOnline/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Sign/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/exam/*": {
        target: exam,
        secure: false,
        changeOrigin: true
      },
      "/api": {
        target: "https://marketing3.xlxt.net",
        secure: false,
        changeOrigin: true
      },
      "/checkVisonAndroid/*": {
        target: "https://m3.xlxt.net",
        secure: false,
        changeOrigin: true
      },
      "/SimpleInnerDefault/*": {
        target: "https://newexam3.xlxt.net",
        secure: false,
        changeOrigin: true
      },
      // "/api/*": {
      //   target: eMarketing,
      //   secure: false,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/View": ""
      //   }
      // },
      "/admin/*": {
        target: exam,
        secure: false,
        changeOrigin: true
      },
      "/LiveOnline/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Sign/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/exam/*": {
        target: exam,
        secure: false,
        changeOrigin: true
      },
      "/Question/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Message/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Speaker/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Supplier/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Tutor/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Article/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/notice/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/SuggestBack/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/staff/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/CoinGiftView/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Anonymous/*": {
        target: sale,
        secure: false,
        changeOrigin: true
      },
      "/EnterpriseTeacher/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Supplier/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/AliyunVideo/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/StudentMap/*": {
        target: map,
        secure: false,
        changeOrigin: true
      },
      "/EnterpriseVote/*": {
        target: vote,
        secure: false,
        changeOrigin: true
      },
      "/checkVisonAndroid/*": {
        target: "https://m3.xlxt.net",
        secure: false,
        changeOrigin: true
      },
      "/SimpleInnerDefault/*": {
        target: "https://newexam3.xlxt.net",
        secure: false,
        changeOrigin: true
      },
      "/admin/*": {
        target: exam,
        secure: false,
        changeOrigin: true
      },
      "/LiveOnline/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/exam/*": {
        target: exam,
        secure: false,
        changeOrigin: true
      },
      "/Question/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Message/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Speaker/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Supplier/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Tutor/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Article/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/notice/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/SuggestBack/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/staff/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/CoinGiftView/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Anonymous/*": {
        target: sale,
        secure: false,
        changeOrigin: true
      },
      "/EnterpriseTeacher/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/Supplier/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/AliyunVideo/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      // "/live/*": {
      //   target: live,
      //   secure: false,
      //   changeOrigin: true
      // },
      // "/LabelManage/*": {
      //   target: live,
      //   secure: false,
      //   changeOrigin: true
      // },
      "/chatHub": {
        target: "https://livechathub3.xlxt.net",
        secure: false,
        changeOrigin: true,
        ws: true //websocket支持
      },
      "/CourseActivity": {
        target: lms,
        secure: false,
        changeOrigin: true,
        ws: true //websocket支持
      },
      "/Address/*": {
        target: lms,
        secure: false,
        changeOrigin: true
      },
      "/wx/*": {
        target: sso,
        secure: false,
        changeOrigin: true
      },
      "/api": {
        target: "https://tcm3.xlxt.net",
        secure: false,
        changeOrigin: true
      },
      "/checkVisonAndroid": {
        target: "https://m3.xlxt.net",
        secure: false,
        changeOrigin: true
      }
    },

    // Various Dev Server settings
    host: IP, // can be overwritten by process.env.HOST
    port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "cheap-module-eval-source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../ClubApp/APP.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../ClubApp"),
    assetsSubDirectory: "ClubApp",
    assetsPublicPath: "./",

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "none",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: true
  }
};
