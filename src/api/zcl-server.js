import {baseUrl, get, post } from './index';

/**知识擂台 */

// 参赛记录  知识擂台列表
export const entryRecord = (params) => get(baseUrl.examUrl+'/InnerDefault/GetExams', params); 
// 参赛记录  知识擂台列表 (首页、登录页 活动)
export const entryGetExams = (params) => get(baseUrl.examUrl+'/Default/GetExams', params); 
//验证密码
export const CheckPassword = (params) => get(baseUrl.examUrl+'/InnerDefault/CheckPassword', params); 
//详情页面
export const ecordDetails = (params) => get(baseUrl.examUrl+'/InnerDefault/GetExam', params);  
//获取最近参加三人头像
export const getTripleARecords = (params) => get(baseUrl.examUrl+'/InnerDefault/GetTripleARecords', params); 
//挑战记录
export const challengeRecord = (params) => get(baseUrl.examUrl+'/InnerDefault/GetExamRecords', params); 
//比赛结果
export const getExamResult = (params) => get(baseUrl.examUrl+'/InnerDefault/GetExamResult', params); 

/**获取星星记录 */

// 获取星星记录列表
export const getStarRecordList = (params) => get(baseUrl.eMarketing+'/api/AppActivity/GetActivityStars', params); 
// 获取查看星星按钮是否显示
export const IsShowStar = (params) => get(baseUrl.eMarketing+'/api/AppActivity/IsShowStar', params); 