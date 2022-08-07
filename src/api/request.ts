import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios, { AxiosResponse } from 'axios'
import ResponseHelper from './responseHelp'
export default class Request {
  private axiosInstance: AxiosInstance
  constructor(options: AxiosRequestConfig) {
    this.axiosInstance = axios.create(options)

    this.axiosInstance.interceptors.request.use(
      (config: any) => {
        // 在发送请求之前做些什么 请求发送前带上token
        const token = localStorage.getItem('token')
        if (token)
          config.headers.Authorization = token

        return config
      },
      (error: any) => {
        console.log(error)
        return Promise.reject(error)
      },
    )

    // 根据接口设计修改
    this.axiosInstance.interceptors.response.use(
      (response: any) => {
        if (response.data.code === 0)
          return response.data

        else
          return response.data
      },
      (error: any) => {
        console.log(error)
        return Promise.reject(error)
      },
    )
  }

  Request(config: AxiosRequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      this.axiosInstance.request(config)
        .then((res) => {
          resolve(new ResponseHelper(res))
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(url: string, data?: any): Promise<T> {
    return this.Request({ url, method: 'get', params: data || {} })
  }

  post<T = any>(url: string, data?: any): Promise<T> {
    return this.Request({ url, method: 'post', data: data || {} })
  }
}
