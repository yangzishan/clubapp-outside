import { baseUrl, get, post } from "./index";

// home
//获取轮播图数据
export const GetAD = params => get(baseUrl.lms + "/AD/GetAD", params);
//增加广告位点击量
export const UpdateClickNum = params =>
  get(baseUrl.lms + "/AD/UpdateClickNum", params);
//APP首页金刚区
export const GetKong = params => get(baseUrl.lms + "/AD/GetAD", params);
//APP首页胶囊广告位
export const GetCapsule = params => get(baseUrl.lms + "/AD/GetAD", params);
//APP首页企业专区
export const GetEnterprise = params => get(baseUrl.lms + "/AD/GetAD", params);
//获取热门课程数据
export const GetCoursesByTag = params =>
  get(baseUrl.lms + "/Course/GetCoursesByTag", params);
// 获取个人中心未读信息
export const GetMessageIsRead = params =>
  get(baseUrl.lms + "/Message/GetMessageIsRead", params);

//退出
export const LoginOut = params =>
  get(baseUrl.sso + "/default/LoginOut", params);

// member
//获取个人登录信息 只调一次 存在 session中
export const GetAppMemberInfo = params =>
  get(baseUrl.lms + "/Member/GetAppMemberInfo", params);
//获取个人账户信息
export const GetCoinRemain = params =>
  get(baseUrl.lms + "/Order/GetCoinRemain", params);

//enterprise
//获取企业账户信息
export const GetAppEnterpriseInfo = params =>
  get(baseUrl.lms + "/Enterprise/GetAppEnterpriseInfo", params);
//获取企业公告
export const GetNotice = params =>
  get(baseUrl.lms + "/Notice/GetNotice", params);
//获取当前企业学员的学习排名 0任务 1带教 2学习地图
export const GetStaffStudyRanking = params =>
  get(baseUrl.lms + "/Enterprise/GetStaffStudyRanking", params);
//获取当前企业学习排名 0任务 1带教 2学习地图
export const GetEnterpriseStudyRanking = params =>
  get(baseUrl.lms + "/Enterprise/GetEnterpriseStudyRanking", params);
//获取企业VIP工具
export const GetVipInfo = () => get(baseUrl.lms + "/Enterprise/GetVipInfo");
//获取最近一次学习记录
export const GetIsStudyCourse = params =>
  get(baseUrl.lms + "/Member/GetIsStudyCourse", params);

//杏林读书  App
//获取读书分类
export const GetAudioCourseClassify = params =>
  get(baseUrl.lms + "/Course/GetAudioCourseClassify", params);
//获取读书列表
export const GetAudioCourseFront = params =>
  get(baseUrl.lms + "/Course/GetAudioCourseFront", params);
//获取读书详情
export const GetAudioCourseDetail = params =>
  get(baseUrl.lms + "/Course/GetAudioCourseDetailFront", params);
//获取课程相关联的课程
export const CourseRecommendList = params =>
  get(baseUrl.lms + "/Course/CourseRecommendListNew", params);

//检查是否是有效的邀请
export const GetInterviewInfo = params =>
  get(baseUrl.lms + "/StarTeacher/GetInterviewInfo", params);
//讲师审核
export const TeacherBehindInfo = params =>
  get(baseUrl.lms + "/StarTeacher/TeacherBehindInfo", params);
//打开邀请
export const ChangeReadType = params =>
  get(baseUrl.lms + "/StarTeacher/ChangeReadType", params);
//审核
export const ChangeStateTeacher = params =>
  get(baseUrl.lms + "/StarTeacher/ChangeStateTeacher", params);

//获取直播列表
export const GetLiveOnlineShowOnAPP = params =>
  get(baseUrl.lms + "/LiveOnline/GetLiveOnlineShowOnAPP", params);
//获取直播类型
export const GetLiveTypeInfoApp = params =>
  get(baseUrl.lms + "/LiveOnline/GetLiveTypeInfoApp", params);
//获取直播录像
export const GetLiveVideoShowOnAPP = params =>
  get(baseUrl.lms + "/LiveOnline/GetLiveVideoShowOnAPP", params);
//获取直播录像path
export const GetPlayAuthByVideoID = params =>
  get(baseUrl.lms + "/LiveOnline/GetPlayAuthByVideoID", params);
//获取直播详情
export const GetLiveOnlineIntroduce = params =>
  get(baseUrl.lms + "/LiveOnline/GetLiveOnlineIntroduce", params);
//获取直播播放地址
export const GetLiveOnlineLiveUrl = params =>
  get(baseUrl.lms + "/LiveOnline/GetLiveOnlineLiveUrl", params);
//发礼物
export const SendPresent = params =>
  get(baseUrl.lms + "/LiveOnline/SendPresent", params);
//获取免费赞数
export const GetPresentLast = params =>
  get(baseUrl.lms + "/LiveOnline/PresentLast", params);
//获取录播详情
export const GetLiveVideoIntroduce = params =>
  get(baseUrl.lms + "/LiveOnline/GetLiveVideoIntroduce", params);
//获取直播历史记录
export const LiveMemory = params =>
  get(baseUrl.lms + "/LiveOnline/LiveMemory", params);
//清除直播历史记录
export const LiveMemoryClear = params =>
  get(baseUrl.lms + "/LiveOnline/LiveMemoryClear", params);
//获取直播相似
export const LiveLikeList = params =>
  get(baseUrl.lms + "/LiveOnline/LiveLikeList", params);
//获取录播评论
export const GetLiveCommentList = params =>
  get(baseUrl.lms + "/LiveOnline/GetLiveCommentList", params);
//获取录播评论
export const AddComment = params =>
  get(baseUrl.lms + "/LiveOnline/AddComment", params);
//添加录播评论
export const AddCommentReply = params =>
  get(baseUrl.lms + "/LiveOnline/AddCommentReply", params);
//评论点赞 AddCommemtReplyLike
export const AddCommemtLike = params =>
  get(baseUrl.lms + "/LiveOnline/AddCommemtLike", params);
//回复点赞
export const AddCommemtReplyLike = params =>
  get(baseUrl.lms + "/LiveOnline/AddCommemtReplyLike", params);

//-----------------------------liveNew-----------------------------------------------------
// 获取直播列表
export const GetLiveInfoList = params =>
  get(baseUrl.live + "/live/GetLiveInfoList", params);
// 获取直播标签
export const GetLabels = params =>
  get(baseUrl.live + "/LabelManage/GetLabels", params);
// 获取直播列表
export const GetLiveInfo = params =>
  get(baseUrl.live + "/live/GetLiveInfo", params);
// 获取拉流地址
export const GetPullLiveUrl = params =>
  get(baseUrl.live + "/live/GetPullLiveUrl", params);
// 获取拉流地址
export const GetPullLiveUrlGF = params =>
  get(baseUrl.live + "/LiveActivity/GetPullLiveUrl", params);
// 获取观看历史
export const GetWatchList = params =>
  get(baseUrl.live + "/live/GetWatchList", params);
// 获取观看历史GF
export const GetWatchListGF = params =>
  get(baseUrl.live + "/LiveActivity/GetWatchList", params);
// 获取推荐列表
export const GetRecommendLive = params =>
  get(baseUrl.live + "/live/GetRecommendLive", params);
// 获取最新弹幕信息
export const GetBarrageInfoByUid = params =>
  get(baseUrl.live + "/live/GetBarrageInfoByUid", params);
// 获取最新弹幕信息GF
export const GetBarrageInfoByUidGF = params =>
  get(baseUrl.live + "/LiveActivity/GetBarrageInfoByUid", params);
//获取评论列表
export const GetComments = params =>
  get(baseUrl.lms + "/Comments/GetComments", params);
//添加评论
export const AddComments = params =>
  get(baseUrl.lms + "/Comments/AddComments", params);
// 获取回放视频列表
export const LivePlayBackLocal = params =>
  get(baseUrl.live + "/live/LivePlayBackLocal", params);
// 获取播放鉴权
export const GetVideoPlayAuth = params =>
  get(baseUrl.live + "/live/GetVideoPlayAuth", params);
// 验证直播密码
export const CheckLivePwd = params =>
  get(baseUrl.live + "/live/CheckLivePwd", params);
// 验证直播密码
export const CheckLivePwdGF = params =>
  get(baseUrl.live + "/LiveActivity/CheckLivePwd", params);
// 清空观看记录
export const DeleteWatchList = params =>
  post(baseUrl.live + "/live/DeleteWatchList", params);
// 清空观看记录
export const DeleteWatchListGF = params =>
  post(baseUrl.live + "/LiveActivity/DeleteWatchList", params);
// 检查是不是主持人
export const GetIsHost = params =>
  get(baseUrl.live + "/live/GetIsHost", params);
// 检查是不是主持人
export const GetIsHostGF = params =>
  get(baseUrl.live + "/LiveActivity/GetIsHost", params);
// 获取直播列表官方
export const GetLiveInfoListGF = params =>
  get(baseUrl.live + "/LiveActivity/GetActivityLiveInfoList", params);
// 获取直播标签官方
export const GetLabelsGF = params =>
  get(baseUrl.live + "/LiveActivity/GetLabels", params);
// 获取推荐列表官方
export const GetRecommendLiveGF = params =>
  get(baseUrl.live + "/LiveActivity/GetRecommendLive", params);
// 获取直播列表GF
export const GetLiveInfoGF = params =>
  get(baseUrl.live + "/LiveActivity/GetLiveInfo", params);
// 获取播放鉴权GF
export const GetVideoPlayAuthGF = params =>
  get(baseUrl.live + "/LiveActivity/GetVideoPlayAuth", params);
//获取直播播放量GF
export const GetLivePlayCountGF = params =>
  post(baseUrl.live + "/LiveActivity/GetLivePlayCount", params);
//获取直播播放量
export const GetLivePlayCount = params =>
  post(baseUrl.live + "/live/GetLivePlayCount", params);
// 获取回放视频列表GF
export const LivePlayBackLocalGF = params =>
  get(baseUrl.live + "/LiveActivity/LivePlayBackLocal", params);
// 离开直播间
export const LeaveRoom = params =>
  get(baseUrl.live + "/live/LeaveRoom", params);

// 去直播前些日志
export const AddLog = params => get(baseUrl.sso + "/default/AddLog", params);

// 江门国大  获取网页授权链接

export const QyWxGetCode = params =>
  get(baseUrl.sso + "/wx/QyWxGetCode", params);

// 授权回来后根据Code 进行登录
export const QyWxLogin = params => get(baseUrl.sso + "/wx/QyWxLogin", params);
