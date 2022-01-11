import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface RequestConfig<T = ResponseData, R = AxiosResponse<T>>
  extends AxiosRequestConfig<T> {
  showLoading?: boolean
  interceptors?: NetworkInterceptor<R>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}

export interface NetworkInterceptor<T> {
  requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestInterceptorCatch: (err: any) => any
  responseInterceptor: (res: T) => T
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responseInterceptorCatch: (err: any) => any
}
