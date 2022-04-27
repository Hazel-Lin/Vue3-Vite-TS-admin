import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import Message from 'element-plus'
import { IResponse, ILogin, RequestOptions } from './type'
import { getToken, TokenPrefix } from '@/utils/auth'

const BASE = process.env.VUE_APP_BASE_API

const service: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 定义错误码
const ErrorCode: any = {
  NotFound: 404,
  Success: 0,
  EncodeError: 701,
  SignError: 702,
  UnknowError: -1,
  NoLogin: 406,
  Expired: 401,
  NoRight: 403,
  BadGateway: 502,
  MediaTokenError: -100
}

// 封装一个处理错误码的函数 部分需要根据业务逻辑定义
function handleErrorCode(code: number, message?: string) {
  let hasHandle = false
  // 包含以下code表示没有权限 直接返回登录页
  if (
    [
      ErrorCode.NoLogin,
      ErrorCode.Expired,
      ErrorCode.BadGateway,
      ErrorCode.MediaTokenError
    ].includes(code)
  ) {
    window.location.replace(`${BASE}login`)
    hasHandle = true
  } else if (code !== ErrorCode.Success) {
    message && handleErrorMessage(message)
  }
  return hasHandle
}

function handleErrorMessage(message: string) {
  ;(Message as any).error(message)
}

// 封装请求拦截
// 请求加上token
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截时需要对错误码处理
service.interceptors.response.use(
  (response) => {
    const res = response.data
    const { code, message } = res
    // 接口返回正常
    if (!handleErrorCode(code, message)) {
      return res
    } else {
      return Promise.resolve({
        code,
        message,
        data: null
      })
    }
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

const request = <T = any>(
  config: AxiosRequestConfig,
  options?: RequestOptions
): Promise<T> => {
  const conf = config
  return new Promise((resolve, reject) => {
    service
      .request<any, AxiosResponse<IResponse>>(conf)
      .then((res: AxiosResponse<IResponse>) => {
        const {
          data: { result }
        } = res
        resolve(result as T)
      })
  })
}

export function get<T = any>(
  config: AxiosRequestConfig,
  options?: RequestOptions
): Promise<T> {
  return request({ ...config, method: 'GET' }, options)
}

export function post<T = any>(
  config: AxiosRequestConfig,
  options?: RequestOptions
): Promise<T> {
  return request({ ...config, method: 'POST' }, options)
}

export function put<T = any>(
  config: AxiosRequestConfig,
  options?: RequestOptions
): Promise<T> {
  return request({ ...config, method: 'PUT' }, options)
}
export function del<T = any>(
  config: AxiosRequestConfig,
  options?: RequestOptions
): Promise<T> {
  return request({ ...config, method: 'DELETE' }, options)
}
export function patch<T = any>(
  config: AxiosRequestConfig,
  options?: RequestOptions
): Promise<T> {
  return request({ ...config, method: 'PATCH' }, options)
}

export default request
