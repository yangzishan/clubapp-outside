# 结构文档
## 公共组件Base
> Cascader 课程页级联选择器
> CircleProgress 圆环进度条

>>  + 参数
>>    + id 组件唯一标识符
>>    + width 圆的大小
>>    + radius 圆的厚度
>>    + progress 进度（百分比）
>>    + delay 延迟
>>    + duration 动画时长
>>    + barColor 进度条颜色
>>    + backgroundColor 背景颜色
>>    + backgroundColor 背景颜色
>>  + 案例
>>    + 引入
>>        ```
>>            import CircleProgress from '@/base/CircleProgress.vue'
>>        ```
>>    + html结构
>>        ```
>>            <circle-progress
>>              :id="1"
>>              :width="60"
>>              :radius="4"
>>              :progress="75"
>>              :delay="20"
>>              :duration="3000"
>>              :barColor="'#02C6AB'"
>>              :backgroundColor="'#E3E3E3'"
>>            ></circle-progress>
>>        ```


> confirm 密码弹出框

> footTabs 底部选项卡

> Toast 提示弹框

>>  + 参数
>>    + visible 显示隐藏
>>    + text 提示框文本
>>    + align 提示框弹出位置（单位为百分比，不带百分号）
>>    + topTime 弹出时间
>>    + toastTime 弹出框持续时间
>>  + 使用方法
>>     + JS 引入
>>          ```
>>            import ToastBox from '@/base/Toast'
>>          ```
>>          或
>>          ```
>>            ToastBox: () => import('@/base/Toast')
>>          ```
>>     + html 结构
>>          ```
>>            <toast-box :visible.sync="isToast" :text="toastText"></toast-box> 
>>          ```
> Guide 答题页首次提示框

>>  + 参数
>>    + isShow 显示隐藏

> Header 网页头部

>>  + 参数
>>    + title 标题
>>  + 方法
>>    + this.$refs.header.hideProgress() 隐藏滚动条
>>      + 案例
>>        + html 结构
>>          ```
>>            <my-header :title="'考试答题'" ref="header"></my-header>
>>          ```
>>        + JS 结构
>>          + 例: 页面加载完成隐藏滚动条
>>            ```
>>              mounted () {
>>                  this.$refs.header.hideProgress()
>>              }
>>            ```
>>          + 例： 接口请求结束后隐藏
>>            ```
>>               methods: {
>>                 api () {
>>                   --- 发起请求 ---
>>                   ----- 成功返回后 -----
>>                   this.$refs.header.hideProgress()
>>                 }
>>               }
>>            ```

> index 页面父级路由

> loading 加载中。。。

> NoMore 加载到无数据

> UploadImg 图片上传

> Scroll 滚动组件

> noResult 无结果提示

> open-snackbar 结果反馈提示框组件

> scrollTop 回到顶部

> Tabs 选项卡

> typeScroll 可以横向滚动 点击的分类选择组件

> comment 评论/回复组件

> Cascade 级联选择器

>pdfReader pdf/word文档播放

> PasswordBox 密码弹窗

>>  + 参数
>>    + placeholder 输入框占位符
>>    + visible 密码框显示隐藏
>>    + psdError 密码是否错误
>>  + 用法
>>    + html 结构
>>    ```
>>      <password-box :visible.sync="visible" :psdError.sync="psdError" @submit="submit"></password-box>
>>    ```

## 路由

+ index 首页路由
  + 首页
    + /home
  + 能力提升
    + /toap
  + 企业大学
    + /enterprise
  + 效率工具
    + /tool
  + 我的
    + /member
  + 登录
    + /login
  + 注册
    + /register

+ living 直播路由
  + 首页
    + /home
  + 能力提升
    + /toap

+ search 搜索路由
  + 搜索
    + /search

+ EnterpriseTest 企业考试路由
  + 企业考试
    + /enterprisetest
  + 考试规则
    + /enterpriserule
  + 考试答题
    + /enterpriseanswer

  + 企业课程
    +  /course
  + 任务
    +  /index
  + 线下培训班
    +  /trainning



## UI页面目录结构

+ EnterpriseTest 企业考试
  + components
    + iSlider 滑动
    + Topic 题目
  + EnterAnswer 答题页
  + EnterRule 考试规则
  + index 企业考试首页

+ login 登录/注册
  + components
    + PhotoDialog 上传图片弹出层
    + SideCode 滑块验证码
  + images
    + logo 网站logo
    + psdclose 密文密码
    + psdopen 明文密码
  + Login 登录页
  + register 注册页

+ search 搜索
  + components
    + HotSearch 热门搜索/搜索历史
  + index 搜索页

+ medicalDigest   医药大全
   + components
     + DrugList  医药大全列表
     + Share     分享
   + DrugDetails 医药详情
   + index   医药首页

+ medicalHeadlines   医药头条
   + HeadlineDetail 医药详情
   + HeadlineHomePage   医药首页

+  famousTeacherOnline 明星讲师
   + components
     + courseList   课程列表
     + lecturersList   讲师列表
   + index   讲师首页
   + index   讲师详情

+  enterpriseLibrary 企业文库
   + components
     + Article      文章列表
     + File         文档列表
   + DocumentPreview   文档预览
   + index          文库首页

+competitionCenter    大赛中心

+  salesCompetition   销售比拼
        + components
          + clerkRankList          店员列表
          + storeRankList          门店列表
        + currentRanking           当前排名
        + historicalRecord         历史记录
        + index.vue                首页
        + salesDetail              销售详情
        + uploadResults            上传成绩

        +  vote   投票
           + components
             + Login               登录组件
             + Share               分享组件
           + activityDetail        活动详情
           + index                 首页
           + voteDetail            投票详情
        +  knowledgeArea   知识擂台
           + competitionRecord     比赛成绩
           + competitionResult     比赛结果
           + index.vue             主页
           + matchIntroduce        比赛说明
           + rankingList           排名列表

+ trainning 线下培训班
  + components
   + trainning-files  培训班 - 详情资料模块

+ sign 签到领奖




# 图片文件夹管理 assets

+ enterprise 企业大学
+ enterprisetest 企业考试
+ guide 首次考试滑动引导
+ live 直播
+ momber 会员
+ tabs 底部选项卡图标
+ search 搜索
+ course 企业课程
+ train 线下培训班

# Vuex 状态管理

+ actions 储存状态发起给mutations
  + 方法列表

+ mutations 将接受状态保存至 state
  + 方法列表

+ mutations-type 状态标识符方便调试使用
  + 方法列表
+ getters 过滤 state
  + 方法列表
+ state 状态
  + showBottom 底部选项卡状态

## npm

> vue-count-to 数字滚动组件

> moment 时间管理组件

> vue-touch 左右滑动监听组件

> vue-awesome-swiper 轮播图组件

> good-storage  本地存储控件  api (https://www.npmjs.com/package/good-storage)

> Clipboard     复制链接

> vue-photo-preview 查看图片插件

> vue-lazyload 图片懒加载

> js-base64    base64编码和解码
