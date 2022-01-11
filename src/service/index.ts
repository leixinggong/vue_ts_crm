import NetWorkService from './request'

export const netService = new NetWorkService({
  baseURL: '',
  responseType: 'json',
  timeout: 5000
})

netService.request({})
