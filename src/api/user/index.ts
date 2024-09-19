//统一管理咱们项目用户相关的接口
import request from '@/utils/request'

import type {
  LoginFormData,
  LoginResponseData,
  UserInfoResponseData,
} from './type'

//项目用户相关的请求地址
enum API {
  LOGIN_URL = '/api/user/login',
  USERINFO_URL = '/api/user/info?username=admin',
  LOGIN_CODE = '/api/captcha',
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 登录
export const reqLogin = (data: LoginFormData) =>
  request.post<any, LoginResponseData>(API.LOGIN_URL, data)

// 获取用户信息
export const reqUserInfo = () =>
  request.get<any, UserInfoResponseData>(API.USERINFO_URL)

// 退出登录
export const reqLogOut = () => request.post<any, any>(API.LOGOUT_URL)

export const reqCode = () => request.get(API.LOGIN_CODE)
