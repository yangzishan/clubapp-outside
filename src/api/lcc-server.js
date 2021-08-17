import {
  baseUrl,
  get,
  post
} from "./index";
// 擂台跨域
let BASE_URL = baseUrl.examUrl;

//--------------- 医药大全------------//
//获取医药分类
export const getMedicalClassify = params =>
  get(baseUrl.oss + "/Medicalview/GetClassifies", params);
//获取医药列表
export const getMedicalsList = params =>
  get(baseUrl.oss + "/Medicalview/GetMedicals", params);
//获取医药详情
export const getMedicalDetail = params =>
  get(baseUrl.oss + "/Medicalview/getMedicalDetail", params);
//获取视频播放地址
export const getPlayAuthByVideoID = params =>
  get(baseUrl.oss + "/Medicalview/GetPlayAuthByVideoID", params);

//--------------- 医药头条------------//
//获取头条分类
export const getHeadlineClassify = params =>
  get(baseUrl.lms + "/Article/GetAllArticleClassify", params);
//获取头条列表
export const getHeadlineList = params =>
  get(baseUrl.lms + "/Article/GetArticleShow", params);
//获取未登录文章评论表
export const getCommentList = params =>
  get(baseUrl.lms + "/ReviewArticle/getReviewShow", params);
//获取登录文章评论表
export const getLoginCommentList = params =>
  get(baseUrl.lms + "/ReviewArticle/GetReview", params);
//未登录获取文章信息
export const getArticle = params =>
  get(baseUrl.lms + "/Article/GetArticleByIDShow", params);
//登录获取文章信息
export const getArticleByID = params =>
  get(baseUrl.lms + "/Article/GetArticleByID", params);
//文章点赞
export const addArticleLike = params =>
  get(baseUrl.lms + "/Article/AddArticleLike", params);
//发表评论
export const addArticleComment = params =>
  post(baseUrl.lms + "/ReviewArticle/AddReview", params);
//评论点赞
export const addArticleReviewLike = params =>
  post(baseUrl.lms + "/ReviewArticle/AddReviewLike", params, true);

//--------------- 企业文库------------//
//获取文章分类
export const getArticleType = params =>
  get(baseUrl.lms + "/ArticleEnterprise/GetArticleTypeList", params);
//获取文章列表
export const getArticleList = params =>
  get(baseUrl.lms + "/ArticleEnterprise/GetArticleList", params);
//获取文章信息
export const getArticleInfo = params =>
  get(baseUrl.lms + "/ArticleEnterprise/GetArticleInfo", params);
//获取文档分类
export const getDocumentType = params =>
  get(baseUrl.lms + "/DocumentEnterprise/GetDocumentTypeList", params);
//获取文档列表
export const getDocumentList = params =>
  get(baseUrl.lms + "/DocumentEnterprise/GetDocumentList", params);
//获取文档播放地址
export const getDocumentInfo = params =>
  get(baseUrl.lms + "/DocumentEnterprise/GetDocumentInfo", params);
//获取文章评论-回复列表
export const getArticleReviewList = params =>
  get(baseUrl.lms + "/ReviewArticle/GetReview", params);
//添加文章评论
export const addReview = params =>
  post(baseUrl.lms + "/ReviewArticle/AddReview", params);
//文章评论点赞
export const addReviewLike = params =>
  post(baseUrl.lms + "/ReviewArticle/AddReviewLike", params);
//文章评论回复
export const addReviewReply = params =>
  post(baseUrl.lms + "/ReviewArticle/AddReviewReply", params);
// 文章回复点赞
export const AddReviewReplyLike = params =>
  post(baseUrl.lms + "/ReviewArticle/AddArticleReviewReplyLike", params);

//--------------- 名师在线------------//
//获取名师在线列表
export const getTeachersList = params =>
  get(baseUrl.lms + "/Supplier/GetTeacherOnline", params, true);
// //讲师点赞
// export const addTeacherLikeNum = (params) => get(baseUrl.lms + '/Supplier/SupplierLike', params);
//讲师详情
export const getTeacherDetail = params =>
  get(baseUrl.lms + "/Supplier/GetTeacherOnlineDetail", params);
// //评论列表
// export const getTeacherReviewList = (params) => get(baseUrl.lms + '/Supplier/GetTeacherOnlineCommnet', params);
// //添加评论、添加评论回复
// export const addTeacherComments = (params) => post(baseUrl.lms + '/Supplier/TeacherOnlineAddComment', params);
//评论点赞、评论回复点赞
export const addCommentsLikeNum = params =>
  post(baseUrl.lms + "/Supplier/TeacherOnlineCommentLike", params);
//获取讲师课程
export const getTeacherCourses = params =>
  post(baseUrl.lms + "/Course/GetCourseBySupplierShow", params);
//首页胶囊广告位
export const getCapSule = params =>
  get(baseUrl.lms + "/AD/GetAD", params, true);

//--------------- 企业讲师------------//
//获取讲师列表
export const getEnterpriseTeacher = params =>
  get(baseUrl.lms + "/EnterpriseTeacher/GetEnterpriseTeacher", params, true);
//获取评论列表
export const getEnterpriseCommnetList = params =>
  get(baseUrl.lms + "/Comments/GetComments", params);
//讲师详情
export const getEnterpriseTeacherDetail = params =>
  get(baseUrl.lms + "/EnterpriseTeacher/GetTeacherDetail", params, true);
//获取讲师课程
export const getEnterpriseCourses = params =>
  post(baseUrl.lms + "/EnterpriseTeacher/GetTeacherCourses", params, true);
//发表评论
export const addEnterpriseComments = params =>
  post(baseUrl.lms + "/Comments/AddComments", params, true);
//评论回复
export const addEnterpriseCommentsReply = params =>
  post(baseUrl.lms + "/Comments/AddCommentsReply", params, true);
//讲师点赞+评论点赞
export const addLikeNumCommon = params =>
  get(baseUrl.lms + "/LikeNum/AddLikeNumCommon", params, true);
// 讲师评论回复点赞
export const addEnterpriseReplyLike = params =>
  get(baseUrl.lms + "/LikeNum/AddCommemtReplyLike", params, true);

//--------------- 销售比拼------------//
//获取我的销售比拼列表
export const getMySalePkList = params =>
  get(baseUrl.sale + "/InnerDefault/GetMySalePK", params);
//获取杏林官方销售比拼列表
export const getOfficialSalePKs = params =>
  get(baseUrl.sale + "/Default/GetSalePKs", params);
//获取销售比拼列表
export const getSalePkList = params =>
  get(baseUrl.sale + "/InnerDefault/GetSalePKs", params);
//获取销售详情
export const getSalePkDetail = params =>
  get(baseUrl.sale + "/InnerDefault/GetSalePKByID", params);
//获取账户余额
export const getCoinRemain = params =>
  get(baseUrl.lms + "/Order/GetCoinRemain", params);
//获取顾客用户信息
export const getBuyerInfo = params =>
  get(baseUrl.sale + "/InnerDefault/GetBuyerInfo", params, true);
//上传销售比拼记录
export const postSalePKRecord = params =>
  post(baseUrl.sale + "/InnerDefault/PostSalePKRecord", params, true);
//门店排名
export const getStoreRank = params =>
  get(baseUrl.sale + "/InnerDefault/GetStoreRank", params);
//店员排名
export const getSellerRank = params =>
  get(baseUrl.sale + "/InnerDefault/GetSellerRank", params);
//最新比拼上传通知
export const getRecentRecordNotice = params =>
  get(baseUrl.sale + "/InnerDefault/GetRecentRecordNotice", params);
//历史记录
export const getSalePKRecord = params =>
  get(baseUrl.sale + "/InnerDefault/GetSalePKRecord", params);
//删除销售比拼记录
export const deleteSalePKRecord = params =>
  get(baseUrl.sale + "/InnerDefault/DeleteSalePKRecord", params);
//查看销售比拼记录
export const getSalePKRecordById = params =>
  get(baseUrl.sale + "/InnerDefault/GetSalePKRecordByID", params);
//获取销售比拼规则明细
export const getSaleRuleDetail = params =>
  get(baseUrl.eMarketing + "/api/AppActivity/GetSaleCompetitionDescription", params);

//--------------- 投票------------//
//获取企业大学活动列表
export const getSubjectList = params =>
  get(baseUrl.vote + "/view/GetSubjectList", params);
//获取个人参加过的活动列表
export const getMemberSubjectList = params =>
  get(baseUrl.voteNew + "/view/GetMemberSubjectList", params);
//获取活动详情
export const getSubjectDetail = params =>
  get(baseUrl.voteNew + "/view/GetSubjectDetail", params, true);
//获取活动参与企业
export const getSubItems = params =>
  get(baseUrl.voteNew + "/EnterpriseVote/GetSubItemList", params, true);
//获取首页活动参与企业
export const getHomeSubItems = params =>
  get(baseUrl.voteNew + "/view/GetSubItemList", params, true);
//获取企业详情
export const getSubjectItemDetail = params =>
  post(baseUrl.vote + "/view/GetSubjectItemDetail", params);
//获得可投票数
export const getAbleCount = params =>
  post(baseUrl.vote + "/view/GetAbleCount", params);
//投票
export const addVote = params => post(baseUrl.vote + "/view/AddVote", params);
//获取手机验证码
export const GetMobileVerify = params =>
  get(baseUrl.userSso + "/UserSSO/GetMobileVerify", params);
//用户登录
export const submission = params =>
  get(baseUrl.userSso + "/UserSSO/MobileAutoLogin", params);
//获取活动规则
export const getSubjectInfo = params =>
  get(baseUrl.vote + "/view/GetSubjectInfo", params);
//添加案例
export const addSubjectItem = params =>
  post(baseUrl.vote + "/view/AddSubjectItem", params, true);
//获取企业参赛记录列表
export const getRecordList = params =>
  get(baseUrl.vote + "/view/GetSubjectItemEnterpriseRecord", params, true);
//获取杏林官方参赛记录列表
export const getOfficialRecordList = params =>
  get(baseUrl.vote + "/view/GetSubjectItemOfficialRecord", params, true);
//上传视频
export const uploadVideo = params =>
  get(baseUrl.lms + "/AliyunVideo/CreateUploadVideo", params);
//删除参赛记录
export const deleteSubjectItem = params =>
  get(baseUrl.vote + "/view/DeleteMemberSubjectItem", params);
//获取当前用户的排名
export const getMemberRank = params =>
  get(baseUrl.vote + "/view/GetMemberRanking", params);
// 初始化视频
export const videoPlay = params =>
  get(baseUrl.wwwUrl + "/Course/GetPlayAuthByVideoID", params);
//获取用户已上传的数据
export const getMemberRanking = params =>
  get(baseUrl.vote + "/view/GetMemberSubjectItemNum", params, true);

// --------------------知识擂台-------------//
//获取知识擂台列表
export const getKnowledgeArenaList = params =>
  get(BASE_URL + "/view/GetExams", params);
//获取比赛详情
export const getDetail = params => get(BASE_URL + "/view/Detail", params);
//获取比赛排名
export const getExamOrder = params =>
  get(BASE_URL + "/view/GetExamOrder", params);
//获取登录人当前排名
export const getMyOrder = params => get(BASE_URL + "/view/GetMyOrder", params);
//比赛记录
export const getExamRecord = params =>
  get(BASE_URL + "/view/GetExamRecord", params);
//获取考试结果
export const getExamResult = params =>
  get(BASE_URL + "/view/GetExamResult", params);

//------------------问答中心---------------//
export const getQuestionList = params =>
  post(baseUrl.lms + "/Question/GetQuestionList", params);
//添加提问
export const addQuestion = params =>
  post(baseUrl.lms + "/Question/AddQuestion", params);
//添加回复
export const addAnswer = params =>
  post(baseUrl.lms + "/Question/AddAnswer", params);
//获取问答详情
export const geAnswerList = params =>
  post(baseUrl.lms + "/Question/GeAnswerByBytQuestionIDList", params);

//------------------------我的问答--------------//
//获取用户提问列表
export const getUserQuestionList = params =>
  post(baseUrl.lms + "/Question/GetQuestionByUserIDList", params);
//获取用户回答列表
export const getUserAnswerList = params =>
  post(baseUrl.lms + "/Question/GetAnswerByUserIDList", params);
//回答点赞
export const addAnswerLike = params =>
  post(baseUrl.lms + "/Question/AddAnswerLike", params);

//--------------- 消息中心------------//
//获取所有的未读消息列表
export const getMessageUnreadList = params =>
  post(baseUrl.lms + "/Message/GetMessageUnreadList", params);
//查看我的消息
export const getMessageList = params =>
  post(baseUrl.lms + "/Message/GetMessageList", params);
// 设置消息已读
export const setMessageRead = params =>
  post(baseUrl.lms + "/Message/SetMessageRead", params);

//---------------学习地图------------//
//获取学习路径
export const getMapById = params =>
  get(baseUrl.learnMapUrl + "/StudentMap/GetMapByAppUserID", params, true);
//获取学习路径子项得学习计划
export const getLearnPlan = params =>
  get(baseUrl.learnMapUrl + "/StudentMap/GetLearnPlan", params, true);
//获取学习计划分类
export const learnPlanDetails = params =>
  get(baseUrl.learnMapUrl + "/StudentMap/LearnPlanDetails", params, true);
//获取学习计划分类明细
export const learnPlanDetailInfo = params =>
  get(baseUrl.learnMapUrl + "/StudentMap/LearnPlanDetailInfos", params, true);
//获取计划信息
export const getLearnPlanInfo = params =>
  get(baseUrl.learnMapUrl + "/StudentMap/GetLearnPlanInfo", params, true);
//获取学习子项进度
export const getLearnPlanProcess = params =>
  get(baseUrl.learnMapUrl + "/StudentMap/GetLearnPlanDetailInfoProcess", params, true);
//获取岗位能力项
export const getCapabilityItem = params =>
  get(
    baseUrl.learnMapUrl + "/StudentMap/GetLearnDetailRelevancyed",
    params,
    true
  );
//提交审核
export const submitReview = params =>
  get(baseUrl.learnMapUrl + "/StudentMap/SubmitForReview", params, true);
//地图已读
export const updateIsRead = params =>
  post(baseUrl.learnMapUrl + "/StudentMap/UpdateIsRead", params, true);
// 获取默认计划是否完成
export const GetDefaultIsComplete = params =>
  get(baseUrl.learnMapUrl + "/StudentMap/GetDefaultIsComplete", params, true);
// 获取计划得完成情况
export const GetPlanProcess = params =>
  get(baseUrl.learnMapUrl + "/StudentMap/GetPlanProcess", params, true);

//获取奖励接口
export const rewardDistribute = params =>
  get(baseUrl.eMarketing + "/api/AppActivity/RewardDistribute", params);
//获取规则明细
export const getRuleDetail = params =>
  get(baseUrl.eMarketing + "/api/AppActivity/GetRuleDetail", params);
//图片组件派奖
export const componentReward = params =>
  get(baseUrl.eMarketing + "/api/AppActivity/ImageComponentReward", params);

//---------------测评问卷------------//
export const getSimpleExams = params =>
  get(baseUrl.examUrl + "/SimpleInnerDefault/GetSimpleExams", params, true);
//验证密码
export const checkPassword = params =>
  get(baseUrl.examUrl + "/SimpleInnerDefault/CheckPassword", params, true);
//测评详情
export const getSimpleExam = params =>
  get(baseUrl.examUrl + "/SimpleInnerDefault/GetSimpleExam", params, true);
//参加考试
export const joinExam = params =>
  get(baseUrl.examUrl + "/SimpleInnerDefault/JoinSimpleExam", params, true);
//交卷
export const postExam = params =>
  post(baseUrl.examUrl + "/SimpleInnerDefault/PostSimpleExam", params, true);
//测评结果
export const getSimpleExamResult = params =>
  get(
    baseUrl.examUrl + "/SimpleInnerDefault/GetSimpleExamResult",
    params,
    true
  );
//测评记录
export const getSimpleExamRecords = params =>
  get(
    baseUrl.examUrl + "/SimpleInnerDefault/GetSimpleExamRecords",
    params,
    true
  );

//活动专区用户信息收集
export const addLog = params => get(baseUrl.sso + "/Default/AddLog", params);
//获取轮播图数据
export const getAD = params => get(baseUrl.lms + "/AD/GetAD", params);