import {
  baseUrl,
  get,
  post
} from "./index";

// --------------------- 企业大学课程 -----------------------
// 内部课程分类
export const GetChildByInfoParentID = params =>
  get(baseUrl.lms + "Course/GetChildByInfoParentID", params);
// 首页，岗位地图，企业大学分类查询 (6.5修改)
export const GetClassChildByInfoParentID = params =>
  get(baseUrl.lms + "Course/GetClassChildByInfoParentID", params);
// 课程列表
export const GetCourseList = params =>
  get(baseUrl.lms + "CourseEnterprise/GetCourseList", params);
// 企业大学-课程信息
export const GetCourseInfo = params =>
  get(baseUrl.lms + "CourseEnterprise/GetCourseInfo", params);
// 企业大学-课程章节列表
export const GetChapterList = params =>
  get(baseUrl.lms + "CourseEnterprise/GetChapterList", params);
// 企业大学-章节下的课件列表
export const GetEnterpriseCoursewareList = params =>
  get(baseUrl.lms + "CourseEnterprise/GetEnterpriseCoursewareList", params);
// 企业大学-课件信息
export const GetCoursewareInfo = params =>
  get(baseUrl.lms + "CourseEnterprise/GetCoursewareInfo", params);
// 企业大学-课程推荐列表
export const CourseRecommendList = params =>
  get(baseUrl.lms + "CourseEnterprise/CourseRecommendList", params);
// 文档播放
export const GetDocumentInfo = params =>
  post(baseUrl.lms + "/DocumentEnterprise/GetDocumentInfo", params);
// 更新课程进度
export const UpdateStudyCourseProgress = params =>
  post(baseUrl.lms + "Course/UpdateStudyCourseProgress", params);
// 获取考试ID
export const GetCourseJoinExam = params =>
  post(baseUrl.lms + "Course/GetCourseJoinExamFront", params);
// 个人中心课程观看记录
export const GetCourseProgress = params =>
  get(baseUrl.lms + "Member/GetCourseProgress", params);
// 判断课程是否下架
export const IsEnable = params => get(baseUrl.lms + "Course/IsEnable", params);
// 课程课后考试（首页）
export const GetCourseJoinExamIndex = params =>
  post(baseUrl.lms + "Course/GetCourseJoinExam", params);

// ------------------- 企业课程评论 -------------------------
// 获取评论+回复列表
export const GetReview = params =>
  get(baseUrl.lms + "ReviewCourse/GetReview", params);
// 添加评论
export const AddReview = params =>
  post(baseUrl.lms + "ReviewCourse/AddReview", params);
// 评论点赞
export const AddReviewLike = params =>
  post(baseUrl.lms + "ReviewCourse/AddReviewLike", params);
// 添加评论回复
export const AddReviewReply = params =>
  post(baseUrl.lms + "ReviewCourse/AddReviewReply", params);
// 回复点赞
export const AddReviewReplyLike = params =>
  post(baseUrl.lms + "ReviewCourse/AddReviewReplyLike", params);

// --------------------- 首页课程 -----------------------
// 课程列表
export const GetIndexCourseList = params =>
  get(baseUrl.lms + "CourseIndex/GetCourseList", params);
// 课程信息
export const GetIndexCourseInfo = params =>
  get(baseUrl.lms + "CourseIndex/GetCourseInfo", params);
// 课程章节列表
export const GetIndexChapterList = params =>
  get(baseUrl.lms + "CourseIndex/GetChapterList", params);
// 章节下的课件列表
export const GetIndexCoursewareList = params =>
  get(baseUrl.lms + "CourseIndex/GetIndexCoursewareList", params);
// 课件信息
export const GetIndexCoursewareInfo = params =>
  get(baseUrl.lms + "CourseIndex/GetCoursewareInfo", params);
// 课程推荐列表
export const indexCourseRecommendList = params =>
  get(baseUrl.lms + "CourseIndex/CourseRecommendList", params);
// 判断课程是否购买过
export const CheckCourseBuy = params =>
  get(baseUrl.lms + "Course/CheckCourseBuy", params);
// 首页试看视频课程章节列表
export const GetChapterCoursewareShow = params =>
  get(baseUrl.lms + "Course/GetChapterCoursewareShow", params);
// 首页试看评论+回复列表
export const GetReviewShow = params =>
  get(baseUrl.lms + "ReviewCourse/GetReviewShow", params);

// --------------------- 任务 -----------------------
// 任务进度列表
export const GetMemberTask = params =>
  get(baseUrl.lms + "Task/GetMemberTask", params);
// 课程进度列表
export const GetMemberCourseProgress = params =>
  get(baseUrl.lms + "Task/GetMemberCourseProgress", params);
// 任务-任务考试
export const GetMemberExamProgress = params =>
  get(baseUrl.lms + "Task/GetMemberExamProgress", params);
// 任务-课程信息
export const GetTaskCourseInfo = params =>
  get(baseUrl.lms + "CourseStudy/GetCourseInfo", params);
// 任务-课程章节列表
export const GetTaskChapterList = params =>
  get(baseUrl.lms + "CourseStudy/GetChapterList", params);
// 任务-章节下课件列表
export const GetTaskCoursewareList = params =>
  get(baseUrl.lms + "CourseStudy/GetTaskCoursewareList", params);
// 任务-课件信息
export const GetTaskCoursewareInfo = params =>
  get(baseUrl.lms + "CourseStudy/GetTaskCoursewareInfo", params);
// 任务-更新任务进度
export const UpdateStudyTaskCourseProgress = params =>
  post(baseUrl.lms + "Course/UpdateStudyTaskCourseProgress", params);
// 获取杏林说的分类列表
export const GetMemberXLSpeakerProgress = params =>
  get(baseUrl.lms + "Task/GetMemberXLSpeakerProgress", params);
// 根据杏林说词条ID(数组)获取杏林说词条内容
export const GetSpeakerInfoByIDs = params =>
  post(baseUrl.lms + "Speaker/GetSpeakerInfoByIDs", params);
// 获取任务完成状态
export const GetUserTaskProgress = params =>
  get(baseUrl.lms + "Task/GetUserTaskProgress", params);

// --------------------- 培训班 -----------------------
// --------------------- 新接口 10/13 -----------------------
// 获取培训班列表(推荐+已报名+已参加)
export const GetTrainingList = params =>
  get(baseUrl.lms + "/Training/GetTrainingList", params);
// 获取培训班详情
export const GetTraining = params =>
  get(baseUrl.lms + "/Training/GetTraining", params);
// 获取培训班课程列表
export const GetTrainingCourses = params =>
  get(baseUrl.lms + "/Training/GetTrainingCourses", params);
// 培训班文档
export const GetTrainingFiles = params =>
  get(baseUrl.lms + "/Training/GetTrainingFiles", params);
//  培训班问卷
export const GetTrainingQuestions = params =>
  get(baseUrl.lms + "/Training/GetTrainingQuestions", params);
// 培训班考试
export const GetTrainingExams = params =>
  get(baseUrl.lms + "/Training/GetTrainingExams", params);
// 报名培训班
export const ApplyTraining = params =>
  get(baseUrl.lms + "/Training/ApplyTraining", params);
// 学生签到
export const GetStudentSign = params =>
  get(baseUrl.lms + "/Training/GetStudentSign", params);
// 学生密码签到
export const GetStudentPwdSign = params =>
  get(baseUrl.lms + "/Training/GetStudentPwdSign", params);
// 学员评分
export const AddTrainingGrade = params =>
  get(baseUrl.lms + "/Training/AddTrainingGrade", params);
// 获取学员评分
export const GetTrainingGradeInfo = params =>
  get(baseUrl.lms + "/Training/GetTrainingGradeInfo", params);
// 评论列表
export const GetTrainingComments = params =>
  get(baseUrl.lms + "/Comments/GetComments", params);
// 添加评论
export const AddTrainingComments = params =>
  get(baseUrl.lms + "/Comments/AddComments", params);
// 添加评论回复
export const AddCommentsReply = params =>
  post(baseUrl.lms + "/Comments/AddCommentsReply", params);
// 点赞
export const AddCommentsTrainingLikeNum = params =>
  get(baseUrl.lms + "/LikeNum/AddLikeNumCommon", params);
// 回复的点赞
export const AddCommemtReplyLike = params =>
  get(baseUrl.lms + "/Training/AddCommemtReplyLike", params);
// AD
export const GetAD = params => get(baseUrl.lms + "/AD/GetAD", params);
// --------------------- 企业公告 -----------------------
// 公告分类
export const noticeGetChildByInfoParentID = params =>
  get(baseUrl.lms + "/Notice/GetChildByInfoParentID", params);
// 公告列表
export const GetNotice = params =>
  get(baseUrl.lms + "/Notice/GetNotice", params);
// 公告详情
export const GetNoticeByID = params =>
  get(baseUrl.lms + "/Notice/GetNoticeByID", params);
// 公告已读
export const SetIsRead = params =>
  get(baseUrl.lms + "/Notice/SetIsRead", params);

// --------------------- 杏林商城 -----------------------
//商品池分类列表
export const GetPoors = params =>
  get(baseUrl.mallUrl + "/Default/GetPoors", params);
// 商品池商品
export const GetPoorProduct = params =>
  get(baseUrl.mallUrl + "/Default/GetPoorProduct", params);
// 商品详情
export const GetProduct = params =>
  get(baseUrl.mallUrl + "/Default/GetProduct", params);
// 查询商品运费
export const GetFreight = params =>
  get(baseUrl.mallUrl + "/Default/GetFreight", params);
// 查询商品区域限制
export const GetProductAreaLimit = params =>
  get(baseUrl.mallUrl + "/Default/GetProductAreaLimit", params);
// 查询商品价格
export const GetProductPrice = params =>
  get(baseUrl.mallUrl + "/Default/GetProductPrice", params);
// 商品库存
export const GetProductStock = params =>
  get(baseUrl.mallUrl + "/Default/GetProductStock", params);
// 获取地址
export const GetAreaByLevel = params =>
  get(baseUrl.mallUrl + "/Default/GetAreaByLevel", params);
// 提交订单
export const PostOrder = params =>
  get(baseUrl.mallUrl + "/Default/PostOrder", params);
// 查看所有订单
export const GetOrders = params =>
  get(baseUrl.lms + "/Order/GetOrders", params);
//  总积分查询
export const GetAppMemberInfo = params =>
  get(baseUrl.lms + "/Member/GetAppMemberInfo", params);
// 是否为企业用户
export const IsStaff = params => get(baseUrl.lms + "/Member/IsStaff", params);
// 获取签到id
export const GetXLXTSign = params =>
  get(baseUrl.lms + "/Sign/GetXLXTSign", params);
// 获取月签到
export const GetNewSignHistory = params =>
  get(baseUrl.lms + "/Sign/GetNewSignHistory", params);
// 获取金币/积分杏林币
export const GetCoinRemain = params =>
  get(baseUrl.lms + "/Order/GetCoinRemain", params);
// 默认地址
export const GetAddressDefault = params =>
  get(baseUrl.lms + "/Address/GetAddressDefault", params);
// 添加收货地址
export const AddReceiveAddress = params =>
  post(baseUrl.lms + "/Address/AddReceiveAddress", params);
// 获取本地省市区乡镇ID
export const GetLocalID = params =>
  post(baseUrl.lms + "/Address/GetLocalID", params);

// --------------------- 员工带教 -----------------------
// 得到员工的带教计划列表
export const GetTutorPlanStaffList = params =>
  get(baseUrl.lms + "/Tutor/GetTutorPlanStaffList", params);
// 获取带教天数列表
export const GetItemList = params =>
  get(baseUrl.lms + "/Tutor/GetItemList", params);
// 获取带教每一天的任务+进度
export const GetItemTaskList = params =>
  get(baseUrl.lms + "/Tutor/GetItemTaskList", params);
// 带教师列表
export const GetTeacherList = params =>
  get(baseUrl.lms + "/Tutor/GetTeacherList", params);
// 店长列表
export const GetShopKeeperList = params =>
  get(baseUrl.lms + "/Tutor/GetShopKeeperList", params);
// 获取带教师的任务人员列表
export const GetTeacherUserList = params =>
  get(baseUrl.lms + "/Tutor/GetTeacherUserList", params);
// 获取店长的任务人员列表
export const GetShopKeeperUserList = params =>
  get(baseUrl.lms + "/Tutor/GetShopKeeperUserList", params);
// 获取带教任务详情
export const GetTutorTaskByID = params =>
  get(baseUrl.lms + "/Tutor/GetTutorTaskByID", params);
// 获取当前任务的评语
export const GetCommentByID = params =>
  get(baseUrl.lms + "/Tutor/GetCommentByID", params);
// 添加带教评价（带教+店长）
export const AddComment = params =>
  post(baseUrl.lms + "/Tutor/AddComment", params);
// 带教计划店长审核
export const ShopKeeperAudit = params =>
  get(baseUrl.lms + "/Tutor/ShopKeeperAudit", params);
// 重置带教天数的任务
export const ResetDay = params => get(baseUrl.lms + "/Tutor/ResetDay", params);
// 学员添加心得
export const AddStaffContent = params =>
  post(baseUrl.lms + "/Tutor/AddStaffContent", params);
// 上传视频
export const UploadVideo = params =>
  get(baseUrl.wwwUrl + "/AliyunVideo/CreateUploadVideo", params);
export const VideoPlay = params =>
  get(baseUrl.wwwUrl + "/Course/GetPlayAuthByVideoID", params);
// 更新休息日进度
export const UpdateNullDayProgress = params =>
  post(baseUrl.lms + "/Tutor/UpdateNullDayProgress", params);
// 清空带教任务进度
export const DeleteLineProgress = params =>
  post(baseUrl.lms + "/Tutor/DeleteLineProgress", params);
// 带教章节下课件列表
export const GetTutorCoursewareList = params =>
  get(baseUrl.lms + "CourseStudy/GetTutorCoursewareList", params);
// 带教-课件信息
export const GetTutorCoursewareInfo = params =>
  get(baseUrl.lms + "CourseStudy/GetTutorCoursewareInfo", params);
// 带教-更新任务进度
export const UpdateStudyTutorCourseProgress = params =>
  post(baseUrl.lms + "Course/UpdateStudyTutorCourseProgress", params);
// 带教限制每天学习天数
export const GetTutorPlanStaffByID = params =>
  post(baseUrl.lms + "/Tutor/GetTutorPlanStaffByID", params);

// --------------------- 学习地图 -----------------------
// 学习地图-获取课件信息
export const mapGetCoursewareInfo = params =>
  get(baseUrl.learnMapUrl + "/StudentMap/GetCoursewareInfo", params);
// 学习地图-获取章节信息
export const mapGetChapterList = params =>
  get(baseUrl.learnMapUrl + "/StudentMap/GetChapterList", params);
// 学习地图-课件列表信息
export const mapGetCoursewareList = params =>
  get(baseUrl.learnMapUrl + "/StudentMap/GetCoursewareList", params);
// 学习地图-更新课程进度
export const mapUpdateCoursewareProcess = params =>
  post(
    baseUrl.learnMapUrl + "/StudentMap/UpdateCoursewareProcessByCoursewareID",
    params
  );
// 学习地图-考试
export const mapGetCourseJoinExamFront = params =>
  get(baseUrl.learnMapUrl + "/StudentMap/GetCourseJoinExamFront", params);
// 学习地图-计划项
export const GetCourseRelevancyed = params =>
  get(baseUrl.learnMapUrl + "/StudentMap/GetCourseRelevancyed", params);

// --------------------- emarketing-课程 -----------------------
// 获取课程信息
export const GetActivityCourseByID = params =>
  get(baseUrl.lms + "/Course/GetActivityCourseByID", params);
// 获取课程章节列表 - 不需要登录
export const GetChapterListCourseShow = params =>
  get(baseUrl.lms + "/CourseShow/GetChapterList", params);
// 获取课件信息列表 - 不需要登录
export const GetCoursewareListCourseShow = params =>
  get(baseUrl.lms + "/CourseShow/GetCoursewareList", params);
// 获取课件信息 - 不需要登录
export const GetCoursewareByIDActivity = params =>
  get(baseUrl.lms + "/CourseShow/GetCoursewareByIDActivity", params);
// 获取课程信息 - 不需要登录
export const GetCourseByID = params =>
  get(baseUrl.lms + "/CourseShow/GetCourseByID", params);
// emarketing-课程奖励
export const RewardDistribute = params =>
  get(baseUrl.eMarketing + "api/AppActivity/RewardDistribute", params);
// emarketing-获取规则详细信息
export const GetRuleDetail = params =>
  get(baseUrl.eMarketing + "api/AppActivity/GetRuleDetail", params);
// 获取课程信息 - 需要登录
export const GetCourseInfoActivity = params =>
  get(baseUrl.lms + "CourseActivity/GetCourseInfo", params);
// 图片组件派奖
export const ImageComponentReward = params =>
  get(baseUrl.eMarketing + "api/AppActivity/ImageComponentReward", params);
// 获取章节下的课件列表
export const eMarketingGetIndexCoursewareList = params =>
  get(baseUrl.eMarketing + "api/Course/GetIndexCoursewareList", params);
// 课程进度
export const UpdateEmarketingCourseProgress = params =>
  get(baseUrl.eMarketing + "api/Course/UpdateEmarketingCourseProgress", params);
// 课程是否完成
export const GetIsComplateCourse = params =>
  get(baseUrl.eMarketing + "api/Course/GetIsComplateCourse", params);
// 文档
export const GetBaiduDocumentByID = params =>
  get(baseUrl.lms + "Document/GetBaiduDocumentByID", params);
// --------------------- 企业商城 -----------------------
// 获取用户兑换记录
export const GetPrizeRecordList = params =>
  get(baseUrl.lms + "/CoinGiftView/GetPrizeRecordList", params);
// 获取礼品分类列表
export const GetGiftCate = params =>
  get(baseUrl.lms + "/CoinGiftView/GetGiftCate", params);
//  获取礼品列表
export const GetGiftList = params =>
  get(baseUrl.lms + "/CoinGiftView/GetGiftList", params);
// 获取礼品详情
export const GetGiftDetail = params =>
  get(baseUrl.lms + "/CoinGiftView/GetGiftDetail", params);
// 获取历史兑换记录信息
export const GetOldInfo = params =>
  get(baseUrl.lms + "/CoinGiftView/GetOldInfo", params);
// 添加订单
export const AddOrder = params => post(baseUrl.lms + "/Order/AddOrder", params);
//  支付
export const PayExchange = params =>
  get(baseUrl.lms + "Pay/PayExchange", params);
//  删除订单
export const DelOrder = params => get(baseUrl.lms + "Order/DelOrder", params);
// --------------------- 排位赛 -----------------------
// 排位赛信息
export const GetRank = params => get(baseUrl.examUrl + "/default/GetRank", params);
// 排位赛描述
export const GetRankDescription = params =>get(baseUrl.examUrl + '/default/GetRankDescription', params)
// 排位赛排行榜
export const GetRankRank = params =>get(baseUrl.examUrl + '/default/GetRankRank', params)
//  排位赛等级
export const GetRankLevels = params =>get(baseUrl.examUrl + '/default/GetRankLevels', params)
// 等级历程
export const GetMyRankRoute = params =>get(baseUrl.examUrl + '/innerDefault/GetMyRankRoute', params)
// 查询当前用户排位赛可参加的考试ID
export const GetRankExam = params =>get(baseUrl.examUrl + '/innerDefault/GetRankExam', params)
// 排位赛考试结果
export const GetRankResult = params =>get(baseUrl.examUrl + '/innerDefault/GetExamResult', params)
// 我的排位赛排行
export const GetMyRankRank = params =>get(baseUrl.examUrl + '/innerDefault/GetMyRankRank', params)
// 等级描述
export const GetRankLevelDescription = params =>get(baseUrl.examUrl + '/Default/GetRankLevelDescription', params)
//挑战记录
export const GetExamRecords = (params) => get(baseUrl.examUrl+'/InnerDefault/GetExamRecords', params); 
