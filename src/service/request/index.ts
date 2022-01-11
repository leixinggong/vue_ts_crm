import { NetworkInterceptor, RequestConfig, ResponseData } from './type'
import axios, { AxiosResponse } from 'axios'
import type { AxiosInstance } from 'axios'

export default class NetWorkService<T extends ResponseData> {
  instance: AxiosInstance
  showLoading: boolean
  interceptors?: NetworkInterceptor<AxiosResponse<T>>

  constructor(config: RequestConfig<T>) {
    this.showLoading = config.showLoading ?? false
    this.interceptors = config.interceptors
    config.headers = config.headers ?? {}
    this.instance = axios.create(config)
    // request
    this.instance.interceptors.request.use((config) => {
      // 拦截request
      console.log('全局拦截器')
      // 可以做一添加全局请求头的操作
      config.headers = { ...config?.headers, token: '' }
      return config
    })

    // response
    this.instance.interceptors.response.use<T>((response: AxiosResponse<T>) => {
      return response.data
    })

    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptor,
      config.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptor,
      config.interceptors?.responseInterceptorCatch
    )
  }

  request<T>(config: RequestConfig): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<T>(config)
        .then((res) => {
          console.log(res)
          resolve(res.data)
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
        .finally(() => {
          console.log('finally')
        })
    })
  }
}
