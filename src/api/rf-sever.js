/*
 * @Author: your name
 * @Date: 2020-12-15 09:40:37
 * @LastEditTime: 2021-01-21 16:02:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xlxt-app\src\api\rf-sever.js
 */
import {baseUrl, get, post } from './index'
// 考试跨域
let BASE_URL = baseUrl.examUrl

// 视频播放---------
export const VideoPlay = (params) => get('/Course/GetPlayAuthByVideoID', params)
// 登录-------获取短信验证码
export const GetPhoneCode = params => post(baseUrl.sso + '/default/GetMobileCode', params)
// 登录-------短信登录
export const GetPhoneLogin = params => post(baseUrl.sso + '/default/SmsLogin', params)
// 登录-------
export const GetUserLogin = params => post(baseUrl.sso + '/default/Login', params)
// 登录-------注册
export const GetUserRegister = params => post(baseUrl.sso + '/default/Register', params)
// 登录-------改密
export const GetUserModifyPassword = params => post(baseUrl.sso + '/default/ModifyPassword', params)
// 登录-------验证手机号是否注册过
export const GetValidLoginMobile = params => get(baseUrl.sso + '/default/ValidLoginMobile', params)
// 登录-------判断验证码是否正确
export const GetValidLoginName = params => post(baseUrl.sso + '/default/ValidLoginName', params)
// 登录-------判断昵称是否重复
export const GetSmsCode = params => post(baseUrl.sso + '/default/ValidSmsCode', params)
// 登录-------修改密码
export const GetModifyPassword = params => post(baseUrl.sso + '/default/ModifyPassword', params)
// 修改密码无手机号
export const GetMobileSmsCode = params => post(baseUrl.sso + '/default/GetMobileSmsCode', params)
// 登录-------退出登录
export const LoginOut = params => post(baseUrl.sso + '/default/LoginOut', params)
// TODO: 埋点获取岗位信息
export const GetSessionUserInfo = params => get(baseUrl.lms + '/Member/GetSessionUserInfo', params)
// 关于我们
export const GetAbout = params => post(baseUrl.lms + '/AD/GetHelpByID', params)
// --------------------------------考试------------------------------------------------------------
// 获取考试列表
export const GetExams = params => get(BASE_URL + '/InnerDefault/GetExams', params, true)
// 验证考试密码
export const CheckPassword = params => get(BASE_URL + '/InnerDefault/CheckPassword', params)
// 考试详情
export const GetExam = params => get(BASE_URL + '/InnerDefault/GetExam', params, true)
// 获取试题
export const JoinExam = params => get(BASE_URL + '/InnerDefault/JoinExam', params)
// 考试记录
export const GetExamRecords = params => get(BASE_URL + '/InnerDefault/GetExamRecords', params)
// 交卷
export const PostExam = params => post(BASE_URL + '/InnerDefault/PostExam', params)
// 考试结果
export const GetExamResult = params => post(BASE_URL + '/InnerDefault/GetExamResult', params)
// 考试解析
export const GetRightExamResult = params => get(BASE_URL + '/InnerDefault/GetRightExamResult', params)
// 考试排行榜
export const GetExamRank = params => get(BASE_URL + '/InnerDefault/GetRank', params)
// 我的排名
export const GetMyRank = params => get(BASE_URL + '/InnerDefault/GetMyRank', params)
// 查询未交卷记录成绩
export const GetLocalExamRecord = params => get(BASE_URL + '/InnerDefault/GetLocalExamRecord', params)
// 改分记录
export const GetGradeRecords = params => get(BASE_URL + '/InnerDefault/GetGradeRecords', params)
// 重新提交交卷失败的考试记录
export const PostFailedExamRecord = params => get(BASE_URL + '/InnerDefault/PostFailedExamRecord', params)
