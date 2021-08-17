import {baseUrl, get, post } from './index';

// ---------------杏林本草------------//
// 获取首页一级分类
export const GetFirstCategory = params =>
    get(baseUrl.tcm3 + "/api/app/AppDrug/GetFirstCategory", params);

// 首页获取
export const AppDrugIndex = params =>
    get(baseUrl.tcm3 + "/api/app/AppDrug/Index", params);

// 搜索药材
export const SearchDrug = params =>
    get(baseUrl.tcm3 + "/api/app/AppDrug/SearchDrug", params);

// 获取药材详情
export const GetDrugDetail = params =>
    get(baseUrl.tcm3 + "/api/app/AppDrug/GetDrugDetail", params);

// 根据视频ID获取视频鉴权地址
export const GetPlayAuthByVideoID = params =>
    get(baseUrl.tcm3 + "/api/app/AppDrug/GetPlayAuthByVideoID", params);

// ---------------药师真题------------//
// 查询药师真题标签列表
export const GetDocQuestionTags = params =>
    get(baseUrl.examUrl + "/Default/GetDocQuestionTags", params);

// 查询药师真题考试列表
export const GetDocQuestionExams = params =>
    get(baseUrl.examUrl + "/Default/GetDocQuestionExams", params);