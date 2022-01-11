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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request<T = any>(config: RequestConfig<ResponseData<T>, T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      // 处理请求头配置
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 处理是否有 show - loading
      this.instance
        .request<ResponseData<T>>(config)
        .then((res) => {
          console.log(res)
          // 处理响应配置
          if (config.interceptors?.responseInterceptor) {
            config.interceptors.responseInterceptor(res.data.data)
          }
          resolve(res.data.data)
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
